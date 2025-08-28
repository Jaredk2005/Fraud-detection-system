import { _ as __nuxt_component_0 } from "./nuxt-layout-CE6R6O5A.js";
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withDirectives, vModelSelect, vModelText, vModelCheckbox, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { format } from "date-fns";
import "/home/project/node_modules/hookable/dist/index.mjs";
import { s as setInterval } from "./interval-BEpEGVAJ.js";
import { _ as _export_sfc } from "../server.mjs";
import "vue-router";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/project/node_modules/unctx/dist/index.mjs";
import "/home/project/node_modules/h3/dist/index.mjs";
import "/home/project/node_modules/radix3/dist/index.mjs";
import "/home/project/node_modules/defu/dist/defu.mjs";
import "/home/project/node_modules/ufo/dist/index.mjs";
const API_BASE_URL = "http://localhost:8000";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "training",
  __ssrInlineRender: true,
  setup(__props) {
    const isTraining = ref(false);
    const trainingProgress = ref(0);
    const currentStep = ref("");
    const selectedFile = ref(null);
    const trainingError = ref("");
    const config = reactive({
      algorithm: "logistic_regression",
      testSplit: "0.2",
      randomState: 42,
      autoRetrain: false
    });
    const lastTraining = ref({
      accuracy: null,
      samples: 0,
      trainingTime: null,
      modelId: null
    });
    const trainingHistory = ref([
      // Will be populated with actual training results
    ]);
    const featureImportance = ref([]);
    const handleFileSelect = (event) => {
      const target = event.target;
      if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0];
        trainingError.value = "";
      }
    };
    const clearFile = () => {
      selectedFile.value = null;
      const fileInput = (void 0).querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = "";
      }
    };
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const startTraining = async () => {
      if (!selectedFile.value) {
        trainingError.value = "Please select a CSV file first";
        return;
      }
      isTraining.value = true;
      trainingProgress.value = 0;
      trainingError.value = "";
      currentStep.value = "Uploading file and starting training...";
      try {
        const formData = new FormData();
        formData.append("file", selectedFile.value);
        const progressInterval2 = setInterval(() => {
          if (trainingProgress.value < 90) {
            trainingProgress.value += Math.random() * 10;
            if (trainingProgress.value < 30) {
              currentStep.value = "Uploading and validating file...";
            } else if (trainingProgress.value < 60) {
              currentStep.value = "Preprocessing data...";
            } else if (trainingProgress.value < 90) {
              currentStep.value = "Training model...";
            }
          }
        }, 500);
        const response = await fetch(`${API_BASE_URL}/train`, {
          method: "POST",
          body: formData
        });
        clearInterval(progressInterval2);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Training failed");
        }
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message || "Training failed");
        }
        trainingProgress.value = 100;
        currentStep.value = result.message || "Training completed successfully!";
        lastTraining.value = {
          accuracy: result.accuracy,
          samples: 0,
          // FastAPI doesn't return this, could be added
          trainingTime: result.training_time,
          modelId: result.model_id
        };
        localStorage.clear();
        localStorage.setItem("accuracy", result.accuracy);
        localStorage.setItem("time", result.training_time);
        localStorage.setItem("model", result.model_id);
        trainingHistory.value.unshift({
          id: Date.now(),
          algorithm: "Logistic Regression",
          date: /* @__PURE__ */ new Date(),
          accuracy: result.accuracy,
          trainingTime: result.training_time,
          modelId: result.model_id
        });
        setTimeout(() => {
          selectedFile.value = null;
          const fileInput = (void 0).querySelector('input[type="file"]');
          if (fileInput) {
            fileInput.value = "";
          }
        }, 2e3);
      } catch (error) {
        clearInterval(progressInterval);
        trainingError.value = error.message || "Training failed";
        console.error("Training error:", error);
      } finally {
        setTimeout(() => {
          isTraining.value = false;
        }, 1e3);
      }
    };
    const formatDate = (date) => {
      return format(date, "MMM dd, yyyy HH:mm");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6" data-v-ae4b8bd4${_scopeId}><div class="card p-6" data-v-ae4b8bd4${_scopeId}><h2 class="text-xl font-semibold text-white mb-4" data-v-ae4b8bd4${_scopeId}>Upload Training Data</h2><div class="space-y-4" data-v-ae4b8bd4${_scopeId}><div class="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center" data-v-ae4b8bd4${_scopeId}><input type="file" accept=".csv" class="hidden" data-v-ae4b8bd4${_scopeId}>`);
            if (!unref(selectedFile)) {
              _push2(`<div class="cursor-pointer" data-v-ae4b8bd4${_scopeId}><div class="text-4xl text-gray-400 mb-2" data-v-ae4b8bd4${_scopeId}>📄</div><p class="text-gray-300" data-v-ae4b8bd4${_scopeId}>Click to select a CSV file</p><p class="text-sm text-gray-500 mt-1" data-v-ae4b8bd4${_scopeId}>File must contain &#39;is_fraud&#39; column</p></div>`);
            } else {
              _push2(`<div class="space-y-2" data-v-ae4b8bd4${_scopeId}><div class="text-2xl text-green-400 mb-2" data-v-ae4b8bd4${_scopeId}>✓</div><p class="text-white font-medium" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate(unref(selectedFile).name)}</p><p class="text-sm text-gray-400" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate(formatFileSize(unref(selectedFile).size))}</p><button class="text-red-400 hover:text-red-300 text-sm mt-2" data-v-ae4b8bd4${_scopeId}> Remove file </button></div>`);
            }
            _push2(`</div></div></div><div class="card p-6" data-v-ae4b8bd4${_scopeId}><div class="flex items-center justify-between mb-6" data-v-ae4b8bd4${_scopeId}><h2 class="text-xl font-semibold text-white" data-v-ae4b8bd4${_scopeId}>Model Training Status</h2><button${ssrIncludeBooleanAttr(unref(isTraining) || !unref(selectedFile)) ? " disabled" : ""} class="btn-primary disabled:opacity-50" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate(unref(isTraining) ? "Training in Progress..." : "Start Training")}</button></div>`);
            if (unref(trainingError)) {
              _push2(`<div class="mb-4 p-4 bg-red-900/30 border border-red-700 rounded-lg" data-v-ae4b8bd4${_scopeId}><p class="text-red-400 text-sm" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate(unref(trainingError))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(isTraining)) {
              _push2(`<div class="space-y-4" data-v-ae4b8bd4${_scopeId}><div class="flex justify-between text-sm" data-v-ae4b8bd4${_scopeId}><span class="text-gray-400" data-v-ae4b8bd4${_scopeId}>Progress</span><span class="text-blue-400" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate(unref(trainingProgress))}%</span></div><div class="w-full bg-gray-700 rounded-full h-2" data-v-ae4b8bd4${_scopeId}><div class="bg-blue-500 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: unref(trainingProgress) + "%" })}" data-v-ae4b8bd4${_scopeId}></div></div><p class="text-sm text-gray-400" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate(unref(currentStep))}</p></div>`);
            } else if (unref(lastTraining).accuracy !== null && unref(lastTraining).modelId) {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-ae4b8bd4${_scopeId}><div class="text-center" data-v-ae4b8bd4${_scopeId}><div class="text-2xl font-bold text-green-400" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate((unref(lastTraining).accuracy * 100).toFixed(2))}%</div><div class="text-sm text-gray-400" data-v-ae4b8bd4${_scopeId}>Accuracy</div></div><div class="text-center" data-v-ae4b8bd4${_scopeId}><div class="text-2xl font-bold text-blue-400" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate(unref(lastTraining).samples || "N/A")}</div><div class="text-sm text-gray-400" data-v-ae4b8bd4${_scopeId}>Training Samples</div></div><div class="text-center" data-v-ae4b8bd4${_scopeId}><div class="text-2xl font-bold text-purple-400" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate((unref(lastTraining).trainingTime || 0).toFixed(1))}s</div><div class="text-sm text-gray-400" data-v-ae4b8bd4${_scopeId}>Training Time</div></div><div class="text-center" data-v-ae4b8bd4${_scopeId}><div class="text-2xl font-bold text-orange-400" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate(unref(lastTraining).modelId ? unref(lastTraining).modelId.slice(0, 8) + "..." : "N/A")}</div><div class="text-sm text-gray-400" data-v-ae4b8bd4${_scopeId}>Model ID</div></div></div>`);
            } else {
              _push2(`<div class="text-center py-8" data-v-ae4b8bd4${_scopeId}><div class="text-gray-400 text-lg mb-2" data-v-ae4b8bd4${_scopeId}>No model trained yet</div><div class="text-gray-500 text-sm" data-v-ae4b8bd4${_scopeId}>Upload a CSV file and start training to see results</div></div>`);
            }
            _push2(`</div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-ae4b8bd4${_scopeId}><div class="card p-6" data-v-ae4b8bd4${_scopeId}><h3 class="text-lg font-semibold text-white mb-4" data-v-ae4b8bd4${_scopeId}>Training Configuration</h3><div class="space-y-4" data-v-ae4b8bd4${_scopeId}><div data-v-ae4b8bd4${_scopeId}><label class="block text-sm font-medium text-gray-300 mb-2" data-v-ae4b8bd4${_scopeId}>Algorithm</label><select class="input-field w-full" disabled data-v-ae4b8bd4${_scopeId}><option value="logistic_regression" data-v-ae4b8bd4${ssrIncludeBooleanAttr(Array.isArray(unref(config).algorithm) ? ssrLooseContain(unref(config).algorithm, "logistic_regression") : ssrLooseEqual(unref(config).algorithm, "logistic_regression")) ? " selected" : ""}${_scopeId}>Logistic Regression</option><option value="random_forest" data-v-ae4b8bd4${ssrIncludeBooleanAttr(Array.isArray(unref(config).algorithm) ? ssrLooseContain(unref(config).algorithm, "random_forest") : ssrLooseEqual(unref(config).algorithm, "random_forest")) ? " selected" : ""}${_scopeId}>Random Forest</option><option value="xgboost" data-v-ae4b8bd4${ssrIncludeBooleanAttr(Array.isArray(unref(config).algorithm) ? ssrLooseContain(unref(config).algorithm, "xgboost") : ssrLooseEqual(unref(config).algorithm, "xgboost")) ? " selected" : ""}${_scopeId}>XGBoost</option><option value="neural_network" data-v-ae4b8bd4${ssrIncludeBooleanAttr(Array.isArray(unref(config).algorithm) ? ssrLooseContain(unref(config).algorithm, "neural_network") : ssrLooseEqual(unref(config).algorithm, "neural_network")) ? " selected" : ""}${_scopeId}>Neural Network</option></select><p class="text-xs text-gray-500 mt-1" data-v-ae4b8bd4${_scopeId}>Currently using Logistic Regression (FastAPI backend)</p></div><div data-v-ae4b8bd4${_scopeId}><label class="block text-sm font-medium text-gray-300 mb-2" data-v-ae4b8bd4${_scopeId}>Test Split</label><select class="input-field w-full" disabled data-v-ae4b8bd4${_scopeId}><option value="0.2" data-v-ae4b8bd4${ssrIncludeBooleanAttr(Array.isArray(unref(config).testSplit) ? ssrLooseContain(unref(config).testSplit, "0.2") : ssrLooseEqual(unref(config).testSplit, "0.2")) ? " selected" : ""}${_scopeId}>20% (Default)</option><option value="0.3" data-v-ae4b8bd4${ssrIncludeBooleanAttr(Array.isArray(unref(config).testSplit) ? ssrLooseContain(unref(config).testSplit, "0.3") : ssrLooseEqual(unref(config).testSplit, "0.3")) ? " selected" : ""}${_scopeId}>30%</option><option value="0.1" data-v-ae4b8bd4${ssrIncludeBooleanAttr(Array.isArray(unref(config).testSplit) ? ssrLooseContain(unref(config).testSplit, "0.1") : ssrLooseEqual(unref(config).testSplit, "0.1")) ? " selected" : ""}${_scopeId}>10%</option></select></div><div data-v-ae4b8bd4${_scopeId}><label class="block text-sm font-medium text-gray-300 mb-2" data-v-ae4b8bd4${_scopeId}>Random State</label><input${ssrRenderAttr("value", unref(config).randomState)} type="number" class="input-field w-full" disabled data-v-ae4b8bd4${_scopeId}><p class="text-xs text-gray-500 mt-1" data-v-ae4b8bd4${_scopeId}>Fixed at 42 for reproducibility</p></div><div class="flex items-center space-x-2" data-v-ae4b8bd4${_scopeId}><input id="autoRetrain"${ssrIncludeBooleanAttr(Array.isArray(unref(config).autoRetrain) ? ssrLooseContain(unref(config).autoRetrain, null) : unref(config).autoRetrain) ? " checked" : ""} type="checkbox" class="rounded border-gray-600 bg-gray-700 text-blue-500" disabled data-v-ae4b8bd4${_scopeId}><label for="autoRetrain" class="text-sm text-gray-300" data-v-ae4b8bd4${_scopeId}> Enable automatic retraining (Coming soon) </label></div></div></div><div class="card p-6" data-v-ae4b8bd4${_scopeId}><h3 class="text-lg font-semibold text-white mb-4" data-v-ae4b8bd4${_scopeId}>Training History</h3><div class="space-y-3 max-h-64 overflow-y-auto" data-v-ae4b8bd4${_scopeId}>`);
            if (unref(trainingHistory).length === 0) {
              _push2(`<div class="text-center py-4" data-v-ae4b8bd4${_scopeId}><div class="text-gray-400" data-v-ae4b8bd4${_scopeId}>No training history yet</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(trainingHistory), (session) => {
              var _a;
              _push2(`<div class="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg" data-v-ae4b8bd4${_scopeId}><div data-v-ae4b8bd4${_scopeId}><div class="font-medium text-white" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate(session.algorithm)}</div><div class="text-sm text-gray-400" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate(formatDate(session.date))}</div></div><div class="text-right" data-v-ae4b8bd4${_scopeId}><div class="font-medium text-green-400" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate((session.accuracy * 100).toFixed(2))}%</div><div class="text-sm text-gray-400" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate(session.trainingTime.toFixed(1))}s</div><div class="text-xs text-gray-500 mt-1" data-v-ae4b8bd4${_scopeId}>ID: ${ssrInterpolate((_a = session.modelId) == null ? void 0 : _a.slice(0, 8))}...</div></div></div>`);
            });
            _push2(`<!--]--></div></div></div>`);
            if (unref(featureImportance).length > 0) {
              _push2(`<div class="card p-6" data-v-ae4b8bd4${_scopeId}><h3 class="text-lg font-semibold text-white mb-4" data-v-ae4b8bd4${_scopeId}>Feature Importance</h3><div class="space-y-4" data-v-ae4b8bd4${_scopeId}><!--[-->`);
              ssrRenderList(unref(featureImportance), (feature) => {
                _push2(`<div class="flex items-center" data-v-ae4b8bd4${_scopeId}><div class="w-32 text-sm text-gray-300" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate(feature.name)}</div><div class="flex-1 mx-4" data-v-ae4b8bd4${_scopeId}><div class="w-full bg-gray-700 rounded-full h-2" data-v-ae4b8bd4${_scopeId}><div class="bg-blue-500 h-2 rounded-full" style="${ssrRenderStyle({ width: feature.importance + "%" })}" data-v-ae4b8bd4${_scopeId}></div></div></div><div class="w-12 text-sm text-blue-400 text-right" data-v-ae4b8bd4${_scopeId}>${ssrInterpolate(feature.importance)}%</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "card p-6" }, [
                  createVNode("h2", { class: "text-xl font-semibold text-white mb-4" }, "Upload Training Data"),
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", { class: "border-2 border-dashed border-gray-600 rounded-lg p-6 text-center" }, [
                      createVNode("input", {
                        ref: "fileInput",
                        type: "file",
                        accept: ".csv",
                        onChange: handleFileSelect,
                        class: "hidden"
                      }, null, 544),
                      !unref(selectedFile) ? (openBlock(), createBlock("div", {
                        key: 0,
                        onClick: ($event) => _ctx.$refs.fileInput.click(),
                        class: "cursor-pointer"
                      }, [
                        createVNode("div", { class: "text-4xl text-gray-400 mb-2" }, "📄"),
                        createVNode("p", { class: "text-gray-300" }, "Click to select a CSV file"),
                        createVNode("p", { class: "text-sm text-gray-500 mt-1" }, "File must contain 'is_fraud' column")
                      ], 8, ["onClick"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-2"
                      }, [
                        createVNode("div", { class: "text-2xl text-green-400 mb-2" }, "✓"),
                        createVNode("p", { class: "text-white font-medium" }, toDisplayString(unref(selectedFile).name), 1),
                        createVNode("p", { class: "text-sm text-gray-400" }, toDisplayString(formatFileSize(unref(selectedFile).size)), 1),
                        createVNode("button", {
                          onClick: clearFile,
                          class: "text-red-400 hover:text-red-300 text-sm mt-2"
                        }, " Remove file ")
                      ]))
                    ])
                  ])
                ]),
                createVNode("div", { class: "card p-6" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                    createVNode("h2", { class: "text-xl font-semibold text-white" }, "Model Training Status"),
                    createVNode("button", {
                      onClick: startTraining,
                      disabled: unref(isTraining) || !unref(selectedFile),
                      class: "btn-primary disabled:opacity-50"
                    }, toDisplayString(unref(isTraining) ? "Training in Progress..." : "Start Training"), 9, ["disabled"])
                  ]),
                  unref(trainingError) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-4 p-4 bg-red-900/30 border border-red-700 rounded-lg"
                  }, [
                    createVNode("p", { class: "text-red-400 text-sm" }, toDisplayString(unref(trainingError)), 1)
                  ])) : createCommentVNode("", true),
                  unref(isTraining) ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "flex justify-between text-sm" }, [
                      createVNode("span", { class: "text-gray-400" }, "Progress"),
                      createVNode("span", { class: "text-blue-400" }, toDisplayString(unref(trainingProgress)) + "%", 1)
                    ]),
                    createVNode("div", { class: "w-full bg-gray-700 rounded-full h-2" }, [
                      createVNode("div", {
                        class: "bg-blue-500 h-2 rounded-full transition-all duration-300",
                        style: { width: unref(trainingProgress) + "%" }
                      }, null, 4)
                    ]),
                    createVNode("p", { class: "text-sm text-gray-400" }, toDisplayString(unref(currentStep)), 1)
                  ])) : unref(lastTraining).accuracy !== null && unref(lastTraining).modelId ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "grid grid-cols-1 md:grid-cols-4 gap-4"
                  }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("div", { class: "text-2xl font-bold text-green-400" }, toDisplayString((unref(lastTraining).accuracy * 100).toFixed(2)) + "%", 1),
                      createVNode("div", { class: "text-sm text-gray-400" }, "Accuracy")
                    ]),
                    createVNode("div", { class: "text-center" }, [
                      createVNode("div", { class: "text-2xl font-bold text-blue-400" }, toDisplayString(unref(lastTraining).samples || "N/A"), 1),
                      createVNode("div", { class: "text-sm text-gray-400" }, "Training Samples")
                    ]),
                    createVNode("div", { class: "text-center" }, [
                      createVNode("div", { class: "text-2xl font-bold text-purple-400" }, toDisplayString((unref(lastTraining).trainingTime || 0).toFixed(1)) + "s", 1),
                      createVNode("div", { class: "text-sm text-gray-400" }, "Training Time")
                    ]),
                    createVNode("div", { class: "text-center" }, [
                      createVNode("div", { class: "text-2xl font-bold text-orange-400" }, toDisplayString(unref(lastTraining).modelId ? unref(lastTraining).modelId.slice(0, 8) + "..." : "N/A"), 1),
                      createVNode("div", { class: "text-sm text-gray-400" }, "Model ID")
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 3,
                    class: "text-center py-8"
                  }, [
                    createVNode("div", { class: "text-gray-400 text-lg mb-2" }, "No model trained yet"),
                    createVNode("div", { class: "text-gray-500 text-sm" }, "Upload a CSV file and start training to see results")
                  ]))
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                  createVNode("div", { class: "card p-6" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "Training Configuration"),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-300 mb-2" }, "Algorithm"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(config).algorithm = $event,
                          class: "input-field w-full",
                          disabled: ""
                        }, [
                          createVNode("option", { value: "logistic_regression" }, "Logistic Regression"),
                          createVNode("option", { value: "random_forest" }, "Random Forest"),
                          createVNode("option", { value: "xgboost" }, "XGBoost"),
                          createVNode("option", { value: "neural_network" }, "Neural Network")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(config).algorithm]
                        ]),
                        createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Currently using Logistic Regression (FastAPI backend)")
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-300 mb-2" }, "Test Split"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(config).testSplit = $event,
                          class: "input-field w-full",
                          disabled: ""
                        }, [
                          createVNode("option", { value: "0.2" }, "20% (Default)"),
                          createVNode("option", { value: "0.3" }, "30%"),
                          createVNode("option", { value: "0.1" }, "10%")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(config).testSplit]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-300 mb-2" }, "Random State"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(config).randomState = $event,
                          type: "number",
                          class: "input-field w-full",
                          disabled: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(config).randomState]
                        ]),
                        createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Fixed at 42 for reproducibility")
                      ]),
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        withDirectives(createVNode("input", {
                          id: "autoRetrain",
                          "onUpdate:modelValue": ($event) => unref(config).autoRetrain = $event,
                          type: "checkbox",
                          class: "rounded border-gray-600 bg-gray-700 text-blue-500",
                          disabled: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(config).autoRetrain]
                        ]),
                        createVNode("label", {
                          for: "autoRetrain",
                          class: "text-sm text-gray-300"
                        }, " Enable automatic retraining (Coming soon) ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "card p-6" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "Training History"),
                    createVNode("div", { class: "space-y-3 max-h-64 overflow-y-auto" }, [
                      unref(trainingHistory).length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-4"
                      }, [
                        createVNode("div", { class: "text-gray-400" }, "No training history yet")
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(trainingHistory), (session) => {
                        var _a;
                        return openBlock(), createBlock("div", {
                          key: session.id,
                          class: "flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                        }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "font-medium text-white" }, toDisplayString(session.algorithm), 1),
                            createVNode("div", { class: "text-sm text-gray-400" }, toDisplayString(formatDate(session.date)), 1)
                          ]),
                          createVNode("div", { class: "text-right" }, [
                            createVNode("div", { class: "font-medium text-green-400" }, toDisplayString((session.accuracy * 100).toFixed(2)) + "%", 1),
                            createVNode("div", { class: "text-sm text-gray-400" }, toDisplayString(session.trainingTime.toFixed(1)) + "s", 1),
                            createVNode("div", { class: "text-xs text-gray-500 mt-1" }, "ID: " + toDisplayString((_a = session.modelId) == null ? void 0 : _a.slice(0, 8)) + "...", 1)
                          ])
                        ]);
                      }), 128))
                    ])
                  ])
                ]),
                unref(featureImportance).length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "card p-6"
                }, [
                  createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "Feature Importance"),
                  createVNode("div", { class: "space-y-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(featureImportance), (feature) => {
                      return openBlock(), createBlock("div", {
                        key: feature.name,
                        class: "flex items-center"
                      }, [
                        createVNode("div", { class: "w-32 text-sm text-gray-300" }, toDisplayString(feature.name), 1),
                        createVNode("div", { class: "flex-1 mx-4" }, [
                          createVNode("div", { class: "w-full bg-gray-700 rounded-full h-2" }, [
                            createVNode("div", {
                              class: "bg-blue-500 h-2 rounded-full",
                              style: { width: feature.importance + "%" }
                            }, null, 4)
                          ])
                        ]),
                        createVNode("div", { class: "w-12 text-sm text-blue-400 text-right" }, toDisplayString(feature.importance) + "%", 1)
                      ]);
                    }), 128))
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/training.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const training = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ae4b8bd4"]]);
export {
  training as default
};
//# sourceMappingURL=training-CKDkfTRN.js.map
