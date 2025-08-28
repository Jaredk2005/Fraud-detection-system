import { defineComponent, ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { Chart, registerables } from "chart.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DashboardChart",
  __ssrInlineRender: true,
  props: {
    data: {},
    type: {}
  },
  setup(__props) {
    Chart.register(...registerables);
    const props = __props;
    ref();
    const chartContainer = ref();
    ({
      scales: props.type === "doughnut" || props.type === "pie" ? {} : {}
    });
    watch(() => props.data, (newData) => {
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "chartContainer",
        ref: chartContainer,
        class: "w-full h-full"
      }, _attrs))}><canvas></canvas></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DashboardChart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=DashboardChart-DwKXTEfg.js.map
