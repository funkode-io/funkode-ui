import { Trigger, Lifecycle, Content } from "drab/base";
import { ethers } from "ethers";

export class Web3LoginComponent extends Content(
  Trigger(Lifecycle(HTMLElement)),
) {
  async linkWallet() {
    if (window.ethereum == null) {
      console.log("No wallet installed");
      this.dispatchEvent(new CustomEvent("WALLET_NOT_INSTALLED"));
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
            new CustomEvent("WALLET_ERROR", {
              detail: error,
            }),
          );
        });
    }
  }

  mount() {
    this.triggerListener(() => this.linkWallet());
  }
}

customElements.define("fk-web3-login", Web3LoginComponent);
