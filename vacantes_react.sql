CREATE DATABASE IF NOT EXISTS `vacantes_react`;
USE `vacantes_react`;

CREATE TABLE IF NOT EXISTS `company` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `company` varchar(45) DEFAULT NULL,
  `username` varchar(16) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `logo` longtext NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

CREATE TABLE IF NOT EXISTS `job` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `from_date` date NOT NULL,
  `until_date` date NOT NULL,
  `city` varchar(45) NOT NULL,
  `job_type` varchar(45) NOT NULL,
  `experience` varchar(45) NOT NULL,
  `deleted` tinyint DEFAULT '0',
  `company_id` int NOT NULL,
  PRIMARY KEY (`job_id`,`company_id`),
  KEY `fk_job_company_idx` (`company_id`),
  CONSTRAINT `fk_job_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
);

CREATE TABLE IF NOT EXISTS `job_persons_apply` (
  `job_job_id` int NOT NULL,
  `persons_id` int NOT NULL,
  `salary` decimal(10,0) DEFAULT '0',
  `deleted` tinyint DEFAULT '0',
  `selected` tinyint DEFAULT '0',
  PRIMARY KEY (`job_job_id`,`persons_id`),
  KEY `fk_job_has_persons_persons1_idx` (`persons_id`),
  KEY `fk_job_has_persons_job1_idx` (`job_job_id`),
  CONSTRAINT `fk_job_has_persons_job1` FOREIGN KEY (`job_job_id`) REFERENCES `job` (`job_id`),
  CONSTRAINT `fk_job_has_persons_persons1` FOREIGN KEY (`persons_id`) REFERENCES `persons` (`person_id`)
);

CREATE TABLE IF NOT EXISTS `persons` (
  `person_id` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `img` longtext,
  `deleted` tinyint DEFAULT '0',
  PRIMARY KEY (`person_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `dni_UNIQUE` (`dni`)
);

