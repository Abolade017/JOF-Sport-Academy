<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Input from './Input.vue'
import Label from './Label.vue'
import FormSelect from './FormSelect.vue'
import RegistrationForm from './RegistrationForm.vue'
const emit = defineEmits<{
  (e: 'step-valid', value: boolean): void
}>()
const firstName = ref('')
const lastName = ref('')
const selectedAge = ref('')
const selectedGender = ref('')
const selectedNationality = ref('')
const schoolName = ref('')
const selectedState = ref('')
const hasSubmitted = ref(false)

const gender = [
  {
    optionText: 'male',
    value: 'male',
  },
  { optionText: 'female', value: 'female' },
]
const ages = [
  { optionText: '10', value: '10' },
  { optionText: '12', value: '12' },
  { optionText: '14', value: '14' },
]
const nationality = [{ optionText: 'Nigeria', value: 'Nigeria' }]
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
    selectedNationality.value.trim() !== '' &&
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
          <Label name="first name" />
          <Input v-model="firstName" type="text" class="mt-2" />
          <p v-if="hasSubmitted && !firstName" class="text-red-500 text-sm mt-1">
            Firstname is required
          </p>
        </div>
        <div>
          <Label name="last name" />
          <Input v-model="lastName" type="text" class="mt-2" />
          <p v-if="hasSubmitted && !lastName" class="text-red-500 text-sm mt-1">
            lastname is required
          </p>
        </div>
        <div>
          <Label name="age category" />
          <FormSelect
            label="Player Age"
            v-model="selectedAge"
            :options="ages"
            class="mt-2"
            defaultOption="Select Your Age"
          />
          <p v-if="hasSubmitted && !selectedAge" class="text-red-500 text-sm mt-1">
            Age is required
          </p>
        </div>
        <div>
          <Label name="gender" />
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
          <Label name="nationality" />
          <FormSelect
            v-model="selectedNationality"
            :options="nationality"
            class="mt-2"
            defaultOption="Select Your Nationality"
          />
          <p v-if="hasSubmitted && !selectedNationality" class="text-red-500 text-sm mt-1">
            Nationality is required
          </p>
        </div>
        <div>
          <Label name="secondary school attended" />
          <Input v-model="schoolName" type="text" class="mt-2" />
          <p v-if="hasSubmitted && !schoolName" class="text-red-500 text-sm mt-1">
            School name is required
          </p>
        </div>
        <div>
          <Label name="state of origin" />
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
