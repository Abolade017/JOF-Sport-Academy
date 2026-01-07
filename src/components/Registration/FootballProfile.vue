<script setup lang="ts">
import { computed, ref } from 'vue'
import FormSelect from './FormSelect.vue'
import Label from './Label.vue'
import RegistrationForm from './RegistrationForm.vue'
import Input from './Input.vue'
import 'vue-tel-num-input/style.css'
import 'vue-tel-num-input/flags.css'
import VueTelNumInput, { type TelInputInitModel } from 'vue-tel-num-input'
import PhoneInput from './PhoneInput.vue'
import { watch } from 'vue'
const selectedPosition = ref('')
const selectedFoot = ref('')
const previousTeam = ref('')
const experienceYear = ref('')
const emergencyContactName = ref('')
const selectedMedicalCondition = ref('')
// const selectedCountryPhone = ref('')
const medicalDescription = ref('')
const hasSubmitted = ref(false)

const positions = [
  {
    optionText: 'mid field',
    value: 'mid field',
  },
  { optionText: 'defense', value: 'defense' },
]
const foot = [
  { optionText: 'left', value: 'left' },
  { optionText: 'right', value: 'right' },
]
const medicalConditions = [
  {
    optionText: 'yes',
    value: 'yes',
  },
  { optionText: 'no', value: 'no' },
]
const emit = defineEmits<{
  (e: 'step-valid', value: boolean): void
}>()
const isValid = computed(() => {
  const medicalDescriptionValid =
    selectedMedicalCondition.value === 'yes' ? medicalDescription.value.trim() !== '' : true

  const emergencyContactValid =
    selectedMedicalCondition.value === 'yes' ? emergencyContactName.value.trim() !== '' : true

  // const phoneValid = selectedCountryPhone.value.trim() !== ''

  return (
    selectedPosition.value.trim() !== '' &&
    selectedFoot.value.trim() !== '' &&
    previousTeam.value.trim() !== '' &&
    selectedMedicalCondition.value.trim() !== '' &&
    // phoneValid &&
    medicalDescriptionValid &&
    emergencyContactValid
  )
})
watch(isValid, (val) => emit('step-valid', val), { immediate: true })
watch(selectedMedicalCondition, (val) => {
  if (val === 'no') {
    medicalDescription.value = ''
  }
})

const validate = () => {
  hasSubmitted.value = true
  emit('step-valid', isValid.value)
  return isValid.value
}

defineExpose({ validate })
</script>

<template>
  <div class="mt-8 md:mt-16 font-zalando">
    <RegistrationForm title=" football Profile">
      <div class="flex flex-col gap-5 md:my-6 my-4">
        <div>
          <Label name="Preferred Position(s)" />
          <FormSelect
            v-model="selectedPosition"
            :options="positions"
            class="mt-2"
            defaultOption="Select Position"
          />
          <p v-if="hasSubmitted && !selectedPosition" class="text-red-500 text-sm mt-1">
            Position is required
          </p>
        </div>
        <div>
          <Label name="Strong Foot" />
          <FormSelect
            v-model="selectedFoot"
            :options="foot"
            class="mt-2"
            defaultOption="Select Strong Foot"
          />
          <p v-if="hasSubmitted && !selectedFoot" class="text-red-500 text-sm mt-1">
            Strong foot is required
          </p>
        </div>
        <div>
          <Label name="previous team" />
          <Input v-model="previousTeam" type="text" class="mt-2" />
          <p v-if="hasSubmitted && !previousTeam" class="text-red-500 text-sm mt-1">
            Previous Team is required
          </p>
        </div>
        <div>
          <Label name="Years of Experience (optional)" />
          <Input v-model="experienceYear" type="text" class="mt-2" />
        </div>
        <div>
          <Label name="any medical condition" />
          <FormSelect
            v-model="selectedMedicalCondition"
            :options="medicalConditions"
            class="mt-2"
            defaultOption="Select Medical Condition"
          />
          <p v-if="hasSubmitted && !selectedMedicalCondition" class="text-red-500 text-sm mt-1">
            Medical condition is required
          </p>
        </div>
        <div>
          <Label name="If yes, please description" />
          <textarea
            class="border border-[#BFBFBF] focus:outline-none pl-3 w-full h-[141px] resize-none"
            v-model="medicalDescription"
          />
          <p
            v-if="hasSubmitted && selectedMedicalCondition === 'yes' && !medicalDescription"
            class="text-red-500 text-sm mt-1"
          >
            Medical description is required
          </p>
        </div>
        <div>
          <Label name="Emergency Contact Name" />
          <Input v-model="emergencyContactName" type="text" class="mt-2" />
          <p
            v-if="hasSubmitted && selectedMedicalCondition === 'yes' && !emergencyContactName"
            class="text-red-500 text-sm mt-1"
          >
            Emergency contact Name is required
          </p>
        </div>
        <div>
          <!-- <Label name="Emergency Contact phone number" /> -->
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

          </VueTelNumInput> -->
          <!-- <PhoneInput /> -->
        </div>
      </div>
    </RegistrationForm>
  </div>
</template>
