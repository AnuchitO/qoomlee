package handlers

import (
	"net/http"
	"strconv"

	"github.com/anuchito/qoomlee/backend/checkin-service/models"
	"github.com/anuchito/qoomlee/backend/checkin-service/services"
	"github.com/gin-gonic/gin"
)

type CheckInHandler struct {
	checkinService      *services.CheckInService
	boardingPassService *services.BoardingPassService
}

func NewCheckInHandler(checkinService *services.CheckInService, boardingPassService *services.BoardingPassService) *CheckInHandler {
	return &CheckInHandler{
		checkinService:      checkinService,
		boardingPassService: boardingPassService,
	}
}

// StartCheckIn godoc
// @Summary Start the check-in process
// @Description Initiates the check-in process for a booking
// @Tags checkin
// @Accept json
// @Produce json
// @Param checkinReq body services.CheckInRequest true "Check-in request"
// @Success 200 {object} services.CheckInResponse
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Router /checkin/start [post]
func (h *CheckInHandler) StartCheckIn(c *gin.Context) {
	var req services.CheckInRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp, err := h.checkinService.StartCheckIn(req)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, resp)
}

// GetCheckInEligibility godoc
// @Summary Get check-in eligibility status
// @Description Checks if a booking is eligible for check-in
// @Tags checkin
// @Produce json
// @Param pnr path string true "Booking PNR"
// @Success 200 {object} services.CheckInResponse
// @Failure 404 {object} map[string]string
// @Router /checkin/{pnr}/eligibility [get]
func (h *CheckInHandler) GetCheckInEligibility(c *gin.Context) {
	pnr := c.Param("pnr")

	resp, err := h.checkinService.GetCheckInEligibility(pnr)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, resp)
}

// GetAvailableSeats godoc
// @Summary Get available seats for a flight
// @Description Retrieves all available seats for a specific flight in a booking
// @Tags checkin
// @Produce json
// @Param pnr path string true "Booking PNR"
// @Param flightId path string true "Flight Segment ID"
// @Success 200 {array} models.Seat
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Router /checkin/{pnr}/flights/{flightId}/seats [get]
func (h *CheckInHandler) GetAvailableSeats(c *gin.Context) {
	pnr := c.Param("pnr")

	flightIdStr := c.Param("flightId")
	flightId, err := strconv.ParseUint(flightIdStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid flight ID"})
		return
	}

	seats, err := h.checkinService.GetAvailableSeats(pnr, uint(flightId))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, seats)
}

// SelectSeat godoc
// @Summary Select a seat for a passenger
// @Description Assigns a specific seat to a passenger
// @Tags checkin
// @Accept json
// @Produce json
// @Param pnr path string true "Booking PNR"
// @Param flightId path string true "Flight Segment ID"
// @Param seatId path string true "Seat ID"
// @Success 200 {object} map[string]string
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Router /checkin/{pnr}/flights/{flightId}/seats/{seatId}/select [post]
func (h *CheckInHandler) SelectSeat(c *gin.Context) {
	pnr := c.Param("pnr")

	flightIdStr := c.Param("flightId")
	flightId, err := strconv.ParseUint(flightIdStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid flight ID"})
		return
	}

	seatIdStr := c.Param("seatId")
	seatId, err := strconv.ParseUint(seatIdStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid seat ID"})
		return
	}

	// We need to get the passenger ID from the request body
	var req struct {
		PassengerId uint `json:"passengerId" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = h.checkinService.SelectSeat(pnr, uint(flightId), uint(seatId), req.PassengerId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Seat selected successfully"})
}

// AddBaggage godoc
// @Summary Add baggage to a booking during check-in
// @Description Adds baggage allowance to a booking during check-in
// @Tags checkin
// @Accept json
// @Produce json
// @Param pnr path string true "Booking PNR"
// @Param baggageReq body []models.BaggageAllowance true "Baggage allowance details"
// @Success 200 {object} map[string]string
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Router /checkin/{pnr}/baggage [post]
func (h *CheckInHandler) AddBaggage(c *gin.Context) {
	pnr := c.Param("pnr")

	var baggage []models.BaggageAllowance
	if err := c.ShouldBindJSON(&baggage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.checkinService.AddBaggage(pnr, baggage)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Baggage added successfully"})
}

// CompleteCheckIn godoc
// @Summary Complete the check-in process
// @Description Completes the check-in process and generates boarding passes
// @Tags checkin
// @Accept json
// @Produce json
// @Param pnr path string true "Booking PNR"
// @Param passengerIds body []uint true "List of passenger IDs to check in"
// @Success 200 {array} models.BoardingPass
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Router /checkin/{pnr}/complete [post]
func (h *CheckInHandler) CompleteCheckIn(c *gin.Context) {
	pnr := c.Param("pnr")

	var passengerIds []uint
	if err := c.ShouldBindJSON(&passengerIds); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// For each passenger, create a boarding pass
	var boardingPasses []models.BoardingPass
	for _, passengerId := range passengerIds {
		boardPass, err := h.boardingPassService.CreateBoardingPass(pnr, passengerId)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		boardingPasses = append(boardingPasses, *boardPass)

		// Update passenger check-in status
		// This would require a method in the checkin service to update passenger status
	}

	c.JSON(http.StatusOK, boardingPasses)
}

// GetBoardingPass godoc
// @Summary Get a passenger's boarding pass
// @Description Retrieves the boarding pass for a specific passenger in a booking
// @Tags checkin
// @Produce json
// @Param pnr path string true "Booking PNR"
// @Param passengerId path string true "Passenger ID"
// @Success 200 {object} models.BoardingPass
// @Failure 404 {object} map[string]string
// @Router /checkin/{pnr}/boarding-pass/{passengerId} [get]
func (h *CheckInHandler) GetBoardingPass(c *gin.Context) {
	pnr := c.Param("pnr")

	passengerIdStr := c.Param("passengerId")
	passengerId, err := strconv.ParseUint(passengerIdStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid passenger ID"})
		return
	}

	boardPass, err := h.boardingPassService.GetBoardingPass(pnr, uint(passengerId))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, boardPass)
}