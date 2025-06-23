import "../";

import "flyonui/flyonui";

// import echarts
import * as echarts from "echarts";

window.echarts = echarts;

// import notyf
import { Notyf } from 'notyf';

const notyf = new Notyf({
  duration: 2000,
  position: {
    x: 'right',
    y: 'top',
  },
  dismissible: true,
  types: [
      {
        // Added Info and Warning type 
        type: 'success',
        background: 'var(--color-success-content)',
        icon: { className: 'icon-[lucide--info] !text-success', tagName: 'i' },
        text: '',
        className: 'bg-success text-success',

      },
      {
        type: 'error',
        background: 'var(--color-error-content)',
        icon: { className: 'icon-[lucide--alert-triangle] !text-error', tagName: 'i' },
        text: '',
        className: 'bg-error text-error',
      }
    ]
});
if (!window.notyf) {
    window.notyf = notyf;
}

// import AlpineJS
import Alpine from "alpinejs";

window.Alpine = Alpine;

Alpine.data("chart", (symbol = 'BTCUSDT', interval = '4h', limit = 10) => {
  let chart;
  let candles;
  return {
    async init() {

      console.log('init chart', symbol, interval, limit);
  

      console.log('loading candles for chart');

      candles = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
          console.log('candles data', data);
            return data.map(candle => ({
            d: new Date(candle[0]).toISOString().slice(0, 16).replace('T', ' '), // date in YYYY-MM-DD HH:mm format
            o: parseFloat(candle[1]), // Open
            c: parseFloat(candle[4]), // Close
            l: parseFloat(candle[3]), // Low
            h: parseFloat(candle[2])  // High
            }))
        })
        .catch(error => {
          console.error('Error fetching candles:', error);
        });
      console.log('candles', candles[0]);
      
      chart = echarts.init(this.$el);

      loadChart(chart, this.$el, candles)
    },
    resize: {
      ["@resize.window.debounce"]() {
        if (chart) {
          chart.resize();
        }
      }
    }
  }
});

Alpine.start();

function loadChart(myChart, myChartElement, candles) {

  console.log("Loading candlestick chart...", myChart, myChartElement);

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
  const data0 = splitData(candles);

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

function splitData(candles) {  
  const categoryData = [];
  const values = [];
  for (var i = 0; i < candles.length; i++) {
    categoryData.push(candles[i].d);
    values.push([
      candles[i].o, // Open
      candles[i].c, // Close
      candles[i].l, // Low
      candles[i].h  // High
    ]);
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