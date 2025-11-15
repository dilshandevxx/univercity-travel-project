-- Travel App Database Schema for Sri Lanka Tourism Website
-- Database: travel_app

-- Create database
CREATE DATABASE IF NOT EXISTS travel_app;
USE travel_app;

-- Users table (for both travelers and guiders)
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    user_type ENUM('traveler', 'guider') NOT NULL DEFAULT 'traveler',
    profile_image VARCHAR(255),
    bio TEXT,
    location VARCHAR(100),
    languages_spoken VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- User authentication tokens (for sessions)
CREATE TABLE auth_tokens (
    token_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Destinations table
CREATE TABLE destinations (
    destination_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(100),
    category ENUM('beach', 'heritage', 'wildlife', 'adventure', 'nature', 'cultural') NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    image_url VARCHAR(255),
    best_time_to_visit VARCHAR(100),
    average_rating DECIMAL(3, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Destination images (multiple images per destination)
CREATE TABLE destination_images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE
);

-- Hotels and Restaurants
CREATE TABLE accommodations (
    accommodation_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    type ENUM('hotel', 'restaurant', 'resort', 'guesthouse', 'cafe') NOT NULL,
    description TEXT,
    location VARCHAR(100),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    price_range ENUM('budget', 'mid-range', 'luxury') DEFAULT 'mid-range',
    rating DECIMAL(3, 2) DEFAULT 0.00,
    amenities TEXT, -- JSON string of amenities
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Accommodation images
CREATE TABLE accommodation_images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    accommodation_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (accommodation_id) REFERENCES accommodations(accommodation_id) ON DELETE CASCADE
);

-- Guiders (extends users table with additional info)
CREATE TABLE guiders (
    guider_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    specialization VARCHAR(255), -- e.g., "Wildlife Expert", "Cultural Guide"
    experience_years INT DEFAULT 0,
    languages VARCHAR(255), -- comma-separated
    license_number VARCHAR(50),
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    hourly_rate DECIMAL(8, 2),
    availability_status ENUM('available', 'busy', 'unavailable') DEFAULT 'available',
    certifications TEXT, -- JSON string
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Guider services/packages
CREATE TABLE guider_services (
    service_id INT PRIMARY KEY AUTO_INCREMENT,
    guider_id INT NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    description TEXT,
    duration_hours INT,
    price DECIMAL(8, 2),
    max_participants INT DEFAULT 10,
    inclusions TEXT, -- JSON string of what's included
    exclusions TEXT, -- JSON string of what's not included
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (guider_id) REFERENCES guiders(guider_id) ON DELETE CASCADE
);

-- Blog posts/Stories
CREATE TABLE blog_posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author_id INT NOT NULL,
    category ENUM('culture', 'adventure', 'nature', 'food', 'travel-tips', 'personal-story') NOT NULL,
    featured_image VARCHAR(255),
    tags VARCHAR(255), -- comma-separated
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    views_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Reviews and Ratings
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    review_type ENUM('destination', 'accommodation', 'guider', 'blog_post') NOT NULL,
    reviewed_item_id INT NOT NULL, -- destination_id, accommodation_id, guider_id, or post_id
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    visit_date DATE,
    helpful_votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_review (user_id, review_type, reviewed_item_id)
);

-- Trip Planning
CREATE TABLE trip_plans (
    trip_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    duration_days INT,
    budget DECIMAL(10, 2),
    travelers_count INT DEFAULT 1,
    status ENUM('planning', 'confirmed', 'completed', 'cancelled') DEFAULT 'planning',
    preferences TEXT, -- JSON string of user preferences
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Trip destinations (many-to-many relationship)
CREATE TABLE trip_destinations (
    trip_destination_id INT PRIMARY KEY AUTO_INCREMENT,
    trip_id INT NOT NULL,
    destination_id INT NOT NULL,
    visit_order INT DEFAULT 0,
    planned_date DATE,
    notes TEXT,
    FOREIGN KEY (trip_id) REFERENCES trip_plans(trip_id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE
);

-- Photo Gallery
CREATE TABLE gallery_photos (
    photo_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255) NOT NULL,
    category ENUM('destinations', 'nature', 'culture', 'food', 'people', 'landmarks') NOT NULL,
    location VARCHAR(100),
    photographer VARCHAR(100),
    uploaded_by INT NOT NULL,
    tags VARCHAR(255), -- comma-separated
    is_featured BOOLEAN DEFAULT FALSE,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Photo likes (many-to-many)
CREATE TABLE photo_likes (
    like_id INT PRIMARY KEY AUTO_INCREMENT,
    photo_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (photo_id) REFERENCES gallery_photos(photo_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_like (photo_id, user_id)
);

-- Contact/Inquiry forms
CREATE TABLE inquiries (
    inquiry_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    inquiry_type ENUM('general', 'booking', 'itinerary', 'accommodation', 'transport', 'other') DEFAULT 'general',
    status ENUM('new', 'in-progress', 'resolved', 'closed') DEFAULT 'new',
    assigned_to INT NULL,
    response TEXT,
    responded_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscriptions (
    subscription_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100),
    interests VARCHAR(255), -- comma-separated categories
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL
);

-- Search logs (for analytics)
CREATE TABLE search_logs (
    search_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    search_query VARCHAR(255) NOT NULL,
    search_type ENUM('destination', 'accommodation', 'guider', 'general') DEFAULT 'general',
    results_count INT DEFAULT 0,
    ip_address VARCHAR(45),
    user_agent TEXT,
    searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Create indexes for better performance
CREATE INDEX idx_destinations_category ON destinations(category);
CREATE INDEX idx_destinations_location ON destinations(location);
CREATE INDEX idx_accommodations_type ON accommodations(type);
CREATE INDEX idx_accommodations_location ON accommodations(location);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_reviews_type_item ON reviews(review_type, reviewed_item_id);
CREATE INDEX idx_gallery_category ON gallery_photos(category);
CREATE INDEX idx_inquiries_status ON inquiries(status);

-- Insert some sample data
INSERT INTO users (username, email, password_hash, full_name, user_type, bio) VALUES
('admin', 'admin@pearlguide.com', '$2b$10$dummy.hash.for.demo', 'Pearl Guide Admin', 'traveler', 'Administrator account'),
('ravindu_guide', 'ravindu@pearlguide.com', '$2b$10$dummy.hash.for.demo', 'Ravindu Perera', 'guider', 'Passionate about Sri Lanka\'s wilderness and wildlife'),
('chamari_guide', 'chamari@pearlguide.com', '$2b$10$dummy.hash.for.demo', 'Chamari Silva', 'guider', 'Certified archaeologist and historian'),
('nuwan_guide', 'nuwan@pearlguide.com', '$2b$10$dummy.hash.for.demo', 'Nuwan Fernando', 'guider', 'Coastal and water sports specialist');

INSERT INTO destinations (name, description, location, category, latitude, longitude, best_time_to_visit) VALUES
('Sigiriya', 'Ancient palace on a giant rock with amazing views and ruins', 'Central Province', 'heritage', 7.9570, 80.7603, 'December to April'),
('Yala National Park', 'Home to leopards, elephants, and diverse wildlife', 'Southern Province', 'wildlife', 6.4564, 81.4612, 'February to July'),
('Mirissa Beach', 'Beautiful beach with whale watching and water sports', 'Southern Province', 'beach', 5.9485, 80.4711, 'November to April'),
('Temple of Tooth', 'Sacred Buddhist temple housing Buddha\'s tooth relic', 'Central Province', 'cultural', 7.2936, 80.6413, 'Throughout the year');

INSERT INTO accommodations (name, type, description, location, price_range, rating) VALUES
('Shangri-La Colombo', 'hotel', 'Luxury hotel with great food and service', 'Colombo', 'luxury', 4.5),
('Jetwing Blue', 'resort', 'Beach resort with modern amenities', 'Negombo', 'luxury', 4.3),
('TukTuk Wine & Dine', 'restaurant', 'Cozy place with good food and wine', 'Colombo', 'mid-range', 4.2);

-- Insert guider details
INSERT INTO guiders (user_id, specialization, experience_years, languages, rating, hourly_rate) VALUES
(2, 'Wildlife & Adventure Specialist', 15, 'English,Sinhala', 4.8, 50.00),
(3, 'Cultural Heritage Expert', 12, 'English,Sinhala,French', 4.9, 45.00),
(4, 'Coastal & Water Sports Guide', 8, 'English,Sinhala', 4.7, 40.00);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, author_id, category, status, published_at) VALUES
('The Ancient Kingdom of Anuradhapura', 'ancient-kingdom-anuradhapura',
 'Walk in the footsteps of ancient kings among sprawling ruins and sacred Bodhi trees...',
 'A spiritual journey through Sri Lanka\'s ancient capital', 1, 'culture', 'published', NOW()),
('Conquer Adam\'s Peak: A Pilgrimage Under the Stars', 'conquer-adams-peak',
 'Join the thousands who make the pre-dawn climb to the summit of Sri Pada...',
 'Experience the sacred mountain climb', 1, 'adventure', 'published', NOW());

-- Insert sample reviews
INSERT INTO reviews (user_id, review_type, reviewed_item_id, rating, comment) VALUES
(1, 'destination', 1, 5, 'Amazing experience at Sigiriya!'),
(1, 'accommodation', 1, 4, 'Great hotel with excellent service'),
(1, 'guider', 1, 5, 'Ravindu was an excellent guide');
