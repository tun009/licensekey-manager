<template>
  <div class="flex items-center space-x-2">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="updateValue"
      class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id?: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<style scoped>
input[type="checkbox"] {
  @apply h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary;
}
</style> 