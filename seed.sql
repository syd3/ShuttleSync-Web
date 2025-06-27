-- Admin
INSERT INTO admin (username, password_hash) VALUES ('admin', '$2b$10$CQWNll6sz5PDXmAkaqC02OGOxiAJCrDeR4omqhsxZxoy10z2axqLe');

-- Users
INSERT INTO users (username, given_name, middle_initial, last_name, photo, phone, email, password_hash) VALUES
('user1', 'Juan', 'T', 'Dela Cruz', 'C:/Users/User/Downloads/dogsnoot.jpg', '1234567890', 'user1@email.com', 'user1pass'),
('user2', 'Maria', NULL, 'Santos', 'C:/Users/User/Downloads/dogsnoot.jpg', '0987654321', 'user2@email.com', 'user2pass');

-- Drivers
INSERT INTO drivers (username, given_name, middle_initial, last_name, photo, phone, email, platenumber, vehicle_photo, password_hash) VALUES
('driver1', 'Pedro', 'R', 'Reyes', 'C:/Users/User/Downloads/doggo.png', '1112223333', 'driver1@email.com', 'ABC123', 'C:/Users/User/Downloads/crii.jpg', 'driver1pass'),
('driver2', 'Jose', NULL, 'Lopez', 'C:/Users/User/Downloads/doggo.png', '4445556666', 'driver2@email.com', 'XYZ789', 'C:/Users/User/Downloads/crii.jpg', 'driver2pass');

-- Schedules
INSERT INTO schedules (shuttle_route, driver_username, driver_given_name, driver_middle_initial, driver_last_name, schedule) VALUES
('Route 1', 'driver1', 'Pedro', 'R', 'Reyes', 'M,T,W,Th,F'),
('Route 2', 'driver2', 'Jose', NULL, 'Lopez', 'M,W,F');


