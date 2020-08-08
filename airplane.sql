-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: airplane
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aircraft`
--
DROP database if exists `airplane`;
CREATE database `airplane`;
use `airplane`;

DROP TABLE IF EXISTS `aircraft`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aircraft` (
  `aircraft_id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `capacity` int DEFAULT NULL,
  PRIMARY KEY (`aircraft_id`),
  UNIQUE KEY `id_UNIQUE` (`aircraft_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aircraft`
--

LOCK TABLES `aircraft` WRITE;
/*!40000 ALTER TABLE `aircraft` DISABLE KEYS */;
INSERT INTO `aircraft` VALUES (1,'Air Express',160),(2,'Baltic Aviation',165),(3,'Caribbean Express',175),(4,'Kingfisher Airlines',170),(5,'National Jet Express',150),(6,'Orient Airways',190),(7,'Pacific Air Express',180);
/*!40000 ALTER TABLE `aircraft` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passenger`
--

DROP TABLE IF EXISTS `passenger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passenger` (
  `passenger_id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `nationality` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `phone` int DEFAULT NULL,
  `passport_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`passenger_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passenger`
--

LOCK TABLES `passenger` WRITE;
/*!40000 ALTER TABLE `passenger` DISABLE KEYS */;
INSERT INTO `passenger` VALUES (1,'ajay','nam mane','india','akkaya@redbus.com',20,999999,'J98989R');
/*!40000 ALTER TABLE `passenger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `route_id` int NOT NULL,
  `source` varchar(60) DEFAULT NULL,
  `destination` varchar(60) DEFAULT NULL,
  `srcport` varchar(60) DEFAULT NULL,
  `destport` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,'Bangalore','Delhi','Kempegowda International Airport','Indira Gandhi International Airport'),(2,'Hyderabad','Ahmedabad','Rajiv Gandhi International Airport','Sardar Vallabhbhai Patel International Airport'),(3,'Mumbai','London','Chhatrapati Shivaji International Airport','London city airport'),(4,'Delhi','Los Angeles','Indira Gandhi International Airport','Los Angeles International Airport'),(5,'Mumbai','Tokyo','Chhatrapati Shivaji International Airport','Narita International Airport');
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `aircraft_id` int DEFAULT NULL,
  `route_id` int DEFAULT NULL,
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `fare` int DEFAULT NULL,
  `seats_filled` int DEFAULT '0',
  `arrival` datetime DEFAULT NULL,
  `departure` datetime DEFAULT NULL,
  `delay` int DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `FK_aircraft_idx` (`aircraft_id`),
  KEY `FK_route_idx` (`route_id`),
  CONSTRAINT `FK_aircraft` FOREIGN KEY (`aircraft_id`) REFERENCES `aircraft` (`aircraft_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_route` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,1,1,5000,5,'2020-08-09 04:00:00','2020-08-08 22:00:00',NULL),(1,2,2,4500,0,'2020-08-09 12:00:00','2020-08-08 23:00:00',NULL),(2,1,3,6000,0,'2020-08-09 02:00:00','2020-08-08 18:00:00',NULL),(2,5,4,8000,0,'2020-08-08 13:30:00','2020-08-08 08:00:00',NULL),(3,2,5,9000,0,'2020-08-08 20:00:00','2020-08-08 06:00:00',NULL),(4,1,6,19000,0,'2020-08-08 14:00:00','2020-08-08 08:00:00',NULL),(4,3,7,5000,0,'2020-08-09 20:00:00','2020-08-08 22:00:00',NULL),(4,5,8,6000,0,'2020-08-08 23:00:00','2020-08-08 14:00:00',NULL),(5,3,9,9500,0,'2020-08-09 04:00:00','2020-08-08 07:00:00',NULL),(5,4,10,6000,0,'2020-08-08 23:30:00','2020-08-08 16:00:00',NULL),(6,3,11,4500,0,'2020-08-09 08:00:00','2020-08-08 12:00:00',NULL),(6,4,12,6000,0,'2020-08-09 18:00:00','2020-08-08 10:00:00',NULL),(6,5,13,5500,0,'2020-08-09 04:00:00','2020-08-08 21:00:00',NULL),(7,2,14,3200,0,'2020-08-09 08:00:00','2020-08-08 18:00:00',NULL),(7,4,15,9900,0,'2020-08-08 19:00:00','2020-08-08 12:00:00',NULL);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `trans_id` int NOT NULL,
  `passenger_id` int DEFAULT NULL,
  `flight_id` int DEFAULT NULL,
  `seats_booked` int DEFAULT NULL,
  PRIMARY KEY (`trans_id`),
  KEY `FK_passenger_idx` (`passenger_id`),
  KEY `FK_flight_idx` (`flight_id`),
  CONSTRAINT `FK_flight` FOREIGN KEY (`flight_id`) REFERENCES `schedule` (`schedule_id`),
  CONSTRAINT `FK_passenger` FOREIGN KEY (`passenger_id`) REFERENCES `passenger` (`passenger_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,1,1,5);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-08 14:24:35
