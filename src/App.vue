<script setup lang="ts"></script>

<template>
  <p>home</p>

  <div>
    <nav class="flex gap-4 p-4 bg-gray-200">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.example {
  color: red;
}
</style>
