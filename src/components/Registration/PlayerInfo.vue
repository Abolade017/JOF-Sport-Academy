<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Input from './Input.vue'
import Label from './Label.vue'
import FormSelect from './FormSelect.vue'
import RegistrationForm from './RegistrationForm.vue'
import { useRegistrationStore } from '../../stores/RegistrationStore'
import type { GenderEnum } from '../../types/ProfileTypes'
const store = useRegistrationStore()
const emit = defineEmits<{
  (e: 'step-valid', value: boolean): void
}>()
const firstName = computed({
  get: () => store.playerInfo.first_name,
  set: (v) => (store.playerInfo.first_name = v),
})
const nationality = computed({
  get: () => store.playerInfo.nationality,
  set: (v) => (store.playerInfo.nationality = v),
})
const lastName = computed({
  get: () => store.playerInfo.last_name,
  set: (v) => (store.playerInfo.last_name = v),
})
const selectedAge = computed({
  get: () => store.playerInfo.age_category,
  set: (v) => (store.playerInfo.age_category = v),
})
const selectedGender = computed({
  get: () => store.playerInfo.gender,
  set: (v: GenderEnum) => (store.playerInfo.gender = v),
})
// const selectedNationality = computed({
//   get: () => store.playerInfo.nationality,
//   set: (v) => (store.playerInfo.nationality = v),
// })
const schoolName = computed({
  get: () => store.playerInfo.school_attended,
  set: (v) => (store.playerInfo.school_attended = v),
})
const selectedState = computed({
  get: () => store.playerInfo.state_of_origin,
  set: (v) => (store.playerInfo.state_of_origin = v),
})

const hasSubmitted = ref(false)

const gender: { optionText: string; value: GenderEnum }[] = [
  {
    optionText: 'Male',
    value: 'Male',
  },
  { optionText: 'Female', value: 'Female' },
  { optionText: 'Other', value: 'Other' },
]
const ages = [
  { optionText: '10', value: '10' },
  { optionText: '12', value: '12' },
  { optionText: '14', value: '14' },
]
// const nationality = [{ optionText: 'Nigeria', value: 'Nigeria' }]
const StateOfOrigin = [
  { optionText: 'osun', value: 'osun' },
  { optionText: 'ekiti', value: 'ekiti' },
  { optionText: 'oyo', value: 'oyo' },
  { optionText: 'lagos', value: 'lagos' },
]
const isValid = computed(() => {
  return (
    firstName.value.trim() !== '' &&
    lastName.value.trim() !== '' &&
    selectedAge.value.trim() !== '' &&
    selectedGender.value.trim() !== '' &&
    nationality.value.trim() !== '' &&
    // selectedNationality.value.trim() !== '' &&
    selectedState.value.trim() !== '' &&
    schoolName.value.trim() !== ''
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
    <RegistrationForm title="Personal information">
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
          <Input v-model="firstName" type="text" class="mt-2" />
          <p v-if="hasSubmitted && !firstName" class="text-red-500 text-sm mt-1">
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
            lastname is required
          </p>
        </div>
        <div>
          <div class="flex space-x-1 items-center">
            <Label name="age category" />
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
            v-model="selectedAge"
            :options="ages"
            class="mt-2"
            defaultOption="Select Your Age"
          />
          <p v-if="hasSubmitted && !selectedAge" class="text-red-500 text-sm mt-1">
            Age is required
          </p>
        </div>
        <!-- <div>
          <div class="flex space-x-1 items-center">
            <Label name="Team" />
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
            v-model="selectedTeam"
            :options="teams"
            defaultOption="Select Your Team"
            class="mt-2"
          />
          <p v-if="hasSubmitted && selectedTeam === 0" class="text-red-500 text-sm mt-1">
            Please select a valid team
          </p>
        </div> -->
        <div>
          <div class="flex space-x-1 items-center">
            <Label name="gender" />
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
            v-model="selectedGender"
            :options="gender"
            class="mt-2"
            defaultOption="Select Your Gender"
          />
        </div>
        <p v-if="hasSubmitted && !selectedGender" class="text-red-500 text-sm mt-1">
          Gender is required
        </p>
        <div>
          <div class="flex space-x-1 items-center">
            <Label name="nationality" />
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
          <Input v-model="nationality" type="text" class="mt-2" />
          <p v-if="hasSubmitted && !nationality" class="text-red-500 text-sm mt-1">
            Nationality is required
          </p>

          <!-- <FormSelect
            v-model="selectedNationality"
            :options="nationality"
            class="mt-2"
            defaultOption="Select Your Nationality"
          />
          <p v-if="hasSubmitted && !selectedNationality" class="text-red-500 text-sm mt-1">
            Nationality is required
          </p> -->
        </div>
        <div>
          <div class="flex space-x-1 items-center">
            <Label name="secondary school attended" />
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
          <Input v-model="schoolName" type="text" class="mt-2" />
          <p v-if="hasSubmitted && !schoolName" class="text-red-500 text-sm mt-1">
            School name is required
          </p>
        </div>
        <div>
          <div class="flex space-x-1 items-center">
            <Label name="state of origin" />
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
            :options="StateOfOrigin"
            class="mt-2"
            defaultOption="Select Your State "
          />
          <p v-if="hasSubmitted && !selectedState" class="text-red-500 text-sm mt-1">
            State is required
          </p>
        </div>
      </div>
    </RegistrationForm>
  </div>
</template>
