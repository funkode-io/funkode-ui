import "../../";

import "flyonui/flyonui";

// import echarts
import * as echarts from "echarts";

window.echarts = echarts;

// import notyf
import { Notyf } from "notyf";

const notyf = new Notyf({
  duration: 2000,
  position: {
    x: "right",
    y: "top",
  },
  dismissible: true,
  types: [
    {
      // Added Info and Warning type
      type: "success",
      background: "var(--color-success-content)",
      icon: { className: "icon-[lucide--info] !text-success", tagName: "i" },
      text: "",
      className: "bg-success text-success",
    },
    {
      type: "error",
      background: "var(--color-error-content)",
      icon: { className: "icon-[lucide--alert-triangle] !text-error", tagName: "i" },
      text: "",
      className: "bg-error text-error",
    },
  ],
});
if (!window.notyf) {
  window.notyf = notyf;
}

// import AlpineJS
import Alpine from "alpinejs";

window.Alpine = Alpine;

Alpine.data("chart", (symbol = "BTCUSDT", interval = "4h", limit = 10) => {
  let chart;
  let candles = [];
  return {
    symbol: symbol,
    interval: interval,
    limit: limit,
    async init() {
      console.log("init chart", symbol, interval, limit);

      chart = echarts.init(this.$refs.chart);
      this._loadChartData();

      this.$watch("symbol", (newSymbol) => {
        console.log("symbol changed to", newSymbol);
        this._loadChartData();
      });
      this.$watch("interval", (newInterval) => {
        console.log("interval changed to", newInterval);
        this._loadChartData();
      });
      this.$watch("limit", (newLimit) => {
        console.log("limit changed to", newLimit);
        this._loadChartData();
      });
    },
    async _loadChartData() {
      console.log("loading candles for chart");

      chart.showLoading();
      candles = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${this.symbol}&interval=${this.interval}&limit=${this.limit}`,
      )
        .then((response) => response.json())
        .then((data) =>
          data.map((candle, i) => ({
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
          chart.hideLoading();
        });
      console.log(`${candles.length}# candles, first`, candles[0]);

      this.renderChart();
    },
    resize: {
      ["@resize.window.debounce"]() {
        if (chart) {
          chart.resize();
        }
      },
    },

    renderChart() {
      const myChart = chart;
      const myChartElement = this.$refs.chart;

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
      const data0 = splitData(candles);

      // market structure points
      let msPoints = [];
      let firstCandle = candles[0];

      let lastHigh = null;
      let lastLow = null;

      let lastHH = firstCandle;
      let lastLL = firstCandle;

      let waitConfirmHH = false;
      let oneCandleClosedBearish = false;
      let itMadeLowerHigh = false;

      let waitConfirmLL = false;
      let oneCandleClosedBullish = false;
      let itMadeHigherLow = false;

      for (let i = 1; i < candles.length; i++) {
        const candle = candles[i];

        if (candle.h > lastHH.h) {
          console.log("broke HH", candle.h, lastHH.h);

          lastHH = { ...candle };

          waitConfirmHH = true;
          oneCandleClosedBearish = false;
          itMadeLowerHigh = false;
        }

        // only needed when we are waiting for a confirmation of a new HH
        if (waitConfirmHH && candle.h < lastHH.h) {
          itMadeLowerHigh = true;
        }

        if (waitConfirmHH && candle.o < candle.c) {
          oneCandleClosedBearish = true;
        }

        // if we confirmed a new HH
        if (waitConfirmHH && itMadeLowerHigh && oneCandleClosedBearish) {
          console.log("confirmed HH", lastHH.h);
          waitConfirmHH = false;
          lastHH.interest = "HH";
          lastHH.trend = "bulltrend";
          msPoints.push(lastHH);

          // find previous candle that was a LL
          let previousCandle = lastHH.i > 0 ? candles[lastHH.i - 1] : firstCandle;
          let causedHH = previousCandle;
          for (let j = previousCandle.i - 1; j >= 0; j--) {
            if (candles[j].l < causedHH.l) {
              causedHH = { ...candles[j] };
            } else if (candles[j].o > candles[j].c) {
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
          oneCandleClosedBullish = false;
          itMadeHigherLow = false;
        }

        // only needed when we are waiting for a confirmation of a new LL
        if (waitConfirmLL && candle.l > lastLL.l) {
          itMadeHigherLow = true;
        }

        if (waitConfirmLL && candle.o > candle.c) {
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
          let previousCandle = lastLL.i > 0 ? candles[lastLL.i - 1] : firstCandle;

          let causedLL = previousCandle;
          for (let j = previousCandle.i - 1; j >= 0; j--) {
            if (candles[j].h > causedLL.h) {
              causedLL = { ...candles[j] };
            } else if (candles[j].o < candles[j].c) {
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

      option && myChart.setOption(option);
    },
  };
});

Alpine.start();

function splitData(candles) {
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

function getCurrentTheme() {
  const theme = document.querySelector("[data-theme]");
  console.log("found theme?", theme);
  return theme ? theme.getAttribute("data-theme") : "amber";
}
