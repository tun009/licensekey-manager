<template>
  <div class="flex items-center space-x-2">
    <span>{{ title || column.id }}</span>
    <ArrowUpDown v-if="column.getCanSort()" class="h-4 w-4" />
  </div>
</template>

<script setup lang="ts">
import { ArrowUpDown } from 'lucide-vue-next'

const props = defineProps<{
  column: any
  title?: string
}>()
</script> 