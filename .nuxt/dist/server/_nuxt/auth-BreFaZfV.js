import { f as defineNuxtRouteMiddleware, n as navigateTo } from "../server.mjs";
import { u as useState } from "./state-_I5XcLqc.js";
import "vue";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/project/node_modules/hookable/dist/index.mjs";
import "/home/project/node_modules/unctx/dist/index.mjs";
import "/home/project/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/project/node_modules/radix3/dist/index.mjs";
import "/home/project/node_modules/defu/dist/defu.mjs";
import "/home/project/node_modules/ufo/dist/index.mjs";
import "vue/server-renderer";
const auth = defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = useState("auth.isAuthenticated", () => false);
  if (!isAuthenticated.value) {
    return navigateTo("/login");
  }
});
export {
  auth as default
};
//# sourceMappingURL=auth-BreFaZfV.js.map
