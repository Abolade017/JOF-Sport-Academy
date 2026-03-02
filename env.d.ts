
// Shim for Vue script-setup macros so TypeScript and CLI checks recognize `defineProps`/`defineEmits`.
// declare module 'vue/macros-global' { }

// Lightweight macro helpers to avoid missing symbol errors during type-checking
// declare function defineProps<T>(): T
// declare function defineEmits<T>(): T
// declare function defineExpose<T = any>(exposed?: T): void
// declare function withDefaults<T, D>(props: T, defaults: D): T & D
/// <reference types="vite/client" />

// declare module '*.vue' {
//   import { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }

// export { }
/// <reference types="vite/client" />

// Vue SFC shim
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'vue/macros-global' { }

// Macros for <script setup>
declare function defineProps<T = Record<string, any>>(): T
declare function defineEmits<T = Record<string, any>>(): T
declare function defineExpose<T = any>(exposed?: T): void
declare function withDefaults<T, D>(props: T, defaults: D): T & D

export { }
