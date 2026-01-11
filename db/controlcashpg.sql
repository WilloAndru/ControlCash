-- PostgreSQL dump adapted from MySQL

-- Tabla: plans
CREATE TABLE plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    duration INTEGER NOT NULL,
    features JSONB,
    status SMALLINT NOT NULL DEFAULT 1,
    payment_provider_id VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Datos iniciales para plans
INSERT INTO plans (id, name, description, price, duration, features, status, payment_provider_id, created_at, updated_at) VALUES
(1, 'Free', 'Access basic features of our service at no cost. Ideal for getting started and exploring the platform with limited usage and essential tools.', 0, 1, '[
  "Basic GPT model",
  "Table generation",
  "Basic cost estimation"
]', 1, NULL, '2025-08-19 17:31:49', '2025-08-21 17:30:47'),
(2, 'Plus', 'Unlock advanced features and higher limits for professional use. Ideal for power users who need more flexibility, speed, and access to premium tools.', 10, 1, '[
  "Access to GPT Pro model",
  "Unlimited table generation",
  "Advanced cost estimation tools"
]', 1, 'price_1Rz3l2JdeWxK6CgNYqQFdIq8', '2025-08-19 17:37:46', '2025-08-23 10:38:34'),
(3, 'Pro', 'Unlock advanced features and higher limits for professional use. Ideal for power users who need more flexibility, speed, and access to premium tools for one year.', 100, 12, '[
  "Access to GPT Pro model",
  "Unlimited table generation",
  "Advanced cost estimation tools"
]', 1, 'price_1Rz3llJdeWxK6CgN8JBBNI3p', '2025-08-19 17:37:46', '2025-08-23 10:39:23');

-- Tabla: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(127) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(63) NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    country VARCHAR(31),
    city VARCHAR(31),
    savings NUMERIC(12,2),
    plan_id INTEGER DEFAULT 1,
    update_plan_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_user_plan FOREIGN KEY (plan_id)
        REFERENCES plans(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Datos iniciales para users
INSERT INTO users (id, uid, email, name, avatar, country, city, savings, plan_id, update_plan_date, created_at, updated_at) VALUES
(1, '2N0OkfWpQsUpDTKgYTkqdIeILrU2', 'wilsonandrescriollo@gmail.com', 'Wilson Andres', 'https://avatars.githubusercontent.com/u/134454254?v=4', 'Colombia', 'Bogota', 1500, 2, '2025-08-31', '2025-08-25 17:16:30', '2025-08-31 17:34:49');

SELECT setval(pg_get_serial_sequence('users','id'), COALESCE(MAX(id),0)) FROM users;
