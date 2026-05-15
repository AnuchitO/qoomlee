package com.qoomlee.booking.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "bookings")
data class Booking(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @Column(unique = true, nullable = false)
    var pnr: String,

    @CreationTimestamp
    val createdAt: LocalDateTime? = null,

    @UpdateTimestamp
    val updatedAt: LocalDateTime? = null,

    @OneToMany(mappedBy = "booking", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    val passengers: MutableList<Passenger> = mutableListOf(),

    @OneToMany(mappedBy = "booking", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    val flightSegments: MutableList<FlightSegment> = mutableListOf(),

    var totalPrice: Double,

    var currency: String = "USD",

    @Enumerated(EnumType.STRING)
    var status: BookingStatus = BookingStatus.PENDING,

    @Enumerated(EnumType.STRING)
    var paymentStatus: PaymentStatus = PaymentStatus.PENDING
)

enum class BookingStatus {
    PENDING, CONFIRMED, CANCELLED
}

enum class PaymentStatus {
    PENDING, PROCESSING, PAID, FAILED
}