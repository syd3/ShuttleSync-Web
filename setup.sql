-- save this file then run: sqlite3 shuttlesync.db < setup.sql

-- Admin table
CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Users table (regular users)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    photo TEXT,
    username TEXT NOT NULL UNIQUE,
    phone TEXT,
    email TEXT,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    password_hash TEXT NOT NULL
);

-- Drivers table
CREATE TABLE IF NOT EXISTS drivers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    photo TEXT,
    username TEXT NOT NULL UNIQUE,
    phone TEXT,
    email TEXT,
    platenumber TEXT,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    vehicle_photo TEXT,
    password_hash TEXT NOT NULL
);

-- Shuttle schedules table
CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route TEXT NOT NULL,
    driver_id INTEGER,
    schedule TEXT, -- e.g. "M,T,W,Th,F,Sa,Su" -- split "," for frontend display.
    FOREIGN KEY (driver_id) REFERENCES drivers(id)
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    feedback TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);