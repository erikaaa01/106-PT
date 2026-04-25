-- ============================================
-- TropiStay Database Setup
-- Run this in phpMyAdmin or MySQL console
-- ============================================

CREATE DATABASE IF NOT EXISTS tropistay_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tropistay_db;

-- ============================================
-- USERS TABLE (accounts)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    country VARCHAR(100),
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- BOOKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(20) NOT NULL UNIQUE,
    booking_reference VARCHAR(20) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    phone VARCHAR(50),
    special_requests TEXT,
    booking_for VARCHAR(100),
    travelling_for_work VARCHAR(10),
    hotel_name VARCHAR(255),
    room_type VARCHAR(255) NOT NULL,
    room_quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    nights INT NOT NULL,
    payment_method VARCHAR(50),
    card_last4 VARCHAR(4),
    status VARCHAR(50) DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
