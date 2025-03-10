import { defineComponent, h } from 'vue'
import { cn } from '@/lib/utils'

const Avatar = defineComponent({
  name: 'Avatar',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', props.class)
    }, slots.default?.())
  }
})

const AvatarImage = defineComponent({
  name: 'AvatarImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return () => h('img', {
      src: props.src,
      alt: props.alt,
      class: 'aspect-square h-full w-full object-cover'
    })
  }
})

const AvatarFallback = defineComponent({
  name: 'AvatarFallback',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground',
        props.class
      )
    }, slots.default?.())
  }
})

export { Avatar, AvatarImage, AvatarFallback } 