<script setup lang="ts">
import { ref, watch } from 'vue'
import Input from './Input.vue'
import Label from './Label.vue'
import FormSelect from './FormSelect.vue'
import 'vue-tel-num-input/style.css'
import 'vue-tel-num-input/flags.css'
import VueTelNumInput, { type TelInputInitModel } from 'vue-tel-num-input'
import { computed } from 'vue'
import RegistrationForm from './RegistrationForm.vue'
import PhoneInput from './PhoneInput.vue'
import PhoneInpuField from '../common/PhoneInputField.vue'

const phoneModel = ref<TelInputInitModel>({})
const firstname = ref('')
const lastName = ref('')
const email = ref('')
const selectedCountry = ref('')
const selectedState = ref('')
const homeAddress = ref('')
const hasSubmitted = ref(false)
const selectedCountryPhone = ref(null)
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
    firstname.value.trim() !== '' &&
    lastName.value.trim() !== '' &&
    // phoneModel.value.value?.trim() !== '' &&
    email.value.trim() !== '' &&
    selectedCountry.value.trim() !== '' &&
    selectedState.value.trim() !== '' &&
    homeAddress.value.trim() !== ''
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
          <Label name="first name" />
          <Input v-model="firstname" type="text" class="mt-2" />
          <p v-if="hasSubmitted && !firstname" class="text-red-500 text-sm mt-1">
            Firstname is required
          </p>
        </div>
        <div>
          <Label name="last name" />
          <Input v-model="lastName" type="text" class="mt-2" />
          <p v-if="hasSubmitted && !lastName" class="text-red-500 text-sm mt-1">
            Lastname is required
          </p>
        </div>
        <div>
          <Label name="email" />
          <Input v-model="email" type="email" class="mt-2" />
          <p v-if="hasSubmitted && !email" class="text-red-500 text-sm mt-1">Email is required</p>
        </div>
        <!-- <div> -->
        <!-- <Label name="phone number" /> -->
        <!-- <PhoneInput /> -->

        <!-- <PhoneInpuField
            label="Phone Number"
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="What's your phone number?"
            @country-change=""

          /> -->
        <!-- <VueTelNumInput
            v-model="selectedCountryPhone"
            class="custom-phone-input mt-2 w-full border-[#BFBFBF] outline-none"
            default-country-code="NG"
            :auto-default-country="false"
            :show-country-name="false"
            :show-dial-code="false"
          >

            <template #prefix>
              <span class="custom-country-label">NGN</span>
            </template>
            <template #prefix:code>
              <span></span>
            </template>
            <p v-if="hasSubmitted && !selectedCountryPhone" class="text-red-500 text-sm mt-1">
              Phone number is required
            </p>
          </VueTelNumInput> -->
        <!-- </div> -->
        <div>
          <Label name="country" />
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
          <Label name="state" />
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
          <Label name="home address" />
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
