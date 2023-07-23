CREATE TABLE `contact` (
  `contactId` int NOT NULL,
  `type` tinyint NOT NULL,
  `description` varchar(250) COLLATE utf8mb3_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`contactId`),
  KEY `FK_userId` (`userId`),
  CONSTRAINT `FK_userId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
