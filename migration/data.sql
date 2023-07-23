CREATE TABLE `db_schedule`.`user` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `socialSecurity` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`userId`));

CREATE TABLE `db_schedule`.`contact` (
  `contactId` INT NOT NULL AUTO_INCREMENT,
  `type` TINYINT NOT NULL,
  `description` VARCHAR(250) NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`contactId`));


ALTER TABLE `db_schedule`.`contact` 
CHANGE COLUMN `contactId` `contactId` INT NOT NULL AUTO_INCREMENT ;
