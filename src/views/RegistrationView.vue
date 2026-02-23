<script setup lang="ts">
import RegistrationStep from '../components/common/RegistrationStep.vue'
import Button from '../components/Registration/Button.vue'
import FootballProfile from '../components/Registration/FootballProfile.vue'
import GuardianInfo from '../components/Registration/GuardianInfo.vue'
import PlayerInfo from '../components/Registration/PlayerInfo.vue'
import RequiredUploads from '../components/Registration/RequiredUploads.vue'
import Modal from '../components/common/Modal.vue'
import { ChevronRightIcon, XMarkIcon } from '@heroicons/vue/16/solid'
import { computed, reactive, ref } from 'vue'
import router from '../router'
import { useRegistrationStore } from '../stores/RegistrationStore'
import { toast } from 'vue3-toastify'

const store = useRegistrationStore()
const stepRef = ref<any>(null)
const steps = [
  { name: 'Player Information', component: 'playerInformation', stepLevel: 1 },
  { name: 'Guardian Information', component: 'guardianInformation', stepLevel: 2 },
  { name: 'Football Profile & Health Safety', component: 'footballProfile', stepLevel: 3 },
  { name: 'Required Uploads', component: 'requiredUploads', stepLevel: 4 },
]
const activeStep = ref('playerInformation')
const showSuccessModal = ref(false)

const completedSteps = reactive<Record<string, boolean>>({
  playerInformation: false,
  guardianInformation: false,
  footballProfile: false,
  requiredUploads: false,
})
const componentsMap: any = {
  playerInformation: PlayerInfo,
  guardianInformation: GuardianInfo,
  footballProfile: FootballProfile,
  requiredUploads: RequiredUploads,
}
const isStep4Valid = ref(false)
const handleStepValid = (val: boolean) => {
  completedSteps[activeStep.value] = val
  if (activeStep.value === 'requiredUploads') isStep4Valid.value = val
}
const isFormValid = computed(() => {
  return Object.values(completedSteps).every(Boolean)
})
const submit = async () => {
  if (!isStep4Valid.value) return
  // if (!isFormValid.value) return
  // {
  // toast('Please complete all required fields', {
  //   autoClose: 1500,
  // })
  // return
  // }
  try {
    await store.submitFullRegistrationForm()

    showSuccessModal.value = true
  } catch (error) {
    console.error('Registration failed:', error)
    showSuccessModal.value = false
    toast(store.error || 'submission failed', {
      autoClose: 1000,
    })
  }
}

const nextStep = () => {
  if (!stepRef.value?.validate()) return

  completedSteps[activeStep.value] = true

  const keys = Object.keys(componentsMap)
  const index = keys.indexOf(activeStep.value)

  const nextKey = keys[index + 1]
  if (nextKey) {
    activeStep.value = nextKey
  }
}

const prevStep = () => {
  const currentIndex = steps.findIndex((s) => s.component === activeStep.value)
  if (currentIndex > 0) {
    const prevComponent = steps[currentIndex - 1]?.component
    if (prevComponent) {
      activeStep.value = prevComponent
    }
  }
}
const backToHome = () => {
  router.push('/')
}
</script>
<template>
  <div class="max-w-[1216px] mx-auto">
    <div class="flex justify-between py-[23px] md:px-0 px-4">
      <div class="font-zalando font-bold text-[#1F1F1F] text-xl md:text-[22px] uppercase">
        Register for 2025/2026 session
      </div>
      <button class="flex items-center space-x-2 cursor-pointer" @click="router.push('/')">
        <XMarkIcon class="text-[#454545] h-[18px] w-[18px]" />
        <div class="text-[#454545] text-sm font-zalando font-semibold">Cancel</div>
      </button>
    </div>
  </div>

  <div class="bg-[#F5F5F5]">
    <div class="py-6 max-w-[778px] mx-auto px-4">
      <div class="flex justify-between">
        <RegistrationStep
          v-for="(step, index) in steps"
          :key="index"
          :step="step.stepLevel"
          :stepName="step.name"
          :isActive="activeStep === step.component"
          :isCompleted="completedSteps[step.component] ?? false"
          @toggle-active="completedSteps[step.component] && (activeStep = step.component)"
        >
          <div class="md:inline hidden" v-if="index !== steps.length - 1">
            <ChevronRightIcon class="text-[#8C8C8C] h-[18px] w-[18px]" /></div
        ></RegistrationStep>
      </div>
      <form action="" @submit.prevent="submit">
        <KeepAlive>
          <component ref="stepRef" :is="componentsMap[activeStep]" @step-valid="handleStepValid" />
        </KeepAlive>
        <div class="flex space-x-4">
          <Button
            type="button"
            text="Back"
            color="primary"
            :disabled="activeStep === steps[0]?.component"
            @click="prevStep"
          />
          <Button
            type="submit"
            v-if="activeStep === steps[steps.length - 1].component"
            text="Submit"
            color="secondary"
            :disabled="!isStep4Valid || store.loading"
          />

          <Button
            type="button"
            text="Continue"
            color="secondary"
            :disabled="activeStep === steps[steps.length - 1]?.component"
            @click="nextStep"
            :class="activeStep === steps[steps.length - 1]?.component ? 'hidden' : 'inline'"
          />
        </div>
        <div>
          <Modal
            v-model="showSuccessModal"
            customClass="bg-[#FFFFFF] max-w-[1440px] mx-auto max-h-[1198px]"
            ><div class="mt-2 h-full flex flex-col items-center justify-center text-center">
              <div class="flex justify-center mb-4 items-center">
                <img
                  src="/assets/images/success_shot.png"
                  alt="success logo"
                  width="120"
                  height="120"
                />
              </div>
              <h1 class="text-[#262626] text-center text-[36px] font-bold uppercase pt-10 pb-4">
                Registration Successful!
              </h1>
              <div class="max-w-[630px] text-[#595959] text-[16px] text-center">
                <p class="">
                  Thank you for registering with JTOF Sports and Talent Management Academy (JOFSA).
                </p>
                <p class="pt-2">
                  Your application has been received successfully. Our team will contact the parent
                  or guardian soon to share the next steps.
                </p>
                <div class="pt-10">
                  <p>If you have any questions, please reach out to us via WhatsApp or email.</p>
                  <p class="pt-5">
                    We look forward to supporting your child’s football journey with JOFSA.
                  </p>
                </div>
              </div>
              <Button
                text="Back to homepage"
                class="bg-[#2f6b3f] text-white outline-none mt-10"
                @click="backToHome"
              /></div
          ></Modal>
        </div>
      </form>
    </div>
  </div>
</template>
