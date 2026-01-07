<script setup lang="ts">
import VueTelNumInput from 'vue-tel-num-input'

const modelValue = defineModel<string | null>()

defineProps<{
  label?: string
  error?: string
}>()
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" class="block text-sm font-medium text-gray-600">
      {{ label }}
    </label>

    <!-- Phone input -->
    <VueTelNumInput
      v-model="modelValue"
      class="custom-phone-input mt-2"
      default-country-code="NG"
      :auto-default-country="false"
      :preferred-countries="['NG']"
      :show-code="false"
      :show-dial-code="false"
    >
      <!-- Replace country name -->
      <!-- <template #prefix:countryName>
        <span class="font-medium text-gray-700">NGN</span>
      </template> -->

      <!-- Hide dial code -->
      <template #prefix:code>
        <span></span>
      </template>
    </VueTelNumInput>

    <!-- Error -->
    <p v-if="error" class="text-red-500 text-xs mt-1">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
/* Match your normal inputs */
.custom-phone-input {
  position: relative;
  z-index: 50;
  --tel-input-border-radius: 0px;
  --tel-input-border-color: #d1d5db;
  --tel-input-bg: transparent;
  --tel-input-text-color: #111827;
}

/* Dropdown fixes */
.custom-phone-input :deep(.vue-tel-input__dropdown) {
  position: absolute;
  z-index: 9999 !important;
  background-color: #ffffff !important;
  opacity: 1 !important;
}
.custom-phone-input :deep(input) {
  background-color: transparent !important;
}

/* Country selector */
.custom-phone-input :deep(.vue-tel-input__country) {
  background-color: transparent !important;
}
/* Dropdown items */
.custom-phone-input :deep(.vue-tel-input__dropdown-item),
.custom-phone-input :deep(.vue-tel-input__dropdown-list) {
  background-color: #ffffff !important;
}

.custom-phone-input :deep(.vue-tel-input__search-box) {
  background-color: #ffffff !important;
}

/* Remove rounded corners everywhere */
.custom-phone-input :deep(*) {
  border-radius: 0 !important;
}
.custom-phone-input :deep(*) {
  background-clip: padding-box;
}
</style>
