<template>
  <div v-if="column.getCanSort()" class="flex items-center space-x-2">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="sm" class="-ml-3 h-8 data-[state=open]:bg-accent">
          <span>{{ title }}</span>
          <ArrowUpDown v-if="!column.getIsSorted()" class="ml-2 h-4 w-4" />
          <ArrowUp v-else-if="column.getIsSorted() === 'asc'" class="ml-2 h-4 w-4" />
          <ArrowDown v-else class="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <ArrowUp class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <ArrowDown class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <EyeOff class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowDown, ArrowUp, ArrowUpDown, EyeOff } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Column } from '@tanstack/vue-table'
import type { Product } from './columns'

const props = defineProps<{
  column: Column<Product, unknown>
}>()

const title = computed(() => {
  return props.column.id.charAt(0).toUpperCase() + props.column.id.slice(1)
})
</script> 