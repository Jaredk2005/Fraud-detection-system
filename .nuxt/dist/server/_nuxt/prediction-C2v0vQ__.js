import { _ as __nuxt_component_0 } from "./nuxt-layout-CE6R6O5A.js";
import { defineComponent, ref, reactive, computed, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, withModifiers, withDirectives, vModelText, vModelSelect, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { CloudArrowUpIcon } from "@heroicons/vue/24/outline";
import "/home/project/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/project/node_modules/unctx/dist/index.mjs";
import "/home/project/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/project/node_modules/radix3/dist/index.mjs";
import "/home/project/node_modules/defu/dist/defu.mjs";
import "/home/project/node_modules/ufo/dist/index.mjs";
const API_BASE_URL = "http://localhost:8000";
const pageSize = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "prediction",
  __ssrInlineRender: true,
  setup(__props) {
    const activeTab = ref("single");
    const predicting = ref(false);
    const processingBatch = ref(false);
    const uploadedFile = ref(null);
    const fileInput = ref();
    const error = ref("");
    const singleForm = reactive({
      amt: "",
      category: "",
      merchant: "",
      gender: "",
      job: ""
    });
    const singleResult = ref(null);
    const batchResults = ref([]);
    const currentPage = ref(1);
    const batchSummaryData = ref({
      total: 0,
      fraud: 0,
      legitimate: 0,
      high_risk: 0,
      fraud_rate: 0,
      average_fraud_probability: 0
    });
    const batchSummary = computed(() => batchSummaryData.value);
    const totalPages = computed(() => Math.ceil(batchResults.value.length / pageSize));
    const paginatedResults = computed(() => {
      const start = (currentPage.value - 1) * pageSize;
      const end = start + pageSize;
      return batchResults.value.slice(start, end);
    });
    const predictSingle = async () => {
      var _a;
      predicting.value = true;
      error.value = "";
      singleResult.value = null;
      try {
        const requestBody = {
          amt: parseFloat(singleForm.amt),
          category: singleForm.category,
          merchant: singleForm.merchant,
          gender: singleForm.gender,
          job: singleForm.job
        };
        const response = await $fetch(`${API_BASE_URL}/predict`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: requestBody
        });
        singleResult.value = response;
      } catch (err) {
        error.value = ((_a = err.data) == null ? void 0 : _a.detail) || err.message || "An error occurred while making the prediction";
        console.error("Prediction error:", err);
      } finally {
        predicting.value = false;
      }
    };
    const handleFileUpload = (event) => {
      const target = event.target;
      if (target.files && target.files[0]) {
        uploadedFile.value = target.files[0];
        error.value = "";
      }
    };
    const processBatch = async () => {
      var _a;
      if (!uploadedFile.value) return;
      processingBatch.value = true;
      error.value = "";
      try {
        const formData = new FormData();
        formData.append("file", uploadedFile.value);
        const response = await $fetch(`${API_BASE_URL}/predict/batch`, {
          method: "POST",
          body: formData
        });
        batchResults.value = response.predictions.map((prediction, index) => ({
          ...prediction,
          // Since we don't have the original amount in the response, we'll use index for display
          // In a real scenario, you might want to store original data or modify the API response
          amt: 0,
          // Will be hidden in the table since we don't have this data
          originalIndex: index
        }));
        batchSummaryData.value = {
          total: response.summary.total_transactions || response.predictions.length,
          fraud: response.summary.fraud_detected || response.predictions.filter((p) => p.is_fraud).length,
          legitimate: (response.summary.total_transactions || response.predictions.length) - (response.summary.fraud_detected || response.predictions.filter((p) => p.is_fraud).length),
          high_risk: response.summary.high_risk_transactions || response.predictions.filter((p) => p.risk_level === "HIGH").length,
          fraud_rate: response.summary.fraud_rate || 0,
          average_fraud_probability: response.summary.average_fraud_probability || 0
        };
        currentPage.value = 1;
      } catch (err) {
        error.value = ((_a = err.data) == null ? void 0 : _a.detail) || err.message || "An error occurred while processing the batch";
        console.error("Batch processing error:", err);
      } finally {
        processingBatch.value = false;
      }
    };
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const getRiskLevelColor = (riskLevel) => {
      switch (riskLevel) {
        case "LOW":
          return "text-green-400";
        case "MEDIUM":
          return "text-yellow-400";
        case "HIGH":
          return "text-red-400";
        default:
          return "text-gray-400";
      }
    };
    const exportResults = () => {
      if (batchResults.value.length === 0) return;
      const csvContent = [
        "transaction_id,row_number,is_fraud,fraud_probability,risk_level",
        ...batchResults.value.map(
          (result) => `${result.transaction_id},${result.originalIndex + 1},${result.is_fraud},${result.fraud_probability},${result.risk_level}`
        )
      ].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = (void 0).createElement("a");
      a.href = url;
      a.download = `fraud_predictions_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    };
    const downloadReport = () => {
      if (batchResults.value.length === 0) return;
      const report = {
        generated_at: (/* @__PURE__ */ new Date()).toISOString(),
        summary: batchSummaryData.value,
        total_predictions: batchResults.value.length,
        results: batchResults.value.map((result) => ({
          transaction_id: result.transaction_id,
          row_number: result.originalIndex + 1,
          is_fraud: result.is_fraud,
          fraud_probability: result.fraud_probability,
          risk_level: result.risk_level
        }))
      };
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = (void 0).createElement("a");
      a.href = url;
      a.download = `fraud_detection_report_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div class="flex space-x-4 mb-6"${_scopeId}><button class="${ssrRenderClass(unref(activeTab) === "single" ? "btn-primary" : "btn-secondary")}"${_scopeId}> Single Prediction </button><button class="${ssrRenderClass(unref(activeTab) === "batch" ? "btn-primary" : "btn-secondary")}"${_scopeId}> Batch Prediction </button></div>`);
            if (unref(activeTab) === "single") {
              _push2(`<div class="card p-6"${_scopeId}><h2 class="text-xl font-semibold text-white mb-6"${_scopeId}>Single Transaction Prediction</h2><form class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-300 mb-2"${_scopeId}>Transaction Amount</label><input${ssrRenderAttr("value", unref(singleForm).amt)} type="number" step="0.01" class="input-field w-full" placeholder="0.00" required${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-300 mb-2"${_scopeId}>Category</label><select class="input-field w-full" required${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).category) ? ssrLooseContain(unref(singleForm).category, "") : ssrLooseEqual(unref(singleForm).category, "")) ? " selected" : ""}${_scopeId}>Select category</option><option value="personal_care"${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).category) ? ssrLooseContain(unref(singleForm).category, "personal_care") : ssrLooseEqual(unref(singleForm).category, "personal_care")) ? " selected" : ""}${_scopeId}>Personal Care</option><option value="health_fitness"${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).category) ? ssrLooseContain(unref(singleForm).category, "health_fitness") : ssrLooseEqual(unref(singleForm).category, "health_fitness")) ? " selected" : ""}${_scopeId}>Health &amp; Fitness</option><option value="food_dining"${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).category) ? ssrLooseContain(unref(singleForm).category, "food_dining") : ssrLooseEqual(unref(singleForm).category, "food_dining")) ? " selected" : ""}${_scopeId}>Food &amp; Dining</option><option value="gas_transport"${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).category) ? ssrLooseContain(unref(singleForm).category, "gas_transport") : ssrLooseEqual(unref(singleForm).category, "gas_transport")) ? " selected" : ""}${_scopeId}>Gas &amp; Transport</option><option value="entertainment"${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).category) ? ssrLooseContain(unref(singleForm).category, "entertainment") : ssrLooseEqual(unref(singleForm).category, "entertainment")) ? " selected" : ""}${_scopeId}>Entertainment</option><option value="shopping_net"${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).category) ? ssrLooseContain(unref(singleForm).category, "shopping_net") : ssrLooseEqual(unref(singleForm).category, "shopping_net")) ? " selected" : ""}${_scopeId}>Online Shopping</option><option value="grocery_net"${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).category) ? ssrLooseContain(unref(singleForm).category, "grocery_net") : ssrLooseEqual(unref(singleForm).category, "grocery_net")) ? " selected" : ""}${_scopeId}>Online Grocery</option><option value="grocery_pos"${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).category) ? ssrLooseContain(unref(singleForm).category, "grocery_pos") : ssrLooseEqual(unref(singleForm).category, "grocery_pos")) ? " selected" : ""}${_scopeId}>Grocery Store</option><option value="shopping_pos"${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).category) ? ssrLooseContain(unref(singleForm).category, "shopping_pos") : ssrLooseEqual(unref(singleForm).category, "shopping_pos")) ? " selected" : ""}${_scopeId}>Retail Shopping</option><option value="misc_net"${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).category) ? ssrLooseContain(unref(singleForm).category, "misc_net") : ssrLooseEqual(unref(singleForm).category, "misc_net")) ? " selected" : ""}${_scopeId}>Miscellaneous Online</option><option value="misc_pos"${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).category) ? ssrLooseContain(unref(singleForm).category, "misc_pos") : ssrLooseEqual(unref(singleForm).category, "misc_pos")) ? " selected" : ""}${_scopeId}>Miscellaneous Retail</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-300 mb-2"${_scopeId}>Merchant</label><input${ssrRenderAttr("value", unref(singleForm).merchant)} type="text" class="input-field w-full" placeholder="Merchant name" required${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-300 mb-2"${_scopeId}>Gender</label><select class="input-field w-full" required${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).gender) ? ssrLooseContain(unref(singleForm).gender, "") : ssrLooseEqual(unref(singleForm).gender, "")) ? " selected" : ""}${_scopeId}>Select gender</option><option value="M"${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).gender) ? ssrLooseContain(unref(singleForm).gender, "M") : ssrLooseEqual(unref(singleForm).gender, "M")) ? " selected" : ""}${_scopeId}>Male</option><option value="F"${ssrIncludeBooleanAttr(Array.isArray(unref(singleForm).gender) ? ssrLooseContain(unref(singleForm).gender, "F") : ssrLooseEqual(unref(singleForm).gender, "F")) ? " selected" : ""}${_scopeId}>Female</option></select></div><div class="md:col-span-2"${_scopeId}><label class="block text-sm font-medium text-gray-300 mb-2"${_scopeId}>Job</label><input${ssrRenderAttr("value", unref(singleForm).job)} type="text" class="input-field w-full" placeholder="Job title" required${_scopeId}></div><div class="md:col-span-2"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(predicting)) ? " disabled" : ""} class="btn-primary disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(predicting) ? "Analyzing..." : "Predict Fraud Risk")}</button></div></form>`);
              if (unref(error)) {
                _push2(`<div class="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg"${_scopeId}><h3 class="text-lg font-semibold text-red-400 mb-2"${_scopeId}>Error</h3><p class="text-red-300"${_scopeId}>${ssrInterpolate(unref(error))}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(singleResult)) {
                _push2(`<div class="mt-6 p-4 bg-gray-700/50 rounded-lg"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>Prediction Result</h3><div class="grid grid-cols-1 md:grid-cols-4 gap-4"${_scopeId}><div class="text-center"${_scopeId}><div class="${ssrRenderClass([unref(singleResult).is_fraud ? "text-red-400" : "text-green-400", "text-2xl font-bold"])}"${_scopeId}>${ssrInterpolate(unref(singleResult).is_fraud ? "FRAUD" : "LEGITIMATE")}</div><div class="text-sm text-gray-400"${_scopeId}>Classification</div></div><div class="text-center"${_scopeId}><div class="${ssrRenderClass([unref(singleResult).fraud_probability > 0.7 ? "text-red-400" : unref(singleResult).fraud_probability > 0.4 ? "text-yellow-400" : "text-green-400", "text-2xl font-bold"])}"${_scopeId}>${ssrInterpolate((unref(singleResult).fraud_probability * 100).toFixed(1))}% </div><div class="text-sm text-gray-400"${_scopeId}>Fraud Probability</div></div><div class="text-center"${_scopeId}><div class="${ssrRenderClass([getRiskLevelColor(unref(singleResult).risk_level), "text-2xl font-bold"])}"${_scopeId}>${ssrInterpolate(unref(singleResult).risk_level)}</div><div class="text-sm text-gray-400"${_scopeId}>Risk Level</div></div><div class="text-center"${_scopeId}><div class="text-2xl font-bold text-blue-400"${_scopeId}>${ssrInterpolate(unref(singleResult).transaction_id.substring(0, 8))}... </div><div class="text-sm text-gray-400"${_scopeId}>Transaction ID</div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(activeTab) === "batch") {
              _push2(`<div class="space-y-6"${_scopeId}><div class="card p-6"${_scopeId}><h2 class="text-xl font-semibold text-white mb-6"${_scopeId}>Batch Prediction</h2><div class="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CloudArrowUpIcon), { class: "w-12 h-12 text-gray-400 mx-auto mb-4" }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-lg font-medium text-white mb-2"${_scopeId}>Upload CSV File</h3><p class="text-gray-400 mb-4"${_scopeId}>CSV should contain columns: amt, category, merchant, gender, job</p><input type="file" accept=".csv" class="hidden"${_scopeId}><button class="btn-primary"${_scopeId}> Choose File </button><p class="text-sm text-gray-500 mt-2"${_scopeId}> Supports CSV files up to 50MB </p></div>`);
              if (unref(uploadedFile)) {
                _push2(`<div class="mt-4 p-4 bg-gray-700/50 rounded-lg"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="font-medium text-white"${_scopeId}>${ssrInterpolate(unref(uploadedFile).name)}</p><p class="text-sm text-gray-400"${_scopeId}>${ssrInterpolate(formatFileSize(unref(uploadedFile).size))}</p></div><button${ssrIncludeBooleanAttr(unref(processingBatch)) ? " disabled" : ""} class="btn-primary disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(processingBatch) ? "Processing..." : "Process Batch")}</button></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(batchResults).length > 0) {
                _push2(`<div class="card p-6"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><h3 class="text-lg font-semibold text-white"${_scopeId}>Batch Results</h3><div class="flex space-x-2"${_scopeId}><button class="btn-secondary text-sm"${_scopeId}>Export Results</button><button class="btn-primary text-sm"${_scopeId}>Download Report</button></div></div><div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6"${_scopeId}><div class="text-center p-4 bg-gray-700/50 rounded-lg"${_scopeId}><div class="text-2xl font-bold text-blue-400"${_scopeId}>${ssrInterpolate(unref(batchSummary).total)}</div><div class="text-sm text-gray-400"${_scopeId}>Total Processed</div></div><div class="text-center p-4 bg-gray-700/50 rounded-lg"${_scopeId}><div class="text-2xl font-bold text-green-400"${_scopeId}>${ssrInterpolate(unref(batchSummary).legitimate)}</div><div class="text-sm text-gray-400"${_scopeId}>Legitimate</div></div><div class="text-center p-4 bg-gray-700/50 rounded-lg"${_scopeId}><div class="text-2xl font-bold text-red-400"${_scopeId}>${ssrInterpolate(unref(batchSummary).fraud)}</div><div class="text-sm text-gray-400"${_scopeId}>Fraud Detected</div></div><div class="text-center p-4 bg-gray-700/50 rounded-lg"${_scopeId}><div class="text-2xl font-bold text-yellow-400"${_scopeId}>${ssrInterpolate(unref(batchSummary).high_risk)}</div><div class="text-sm text-gray-400"${_scopeId}>High Risk</div></div><div class="text-center p-4 bg-gray-700/50 rounded-lg"${_scopeId}><div class="text-2xl font-bold text-purple-400"${_scopeId}>${ssrInterpolate((unref(batchSummary).fraud_rate * 100).toFixed(1))}%</div><div class="text-sm text-gray-400"${_scopeId}>Fraud Rate</div></div></div><div class="overflow-x-auto"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead${_scopeId}><tr class="border-b border-gray-700"${_scopeId}><th class="text-left py-3 text-gray-400"${_scopeId}>Transaction ID</th><th class="text-left py-3 text-gray-400"${_scopeId}>Row #</th><th class="text-left py-3 text-gray-400"${_scopeId}>Fraud Probability</th><th class="text-left py-3 text-gray-400"${_scopeId}>Risk Level</th><th class="text-left py-3 text-gray-400"${_scopeId}>Classification</th></tr></thead><tbody${_scopeId}><!--[-->`);
                ssrRenderList(unref(paginatedResults), (result) => {
                  _push2(`<tr class="border-b border-gray-700/50"${_scopeId}><td class="py-3 text-blue-400"${_scopeId}>${ssrInterpolate(result.transaction_id.substring(0, 8))}...</td><td class="py-3 text-gray-300"${_scopeId}>${ssrInterpolate(result.originalIndex + 1)}</td><td class="py-3"${_scopeId}><span class="${ssrRenderClass(result.fraud_probability > 0.7 ? "text-red-400" : result.fraud_probability > 0.4 ? "text-yellow-400" : "text-green-400")}"${_scopeId}>${ssrInterpolate((result.fraud_probability * 100).toFixed(1))}% </span></td><td class="py-3"${_scopeId}><span class="${ssrRenderClass([getRiskLevelColor(result.risk_level), "px-2 py-1 rounded-full text-xs"])}"${_scopeId}>${ssrInterpolate(result.risk_level)}</span></td><td class="py-3"${_scopeId}><span class="${ssrRenderClass([result.is_fraud ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400", "px-2 py-1 rounded-full text-xs"])}"${_scopeId}>${ssrInterpolate(result.is_fraud ? "FRAUD" : "LEGITIMATE")}</span></td></tr>`);
                });
                _push2(`<!--]--></tbody></table></div><div class="flex items-center justify-between mt-6"${_scopeId}><div class="text-sm text-gray-400"${_scopeId}> Showing ${ssrInterpolate((unref(currentPage) - 1) * pageSize + 1)} to ${ssrInterpolate(Math.min(unref(currentPage) * pageSize, unref(batchResults).length))} of ${ssrInterpolate(unref(batchResults).length)} results </div><div class="flex space-x-2"${_scopeId}><button${ssrIncludeBooleanAttr(unref(currentPage) <= 1) ? " disabled" : ""} class="btn-secondary text-sm disabled:opacity-50"${_scopeId}> Previous </button><button${ssrIncludeBooleanAttr(unref(currentPage) >= unref(totalPages)) ? " disabled" : ""} class="btn-secondary text-sm disabled:opacity-50"${_scopeId}> Next </button></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "flex space-x-4 mb-6" }, [
                  createVNode("button", {
                    onClick: ($event) => activeTab.value = "single",
                    class: unref(activeTab) === "single" ? "btn-primary" : "btn-secondary"
                  }, " Single Prediction ", 10, ["onClick"]),
                  createVNode("button", {
                    onClick: ($event) => activeTab.value = "batch",
                    class: unref(activeTab) === "batch" ? "btn-primary" : "btn-secondary"
                  }, " Batch Prediction ", 10, ["onClick"])
                ]),
                unref(activeTab) === "single" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "card p-6"
                }, [
                  createVNode("h2", { class: "text-xl font-semibold text-white mb-6" }, "Single Transaction Prediction"),
                  createVNode("form", {
                    onSubmit: withModifiers(predictSingle, ["prevent"]),
                    class: "grid grid-cols-1 md:grid-cols-2 gap-6"
                  }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-300 mb-2" }, "Transaction Amount"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(singleForm).amt = $event,
                        type: "number",
                        step: "0.01",
                        class: "input-field w-full",
                        placeholder: "0.00",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(singleForm).amt]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-300 mb-2" }, "Category"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(singleForm).category = $event,
                        class: "input-field w-full",
                        required: ""
                      }, [
                        createVNode("option", { value: "" }, "Select category"),
                        createVNode("option", { value: "personal_care" }, "Personal Care"),
                        createVNode("option", { value: "health_fitness" }, "Health & Fitness"),
                        createVNode("option", { value: "food_dining" }, "Food & Dining"),
                        createVNode("option", { value: "gas_transport" }, "Gas & Transport"),
                        createVNode("option", { value: "entertainment" }, "Entertainment"),
                        createVNode("option", { value: "shopping_net" }, "Online Shopping"),
                        createVNode("option", { value: "grocery_net" }, "Online Grocery"),
                        createVNode("option", { value: "grocery_pos" }, "Grocery Store"),
                        createVNode("option", { value: "shopping_pos" }, "Retail Shopping"),
                        createVNode("option", { value: "misc_net" }, "Miscellaneous Online"),
                        createVNode("option", { value: "misc_pos" }, "Miscellaneous Retail")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(singleForm).category]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-300 mb-2" }, "Merchant"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(singleForm).merchant = $event,
                        type: "text",
                        class: "input-field w-full",
                        placeholder: "Merchant name",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(singleForm).merchant]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-300 mb-2" }, "Gender"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(singleForm).gender = $event,
                        class: "input-field w-full",
                        required: ""
                      }, [
                        createVNode("option", { value: "" }, "Select gender"),
                        createVNode("option", { value: "M" }, "Male"),
                        createVNode("option", { value: "F" }, "Female")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(singleForm).gender]
                      ])
                    ]),
                    createVNode("div", { class: "md:col-span-2" }, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-300 mb-2" }, "Job"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(singleForm).job = $event,
                        type: "text",
                        class: "input-field w-full",
                        placeholder: "Job title",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(singleForm).job]
                      ])
                    ]),
                    createVNode("div", { class: "md:col-span-2" }, [
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(predicting),
                        class: "btn-primary disabled:opacity-50"
                      }, toDisplayString(unref(predicting) ? "Analyzing..." : "Predict Fraud Risk"), 9, ["disabled"])
                    ])
                  ], 32),
                  unref(error) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
                  }, [
                    createVNode("h3", { class: "text-lg font-semibold text-red-400 mb-2" }, "Error"),
                    createVNode("p", { class: "text-red-300" }, toDisplayString(unref(error)), 1)
                  ])) : createCommentVNode("", true),
                  unref(singleResult) ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mt-6 p-4 bg-gray-700/50 rounded-lg"
                  }, [
                    createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "Prediction Result"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("div", {
                          class: [unref(singleResult).is_fraud ? "text-red-400" : "text-green-400", "text-2xl font-bold"]
                        }, toDisplayString(unref(singleResult).is_fraud ? "FRAUD" : "LEGITIMATE"), 3),
                        createVNode("div", { class: "text-sm text-gray-400" }, "Classification")
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode("div", {
                          class: [unref(singleResult).fraud_probability > 0.7 ? "text-red-400" : unref(singleResult).fraud_probability > 0.4 ? "text-yellow-400" : "text-green-400", "text-2xl font-bold"]
                        }, toDisplayString((unref(singleResult).fraud_probability * 100).toFixed(1)) + "% ", 3),
                        createVNode("div", { class: "text-sm text-gray-400" }, "Fraud Probability")
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode("div", {
                          class: [getRiskLevelColor(unref(singleResult).risk_level), "text-2xl font-bold"]
                        }, toDisplayString(unref(singleResult).risk_level), 3),
                        createVNode("div", { class: "text-sm text-gray-400" }, "Risk Level")
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode("div", { class: "text-2xl font-bold text-blue-400" }, toDisplayString(unref(singleResult).transaction_id.substring(0, 8)) + "... ", 1),
                        createVNode("div", { class: "text-sm text-gray-400" }, "Transaction ID")
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                unref(activeTab) === "batch" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "card p-6" }, [
                    createVNode("h2", { class: "text-xl font-semibold text-white mb-6" }, "Batch Prediction"),
                    createVNode("div", { class: "border-2 border-dashed border-gray-600 rounded-lg p-8 text-center" }, [
                      createVNode(unref(CloudArrowUpIcon), { class: "w-12 h-12 text-gray-400 mx-auto mb-4" }),
                      createVNode("h3", { class: "text-lg font-medium text-white mb-2" }, "Upload CSV File"),
                      createVNode("p", { class: "text-gray-400 mb-4" }, "CSV should contain columns: amt, category, merchant, gender, job"),
                      createVNode("input", {
                        type: "file",
                        onChange: handleFileUpload,
                        accept: ".csv",
                        class: "hidden",
                        ref_key: "fileInput",
                        ref: fileInput
                      }, null, 544),
                      createVNode("button", {
                        onClick: ($event) => _ctx.$refs.fileInput.click(),
                        class: "btn-primary"
                      }, " Choose File ", 8, ["onClick"]),
                      createVNode("p", { class: "text-sm text-gray-500 mt-2" }, " Supports CSV files up to 50MB ")
                    ]),
                    unref(uploadedFile) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-4 p-4 bg-gray-700/50 rounded-lg"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "font-medium text-white" }, toDisplayString(unref(uploadedFile).name), 1),
                          createVNode("p", { class: "text-sm text-gray-400" }, toDisplayString(formatFileSize(unref(uploadedFile).size)), 1)
                        ]),
                        createVNode("button", {
                          onClick: processBatch,
                          disabled: unref(processingBatch),
                          class: "btn-primary disabled:opacity-50"
                        }, toDisplayString(unref(processingBatch) ? "Processing..." : "Process Batch"), 9, ["disabled"])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  unref(batchResults).length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "card p-6"
                  }, [
                    createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-white" }, "Batch Results"),
                      createVNode("div", { class: "flex space-x-2" }, [
                        createVNode("button", {
                          onClick: exportResults,
                          class: "btn-secondary text-sm"
                        }, "Export Results"),
                        createVNode("button", {
                          onClick: downloadReport,
                          class: "btn-primary text-sm"
                        }, "Download Report")
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-5 gap-4 mb-6" }, [
                      createVNode("div", { class: "text-center p-4 bg-gray-700/50 rounded-lg" }, [
                        createVNode("div", { class: "text-2xl font-bold text-blue-400" }, toDisplayString(unref(batchSummary).total), 1),
                        createVNode("div", { class: "text-sm text-gray-400" }, "Total Processed")
                      ]),
                      createVNode("div", { class: "text-center p-4 bg-gray-700/50 rounded-lg" }, [
                        createVNode("div", { class: "text-2xl font-bold text-green-400" }, toDisplayString(unref(batchSummary).legitimate), 1),
                        createVNode("div", { class: "text-sm text-gray-400" }, "Legitimate")
                      ]),
                      createVNode("div", { class: "text-center p-4 bg-gray-700/50 rounded-lg" }, [
                        createVNode("div", { class: "text-2xl font-bold text-red-400" }, toDisplayString(unref(batchSummary).fraud), 1),
                        createVNode("div", { class: "text-sm text-gray-400" }, "Fraud Detected")
                      ]),
                      createVNode("div", { class: "text-center p-4 bg-gray-700/50 rounded-lg" }, [
                        createVNode("div", { class: "text-2xl font-bold text-yellow-400" }, toDisplayString(unref(batchSummary).high_risk), 1),
                        createVNode("div", { class: "text-sm text-gray-400" }, "High Risk")
                      ]),
                      createVNode("div", { class: "text-center p-4 bg-gray-700/50 rounded-lg" }, [
                        createVNode("div", { class: "text-2xl font-bold text-purple-400" }, toDisplayString((unref(batchSummary).fraud_rate * 100).toFixed(1)) + "%", 1),
                        createVNode("div", { class: "text-sm text-gray-400" }, "Fraud Rate")
                      ])
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "w-full text-sm" }, [
                        createVNode("thead", null, [
                          createVNode("tr", { class: "border-b border-gray-700" }, [
                            createVNode("th", { class: "text-left py-3 text-gray-400" }, "Transaction ID"),
                            createVNode("th", { class: "text-left py-3 text-gray-400" }, "Row #"),
                            createVNode("th", { class: "text-left py-3 text-gray-400" }, "Fraud Probability"),
                            createVNode("th", { class: "text-left py-3 text-gray-400" }, "Risk Level"),
                            createVNode("th", { class: "text-left py-3 text-gray-400" }, "Classification")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedResults), (result) => {
                            return openBlock(), createBlock("tr", {
                              key: result.transaction_id,
                              class: "border-b border-gray-700/50"
                            }, [
                              createVNode("td", { class: "py-3 text-blue-400" }, toDisplayString(result.transaction_id.substring(0, 8)) + "...", 1),
                              createVNode("td", { class: "py-3 text-gray-300" }, toDisplayString(result.originalIndex + 1), 1),
                              createVNode("td", { class: "py-3" }, [
                                createVNode("span", {
                                  class: result.fraud_probability > 0.7 ? "text-red-400" : result.fraud_probability > 0.4 ? "text-yellow-400" : "text-green-400"
                                }, toDisplayString((result.fraud_probability * 100).toFixed(1)) + "% ", 3)
                              ]),
                              createVNode("td", { class: "py-3" }, [
                                createVNode("span", {
                                  class: [getRiskLevelColor(result.risk_level), "px-2 py-1 rounded-full text-xs"]
                                }, toDisplayString(result.risk_level), 3)
                              ]),
                              createVNode("td", { class: "py-3" }, [
                                createVNode("span", {
                                  class: [result.is_fraud ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400", "px-2 py-1 rounded-full text-xs"]
                                }, toDisplayString(result.is_fraud ? "FRAUD" : "LEGITIMATE"), 3)
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between mt-6" }, [
                      createVNode("div", { class: "text-sm text-gray-400" }, " Showing " + toDisplayString((unref(currentPage) - 1) * pageSize + 1) + " to " + toDisplayString(Math.min(unref(currentPage) * pageSize, unref(batchResults).length)) + " of " + toDisplayString(unref(batchResults).length) + " results ", 1),
                      createVNode("div", { class: "flex space-x-2" }, [
                        createVNode("button", {
                          onClick: ($event) => currentPage.value--,
                          disabled: unref(currentPage) <= 1,
                          class: "btn-secondary text-sm disabled:opacity-50"
                        }, " Previous ", 8, ["onClick", "disabled"]),
                        createVNode("button", {
                          onClick: ($event) => currentPage.value++,
                          disabled: unref(currentPage) >= unref(totalPages),
                          class: "btn-secondary text-sm disabled:opacity-50"
                        }, " Next ", 8, ["onClick", "disabled"])
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/prediction.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=prediction-C2v0vQ__.js.map
