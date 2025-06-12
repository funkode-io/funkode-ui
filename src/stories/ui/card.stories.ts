import { html } from "lit";
import type { StoryObj } from "storybook/web-components";

const meta = {
  title: "UI/Card",
  tags: ["autodocs"],
  parameters: {
    docs: {
      source: {
        format: "dedent",
      },
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj;

export const Card: Story = {
  render: (args) => html`
  <article is="fk-card" class="mb-8 w-64" variant="${args.variant}">
    <header>
      <h1>Card Title</h1>
    </header>
    <p>Card content goes here.</p>
    <footer>
      <nav is="fk-nav">
        <ul>
        <li><button is="fk-button" class="w-20">Cancel</button></li>
        <li><button is="fk-button" variant="primary" class="w-20">Ok</button></li>
      </ul></nav>
    </footer>
  </article>
  `,
  args: {
    variant: "default",
  },
};

export const CardWithHeaderActions: Story = {
  render: (args) => html`
  <div class="flex items-center justify-center h-screen">
  <article is="fk-card" class="mb-8 w-lg" variant="${args.variant}">
    <!-- header with actions -->
    <header>
      <nav is="fk-nav">
        <ul>
          <li>Chains</li>
          </ul>
          <ul>
            <li><i class="icon-[lucide--refresh-cw] cursor-pointer"></i></li>
          </ul></nav>
    </header>
    
    <nav is="fk-nav" class="h-64">
    <ul class="!inline">
      <li><a href="#" alt="Arbitrum" data-tooltip="Arbitrum"><div style="height: 50px; width: 50px; background-image: url(https://coin-images.coingecko.com/asset_platforms/images/33/small/AO_logomark.png?1706606717), url(/images/coingecko.svg), url(/images/debank.svg), url(/images/defillama.svg); background-position: center, top right, bottom right, top left; background-size: 30px, 16px, 14px, 14px; background-repeat: no-repeat"></div></a></li>
      <li><a href="#" alt="Immutable zkEVM" data-tooltip="Immutable"true"><div style="height: 50px; width: 50px; background-image: url(https://coin-images.coingecko.com/asset_platforms/images/159/small/immutable.jpeg?1706606759), url(/images/coingecko.svg), url(/images/debank.svg), url(/images/defillama.svg); background-position: center, top right, bottom right, top left; background-size: 30px, 16px, 14px, 14px; background-repeat: no-repeat"></div></a></li>
      <li><a href="#" alt="Linea" data-tooltip="Linea"><div style="height: 50px; width: 50px; background-image: url(https://coin-images.coingecko.com/asset_platforms/images/135/small/linea.jpeg?1706606705), url(/images/coingecko.svg), url(/images/debank.svg); background-position: center, top right, bottom right; background-size: 30px, 16px, 14px; background-repeat: no-repeat"></div></a></li>
      <li><a href="#" alt="BNB Chain" data-tooltip="BNB"true"><div style="height: 50px; width: 50px; background-image: url(https://coin-images.coingecko.com/asset_platforms/images/1/small/bnb_smart_chain.png?1706606721), url(/images/coingecko.svg), url(/images/debank.svg), url(/images/defillama.svg); background-position: center, top right, bottom right, top left; background-size: 30px, 16px, 14px, 14px; background-repeat: no-repeat"></div></a></li>
      <li><a href="#" alt="Fantom" data-tooltip="Fantom"><div style="height: 50px; width: 50px; background-image: url(https://coin-images.coingecko.com/asset_platforms/images/17/small/fantom.png?1706606773), url(/images/coingecko.svg), url(/images/debank.svg), url(/images/defillama.svg); background-position: center, top right, bottom right, top left; background-size: 30px, 16px, 14px, 14px; background-repeat: no-repeat"></div></a></li>
      <li><a href="#" alt="VeChain" data-tooltip="VeChain"><div style="height: 50px; width: 50px; background-image: url(https://coin-images.coingecko.com/asset_platforms/images/1167/small/vechain.png?1724843001), url(/images/coingecko.svg); background-position: center, top right; background-size: 30px, 16px; background-repeat: no-repeat"></div></a></li>
      <li><a href="#" alt="Beam" data-tooltip="Beam"><div style="height: 50px; width: 50px; background-image: url(https://coin-images.coingecko.com/asset_platforms/images/155/small/beam.png?1706606625), url(/images/coingecko.svg), url(/images/debank.svg), url(/images/defillama.svg); background-position: center, top right, bottom right, top left; background-size: 30px, 16px, 14px, 14px; background-repeat: no-repeat"></div></a></li>
      <li><a href="#" alt="Sonic" data-tooltip="Sonic"><div style="height: 50px; width: 50px; background-image: url(https://coin-images.coingecko.com/asset_platforms/images/22192/small/128xS_token_Black-BG_2x.png?1735963719), url(/images/coingecko.svg), url(/images/debank.svg), url(/images/defillama.svg); background-position: center, top right, bottom right, top left; background-size: 30px, 16px, 14px, 14px; background-repeat: no-repeat"></div></a></li>
      <li><a href="#" alt="zkSync Era" data-tooltip="zkSync"true"><div style="height: 50px; width: 50px; background-image: url(https://coin-images.coingecko.com/asset_platforms/images/121/small/zksync.jpeg?1706606814), url(/images/coingecko.svg), url(/images/debank.svg), url(/images/defillama.svg); background-position: center, top right, bottom right, top left; background-size: 30px, 16px, 14px, 14px; background-repeat: no-repeat"></div></a></li>
      <li><a href="#" alt="Avalanche" data-tooltip="Avalanche"><div style="height: 50px; width: 50px; background-image: url(https://coin-images.coingecko.com/asset_platforms/images/12/small/avalanche.png?1706606775), url(/images/coingecko.svg), url(/images/debank.svg), url(/images/defillama.svg); background-position: center, top right, bottom right, top left; background-size: 30px, 16px, 14px, 14px; background-repeat: no-repeat"></div></a></li>
      <li><a href="#" alt="Metis" data-tooltip="Metis"><div style="height: 50px; width: 50px; background-image: url(https://coin-images.coingecko.com/asset_platforms/images/54/small/metis.png?1706606712), url(/images/coingecko.svg), url(/images/debank.svg), url(/images/defillama.svg); background-position: center, top right, bottom right, top left; background-size: 30px, 16px, 14px, 14px; background-repeat: no-repeat"></div></a></li>
      <li><a href="#" alt="Base" data-tooltip="Base"><div style="height: 50px; width: 50px; background-image: url(https://coin-images.coingecko.com/asset_platforms/images/131/small/base-network.png?1720533039), url(/images/coingecko.svg), url(/images/debank.svg), url(/images/defillama.svg); background-position: center, top right, bottom right, top left; background-size: 30px, 16px, 14px, 14px; background-repeat: no-repeat"></div></a></li>
      <li><a href="#" alt="Polygon" data-tooltip="Polygon"><div style="height: 50px; width: 50px; background-image: url(https://coin-images.coingecko.com/asset_platforms/images/15/small/polygon_pos.png?1706606645), url(/images/coingecko.svg), url(/images/debank.svg), url(/images/defillama.svg); background-position: center, top right, bottom right, top left; background-size: 30px, 16px, 14px, 14px; background-repeat: no-repeat"></div></a></li>
      <li><a href="#" alt="Ethereum" data-tooltip="Ethereum"><div style="height: 50px; width: 50px; background-image: url(https://coin-images.coingecko.com/asset_platforms/images/279/small/ethereum.png?1706606803), url(/images/coingecko.svg), url(/images/debank.svg), url(/images/defillama.svg); background-position: center, top right, bottom right, top left; background-size: 30px, 16px, 14px, 14px; background-repeat: no-repeat"></div></a></li>
    </nav>
    <footer class="flex items-center justify-center">
      <button is="fk-button" variant="default"><i class="icon-[lucide--chevron-left]"></i>Back to home</button>
    </footer>
  </article>
  </div>
  `,
  args: {
    variant: "default",
  },
};

export const NotFoundCard: Story = {
  render: (args) => html`
  <div class="flex items-center justify-center h-screen">
  <article is="fk-card" class="mb-8 w-64" variant="${args.variant}">
    <header class="flex items-center justify-center">
      <h1 class="text-6xl">404</h1>
    </header>
    <p class="text-center">Content not found.</p>
    <footer class="flex items-center justify-center">
      <button is="fk-button" variant="accent"><i class="icon-[lucide--chevron-left]"></i>Back to home</button>
    </footer>
  </article>
  </div>
  `,
  args: {
    variant: "default",
  },
};
