/// <reference types="vite/client" />

// Shim for Vue script-setup macros so TypeScript and CLI checks recognize `defineProps`/`defineEmits`.
declare module 'vue/macros-global' { }

// Lightweight macro helpers to avoid missing symbol errors during type-checking
declare function defineProps<T>(): T
declare function defineEmits<T>(): T
declare function defineExpose<T = any>(exposed?: T): void
declare function withDefaults<T, D>(props: T, defaults: D): T & D
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }
export { }
