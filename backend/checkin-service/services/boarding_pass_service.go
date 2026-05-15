package services

import (
	"errors"
	"fmt"
	"time"

	"github.com/anuchito/qoomlee/backend/checkin-service/models"
	"gorm.io/gorm"
)

type BoardingPassService struct {
	db *gorm.DB
}

func NewBoardingPassService(db *gorm.DB) *BoardingPassService {
	return &BoardingPassService{db: db}
}

func (s *BoardingPassService) CreateBoardingPass(pnr string, passengerId uint) (*models.BoardingPass, error) {
	// Get the passenger and associated booking
	var passenger models.Passenger
	result := s.db.First(&passenger, passengerId)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("passenger with ID %d not found", passengerId)
		}
		return nil, result.Error
	}

	var booking models.Booking
	result = s.db.Where("pnr = ?", pnr).First(&booking)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("booking with PNR %s not found", pnr)
		}
		return nil, result.Error
	}

	if passenger.BookingID != booking.ID {
		return nil, fmt.Errorf("passenger does not belong to the specified booking")
	}

	// Get the first flight segment for simplicity
	if len(booking.FlightSegments) == 0 {
		return nil, fmt.Errorf("no flight segments found for booking %s", pnr)
	}

	flightSegment := booking.FlightSegments[0]

	// Create boarding pass
	boardPass := models.BoardingPass{
		PNR:           pnr,
		PassengerID:   passenger.ID,
		PassengerName: fmt.Sprintf("%s %s", passenger.FirstName, passenger.LastName),
		FlightNumber:  flightSegment.FlightNumber,
		Origin:        flightSegment.OriginCode,
		Destination:   flightSegment.DestinationCode,
		DepartureTime: flightSegment.DepartureTime,
		Gate:          "TBD", // This would come from flight info
		BoardingTime:  flightSegment.DepartureTime.Add(-30 * time.Minute), // Typically 30 mins before departure
		SeatNumber:    passenger.SeatNumber,
		QRCodeData:    fmt.Sprintf("%s_%d_%s", pnr, passenger.ID, flightSegment.FlightNumber),
		Status:        "active",
		IssuedAt:      time.Now(),
	}

	result = s.db.Create(&boardPass)
	if result.Error != nil {
		return nil, result.Error
	}

	return &boardPass, nil
}

func (s *BoardingPassService) GetBoardingPass(pnr string, passengerId uint) (*models.BoardingPass, error) {
	var boardPass models.BoardingPass
	result := s.db.Where("pnr = ? AND passenger_id = ?", pnr, passengerId).First(&boardPass)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("boarding pass not found for PNR %s and passenger ID %d", pnr, passengerId)
		}
		return nil, result.Error
	}

	return &boardPass, nil
}

func (s *BoardingPassService) GetAllBoardingPassesForBooking(pnr string) ([]models.BoardingPass, error) {
	var boardPasses []models.BoardingPass
	result := s.db.Where("pnr = ?", pnr).Find(&boardPasses)
	if result.Error != nil {
		return nil, result.Error
	}

	return boardPasses, nil
}

func (s *BoardingPassService) UpdateBoardingPassStatus(pnr string, passengerId uint, status string) error {
	var boardPass models.BoardingPass
	result := s.db.Where("pnr = ? AND passenger_id = ?", pnr, passengerId).First(&boardPass)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return fmt.Errorf("boarding pass not found for PNR %s and passenger ID %d", pnr, passengerId)
		}
		return result.Error
	}

	boardPass.Status = status
	result = s.db.Save(&boardPass)
	return result.Error
}