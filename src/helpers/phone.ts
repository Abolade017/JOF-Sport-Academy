import axios from "axios";
import { ref } from "vue";
export const getPhoneNumberNeeded = (
  countryCode: string,
  phoneNumber: string
) => {
  let myString = phoneNumber;
  if (myString.length > 0 && myString.charAt(0) === "0") {
    myString = myString.substring(1);
  }

  return (countryCode || "+234") + myString;
};

export const removeCountryCode = (
  phoneNumber: string
) => {
  return phoneNumber.replace(/^\+?234/, "");

};

export class PhoneNumberImplemenaton {
  public countryCodes = ref<[]>([]);
  public countryFlags = ref<[]>([]);
  constructor() {
    this.initialize();
  }
  async initialize() {
    try {
      await Promise.all([
        this.getCountryCodes(),
        this.getCountryFlags()
      ]);
      console.log(this.countryCodes)
    }
    catch (error) {
      console.error(error);
    }
  }

  async getCountryCodes() {
    try {
      const response = await axios.get("https://countriesnow.space/api/v0.1/countries/codes");
      this.countryCodes.value = response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
  async getCountryFlags() {
    try {
      const response = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/flag/unicode"
      );
      this.countryFlags.value = response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

}
