-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: projet
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

create user if not exists admini@localhost identified by 'passadm';
grant all privileges on projet.* to admini@localhost;
ALTER USER 'admini'@localhost IDENTIFIED WITH mysql_native_password BY 'passadm';

create user if not exists techni@localhost identified by 'passtech';
grant SELECT on projet.technicien to techni@localhost;
grant SELECT on projet.administrateur to techni@localhost;
grant SELECT, INSERT, UPDATE on projet.intervention to techni@localhost;
grant SELECT, INSERT, UPDATE on projet.client to techni@localhost;
grant SELECT, INSERT, UPDATE on projet.arrivee_voiture to techni@localhost;
grant SELECT, INSERT, UPDATE on projet.voiture to techni@localhost;
grant SELECT, INSERT, UPDATE on projet.commune to techni@localhost;
ALTER USER 'techni'@localhost IDENTIFIED WITH mysql_native_password BY 'passtech';
FLUSH PRIVILEGES;

--
-- Table structure for table `administrateur`
--

DROP TABLE IF EXISTS `administrateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrateur` (
  `idadm` int NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idadm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrateur`
--

LOCK TABLES `administrateur` WRITE;
/*!40000 ALTER TABLE `administrateur` DISABLE KEYS */;
INSERT INTO `administrateur` VALUES (1,'Michel','Louise'),(2,'Pouin','François'),(3,'Didier','Murielle');
/*!40000 ALTER TABLE `administrateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arrivee_voiture`
--

DROP TABLE IF EXISTS `arrivee_voiture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arrivee_voiture` (
  `idinterv` int NOT NULL,
  `plaque` varchar(45) DEFAULT NULL,
  `date_arrivee` varchar(45) DEFAULT NULL,
  `kilometrage` int DEFAULT NULL,
  PRIMARY KEY (`idinterv`),
  KEY `voiture_idx` (`plaque`),
  CONSTRAINT `interv` FOREIGN KEY (`idinterv`) REFERENCES `intervention` (`idinterv`),
  CONSTRAINT `voiture` FOREIGN KEY (`plaque`) REFERENCES `voiture` (`immatriculation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arrivee_voiture`
--

LOCK TABLES `arrivee_voiture` WRITE;
/*!40000 ALTER TABLE `arrivee_voiture` DISABLE KEYS */;
/*!40000 ALTER TABLE `arrivee_voiture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `idclient` int NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `adresse` varchar(45) DEFAULT NULL,
  `idadmin` int DEFAULT NULL,
  PRIMARY KEY (`idclient`),
  KEY `suivi_admin_idx` (`idadmin`),
  KEY `commune_idx` (`adresse`),
  CONSTRAINT `commune` FOREIGN KEY (`adresse`) REFERENCES `commune` (`nom`),
  CONSTRAINT `suivi_admin` FOREIGN KEY (`idadmin`) REFERENCES `administrateur` (`idadm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commune`
--

DROP TABLE IF EXISTS `commune`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commune` (
  `nom` varchar(45) NOT NULL,
  `nb_clients` int DEFAULT NULL,
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commune`
--

LOCK TABLES `commune` WRITE;
/*!40000 ALTER TABLE `commune` DISABLE KEYS */;
/*!40000 ALTER TABLE `commune` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `intervention`
--

DROP TABLE IF EXISTS `intervention`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intervention` (
  `idinterv` int NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `idclient` int DEFAULT NULL,
  `idtechn` int DEFAULT NULL,
  `remarque` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idinterv`),
  KEY `client_idx` (`idclient`),
  KEY `technicien_idx` (`idtechn`),
  CONSTRAINT `client` FOREIGN KEY (`idclient`) REFERENCES `client` (`idclient`),
  CONSTRAINT `technicien` FOREIGN KEY (`idtechn`) REFERENCES `technicien` (`idtechn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intervention`
--

LOCK TABLES `intervention` WRITE;
/*!40000 ALTER TABLE `intervention` DISABLE KEYS */;
/*!40000 ALTER TABLE `intervention` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technicien`
--

DROP TABLE IF EXISTS `technicien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technicien` (
  `idtechn` int NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `nb_voiture_reparees` int DEFAULT NULL,
  PRIMARY KEY (`idtechn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technicien`
--

LOCK TABLES `technicien` WRITE;
/*!40000 ALTER TABLE `technicien` DISABLE KEYS */;
INSERT INTO `technicien` VALUES (1,'Bordereau','Patrick',15),(2,'El Khalaf','Matthieu',4),(3,'Victorien','Lisa',0);
/*!40000 ALTER TABLE `technicien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voiture`
--

DROP TABLE IF EXISTS `voiture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voiture` (
  `immatriculation` varchar(45) NOT NULL,
  `marque` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`immatriculation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voiture`
--

LOCK TABLES `voiture` WRITE;
/*!40000 ALTER TABLE `voiture` DISABLE KEYS */;
/*!40000 ALTER TABLE `voiture` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-11 13:18:22
