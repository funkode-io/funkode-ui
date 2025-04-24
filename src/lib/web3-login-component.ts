import { Trigger, Lifecycle, Content } from "drab/base";

export class Web3LoginComponent extends Content(
	Trigger(Lifecycle(HTMLElement)),
) {
	async linkWallet() {
		alert("Linking wallet...");
	}

	mount() {
		this.triggerListener(() => this.linkWallet());
	}
}

customElements.define("fk-web3-login", Web3LoginComponent);
