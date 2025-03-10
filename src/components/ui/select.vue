import { defineComponent, h } from 'vue'
import * as Select from '@radix-vue/vue-select'
import { Check, ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const SelectRoot = Select.Root
const SelectGroup = Select.Group
const SelectValue = Select.Value
const SelectTrigger = defineComponent({
  name: 'SelectTrigger',
  props: {
    class: {
      type: String,
    },
    asChild: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        Select.Trigger,
        {
          class: cn(
            'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
            props.class
          ),
        },
        {
          default: () => [
            slots.default?.(),
            h(Select.Icon, { asChild: true }, () =>
              h(ChevronDown, { class: 'h-4 w-4 opacity-50' })
            ),
          ],
        }
      )
  },
})

const SelectContent = defineComponent({
  name: 'SelectContent',
  props: {
    class: {
      type: String,
    },
    position: {
      type: String,
      default: 'popper',
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        Select.Portal,
        null,
        () =>
          h(
            Select.Content,
            {
              class: cn(
                'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                props.position === 'popper' &&
                  'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                props.class
              ),
              position: props.position,
            },
            {
              default: () => [
                h(Select.Viewport, {
                  class: cn(
                    'p-1',
                    props.position === 'popper' &&
                      'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
                  ),
                }, slots.default?.()),
              ],
            }
          )
      )
  },
})

const SelectItem = defineComponent({
  name: 'SelectItem',
  props: {
    class: {
      type: String,
    },
    value: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        Select.Item,
        {
          class: cn(
            'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            props.class
          ),
          value: props.value,
        },
        {
          default: () => [
            h(
              'span',
              { class: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center' },
              h(Select.ItemIndicator, null, () =>
                h(Check, { class: 'h-4 w-4' })
              )
            ),
            h(Select.ItemText, null, slots.default?.()),
          ],
        }
      )
  },
})

export {
  SelectRoot as Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} 