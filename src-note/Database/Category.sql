-- Active: 1733222268515@@127.0.0.1@3306@fullstack_db
CREATE TABLE `category` (
    `Id` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(120) NOT NULL,
    `Description` text DEFAULT NULL,
    `Parentid` int(11) DEFAULT NULL,
    `Status` tinyint(1) DEFAULT NULL,
    `Create_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`Id`)
) ENGINE = InnoDB AUTO_INCREMENT = 27 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci