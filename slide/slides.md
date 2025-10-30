---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: Welcome to Slidev
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# apply UnoCSS classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
# duration of the presentation
duration: 35min
---

# Welcome to Slidev

Presentation slides for developers

<div @click="$slidev.nav.next" class="mt-12 py-1" hover:bg="white op-10">
  Press Space for next page <carbon:arrow-right />
</div>

<div class="abs-br m-6 text-xl">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="slidev-icon-btn">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" class="slidev-icon-btn">
    <carbon:logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
layout: center
---

<div class="flex flex-col items-center justify-center h-full">
  <h1 class="mb-2 mt-8">Check-in Form</h1>
  
  <div class="max-w-2xl mx-auto scale-90">
    <CheckinFormVue 
      :onSubmit="handleCheckinSubmit"
      initialLastName=""
      initialBookingRef=""
      :autoSubmit="false"
    />
  </div>
</div>

<script setup>
import { ref } from 'vue'
import { PaxType } from './types/passenger'

// Store data globally using Slidev's context
if (!window.checkinData) {
  window.checkinData = {
    booking: 'ABC123',
    mockPassengers: [
      { firstName: 'Alex', lastName: 'Huum', paxType: PaxType.ADT, seat: '12A', checkedIn: false },
      { firstName: 'John', lastName: 'Smith', paxType: PaxType.CHD, seat: '12B', checkedIn: false },
    ]
  }
}

const handleCheckinSubmit = async (payload) => {
  console.log('Form submitted:', payload)
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Validate credentials - check if last name is Huum and booking ref is ABC123
  if (payload.lastName !== 'HUUM' || payload.bookingRef !== 'ABC123') {
    // Throw error to show error message in form
    throw new Error('Booking not found')
  }
  
  // If valid, store booking and navigate
  window.checkinData.booking = payload
  const slidev = window.__slidev__
  if (slidev && slidev.nav) {
    slidev.nav.next()
  }
}
</script>

---
layout: center
---

<div class="flex flex-col items-center justify-center h-full">
  <h1 class="mb-2 mt-8">Select Passengers</h1>
  
  <div class="max-w-2xl mx-auto scale-90">
    <PassengerSelectVue 
      :passengers="mockPassengers" 
      :onNext="handlePassengerNext"
      :onBack="handlePassengerBack"
    />
  </div>
</div>

<script setup>
import { ref } from 'vue'

const mockPassengers = ref(window.checkinData?.mockPassengers || [])

const handlePassengerNext = (selected) => {
  console.log('Selected passengers:', selected)
  window.checkinData.selectedPassengers = selected
  alert(`${selected.length} passenger(s) selected for check-in`)
  // Could navigate to next slide if you have more steps
  // $nav.next()
}

const handlePassengerBack = () => {
  const slidev = window.__slidev__
  if (slidev && slidev.nav) {
    slidev.nav.prev()
  }
}
</script>

---
