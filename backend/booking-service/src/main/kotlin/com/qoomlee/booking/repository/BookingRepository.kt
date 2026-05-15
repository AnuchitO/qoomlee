package com.qoomlee.booking.repository

import com.qoomlee.booking.entity.Booking
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface BookingRepository : JpaRepository<Booking, UUID> {
    fun findByPnr(pnr: String): Booking?
    fun findByPnrAndPassengersLastName(pnr: String, lastName: String): Booking?
}