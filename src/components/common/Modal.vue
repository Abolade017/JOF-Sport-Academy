<script setup lang="ts">
import { ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import Button from '../Registration/Button.vue'
import router from '../../router'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const closeModal = () => {
  emit('update:modelValue', false)
}

const backToHome = () => {
  emit('update:modelValue', false)
  router.push('/')
}
</script>
<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10 font-zalando">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-[1440px] h-[1198px] transform overflow-hidden bg-white p-6 text-center align-middle shadow-xl transition-all"
            >
              <div class="mt-2 h-full flex flex-col items-center justify-center text-center">
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
                    Thank you for registering with JTOF Sports and Talent Management Academy
                    (JOFSA).
                  </p>
                  <p class="pt-2">
                    Your application has been received successfully. Our team will contact the
                    parent or guardian soon to share the next steps.
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
                />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
