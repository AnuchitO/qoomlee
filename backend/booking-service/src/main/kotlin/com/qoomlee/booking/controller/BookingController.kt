package com.qoomlee.booking.controller

import com.qoomlee.booking.dto.BookingRequestDto
import com.qoomlee.booking.dto.BookingResponseDto
import com.qoomlee.booking.dto.BookingUpdateDto
import com.qoomlee.booking.service.BookingService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/v1/bookings")
class BookingController(
    private val bookingService: BookingService
) {

    @PostMapping
    fun createBooking(@RequestBody request: BookingRequestDto): ResponseEntity<BookingResponseDto> {
        val booking = bookingService.createBooking(request)
        return ResponseEntity.status(HttpStatus.CREATED).body(booking)
    }

    @GetMapping("/{id}")
    fun getBookingById(@PathVariable id: UUID): ResponseEntity<BookingResponseDto> {
        val booking = bookingService.getBookingById(id)
        return if (booking != null) {
            ResponseEntity.ok(booking)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/{pnr}")
    fun getBookingByPNR(
        @PathVariable pnr: String,
        @RequestParam lastName: String
    ): ResponseEntity<BookingResponseDto> {
        val booking = bookingService.getBookingByPNR(pnr, lastName)
        return if (booking != null) {
            ResponseEntity.ok(booking)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PutMapping("/{id}")
    fun updateBooking(
        @PathVariable id: UUID,
        @RequestBody updateDto: BookingUpdateDto
    ): ResponseEntity<BookingResponseDto> {
        val booking = bookingService.updateBooking(id, updateDto)
        return if (booking != null) {
            ResponseEntity.ok(booking)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    fun cancelBooking(@PathVariable id: UUID): ResponseEntity<Void> {
        val success = bookingService.cancelBooking(id)
        return if (success) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}