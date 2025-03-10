import { h } from 'vue'
import { Badge } from '@/components/ui/badge'
import DataTableColumnHeader from './data-table-column-header.vue'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { 
  MoreVertical, 
  Eye, 
  Edit, 
  Key, 
  PackagePlus, 
  Trash,
  Package 
} from 'lucide-vue-next'
import type { ColumnDef } from '@tanstack/vue-table'

export interface Product {
  id: number;
  name: string;
  slug: string;
  version: string;
  packages: number;
  licenses: number;
  isActive: boolean;
  created: string;
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => h(DataTableColumnHeader, { column }),
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-2' }, [
        h(Package, { class: 'h-4 w-4 text-primary' }),
        h('div', [
          h('div', { class: 'font-medium' }, row.getValue('name')),
          h('div', { class: 'text-xs text-muted-foreground' }, `product-${row.original.id}`)
        ])
      ])
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'version',
    header: ({ column }) => h(DataTableColumnHeader, { column }),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'packages',
    header: ({ column }) => h(DataTableColumnHeader, { column }),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'licenses',
    header: ({ column }) => h(DataTableColumnHeader, { column }),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => h(DataTableColumnHeader, { column }),
    cell: ({ row }) => {
      const isActive = row.getValue('isActive')
      return h(Badge, { 
        variant: isActive ? 'default' : 'secondary' 
      }, () => isActive ? 'Active' : 'Inactive')
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'created',
    header: ({ column }) => h(DataTableColumnHeader, { column }),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    header: ({ column }) => h(DataTableColumnHeader, { column }),
    cell: ({ row }) => {
      const product = row.original
      
      return h(DropdownMenu, {}, {
        default: () => [
          h(DropdownMenuTrigger, { asChild: true }, {
            default: () => h(Button, { variant: 'ghost', size: 'icon' }, {
              default: () => h(MoreVertical, { class: 'h-4 w-4' })
            })
          }),
          h(DropdownMenuContent, { align: 'end' }, {
            default: () => [
              h(DropdownMenuLabel, {}, () => 'Actions'),
              h(DropdownMenuItem, { onClick: () => window.location.href = `/products/${product.id}` }, {
                default: () => [
                  h(Eye, { class: 'h-4 w-4 mr-2' }),
                  h('span', {}, 'View Details')
                ]
              }),
              h(DropdownMenuItem, {}, {
                default: () => [
                  h(Edit, { class: 'h-4 w-4 mr-2' }),
                  h('span', {}, 'Edit')
                ]
              }),
              h(DropdownMenuItem, {}, {
                default: () => [
                  h(Key, { class: 'h-4 w-4 mr-2' }),
                  h('span', {}, 'Licenses')
                ]
              }),
              h(DropdownMenuItem, {}, {
                default: () => [
                  h(PackagePlus, { class: 'h-4 w-4 mr-2' }),
                  h('span', {}, 'Add package')
                ]
              }),
              h(DropdownMenuSeparator),
              h(DropdownMenuItem, { class: 'text-destructive' }, {
                default: () => [
                  h(Trash, { class: 'h-4 w-4 mr-2' }),
                  h('span', {}, 'Delete')
                ]
              })
            ]
          })
        ]
      })
    }
  }
] 