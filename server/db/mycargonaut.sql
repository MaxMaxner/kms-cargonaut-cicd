-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 13. Jun 2023 um 23:04
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
-- Datenbank: `mycargonaut`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Angebote`
--

CREATE TABLE `Angebote` (
  `AngebotID` int(11) NOT NULL,
  `BenutzerID` int(11) DEFAULT NULL,
  `VonOrt` varchar(100) DEFAULT NULL,
  `BisOrt` varchar(100) DEFAULT NULL,
  `Zwischenziele` text DEFAULT NULL,
  `ZeitraumVon` date DEFAULT NULL,
  `ZeitraumBis` date DEFAULT NULL,
  `FahrzeugID` int(11) DEFAULT NULL,
  `Sitzplaetze` int(11) DEFAULT NULL,
  `Preis` float DEFAULT NULL,
  `FrachtVerhandelbar` tinyint(1) DEFAULT NULL,
  `Einschränkungen` text DEFAULT NULL,
  `InfoHinweis` text DEFAULT NULL,
  `ErstelltAm` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Angebote`
--

INSERT INTO `Angebote` (`AngebotID`, `BenutzerID`, `VonOrt`, `BisOrt`, `Zwischenziele`, `ZeitraumVon`, `ZeitraumBis`, `FahrzeugID`, `Sitzplaetze`, `Preis`, `FrachtVerhandelbar`, `Einschränkungen`, `InfoHinweis`, `ErstelltAm`) VALUES
(1, 2, 'Gießen', 'München', 'Nürnberg, Regensburg', '2023-06-13', '2023-06-14', 1, 2, 5, 2, 'Nichtraucher', NULL, '2023-06-13 23:00:37');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Benutzer`
--

CREATE TABLE `Benutzer` (
  `BenutzerID` int(11) NOT NULL,
  `Vorname` varchar(50) DEFAULT NULL,
  `Nachname` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Passwort` varchar(100) DEFAULT NULL,
  `Geburtstag` date DEFAULT NULL,
  `Handynummer` varchar(20) DEFAULT NULL,
  `Bild` blob DEFAULT NULL,
  `ErstelltAm` datetime DEFAULT NULL,
  `LetzterLogin` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Benutzer`
--

INSERT INTO `Benutzer` (`BenutzerID`, `Vorname`, `Nachname`, `Email`, `Passwort`, `Geburtstag`, `Handynummer`, `Bild`, `ErstelltAm`, `LetzterLogin`) VALUES
(1, 'Admin', 'Admin', 'admin@webmail.comn', '1234', '2023-06-13', NULL, NULL, '2023-06-13 22:59:29', '2023-06-13 22:59:29'),
(2, 'Andreas', 'Angebot', 'andreas12@mail.com', '1234', '2023-06-13', NULL, NULL, '2023-06-13 23:00:00', '2023-06-13 23:00:00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Bewertungen`
--

