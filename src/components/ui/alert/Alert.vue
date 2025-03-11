<template>
  <div
    :class="[
      'relative w-full rounded-lg border p-4',
      variant === 'default' && 'bg-background text-foreground',
      variant === 'destructive' && 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      variant === 'success' && 'border-green-500/50 text-green-700 dark:border-green-500 dark:text-green-400 [&>svg]:text-green-500'
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value: string) => ['default', 'destructive', 'success'].includes(value)
  }
})
</script> 