-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-10-2025 a las 23:12:49
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `controlcash`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` int(2) NOT NULL,
  `duration` int(2) NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `paymentProviderId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `plans`
--

INSERT INTO `plans` (`id`, `name`, `description`, `price`, `duration`, `features`, `status`, `paymentProviderId`, `createdAt`, `updatedAt`) VALUES
(1, 'Free', 'Access basic features of our service at no cost. Ideal for getting started and exploring the platform with limited usage and essential tools.', 0, 1, '[\r\n  \"Basic GPT model\",\r\n  \"Table generation\",\r\n  \"Basic cost estimation\"\r\n]\r\n\r\n', 1, NULL, '2025-08-19 17:31:49', '2025-08-21 17:30:47'),
(2, 'Plus', 'Unlock advanced features and higher limits for professional use. Ideal for power users who need more flexibility, speed, and access to premium tools.', 10, 1, '[\r\n  \"Access to GPT Pro model\",\r\n  \"Unlimited table generation\",\r\n  \"Advanced cost estimation tools\"\r\n]\r\n', 1, 'price_1Rz3l2JdeWxK6CgNYqQFdIq8', '2025-08-19 17:37:46', '2025-08-23 10:38:34'),
(3, 'Pro', 'Unlock advanced features and higher limits for professional use. Ideal for power users who need more flexibility, speed, and access to premium tools for one year.', 100, 12, '[\r\n  \"Access to GPT Pro model\",\r\n  \"Unlimited table generation\",\r\n  \"Advanced cost estimation tools\"\r\n]', 1, 'price_1Rz3llJdeWxK6CgN8JBBNI3p', '2025-08-19 17:37:46', '2025-08-23 10:39:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(7) NOT NULL,
  `uid` varchar(127) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(63) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `country` varchar(31) DEFAULT NULL,
  `city` varchar(31) DEFAULT NULL,
  `savings` varchar(31) DEFAULT NULL,
  `planId` int(11) DEFAULT 1,
  `updatePlanDate` date DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `uid`, `email`, `name`, `avatar`, `country`, `city`, `savings`, `planId`, `updatePlanDate`, `createdAt`, `updatedAt`) VALUES
(18, '2N0OkfWpQsUpDTKgYTkqdIeILrU2', 'wilsonandrescriollo@gmail.com', 'Wilson Andres', 'https://avatars.githubusercontent.com/u/134454254?v=4', 'Colombia', 'Bogota', '1500', 2, '2025-08-31', '2025-08-25 17:16:30', '2025-08-31 17:34:49');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `firebaseUid` (`uid`),
  ADD KEY `plan_id` (`planId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_plan` FOREIGN KEY (`planId`) REFERENCES `plans` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
