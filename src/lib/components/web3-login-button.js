import { BaseComponent } from './base-component.js';
import { registerComponent } from '../utils/component-utils.js';

export class Web3LoginComponent extends BaseComponent {
  constructor() {
    super();
  }

  async linkWallet() {
    alert('Linking wallet...');
  }

  mount() {

    this.triggerListener(() => this.linkWallet());
  }

}

registerComponent('web3-login', Web3LoginComponent);
