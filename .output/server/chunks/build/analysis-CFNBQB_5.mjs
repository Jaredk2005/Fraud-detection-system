import { _ as __nuxt_component_0 } from './nuxt-layout-CE6R6O5A.mjs';
import { _ as _sfc_main$1 } from './DashboardChart-DwKXTEfg.mjs';
import { ref, computed, watch, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, withDirectives, isRef, vModelSelect, toDisplayString, withModifiers, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { ArrowPathIcon, DocumentArrowUpIcon, CloudArrowUpIcon, CheckCircleIcon, ExclamationTriangleIcon, ChartBarIcon, CurrencyDollarIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline';
import { _ as _export_sfc, a as useRuntimeConfig } from './server.mjs';
import { s as setInterval } from './interval-BEpEGVAJ.mjs';
import 'vue-router';
import 'chart.js';
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

const _sfc_main = {
  __name: "analysis",
  __ssrInlineRender: true,
  setup(__props) {
    const timeRange = ref("30d");
    const analysisData = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const isDragging = ref(false);
    const uploadedFile = ref(null);
    const uploadStatus = ref({
      processing: false,
      completed: false,
      error: null,
      progress: 0,
      message: "",
      fileName: "",
      recordCount: 0
    });
    const config = useRuntimeConfig();
    const API_BASE_URL = config.public.apiBase || "http://localhost:8000";
    const formatNumber = (num) => {
      if (num == null || num === "" || isNaN(num)) return "0";
      return new Intl.NumberFormat().format(Number(num));
    };
    const formatPercentage = (num) => {
      if (num == null || num === "" || isNaN(num)) return "0.00";
      return Number(num).toFixed(2);
    };
    const formatCategoryName = (name) => {
      if (!name) return "";
      return name.split("_").map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      ).join(" ");
    };
    const getAmountRangeFraudRate = (range) => {
      var _a, _b;
      if (!((_b = (_a = analysisData.value) == null ? void 0 : _a.trends) == null ? void 0 : _b.by_amount)) return "0.00";
      const data = analysisData.value.trends.by_amount[range];
      if (!data || data.mean == null || isNaN(data.mean)) return "0.00";
      return (Number(data.mean) * 100).toFixed(2);
    };
    const calculateAccuracy = () => {
      var _a;
      if (!((_a = analysisData.value) == null ? void 0 : _a.fraud_statistics)) return "0.0";
      const stats = analysisData.value.fraud_statistics;
      if (!stats.legitimate_transactions || !stats.total_transactions) return "0.0";
      return (Number(stats.legitimate_transactions) / Number(stats.total_transactions) * 100).toFixed(1);
    };
    const getFraudRateColor = (rate) => {
      const numRate = Number(rate);
      if (isNaN(numRate)) return "text-gray-400";
      if (numRate > 10) return "text-red-400";
      if (numRate > 5) return "text-orange-400";
      if (numRate > 1) return "text-yellow-400";
      return "text-green-400";
    };
    const handleFileDrop = (event) => {
      event.preventDefault();
      isDragging.value = false;
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        processFile(files[0]);
      }
    };
    const handleFileSelect = (event) => {
      const files = event.target.files;
      if (files.length > 0) {
        processFile(files[0]);
      }
    };
    const processFile = async (file) => {
      const validTypes = [".csv", ".xlsx", ".xls"];
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();
      if (!validTypes.includes(fileExtension)) {
        uploadStatus.value.error = "Invalid file format. Please upload a CSV or Excel file.";
        return;
      }
      uploadedFile.value = file;
      await uploadFile(file);
    };
    const uploadFile = async (file) => {
      var _a, _b, _c, _d;
      let progressInterval;
      try {
        uploadStatus.value = {
          processing: true,
          completed: false,
          error: null,
          progress: 0,
          message: "Preparing file upload...",
          fileName: file.name,
          recordCount: 0
        };
        const formData = new FormData();
        formData.append("file", file);
        progressInterval = setInterval(() => {
          if (uploadStatus.value.progress < 90) {
            uploadStatus.value.progress += Math.random() * 15;
            if (uploadStatus.value.progress < 25) {
              uploadStatus.value.message = "Uploading file...";
            } else if (uploadStatus.value.progress < 50) {
              uploadStatus.value.message = "Processing data...";
            } else if (uploadStatus.value.progress < 75) {
              uploadStatus.value.message = "Analyzing patterns...";
            } else {
              uploadStatus.value.message = "Generating insights...";
            }
          }
        }, 400);
        const response = await $fetch(`${API_BASE_URL}/analyze`, {
          method: "POST",
          body: formData
        });
        clearInterval(progressInterval);
        console.log("API Response:", response);
        console.log("Response structure:", Object.keys(response || {}));
        const responseData = response.data || response;
        console.log("Analysis data structure:", responseData);
        console.log("Fraud statistics:", responseData == null ? void 0 : responseData.fraud_statistics);
        uploadStatus.value.progress = 100;
        uploadStatus.value.message = "Analysis complete!";
        uploadStatus.value.processing = false;
        uploadStatus.value.completed = true;
        uploadStatus.value.recordCount = response.record_count || ((_a = responseData == null ? void 0 : responseData.fraud_statistics) == null ? void 0 : _a.total_transactions) || 0;
        analysisData.value = responseData;
        if (analysisData.value) {
          console.log("Final analysis data:", analysisData.value);
          console.log("Fraud percentage type:", typeof ((_b = analysisData.value.fraud_statistics) == null ? void 0 : _b.fraud_percentage));
          console.log("Fraud percentage value:", (_c = analysisData.value.fraud_statistics) == null ? void 0 : _c.fraud_percentage);
        }
      } catch (err) {
        if (progressInterval) clearInterval(progressInterval);
        console.error("Error uploading and analyzing file:", err);
        uploadStatus.value.processing = false;
        uploadStatus.value.error = ((_d = err.data) == null ? void 0 : _d.detail) || err.message || "Failed to upload and analyze file. Please try again.";
      }
    };
    const resetUpload = () => {
      uploadStatus.value = {
        processing: false,
        completed: false,
        error: null,
        progress: 0,
        message: "",
        fileName: "",
        recordCount: 0
      };
      analysisData.value = null;
      uploadedFile.value = null;
      error.value = null;
    };
    const fetchAnalysisData = async () => {
      if (!analysisData.value) {
        error.value = "No data available. Please upload a file first.";
        return;
      }
      try {
        loading.value = true;
        error.value = null;
        const formData = new FormData();
        if (uploadedFile.value) {
          formData.append("file", uploadedFile.value);
          formData.append("time_range", timeRange.value);
          const response = await $fetch(`${API_BASE_URL}/analyze`, {
            method: "POST",
            body: formData
          });
          analysisData.value = response.data || response;
        }
      } catch (err) {
        console.error("Error fetching analysis data:", err);
        error.value = "Failed to refresh analysis data. Please try again.";
      } finally {
        loading.value = false;
      }
    };
    const refreshData = () => {
      fetchAnalysisData();
    };
    const exportAnalysis = async () => {
      if (!uploadedFile.value) {
        error.value = "No data available to export.";
        return;
      }
      try {
        const formData = new FormData();
        formData.append("file", uploadedFile.value);
        formData.append("time_range", timeRange.value);
        formData.append("export_format", "csv");
        const response = await $fetch(`${API_BASE_URL}/analyze`, {
          method: "POST",
          body: formData
        });
        const exportData = response.export_data || response;
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
        const url = (void 0).URL.createObjectURL(blob);
        const link = (void 0).createElement("a");
        link.href = url;
        link.download = `fraud_analysis_${timeRange.value}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
        (void 0).body.appendChild(link);
        link.click();
        (void 0).body.removeChild(link);
        (void 0).URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Error exporting analysis:", err);
      }
    };
    const categoryChartData = computed(() => {
      var _a, _b;
      if (!((_b = (_a = analysisData.value) == null ? void 0 : _a.trends) == null ? void 0 : _b.by_category)) return null;
      const categories = analysisData.value.trends.by_category;
      const sortedCategories = Object.entries(categories).filter(([, data]) => data && data.mean != null).sort(([, a], [, b]) => Number(b.mean) - Number(a.mean)).slice(0, 10);
      return {
        labels: sortedCategories.map(([name]) => formatCategoryName(name)),
        datasets: [
          {
            label: "Fraud Rate (%)",
            data: sortedCategories.map(([, data]) => (Number(data.mean) * 100).toFixed(3)),
            backgroundColor: "rgba(239, 68, 68, 0.8)",
            borderColor: "#EF4444",
            borderWidth: 1
          }
        ]
      };
    });
    const amountChartData = computed(() => {
      var _a, _b;
      if (!((_b = (_a = analysisData.value) == null ? void 0 : _a.trends) == null ? void 0 : _b.by_amount)) return null;
      const amounts = analysisData.value.trends.by_amount;
      const ranges = ["0-50", "51-100", "101-500", "501-1000", "1000+"];
      return {
        labels: ranges.map((range) => `$${range}`),
        datasets: [
          {
            label: "Fraud Rate (%)",
            data: ranges.map((range) => {
              const data = amounts[range];
              return data && data.mean != null ? (Number(data.mean) * 100).toFixed(3) : "0";
            }),
            borderColor: "#F59E0B",
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            tension: 0.4,
            fill: true
          }
        ]
      };
    });
    const genderChartData = computed(() => {
      var _a, _b, _c, _d;
      if (!((_b = (_a = analysisData.value) == null ? void 0 : _a.trends) == null ? void 0 : _b.by_gender)) return null;
      const genderData = analysisData.value.trends.by_gender;
      return {
        labels: ["Female", "Male"],
        datasets: [
          {
            data: [
              ((_c = genderData.F) == null ? void 0 : _c.sum) || 0,
              ((_d = genderData.M) == null ? void 0 : _d.sum) || 0
            ],
            backgroundColor: ["#EC4899", "#3B82F6"],
            borderWidth: 0
          }
        ]
      };
    });
    const topRiskCategories = computed(() => {
      var _a, _b;
      if (!((_b = (_a = analysisData.value) == null ? void 0 : _a.trends) == null ? void 0 : _b.by_category)) return [];
      return Object.entries(analysisData.value.trends.by_category).filter(([, data]) => data && data.mean != null).map(([name, data]) => ({
        name,
        fraud_rate: Number(data.mean),
        fraud_cases: data.sum || 0,
        total_transactions: data.count || 0
      })).sort((a, b) => b.fraud_rate - a.fraud_rate).slice(0, 8);
    });
    watch(timeRange, () => {
      if (analysisData.value) {
        fetchAnalysisData();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_DashboardChart = _sfc_main$1;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6" data-v-d447831a${_scopeId}><div class="card p-6" data-v-d447831a${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-v-d447831a${_scopeId}><h2 class="text-xl font-semibold text-white" data-v-d447831a${_scopeId}>Data Analysis &amp; Visualization</h2>`);
            if (unref(analysisData)) {
              _push2(`<div class="flex space-x-4" data-v-d447831a${_scopeId}><select class="input-field" data-v-d447831a${_scopeId}><option value="7d" data-v-d447831a${ssrIncludeBooleanAttr(Array.isArray(unref(timeRange)) ? ssrLooseContain(unref(timeRange), "7d") : ssrLooseEqual(unref(timeRange), "7d")) ? " selected" : ""}${_scopeId}>Last 7 days</option><option value="30d" data-v-d447831a${ssrIncludeBooleanAttr(Array.isArray(unref(timeRange)) ? ssrLooseContain(unref(timeRange), "30d") : ssrLooseEqual(unref(timeRange), "30d")) ? " selected" : ""}${_scopeId}>Last 30 days</option><option value="90d" data-v-d447831a${ssrIncludeBooleanAttr(Array.isArray(unref(timeRange)) ? ssrLooseContain(unref(timeRange), "90d") : ssrLooseEqual(unref(timeRange), "90d")) ? " selected" : ""}${_scopeId}>Last 90 days</option><option value="1y" data-v-d447831a${ssrIncludeBooleanAttr(Array.isArray(unref(timeRange)) ? ssrLooseContain(unref(timeRange), "1y") : ssrLooseEqual(unref(timeRange), "1y")) ? " selected" : ""}${_scopeId}>Last year</option></select><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="btn-primary flex items-center space-x-2" data-v-d447831a${_scopeId}>`);
              if (unref(loading)) {
                _push2(ssrRenderComponent(unref(ArrowPathIcon), { class: "w-4 h-4 animate-spin" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span data-v-d447831a${_scopeId}>${ssrInterpolate(unref(loading) ? "Refreshing..." : "Refresh Data")}</span></button><button class="btn-primary" data-v-d447831a${_scopeId}>Export Analysis</button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (!unref(analysisData)) {
              _push2(`<div class="card p-8" data-v-d447831a${_scopeId}><div class="text-center" data-v-d447831a${_scopeId}><div class="mb-6" data-v-d447831a${_scopeId}>`);
              _push2(ssrRenderComponent(unref(DocumentArrowUpIcon), { class: "w-16 h-16 text-blue-400 mx-auto mb-4" }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-xl font-semibold text-white mb-2" data-v-d447831a${_scopeId}>Upload Data File</h3><p class="text-gray-400" data-v-d447831a${_scopeId}>Upload a CSV file to begin your fraud detection analysis</p></div><div class="${ssrRenderClass([{
                "border-blue-500 bg-blue-500/5": unref(isDragging),
                "hover:border-gray-500 hover:bg-gray-700/20": !unref(isDragging)
              }, "border-2 border-dashed border-gray-600 rounded-lg p-8 mb-4 transition-colors"])}" data-v-d447831a${_scopeId}><div class="space-y-4" data-v-d447831a${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CloudArrowUpIcon), { class: "w-12 h-12 text-gray-400 mx-auto" }, null, _parent2, _scopeId));
              _push2(`<div data-v-d447831a${_scopeId}><p class="text-white font-medium" data-v-d447831a${_scopeId}>Drop your CSV file here</p><p class="text-gray-400 text-sm" data-v-d447831a${_scopeId}>or click to browse</p></div><input type="file" accept=".csv,.xlsx,.xls" class="hidden" data-v-d447831a${_scopeId}><button class="btn-primary" data-v-d447831a${_scopeId}> Choose File </button></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(uploadStatus).processing) {
              _push2(`<div class="card p-6" data-v-d447831a${_scopeId}><div class="flex items-center space-x-4" data-v-d447831a${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ArrowPathIcon), { class: "w-6 h-6 animate-spin text-blue-400" }, null, _parent2, _scopeId));
              _push2(`<div class="flex-1" data-v-d447831a${_scopeId}><h3 class="text-white font-medium" data-v-d447831a${_scopeId}>Processing File</h3><p class="text-gray-400 text-sm" data-v-d447831a${_scopeId}>${ssrInterpolate(unref(uploadStatus).message)}</p><div class="w-full bg-gray-700 rounded-full h-2 mt-2" data-v-d447831a${_scopeId}><div class="bg-blue-500 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: unref(uploadStatus).progress + "%" })}" data-v-d447831a${_scopeId}></div></div></div><span class="text-blue-400 text-sm" data-v-d447831a${_scopeId}>${ssrInterpolate(unref(uploadStatus).progress)}%</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(uploadStatus).completed && !unref(uploadStatus).error) {
              _push2(`<div class="card p-6 border-green-500/20 bg-green-500/5" data-v-d447831a${_scopeId}><div class="flex items-center space-x-3" data-v-d447831a${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircleIcon), { class: "w-6 h-6 text-green-400" }, null, _parent2, _scopeId));
              _push2(`<div data-v-d447831a${_scopeId}><h3 class="text-green-400 font-semibold" data-v-d447831a${_scopeId}>File Uploaded Successfully</h3><p class="text-gray-300 text-sm" data-v-d447831a${_scopeId}>${ssrInterpolate(unref(uploadStatus).fileName)} - ${ssrInterpolate(formatNumber(unref(uploadStatus).recordCount))} records processed</p></div><button class="btn-secondary text-sm ml-auto" data-v-d447831a${_scopeId}> Upload New File </button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(uploadStatus).error) {
              _push2(`<div class="card p-6 border-red-500/20 bg-red-500/5" data-v-d447831a${_scopeId}><div class="flex items-center space-x-3" data-v-d447831a${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ExclamationTriangleIcon), { class: "w-6 h-6 text-red-400" }, null, _parent2, _scopeId));
              _push2(`<div data-v-d447831a${_scopeId}><h3 class="text-red-400 font-semibold" data-v-d447831a${_scopeId}>Upload Error</h3><p class="text-gray-300 text-sm" data-v-d447831a${_scopeId}>${ssrInterpolate(unref(uploadStatus).error)}</p><button class="btn-primary mt-2 text-sm" data-v-d447831a${_scopeId}>Try Again</button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(loading) && unref(analysisData)) {
              _push2(`<div class="flex items-center justify-center py-12" data-v-d447831a${_scopeId}><div class="text-center" data-v-d447831a${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ArrowPathIcon), { class: "w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" }, null, _parent2, _scopeId));
              _push2(`<p class="text-gray-400" data-v-d447831a${_scopeId}>Loading analysis data...</p></div></div>`);
            } else if (unref(error)) {
              _push2(`<div class="card p-6 border-red-500/20 bg-red-500/5" data-v-d447831a${_scopeId}><div class="flex items-center space-x-3" data-v-d447831a${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ExclamationTriangleIcon), { class: "w-6 h-6 text-red-400" }, null, _parent2, _scopeId));
              _push2(`<div data-v-d447831a${_scopeId}><h3 class="text-red-400 font-semibold" data-v-d447831a${_scopeId}>Error Loading Data</h3><p class="text-gray-300 text-sm" data-v-d447831a${_scopeId}>${ssrInterpolate(unref(error))}</p><button class="btn-primary mt-2 text-sm" data-v-d447831a${_scopeId}>Retry</button></div></div></div>`);
            } else if (unref(analysisData)) {
              _push2(`<div data-v-d447831a${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-v-d447831a${_scopeId}><div class="card p-6" data-v-d447831a${_scopeId}><div class="flex items-center justify-between" data-v-d447831a${_scopeId}><div data-v-d447831a${_scopeId}><p class="text-sm text-gray-400" data-v-d447831a${_scopeId}>Fraud Rate</p><p class="text-2xl font-bold text-red-400" data-v-d447831a${_scopeId}>${ssrInterpolate(formatPercentage(unref(analysisData).fraud_statistics.fraud_percentage))}%</p><p class="text-xs text-green-400" data-v-d447831a${_scopeId}>${ssrInterpolate(unref(analysisData).fraud_statistics.fraud_cases)} cases detected</p></div><div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center" data-v-d447831a${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ExclamationTriangleIcon), { class: "w-6 h-6 text-red-400" }, null, _parent2, _scopeId));
              _push2(`</div></div></div><div class="card p-6" data-v-d447831a${_scopeId}><div class="flex items-center justify-between" data-v-d447831a${_scopeId}><div data-v-d447831a${_scopeId}><p class="text-sm text-gray-400" data-v-d447831a${_scopeId}>Total Transactions</p><p class="text-2xl font-bold text-blue-400" data-v-d447831a${_scopeId}>${ssrInterpolate(formatNumber(unref(analysisData).fraud_statistics.total_transactions))}</p><p class="text-xs text-gray-400" data-v-d447831a${_scopeId}>${ssrInterpolate(formatNumber(unref(analysisData).fraud_statistics.legitimate_transactions))} legitimate</p></div><div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center" data-v-d447831a${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ChartBarIcon), { class: "w-6 h-6 text-blue-400" }, null, _parent2, _scopeId));
              _push2(`</div></div></div><div class="card p-6" data-v-d447831a${_scopeId}><div class="flex items-center justify-between" data-v-d447831a${_scopeId}><div data-v-d447831a${_scopeId}><p class="text-sm text-gray-400" data-v-d447831a${_scopeId}>High Risk Amount Range</p><p class="text-2xl font-bold text-yellow-400" data-v-d447831a${_scopeId}>$501-1000</p><p class="text-xs text-red-400" data-v-d447831a${_scopeId}>${ssrInterpolate(formatPercentage(getAmountRangeFraudRate("501-1000")))}% fraud rate</p></div><div class="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center" data-v-d447831a${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CurrencyDollarIcon), { class: "w-6 h-6 text-yellow-400" }, null, _parent2, _scopeId));
              _push2(`</div></div></div><div class="card p-6" data-v-d447831a${_scopeId}><div class="flex items-center justify-between" data-v-d447831a${_scopeId}><div data-v-d447831a${_scopeId}><p class="text-sm text-gray-400" data-v-d447831a${_scopeId}>Detection Accuracy</p><p class="text-2xl font-bold text-green-400" data-v-d447831a${_scopeId}>${ssrInterpolate(calculateAccuracy())}%</p><p class="text-xs text-green-400" data-v-d447831a${_scopeId}>System performance</p></div><div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center" data-v-d447831a${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ShieldCheckIcon), { class: "w-6 h-6 text-green-400" }, null, _parent2, _scopeId));
              _push2(`</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-d447831a${_scopeId}><div class="card p-6" data-v-d447831a${_scopeId}><h3 class="text-lg font-semibold text-white mb-4" data-v-d447831a${_scopeId}>Fraud by Category</h3><div class="h-80" data-v-d447831a${_scopeId}>`);
              _push2(ssrRenderComponent(_component_DashboardChart, {
                data: unref(categoryChartData),
                type: "bar"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="card p-6" data-v-d447831a${_scopeId}><h3 class="text-lg font-semibold text-white mb-4" data-v-d447831a${_scopeId}>Fraud Rate by Amount Range</h3><div class="h-80" data-v-d447831a${_scopeId}>`);
              _push2(ssrRenderComponent(_component_DashboardChart, {
                data: unref(amountChartData),
                type: "line"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="card p-6" data-v-d447831a${_scopeId}><h3 class="text-lg font-semibold text-white mb-4" data-v-d447831a${_scopeId}>Fraud Distribution by Gender</h3><div class="h-80" data-v-d447831a${_scopeId}>`);
              _push2(ssrRenderComponent(_component_DashboardChart, {
                data: unref(genderChartData),
                type: "doughnut"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="card p-6" data-v-d447831a${_scopeId}><h3 class="text-lg font-semibold text-white mb-4" data-v-d447831a${_scopeId}>Highest Risk Categories</h3><div class="space-y-4" data-v-d447831a${_scopeId}><!--[-->`);
              ssrRenderList(unref(topRiskCategories), (category) => {
                _push2(`<div class="flex items-center" data-v-d447831a${_scopeId}><div class="w-32 text-sm text-gray-300" data-v-d447831a${_scopeId}>${ssrInterpolate(formatCategoryName(category.name))}</div><div class="flex-1 mx-4" data-v-d447831a${_scopeId}><div class="w-full bg-gray-700 rounded-full h-3" data-v-d447831a${_scopeId}><div class="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500" style="${ssrRenderStyle({ width: category.fraud_rate / unref(topRiskCategories)[0].fraud_rate * 100 + "%" })}" data-v-d447831a${_scopeId}></div></div></div><div class="w-16 text-sm text-red-400 text-right" data-v-d447831a${_scopeId}>${ssrInterpolate(formatPercentage(category.fraud_rate * 100))}%</div></div>`);
              });
              _push2(`<!--]--></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-d447831a${_scopeId}><div class="card p-6" data-v-d447831a${_scopeId}><h3 class="text-lg font-semibold text-white mb-4" data-v-d447831a${_scopeId}>AI Insights</h3><div class="space-y-3" data-v-d447831a${_scopeId}><!--[-->`);
              ssrRenderList(unref(analysisData).insights, (insight, index) => {
                _push2(`<div class="flex items-start space-x-3 p-3 bg-gray-700/30 rounded-lg" data-v-d447831a${_scopeId}><div class="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" data-v-d447831a${_scopeId}><span class="text-blue-400 text-xs font-bold" data-v-d447831a${_scopeId}>${ssrInterpolate(index + 1)}</span></div><p class="text-gray-300 text-sm" data-v-d447831a${_scopeId}>${ssrInterpolate(insight)}</p></div>`);
              });
              _push2(`<!--]--></div></div><div class="card p-6" data-v-d447831a${_scopeId}><h3 class="text-lg font-semibold text-white mb-4" data-v-d447831a${_scopeId}>Amount Range Analysis</h3><div class="space-y-4" data-v-d447831a${_scopeId}><!--[-->`);
              ssrRenderList(unref(analysisData).trends.by_amount, (data, range) => {
                _push2(`<div class="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg" data-v-d447831a${_scopeId}><div data-v-d447831a${_scopeId}><div class="font-medium text-white" data-v-d447831a${_scopeId}>$${ssrInterpolate(range)}</div><div class="text-sm text-gray-400" data-v-d447831a${_scopeId}>${ssrInterpolate(formatNumber(data.count))} transactions</div></div><div class="text-right" data-v-d447831a${_scopeId}><div class="${ssrRenderClass([getFraudRateColor(data.mean * 100), "font-medium"])}" data-v-d447831a${_scopeId}>${ssrInterpolate(formatPercentage(data.mean * 100))}% </div><div class="text-sm text-gray-400" data-v-d447831a${_scopeId}>${ssrInterpolate(data.sum)} fraud cases</div></div></div>`);
              });
              _push2(`<!--]--></div></div></div><div class="card p-6" data-v-d447831a${_scopeId}><h3 class="text-lg font-semibold text-white mb-4" data-v-d447831a${_scopeId}>Gender-Based Analysis</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-d447831a${_scopeId}><!--[-->`);
              ssrRenderList(unref(analysisData).trends.by_gender, (data, gender) => {
                _push2(`<div class="p-4 bg-gray-700/30 rounded-lg text-center" data-v-d447831a${_scopeId}><div class="${ssrRenderClass([gender === "F" ? "text-pink-400" : "text-blue-400", "text-2xl font-bold mb-2"])}" data-v-d447831a${_scopeId}>${ssrInterpolate(gender === "F" ? "Female" : "Male")}</div><div class="grid grid-cols-2 gap-4 text-sm" data-v-d447831a${_scopeId}><div data-v-d447831a${_scopeId}><div class="text-gray-400" data-v-d447831a${_scopeId}>Transactions</div><div class="font-semibold text-white" data-v-d447831a${_scopeId}>${ssrInterpolate(formatNumber(data.count))}</div></div><div data-v-d447831a${_scopeId}><div class="text-gray-400" data-v-d447831a${_scopeId}>Fraud Cases</div><div class="font-semibold text-red-400" data-v-d447831a${_scopeId}>${ssrInterpolate(data.sum)}</div></div><div class="col-span-2" data-v-d447831a${_scopeId}><div class="text-gray-400" data-v-d447831a${_scopeId}>Fraud Rate</div><div class="${ssrRenderClass([getFraudRateColor(data.mean * 100), "font-semibold"])}" data-v-d447831a${_scopeId}>${ssrInterpolate(formatPercentage(data.mean * 100))}% </div></div></div></div>`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "card p-6" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" }, [
                    createVNode("h2", { class: "text-xl font-semibold text-white" }, "Data Analysis & Visualization"),
                    unref(analysisData) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex space-x-4"
                    }, [
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => isRef(timeRange) ? timeRange.value = $event : null,
                        onChange: fetchAnalysisData,
                        class: "input-field"
                      }, [
                        createVNode("option", { value: "7d" }, "Last 7 days"),
                        createVNode("option", { value: "30d" }, "Last 30 days"),
                        createVNode("option", { value: "90d" }, "Last 90 days"),
                        createVNode("option", { value: "1y" }, "Last year")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(timeRange)]
                      ]),
                      createVNode("button", {
                        onClick: refreshData,
                        disabled: unref(loading),
                        class: "btn-primary flex items-center space-x-2"
                      }, [
                        unref(loading) ? (openBlock(), createBlock(unref(ArrowPathIcon), {
                          key: 0,
                          class: "w-4 h-4 animate-spin"
                        })) : createCommentVNode("", true),
                        createVNode("span", null, toDisplayString(unref(loading) ? "Refreshing..." : "Refresh Data"), 1)
                      ], 8, ["disabled"]),
                      createVNode("button", {
                        onClick: exportAnalysis,
                        class: "btn-primary"
                      }, "Export Analysis")
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                !unref(analysisData) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "card p-8"
                }, [
                  createVNode("div", { class: "text-center" }, [
                    createVNode("div", { class: "mb-6" }, [
                      createVNode(unref(DocumentArrowUpIcon), { class: "w-16 h-16 text-blue-400 mx-auto mb-4" }),
                      createVNode("h3", { class: "text-xl font-semibold text-white mb-2" }, "Upload Data File"),
                      createVNode("p", { class: "text-gray-400" }, "Upload a CSV file to begin your fraud detection analysis")
                    ]),
                    createVNode("div", {
                      onDrop: handleFileDrop,
                      onDragover: withModifiers(() => {
                      }, ["prevent"]),
                      onDragenter: [
                        withModifiers(() => {
                        }, ["prevent"]),
                        ($event) => isDragging.value = true
                      ],
                      class: ["border-2 border-dashed border-gray-600 rounded-lg p-8 mb-4 transition-colors", {
                        "border-blue-500 bg-blue-500/5": unref(isDragging),
                        "hover:border-gray-500 hover:bg-gray-700/20": !unref(isDragging)
                      }],
                      onDragleave: ($event) => isDragging.value = false
                    }, [
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode(unref(CloudArrowUpIcon), { class: "w-12 h-12 text-gray-400 mx-auto" }),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-white font-medium" }, "Drop your CSV file here"),
                          createVNode("p", { class: "text-gray-400 text-sm" }, "or click to browse")
                        ]),
                        createVNode("input", {
                          ref: "fileInput",
                          type: "file",
                          accept: ".csv,.xlsx,.xls",
                          onChange: handleFileSelect,
                          class: "hidden"
                        }, null, 544),
                        createVNode("button", {
                          onClick: ($event) => _ctx.$refs.fileInput.click(),
                          class: "btn-primary"
                        }, " Choose File ", 8, ["onClick"])
                      ])
                    ], 42, ["onDragover", "onDragenter", "onDragleave"])
                  ])
                ])) : createCommentVNode("", true),
                unref(uploadStatus).processing ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "card p-6"
                }, [
                  createVNode("div", { class: "flex items-center space-x-4" }, [
                    createVNode(unref(ArrowPathIcon), { class: "w-6 h-6 animate-spin text-blue-400" }),
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("h3", { class: "text-white font-medium" }, "Processing File"),
                      createVNode("p", { class: "text-gray-400 text-sm" }, toDisplayString(unref(uploadStatus).message), 1),
                      createVNode("div", { class: "w-full bg-gray-700 rounded-full h-2 mt-2" }, [
                        createVNode("div", {
                          class: "bg-blue-500 h-2 rounded-full transition-all duration-300",
                          style: { width: unref(uploadStatus).progress + "%" }
                        }, null, 4)
                      ])
                    ]),
                    createVNode("span", { class: "text-blue-400 text-sm" }, toDisplayString(unref(uploadStatus).progress) + "%", 1)
                  ])
                ])) : createCommentVNode("", true),
                unref(uploadStatus).completed && !unref(uploadStatus).error ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "card p-6 border-green-500/20 bg-green-500/5"
                }, [
                  createVNode("div", { class: "flex items-center space-x-3" }, [
                    createVNode(unref(CheckCircleIcon), { class: "w-6 h-6 text-green-400" }),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-green-400 font-semibold" }, "File Uploaded Successfully"),
                      createVNode("p", { class: "text-gray-300 text-sm" }, toDisplayString(unref(uploadStatus).fileName) + " - " + toDisplayString(formatNumber(unref(uploadStatus).recordCount)) + " records processed", 1)
                    ]),
                    createVNode("button", {
                      onClick: resetUpload,
                      class: "btn-secondary text-sm ml-auto"
                    }, " Upload New File ")
                  ])
                ])) : createCommentVNode("", true),
                unref(uploadStatus).error ? (openBlock(), createBlock("div", {
                  key: 3,
                  class: "card p-6 border-red-500/20 bg-red-500/5"
                }, [
                  createVNode("div", { class: "flex items-center space-x-3" }, [
                    createVNode(unref(ExclamationTriangleIcon), { class: "w-6 h-6 text-red-400" }),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-red-400 font-semibold" }, "Upload Error"),
                      createVNode("p", { class: "text-gray-300 text-sm" }, toDisplayString(unref(uploadStatus).error), 1),
                      createVNode("button", {
                        onClick: resetUpload,
                        class: "btn-primary mt-2 text-sm"
                      }, "Try Again")
                    ])
                  ])
                ])) : createCommentVNode("", true),
                unref(loading) && unref(analysisData) ? (openBlock(), createBlock("div", {
                  key: 4,
                  class: "flex items-center justify-center py-12"
                }, [
                  createVNode("div", { class: "text-center" }, [
                    createVNode(unref(ArrowPathIcon), { class: "w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" }),
                    createVNode("p", { class: "text-gray-400" }, "Loading analysis data...")
                  ])
                ])) : unref(error) ? (openBlock(), createBlock("div", {
                  key: 5,
                  class: "card p-6 border-red-500/20 bg-red-500/5"
                }, [
                  createVNode("div", { class: "flex items-center space-x-3" }, [
                    createVNode(unref(ExclamationTriangleIcon), { class: "w-6 h-6 text-red-400" }),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-red-400 font-semibold" }, "Error Loading Data"),
                      createVNode("p", { class: "text-gray-300 text-sm" }, toDisplayString(unref(error)), 1),
                      createVNode("button", {
                        onClick: fetchAnalysisData,
                        class: "btn-primary mt-2 text-sm"
                      }, "Retry")
                    ])
                  ])
                ])) : unref(analysisData) ? (openBlock(), createBlock("div", { key: 6 }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, [
                    createVNode("div", { class: "card p-6" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-400" }, "Fraud Rate"),
                          createVNode("p", { class: "text-2xl font-bold text-red-400" }, toDisplayString(formatPercentage(unref(analysisData).fraud_statistics.fraud_percentage)) + "%", 1),
                          createVNode("p", { class: "text-xs text-green-400" }, toDisplayString(unref(analysisData).fraud_statistics.fraud_cases) + " cases detected", 1)
                        ]),
                        createVNode("div", { class: "w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center" }, [
                          createVNode(unref(ExclamationTriangleIcon), { class: "w-6 h-6 text-red-400" })
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "card p-6" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-400" }, "Total Transactions"),
                          createVNode("p", { class: "text-2xl font-bold text-blue-400" }, toDisplayString(formatNumber(unref(analysisData).fraud_statistics.total_transactions)), 1),
                          createVNode("p", { class: "text-xs text-gray-400" }, toDisplayString(formatNumber(unref(analysisData).fraud_statistics.legitimate_transactions)) + " legitimate", 1)
                        ]),
                        createVNode("div", { class: "w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center" }, [
                          createVNode(unref(ChartBarIcon), { class: "w-6 h-6 text-blue-400" })
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "card p-6" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-400" }, "High Risk Amount Range"),
                          createVNode("p", { class: "text-2xl font-bold text-yellow-400" }, "$501-1000"),
                          createVNode("p", { class: "text-xs text-red-400" }, toDisplayString(formatPercentage(getAmountRangeFraudRate("501-1000"))) + "% fraud rate", 1)
                        ]),
                        createVNode("div", { class: "w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center" }, [
                          createVNode(unref(CurrencyDollarIcon), { class: "w-6 h-6 text-yellow-400" })
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "card p-6" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-400" }, "Detection Accuracy"),
                          createVNode("p", { class: "text-2xl font-bold text-green-400" }, toDisplayString(calculateAccuracy()) + "%", 1),
                          createVNode("p", { class: "text-xs text-green-400" }, "System performance")
                        ]),
                        createVNode("div", { class: "w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center" }, [
                          createVNode(unref(ShieldCheckIcon), { class: "w-6 h-6 text-green-400" })
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                    createVNode("div", { class: "card p-6" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "Fraud by Category"),
                      createVNode("div", { class: "h-80" }, [
                        createVNode(_component_DashboardChart, {
                          data: unref(categoryChartData),
                          type: "bar"
                        }, null, 8, ["data"])
                      ])
                    ]),
                    createVNode("div", { class: "card p-6" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "Fraud Rate by Amount Range"),
                      createVNode("div", { class: "h-80" }, [
                        createVNode(_component_DashboardChart, {
                          data: unref(amountChartData),
                          type: "line"
                        }, null, 8, ["data"])
                      ])
                    ]),
                    createVNode("div", { class: "card p-6" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "Fraud Distribution by Gender"),
                      createVNode("div", { class: "h-80" }, [
                        createVNode(_component_DashboardChart, {
                          data: unref(genderChartData),
                          type: "doughnut"
                        }, null, 8, ["data"])
                      ])
                    ]),
                    createVNode("div", { class: "card p-6" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "Highest Risk Categories"),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(topRiskCategories), (category) => {
                          return openBlock(), createBlock("div", {
                            key: category.name,
                            class: "flex items-center"
                          }, [
                            createVNode("div", { class: "w-32 text-sm text-gray-300" }, toDisplayString(formatCategoryName(category.name)), 1),
                            createVNode("div", { class: "flex-1 mx-4" }, [
                              createVNode("div", { class: "w-full bg-gray-700 rounded-full h-3" }, [
                                createVNode("div", {
                                  class: "bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500",
                                  style: { width: category.fraud_rate / unref(topRiskCategories)[0].fraud_rate * 100 + "%" }
                                }, null, 4)
                              ])
                            ]),
                            createVNode("div", { class: "w-16 text-sm text-red-400 text-right" }, toDisplayString(formatPercentage(category.fraud_rate * 100)) + "%", 1)
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                    createVNode("div", { class: "card p-6" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "AI Insights"),
                      createVNode("div", { class: "space-y-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(analysisData).insights, (insight, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "flex items-start space-x-3 p-3 bg-gray-700/30 rounded-lg"
                          }, [
                            createVNode("div", { class: "w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" }, [
                              createVNode("span", { class: "text-blue-400 text-xs font-bold" }, toDisplayString(index + 1), 1)
                            ]),
                            createVNode("p", { class: "text-gray-300 text-sm" }, toDisplayString(insight), 1)
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { class: "card p-6" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "Amount Range Analysis"),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(analysisData).trends.by_amount, (data, range) => {
                          return openBlock(), createBlock("div", {
                            key: range,
                            class: "flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                          }, [
                            createVNode("div", null, [
                              createVNode("div", { class: "font-medium text-white" }, "$" + toDisplayString(range), 1),
                              createVNode("div", { class: "text-sm text-gray-400" }, toDisplayString(formatNumber(data.count)) + " transactions", 1)
                            ]),
                            createVNode("div", { class: "text-right" }, [
                              createVNode("div", {
                                class: ["font-medium", getFraudRateColor(data.mean * 100)]
                              }, toDisplayString(formatPercentage(data.mean * 100)) + "% ", 3),
                              createVNode("div", { class: "text-sm text-gray-400" }, toDisplayString(data.sum) + " fraud cases", 1)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "card p-6" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "Gender-Based Analysis"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(analysisData).trends.by_gender, (data, gender) => {
                        return openBlock(), createBlock("div", {
                          key: gender,
                          class: "p-4 bg-gray-700/30 rounded-lg text-center"
                        }, [
                          createVNode("div", {
                            class: ["text-2xl font-bold mb-2", gender === "F" ? "text-pink-400" : "text-blue-400"]
                          }, toDisplayString(gender === "F" ? "Female" : "Male"), 3),
                          createVNode("div", { class: "grid grid-cols-2 gap-4 text-sm" }, [
                            createVNode("div", null, [
                              createVNode("div", { class: "text-gray-400" }, "Transactions"),
                              createVNode("div", { class: "font-semibold text-white" }, toDisplayString(formatNumber(data.count)), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("div", { class: "text-gray-400" }, "Fraud Cases"),
                              createVNode("div", { class: "font-semibold text-red-400" }, toDisplayString(data.sum), 1)
                            ]),
                            createVNode("div", { class: "col-span-2" }, [
                              createVNode("div", { class: "text-gray-400" }, "Fraud Rate"),
                              createVNode("div", {
                                class: ["font-semibold", getFraudRateColor(data.mean * 100)]
                              }, toDisplayString(formatPercentage(data.mean * 100)) + "% ", 3)
                            ])
                          ])
                        ]);
                      }), 128))
                    ])
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
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/analysis.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const analysis = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d447831a"]]);

export { analysis as default };
//# sourceMappingURL=analysis-CFNBQB_5.mjs.map
