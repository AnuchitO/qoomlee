package services

import (
	"errors"
	"fmt"
	"time"

	"github.com/anuchito/qoomlee/backend/checkin-service/models"
	"gorm.io/gorm"
)

type CheckInService struct {
	db *gorm.DB
}

func NewCheckInService(db *gorm.DB) *CheckInService {
	return &CheckInService{db: db}
}

type CheckInRequest struct {
	PNR      string `json:"pnr" binding:"required"`
	LastName string `json:"lastName" binding:"required"`
}

type CheckInResponse struct {
	Booking           models.Booking     `json:"booking"`
	EligiblePassengers []models.Passenger `json:"eligiblePassengers"`
	CheckInStatus     string             `json:"checkInStatus"`
	IneligibleReasons []string           `json:"ineligibleReasons,omitempty"`
	AvailableServices []AvailableService `json:"availableServices,omitempty"`
}

type AvailableService struct {
	Type   string  `json:"type"`   // seat, baggage, meal, wifi
	Cost   float64 `json:"cost"`   // in USD
	Active bool    `json:"active"` // whether service is available
}

func (s *CheckInService) StartCheckIn(req CheckInRequest) (*CheckInResponse, error) {
	var booking models.Booking
	result := s.db.Preload("Passengers").Preload("FlightSegments").Where("pnr = ?", req.PNR).First(&booking)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("booking with PNR %s not found", req.PNR)
		}
		return nil, result.Error
	}

	// Verify that at least one passenger matches the last name
	passengerMatch := false
	for _, passenger := range booking.Passengers {
		if passenger.LastName == req.LastName {
			passengerMatch = true
			break
		}
	}

	if !passengerMatch {
		return nil, fmt.Errorf("no passenger with last name %s found in booking %s", req.LastName, req.PNR)
	}

	// Check eligibility for check-in
	// Check if booking is confirmed
	if booking.Status != "confirmed" {
		return &CheckInResponse{
			Booking:           booking,
			EligiblePassengers: []models.Passenger{},
			CheckInStatus:     "ineligible",
			IneligibleReasons: []string{"Booking is not confirmed"},
		}, nil
	}

	// Check if check-in is within allowed time window (24 hours before departure to 45 minutes before departure)
	flightSegment := booking.FlightSegments[0] // For simplicity, checking first flight
	timeUntilDeparture := flightSegment.DepartureTime.Sub(time.Now())

	if timeUntilDeparture.Hours() > 24 || timeUntilDeparture.Minutes() < 45 {
		return &CheckInResponse{
			Booking:           booking,
			EligiblePassengers: []models.Passenger{},
			CheckInStatus:     "ineligible",
			IneligibleReasons: []string{"Check-in is not available yet or has closed"},
		}, nil
	}

	// Filter eligible passengers
	var eligiblePassengers []models.Passenger
	for _, passenger := range booking.Passengers {
		if passenger.CheckInStatus == "not_checked_in" {
			eligiblePassengers = append(eligiblePassengers, passenger)
		}
	}

	// Update booking status to in-progress
	booking.CheckInStatus = "in_progress"
	s.db.Save(&booking)

	response := &CheckInResponse{
		Booking:           booking,
		EligiblePassengers: eligiblePassengers,
		CheckInStatus:     "eligible",
		AvailableServices: []AvailableService{
			{Type: "seat", Cost: 0, Active: true},
			{Type: "baggage", Cost: 25, Active: true},
		},
	}

	return response, nil
}

