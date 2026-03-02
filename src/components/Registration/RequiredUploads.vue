<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import FileInput from './FileUpload.vue'
import RegistrationForm from './RegistrationForm.vue'
import Checkbox from './Checkbox.vue'
import { useRegistrationStore } from '../../stores/RegistrationStore'

const consentFormUrl = '/assets/docs/parent-guardian-consent.pdf'
const store = useRegistrationStore()
const consent1 = computed({
  get: () => store.requiredUploads.consent_to_training,
  set: (val) => (store.requiredUploads.consent_to_training = val),
})
const consent2 = computed({
  get: () => store.requiredUploads.confirm_information,
  set: (val) => (store.requiredUploads.confirm_information = val),
})
const consent3 = computed({
  get: () => store.requiredUploads.agree_terms,
  set: (val) => (store.requiredUploads.agree_terms = val),
})
const hasSubmitted = ref(false)
const handleFileUpload =
  (prop: 'uploads_birth_certificate' | 'uploads_consent_letter' | 'uploads_other_document') =>
  (e: Event) => {
    const files = (e.target as HTMLInputElement).files
    if (files?.[0]) {
      store.requiredUploads[prop] = files?.[0] ?? null
    }
  }
const birthCertificate = handleFileUpload('uploads_birth_certificate')
const consentLetter = handleFileUpload('uploads_consent_letter')
const otherDocuments = handleFileUpload('uploads_other_document')

const allConsentsChecked = computed(() => consent1.value && consent2.value && consent3.value)
const uploadsValid = computed(() => {
  return (
    !!store.requiredUploads.uploads_birth_certificate &&
    !!store.requiredUploads.uploads_consent_letter &&
    !!store.requiredUploads.uploads_other_document
  )
})
const emit = defineEmits<{
  (e: 'step-valid', valid: boolean): void
}>()
watch(
  () => ({
    birth: store.requiredUploads.uploads_birth_certificate,
    consent: store.requiredUploads.uploads_consent_letter,
    other: store.requiredUploads.uploads_other_document,
    c1: consent1.value,
    c2: consent2.value,
    c3: consent3.value,
  }),
  () => {
    const valid = uploadsValid.value && allConsentsChecked.value
    emit('step-valid', valid)
  },
  { immediate: true },
)
</script>

<template>
  <div class="mt-8 md:mt-16 font-zalando">
    <RegistrationForm title=" Required uploads">
      <div class="flex flex-col gap-5 md:my-6 my-4">
        <FileInput
          label="Birth Certificate"
          @change="birthCertificate"
          accept=".jpg,.png,.pdf,.doc,.docx"
          :maxSizeMB="5"
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
            />
          </svg>
        </FileInput>
        <p
          v-if="hasSubmitted && !store.requiredUploads.uploads_birth_certificate"
          class="text-sm text-red-500"
        >
          Birth Certificate is required
        </p>
        <div>
          <FileInput
            label="Parent/Guardian Consent Letter"
            @change="consentLetter"
            accept=".jpg,.png,.pdf,.doc,.docx"
            :maxSizeMB="5"
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
          ></FileInput>
          <p
            v-if="hasSubmitted && !store.requiredUploads.uploads_consent_letter"
            class="text-sm text-red-500"
          >
            Parent/Guardian Consent Letter is required
          </p>

          <div class="text-sm text-[#595959] pt-2">
            Download the Parent/Guardian
            <span
              ><a href="consentFormUrl " target="_blank" class="underline text-[#318750]"
                >Consent Form</a
              ></span
            >
            here and upload the signed copy below.
          </div>
        </div>
        <div>
          <FileInput
            label="Other documents"
            @change="otherDocuments"
            accept=".jpg,.png,.pdf,.doc,.docx"
            :maxSizeMB="5"
          />
          <div class="text-sm text-[#595959] pt-2">
            Upload any additional documents required for registration (e.g., medical report,
            passport copy)
          </div>
        </div>
        <div>
          <div>
            <div class="mt-2 flex items-center gap-2">
              <Checkbox v-model="consent1" />
              <span class="text-sm text-gray-700">
                I consent to my child joining JOFSA training and activities.</span
              >
            </div>
          </div>
          <div>
            <div class="mt-2 flex items-center gap-2">
              <Checkbox v-model="consent2" />
              <span class="text-sm text-gray-700">
                I, the parent/guardian, confirm that all information provided is accurate
              </span>
            </div>
          </div>
          <div>
            <div class="mt-2 flex items-center gap-2">
              <Checkbox v-model="consent3" />
              <span class="text-sm text-gray-700">
                I agree to the academy’s terms and conditions.
              </span>
            </div>
          </div>
          <p v-if="hasSubmitted && !allConsentsChecked" class="mt-2 text-sm text-red-500">
            You must agree to all terms before submitting.
          </p>
        </div>
      </div>
    </RegistrationForm>
  </div>
</template>
