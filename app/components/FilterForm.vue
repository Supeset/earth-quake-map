<script lang="ts" setup>
import dayjs from 'dayjs'

const emits = defineEmits(['submit'])
const filterForm = ref({
  minmagnitude: 6,
  starttime: dayjs().subtract(7, 'day').format('YYYY-MM-DD 00:00:00'),
  endtime: dayjs().format('YYYY-MM-DD 00:00:00'),
  orderby: 'time',
})

function handleReset() {
  filterForm.value = {
    minmagnitude: 6,
    starttime: dayjs().subtract(7, 'day').format('YYYY-MM-DD 00:00:00'),
    endtime: dayjs().format('YYYY-MM-DD 00:00:00'),
    orderby: 'time',
  }
  emits('submit', filterForm.value)
}

function handleSubmit() {
  emits('submit', filterForm.value)
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-2">
      <div class="form-item">
        <label class="inline-block w-24 pr-4 text-left">起始时间：</label>
        <input
          v-model="filterForm.starttime"
          type="datetime-local"
          class="border rounded px-2 py-1"
        >
      </div>

      <div class="form-item">
        <label class="inline-block w-24 pr-4 text-left">结束时间：</label>
        <input
          v-model="filterForm.endtime"
          type="datetime-local"
          class="border rounded px-2 py-1"
        >
      </div>

      <div class="form-item">
        <label class="inline-block w-24 pr-4 text-left">最小震级：</label>
        <input
          v-model="filterForm.minmagnitude"
          type="number"
          class="w-32 border rounded px-2 py-1"
        >
      </div>
    </div>

    <div class="mt-4 flex justify-center gap-4">
      <button
        type="submit"
        class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        查询
      </button>
      <button
        type="button"
        class="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        @click="handleReset"
      >
        重置
      </button>
    </div>
  </form>
</template>

<style lang="css" scoped>
.form-item {
  @apply flex flex-col gap-1;
}
</style>
