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

Alpine.data("chart", () => {
  let chart;
  return {
    init() {
      chart = echarts.init(this.$el);

      loadChart(chart, this.$el)
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