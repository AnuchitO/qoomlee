package main

import (
	"log"
	"os"

	"github.com/anuchito/qoomlee/backend/checkin-service/handlers"
	"github.com/anuchito/qoomlee/backend/checkin-service/models"
	"github.com/anuchito/qoomlee/backend/checkin-service/services"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Set up Gin
	r := gin.Default()

	// Set up database connection
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "host=localhost user=qoomlee_user password=qoomlee_pass dbname=qoomlee_checkin port=5432 sslmode=disable"
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate schema
	db.AutoMigrate(&models.Booking{}, &models.Passenger{}, &models.BoardingPass{})

	// Initialize services
	checkinService := services.NewCheckInService(db)
	boardingPassService := services.NewBoardingPassService(db)

	// Initialize handlers
	checkinHandler := handlers.NewCheckInHandler(checkinService, boardingPassService)

	// Set up routes
	api := r.Group("/api/v1")
	{
		checkin := api.Group("/checkin")
		{
			checkin.POST("/start", checkinHandler.StartCheckIn)
			checkin.GET("/:pnr/eligibility", checkinHandler.GetCheckInEligibility)
			checkin.GET("/:pnr/flights/:flightId/seats", checkinHandler.GetAvailableSeats)
			checkin.POST("/:pnr/flights/:flightId/seats/:seatId/select", checkinHandler.SelectSeat)
			checkin.POST("/:pnr/baggage", checkinHandler.AddBaggage)
			checkin.POST("/:pnr/complete", checkinHandler.CompleteCheckIn)
			checkin.GET("/:pnr/boarding-pass/:passengerId", checkinHandler.GetBoardingPass)
		}
	}

	// Run server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8082"
	}
	r.Run(":" + port)
}