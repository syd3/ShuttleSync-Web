-- Admin
INSERT INTO admin (username, password_hash) VALUES ('admin', '$2b$10$CQWNll6sz5PDXmAkaqC02OGOxiAJCrDeR4omqhsxZxoy10z2axqLe');

-- Users
INSERT INTO users (photo, username, phone, email, password_hash) VALUES
('C:/Users/User/Downloads/dogsnoot.jpg', 'user1', '1234567890', 'user1@email.com', 'user1pass'),
('C:/Users/User/Downloads/dogsnoot.jpg', 'user2', '0987654321', 'user2@email.com', 'user2pass');

-- Drivers
INSERT INTO drivers (photo, username, phone, email, platenumber, vehicle_photo, password_hash) VALUES
('C:/Users/User/Downloads/doggo.png', 'driver1', '1112223333', 'driver1@email.com', 'ABC123', 'C:/Users/User/Downloads/crii.jpg', 'driver1pass'),
('C:/Users/User/Downloads/doggo.png', 'driver2', '4445556666', 'driver2@email.com', 'XYZ789', 'C:/Users/User/Downloads/crii.jpg', 'driver2pass');

-- Schedules
INSERT INTO schedules (route, driver_id, schedule) VALUES
('Route 1', 1, 'M,T,W,Th,F'),
('Route 2', 2, 'Sa,Su');

-- Feedback
/** INSERT INTO feedback (user_id, feedback) VALUES
(1, 'Great service!'),
(2, 'Very punctual.'); **/