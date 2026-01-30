<script setup lang="ts">
import { ref, watch } from 'vue'
import VueTelNumInput, { type TelInputInitModel } from 'vue-tel-num-input'
import Label from './Label.vue'

const props = defineProps<{
  modelValue?: TelInputInitModel | string
  label?: string
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: TelInputInitModel | string): void
}>()

// Custom country label mapping
const countryLabelMap: Record<string, string> = {
  NG: 'NGN',
  US: 'USD',
  GB: 'GBP',
}

// Local internal model to avoid readonly issues
// const internalModel = ref<TelInputInitModel | string>(props.modelValue ?? { search: '' })
const internalModel = ref<TelInputInitModel | null>(null)
watch(internalModel, (val) => {
  if (val.value) {
    emit('update:modelValue', val.value)
  } else {
    emit('update:modelValue', '')
  }
})

// Keep parent changes in sync
watch(
  () => props.modelValue,
  (val) => {
    if (val && internalModel.value?.value !== val) {
      internalModel.value = {
        number: val,
        international: val,
        e164: val,
        national: val,
      } as TelInputInitModel
    }
  },
  { immediate: true },
)
// Sync internal model with parent v-model
// watch(
//   () => internalModel.value,
//   (val) => {
//     emit('update:modelValue', val)
//   },
//   { deep: true },
// )

// Sync parent changes into internal model
// watch(
//   () => props.modelValue,
//   (val) => {
//     if (val !== internalModel.value) {
//       internalModel.value = val ?? { search: '' }
//     }
//   },
//   { deep: true, immediate: true },
// )

interface CountrySlotProps {
  country?: {
    name: string
    iso2: string
    dialCode: string
    flag: string
    code: string
    priority?: number
  }
}

interface InputSlotProps {
  model: {
    value: string
    name: string
    code: string
  }
}

// local reactive model used for the phone input's v-model and search field
// allow the ref to be either the object shape or a plain string (some v-model emissions may be a string)
// const modelValue = ref<{ search: string; value?: string } | string>({ search: '' })
</script>

<template>
  <div class="w-full">
    <div class="flex space-x-1 items-center" v-if="props.label">
      <Label :name="props.label" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        fill="currentColor"
        class="text-red-500 h-3 w-3"
      >
        <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
        <path
          d="M320 64C337.7 64 352 78.3 352 96L352 264.6L496 181.5C511.3 172.7 530.9 177.9 539.7 193.2C548.5 208.5 543.3 228.1 528 236.9L384 320L528 403.1C543.3 411.9 548.6 431.5 539.7 446.8C530.8 462.1 511.3 467.4 496 458.5L352 375.4L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 375.4L144 458.5C128.7 467.3 109.1 462.1 100.3 446.8C91.5 431.5 96.7 412 112 403.1L256 320L112 236.9C96.7 228 91.5 208.5 100.3 193.1C109.1 177.7 128.7 172.6 144 181.4L288 264.6L288 96C288 78.3 302.3 64 320 64z"
        />
      </svg>
    </div>
    <!-- Phone input -->
    <VueTelNumInput
      v-model="internalModel"
      class="custom-phone-input mt-2"
      default-country-code="NG"
      :auto-default-country="false"
      :preferred-countries="['NG']"
      :show-code="false"
      :show-dial-code="false"
    >
      <!-- Replace country name -->
      <template #prefix:countryName="slotProps: CountrySlotProps">
        <span class="font-semibold text-sm text-[#262626]">
          {{
            slotProps?.country?.iso2
              ? (countryLabelMap[slotProps.country.iso2] ?? slotProps.country.iso2)
              : 'NGN'
          }}
        </span>
      </template>

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
  --tel-input-prefix-gap: 4px;
  --tel-input-border-radius: 0px;
  --tel-input-border-color: #d1d5db;
  --tel-input-bg: #f5f5f5 !important;
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
  background-color: #f5f5f5 !important;
  width: 100% !important;
}

/* Country selector */
/* .custom-phone-input :deep(.vue-tel-input__country) {
  background-color: red !important;
} */
/* Dropdown items */
.custom-phone-input :deep(.vue-tel-input__dropdown-item),
.custom-phone-input :deep(.vue-tel-input__dropdown-list) {
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
