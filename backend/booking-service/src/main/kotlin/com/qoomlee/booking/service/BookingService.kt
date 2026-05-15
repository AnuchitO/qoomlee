package com.qoomlee.booking.service

import com.qoomlee.booking.dto.*
import com.qoomlee.booking.entity.*
import com.qoomlee.booking.repository.BookingRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

@Service
@Transactional
class BookingService(
    private val bookingRepository: BookingRepository
) {

    fun createBooking(request: BookingRequestDto): BookingResponseDto {
        // Generate PNR (6-character alphanumeric code)
        val pnr = generatePNR()

        // Create booking entity
        val booking = Booking(
            pnr = pnr,
            totalPrice = calculateTotalPrice(request), // This would be calculated based on flights and passengers
            currency = "USD",
            status = BookingStatus.PENDING,
            paymentStatus = PaymentStatus.PENDING
        )

        // Add passengers
        request.passengers.forEach { passengerDto ->
            val passenger = Passenger(
                firstName = passengerDto.firstName,
                lastName = passengerDto.lastName,
                dateOfBirth = LocalDate.parse(passengerDto.dateOfBirth),
                gender = Gender.valueOf(passengerDto.gender.uppercase()),
                nationality = passengerDto.nationality,
                passportNumber = passengerDto.passengerDto.passportNumber,
                passportExpiry = passengerDto.passportExpiry?.let { LocalDate.parse(it) },
                contactInfo = ContactInfo(
                    email = passengerDto.contactInfo.email,
                    phone = passengerDto.contactInfo.phone,
                    countryCode = passengerDto.contactInfo.countryCode
                ),
                specialAssistance = passengerDto.specialAssistance
            )
            booking.passengers.add(passenger)
        }

        // Add flight segments (this would come from a flight service in a real implementation)
        // For now, we'll create mock segments
        val outboundSegment = FlightSegment(
            flightNumber = "QL101",
            airline = "Qoomlee Air",
            aircraftType = "Boeing 787",
            origin = AirportInfo("BKK", "Suvarnabhumi Airport", "Bangkok", "Thailand"),
            destination = AirportInfo("SIN", "Changi Airport", "Singapore", "Singapore"),
            departureTime = LocalDateTime.now().plusDays(7),
            arrivalTime = LocalDateTime.now().plusDays(7).plusHours(4).plusMinutes(15),
            durationMinutes = 255, // 4h 15m
            stops = 0,
            fareClass = request.fareClass,
            price = 450.0
        )
        booking.flightSegments.add(outboundSegment)

        if (request.returnFlightId != null) {
            val returnSegment = FlightSegment(
                flightNumber = "QL102",
                airline = "Qoomlee Air",
                aircraftType = "Boeing 787",
                origin = AirportInfo("SIN", "Changi Airport", "Singapore", "Singapore"),
                destination = AirportInfo("BKK", "Suvarnabhumi Airport", "Bangkok", "Thailand"),
                departureTime = LocalDateTime.now().plusDays(14),
                arrivalTime = LocalDateTime.now().plusDays(14).plusHours(4).plusMinutes(30),
                durationMinutes = 270, // 4h 30m
                stops = 0,
                fareClass = request.fareClass,
                price = 450.0
            )
            booking.flightSegments.add(returnSegment)
        }

        val savedBooking = bookingRepository.save(booking)
        return convertToResponseDto(savedBooking)
    }

    fun getBookingByPNR(pnr: String, lastName: String): BookingResponseDto? {
        val booking = bookingRepository.findByPnrAndPassengersLastName(pnr, lastName)
        return booking?.let { convertToResponseDto(it) }
    }

    fun getBookingById(id: UUID): BookingResponseDto? {
        val booking = bookingRepository.findById(id).orElse(null)
        return booking?.let { convertToResponseDto(it) }
    }

    fun updateBooking(id: UUID, updateDto: BookingUpdateDto): BookingResponseDto? {
        val booking = bookingRepository.findById(id).orElse(null) ?: return null

        updateDto.status?.let { booking.status = it }
        updateDto.paymentStatus?.let { booking.paymentStatus = it }

        val updatedBooking = bookingRepository.save(booking)
        return convertToResponseDto(updatedBooking)
    }

    fun cancelBooking(id: UUID): Boolean {
        val booking = bookingRepository.findById(id).orElse(null) ?: return false

        booking.status = BookingStatus.CANCELLED
        bookingRepository.save(booking)
        return true
    }

    private fun generatePNR(): String {
        val chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        return (1..6)
            .map { chars.random() }
            .joinToString("")
    }

    private fun calculateTotalPrice(request: BookingRequestDto): Double {
        // This would be calculated based on flight prices and number of passengers
        // For now, returning a fixed price
        return 450.0 * request.passengers.size
    }

    private fun convertToResponseDto(booking: Booking): BookingResponseDto {
        return BookingResponseDto(
            id = booking.id!!,
            pnr = booking.pnr,
            createdAt = booking.createdAt!!,
            passengers = booking.passengers.map { convertToPassengerDto(it) },
            itinerary = ItineraryDto(
                outbound = convertToFlightSegmentDto(booking.flightSegments.first()),
                return = if (booking.flightSegments.size > 1) convertToFlightSegmentDto(booking.flightSegments[1]) else null
            ),
            totalPrice = booking.totalPrice,
            currency = booking.currency,
            status = booking.status,
            paymentStatus = booking.paymentStatus
        )
    }

    private fun convertToPassengerDto(passenger: Passenger): PassengerDto {
        return PassengerDto(
            id = passenger.id,
            firstName = passenger.firstName,
            lastName = passenger.lastName,
            dateOfBirth = passenger.dateOfBirth.toString(),
            gender = passenger.gender.name.lowercase(),
            nationality = passenger.nationality,
            passportNumber = passenger.passengerNumber,
            passportExpiry = passenger.passportExpiry?.toString(),
            contactInfo = ContactInfoDto(
                email = passenger.contactInfo?.email ?: "",
                phone = passenger.contactInfo?.phone ?: "",
                countryCode = passenger.contactInfo?.countryCode ?: ""
            ),
            specialAssistance = passenger.specialAssistance
        )
    }

    private fun convertToFlightSegmentDto(segment: FlightSegment): FlightSegmentDto {
        return FlightSegmentDto(
            id = segment.id!!,
            flightNumber = segment.flightNumber,
            airline = segment.airline,
            aircraftType = segment.aircraftType,
            origin = AirportInfoDto(
                code = segment.origin.code,
                name = segment.origin.name,
                city = segment.origin.city,
                country = segment.origin.country
            ),
            destination = AirportInfoDto(
                code = segment.destination.code,
                name = segment.destination.name,
                city = segment.destination.city,
                country = segment.destination.country
            ),
            departureTime = segment.departureTime.toString(),
            arrivalTime = segment.arrivalTime.toString(),
            durationMinutes = segment.durationMinutes,
            stops = segment.stops,
            layoverDurationMinutes = segment.layoverDurationMinutes,
            fareClass = segment.fareClass,
            price = segment.price
        )
    }
}