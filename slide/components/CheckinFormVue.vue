<script setup lang="ts">
import { ref, computed } from 'vue'

export type CheckinPayload = { lastName: string; bookingRef: string }

const props = defineProps<{
  onSubmit?: (payload: CheckinPayload) => void | Promise<void>
}>()

const lastName = ref('')
const bookingRef = ref('')
const error = ref<string | null>(null)
const submitting = ref(false)

const canSubmit = computed(() => 
  lastName.value.trim().length > 1 && bookingRef.value.trim().length >= 6
)

async function handleSubmit(e: Event) {
  e.preventDefault()
  error.value = null
  
  if (!canSubmit.value) {
    error.value = 'Enter your last name and booking reference.'
    return
  }
  
  try {
    submitting.value = true
    if (props.onSubmit) {
      await props.onSubmit({ 
        lastName: lastName.value.trim().toUpperCase(), 
        bookingRef: bookingRef.value.trim().toUpperCase() 
      })
    }
  } catch (err) {
    error.value = "We couldn't find your booking. Check your details and try again."
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div id="checkin" class="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 border border-sky-100 hover:shadow-xl transition-shadow duration-300">
    <h3 class="text-xl sm:text-2xl font-bold text-slate-800 mb-5 sm:mb-6">Retrieve Your Booking</h3>

    <form @submit="handleSubmit" class="space-y-5 sm:space-y-6">
      <div>
        <label for="lastName" class="block text-sm font-semibold text-slate-700 mb-2">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          v-model="lastName"
          class="w-full px-4 py-3.5 sm:py-3 text-base rounded-lg border-2 border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all touch-manipulation"
          placeholder="Your last name"
          autocomplete="family-name"
          required
        />
      </div>

      <div>
        <label for="bookingRef" class="block text-sm font-semibold text-slate-700 mb-2">
          Booking reference (PNR)
        </label>
        <input
          type="text"
          id="bookingRef"
          v-model="bookingRef"
          @input="bookingRef = bookingRef.toUpperCase()"
          class="w-full px-4 py-3.5 sm:py-3 text-base rounded-lg border-2 border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all uppercase touch-manipulation"
          placeholder="ABC123 or 1234567890123"
          autocomplete="off"
          required
        />
      </div>

      <button
        type="submit"
        :disabled="!canSubmit || submitting"
        class="w-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold py-4 sm:py-4 text-base sm:text-lg rounded-lg hover:from-sky-700 hover:to-cyan-700 active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {{ submitting ? 'Retrieving…' : 'Retrieve Booking' }}
      </button>
    </form>

    <div v-if="error" aria-live="polite" class="mt-5 sm:mt-6 p-3.5 sm:p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
      <p class="text-xs sm:text-sm leading-relaxed">{{ error }}</p>
    </div>

    <div class="mt-5 sm:mt-6 p-3.5 sm:p-4 bg-sky-50 rounded-lg border border-sky-100">
      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
        <span class="font-semibold text-sky-700">Tip:</span> Online check-in opens 24 hours before departure and closes 2 hours before departure.
      </p>
    </div>
  </div>
</template>
