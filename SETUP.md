# TropiStay — XAMPP MySQL Setup Guide

## What was added
- `database.sql` — SQL script to create the database and tables
- `api/config.php` — Database connection settings
- `api/auth.php` — Handles user registration & login
- `api/bookings.php` — Saves and retrieves bookings
- `SignLog.html` — Updated to register/login via PHP API
- `bookingScript.js` — Updated to save confirmed bookings to MySQL

No UI changes were made. All existing styles, layouts, and pages are unchanged.

---

## Step-by-Step Setup

### 1. Start XAMPP
- Open XAMPP Control Panel
- Start **Apache** and **MySQL**

### 2. Copy the project folder
- Copy the entire `Group-5-db` folder into:
  ```
  C:\xampp\htdocs\Group-5-db
  ```

### 3. Create the database
- Open your browser and go to: `http://localhost/phpmyadmin`
- Click **"New"** in the left sidebar to create a new database
  - OR click **SQL** at the top
- Paste the contents of `database.sql` and click **Go**

  This creates:
  - Database: `tropistay_db`
  - Table: `users` (for accounts)
  - Table: `bookings` (for reservations)

### 4. Check your database credentials
- Open `api/config.php`
- Default XAMPP settings (no changes needed for most users):
  ```php
  define('DB_HOST', 'localhost');
  define('DB_USER', 'root');
  define('DB_PASS', '');        // Empty by default in XAMPP
  define('DB_NAME', 'tropistay_db');
  ```
- If you set a MySQL password in XAMPP, update `DB_PASS` here.

### 5. Open the website
- Go to: `http://localhost/Group-5-db/index.html`

---

## How it works

### Accounts (SignLog.html)
- User enters email + password and clicks **Continue → Sign in**
- If the email is **new**, it automatically **registers** the account
- If the email exists, it **logs in** and verifies the password
- Passwords are securely **hashed** using bcrypt (never stored as plain text)

### Bookings (booking-step3.html)
- When a booking is confirmed on Step 3, the booking data is automatically **sent to MySQL**
- Data saved includes: guest info, room type, dates, nights, price, payment method

---

## Database Tables

### `users`
| Column | Type | Description |
|---|---|---|
| id | INT | Auto-increment primary key |
| email | VARCHAR | Unique email address |
| password | VARCHAR | Bcrypt hashed password |
| first_name | VARCHAR | Optional, filled on first booking |
| last_name | VARCHAR | Optional |
| country | VARCHAR | Optional |
| phone | VARCHAR | Optional |
| created_at | TIMESTAMP | Account creation time |

### `bookings`
| Column | Type | Description |
|---|---|---|
| id | INT | Auto-increment primary key |
| booking_id | VARCHAR | Unique booking code |
| booking_reference | VARCHAR | Reference number shown to user |
| user_email | VARCHAR | Email of the user who booked |
| first_name / last_name | VARCHAR | Guest name |
| room_type | VARCHAR | Selected room |
| room_quantity | INT | Number of rooms |
| total_price | DECIMAL | Total price in PHP |
| check_in / check_out | DATE | Stay dates |
| nights | INT | Length of stay |
| payment_method | VARCHAR | e.g. Credit Card |
| status | VARCHAR | Default: 'confirmed' |
| created_at | TIMESTAMP | When booking was made |

---

## Viewing data in phpMyAdmin
1. Go to `http://localhost/phpmyadmin`
2. Click `tropistay_db` in the left panel
3. Click `users` or `bookings` to browse records
