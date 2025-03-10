import { h } from 'vue'
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
  Edit, 
  Trash,
  Key,
  User
} from 'lucide-vue-next'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { ColumnDef } from '@tanstack/vue-table'

export interface UserData {
  id: number;
  name: string;
  email: string;
  licenses: number;
  orders: number;
  created: string;
}

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'User' }),
    cell: ({ row }) => {
      const user = row.original
      return h('div', { class: 'flex items-center gap-3 font-medium' }, [
        h(Avatar, { class: 'h-8 w-8' }, {
          default: () => [
            h(AvatarImage, { src: `https://avatar.vercel.sh/${user.email}` }),
            h(AvatarFallback, {}, () => user.name.substring(0, 2).toUpperCase())
          ]
        }),
        h('span', {}, user.name)
      ])
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Email' }),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'licenses',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Licenses' }),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'orders',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Orders' }),
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
      const user = row.original
      
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
                  h(Edit, { class: 'h-4 w-4 mr-2' }),
                  h('span', {}, 'Edit Details')
                ]
              }),
              h(DropdownMenuItem, {}, {
                default: () => [
                  h(Key, { class: 'h-4 w-4 mr-2' }),
                  h('span', {}, 'View Licenses')
                ]
              }),
              h(DropdownMenuItem, { class: 'text-destructive' }, {
                default: () => [
                  h(Trash, { class: 'h-4 w-4 mr-2' }),
                  h('span', {}, 'Delete User')
                ]
              })
            ]
          })
        ]
      })
    }
  }
] 