package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/glebarez/sqlite"
	"github.com/mayajenk/CEN3031/models"
	"github.com/wader/gormstore/v2"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("db/users.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}

	sessionDB, err := gorm.Open(sqlite.Open("db/sessions.db"), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	store := gormstore.New(sessionDB, []byte(os.Getenv("SESSION_KEY")))

	// Periodically clean up sessions
	quit := make(chan struct{})
	go store.PeriodicCleanup(1*time.Hour, quit)

	db.AutoMigrate(&models.User{})

	host := "0.0.0.0:8080"
	fmt.Println("Serving on " + host)
	if err := http.ListenAndServe(host, httpHandler(store, db)); err != nil {
		log.Fatalf("Failed to listen on %s: %v", host, err)
	}
}
