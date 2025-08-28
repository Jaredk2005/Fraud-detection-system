<template>
  <div ref="chartContainer" class="w-full h-full">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

interface Props {
  data: any
  type: 'line' | 'bar' | 'doughnut' | 'pie'
}

const props = defineProps<Props>()
const canvas = ref<HTMLCanvasElement>()
const chartContainer = ref<HTMLElement>()
let chart: Chart | null = null

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#D1D5DB'
      }
    }
  },
  scales: props.type === 'doughnut' || props.type === 'pie' ? {} : {
    x: {
      ticks: {
        color: '#9CA3AF'
      },
      grid: {
        color: '#374151'
      }
    },
    y: {
      ticks: {
        color: '#9CA3AF'
      },
      grid: {
        color: '#374151'
      }
    }
  }
}

onMounted(() => {
  if (canvas.value) {
    chart = new Chart(canvas.value, {
      type: props.type,
      data: props.data,
      options: chartOptions
    })
  }
})

onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})

watch(() => props.data, (newData) => {
  if (chart) {
    chart.data = newData
    chart.update()
  }
}, { deep: true })
</script>