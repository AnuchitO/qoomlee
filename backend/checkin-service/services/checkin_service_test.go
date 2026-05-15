package services

import (
	"testing"
	"time"

	"github.com/anuchito/qoomlee/backend/checkin-service/models"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupTestDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&models.Booking{}, &models.Passenger{}, &models.FlightSegment{})

	return db
}

func TestCheckInService_StartCheckIn(t *testing.T) {
	db := setupTestDB()
	service := NewCheckInService(db)

	// Create a test booking
	booking := models.Booking{
		PNR:    "ABC123",
		Status: "confirmed",
	}
	db.Create(&booking)

	// Add a passenger to the booking
	passenger := models.Passenger{
		BookingID:   booking.ID,
		FirstName:   "John",
		LastName:    "Doe",
		DateOfBirth: time.Date(1990, 1, 1, 0, 0, 0, 0, time.UTC),
		Gender:      "male",
	}
	db.Create(&passenger)

	// Add a flight segment to the booking
	flightSegment := models.FlightSegment{
		BookingID:    booking.ID,
		FlightNumber: "QL101",
		Airline:      "Qoomlee Air",
		AircraftType: "Boeing 787",
		OriginCode:   "BKK",
		OriginName:   "Suvarnabhumi Airport",
		OriginCity:   "Bangkok",
		OriginCountry: "Thailand",
		DestinationCode: "SIN",
		DestinationName: "Changi Airport",
		DestinationCity: "Singapore",
		DestinationCountry: "Singapore",
		DepartureTime: time.Now().AddDate(0, 0, 7), // 7 days from now
		ArrivalTime:   time.Now().AddDate(0, 0, 7).Add(4 * time.Hour).Add(15 * time.Minute), // 4h 15m flight
		DurationMinutes: 255,
		Stops: 0,
		FareClass: "economy",
		Price: 450.0,
	}
	db.Create(&flightSegment)

	req := CheckInRequest{
		PNR:      "ABC123",
		LastName: "Doe",
	}

	resp, err := service.StartCheckIn(req)
	assert.NoError(t, err)
	assert.NotNil(t, resp)
	assert.Equal(t, "ABC123", resp.Booking.PNR)
}

func TestCheckInService_GetCheckInEligibility(t *testing.T) {
	db := setupTestDB()
	service := NewCheckInService(db)

	// Create a test booking
	booking := models.Booking{
		PNR:    "XYZ789",
		Status: "confirmed",
	}
	db.Create(&booking)

	// Add a flight segment to the booking
	flightSegment := models.FlightSegment{
		BookingID:    booking.ID,
		FlightNumber: "QL102",
		Airline:      "Qoomlee Air",
		AircraftType: "Airbus A350",
		OriginCode:   "SIN",
		OriginName:   "Changi Airport",
		OriginCity:   "Singapore",
		OriginCountry: "Singapore",
		DestinationCode: "BKK",
		DestinationName: "Suvarnabhumi Airport",
		DestinationCity: "Bangkok",
		DestinationCountry: "Thailand",
		DepartureTime: time.Now().AddDate(0, 0, 14), // 14 days from now
		ArrivalTime:   time.Now().AddDate(0, 0, 14).Add(4 * time.Hour).Add(30 * time.Minute), // 4h 30m flight
		DurationMinutes: 270,
		Stops: 0,
		FareClass: "economy",
		Price: 450.0,
	}
	db.Create(&flightSegment)

	resp, err := service.GetCheckInEligibility("XYZ789")
	assert.NoError(t, err)
	assert.NotNil(t, resp)
	assert.Equal(t, "XYZ789", resp.Booking.PNR)
}