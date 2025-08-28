import { _ as __nuxt_component_0 } from './nuxt-link-BLhAAG2j.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { ChartBarIcon, CogIcon, MagnifyingGlassIcon, ChartPieIcon, UserCircleIcon } from '@heroicons/vue/24/outline';
import { u as useAuth } from './useAuth-XXrPh909.mjs';
import { c as useRoute } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './state-_I5XcLqc.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const route = useRoute();
    const pageTitle = computed(() => {
      const titles = {
        "/dashboard": "Dashboard Overview",
        "/training": "Model Training",
        "/prediction": "Fraud Prediction",
        "/analysis": "Data Analysis",
        "/reports": "Report Generation"
      };
      return titles[route.path] || "FraudGuard";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-900" }, _attrs))}><div class="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700"><div class="flex items-center justify-center h-16 border-b border-gray-700"><h1 class="text-xl font-bold text-blue-400">CCFD</h1></div><nav class="mt-8"><div class="px-4 space-y-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard",
        class: "flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors",
        "active-class": "bg-blue-600 text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ChartBarIcon), { class: "w-5 h-5 mr-3" }, null, _parent2, _scopeId));
            _push2(` Dashboard `);
          } else {
            return [
              createVNode(unref(ChartBarIcon), { class: "w-5 h-5 mr-3" }),
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/training",
        class: "flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors",
        "active-class": "bg-blue-600 text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CogIcon), { class: "w-5 h-5 mr-3" }, null, _parent2, _scopeId));
            _push2(` Model Training `);
          } else {
            return [
              createVNode(unref(CogIcon), { class: "w-5 h-5 mr-3" }),
              createTextVNode(" Model Training ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/prediction",
        class: "flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors",
        "active-class": "bg-blue-600 text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(MagnifyingGlassIcon), { class: "w-5 h-5 mr-3" }, null, _parent2, _scopeId));
            _push2(` Prediction `);
          } else {
            return [
              createVNode(unref(MagnifyingGlassIcon), { class: "w-5 h-5 mr-3" }),
              createTextVNode(" Prediction ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/analysis",
        class: "flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors",
        "active-class": "bg-blue-600 text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ChartPieIcon), { class: "w-5 h-5 mr-3" }, null, _parent2, _scopeId));
            _push2(` Analysis `);
          } else {
            return [
              createVNode(unref(ChartPieIcon), { class: "w-5 h-5 mr-3" }),
              createTextVNode(" Analysis ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></nav></div><div class="pl-64"><header class="bg-gray-800 border-b border-gray-700 h-16 flex items-center justify-between px-6"><div class="flex-1"><h2 class="text-lg font-semibold text-gray-100">${ssrInterpolate(unref(pageTitle))}</h2></div><div class="flex items-center space-x-4"><div class="flex items-center space-x-2"><div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div><span class="text-sm text-gray-300">System Online</span></div><div class="flex items-center space-x-2">`);
      _push(ssrRenderComponent(unref(UserCircleIcon), { class: "w-8 h-8 text-gray-400" }, null, _parent));
      _push(`<span class="text-sm text-gray-300">Blessing</span><button class="text-sm text-red-400 hover:text-red-300"> Logout </button></div></div></header><main class="p-6">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-BK9C7FJI.mjs.map
