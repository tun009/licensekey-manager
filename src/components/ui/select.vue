import { defineComponent, h, computed, ref } from 'vue'
import { Listbox } from '@headlessui/vue'
import { Check, ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const Select = defineComponent({
  name: 'Select',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: undefined
    },
    defaultValue: {
      type: [String, Number, Object],
      default: undefined
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots, attrs }) {
    const localValue = ref(props.defaultValue)
    
    const value = computed({
      get() {
        return props.modelValue !== undefined ? props.modelValue : localValue.value
      },
      set(value) {
        if (props.modelValue === undefined) {
          localValue.value = value
        }
        emit('update:modelValue', value)
      }
    })
    
    return () => 
      h(Listbox, { 
        modelValue: value.value,
        'onUpdate:modelValue': (val) => (value.value = val),
        ...attrs
      }, slots)
  }
})

const SelectTrigger = defineComponent({
  name: 'SelectTrigger',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => 
      h(Listbox.Button, {
        class: cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          props.class
        )
      }, {
        default: () => [
          slots.default?.(),
          h(ChevronDown, { class: 'h-4 w-4 opacity-50' })
        ]
      })
  }
})

const SelectContent = defineComponent({
  name: 'SelectContent',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => 
      h(Listbox.Options, {
        class: cn(
          'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80',
          props.class
        )
      }, slots)
  }
})

const SelectItem = defineComponent({
  name: 'SelectItem',
  props: {
    value: {
      type: [String, Number, Object],
      required: true
    },
    class: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    return () => 
      h(Listbox.Option, {
        value: props.value,
        disabled: props.disabled,
        class: ({ active }) => cn(
          'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          active ? 'bg-accent text-accent-foreground' : '',
          props.class
        )
      }, {
        default: ({ selected }) => [
          h('span', { class: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center' }, 
            selected ? h(Check, { class: 'h-4 w-4' }) : null
          ),
          slots.default?.()
        ]
      })
  }
})

const SelectValue = defineComponent({
  name: 'SelectValue',
  props: {
    placeholder: {
      type: String,
      default: 'Select an option'
    }
  },
  setup(props, { slots }) {
    return () => 
      h('span', { class: 'block truncate' }, slots.default?.() || props.placeholder)
  }
})

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } 