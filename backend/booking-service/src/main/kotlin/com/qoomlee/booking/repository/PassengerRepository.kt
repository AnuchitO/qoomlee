package com.qoomlee.booking.repository

import com.qoomlee.booking.entity.Passenger
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface PassengerRepository : JpaRepository<Passenger, UUID>