-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 23. Jun 2023 um 19:06
-- Server-Version: 10.4.28-MariaDB
-- PHP-Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `mycargonautv1`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `booking`
--

CREATE TABLE `booking` (
  `bookingID` int(11) NOT NULL,
  `usermails` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `bookingdate` date NOT NULL DEFAULT current_timestamp(),
  `entrieIDoffer` int(11) NOT NULL,
  `entrieIDdemand` int(11) NOT NULL,
  `tracking` enum('offen','unterwegs','angekommen') NOT NULL DEFAULT 'offen'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `booking`
--

INSERT INTO `booking` (`bookingID`, `usermails`, `price`, `bookingdate`, `entrieIDoffer`, `entrieIDdemand`, `tracking`) VALUES
(1, 'buyer@admin.de', '5.0', '2023-06-19', 3, 4, 'offen');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `car`
--

CREATE TABLE `car` (
  `nrplate` varchar(255) NOT NULL,
  `usermail` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `maximalloadheight` float NOT NULL,
  `maximalloadwidth` float NOT NULL,
  `weight` float NOT NULL,
  `maximalloadweight` float NOT NULL,
  `type` enum('PKW','Transporter','LKW') NOT NULL,
  `features` set('Klimaanlage','Heizung','Elektrische Fensterheber','Sportausstattung') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `car`
--

INSERT INTO `car` (`nrplate`, `usermail`, `brand`, `model`, `maximalloadheight`, `maximalloadwidth`, `weight`, `maximalloadweight`, `type`, `features`) VALUES
('GIAK12', 'buyer@admin.de', '', '', 0, 0, 3.5, 1, 'PKW', 'Klimaanlage'),
('GUSS123', 'offer@admin.de', '', '', 0, 0, 3, 1, 'PKW', 'Heizung,Elektrische Fensterheber,Sportausstattung');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `entries`
--

CREATE TABLE `entries` (
  `entryID` int(11) NOT NULL,
  `usermail` varchar(255) NOT NULL,
  `entrytype` enum('offer','demand') NOT NULL,
  `startlocation` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `stops` varchar(255) DEFAULT NULL,
  `seats` int(11) NOT NULL,
  `maxtranspweight` float NOT NULL,
  `price` float NOT NULL,
  `startdate` date NOT NULL,
  `starttime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `entries`
--

INSERT INTO `entries` (`entryID`, `usermail`, `entrytype`, `startlocation`, `destination`, `stops`, `seats`, `maxtranspweight`, `price`, `startdate`, `starttime`) VALUES
(3, 'offer@admin.de', 'offer', 'Giessen', 'Frankfurt', 'Butzbach', 4, 1, 10, '2023-06-20', '08:00:00'),
(4, 'buyer@admin.de', 'demand', 'Gießen', 'Butzbach', NULL, 1, 0, 5, '2023-06-20', '08:00:00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reviews`
--

CREATE TABLE `reviews` (
  `reviewID` int(11) NOT NULL,
  `usermailoffer` varchar(255) NOT NULL,
  `bookingID` int(11) NOT NULL,
  `stars` float NOT NULL,
  `comment` text DEFAULT NULL,
  `usermailreviewer` varchar(255) NOT NULL,
  `creationdatetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `reviews`
--

INSERT INTO `reviews` (`reviewID`, `usermailoffer`, `bookingID`, `stars`, `comment`, `usermailreviewer`, `creationdatetime`) VALUES
(1, 'offer@admin.de', 1, 4.5, 'Nett :)', 'buyer@admin.de', '2023-06-19 00:00:00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `mail` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `mobilephone` varchar(255) DEFAULT NULL,
  `photo` mediumblob DEFAULT NULL,
  `licence` varchar(255) DEFAULT NULL,
  `registerdate` date NOT NULL DEFAULT current_timestamp(),
  `smocker` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`mail`, `firstname`, `lastname`, `password`, `birthday`, `mobilephone`, `photo`, `licence`, `registerdate`, `smocker`) VALUES
('admin@admin.de', 'Admin', 'Admin', '1234', '1991-08-24', '12345', NULL, NULL, '2023-06-19', 1),
('buyer@admin.de', 'Buyer', 'Buyer', '1234', '1991-08-24', '349304', NULL, NULL, '2023-06-19', 0),
('offer@admin.de', 'Offer', 'Offer', '1234', '1991-08-24', '2342340', NULL, NULL, '2023-06-19', 0);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`bookingID`),
  ADD KEY `usermails` (`usermails`,`price`),
  ADD KEY `entrieIDoffer` (`entrieIDoffer`),
  ADD KEY `entrieIDdemand` (`entrieIDdemand`);

--
-- Indizes für die Tabelle `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`nrplate`),
  ADD KEY `usermail` (`usermail`);

--
-- Indizes für die Tabelle `entries`
--
ALTER TABLE `entries`
  ADD PRIMARY KEY (`entryID`),
  ADD KEY `usermail` (`usermail`);

--
-- Indizes für die Tabelle `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`reviewID`),
  ADD KEY `usermailoffer` (`usermailoffer`),
  ADD KEY `bookingID` (`bookingID`),
  ADD KEY `usermailreviewer` (`usermailreviewer`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`mail`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `booking`
--
ALTER TABLE `booking`
  MODIFY `bookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `entries`
--
ALTER TABLE `entries`
  MODIFY `entryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `reviews`
--
ALTER TABLE `reviews`
  MODIFY `reviewID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`usermails`) REFERENCES `user` (`mail`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`entrieIDoffer`) REFERENCES `entries` (`entryID`),
  ADD CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`entrieIDdemand`) REFERENCES `entries` (`entryID`);

--
-- Constraints der Tabelle `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `car_ibfk_1` FOREIGN KEY (`usermail`) REFERENCES `user` (`mail`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `entries`
--
ALTER TABLE `entries`
  ADD CONSTRAINT `entries_ibfk_1` FOREIGN KEY (`usermail`) REFERENCES `user` (`mail`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`bookingID`) REFERENCES `booking` (`bookingID`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`usermailoffer`) REFERENCES `user` (`mail`),
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`usermailreviewer`) REFERENCES `user` (`mail`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