CREATE TABLE `Bewertungen` (
  `BewertungID` int(11) NOT NULL,
  `Bewertungstyp` varchar(20) DEFAULT NULL,
  `BewertungVon` int(11) DEFAULT NULL,
  `BewertungFür` int(11) DEFAULT NULL,
  `Sterne` int(11) DEFAULT NULL,
  `Kommentar` text DEFAULT NULL,
  `ErstelltAm` datetime DEFAULT NULL,
  `BenutzerID` int(11) NOT NULL,
  `FahrerID` int(11) NOT NULL,
  `TeilnahmeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Fahrzeuge`
--

CREATE TABLE `Fahrzeuge` (
  `FahrzeugID` int(11) NOT NULL,
  `BenutzerID` int(11) DEFAULT NULL,
  `Fahrzeugname` varchar(50) DEFAULT NULL,
  `Sonderfunktionen` varchar(100) DEFAULT NULL,
  `Gewicht` float DEFAULT NULL,
  `Masse` varchar(50) DEFAULT NULL,
  `ErstelltAm` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Fahrzeuge`
--

INSERT INTO `Fahrzeuge` (`FahrzeugID`, `BenutzerID`, `Fahrzeugname`, `Sonderfunktionen`, `Gewicht`, `Masse`, `ErstelltAm`) VALUES
(1, 2, 'Fiat Punto', 'Klimaanlage', 2, '50', '2023-06-13 23:01:18');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Gesuche`
--

CREATE TABLE `Gesuche` (
  `GesuchID` int(11) NOT NULL,
  `BenutzerID` int(11) DEFAULT NULL,
  `VonOrt` varchar(100) DEFAULT NULL,
  `BisOrt` varchar(100) DEFAULT NULL,
  `Zwischenziele` text DEFAULT NULL,
  `ZeitraumVon` date DEFAULT NULL,
  `ZeitraumBis` date DEFAULT NULL,
  `FahrzeugID` int(11) DEFAULT NULL,
  `Sitzplaetze` int(11) DEFAULT NULL,
  `Preis` float DEFAULT NULL,
  `FrachtVerhandelbar` tinyint(1) DEFAULT NULL,
  `Einschraenkungen` text DEFAULT NULL,
  `InfoHinweis` text DEFAULT NULL,
  `ErstelltAm` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Gesuche`
--

INSERT INTO `Gesuche` (`GesuchID`, `BenutzerID`, `VonOrt`, `BisOrt`, `Zwischenziele`, `ZeitraumVon`, `ZeitraumBis`, `FahrzeugID`, `Sitzplaetze`, `Preis`, `FrachtVerhandelbar`, `Einschraenkungen`, `InfoHinweis`, `ErstelltAm`) VALUES
(1, 1, 'Gießen', 'Nürnberg', NULL, '2023-06-13', '2023-06-14', NULL, 1, 10, NULL, NULL, NULL, '2023-06-13 23:03:06');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Teilnahmen`
--

CREATE TABLE `Teilnahmen` (
  `TeilnahmeID` int(11) NOT NULL,
  `BenutzerID` int(11) DEFAULT NULL,
  `AngebotID` int(11) DEFAULT NULL,
  `GesuchID` int(11) DEFAULT NULL,
  `Zusage` tinyint(1) DEFAULT NULL,
  `ErstelltAm` datetime DEFAULT NULL,
  `FahrerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Teilnahmen`
--

INSERT INTO `Teilnahmen` (`TeilnahmeID`, `BenutzerID`, `AngebotID`, `GesuchID`, `Zusage`, `ErstelltAm`, `FahrerID`) VALUES
(1, 1, 1, 1, 1, '2023-06-13 23:03:52', 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Zahlungsvorgaenge`
--

CREATE TABLE `Zahlungsvorgaenge` (
  `ZahlungVorgangID` int(11) NOT NULL,
  `TeilnahmeID` int(11) DEFAULT NULL,
  `Betrag` float DEFAULT NULL,
  `Abgeschlossen` tinyint(1) DEFAULT NULL,
  `ErstelltAm` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Zahlungsvorgaenge`
--

INSERT INTO `Zahlungsvorgaenge` (`ZahlungVorgangID`, `TeilnahmeID`, `Betrag`, `Abgeschlossen`, `ErstelltAm`) VALUES
(1, 1, 10, 1, '2023-06-13 23:04:15');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `Angebote`
--
ALTER TABLE `Angebote`
  ADD PRIMARY KEY (`AngebotID`),
  ADD KEY `BenutzerID` (`BenutzerID`),
  ADD KEY `FahrzeugID` (`FahrzeugID`);

--
-- Indizes für die Tabelle `Benutzer`
--
ALTER TABLE `Benutzer`
  ADD PRIMARY KEY (`BenutzerID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indizes für die Tabelle `Bewertungen`
--
ALTER TABLE `Bewertungen`
  ADD PRIMARY KEY (`BewertungID`),
  ADD KEY `FahrerID` (`FahrerID`),
  ADD KEY `TeilnahmeID` (`TeilnahmeID`),
  ADD KEY `BenutzerID` (`BenutzerID`);

--
-- Indizes für die Tabelle `Fahrzeuge`
--
ALTER TABLE `Fahrzeuge`
  ADD PRIMARY KEY (`FahrzeugID`),
  ADD KEY `BenutzerID` (`BenutzerID`);

--
-- Indizes für die Tabelle `Gesuche`
--
ALTER TABLE `Gesuche`
  ADD PRIMARY KEY (`GesuchID`),
  ADD KEY `BenutzerID` (`BenutzerID`),
  ADD KEY `FahrzeugID` (`FahrzeugID`);

--
-- Indizes für die Tabelle `Teilnahmen`
--
ALTER TABLE `Teilnahmen`
  ADD PRIMARY KEY (`TeilnahmeID`),
  ADD KEY `AngebotID` (`AngebotID`),
  ADD KEY `GesuchID` (`GesuchID`),
  ADD KEY `BenutzerID` (`BenutzerID`),
  ADD KEY `FahrerID` (`FahrerID`);

--
-- Indizes für die Tabelle `Zahlungsvorgaenge`
--
ALTER TABLE `Zahlungsvorgaenge`
  ADD PRIMARY KEY (`ZahlungVorgangID`),
  ADD KEY `TeilnahmeID` (`TeilnahmeID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `Angebote`
--
ALTER TABLE `Angebote`
  MODIFY `AngebotID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `Benutzer`
--
ALTER TABLE `Benutzer`
  MODIFY `BenutzerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `Bewertungen`
--
ALTER TABLE `Bewertungen`
  MODIFY `BewertungID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Fahrzeuge`
--
ALTER TABLE `Fahrzeuge`
  MODIFY `FahrzeugID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `Gesuche`
--
ALTER TABLE `Gesuche`
  MODIFY `GesuchID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `Teilnahmen`
--
ALTER TABLE `Teilnahmen`
  MODIFY `TeilnahmeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `Zahlungsvorgaenge`
--
ALTER TABLE `Zahlungsvorgaenge`
  MODIFY `ZahlungVorgangID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `Angebote`
--
ALTER TABLE `Angebote`
  ADD CONSTRAINT `angebote_ibfk_1` FOREIGN KEY (`BenutzerID`) REFERENCES `Benutzer` (`BenutzerID`),
  ADD CONSTRAINT `angebote_ibfk_2` FOREIGN KEY (`FahrzeugID`) REFERENCES `Fahrzeuge` (`FahrzeugID`);

--
-- Constraints der Tabelle `Bewertungen`
--
ALTER TABLE `Bewertungen`
  ADD CONSTRAINT `bewertungen_ibfk_1` FOREIGN KEY (`BenutzerID`) REFERENCES `Benutzer` (`BenutzerID`),
  ADD CONSTRAINT `bewertungen_ibfk_2` FOREIGN KEY (`FahrerID`) REFERENCES `Benutzer` (`BenutzerID`),
  ADD CONSTRAINT `bewertungen_ibfk_3` FOREIGN KEY (`TeilnahmeID`) REFERENCES `Teilnahmen` (`TeilnahmeID`);

--
-- Constraints der Tabelle `Fahrzeuge`
--
ALTER TABLE `Fahrzeuge`
  ADD CONSTRAINT `fahrzeuge_ibfk_1` FOREIGN KEY (`BenutzerID`) REFERENCES `Benutzer` (`BenutzerID`);

--
-- Constraints der Tabelle `Gesuche`
--
ALTER TABLE `Gesuche`
  ADD CONSTRAINT `gesuche_ibfk_1` FOREIGN KEY (`BenutzerID`) REFERENCES `Benutzer` (`BenutzerID`),
  ADD CONSTRAINT `gesuche_ibfk_2` FOREIGN KEY (`FahrzeugID`) REFERENCES `Fahrzeuge` (`FahrzeugID`);

--
-- Constraints der Tabelle `Teilnahmen`
--
ALTER TABLE `Teilnahmen`
  ADD CONSTRAINT `teilnahmen_ibfk_1` FOREIGN KEY (`AngebotID`) REFERENCES `Angebote` (`AngebotID`),
  ADD CONSTRAINT `teilnahmen_ibfk_2` FOREIGN KEY (`GesuchID`) REFERENCES `Gesuche` (`GesuchID`),
  ADD CONSTRAINT `teilnahmen_ibfk_3` FOREIGN KEY (`BenutzerID`) REFERENCES `Benutzer` (`BenutzerID`),
  ADD CONSTRAINT `teilnahmen_ibfk_4` FOREIGN KEY (`FahrerID`) REFERENCES `Benutzer` (`BenutzerID`);

--
-- Constraints der Tabelle `Zahlungsvorgaenge`
--
ALTER TABLE `Zahlungsvorgaenge`
  ADD CONSTRAINT `zahlungsvorgaenge_ibfk_1` FOREIGN KEY (`TeilnahmeID`) REFERENCES `Teilnahmen` (`TeilnahmeID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
