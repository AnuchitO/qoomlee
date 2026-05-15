package com.qoomlee.booking.dto

import com.qoomlee.booking.entity.BookingStatus
import com.qoomlee.booking.entity.PaymentStatus
import java.time.LocalDateTime
import java.util.*

data class BookingRequestDto(
    val outboundFlightId: String,
    val returnFlightId: String? = null,
    val passengers: List<PassengerDto>,
    val fareClass: String = "economy",
    val specialRequests: String? = null
)

data class BookingResponseDto(
    val id: UUID,
    val pnr: String,
    val createdAt: LocalDateTime,
    val passengers: List<PassengerDto>,
    val itinerary: ItineraryDto,
    val totalPrice: Double,
    val currency: String,
    val status: BookingStatus,
    val paymentStatus: PaymentStatus
)

data class PassengerDto(
    val id: UUID? = null,
    val firstName: String,
    val lastName: String,
    val dateOfBirth: String, // ISO date string
    val gender: String,
    val nationality: String? = null,
    val passportNumber: String? = null,
    val passportExpiry: String? = null, // ISO date string
    val contactInfo: ContactInfoDto,
    val specialAssistance: String? = null
)

data class ContactInfoDto(
    val email: String,
    val phone: String,
    val countryCode: String
)

data class ItineraryDto(
    val outbound: FlightSegmentDto,
    val return: FlightSegmentDto? = null
)

data class FlightSegmentDto(
    val id: UUID,
    val flightNumber: String,
    val airline: String,
    val aircraftType: String,
    val origin: AirportInfoDto,
    val destination: AirportInfoDto,
    val departureTime: String, // ISO date string
    val arrivalTime: String, // ISO date string
    val durationMinutes: Int,
    val stops: Int,
    val layoverDurationMinutes: Int? = null,
    val fareClass: String,
    val price: Double
)

data class AirportInfoDto(
    val code: String,
    val name: String,
    val city: String,
    val country: String
)

data class BookingUpdateDto(
    val status: BookingStatus? = null,
    val paymentStatus: PaymentStatus? = null
)