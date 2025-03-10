<template>
  <div>
    <div class="rounded-md border bg-white dark:bg-gray-800">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id" class="bg-gray-50 dark:bg-gray-900">
              <component
                v-if="!header.isPlaceholder"
                :is="header.column.columnDef.header"
                v-bind="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
            class="hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <component
                :is="cell.column.columnDef.cell"
                v-bind="cell.getContext()"
              />
            </TableCell>
          </TableRow>
          <TableRow v-if="table.getRowModel().rows.length === 0">
            <TableCell
              :colspan="table.getAllColumns().length"
              class="h-24 text-center"
            >
              {{ emptyMessage }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <div class="py-4">
      <DataTablePagination :table="table" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/vue-table'
import type { ColumnDef } from '@tanstack/vue-table'

import DataTablePagination from './data-table-pagination.vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Định nghĩa props với kiểu generic để có thể sử dụng với bất kỳ loại dữ liệu nào
const props = defineProps<{
  columns: ColumnDef<any, any>[]
  data: any[]
  emptyMessage?: string
}>()

// Giá trị mặc định cho emptyMessage
const emptyMessage = props.emptyMessage || 'No data found.'

const sorting = ref<any[]>([])
const columnFilters = ref<any[]>([])
const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
})

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: (updaterOrValue) => {
    sorting.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(sorting.value)
      : updaterOrValue
  },
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(columnFilters.value)
      : updaterOrValue
  },
  onPaginationChange: (updaterOrValue) => {
    pagination.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(pagination.value)
      : updaterOrValue
  },
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get pagination() {
      return pagination.value
    }
  },
})
</script> 