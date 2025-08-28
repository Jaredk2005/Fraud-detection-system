import { _ as __nuxt_component_0 } from "./nuxt-layout-CE6R6O5A.js";
import { defineComponent, reactive, ref, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, withDirectives, vModelSelect, openBlock, vModelText, vModelRadio, vModelCheckbox, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { format } from "date-fns";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "reports",
  __ssrInlineRender: true,
  setup(__props) {
    const reportConfig = reactive({
      type: "fraud_summary",
      period: "30d",
      startDate: "",
      endDate: "",
      format: "pdf",
      sections: ["executive_summary", "detailed_analysis", "charts"]
    });
    const recentReports = ref([
      {
        id: 1,
        name: "Fraud Detection Summary - January 2024",
        type: "Fraud Summary",
        period: "Last 30 days",
        createdAt: /* @__PURE__ */ new Date("2024-01-20"),
        status: "completed",
        size: 2548576
      },
      {
        id: 2,
        name: "Compliance Report Q4 2023",
        type: "Compliance",
        period: "Q4 2023",
        createdAt: /* @__PURE__ */ new Date("2024-01-15"),
        status: "completed",
        size: 4823040
      },
      {
        id: 3,
        name: "Model Performance Analysis",
        type: "Performance",
        period: "Last 90 days",
        createdAt: /* @__PURE__ */ new Date("2024-01-10"),
        status: "processing",
        size: 0
      }
    ]);
    const scheduledReports = ref([
      {
        id: 1,
        name: "Weekly Fraud Summary",
        type: "Fraud Summary",
        frequency: "Weekly (Monday)",
        nextRun: /* @__PURE__ */ new Date("2024-01-22"),
        active: true,
        recipients: ["admin@company.com", "security@company.com"]
      },
      {
        id: 2,
        name: "Monthly Compliance Report",
        type: "Compliance",
        frequency: "Monthly (1st)",
        nextRun: /* @__PURE__ */ new Date("2024-02-01"),
        active: true,
        recipients: ["compliance@company.com"]
      },
      {
        id: 3,
        name: "Quarterly Audit Report",
        type: "Audit",
        frequency: "Quarterly",
        nextRun: /* @__PURE__ */ new Date("2024-04-01"),
        active: false,
        recipients: ["audit@company.com", "ceo@company.com"]
      }
    ]);
    const generateReport = async () => {
      console.log("Generating report with config:", reportConfig);
      const newReport = {
        id: Date.now(),
        name: `${getReportTitle()} - ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`,
        type: getReportTypeDisplay(),
        period: getReportPeriodText(),
        createdAt: /* @__PURE__ */ new Date(),
        status: "processing",
        size: 0
      };
      recentReports.value.unshift(newReport);
      setTimeout(() => {
        newReport.status = "completed";
        newReport.size = Math.floor(Math.random() * 5e6) + 1e6;
      }, 3e3);
    };
    const getReportTitle = () => {
      const titles = {
        fraud_summary: "Fraud Detection Summary Report",
        compliance: "Regulatory Compliance Report",
        performance: "Model Performance Analysis",
        audit: "Internal Audit Report",
        custom: "Custom Analysis Report"
      };
      return titles[reportConfig.type] || "Report";
    };
    const getReportTypeDisplay = () => {
      const displays = {
        fraud_summary: "Fraud Summary",
        compliance: "Compliance",
        performance: "Performance",
        audit: "Audit",
        custom: "Custom"
      };
      return displays[reportConfig.type] || "Report";
    };
    const getReportPeriodText = () => {
      const periods = {
        "7d": "Last 7 days",
        "30d": "Last 30 days",
        "90d": "Last 90 days",
        "1y": "Last year",
        "custom": `${reportConfig.startDate} to ${reportConfig.endDate}`
      };
      return periods[reportConfig.period] || "Custom period";
    };
    const formatSectionName = (section) => {
      return section.split("_").map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      ).join(" ");
    };
    const formatDate = (date) => {
      return format(date, "MMM dd, yyyy HH:mm");
    };
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div class="card p-6"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"${_scopeId}><h2 class="text-xl font-semibold text-white"${_scopeId}>Report Generation</h2><button class="btn-primary"${_scopeId}> Generate New Report </button></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><h3 class="text-lg font-medium text-white mb-4"${_scopeId}>Report Configuration</h3><div class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-300 mb-2"${_scopeId}>Report Type</label><select class="input-field w-full"${_scopeId}><option value="fraud_summary"${ssrIncludeBooleanAttr(Array.isArray(unref(reportConfig).type) ? ssrLooseContain(unref(reportConfig).type, "fraud_summary") : ssrLooseEqual(unref(reportConfig).type, "fraud_summary")) ? " selected" : ""}${_scopeId}>Fraud Detection Summary</option><option value="compliance"${ssrIncludeBooleanAttr(Array.isArray(unref(reportConfig).type) ? ssrLooseContain(unref(reportConfig).type, "compliance") : ssrLooseEqual(unref(reportConfig).type, "compliance")) ? " selected" : ""}${_scopeId}>Regulatory Compliance</option><option value="performance"${ssrIncludeBooleanAttr(Array.isArray(unref(reportConfig).type) ? ssrLooseContain(unref(reportConfig).type, "performance") : ssrLooseEqual(unref(reportConfig).type, "performance")) ? " selected" : ""}${_scopeId}>Model Performance</option><option value="audit"${ssrIncludeBooleanAttr(Array.isArray(unref(reportConfig).type) ? ssrLooseContain(unref(reportConfig).type, "audit") : ssrLooseEqual(unref(reportConfig).type, "audit")) ? " selected" : ""}${_scopeId}>Internal Audit</option><option value="custom"${ssrIncludeBooleanAttr(Array.isArray(unref(reportConfig).type) ? ssrLooseContain(unref(reportConfig).type, "custom") : ssrLooseEqual(unref(reportConfig).type, "custom")) ? " selected" : ""}${_scopeId}>Custom Analysis</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-300 mb-2"${_scopeId}>Time Period</label><select class="input-field w-full"${_scopeId}><option value="7d"${ssrIncludeBooleanAttr(Array.isArray(unref(reportConfig).period) ? ssrLooseContain(unref(reportConfig).period, "7d") : ssrLooseEqual(unref(reportConfig).period, "7d")) ? " selected" : ""}${_scopeId}>Last 7 days</option><option value="30d"${ssrIncludeBooleanAttr(Array.isArray(unref(reportConfig).period) ? ssrLooseContain(unref(reportConfig).period, "30d") : ssrLooseEqual(unref(reportConfig).period, "30d")) ? " selected" : ""}${_scopeId}>Last 30 days</option><option value="90d"${ssrIncludeBooleanAttr(Array.isArray(unref(reportConfig).period) ? ssrLooseContain(unref(reportConfig).period, "90d") : ssrLooseEqual(unref(reportConfig).period, "90d")) ? " selected" : ""}${_scopeId}>Last 90 days</option><option value="1y"${ssrIncludeBooleanAttr(Array.isArray(unref(reportConfig).period) ? ssrLooseContain(unref(reportConfig).period, "1y") : ssrLooseEqual(unref(reportConfig).period, "1y")) ? " selected" : ""}${_scopeId}>Last year</option><option value="custom"${ssrIncludeBooleanAttr(Array.isArray(unref(reportConfig).period) ? ssrLooseContain(unref(reportConfig).period, "custom") : ssrLooseEqual(unref(reportConfig).period, "custom")) ? " selected" : ""}${_scopeId}>Custom Range</option></select></div>`);
            if (unref(reportConfig).period === "custom") {
              _push2(`<div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-300 mb-2"${_scopeId}>Start Date</label><input${ssrRenderAttr("value", unref(reportConfig).startDate)} type="date" class="input-field w-full"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-300 mb-2"${_scopeId}>End Date</label><input${ssrRenderAttr("value", unref(reportConfig).endDate)} type="date" class="input-field w-full"${_scopeId}></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}><label class="block text-sm font-medium text-gray-300 mb-2"${_scopeId}>Format</label><div class="flex space-x-4"${_scopeId}><label class="flex items-center"${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(reportConfig).format, "pdf")) ? " checked" : ""} type="radio" value="pdf" class="mr-2"${_scopeId}><span class="text-gray-300"${_scopeId}>PDF</span></label><label class="flex items-center"${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(reportConfig).format, "xlsx")) ? " checked" : ""} type="radio" value="xlsx" class="mr-2"${_scopeId}><span class="text-gray-300"${_scopeId}>Excel</span></label><label class="flex items-center"${_scopeId}><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(reportConfig).format, "csv")) ? " checked" : ""} type="radio" value="csv" class="mr-2"${_scopeId}><span class="text-gray-300"${_scopeId}>CSV</span></label></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-300 mb-2"${_scopeId}>Include Sections</label><div class="space-y-2"${_scopeId}><label class="flex items-center"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(reportConfig).sections) ? ssrLooseContain(unref(reportConfig).sections, "executive_summary") : unref(reportConfig).sections) ? " checked" : ""} type="checkbox" value="executive_summary" class="mr-2"${_scopeId}><span class="text-gray-300"${_scopeId}>Executive Summary</span></label><label class="flex items-center"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(reportConfig).sections) ? ssrLooseContain(unref(reportConfig).sections, "detailed_analysis") : unref(reportConfig).sections) ? " checked" : ""} type="checkbox" value="detailed_analysis" class="mr-2"${_scopeId}><span class="text-gray-300"${_scopeId}>Detailed Analysis</span></label><label class="flex items-center"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(reportConfig).sections) ? ssrLooseContain(unref(reportConfig).sections, "charts") : unref(reportConfig).sections) ? " checked" : ""} type="checkbox" value="charts" class="mr-2"${_scopeId}><span class="text-gray-300"${_scopeId}>Charts &amp; Visualizations</span></label><label class="flex items-center"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(reportConfig).sections) ? ssrLooseContain(unref(reportConfig).sections, "recommendations") : unref(reportConfig).sections) ? " checked" : ""} type="checkbox" value="recommendations" class="mr-2"${_scopeId}><span class="text-gray-300"${_scopeId}>Recommendations</span></label></div></div></div></div><div${_scopeId}><h3 class="text-lg font-medium text-white mb-4"${_scopeId}>Report Preview</h3><div class="border border-gray-600 rounded-lg p-4 bg-gray-700/30 min-h-96"${_scopeId}>`);
            if (unref(reportConfig).type) {
              _push2(`<div class="space-y-4"${_scopeId}><div class="text-center"${_scopeId}><h4 class="text-lg font-semibold text-white"${_scopeId}>${ssrInterpolate(getReportTitle())}</h4><p class="text-sm text-gray-400"${_scopeId}>${ssrInterpolate(getReportPeriodText())}</p></div><div class="border-t border-gray-600 pt-4"${_scopeId}><!--[-->`);
              ssrRenderList(unref(reportConfig).sections, (section) => {
                _push2(`<div class="mb-3"${_scopeId}><div class="text-sm font-medium text-blue-400"${_scopeId}>${ssrInterpolate(formatSectionName(section))}</div></div>`);
              });
              _push2(`<!--]--></div><div class="text-xs text-gray-500 mt-4"${_scopeId}> Format: ${ssrInterpolate(unref(reportConfig).format.toUpperCase())} | Generated: ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString())}</div></div>`);
            } else {
              _push2(`<div class="text-center text-gray-400 py-8"${_scopeId}> Select report type to see preview </div>`);
            }
            _push2(`</div></div></div></div><div class="card p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-6"${_scopeId}>Recent Reports</h3><div class="overflow-x-auto"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead${_scopeId}><tr class="border-b border-gray-700"${_scopeId}><th class="text-left py-3 text-gray-400"${_scopeId}>Report Name</th><th class="text-left py-3 text-gray-400"${_scopeId}>Type</th><th class="text-left py-3 text-gray-400"${_scopeId}>Period</th><th class="text-left py-3 text-gray-400"${_scopeId}>Generated</th><th class="text-left py-3 text-gray-400"${_scopeId}>Status</th><th class="text-left py-3 text-gray-400"${_scopeId}>Actions</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(unref(recentReports), (report) => {
              _push2(`<tr class="border-b border-gray-700/50"${_scopeId}><td class="py-3"${_scopeId}><div class="font-medium text-white"${_scopeId}>${ssrInterpolate(report.name)}</div><div class="text-sm text-gray-400"${_scopeId}>${ssrInterpolate(formatFileSize(report.size))}</div></td><td class="py-3 text-gray-300"${_scopeId}>${ssrInterpolate(report.type)}</td><td class="py-3 text-gray-300"${_scopeId}>${ssrInterpolate(report.period)}</td><td class="py-3 text-gray-300"${_scopeId}>${ssrInterpolate(formatDate(report.createdAt))}</td><td class="py-3"${_scopeId}><span class="${ssrRenderClass([report.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400", "px-2 py-1 rounded-full text-xs"])}"${_scopeId}>${ssrInterpolate(report.status)}</span></td><td class="py-3"${_scopeId}><div class="flex space-x-2"${_scopeId}><button class="text-blue-400 hover:text-blue-300 text-sm"${_scopeId}>Download</button><button class="text-gray-400 hover:text-gray-300 text-sm"${_scopeId}>View</button><button class="text-red-400 hover:text-red-300 text-sm"${_scopeId}>Delete</button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div><div class="card p-6"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><h3 class="text-lg font-semibold text-white"${_scopeId}>Scheduled Reports</h3><button class="btn-secondary"${_scopeId}>Add Schedule</button></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(unref(scheduledReports), (schedule) => {
              _push2(`<div class="p-4 bg-gray-700/30 rounded-lg border border-gray-600"${_scopeId}><div class="flex items-center justify-between mb-3"${_scopeId}><h4 class="font-medium text-white"${_scopeId}>${ssrInterpolate(schedule.name)}</h4><div class="flex items-center space-x-1"${_scopeId}><div class="${ssrRenderClass([schedule.active ? "bg-green-400" : "bg-gray-400", "w-2 h-2 rounded-full"])}"${_scopeId}></div><span class="${ssrRenderClass([schedule.active ? "text-green-400" : "text-gray-400", "text-xs"])}"${_scopeId}>${ssrInterpolate(schedule.active ? "Active" : "Inactive")}</span></div></div><div class="space-y-2 text-sm text-gray-300"${_scopeId}><div${_scopeId}>Type: ${ssrInterpolate(schedule.type)}</div><div${_scopeId}>Frequency: ${ssrInterpolate(schedule.frequency)}</div><div${_scopeId}>Next Run: ${ssrInterpolate(formatDate(schedule.nextRun))}</div><div${_scopeId}>Recipients: ${ssrInterpolate(schedule.recipients.length)} people</div></div><div class="flex space-x-2 mt-4"${_scopeId}><button class="text-blue-400 hover:text-blue-300 text-sm"${_scopeId}>Edit</button><button class="${ssrRenderClass([schedule.active ? "text-yellow-400 hover:text-yellow-300" : "text-green-400 hover:text-green-300", "text-sm"])}"${_scopeId}>${ssrInterpolate(schedule.active ? "Pause" : "Activate")}</button></div></div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "card p-6" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6" }, [
                    createVNode("h2", { class: "text-xl font-semibold text-white" }, "Report Generation"),
                    createVNode("button", {
                      onClick: generateReport,
                      class: "btn-primary"
                    }, " Generate New Report ")
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-lg font-medium text-white mb-4" }, "Report Configuration"),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-300 mb-2" }, "Report Type"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(reportConfig).type = $event,
                            class: "input-field w-full"
                          }, [
                            createVNode("option", { value: "fraud_summary" }, "Fraud Detection Summary"),
                            createVNode("option", { value: "compliance" }, "Regulatory Compliance"),
                            createVNode("option", { value: "performance" }, "Model Performance"),
                            createVNode("option", { value: "audit" }, "Internal Audit"),
                            createVNode("option", { value: "custom" }, "Custom Analysis")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(reportConfig).type]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-300 mb-2" }, "Time Period"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(reportConfig).period = $event,
                            class: "input-field w-full"
                          }, [
                            createVNode("option", { value: "7d" }, "Last 7 days"),
                            createVNode("option", { value: "30d" }, "Last 30 days"),
                            createVNode("option", { value: "90d" }, "Last 90 days"),
                            createVNode("option", { value: "1y" }, "Last year"),
                            createVNode("option", { value: "custom" }, "Custom Range")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(reportConfig).period]
                          ])
                        ]),
                        unref(reportConfig).period === "custom" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "grid grid-cols-2 gap-4"
                        }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-300 mb-2" }, "Start Date"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(reportConfig).startDate = $event,
                              type: "date",
                              class: "input-field w-full"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(reportConfig).startDate]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-300 mb-2" }, "End Date"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(reportConfig).endDate = $event,
                              type: "date",
                              class: "input-field w-full"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(reportConfig).endDate]
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-300 mb-2" }, "Format"),
                          createVNode("div", { class: "flex space-x-4" }, [
                            createVNode("label", { class: "flex items-center" }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(reportConfig).format = $event,
                                type: "radio",
                                value: "pdf",
                                class: "mr-2"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelRadio, unref(reportConfig).format]
                              ]),
                              createVNode("span", { class: "text-gray-300" }, "PDF")
                            ]),
                            createVNode("label", { class: "flex items-center" }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(reportConfig).format = $event,
                                type: "radio",
                                value: "xlsx",
                                class: "mr-2"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelRadio, unref(reportConfig).format]
                              ]),
                              createVNode("span", { class: "text-gray-300" }, "Excel")
                            ]),
                            createVNode("label", { class: "flex items-center" }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(reportConfig).format = $event,
                                type: "radio",
                                value: "csv",
                                class: "mr-2"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelRadio, unref(reportConfig).format]
                              ]),
                              createVNode("span", { class: "text-gray-300" }, "CSV")
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-300 mb-2" }, "Include Sections"),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "flex items-center" }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(reportConfig).sections = $event,
                                type: "checkbox",
                                value: "executive_summary",
                                class: "mr-2"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(reportConfig).sections]
                              ]),
                              createVNode("span", { class: "text-gray-300" }, "Executive Summary")
                            ]),
                            createVNode("label", { class: "flex items-center" }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(reportConfig).sections = $event,
                                type: "checkbox",
                                value: "detailed_analysis",
                                class: "mr-2"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(reportConfig).sections]
                              ]),
                              createVNode("span", { class: "text-gray-300" }, "Detailed Analysis")
                            ]),
                            createVNode("label", { class: "flex items-center" }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(reportConfig).sections = $event,
                                type: "checkbox",
                                value: "charts",
                                class: "mr-2"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(reportConfig).sections]
                              ]),
                              createVNode("span", { class: "text-gray-300" }, "Charts & Visualizations")
                            ]),
                            createVNode("label", { class: "flex items-center" }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(reportConfig).sections = $event,
                                type: "checkbox",
                                value: "recommendations",
                                class: "mr-2"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(reportConfig).sections]
                              ]),
                              createVNode("span", { class: "text-gray-300" }, "Recommendations")
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-lg font-medium text-white mb-4" }, "Report Preview"),
                      createVNode("div", { class: "border border-gray-600 rounded-lg p-4 bg-gray-700/30 min-h-96" }, [
                        unref(reportConfig).type ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-4"
                        }, [
                          createVNode("div", { class: "text-center" }, [
                            createVNode("h4", { class: "text-lg font-semibold text-white" }, toDisplayString(getReportTitle()), 1),
                            createVNode("p", { class: "text-sm text-gray-400" }, toDisplayString(getReportPeriodText()), 1)
                          ]),
                          createVNode("div", { class: "border-t border-gray-600 pt-4" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(reportConfig).sections, (section) => {
                              return openBlock(), createBlock("div", {
                                key: section,
                                class: "mb-3"
                              }, [
                                createVNode("div", { class: "text-sm font-medium text-blue-400" }, toDisplayString(formatSectionName(section)), 1)
                              ]);
                            }), 128))
                          ]),
                          createVNode("div", { class: "text-xs text-gray-500 mt-4" }, " Format: " + toDisplayString(unref(reportConfig).format.toUpperCase()) + " | Generated: " + toDisplayString((/* @__PURE__ */ new Date()).toLocaleDateString()), 1)
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-center text-gray-400 py-8"
                        }, " Select report type to see preview "))
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "card p-6" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-white mb-6" }, "Recent Reports"),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full text-sm" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "border-b border-gray-700" }, [
                          createVNode("th", { class: "text-left py-3 text-gray-400" }, "Report Name"),
                          createVNode("th", { class: "text-left py-3 text-gray-400" }, "Type"),
                          createVNode("th", { class: "text-left py-3 text-gray-400" }, "Period"),
                          createVNode("th", { class: "text-left py-3 text-gray-400" }, "Generated"),
                          createVNode("th", { class: "text-left py-3 text-gray-400" }, "Status"),
                          createVNode("th", { class: "text-left py-3 text-gray-400" }, "Actions")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(recentReports), (report) => {
                          return openBlock(), createBlock("tr", {
                            key: report.id,
                            class: "border-b border-gray-700/50"
                          }, [
                            createVNode("td", { class: "py-3" }, [
                              createVNode("div", { class: "font-medium text-white" }, toDisplayString(report.name), 1),
                              createVNode("div", { class: "text-sm text-gray-400" }, toDisplayString(formatFileSize(report.size)), 1)
                            ]),
                            createVNode("td", { class: "py-3 text-gray-300" }, toDisplayString(report.type), 1),
                            createVNode("td", { class: "py-3 text-gray-300" }, toDisplayString(report.period), 1),
                            createVNode("td", { class: "py-3 text-gray-300" }, toDisplayString(formatDate(report.createdAt)), 1),
                            createVNode("td", { class: "py-3" }, [
                              createVNode("span", {
                                class: [report.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400", "px-2 py-1 rounded-full text-xs"]
                              }, toDisplayString(report.status), 3)
                            ]),
                            createVNode("td", { class: "py-3" }, [
                              createVNode("div", { class: "flex space-x-2" }, [
                                createVNode("button", { class: "text-blue-400 hover:text-blue-300 text-sm" }, "Download"),
                                createVNode("button", { class: "text-gray-400 hover:text-gray-300 text-sm" }, "View"),
                                createVNode("button", { class: "text-red-400 hover:text-red-300 text-sm" }, "Delete")
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "card p-6" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-white" }, "Scheduled Reports"),
                    createVNode("button", { class: "btn-secondary" }, "Add Schedule")
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(scheduledReports), (schedule) => {
                      return openBlock(), createBlock("div", {
                        key: schedule.id,
                        class: "p-4 bg-gray-700/30 rounded-lg border border-gray-600"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                          createVNode("h4", { class: "font-medium text-white" }, toDisplayString(schedule.name), 1),
                          createVNode("div", { class: "flex items-center space-x-1" }, [
                            createVNode("div", {
                              class: [schedule.active ? "bg-green-400" : "bg-gray-400", "w-2 h-2 rounded-full"]
                            }, null, 2),
                            createVNode("span", {
                              class: [schedule.active ? "text-green-400" : "text-gray-400", "text-xs"]
                            }, toDisplayString(schedule.active ? "Active" : "Inactive"), 3)
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2 text-sm text-gray-300" }, [
                          createVNode("div", null, "Type: " + toDisplayString(schedule.type), 1),
                          createVNode("div", null, "Frequency: " + toDisplayString(schedule.frequency), 1),
                          createVNode("div", null, "Next Run: " + toDisplayString(formatDate(schedule.nextRun)), 1),
                          createVNode("div", null, "Recipients: " + toDisplayString(schedule.recipients.length) + " people", 1)
                        ]),
                        createVNode("div", { class: "flex space-x-2 mt-4" }, [
                          createVNode("button", { class: "text-blue-400 hover:text-blue-300 text-sm" }, "Edit"),
                          createVNode("button", {
                            class: [schedule.active ? "text-yellow-400 hover:text-yellow-300" : "text-green-400 hover:text-green-300", "text-sm"]
                          }, toDisplayString(schedule.active ? "Pause" : "Activate"), 3)
                        ])
                      ]);
                    }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reports.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=reports-Cv6gk89n.js.map
