<script setup lang="ts">
import { computed, ref } from 'vue'
import FormSelect from './FormSelect.vue'
import Label from './Label.vue'
import RegistrationForm from './RegistrationForm.vue'
import Input from './Input.vue'
import PhoneInput from './PhoneInput.vue'
import { watch } from 'vue'
import {
  useRegistrationStore,
  ProfilePreferredPositionsEnum,
  ProfileStrongFootEnum,
  ProfileMedicalConditionsEnum,
} from '../../stores/RegistrationStore'
const store = useRegistrationStore()
const selectedPosition = computed({
  get: () => store.footballProfile.profile_preferred_positions,
  set: (v: ProfilePreferredPositionsEnum) =>
    (store.footballProfile.profile_preferred_positions = v),
})
const selectedFoot = computed({
  get: () => store.footballProfile.profile_strong_foot,
  set: (v: ProfileStrongFootEnum) => (store.footballProfile.profile_strong_foot = v),
})
const previousTeam = computed({
  get: () => store.footballProfile.profile_previous_team,
  set: (v) => (store.footballProfile.profile_previous_team = v),
})
const experienceYear = computed({
  get: () => store.footballProfile.profile_years_of_experience,
  set: (v) => (store.footballProfile.profile_years_of_experience = v),
})
const emergencyContactName = computed({
  get: () => store.footballProfile.profile_emergency_contact_name,
  set: (v) => (store.footballProfile.profile_emergency_contact_name = v),
})
const selectedMedicalCondition = computed({
  get: () => store.footballProfile.profile_medical_conditions,
  set: (v: ProfileMedicalConditionsEnum) => (store.footballProfile.profile_medical_conditions = v),
})
const emergencyContactNumber = computed({
  get: () => store.footballProfile.profile_emergency_contact_phone_number,
  set: (v) => (store.footballProfile.profile_emergency_contact_phone_number = v),
})
const medicalDescription = computed({
  get: () => store.footballProfile.profile_descriptions,
  set: (v) => (store.footballProfile.profile_descriptions = v),
})
const hasSubmitted = ref(false)

const positions: { optionText: string; value: ProfilePreferredPositionsEnum }[] = [
  { optionText: 'Midfielder', value: 'Midfielder' },
  { optionText: 'Defender', value: 'Defender' },
  { optionText: 'Forward', value: 'Forward' },
  { optionText: 'Goalkeeper', value: 'Goalkeeper' },
]
const foot: { optionText: string; value: ProfileStrongFootEnum }[] = [
  { optionText: 'Left', value: 'Left' },
  { optionText: 'Right', value: 'Right' },
  { optionText: 'Both', value: 'Both' },
]
const medicalConditions: { optionText: string; value: ProfileMedicalConditionsEnum }[] = [
  { optionText: 'Yes', value: 'Yes' },
  { optionText: 'No', value: 'No' },
]
const emit = defineEmits<{
  (e: 'step-valid', value: boolean): void
}>()
const isValid = computed(() => {
  const medicalDescriptionValid =
    selectedMedicalCondition.value === 'Yes' ? medicalDescription.value.trim() !== '' : true
  return (
    selectedPosition.value !== '' &&
    selectedFoot.value !== '' &&
    previousTeam.value !== '' &&
    selectedMedicalCondition.value !== '' &&
    emergencyContactNumber.value !== '' &&
    medicalDescriptionValid
  )
})
watch(isValid, (val) => emit('step-valid', val), { immediate: true })
watch(selectedMedicalCondition, (val) => {
  if (val === 'No') {
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
          <div class="flex space-x-1 items-center">
            <Label name="Preferred Position(s)" />
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
          <div class="flex space-x-1 items-center">
            <Label name="Strong Foot" />
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
          <div class="flex space-x-1 items-center">
            <Label name="previous team" />
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
          <div class="flex space-x-1 items-center">
            <Label name="any medical condition" />
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
            v-if="hasSubmitted && selectedMedicalCondition === 'Yes' && !medicalDescription"
            class="text-red-500 text-sm mt-1"
          >
            Medical description is required
          </p>
        </div>
        <div>
          <div class="flex space-x-1 items-center">
            <Label name="Emergency Contact Name" />
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
          <Input v-model="emergencyContactName" type="text" class="mt-2" />
          <p
            v-if="hasSubmitted && selectedMedicalCondition === 'Yes' && !emergencyContactName"
            class="text-red-500 text-sm mt-1"
          >
            Emergency contact Name is required
          </p>
        </div>
        <div>
          <PhoneInput
            class=""
            v-model="emergencyContactNumber"
            label="Emergency Contact phone number"
            :error="
              hasSubmitted && !emergencyContactNumber ? 'Emergency Contact  Number is required' : ''
            "
          />
        </div>
      </div>
    </RegistrationForm>
  </div>
</template>
