import { defineComponent, h, computed, ref } from 'vue'
import { Switch as HeadlessSwitch } from '@headlessui/vue'
import { cn } from '@/lib/utils'

const Switch = defineComponent({
  name: 'Switch',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    defaultChecked: {
      type: Boolean,
      default: false
    },
    class: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const localValue = ref(props.defaultChecked)
    
    const checked = computed({
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
      h(HeadlessSwitch, {
        modelValue: checked.value,
        'onUpdate:modelValue': (val) => (checked.value = val),
        class: ({ checked }) => 
          cn(
            'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
            checked ? 'bg-primary' : 'bg-input',
            props.class
          ),
        ...attrs
      }, {
        default: ({ checked }) => 
          h('span', {
            class: cn(
              'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
              checked ? 'translate-x-5' : 'translate-x-0'
            )
          })
      })
  }
})

export { Switch } 