/**
 * Base Web Component
 * 
 * A foundation class for creating custom web components with common functionality
 */

export class BaseComponent extends HTMLElement {

  #listenerController = new AbortController();

  constructor() {
    super();
  }

  get event() {
		return (this.getAttribute("event") ?? "click");
	}

	set event(value) {
		this.setAttribute("event", value);
	}

  getTrigger() {
		const triggers = this.querySelectorAll(
			this.getAttribute("trigger") ?? "[data-trigger]",
		);

		return triggers;
	}

  getContent(instance) {

    instance = instance || HTMLElement;

		const content = this.querySelector(
			this.getAttribute("content") ?? "[data-content]",
		);

		if (content instanceof instance) return content;

		throw new Error("Content not found");
	}

  swapContent(revert) {

    revert = revert | 800;

		const swap = this.querySelector(this.getAttribute("swap") ?? "[data-swap]");

		if (swap) {
			const currentContent = this.getContent().childNodes;

			const placeholder = [];

			if (swap instanceof HTMLTemplateElement) {
				placeholder.push(swap.content.cloneNode(true));
				swap.content.replaceChildren(...currentContent);
			} else {
				placeholder.push(...swap.childNodes);
				swap.replaceChildren(...currentContent);
			}

			this.getContent().replaceChildren(...placeholder);

			if (revert) {
				setTimeout(() => this.swapContent(0), revert);
			}
		}
	}

  safeListener(type, listener, target, options) {
    target = target || document.body;
    options = options || {};

		options.signal = this.#listenerController.signal;
		target.addEventListener(type, listener, options);
	}

  triggerListener(
		listener,
		type,
		options,
	) {

    type = type || this.event;
    options = options || {};

		for (const trigger of this.getTrigger()) {
			trigger.addEventListener(type, listener, options);
		}
	}

  /**
	 * Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.
	 *
	 * The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.
	 */
  mount() {}

  /** Called when custom element is added to the page. */
  connectedCallback() {
		queueMicrotask(() => this.mount());
	}

  /**
	 * Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.
	 */
	destroy() {}

	/** Called when custom element is removed from the page. */
	disconnectedCallback() {
		this.destroy();
		this.#listenerController.abort();
	}
}
