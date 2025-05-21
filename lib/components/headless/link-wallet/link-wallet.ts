import { Trigger, Lifecycle, Content, type TriggerAttributes } from "drab/base";
import { ethers } from "ethers";

export interface LinkWalletProps extends TriggerAttributes {
  linkWallet?: () => Promise<void>;
}

export class LinkWalletComponent extends Content(Trigger(Lifecycle(HTMLElement))) {
  static _provider: ethers.BrowserProvider | null = null;

  _loadProvider() {
    if (LinkWalletComponent._provider) return;

    if (window.ethereum) {
      console.log("Wallet provider setup");
      LinkWalletComponent._provider = new ethers.BrowserProvider(window.ethereum);
    }
    if (LinkWalletComponent._provider == null) {
      console.log("No wallet provider found");
      LinkWalletComponent._provider = null;
    }
  }

  async linkWallet() {
    console.log("Linking wallet...");
    if (LinkWalletComponent._provider == null) {
      console.log("No wallet installed");
      this.dispatchEvent(new CustomEvent("wallet-not-installed"));
    } else {
      LinkWalletComponent._provider
        .send("eth_requestAccounts", [])
        .then((accounts) => ethers.getAddress(accounts[0]))
        .then((address) => {
          console.log("Wallet linked", address);
          this.dispatchEvent(
            new CustomEvent("wallet-linked", {
              detail: address,
            }),
          );
        })
        .catch((error) => {
          console.error("Error linking wallet:", error);
          this.dispatchEvent(
            new CustomEvent("wallet-link-error", {
              detail: error,
            }),
          );
        });
    }
  }

  mount() {
    console.log("LinkWalletComponent on mount");

    this._loadProvider();

    this.listener(() => this.linkWallet());

    console.log("LinkWalletComponent mounted");
  }
}

console.log("Registering fk-link-wallet");
customElements.define("fk-link-wallet", LinkWalletComponent);
