declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Đảm bảo Vue Router được nhận diện đúng
import 'vue-router' 