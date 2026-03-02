<script setup lang="ts">
// import { ref, watch } from 'vue'
// import VueTelNumInput, { type TelInputInitModel } from 'vue-tel-num-input'
// import Label from './Label.vue'
// const props = defineProps<{
//   modelValue?: TelInputInitModel | string
//   label?: string
//   error?: string
// }>()

// const emit = defineEmits<{
//   (e: 'update:modelValue', value: TelInputInitModel | string): void
// }>()

// const countryLabelMap: Record<string, string> = {
//   NG: 'NGN',
//   US: 'USD',
//   GB: 'GBP',
// }

// const internalModel = ref<TelInputInitModel | null>(null)
// watch(internalModel, (val) => {
//   if (val?.value) {
//     emit('update:modelValue', val?.value)
//   } else {
//     emit('update:modelValue', '')
//   }
// })

// watch(
//   () => props.modelValue,
//   (val) => {
//     if (val && internalModel.value?.value !== val) {
//       internalModel.value = {
//         number: val,
//         international: val,
//         e164: val,
//         national: val,
//       } as TelInputInitModel
//     }
//   },
//   { immediate: true },
// )
// interface CountrySlotProps {
//   country?: {
//     name: string
//     iso2: string
//     dialCode: string
//     flag: string
//     code: string
//     priority?: number
//   }
// }

// interface InputSlotProps {
//   model: {
//     value: string
//     name: string
//     code: string
//   }
// }
</script>

<template>
  <div></div>
  <!-- <div class="w-full">
    <div class="flex space-x-1 items-center" v-if="props.label">
      <Label :name="props.label" />
      <slot></slot>
    </div>
    <VueTelNumInput
      v-model="internalModel"
      class="custom-phone-input mt-2"
      default-country-code="NG"
      :auto-default-country="false"
      :preferred-countries="['NG']"
      :show-code="false"
      :show-dial-code="false"
    >
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

    <p v-if="error" class="text-red-500 text-xs mt-1">
      {{ error }}
    </p>
  </div> -->
</template>

<style scoped>
/* .custom-phone-input {
  position: relative;
  z-index: 50;
  --tel-input-prefix-gap: 4px;
  --tel-input-border-radius: 0px;
  --tel-input-border-color: #d1d5db;
  --tel-input-bg: #f5f5f5 !important;
  --tel-input-text-color: #111827;
}

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

.custom-phone-input :deep(.vue-tel-input__dropdown-item),
.custom-phone-input :deep(.vue-tel-input__dropdown-list) {
  background-color: #ffffff !important;
}
.custom-phone-input :deep(*) {
  border-radius: 0 !important;
}
.custom-phone-input :deep(*) {
  background-clip: padding-box;
} */
</style>
