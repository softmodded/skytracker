<script setup>
const props = defineProps({
  skylander: Object,
});

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


const dummyGraphData = {
    labels: ["4/23", "5/27", "6/1", "6/5", "7/15", "8/20"],
    datasets: [
        {
            label: "eBay",
            backgroundColor: "#24c45c",
            data: [1.99, 3.99, 2.99, 2.50, 3.99, 2.99],
        },
        {
            label: "Amazon",
            backgroundColor: "#ff7414",
            data: [2.99, 4.99, 3.99, 3.50, 4.99, 3.99],
        },
        {
            label: "SCL",
            backgroundColor: "#4084f4",
            data: [3.99, 5.99, 4.99, 4.50, 5.99, 4.99],
        }
    ]
}
</script>

<template>
  <div
    class="border-2 border-gray-200 rounded-md w-[620px] h-[335px] text-center mb-5"
  >
    <h1 class="text-left ml-4 mt-2 font-semibold">price history</h1>
    <Line class="mx-auto w-[580px] h-[280px]" :data="dummyGraphData" />
  </div>
</template>
