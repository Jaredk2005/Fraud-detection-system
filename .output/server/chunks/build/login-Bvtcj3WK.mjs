import { defineComponent, reactive, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { ShieldCheckIcon } from '@heroicons/vue/24/outline';
import { u as useAuth } from './useAuth-XXrPh909.mjs';
import { u as useRouter } from './server.mjs';
import './state-_I5XcLqc.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    useRouter();
    const form = reactive({
      email: "",
      password: ""
    });
    const loading = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4" }, _attrs))}><div class="max-w-md w-full space-y-8"><div class="text-center"><div class="mx-auto w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-4">`);
      _push(ssrRenderComponent(unref(ShieldCheckIcon), { class: "w-8 h-8 text-white" }, null, _parent));
      _push(`</div><h2 class="text-3xl font-bold text-white">Sign in to CCFD</h2><p class="mt-2 text-gray-400">Access your fraud detection dashboard</p></div><form class="mt-8 space-y-6"><div><label for="email" class="block text-sm font-medium text-gray-300 mb-2"> Email address </label><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" required class="input-field w-full" placeholder="Enter your email"></div><div><label for="password" class="block text-sm font-medium text-gray-300 mb-2"> Password </label><input id="password"${ssrRenderAttr("value", unref(form).password)} type="password" required class="input-field w-full" placeholder="Enter your password"></div>`);
      if (unref(error)) {
        _push(`<div class="text-red-400 text-sm text-center">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full btn-primary py-3 text-lg disabled:opacity-50">`);
      if (unref(loading)) {
        _push(`<span>Signing in...</span>`);
      } else {
        _push(`<span>Sign in</span>`);
      }
      _push(`</button></form><div class="text-center text-sm text-gray-400"><p>Demo credentials:</p><p>Email: blessing@gmail.com</p><p>Password: password</p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-Bvtcj3WK.mjs.map
