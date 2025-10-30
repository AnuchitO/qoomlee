<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Passenger } from '../types/passenger'

const props = defineProps<{
  passengers: Passenger[]
  onNext?: (selected: Passenger[]) => void
  onBack?: () => void
}>()

const selected = ref<Record<number, boolean>>({})

const anySelected = computed(() => Object.values(selected.value).some(Boolean))
const allSelected = computed(() => 
  props.passengers.length > 0 && props.passengers.every((_, i) => selected.value[i])
)

const toggleAll = () => {
  if (allSelected.value) {
    selected.value = {}
  } else {
    selected.value = Object.fromEntries(props.passengers.map((_, i) => [i, true]))
  }
}

const handleContinue = () => {
  if (props.onNext && anySelected.value) {
    const selectedPassengers = props.passengers.filter((_, i) => !!selected.value[i])
    props.onNext(selectedPassengers)
  }
}

const togglePassenger = (idx: number) => {
  selected.value = { ...selected.value, [idx]: !selected.value[idx] }
}
</script>

<template>
  <div>
    <div class="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden mb-4">
      <!-- Header -->
      <div class="px-5 pt-5 pb-4 bg-gradient-to-b from-slate-50/50 to-white border-b border-slate-100">
        <h3 class="text-xl font-bold text-slate-900 tracking-tight">Select Passengers</h3>
        <p class="text-sm text-slate-600 mt-1.5">Choose passengers for check-in</p>
      </div>

      <!-- Passenger list - Toggle cards -->
      <div class="p-4 space-y-3">
        <button
          v-for="(p, idx) in passengers"
          :key="`${p.firstName}-${p.lastName}-${idx}`"
          type="button"
          @click="togglePassenger(idx)"
          :class="[
            'relative w-full text-left px-4 py-4 rounded-xl border-2 transition-all touch-manipulation overflow-hidden',
            selected[idx]
              ? 'border-sky-500 bg-sky-50/50 shadow-sm'
              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm active:scale-[0.99]'
          ]"
        >
          <!-- Corner checkmark badge with animation -->
          <div :class="[
            'absolute top-0 right-0 transition-all duration-300',
            selected[idx] ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          ]">
            <div class="relative w-11 h-11">
              <!-- Triangle background -->
              <svg class="w-11 h-11 text-sky-600" viewBox="0 0 44 44" fill="currentColor">
                <path d="M44 0 L44 44 L0 0 Z" />
              </svg>
              <!-- Checkmark icon - centered in triangle -->
              <svg
                class="absolute top-1.5 right-1.5 w-3.5 h-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="3.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="flex-1 min-w-0 pr-6">
              <div :class="[
                'font-semibold text-base leading-tight transition-colors',
                selected[idx] ? 'text-sky-900' : 'text-slate-900'
              ]">
                {{ p.firstName }} {{ p.lastName }}
              </div>
              <div class="flex items-center gap-2 mt-2">
                <span :class="[
                  'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium',
                  selected[idx] ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-600'
                ]">
                  {{ p.paxType }}
                </span>
                <span :class="[
                  'text-xs',
                  selected[idx] ? 'text-sky-700' : 'text-slate-500'
                ]">
                  {{ p.seat ? `Seat ${p.seat}` : 'No seat assigned' }}
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Floating Select All button - subtle secondary action -->
    <div class="fixed bottom-20 left-0 right-0 z-30 pointer-events-none">
      <div class="max-w-3xl mx-auto px-4 flex justify-end">
        <button
          type="button"
          @click="toggleAll"
          class="pointer-events-auto px-4 py-2.5 mb-2 bg-white/95 backdrop-blur-sm text-slate-600 rounded-xl shadow-md border border-slate-200 font-medium text-sm hover:bg-white hover:text-slate-700 hover:border-slate-300 active:scale-95 transition-all touch-manipulation flex items-center gap-2"
        >
          <template v-if="allSelected">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Clear All</span>
          </template>
          <template v-else>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Select All</span>
          </template>
        </button>
      </div>
    </div>

    <!-- Sticky action buttons -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-30 safe-area-inset-bottom">
      <div class="max-w-3xl mx-auto px-4 py-3 flex gap-3">
        <button
          v-if="onBack"
          type="button"
          @click="onBack"
          class="flex-1 inline-flex items-center justify-center rounded-lg border-2 border-slate-300 px-4 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] touch-manipulation"
        >
          Back
        </button>
        <button
          type="button"
          :disabled="!anySelected"
          @click="handleContinue"
          class="flex-1 inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-3.5 text-base font-semibold hover:bg-sky-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>
