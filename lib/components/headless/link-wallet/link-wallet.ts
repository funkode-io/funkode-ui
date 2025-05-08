import { Trigger, Lifecycle, Content, type TriggerAttributes } from "drab/base";
import { ethers } from "ethers";

export interface LinkWalletProps extends TriggerAttributes {
  linkWallet?: () => Promise<void>;
}

export class LinkWalletComponent extends Content(
  Trigger(Lifecycle(HTMLElement)),
) {
  async linkWallet() {
    console.log("Linking wallet...");
    if (window.ethereum == null) {
      console.log("No wallet installed");
      this.dispatchEvent(new CustomEvent("wallet-not-installed"));
    } else {
      new ethers.BrowserProvider(window.ethereum)
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
    console.log("LinkWalletComponent mounted");
    this.listener(() => this.linkWallet());
  }
}

console.log("Registering fk-link-wallet");
customElements.define("fk-link-wallet", LinkWalletComponent);
