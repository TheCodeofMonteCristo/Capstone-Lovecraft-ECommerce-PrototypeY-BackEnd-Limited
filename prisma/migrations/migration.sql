-- Migration script to set up database schema for Lovecraftian E-Commerce
-- This includes tables for users, cities, reviews, orders, and relationships between them.

-- Drop existing tables if they exist (useful for re-migrations)
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Table for storing user information
CREATE TABLE users (
    id SERIAL PRIMARY KEY,                         -- Unique ID for each user
    username VARCHAR(255) UNIQUE NOT NULL,         -- Unique username for the user
    email VARCHAR(255) UNIQUE NOT NULL,            -- Unique email address for the user
    password_hash VARCHAR(255) NOT NULL,           -- Hashed password (for authentication)
    is_admin BOOLEAN DEFAULT FALSE,                -- Boolean flag to determine if the user is an admin
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the user was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp for when the user details were last updated
);

-- Table for storing city details (which are sold by the Lovecraftian squid aliens)
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,                          -- Unique ID for each city
    name VARCHAR(255) NOT NULL,                     -- Name of the city
    description TEXT,                               -- Description of the city
    price DECIMAL(10, 2) NOT NULL,                  -- Price of the city (in some currency)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the city was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp for when the city details were last updated
);

-- Table for storing reviews of cities
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,                          -- Unique ID for each review
    user_id INT REFERENCES users(id) ON DELETE CASCADE, -- Foreign key to the user who wrote the review
    city_id INT REFERENCES cities(id) ON DELETE CASCADE, -- Foreign key to the city being reviewed
    rating INT CHECK (rating >= 1 AND rating <= 5),  -- Rating for the city, should be between 1 and 5
    review_text TEXT,                                -- Text content of the review
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for when the review was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Timestamp for when the review was last updated
);

-- Table for storing orders placed by users (purchasing cities)
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,                          -- Unique ID for each order
    user_id INT REFERENCES users(id) ON DELETE CASCADE, -- Foreign key to the user who placed the order
    city_id INT REFERENCES cities(id) ON DELETE CASCADE, -- Foreign key to the city being purchased
    quantity INT DEFAULT 1,                         -- Quantity of cities in the order (default is 1)
    total_price DECIMAL(10, 2) NOT NULL,            -- Total price of the order
    status VARCHAR(50) DEFAULT 'pending',           -- Status of the order (pending, completed, etc.)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the order was placed
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp for when the order was last updated
);

-- Table for tracking the cart items (before an order is finalized)
CREATE TABLE carts (
    id SERIAL PRIMARY KEY,                          -- Unique ID for each cart item
    user_id INT REFERENCES users(id) ON DELETE CASCADE, -- Foreign key to the user who owns the cart
    city_id INT REFERENCES cities(id) ON DELETE CASCADE, -- Foreign key to the city in the cart
    quantity INT DEFAULT 1,                         -- Quantity of the city in the cart
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the cart item was added
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp for when the cart item was last updated
);

-- Additional migrations could be added here, such as tables for payment details, shipping information, etc.
