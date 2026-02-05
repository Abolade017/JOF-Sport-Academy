<script setup lang="ts">
import { ref, watch } from 'vue'
import Input from './Input.vue'
import Label from './Label.vue'
import FormSelect from './FormSelect.vue'
import 'vue-tel-num-input/style.css'
import 'vue-tel-num-input/flags.css'
import { computed } from 'vue'
import RegistrationForm from './RegistrationForm.vue'
import PhoneInput from './PhoneInput.vue'
import { useRegistrationStore } from '../../stores/RegistrationStore'
const store = useRegistrationStore()
const firstname = computed({
  get: () => store.guardianInfo.guardian_first_name,
  set: (val: string) => (store.guardianInfo.guardian_first_name = val),
})

const lastName = computed({
  get: () => store.guardianInfo.guardian_last_name,
  set: (val: string) => (store.guardianInfo.guardian_last_name = val),
})

const email = computed({
  get: () => store.guardianInfo.guardian_email,
  set: (val: string) => (store.guardianInfo.guardian_email = val),
})

const selectedCountry = computed({
  get: () => store.guardianInfo.guardian_country,
  set: (val: string) => (store.guardianInfo.guardian_country = val),
})

const selectedState = computed({
  get: () => store.guardianInfo.guardian_state,
  set: (val: string) => (store.guardianInfo.guardian_state = val),
})

const homeAddress = computed({
  get: () => store.guardianInfo.guardian_address,
  set: (val: string) => (store.guardianInfo.guardian_address = val),
})

const phone = computed({
  get: () => store.guardianInfo.guardian_phone_number,
  set: (val: string) => (store.guardianInfo.guardian_phone_number = val),
})

const hasSubmitted = ref(false)
const country = [
  {
    optionText: 'nigeria',
    value: 'nigeria',
  },
  { optionText: 'england', value: 'england' },
]
const state = [
  {
    optionText: 'ogun',
    value: 'ogun',
  },
  { optionText: 'osun', value: 'osun' },
]
const emit = defineEmits<{
  (e: 'step-valid', value: boolean): void
}>()
const isValid = computed(() => {
  return (
    firstname.value !== '' &&
    lastName.value !== '' &&
    phone.value !== '' &&
    email.value !== '' &&
    // selectedCountry.value !== '' &&
    selectedState.value !== '' &&
    homeAddress.value !== ''
  )
})
watch(isValid, (val) => emit('step-valid', val), { immediate: true })
const validate = () => {
  hasSubmitted.value = true
  emit('step-valid', isValid.value)
  return isValid.value
}

defineExpose({ validate })
</script>

<template>
  <div class="mt-8 md:mt-16 font-zalando">
    <RegistrationForm title=" PARENT/Guidance information">
      <div class="flex flex-col gap-5 md:my-6 my-4">
        <div>
          <div class="flex space-x-1 items-center">
            <Label name="first name" />
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
          <Input v-model="firstname" type="text" class="mt-2" />
          <p v-if="hasSubmitted && !firstname" class="text-red-500 text-sm mt-1">
            Firstname is required
          </p>
        </div>
        <div>
          <div class="flex space-x-1 items-center">
            <Label name="last name" />
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
          <Input v-model="lastName" type="text" class="mt-2" />
          <p v-if="hasSubmitted && !lastName" class="text-red-500 text-sm mt-1">
            Lastname is required
          </p>
        </div>
        <div>
          <div class="flex space-x-1 items-center">
            <Label name="email" />
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
          <Input v-model="email" type="email" class="mt-2" />
          <p v-if="hasSubmitted && !email" class="text-red-500 text-sm mt-1">Email is required</p>
        </div>
        <div>
          <PhoneInput
            class=""
            v-model="phone"
            label="phone number"
            :error="hasSubmitted && !phone ? 'Phone Number is required' : ''"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              fill="currentColor"
              class="text-red-500 h-3 w-3"
            >
              <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
              <path
                d="M320 64C337.7 64 352 78.3 352 96L352 264.6L496 181.5C511.3 172.7 530.9 177.9 539.7 193.2C548.5 208.5 543.3 228.1 528 236.9L384 320L528 403.1C543.3 411.9 548.6 431.5 539.7 446.8C530.8 462.1 511.3 467.4 496 458.5L352 375.4L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 375.4L144 458.5C128.7 467.3 109.1 462.1 100.3 446.8C91.5 431.5 96.7 412 112 403.1L256 320L112 236.9C96.7 228 91.5 208.5 100.3 193.1C109.1 177.7 128.7 172.6 144 181.4L288 264.6L288 96C288 78.3 302.3 64 320 64z"
              /></svg
          ></PhoneInput>
          <!-- <p v-if="hasSubmitted && !phone" class="text-red-500 text-sm mt-1">
            Phone Number is required
          </p> -->
        </div>
        <div>
          <div class="flex space-x-1 items-center">
            <Label name="country" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              fill="currentColor"
              class="text-red-500 h-3 w-3"
            >
              <path
                d="M320 64C337.7 64 352 78.3 352 96L352 264.6L496 181.5C511.3 172.7 530.9 177.9 539.7 193.2C548.5 208.5 543.3 228.1 528 236.9L384 320L528 403.1C543.3 411.9 548.6 431.5 539.7 446.8C530.8 462.1 511.3 467.4 496 458.5L352 375.4L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 375.4L144 458.5C128.7 467.3 109.1 462.1 100.3 446.8C91.5 431.5 96.7 412 112 403.1L256 320L112 236.9C96.7 228 91.5 208.5 100.3 193.1C109.1 177.7 128.7 172.6 144 181.4L288 264.6L288 96C288 78.3 302.3 64 320 64z"
              />
            </svg>
          </div>
          <FormSelect
            v-model="selectedCountry"
            :options="country"
            class="mt-2"
            defaultOption="Select Your Country"
          />
          <p v-if="hasSubmitted && !selectedCountry" class="text-red-500 text-sm mt-1">
            Country is required
          </p>
        </div>
        <div>
          <div class="flex space-x-1 items-center">
            <Label name="state" />
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
          <FormSelect
            v-model="selectedState"
            :options="state"
            class="mt-2"
            defaultOption="Select Your State"
          />
          <p v-if="hasSubmitted && !selectedState" class="text-red-500 text-sm mt-1">
            State is required
          </p>
        </div>
        <div>
          <div class="flex space-x-1 items-center">
            <Label name="home address" />
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
          <Input v-model="homeAddress" type="text" class="mt-2" />
          <p v-if="hasSubmitted && !homeAddress" class="text-red-500 text-sm mt-1">
            Home address is required
          </p>
        </div>
      </div>
    </RegistrationForm>
  </div>
</template>
<style scoped>
.custom-phone-input {
  --tel-input-bg: transparent !important;
  --tel-input-border-radius: 0px;
}
</style>
