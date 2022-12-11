-- Adminer 4.8.1 MySQL 5.7.35 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `stock_mfee31`;
CREATE DATABASE `stock_mfee31` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `stock_mfee31`;

-- Adminer 4.8.1 MySQL 5.7.35 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `password` varchar(97) DEFAULT NULL,
  `name` varchar(32) NOT NULL,
  `photo` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


SET NAMES utf8mb4;

DROP TABLE IF EXISTS `stocks`;
CREATE TABLE `stocks` (
  `id` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `stocks` (`id`, `name`) VALUES
('2330',	'台積電'),
('2412',	'中華電'),
('2618',	'長榮航');

DROP TABLE IF EXISTS `stock_prices`;
CREATE TABLE `stock_prices` (
  `stock_id` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `open_price` decimal(10,2) unsigned NOT NULL,
  `high_price` decimal(10,2) unsigned NOT NULL,
  `low_price` decimal(10,2) unsigned NOT NULL,
  `close_price` decimal(10,2) unsigned NOT NULL,
  `delta_price` decimal(10,2) NOT NULL,
  `transactions` int(10) unsigned NOT NULL,
  `volume` bigint(20) unsigned NOT NULL,
  `amount` decimal(14,2) unsigned NOT NULL,
  PRIMARY KEY (`stock_id`,`date`),
  CONSTRAINT `stock_price_ibfk_1` FOREIGN KEY (`stock_id`) REFERENCES `stocks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2022-12-11 06:35:25