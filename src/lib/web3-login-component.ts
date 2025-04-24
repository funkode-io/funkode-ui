import { Trigger, Lifecycle } from "drab/base";

export class Web3LoginComponent extends Trigger(Lifecycle(HTMLElement)) {
	async linkWallet() {
		alert("Linking wallet...");
	}

	mount() {
		this.triggerListener(() => this.linkWallet());
	}

	/** Called when custom element is added to the page. */
	connectedCallback() {
		queueMicrotask(() => this.mount());
	}
}

customElements.define("fk-web3-login", Web3LoginComponent);
