<template>
  <div class="bg-[#F5F5F5]">
    <div class="max-w-[1216px] mx-auto">
      <div class="flex flex-col md:flex-row gap-12 md:gap-24 py-12 md:py-24">
        <div class="md:w-1/2 w-full">
          <div class="md:pb-[40.5px] pb-4 md:px-0 px-4">
            <h1 class="text-3xl md:text-[36px] uppercase font-nippo text-[#1F1F1F] font-medium">
              Contact us
            </h1>
            <p class="text-[#595959] font-zalando font-normal text-base pt-2 md:pt-4">
              Lorem ipsum dolor sit amet consectetur. Nisl vitae aliquet aenean molestie. Tempus
              congue placerat nisi faucibus dui vitae. Quis in non nibh id. Nulla nunc tortor amet
              orci. Mollis
            </p>
          </div>
          <div class="bg-[#F0F0F0] border border-[#D9D9D9] h-fit font-zalando">
            <div class="md:pt-8 pt-4 flex flex-col md:flex-row">
              <div class="md:w-1/2 w-full pl-4 md:pl-8">
                <div>
                  <div class="text-[#318750] uppercase text-[12px] font-semibold">
                    Service Center hours
                  </div>
                  <div class="text-[#595959] md:pb-8 pb-4 pt-2">
                    Monday to Friday <br />
                    8:00 a.m to 4:00 p.m (WAT)
                  </div>
                </div>
                <div>
                  <div class="text-[#318750] uppercase text-[12px] font-semibold">headquarter</div>
                  <div class="text-[#595959] md:pb-8 pb-4 pt-2">
                    No.1 JayTee Ojo Crescent, Off <br />
                    Okemesi Road, Ikoro Ekiti,<br />
                    Ekiti State, Nigeria.
                  </div>
                </div>
              </div>
              <div class="md:w-1/2 w-full md:pl-0 pl-4 pr-4 md:pr-8">
                <div>
                  <div class="text-[#318750] uppercase text-[12px] font-semibold">
                    OFFICE Address
                  </div>
                  <div class="text-[#595959] md:pb-8 pb-4 pt-2">
                    No 10 Bolámgbé Mall, behind <br />
                    NNPC Bank road, Ado Ekiti
                  </div>
                </div>
                <div>
                  <div class="text-[#318750] uppercase text-[12px] font-semibold">
                    email address
                  </div>
                  <div class="text-[#595959] md:pb-8 pb-4 pt-2">
                    If you have any questions you can reach out via: <br />
                    <a href="mailto:jayteeojo@gmail.com" class="text-[#318750]">
                      jayteeojo@gmail.com</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="font-zalando pl-4 md:pl-8 pb-8">
              <div class="text-[#318750] uppercase text-[12px] font-semibold">socials</div>
              <div class="flex space-x-4 pt-4">
                <div
                  class="bg-[#C1DECB] flex justify-center items-center rounded-lg h-10 w-10"
                  v-for="(icon, index) in socialMediaLinks"
                  :key="index"
                >
                  <a :href="icon.linkUrl" target="_blank" rel="noopener noreferrer">
                    <font-awesome-icon :icon="icon.icon" class="text-[#318750] h-6 items-center" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md:w-1/2 w-full md:px-0 px-4">
          <div
            class="text-lg md:text-[22px] text-[#1F1F1F] font-bold font-zalando-condensed uppercase"
          >
            please Fill the form below
          </div>
          <form action="" @submit.prevent="handleSUbmit" class="pt-6">
            <div>
              <div>
                <Label name="first name" />
                <Input v-model="store.contactUs.first_name" type="text" class="mt-2" />
              </div>
              <div class="pt-5">
                <Label name="last name" />
                <Input v-model="store.contactUs.last_name" type="text" class="mt-2" />
              </div>

              <div class="pt-5">
                <Input type="tel" v-model="store.contactUs.phone_number" />
                <!-- <PhoneInput class="" v-model="store.contactUs.phone_number" label="phone number" /> -->
              </div>
              <div class="pt-5">
                <Label name="email" />
                <Input v-model="store.contactUs.email" type="email" class="mt-2" />
              </div>
              <div class="pt-5">
                <Label name="How can we help you?" />
                <textarea
                  class="border border-[#BFBFBF] focus:outline-none pl-3 w-full h-[113px] resize-none mt-2"
                  v-model="store.contactUs.message"
                />
              </div>
            </div>
            <div class="flex space-x-6 pt-5">
              <Button type="button" text="Cancel" color="primary" @click="store.resetForm" />
              <Button
                type="submit"
                :text="store.loading ? 'Sending...' : 'Send message'"
                color="secondary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { onMounted, ref } from 'vue'
import Label from '../components/Registration/Label.vue'
import Input from '../components/Registration/Input.vue'
import PhoneInput from '../components/Registration/PhoneInput.vue'
import 'vue-tel-num-input/style.css'
import 'vue-tel-num-input/flags.css'
import Button from '../components/Registration/Button.vue'
import { useContactStore } from '../stores/UseContactUsStore'
import { toast, type ToastOptions } from 'vue3-toastify'

const socialMediaLinks = [
  { linkUrl: '', icon: faInstagram },
  { linkUrl: '', icon: faYoutube },
  { linkUrl: '', icon: faLinkedin },
  { linkUrl: '', icon: faTwitter },
  { linkUrl: '', icon: faFacebookF },
]
const store = useContactStore()
const handleSUbmit = async () => {
  await store.sendMessage()
  if (!store.error) {
    toast.success('Message sent successfully!', {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    } as ToastOptions)
  }
}
</script>
