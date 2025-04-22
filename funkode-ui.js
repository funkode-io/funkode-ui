var c = (t) => {
  throw TypeError(t);
};
var a = (t, r, e) => r.has(t) || c("Cannot " + e);
var l = (t, r, e) => (a(t, r, "read from private field"), e ? e.call(t) : r.get(t)), u = (t, r, e) => r.has(t) ? c("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(t) : r.set(t, e);
var o;
class g extends HTMLElement {
  constructor() {
    super();
    u(this, o, new AbortController());
  }
  get event() {
    return this.getAttribute("event") ?? "click";
  }
  set event(e) {
    this.setAttribute("event", e);
  }
  getTrigger() {
    return this.querySelectorAll(
      this.getAttribute("trigger") ?? "[data-trigger]"
    );
  }
  getContent(e) {
    e = e || HTMLElement;
    const n = this.querySelector(
      this.getAttribute("content") ?? "[data-content]"
    );
    if (n instanceof e) return n;
    throw new Error("Content not found");
  }
  swapContent(e) {
    e = e | 800;
    const n = this.querySelector(this.getAttribute("swap") ?? "[data-swap]");
    if (n) {
      const s = this.getContent().childNodes, i = [];
      n instanceof HTMLTemplateElement ? (i.push(n.content.cloneNode(!0)), n.content.replaceChildren(...s)) : (i.push(...n.childNodes), n.replaceChildren(...s)), this.getContent().replaceChildren(...i), e && setTimeout(() => this.swapContent(0), e);
    }
  }
  safeListener(e, n, s, i) {
    s = s || document.body, i = i || {}, i.signal = l(this, o).signal, s.addEventListener(e, n, i);
  }
  triggerListener(e, n, s) {
    n = n || this.event, s = s || {};
    for (const i of this.getTrigger())
      i.addEventListener(n, e, s);
  }
  /**
  * Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.
  *
  * The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.
  */
  mount() {
  }
  /** Called when custom element is added to the page. */
  connectedCallback() {
    queueMicrotask(() => this.mount());
  }
  /**
  * Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.
  */
  destroy() {
  }
  /** Called when custom element is removed from the page. */
  disconnectedCallback() {
    this.destroy(), l(this, o).abort();
  }
}
o = new WeakMap();
function h(t, r) {
  return t.includes("-") ? customElements.get(t) ? !1 : (customElements.define(t, r), !0) : (console.error("Custom element tag names must contain a hyphen (-)"), !1);
}
class d extends g {
  constructor() {
    super();
  }
  async linkWallet() {
    alert("Linking wallet...");
  }
  mount() {
    this.triggerListener(() => this.linkWallet());
  }
}
h("web3-login", d);
export {
  g as BaseComponent,
  d as Web3LoginComponent
};
