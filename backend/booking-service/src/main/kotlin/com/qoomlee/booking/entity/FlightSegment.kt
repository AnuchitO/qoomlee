package com.qoomlee.booking.entity

import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "flight_segments")
data class FlightSegment(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    val booking: Booking? = null,

    var flightNumber: String,

    var airline: String,

    var aircraftType: String,

    @Embedded
    var origin: AirportInfo,

    @Embedded
    var destination: AirportInfo,

    var departureTime: LocalDateTime,

    var arrivalTime: LocalDateTime,

    var durationMinutes: Int,

    var stops: Int = 0,

    var layoverDurationMinutes: Int? = null,

    var fareClass: String = "economy",

    var price: Double
)

@Embeddable
data class AirportInfo(
    var code: String,
    var name: String,
    var city: String,
    var country: String
)