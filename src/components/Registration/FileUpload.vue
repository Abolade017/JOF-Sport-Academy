<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Label from './Label.vue'

const props = defineProps<{
  label: string
  accept?: string
  maxSizeMB?: number
}>()

const emit = defineEmits<{
  (e: 'update:file', file: File | null): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const error = ref<string | null>(null)
const file = ref<File | null>(null)

const previewUrl = computed(() => {
  if (!file.value) return null
  // if (!file.value.type.startsWith('image/')) return null
  return URL.createObjectURL(file.value)
})
const fileType = computed(() => {
  if (!file.value) return null

  const type = file.value.type

  if (type.startsWith('image/')) return 'image'
  if (type === 'application/pdf') return 'pdf'

  if (
    type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    type === 'application/msword'
  )
    return 'word'

  return 'unknown'
})
const validate = (file: File): boolean => {
  error.value = null

  if (props.maxSizeMB && file.size > props.maxSizeMB * 1024 * 1024) {
    error.value = `File must be less than ${props.maxSizeMB}MB`
    return false
  }

  return true
}

const handleFile = (selectedFile: File | null) => {
  if (!selectedFile) return
  if (!validate(selectedFile)) return

  file.value = selectedFile
  emit('update:file', selectedFile)
}

const onChange = (event: Event) => {
  const selectedFile = (event.target as HTMLInputElement).files?.[0] ?? null
  handleFile(selectedFile)
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
  handleFile(event.dataTransfer?.files?.[0] ?? null)
}

/* 🧹 Cleanup blob URL */
watch(file, (_, oldFile) => {
  if (oldFile) URL.revokeObjectURL(previewUrl.value!)
})
</script>

<template>
  <div class="space-y-2">
    <div class="flex space-x-1 items-center">
      <Label :name="label" />
      <slot></slot>
    </div>
    <div
      class="flex h-40 cursor-pointer items-center justify-center border transition mt-2 font-zalando"
      :class="isDragging ? 'border-[#BFBFBF] bg-[#f5f5f5]' : 'border-[#BFBFBF]'"
      @click="inputRef?.click()"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop="onDrop"
    >
      <template v-if="file">
        <!-- Image preview -->
        <div v-if="previewUrl">
          <img
            :src="previewUrl!"
            class="max-h-14 max-w-14 object-contain mx-auto"
            v-if="fileType === 'image'"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            fill="currentColor"
            class="text-[#8C8C8C] mx-auto mb-2 h-14 w-14"
            v-else-if="fileType === 'pdf'"
          >
            <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
            <path
              d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            fill="currentColor"
            class="text-[#8C8C8C] mx-auto mb-2 h-14 w-14"
            v-else-if="fileType === 'word'"
          >
            <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
            <path
              d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"
            />
          </svg>
          <p class="text-sm font-medium text-[#454545] text-center">{{ file.name }}</p>
          <p class="text-xs text-[#8C8C8C] mt-1 text-center">
            {{ (file.size / 1024 / 1024).toFixed(2) }} MB
          </p>
        </div>

        <!-- Non-image file -->
        <div v-else class="text-center">
          <p class="text-sm font-medium text-[#454545]">{{ file.name }}</p>
          <p class="text-xs text-[#8C8C8C] mt-1">{{ (file.size / 1024 / 1024).toFixed(2) }} MB</p>
        </div>
      </template>

      <!-- ✅ DEFAULT UPLOAD UI -->
      <template v-else>
        <div class="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            fill="currentColor"
            class="text-[#8C8C8C] mx-auto mb-2 h-10 w-10"
          >
            <path
              d="M176 544C96.5 544 32 479.5 32 400C32 336.6 73 282.8 129.9 263.5C128.6 255.8 128 248 128 240C128 160.5 192.5 96 272 96C327.4 96 375.5 127.3 399.6 173.1C413.8 164.8 430.4 160 448 160C501 160 544 203 544 256C544 271.7 540.2 286.6 533.5 299.7C577.5 320 608 364.4 608 416C608 486.7 550.7 544 480 544L176 544zM337 255C327.6 245.6 312.4 245.6 303.1 255L231.1 327C221.7 336.4 221.7 351.6 231.1 360.9C240.5 370.2 255.7 370.3 265 360.9L296 329.9L296 432C296 445.3 306.7 456 320 456C333.3 456 344 445.3 344 432L344 329.9L375 360.9C384.4 370.3 399.6 370.3 408.9 360.9C418.2 351.5 418.3 336.3 408.9 327L336.9 255z"
            />
          </svg>
          <p class="text-[#454545] text-[15px]">
            <span class="underline">Browse</span> or drag & drop file here
          </p>
        </div>
      </template>
      <input ref="inputRef" type="file" class="hidden" :accept="accept" @change="onChange" />
    </div>
    <p v-if="error" class="text-sm text-red-500">
      {{ error }}
    </p>
  </div>
</template>
