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
  Copy, 
  Edit, 
  Trash,
  KeyIcon,
  Info
} from 'lucide-vue-next'
import type { ColumnDef } from '@tanstack/vue-table'

export interface License {
  id: number;
  licenseCode: string;
  product: string;
  owner: string;
  devices: number;
  limitDevices: number;
  expired: string;
  created: string;
}

export const columns: ColumnDef<License>[] = [
  {
    accessorKey: 'licenseCode',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'License Code' }),
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-2 font-medium' }, [
        h(KeyIcon, { class: 'h-4 w-4 text-primary' }),
        h('span', {}, row.getValue('licenseCode'))
      ])
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'product',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Product' }),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'owner',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Owner' }),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'devices',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Devices' }),
    cell: ({ row }) => {
      const devices = row.getValue('devices') as number
      const limitDevices = row.original.limitDevices
      const isAtLimit = devices >= limitDevices
      
      return h('div', { class: 'flex items-center gap-1' }, [
        h('span', {}, `${devices} / ${limitDevices}`),
        isAtLimit ? h(Info, { class: 'h-4 w-4 text-amber-500' }) : null
      ])
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'expired',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Expires' }),
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
      const license = row.original
      
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
              h(DropdownMenuItem, { onClick: () => navigator.clipboard.writeText(license.licenseCode) }, {
                default: () => [
                  h(Copy, { class: 'h-4 w-4 mr-2' }),
                  h('span', {}, 'Copy License')
                ]
              }),
              h(DropdownMenuItem, {}, {
                default: () => [
                  h(Edit, { class: 'h-4 w-4 mr-2' }),
                  h('span', {}, 'Edit Details')
                ]
              }),
              h(DropdownMenuItem, { class: 'text-destructive' }, {
                default: () => [
                  h(Trash, { class: 'h-4 w-4 mr-2' }),
                  h('span', {}, 'Revoke License')
                ]
              })
            ]
          })
        ]
      })
    }
  }
] 