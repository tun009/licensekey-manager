<template>
  <div
    :class="[
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    ]"
    :data-orientation="orientation"
  />
</template>

<script setup lang="ts">
interface Props {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  className: ''
})
</script> 