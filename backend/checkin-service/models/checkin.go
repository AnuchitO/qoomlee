package models

import (
	"time"

	"gorm.io/gorm"
)

type BaseModel struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
}

type Booking struct {
	BaseModel
	PNR            string         `gorm:"uniqueIndex;not null" json:"pnr"`
	Status         string         `gorm:"default:confirmed" json:"status"` // confirmed, cancelled, etc.
	CheckInStatus  string         `gorm:"default:not_started" json:"checkInStatus"` // not_started, in_progress, completed
	Passengers     []Passenger    `json:"passengers"`
	FlightSegments []FlightSegment `json:"flightSegments"`
}

type Passenger struct {
	BaseModel
	BookingID       uint   `json:"bookingId"`
	FirstName       string `json:"firstName"`
	LastName        string `json:"lastName"`
	DateOfBirth     time.Time `json:"dateOfBirth"`
	Gender          string `json:"gender"` // male, female, other
	Nationality     string `json:"nationality"`
	PassportNumber  string `json:"passportNumber"`
	PassportExpiry  *time.Time `json:"passportExpiry"`
	ContactEmail    string `json:"contactEmail"`
	ContactPhone    string `json:"contactPhone"`
	SpecialAssistance string `json:"specialAssistance"`
	SeatNumber      string `json:"seatNumber"`
	CheckInStatus   string `gorm:"default:not_checked_in" json:"checkInStatus"` // not_checked_in, checked_in
}

type FlightSegment struct {
	BaseModel
	BookingID            uint      `json:"bookingId"`
	FlightNumber         string    `json:"flightNumber"`
	Airline              string    `json:"airline"`
	AircraftType         string    `json:"aircraftType"`
	OriginCode           string    `json:"originCode"`
	OriginName           string    `json:"originName"`
	OriginCity           string    `json:"originCity"`
	OriginCountry        string    `json:"originCountry"`
	DestinationCode      string    `json:"destinationCode"`
	DestinationName      string    `json:"destinationName"`
	DestinationCity      string    `json:"destinationCity"`
	DestinationCountry   string    `json:"destinationCountry"`
	DepartureTime        time.Time `json:"departureTime"`
	ArrivalTime          time.Time `json:"arrivalTime"`
	DurationMinutes      int       `json:"durationMinutes"`
	Stops                int       `json:"stops"`
	LayoverDurationMinutes *int     `json:"layoverDurationMinutes"`
	FareClass            string    `json:"fareClass"`
	Price                float64   `json:"price"`
}

type BoardingPass struct {
	BaseModel
	PNR             string    `json:"pnr"`
	PassengerID     uint      `json:"passengerId"`
	PassengerName   string    `json:"passengerName"`
	FlightNumber    string    `json:"flightNumber"`
	Origin          string    `json:"origin"`
	Destination     string    `json:"destination"`
	DepartureTime   time.Time `json:"departureTime"`
	Gate            string    `json:"gate"`
	BoardingTime    time.Time `json:"boardingTime"`
	SeatNumber      string    `json:"seatNumber"`
	QRCodeData      string    `json:"qrCodeData"`
	Status          string    `json:"status"` // active, cancelled
	IssuedAt        time.Time `json:"issuedAt"`
}

type Seat struct {
	BaseModel
	FlightSegmentID uint   `json:"flightSegmentId"`
	Number          string `gorm:"uniqueIndex:idx_flight_seat" json:"number"`
	Type            string `json:"type"` // standard, exit-row, aisle, window, extra-legroom
	Price           float64 `json:"price"`
	Available       bool   `json:"available"`
	OccupiedBy      *uint  `json:"occupiedBy"` // Passenger ID
}

type BaggageAllowance struct {
	BaseModel
	BookingID      uint  `json:"bookingId"`
	PassengerID    uint  `json:"passengerId"`
	Type           string `json:"type"` // carry-on, checked, extra-checked
	WeightLimitKg  float64 `json:"weightLimitKg"`
	Quantity       int    `json:"quantity"`
	AdditionalCost float64 `json:"additionalCost"`
}