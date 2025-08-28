import { _ as __nuxt_component_0 } from './nuxt-layout-CE6R6O5A.mjs';
import { _ as _sfc_main$1 } from './DashboardChart-DwKXTEfg.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, ref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { CheckCircleIcon, CreditCardIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import './server.mjs';
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
import 'chart.js';

const useFraudData = () => {
  const generateMockTransactions = (count) => {
    const transactions = [];
    for (let i = 0; i < count; i++) {
      transactions.push({
        id: `TXN${String(i + 1).padStart(6, "0")}`,
        amount: Math.random() * 5e3 + 10,
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1e3),
        merchant: ["Amazon", "Walmart", "Gas Station", "Restaurant", "ATM"][Math.floor(Math.random() * 5)],
        location: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][Math.floor(Math.random() * 5)],
        cardType: ["Visa", "MasterCard", "American Express"][Math.floor(Math.random() * 3)],
        isFraud: Math.random() < 0.05,
        confidence: Math.random() * 100,
        riskScore: Math.random() * 100
      });
    }
    return transactions;
  };
  const modelMetrics = ref({
    accuracy: 98.7,
    precision: 94.2,
    recall: 89.5,
    f1Score: 91.8,
    lastUpdated: /* @__PURE__ */ new Date(),
    status: "active",
    totalTransactions: 125e4,
    fraudDetected: 15750,
    falsePositives: 420
  });
  const dailyStats = ref([
    { date: "2024-01-15", transactions: 45e3, frauds: 180, blocked: 165 },
    { date: "2024-01-16", transactions: 48e3, frauds: 195, blocked: 178 },
    { date: "2024-01-17", transactions: 52e3, frauds: 210, blocked: 198 },
    { date: "2024-01-18", transactions: 49e3, frauds: 175, blocked: 160 },
    { date: "2024-01-19", transactions: 51e3, frauds: 220, blocked: 205 },
    { date: "2024-01-20", transactions: 47e3, frauds: 165, blocked: 152 },
    { date: "2024-01-21", transactions: 53e3, frauds: 240, blocked: 225 }
  ]);
  return {
    generateMockTransactions,
    modelMetrics,
    dailyStats
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const { modelMetrics, dailyStats, generateMockTransactions } = useFraudData();
    const recentTransactions = computed(() => {
      return generateMockTransactions(10).filter((t) => t.riskScore > 60).slice(0, 5);
    });
    const formatNumber = (num) => {
      return new Intl.NumberFormat().format(num);
    };
    const chartData = computed(() => ({
      labels: dailyStats.value.map((d) => new Date(d.date).toLocaleDateString()),
      datasets: [
        {
          label: "Total Transactions",
          data: dailyStats.value.map((d) => d.transactions),
          borderColor: "#3B82F6",
          backgroundColor: "#3B82F6",
          tension: 0.4
        },
        {
          label: "Fraudulent",
          data: dailyStats.value.map((d) => d.frauds),
          borderColor: "#EF4444",
          backgroundColor: "#EF4444",
          tension: 0.4
        }
      ]
    }));
    const pieChartData = computed(() => ({
      labels: ["Legitimate", "Fraudulent", "Under Review"],
      datasets: [
        {
          data: [94.5, 4.2, 1.3],
          backgroundColor: ["#10B981", "#EF4444", "#F59E0B"],
          borderWidth: 0
        }
      ]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_DashboardChart = _sfc_main$1;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"${_scopeId}><div class="card p-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-400"${_scopeId}>Model Accuracy</p><p class="text-2xl font-bold text-green-400"${_scopeId}>${ssrInterpolate(unref(modelMetrics).accuracy)}%</p></div><div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckCircleIcon), { class: "w-6 h-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="card p-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-400"${_scopeId}>Total Transactions</p><p class="text-2xl font-bold text-blue-400"${_scopeId}>${ssrInterpolate(formatNumber(unref(modelMetrics).totalTransactions))}</p></div><div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CreditCardIcon), { class: "w-6 h-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="card p-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-400"${_scopeId}>Frauds Detected</p><p class="text-2xl font-bold text-red-400"${_scopeId}>${ssrInterpolate(formatNumber(unref(modelMetrics).fraudDetected))}</p></div><div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ExclamationTriangleIcon), { class: "w-6 h-6 text-red-400" }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="card p-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-400"${_scopeId}>Model Status</p><p class="text-2xl font-bold text-green-400 capitalize"${_scopeId}>${ssrInterpolate(unref(modelMetrics).status)}</p></div><div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center"${_scopeId}><div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"${_scopeId}></div></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"${_scopeId}><div class="card p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>Daily Transactions</h3><div class="h-64"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_DashboardChart, {
              data: unref(chartData),
              type: "line"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="card p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>Fraud Distribution</h3><div class="h-64"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_DashboardChart, {
              data: unref(pieChartData),
              type: "doughnut"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="card p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-6"${_scopeId}>Model Performance Metrics</h3><div class="grid grid-cols-1 md:grid-cols-4 gap-6"${_scopeId}><div class="text-center"${_scopeId}><div class="text-2xl font-bold text-blue-400"${_scopeId}>${ssrInterpolate(unref(modelMetrics).precision)}%</div><div class="text-sm text-gray-400"${_scopeId}>Precision</div></div><div class="text-center"${_scopeId}><div class="text-2xl font-bold text-green-400"${_scopeId}>${ssrInterpolate(unref(modelMetrics).recall)}%</div><div class="text-sm text-gray-400"${_scopeId}>Recall</div></div><div class="text-center"${_scopeId}><div class="text-2xl font-bold text-purple-400"${_scopeId}>${ssrInterpolate(unref(modelMetrics).f1Score)}%</div><div class="text-sm text-gray-400"${_scopeId}>F1-Score</div></div><div class="text-center"${_scopeId}><div class="text-2xl font-bold text-yellow-400"${_scopeId}>${ssrInterpolate(unref(modelMetrics).falsePositives)}</div><div class="text-sm text-gray-400"${_scopeId}>False Positives</div></div></div></div><div class="card p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>Recent High-Risk Transactions</h3><div class="overflow-x-auto"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead${_scopeId}><tr class="border-b border-gray-700"${_scopeId}><th class="text-left py-3 text-gray-400"${_scopeId}>Transaction ID</th><th class="text-left py-3 text-gray-400"${_scopeId}>Amount</th><th class="text-left py-3 text-gray-400"${_scopeId}>Merchant</th><th class="text-left py-3 text-gray-400"${_scopeId}>Risk Score</th><th class="text-left py-3 text-gray-400"${_scopeId}>Status</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(unref(recentTransactions), (transaction) => {
              _push2(`<tr class="border-b border-gray-700/50"${_scopeId}><td class="py-3 text-blue-400"${_scopeId}>${ssrInterpolate(transaction.id)}</td><td class="py-3"${_scopeId}>$${ssrInterpolate(transaction.amount.toFixed(2))}</td><td class="py-3"${_scopeId}>${ssrInterpolate(transaction.merchant)}</td><td class="py-3"${_scopeId}><span class="${ssrRenderClass(transaction.riskScore > 80 ? "text-red-400" : transaction.riskScore > 50 ? "text-yellow-400" : "text-green-400")}"${_scopeId}>${ssrInterpolate(transaction.riskScore.toFixed(1))}% </span></td><td class="py-3"${_scopeId}><span class="${ssrRenderClass([transaction.isFraud ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400", "px-2 py-1 rounded-full text-xs"])}"${_scopeId}>${ssrInterpolate(transaction.isFraud ? "Flagged" : "Approved")}</span></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, [
                  createVNode("div", { class: "card p-6" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-gray-400" }, "Model Accuracy"),
                        createVNode("p", { class: "text-2xl font-bold text-green-400" }, toDisplayString(unref(modelMetrics).accuracy) + "%", 1)
                      ]),
                      createVNode("div", { class: "w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center" }, [
                        createVNode(unref(CheckCircleIcon), { class: "w-6 h-6 text-green-400" })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "card p-6" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-gray-400" }, "Total Transactions"),
                        createVNode("p", { class: "text-2xl font-bold text-blue-400" }, toDisplayString(formatNumber(unref(modelMetrics).totalTransactions)), 1)
                      ]),
                      createVNode("div", { class: "w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center" }, [
                        createVNode(unref(CreditCardIcon), { class: "w-6 h-6 text-blue-400" })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "card p-6" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-gray-400" }, "Frauds Detected"),
                        createVNode("p", { class: "text-2xl font-bold text-red-400" }, toDisplayString(formatNumber(unref(modelMetrics).fraudDetected)), 1)
                      ]),
                      createVNode("div", { class: "w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center" }, [
                        createVNode(unref(ExclamationTriangleIcon), { class: "w-6 h-6 text-red-400" })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "card p-6" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-gray-400" }, "Model Status"),
                        createVNode("p", { class: "text-2xl font-bold text-green-400 capitalize" }, toDisplayString(unref(modelMetrics).status), 1)
                      ]),
                      createVNode("div", { class: "w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center" }, [
                        createVNode("div", { class: "w-3 h-3 bg-green-400 rounded-full animate-pulse" })
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                  createVNode("div", { class: "card p-6" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "Daily Transactions"),
                    createVNode("div", { class: "h-64" }, [
                      createVNode(_component_DashboardChart, {
                        data: unref(chartData),
                        type: "line"
                      }, null, 8, ["data"])
                    ])
                  ]),
                  createVNode("div", { class: "card p-6" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "Fraud Distribution"),
                    createVNode("div", { class: "h-64" }, [
                      createVNode(_component_DashboardChart, {
                        data: unref(pieChartData),
                        type: "doughnut"
                      }, null, 8, ["data"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "card p-6" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-white mb-6" }, "Model Performance Metrics"),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-6" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("div", { class: "text-2xl font-bold text-blue-400" }, toDisplayString(unref(modelMetrics).precision) + "%", 1),
                      createVNode("div", { class: "text-sm text-gray-400" }, "Precision")
                    ]),
                    createVNode("div", { class: "text-center" }, [
                      createVNode("div", { class: "text-2xl font-bold text-green-400" }, toDisplayString(unref(modelMetrics).recall) + "%", 1),
                      createVNode("div", { class: "text-sm text-gray-400" }, "Recall")
                    ]),
                    createVNode("div", { class: "text-center" }, [
                      createVNode("div", { class: "text-2xl font-bold text-purple-400" }, toDisplayString(unref(modelMetrics).f1Score) + "%", 1),
                      createVNode("div", { class: "text-sm text-gray-400" }, "F1-Score")
                    ]),
                    createVNode("div", { class: "text-center" }, [
                      createVNode("div", { class: "text-2xl font-bold text-yellow-400" }, toDisplayString(unref(modelMetrics).falsePositives), 1),
                      createVNode("div", { class: "text-sm text-gray-400" }, "False Positives")
                    ])
                  ])
                ]),
                createVNode("div", { class: "card p-6" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "Recent High-Risk Transactions"),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-sm" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "border-b border-gray-700" }, [
                          createVNode("th", { class: "text-left py-3 text-gray-400" }, "Transaction ID"),
                          createVNode("th", { class: "text-left py-3 text-gray-400" }, "Amount"),
                          createVNode("th", { class: "text-left py-3 text-gray-400" }, "Merchant"),
                          createVNode("th", { class: "text-left py-3 text-gray-400" }, "Risk Score"),
                          createVNode("th", { class: "text-left py-3 text-gray-400" }, "Status")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(recentTransactions), (transaction) => {
                          return openBlock(), createBlock("tr", {
                            key: transaction.id,
                            class: "border-b border-gray-700/50"
                          }, [
                            createVNode("td", { class: "py-3 text-blue-400" }, toDisplayString(transaction.id), 1),
                            createVNode("td", { class: "py-3" }, "$" + toDisplayString(transaction.amount.toFixed(2)), 1),
                            createVNode("td", { class: "py-3" }, toDisplayString(transaction.merchant), 1),
                            createVNode("td", { class: "py-3" }, [
                              createVNode("span", {
                                class: transaction.riskScore > 80 ? "text-red-400" : transaction.riskScore > 50 ? "text-yellow-400" : "text-green-400"
                              }, toDisplayString(transaction.riskScore.toFixed(1)) + "% ", 3)
                            ]),
                            createVNode("td", { class: "py-3" }, [
                              createVNode("span", {
                                class: [transaction.isFraud ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400", "px-2 py-1 rounded-full text-xs"]
                              }, toDisplayString(transaction.isFraud ? "Flagged" : "Approved"), 3)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-C89aGOKY.mjs.map
