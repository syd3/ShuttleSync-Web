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
    username TEXT NOT NULL UNIQUE,
    given_name TEXT,
    middle_initial TEXT,
    last_name TEXT,
    photo TEXT,
    phone TEXT,
    email TEXT,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    password_hash TEXT NOT NULL
);

-- Drivers table
CREATE TABLE IF NOT EXISTS drivers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    given_name TEXT,
    middle_initial TEXT,
    last_name TEXT,
    photo TEXT,
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
    shuttle_route TEXT NOT NULL,
    driver_username TEXT NOT NULL,
    driver_given_name TEXT,
    driver_middle_initial TEXT,
    driver_last_name TEXT,
    schedule TEXT -- e.g. "M,T,W,Th,F,Sa,Su" -- split "," for frontend display.
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_username TEXT NOT NULL,
    author_given_name TEXT,
    author_middle_initial TEXT,
    author_last_name TEXT,
    author_type TEXT NOT NULL CHECK(author_type IN ('user', 'driver')),
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    -- For display, join on users or drivers based on author_type and author_username
    -- Example: SELECT * FROM feedback LEFT JOIN users ON (author_type='user' AND author_username=users.username) LEFT JOIN drivers ON (author_type='driver' AND author_username=drivers.username)
);