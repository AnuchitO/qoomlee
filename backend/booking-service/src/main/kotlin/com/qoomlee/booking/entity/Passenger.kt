package com.qoomlee.booking.entity

import jakarta.persistence.*
import java.time.LocalDate
import java.util.*

@Entity
@Table(name = "passengers")
data class Passenger(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    val booking: Booking? = null,

    var firstName: String,

    var lastName: String,

    var dateOfBirth: LocalDate,

    @Enumerated(EnumType.STRING)
    var gender: Gender,

    var nationality: String? = null,

    var passportNumber: String? = null,

    var passportExpiry: LocalDate? = null,

    @Embedded
    var contactInfo: ContactInfo? = null,

    var specialAssistance: String? = null
)

enum class Gender {
    MALE, FEMALE, OTHER
}

@Embeddable
data class ContactInfo(
    var email: String,
    var phone: String,
    var countryCode: String
)