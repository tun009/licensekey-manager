import { h } from 'vue'
import { Badge } from '@/components/ui/badge'
import DataTableColumnHeader from '@/components/ui/data-table/data-table-column-header.vue'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash,
  ShoppingCart
} from 'lucide-vue-next'
import type { ColumnDef } from '@tanstack/vue-table'

export interface Order {
  id: number;
  orderCode: string;
  user: string;
  productPackage: string;
  price: string;
  status: 'pending' | 'completed' | 'failed';
  created: string;
}

// Helper for status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'default';
    case 'pending': return 'secondary';
    case 'failed': return 'destructive';
    default: return 'secondary';
  }
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'orderCode',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Order Code' }),
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-2 font-medium' }, [
        h(ShoppingCart, { class: 'h-4 w-4 text-primary' }),
        h('span', {}, row.getValue('orderCode'))
      ])
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'user',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'User' }),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'productPackage',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Package' }),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Price' }),
    cell: ({ row }) => {
      return h('span', {}, `$${row.getValue('price')}`)
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return h(Badge, { 
        variant: getStatusColor(status) as any
      }, () => status.charAt(0).toUpperCase() + status.slice(1))
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'created',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Created' }),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Actions' }),
    cell: ({ row }) => {
      const order = row.original
      
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
              h(DropdownMenuItem, {}, {
                default: () => [
                  h(Eye, { class: 'h-4 w-4 mr-2' }),
                  h('span', {}, 'View Details')
                ]
              }),
              h(DropdownMenuItem, {}, {
                default: () => [
                  h(Edit, { class: 'h-4 w-4 mr-2' }),
                  h('span', {}, 'Update Status')
                ]
              }),
              h(DropdownMenuItem, { class: 'text-destructive' }, {
                default: () => [
                  h(Trash, { class: 'h-4 w-4 mr-2' }),
                  h('span', {}, 'Delete Order')
                ]
              })
            ]
          })
        ]
      })
    }
  }
] 