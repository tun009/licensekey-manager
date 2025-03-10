<template>
  <div>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
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
              No licenses found.
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
import type { License } from './columns'

import DataTablePagination from './data-table-pagination.vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const props = defineProps<{
  columns: ColumnDef<License, any>[]
  data: License[]
}>()

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