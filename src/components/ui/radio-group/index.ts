import { defineComponent, h, computed, ref } from 'vue'
import { RadioGroup as RadioGroupPrimitive } from '@headlessui/vue'
import { cn } from '@/lib/utils'

const RadioGroup = defineComponent({
  name: 'RadioGroup',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: undefined
    },
    defaultValue: {
      type: [String, Number],
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
      h(RadioGroupPrimitive, { 
        modelValue: value.value,
        'onUpdate:modelValue': (val) => (value.value = val),
        ...attrs,
        class: cn('grid gap-2', attrs.class)
      }, slots)
  }
})

const RadioGroupItem = defineComponent({
  name: 'RadioGroupItem',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    id: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs }) {
    return () => 
      h('div', { class: 'flex items-center space-x-2' }, [
        h(RadioGroupPrimitive.Option, { 
          value: props.value,
          id: props.id,
          disabled: props.disabled,
          ...attrs
        }, ({ checked, disabled }) => 
          h('div', { 
            class: cn(
              'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              checked ? 'bg-primary' : 'border-gray-300', 
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            )
          }, checked && h('div', { class: 'h-2 w-2 rounded-full bg-white mx-auto my-auto' }))
        )
      ])
  }
})

export { RadioGroup, RadioGroupItem } 