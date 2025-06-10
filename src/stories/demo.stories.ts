import { html } from "lit";
import type { StoryObj } from "storybook/web-components";
import { http, HttpResponse } from "msw";

import funkodeIoSvg from "./assets/funkode-ui.svg?raw";

console.log("Demo stories...");

const meta = {
  title: "Demo/Web3Demo",
  tags: ["autodocs"],
  parameters: {
    docs: {
      source: {
        format: "dedent",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const CHALLENGE = "To login into this demo please sign this message with your wallet.";

/**
 * ## AlpineJS example
 * Example how to use this component with AlpineJS */
export const Demo: Story = {
  args: {
    sticky: true,
  },
  parameters: {
    msw: {
      handlers: [http.get("https://funkode.io/funkode-ui/auth/challenge", () => HttpResponse.text(CHALLENGE))],
    },
  },
  render: () => html`
  <div x-data="{ theme: 'amber', wallet: null }"
      x-bind:data-theme="theme"
      x-on:wallet-linked="wallet = $event.detail;"
      @newtheme.window="theme = $event.detail.theme;"
      class="bg-base-200">
    <header 
      class="sticky -top-6 flex flex-col items-center z-50 h-18 bg-base-100"
      x-data="{ theme: 'amber', wallet: null, loggedIn: false }"
      x-bind:data-theme="theme"
      @newtheme.window="theme = $event.detail.theme;"
    >
      <nav is="fk-nav" class="z-50 m-0 px-8 pt-2 w-full h-15" sticky="true">
        <ul>
          <li .innerHTML=${funkodeIoSvg}></li>
        </ul>
        <ul>
          <li><a href="#">Home</a></li>
          <li>
            <!-- show if wallet is not linked -->
            <fk-link-wallet
              x-on:wallet-linked="wallet = event.detail; notyf.success(\`Wallet linked: $\{shortenAddress(event.detail)\}\`);login(wallet);" 
              x-on:wallet-link-error="notyf.error('Wallet link error');" 
              x-on:wallet-not-installed="notyf.error('Wallet not installed');"
              x-on:login-error.window="loggedIn = false; notyf.error('Login error');"
              x-on:user-logged-in.window="loggedIn = true; notyf.success(\`Logged in as $\{shortenAddress(event.detail.account)}\`);"
            >
            <button x-show="!wallet" is="fk-button" data-trigger>
              <span class="text-nowrap text-ellipsis overflow-hidden">
                Link wallet
              </span>
            </button>
            </fk-link-wallet>
            <!-- show if wallet is linked but not logged in -->
            <button 
              is="fk-button" 
              x-show="wallet && !loggedIn"
              variant="primary"
              @click="login(wallet)"
            >
              <span  class="max-w-20 text-ellipsis whitespace-nowrap overflow-hidden">Login</span>
            </button>
            <details is="fk-dropdown" x-show="wallet && loggedIn" variant="primary">
              <summary x-text="shortenAddress(wallet)">Error loading wallet</summary>
              <ul>
                <li><a @click="wallet=null; loggedIn = false; notyf.success('Logged out');">Logout</a></li>
              </ul>
            </details>
          </li>
          <li>
            <details is="fk-dropdown">
              <summary x-text="\`Theme: \${theme}\`">Choose Theme</summary>
              <ul>
                <li><a @click="$dispatch('newtheme', { theme: 'amber' })" data-theme="amber">Amber</a></li>
                <li><a @click="$dispatch('newtheme', { theme: 'forest' })" data-theme="forest">Forest</a></li>
                <li><a @click="$dispatch('newtheme', { theme: 'dark' })" data-theme="dark">Dark</a></li>
                <li><a @click="$dispatch('newtheme', { theme: 'light' })" data-theme="light">Light</a></li>
                <li><a @click="$dispatch('newtheme', { theme: 'winter' })" data-theme="winter">Winter</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
      <!-- <div class="sticky top-20 w-full h-10 bg-base-100/50"></div> -->
  </header>
  <!-- transparent layout -->
  <div 
    x-data="{ theme: 'amber' }"
    x-bind:data-theme="theme" 
    @newtheme.window="theme = $event.detail.theme;" 
    class="sticky top-12 h-5 z-40 bg-base-200/10 bg-gradient-to-t from-base-200/10 to-base-200 m-0"
  ></div>
  <main 
    class="flex flex-col gap-4 h-150 bg-base-200 w-full p-4 z-90"
    x-data="{ theme: 'amber' }"
    x-bind:data-theme="theme"
    @newtheme.window="console.log('new theme', event); theme = $event.detail.theme;"
  >
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-2.5">Welcome to DFolio</h5>
        <h5 class="card-title mb-2.5">Welcome to DFolio</h5>
        <h5 class="card-title mb-2.5">Welcome to DFolio</h5>
        <div class="skeleton animate-pulse   h-16 w-16 shrink-0 rounded-full"></div>
        <div class="flex flex-col gap-4">
          <div class="skeleton animate-pulse h-4 w-20"></div>
          <div class="skeleton animate-pulse h-4 w-28"></div>
        </div>
        <div class="skeleton animate-pulse h-32 w-full"></div>
      </div>
    </div>
  </main>
  <div 
    class="flex justify-center mt-8" 
    x-data="{ theme: 'amber' }"
    x-bind:data-theme="theme" 
    @newtheme.window="theme = $event.detail.theme;"
  >
      <div class="h-15 w-40 flex items-center justify-center mr-1 rounded-box border border-primary bg-base-100 color-base-content">100</div>
      <div class="h-15 w-40 flex items-center justify-center mr-1 rounded-box border border-primary bg-base-200 color-base-content">200</div>
      <div class="h-15 w-40 flex items-center justify-center mr-1 rounded-box border border-primary bg-base-300 color-base-content">300</div>
    </div>
  </div>
  <style>
    a {
      cursor: pointer;
    }
  </style>
  <script>
      function shortenAddress(address, startChars = 4, endChars = 4) {
        if (!address) return '';
        return \`\${address.slice(0, startChars)}...\${address.slice(-endChars)}\`;
      }

      async function signMessage(message, account) {
        try {
          const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, account],
          });
          console.log("Signature:", signature);
          return Promise.resolve(signature);
        } catch (error) {
          console.error("Error signing message:", error);
          return Promise.reject(error);
        }
      }

      async function fetchChallenge() {
        return fetch('https://funkode.io/funkode-ui/auth/challenge')
          .then(response => response.text());
      }

      async function login(account) {
        fetchChallenge()
          .then(challenge => signMessage(challenge, account))
          .then(signature => { 
            this.dispatchEvent(new CustomEvent("user-logged-in", { detail: { account } }) );
          })
          .catch(error => {
            console.error("Login error:", error);
            this.dispatchEvent(new CustomEvent("login-error", { detail: error }));
          });
      }
    </script>
    `,
};
