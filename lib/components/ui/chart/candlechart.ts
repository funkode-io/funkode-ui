import * as echarts from 'echarts';

export interface CandleChartProps {
    symbol: string;
    interval: string;
    startTime?: number;
    endTime?: number;
    limit?: number;
}

export interface Candle {
    i: number; // Index
    d: string; // Date in YYYY-MM-DD HH:mm format
    o: number; // Open price
    c: number; // Close price 
    l: number; // Low price
    h: number; // High price
    trend?: "bulltrend" | "beartrend"; // Trend type
    interest?: "HH" | "LL"; // Market structure interest
}
function splitData(candles: Candle[]) {
  const categoryData = [];
  const values = [];
  for (var i = 0; i < candles.length; i++) {
    categoryData.push(candles[i].d);
    values.push([
      candles[i].o, // Open
      candles[i].c, // Close
      candles[i].l, // Low
      candles[i].h, // High
    ]);
  }

  return {
    categoryData: categoryData,
    values: values,
  };
}

export class CandleChart extends HTMLElement {
    static observedAttributes = ["symbol", "interval", "start-time", "end-time", "limit"];

    private symbol: string = "BTCUSDT"; // Default symbol
    private interval: string = "1m"; // Default interval
    private startTime?: number; // Optional start time
    private endTime?: number; // Optional end time
    private limit: number = 100; // Default limit for number of candles

    private chart: echarts.ECharts | null = null;
    private candles: Candle[] = [];

    constructor() {
        super();

        this.symbol = this.getAttribute("symbol") || this.symbol;
        this.interval = this.getAttribute("interval") || this.interval;
        this.startTime = this.getAttribute("start-time") ? parseInt(this.getAttribute("start-time") || "0", 10) : this.startTime;
        this.endTime = this.getAttribute("end-time") ? parseInt(this.getAttribute("end-time") || "0", 10) : this.endTime;
        this.limit = this.getAttribute("limit") ? parseInt(this.getAttribute("limit") || "100", 10) : this.limit;
        
        // Initialize the chart instance
        this.chart = echarts.init(this);
    }

