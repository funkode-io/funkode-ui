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

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const themeOption = (theme: string) => {
  return html`
    <fk-theme-button theme="${theme}" ></fk-theme-button>
    `;
};

/**
 * ## AlpineJS example
 * Example how to use this component with AlpineJS */
export const DemoPage: Story = {
  args: {
    sticky: true,
  },
  parameters: {
    msw: {
      handlers: [
        http.get("https://funkode.io/funkode-ui/auth/challenge", () => HttpResponse.text(CHALLENGE)),
        http.get("/home", () => HttpResponse.html(demoChartHtml("amber"))),
      ],
    },
  },
  render: (args, { globals: { theme } }) => html`
  <div 
    x-data="{ theme: '${theme}', wallet: null }"
    x-bind:data-theme="theme"
    x-on:wallet-linked="wallet = $event.detail;"
    x-on:newtheme="console.log('received in alpine new theme'); theme = $event.detail.theme;"
    class="bg-base-200"
  >
    <header class="sticky -top-6 flex flex-col items-center z-50 h-18 bg-base-100">
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
            <fk-dialog click-outside-close="" position="right">
              <button is="fk-button" data-trigger  variant="default" style-type="text"> 
                <i class="text-2xl icon-[lucide--settings] cursor-pointer"></i>
              </button>
              <dialog data-content>
                <h3 class="text-lg font-bold">Change Theme</h3>    
                <div class="flex flex-col flex-wrap items-start mb-2">
                ${["amber", "forest", "dark", "light", "winter"].map((theme) => themeOption(theme))}
                </div>
              </dialog>
            </fk-dialog>
          </li>
        </ul>
      </nav>
      <!-- <div class="sticky top-20 w-full h-10 bg-base-100/50"></div> -->
    </header>
    <!-- transparent layout -->
    <div class="sticky top-12 h-5 z-40 bg-base-200/10 bg-gradient-to-t from-base-200/10 to-base-200 m-0"></div>
    <main class="flex flex-col gap-4 h-150 bg-base-200 w-full p-4 z-90">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title mb-2.5">Welcome to DFolio</h5>
          <div hx-get="/home" hx-trigger="load">
          <div class="skeleton animate-pulse   h-16 w-16 shrink-0 rounded-full"></div>
          <div class="flex flex-col gap-4">
            <div class="skeleton animate-pulse h-4 w-20"></div>
            <div class="skeleton animate-pulse h-4 w-28"></div>
          </div>
          <div class="skeleton animate-pulse h-32 w-full"></div>
        </div>
          </div>
      </div>
    </main>
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

const demoChartHtml = (theme: string) => `
  <div
    x-data="{ theme: '${theme}' }"
    @newtheme.window="theme = $event.detail.theme; $nextTick(() => loadChart());"
    x-bind:data-theme="theme || 'amber'"
  >
    <div id="mainChart" class="h-96 w-full bg-base-300 border border-base-200 rounded-box p-4">
    </div>
  </div>
  <script type="text/javascript">
  
  if (!window.chartLoaded) {
    window.chartLoaded = true;
    console.log("Loading ECharts on htxm.onLoad...");
    
    htmx.onLoad(function() {
      console.log("htmx loaded, initializing ECharts...");
      loadChart();
    });
  }

  function loadChart() {
    const myChartElement = document.getElementById('mainChart');
    var myChart = echarts.init(myChartElement);

    // add resize listener if not already added
    if (!window.resizeChartListener) {
      console.log("Adding resize listener to chart...");
      window.resizeChartListener = true;

      window.addEventListener('resize', function() {
        console.log("Resizing chart...");
        myChart.resize();
      });
    }



    const styles = getComputedStyle(myChartElement);

    const base100Color = styles.getPropertyValue('--color-base-100') || '#f0f0f0';
    const base200Color = styles.getPropertyValue('--color-base-200') || '#e0e0e0';
    const base300Color = styles.getPropertyValue('--color-base-300') || '#ffffff';
    const baseContentColor = styles.getPropertyValue('--color-base-content') || '#000000';
    const accentColor = styles.getPropertyValue('--color-accent') || '#ff5722';
    const accentColorContent = styles.getPropertyValue('--color-accent-content') || '#ffffff';
    const infoColor = styles.getPropertyValue('--color-info') || '#2196f3';
    const infoColorContent = styles.getPropertyValue('--color-info-content') || '#ffffff';
    const successColor = styles.getPropertyValue('--color-success') || '#4caf50';
    const successColorContent = styles.getPropertyValue('--color-success-content') || '#ffffff';
    const warningColor = styles.getPropertyValue('--color-warning') || '#ff9800';
    const errorColor = styles.getPropertyValue('--color-error') || '#f44336';
    const errorColorContent = styles.getPropertyValue('--color-error-content') || '#ffffff';
    const neutralColor = styles.getPropertyValue('--color-neutral') || '#9e9e9e';
    const neutralContentColor = styles.getPropertyValue('--color-neutral-content') || '#212121';

    const backgroundColor = base300Color;
    const titleColor = baseContentColor;
    const subtitleColor = infoColor;

    const bullishCandleColor = accentColor; // Color for bullish candles
    const bullishCandleBorderColor = accentColorContent; // Border color for bullish candles
    const bearishCandleColor = neutralColor; // Color for bearish candles
    const bearishCandleBorderColor = neutralContentColor; // Border color for bearish candles


    // Each item: open,close,lowest,highest
    const data0 = splitData([
      ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
      ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
      ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],
      ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],
      ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],
      ['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82],
      ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],
      ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],
      ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42]
    ]);

    console.log("Data for chart:", data0);
    console.log("[data0.categoryData[0], data0.values[0][0]]", data0.categoryData[0], data0.values[0][0]);

    var option;

    option = {
      color: [
          "#893448",
          "#d95850",
          "#eb8146",
          "#ffb248",
          "#f2d643",
          "#ebdba4"
      ],
      backgroundColor: backgroundColor,
      textStyle: {},
      title: {
        text: "ECharts Demo Chart",
        subtext: "A simple candlestick chart",
        left: "center",
        textStyle: {
            color: titleColor
        },
        subtextStyle: {
            color: subtitleColor
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      
      xAxis: {
        type: 'category',
        data: data0.categoryData,
        splitLine: { show: true },
        min: 'dataMin',
        max: 'dataMax'
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true
        }
      },
      markPoint: {
        label: {
          formatter: function (param) {
            return param != null ? Math.round(param.value) + '' : '';
          }
        },
        data: [
          {
            name: 'Mark',
            coord: ['2013/1/28', 2346.5],
            value: 2346.5,
            itemStyle: {
              color: 'rgb(41,60,85)'
            }
          },
          {
            name: 'highest value',
            type: 'max',
            valueDim: 'highest'
          },
          {
            name: 'lowest value',
            type: 'min',
            valueDim: 'lowest'
          },
          {
            name: 'average value on close',
            type: 'average',
            valueDim: 'close'
          }
        ],
        tooltip: {
          formatter: function (param) {
            return param.name + '<br>' + (param.data.coord || '');
          }
        }
      },
      series: [
        {
          type: 'candlestick',
          itemStyle: {
               color: bullishCandleColor,      // Color for bullish candles
               color0: bearishCandleColor,        // Color for bearish candles
               borderColor: bullishCandleBorderColor, // Border color for all candles
               borderColor0: bearishCandleBorderColor,
               borderWidth: '2' // Border color for all candles
          },
          emphasis: {
            itemStyle: {
              color: bullishCandleColor,      // Color for bullish candles
              color0: bearishCandleColor,        // Color for bearish candles
              borderColor: bullishCandleBorderColor, // Border color for all candles
              borderColor0: bearishCandleBorderColor,
            }
          }, 
          data: data0.values,
        },
                {
          type: 'scatter',
          symbolSize: 20,
          itemStyle: {
            color: successColor,            
            borderColor: successColorContent,
            borderWidth: 2,
          },
          data: [
            [data0.categoryData[7], data0.values[7][3]]
          ]
        },

        {
          type: 'scatter',
          symbolSize: 20,
          itemStyle: {
            color: errorColor,            
            borderColor: errorColorContent,
            borderWidth: 2,
          },
          data: [
            [data0.categoryData[0], data0.values[0][2]],
            [data0.categoryData[2], data0.values[2][2]],
            [data0.categoryData[4], data0.values[4][2]]
          ]
        },

      ]
    };

    option && myChart.setOption(option);
  }
  
  function splitData(rawData) {  
    const categoryData = [];
    const values = [];
    for (var i = 0; i < rawData.length; i++) {
      categoryData.push(rawData[i].splice(0, 1)[0]);
      values.push(rawData[i]);
    }
    
    return {
      categoryData: categoryData,
      values: values
    };
  }

  function getCurrentTheme() {
    const theme = document.querySelector('[data-theme]');
    console.log('found theme?', theme);
    return theme ? theme.getAttribute('data-theme') : 'amber';
  }  
</script>
`;

export const DemoChart: Story = {
  render: (args, { globals: { theme } }) => demoChartHtml(theme),
};
