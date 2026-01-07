<template>
  <div class="w-full" v-if="countries.length > 0">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-3">
      {{ label }}
      <!-- <span v-if="required" class="text-red-500 ml-1">*</span> -->
    </label>
    <div
      class="relative bg-gray-40 font-outfit text-[1em] font-normal h-[45px] lg:h-[50px] 2xl:h-[55px] border-[1.5px] border-solid text-gray-50 rounded-[5px] flex items-center overflow-hidden transition-all"
      :class="
        hasError
          ? 'border-red-500 ring-2 ring-red-200'
          : 'border-gray-60 focus-within:bg-purple-10 focus-within:border-purple-pry'
      "
    >
      <!-- Country Dropdown -->
      {{ filteredCountries }}
      <div class="relative" ref="dropdownRef">
        <button
          v-if="selectedCountry"
          type="button"
          class="flex items-center gap-1 px-3 py-2.5 border-r border-gray-300 transition-colors"
          @click="toggleDropdown"
        >
          <span class="text-2xl">{{ selectedCountry.unicodeFlag }}</span>
          <svg
            class="w-4 h-4 text-gray-600 transition-transform"
            :class="{ 'rotate-180': isDropdownOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <!-- <p class="text-black">{{ countryCodes }}</p> -->
        <!-- Dropdown Menu -->
        <div
          v-if="isDropdownOpen"
          ref="dropdownMenuRef"
          class="fixed float-right top-full z-50 w-80 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-hidden"
          :style="dropdownStyle"
        >
          <div class="p-2 border-b border-gray-200">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search country..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div class="overflow-y-auto max-h-80">
            <button
              v-for="(country, i) in filteredCountries"
              :key="`⁠ ${country.name}-${i} ⁠`"
              type="button"
              class="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:text-white hover:cursor-pointer hover:bg-gray-10 transition-colors"
              :class="{ 'bg-blue-50': selectedCountry && country.name === selectedCountry.name }"
              @click="selectCountry(country)"
            >
              <span class="text-2xl">{{ country.unicodeFlag }}</span>
              <span class="flex-1 text-sm text-gray-700">{{ country.name }}</span>
              <span class="text-sm text-gray-500 font-medium">{{
                getCountryDialCode(country.iso2)
              }}</span>
            </button>
            <div
              v-if="filteredCountries.length === 0"
              class="px-4 py-8 text-center text-gray-500 text-sm"
            >
              No countries found
            </div>
          </div>
        </div>
      </div>

      <!-- Country Code Display -->
      <div class="px-3 py-3 text-gray-700 font-medium text-sm border-l border-gray-300">
        ({{ selectedCountry?.dial_code || '+234' }})
      </div>

      <!-- Phone Number Input -->
      <input
        :id="id"
        :name="name"
        type="text"
        :placeholder="placeholder"
        :required="required"
        :value="modelValue"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
        class="flex-1 px-3 py-3 text-gray-900 text-base focus:outline-none"
      />

      <!-- Icon -->
      <!-- <div v-if="icon" class="px-3 text-gray-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            </div> -->
    </div>

    <!-- Error Message -->
    <div v-if="hasError && errorMessage && errorMessage.length > 0" class="mt-1.5">
      <p v-for="(error, index) in errorMessage" :key="index" class="text-sm text-red-600">
        {{ error.$message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { PhoneNumberImplemenaton } from '../../helpers/phone'
import parsePhoneNumber from 'libphonenumber-js'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Enter phone number',
  },
  icon: {
    type: String,
    default: 'phone',
  },
  errorMessage: {
    type: Array,
    default: () => [],
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  autoSetNumber: {
    type: Boolean,
    default: false,
  },
  top: {
    type: Number,
    default: 8,
  },
})

const emit = defineEmits(['update:modelValue', 'change', 'country-change', 'blur', 'focus'])
const { countryCodes, countryFlags: countries } = new PhoneNumberImplemenaton()

// Refs
const dropdownRef = ref(null)
const dropdownMenuRef = ref(null)
const isDropdownOpen = ref(false)
const searchQuery = ref('')
const selectedCountry = ref(null)
const dropdownStyle = ref({})

// Computed
const filteredCountries = computed(() => {
  if (!searchQuery.value) return countries.value
  const query = searchQuery.value.toLowerCase()
  console.log(countries.value)
  return countries.value.filter((country) => country.name.toLowerCase().includes(query))
})

const handleAutoCountryCodeSetter = () => {
  const gottenCountry = parsePhoneNumber('+' + props.modelValue.replace('+', ''))
  if (gottenCountry && countries.value.length) {
    console.log('Gotten Country', gottenCountry)
    const country = countries.value.find((c) => c.iso2 === 'BE')
    console.log('Country', country)
    if (country) selectCountry(country)
    emit('update:modelValue', gottenCountry.nationalNumber)
  }
}

watch(
  countries,
  (val) => {
    if (props.autoSetNumber && props.modelValue.length > 7 && val.length) {
      handleAutoCountryCodeSetter()
    } else {
      initializeCountry('NG')
    }
  },
  { once: true },
)

// Methods
const initializeCountry = (isoCode) => {
  const country = countries.value.find((c) => c.iso2 === isoCode)
  const countryCode = countryCodes.value.find((c) => c.code === isoCode)
  selectCountry(
    country ? { ...country, ...countryCode } : { ...countries.value[0], ...countryCodes.value[0] },
  )
}

const calculateDropdownPosition = () => {
  if (!dropdownRef.value) return

  const rect = dropdownRef.value.getBoundingClientRect()
  dropdownStyle.value = {
    // top: `⁠ ${rect.bottom + window.scrollY + props.top}px ⁠`,
    // top: ⁠ `${rect.bottom + window.scrollY + (props.top)}px `⁠,
    // left: ⁠ ${rect.left + window.scrollX}px ⁠
  }
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
  if (isDropdownOpen.value) {
    searchQuery.value = ''
    nextTick(() => {
      calculateDropdownPosition()
    })
  }
}

const selectCountry = (country) => {
  const countryWithCode = countryCodes.value.find((c) => c.name === country.name)
  selectedCountry.value = { ...country, ...countryWithCode }
  isDropdownOpen.value = false
  searchQuery.value = ''
  emit('country-change', selectedCountry.value)
}

const handleClickOutside = (event) => {
  if (!dropdownRef.value || !dropdownMenuRef.value) return

  if (!dropdownRef.value.contains(event.target) && !dropdownMenuRef.value.contains(event.target)) {
    isDropdownOpen.value = false
    searchQuery.value = ''
  }
}

const getCountryDialCode = (iso2) => {
  return countryCodes.value.find((c) => c.code === iso2)?.dial_code
}

const handleInput = (event) => {
  setTimeout(() => {
    const input = event.target
    const value = input.value

    // Regex to match anything that is not a number
    const regex = /[^0-9]/g

    if (regex.test(value)) {
      // toast.error("Invalid entry for phone number");
      // Clear the input or set it to a valid value
      input.value = ''
    } else {
      emit('update:modelValue', value)
      emit('change', value)
    }
  }, 0)
}

const handleChange = (event) => {
  emit('change', event)
}

const handleBlur = (event) => {
  emit('blur', event)
}

const handleFocus = (event) => {
  emit('focus', event)
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', calculateDropdownPosition)
  window.addEventListener('resize', calculateDropdownPosition)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', calculateDropdownPosition)
  window.removeEventListener('resize', calculateDropdownPosition)
})
</script>
