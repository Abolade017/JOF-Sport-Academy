import { defineStore } from "pinia";
import { AxiosError } from "axios";
import axiosInstance from "@/api/axiosInstance";

interface ContactUs {
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  message: string
}
export const useContactStore = defineStore('', {
  state: () => {
    return {
      loading: false as boolean,
      error: null as null | string,
      contactUs: {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        message: ''
      } as ContactUs

    }
  },
  actions: {
    resetForm() {
      this.contactUs = {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        message: ''
      }
    },
    async sendMessage() {
      this.error = null
      this.loading = true

      try {
        const formData = new FormData()
        formData.append('first_name', this.contactUs.first_name)
        formData.append('last_name', this.contactUs.last_name)
        formData.append('email', this.contactUs.email)
        formData.append('phone_number', this.contactUs.phone_number)
        formData.append('message', this.contactUs.message)
        await axiosInstance.post('/sport/api/contact/', formData)
        this.resetForm()
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err.message
        }
      }
      finally {
        this.loading = false
      }
    }
  }
})
