<script setup lang="ts">
import RegistrationStep from '@/components/common/RegistrationStep.vue'
import Button from '@/components/Registration/Button.vue'
import FootballProfile from '@/components/Registration/FootballProfile.vue'
import GuardianInfo from '@/components/Registration/GuardianInfo.vue'
import PlayerInfo from '@/components/Registration/PlayerInfo.vue'
import RequiredUploads from '@/components/Registration/RequiredUploads.vue'
import { ChevronRightIcon, XMarkIcon } from '@heroicons/vue/16/solid'
import { reactive, ref } from 'vue'
const stepRef = ref<any>(null)
const steps = [
  { name: 'Player Information', component: 'playerInformation', stepLevel: 1 },
  { name: 'Guardian Information', component: 'guardianInformation', stepLevel: 2 },
  { name: 'Football Profile & Health Safety', component: 'footballProfile', stepLevel: 3 },
  { name: 'Required Uploads', component: 'requiredUploads', stepLevel: 4 },
]
const activeStep = ref('playerInformation')
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
const nextStep = () => {
  // const currentIndex = steps.findIndex((s) => s.component === activeStep.value)
  // if (currentIndex < steps.length - 1) {
  //   const nextComponent = steps[currentIndex + 1]?.component
  //   if (nextComponent) {
  //     activeStep.value = nextComponent
  //   }
  // }
  // const keys = Object.keys(completedSteps)
  // const currentIndex = keys.indexOf(activeStep.value)
  // const nextKey = keys[currentIndex + 1]

  // if (completedSteps[activeStep.value] && nextKey) {
  //   activeStep.value = nextKey
  // }
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
</script>
<template>
  <div class="max-w-[1216px] mx-auto">
    <div class="flex justify-between py-[23px] md:px-0 px-4">
      <div class="font-zalando font-bold text-[#1F1F1F] text-xl md:text-[22px] uppercase">
        Register for 2025/2026 session
      </div>
      <div class="flex items-center space-x-2">
        <XMarkIcon class="text-[#454545] h-[18px] w-[18px]" />
        <div class="text-[#454545] text-sm font-zalando font-semibold">Cancel</div>
      </div>
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
      <form action="">
        <KeepAlive>
          <component
            ref="stepRef"
            :is="componentsMap[activeStep]"
            @step-valid="completedSteps[activeStep] = $event"
          />
        </KeepAlive>
        <div class="flex space-x-4">
          <Button
            text="Back"
            color="primary"
            :disabled="activeStep === steps[0]?.component"
            @click="prevStep"
          />
          <Button
            text="Continue"
            color="secondary"
            :disabled="activeStep === steps[steps.length - 1]?.component"
            @click="nextStep"
          />
        </div>
      </form>
    </div>
  </div>
</template>