func (s *CheckInService) GetCheckInEligibility(pnr string) (*CheckInResponse, error) {
	var booking models.Booking
	result := s.db.Preload("Passengers").Preload("FlightSegments").Where("pnr = ?", pnr).First(&booking)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("booking with PNR %s not found", pnr)
		}
		return nil, result.Error
	}

	// Check eligibility for check-in
	if booking.Status != "confirmed" {
		return &CheckInResponse{
			Booking:           booking,
			EligiblePassengers: []models.Passenger{},
			CheckInStatus:     "ineligible",
			IneligibleReasons: []string{"Booking is not confirmed"},
		}, nil
	}

	// Check if check-in is within allowed time window
	flightSegment := booking.FlightSegments[0] // For simplicity, checking first flight
	timeUntilDeparture := flightSegment.DepartureTime.Sub(time.Now())

	if timeUntilDeparture.Hours() > 24 || timeUntilDeparture.Minutes() < 45 {
		return &CheckInResponse{
			Booking:           booking,
			EligiblePassengers: []models.Passenger{},
			CheckInStatus:     "ineligible",
			IneligibleReasons: []string{"Check-in is not available yet or has closed"},
		}, nil
	}

	// Filter eligible passengers
	var eligiblePassengers []models.Passenger
	for _, passenger := range booking.Passengers {
		if passenger.CheckInStatus == "not_checked_in" {
			eligiblePassengers = append(eligiblePassengers, passenger)
		}
	}

	response := &CheckInResponse{
		Booking:           booking,
		EligiblePassengers: eligiblePassengers,
		CheckInStatus:     "eligible",
		AvailableServices: []AvailableService{
			{Type: "seat", Cost: 0, Active: true},
			{Type: "baggage", Cost: 25, Active: true},
		},
	}

	return response, nil
}

func (s *CheckInService) GetAvailableSeats(pnr string, flightId uint) ([]models.Seat, error) {
	// First verify the booking exists and is eligible for check-in
	resp, err := s.GetCheckInEligibility(pnr)
	if err != nil {
		return nil, err
	}

	if resp.CheckInStatus != "eligible" {
		return nil, fmt.Errorf("booking %s is not eligible for check-in", pnr)
	}

	var seats []models.Seat
	result := s.db.Where("flight_segment_id = ? AND available = ?", flightId, true).Find(&seats)
	if result.Error != nil {
		return nil, result.Error
	}

	return seats, nil
}

func (s *CheckInService) SelectSeat(pnr string, flightId uint, seatId uint, passengerId uint) error {
	// Verify eligibility
	resp, err := s.GetCheckInEligibility(pnr)
	if err != nil {
		return err
	}

	if resp.CheckInStatus != "eligible" {
		return fmt.Errorf("booking %s is not eligible for seat selection", pnr)
	}

	// Check if the seat is available
	var seat models.Seat
	result := s.db.First(&seat, seatId)
	if result.Error != nil {
		return result.Error
	}

	if !seat.Available {
		return fmt.Errorf("seat %s is not available", seat.Number)
	}

	// Check if the passenger belongs to this booking
	var passenger models.Passenger
	result = s.db.First(&passenger, passengerId)
	if result.Error != nil {
		return result.Error
	}

	var booking models.Booking
	result = s.db.Where("pnr = ?", pnr).First(&booking)
	if result.Error != nil {
		return result.Error
	}

	if passenger.BookingID != booking.ID {
		return fmt.Errorf("passenger does not belong to this booking")
	}

	// Update seat availability
	seat.Available = false
	seat.OccupiedBy = &passengerId
	s.db.Save(&seat)

	// Update passenger's seat assignment
	passenger.SeatNumber = seat.Number
	s.db.Save(&passenger)

	return nil
}

func (s *CheckInService) AddBaggage(pnr string, baggage []models.BaggageAllowance) error {
	// Verify eligibility
	resp, err := s.GetCheckInEligibility(pnr)
	if err != nil {
		return err
	}

	if resp.CheckInStatus != "eligible" {
		return fmt.Errorf("booking %s is not eligible for adding baggage", pnr)
	}

	// Add baggage allowance records
	for i := range baggage {
		baggage[i].BookingID = resp.Booking.ID
		result := s.db.Create(&baggage[i])
		if result.Error != nil {
			return result.Error
		}
	}

	return nil
}