    async loadChartData() {
      console.log("loading candles for chart");

      this.chart?.showLoading();
      this.candles = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${this.symbol}&interval=${this.interval}&limit=${this.limit}`,
      )
        .then((response) => response.json())
        .then((data) =>
          data.map((candle: any, i: number) => ({
            i,
            d: new Date(candle[0]).toISOString().slice(0, 16).replace("T", " "), // date in YYYY-MM-DD HH:mm format
            o: parseFloat(candle[1]), // Open
            c: parseFloat(candle[4]), // Close
            l: parseFloat(candle[3]), // Low
            h: parseFloat(candle[2]), // High
          })),
        )
        .catch((error) => {
          console.error("Error fetching candles:", error);
        })
        .finally(() => {
          this.chart?.hideLoading();
        });
      console.log(`${this.candles.length}# candles, first`, this.candles[0]);

      this.render();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === "symbol" && newValue !== oldValue) {
            this.symbol = newValue;
            this.loadChartData();
            this.render();
        } else if (name === "interval" && newValue !== oldValue) {
            this.interval = newValue;
            this.loadChartData();
            this.render();
        } else if (name === "start-time" && newValue !== oldValue) {
            this.startTime = newValue ? parseInt(newValue, 10) : undefined;
            this.loadChartData();
            this.render();
        } else if (name === "end-time" && newValue !== oldValue) {
            this.endTime = newValue ? parseInt(newValue, 10) : undefined;
            this.loadChartData();
            this.render();
        } else if (name === "limit" && newValue !== oldValue) {
            this.limit = newValue ? parseInt(newValue, 10) : 100;
            this.loadChartData();
            this.render();
        }
    }

    render() {
      const myChart = this.chart;
      const myChartElement = this;

      console.log("Loading candlestick chart...", myChart, myChartElement);

      const styles = getComputedStyle(myChartElement);

      const base300Color = styles.getPropertyValue("--color-base-300") || "#ffffff";
      const baseContentColor = styles.getPropertyValue("--color-base-content") || "#000000";
      const accentColor = styles.getPropertyValue("--color-accent") || "#ff5722";
      const accentColorContent = styles.getPropertyValue("--color-accent-content") || "#ffffff";
      const infoColor = styles.getPropertyValue("--color-info") || "#2196f3";
      const successColor = styles.getPropertyValue("--color-success") || "#4caf50";
      const successColorContent = styles.getPropertyValue("--color-success-content") || "#ffffff";
      const errorColor = styles.getPropertyValue("--color-error") || "#f44336";
      const errorColorContent = styles.getPropertyValue("--color-error-content") || "#ffffff";
      const neutralColor = styles.getPropertyValue("--color-neutral") || "#9e9e9e";
      const neutralContentColor = styles.getPropertyValue("--color-neutral-content") || "#212121";

      const backgroundColor = base300Color;
      const titleColor = baseContentColor;
      const subtitleColor = infoColor;

      const bullishCandleColor = accentColor; // Color for bullish candles
      const bullishCandleBorderColor = accentColorContent; // Border color for bullish candles
      const bearishCandleColor = neutralColor; // Color for bearish candles
      const bearishCandleBorderColor = neutralContentColor; // Border color for bearish candles

      // chart data for candlesticks
      const data0 = splitData(this.candles);

      // market structure points
      let msPoints = [];
      let firstCandle = this.candles[0];

      let lastHH = firstCandle;
      let lastLL = firstCandle;

      let waitConfirmHH = false;
      let oneCandleClosedBearish = false;
      let itMadeLowerHigh = false;

      let waitConfirmLL = false;
      let oneCandleClosedBullish = false;
      let itMadeHigherLow = false;

      for (let i = 1; i < this.candles.length; i++) {
        const candle = this.candles[i];

        if (candle.h > lastHH.h) {
          console.log("broke HH", candle.h, lastHH.h);

          lastHH = { ...candle };

          waitConfirmHH = true;
          waitConfirmLL = false;
          oneCandleClosedBearish = false;
          itMadeLowerHigh = false;
        }

        // only needed when we are waiting for a confirmation of a new HH
        if (waitConfirmHH && candle.h < lastHH.h) {
          console.log("it made lower high", candle.h, lastHH.h);
          itMadeLowerHigh = true;
        }

        if (waitConfirmHH && candle.c < candle.o) {
          console.log("one candle closed bearish", candle.o, candle.c);
          oneCandleClosedBearish = true;
        }

        // if we confirmed a new HH
        if (waitConfirmHH && itMadeLowerHigh && oneCandleClosedBearish) {
          console.log("confirmed HH", lastHH.h);
          waitConfirmHH = false;
          itMadeLowerHigh = false;
          oneCandleClosedBearish = false;

          lastHH.interest = "HH";
          lastHH.trend = "bulltrend";
          msPoints.push(lastHH);

          // find previous candle that was a LL
          let previousCandle = lastHH.i > 0 ? this.candles[lastHH.i - 1] : firstCandle;
          let causedHH = previousCandle;
          for (let j = previousCandle.i - 1; j >= 0; j--) {
            if (this.candles[j].l < causedHH.l) {
              causedHH = { ...this.candles[j] };
            } else if (this.candles[j].o > this.candles[j].c) {
              break;
            }
          }

          console.log("caused HH", causedHH);

          causedHH.interest = "LL";
          causedHH.trend = "bulltrend";

          // add if the low is different from the last one
          if (causedHH.i !== lastLL.i) {
            msPoints.push(causedHH);
          }

          lastLL = causedHH; // update lastLL to the caused HH
        }

        if (candle.l < lastLL.l) {
          console.log("broke LL", candle.l, lastLL.l);

          lastLL = candle;
          // Make a copy of the candle object to avoid mutating the original
          lastLL = { ...candle };

          waitConfirmLL = true;
          waitConfirmHH = false;
          oneCandleClosedBullish = false;
          itMadeHigherLow = false;
        }

        // only needed when we are waiting for a confirmation of a new LL
        if (waitConfirmLL && candle.l > lastLL.l) {
          itMadeHigherLow = true;
        }

        if (waitConfirmLL && candle.c > candle.o) {
          oneCandleClosedBullish = true;
        }

        // if we confirmed a new LL
        if (waitConfirmLL && itMadeHigherLow && oneCandleClosedBullish) {
          console.log("confirmed LL", lastLL);
          waitConfirmLL = false;
          lastLL.interest = "LL";
          lastLL.trend = "beartrend";
          msPoints.push(lastLL);

          // find previous candle that was a HH
          let previousCandle = lastLL.i > 0 ? this.candles[lastLL.i - 1] : firstCandle;

          let causedLL = previousCandle;
          for (let j = previousCandle.i - 1; j >= 0; j--) {
            if (this.candles[j].h > causedLL.h) {
              causedLL = { ...this.candles[j] };
            } else if (this.candles[j].o < this.candles[j].c) {
              break;
            }
          }

          console.log("caused LL", causedLL);

          causedLL.interest = "HH";
          causedLL.trend = "beartrend";

          // add if the high is different from the last one
          if (causedLL.i !== lastHH.i) {
            msPoints.push(causedLL);
          }

          lastHH = causedLL; // update lastHH to the caused LL
        }
      }

      console.log("msPoints", msPoints);

      let msPointsData = msPoints.map((candle) => {
        return {
          value: [
            candle.d, // date in YYYY-MM-DD HH:mm format
            candle.interest === "HH" ? candle.h : candle.l, // use high for HH
          ],
          itemStyle: {
            color: candle.trend === "bulltrend" ? successColor : errorColor, // Color for HH and LL points
            borderColor: candle.trend === "bulltrend" ? successColorContent : errorColorContent, // Border color for HH and LL points
            borderWidth: 2,
          },
        };
      });

      console.log("msPointsData", msPointsData);

      var option;

      option = {
        color: ["#893448", "#d95850", "#eb8146", "#ffb248", "#f2d643", "#ebdba4"],
        backgroundColor: backgroundColor,
        textStyle: {},
        title: {
          text: "ECharts Demo Chart",
          subtext: "A simple candlestick chart",
          left: "center",
          textStyle: {
            color: titleColor,
          },
          subtextStyle: {
            color: subtitleColor,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },

        xAxis: {
          type: "category",
          data: data0.categoryData,
          splitLine: { show: true },
          min: "dataMin",
          max: "dataMax",
        },
        yAxis: {
          scale: true,
          position: "right",
          splitArea: {
            show: true,
          },
        },
        series: [
          {
            type: "candlestick",
            itemStyle: {
              color: bullishCandleColor, // Color for bullish candles
              color0: bearishCandleColor, // Color for bearish candles
              borderColor: bullishCandleBorderColor, // Border color for all candles
              borderColor0: bearishCandleBorderColor,
              borderWidth: "2", // Border color for all candles
            },
            emphasis: {
              itemStyle: {
                color: bullishCandleColor, // Color for bullish candles
                color0: bearishCandleColor, // Color for bearish candles
                borderColor: bullishCandleBorderColor, // Border color for all candles
                borderColor0: bearishCandleBorderColor,
              },
            },
            data: data0.values,
          },
          {
            type: "scatter",
            symbolSize: 20,
            data: msPointsData,
          },
        ],
      };

      option && this.chart?.setOption(option);
    }
}

customElements.define("fk-candle-chart", CandleChart, { extends: "div" });