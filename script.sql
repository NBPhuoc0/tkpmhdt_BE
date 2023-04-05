-- MySQL Script generated by MySQL Workbench
-- Thu Apr  6 01:13:58 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bookstore
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bookstore` ;

-- -----------------------------------------------------
-- Schema bookstore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bookstore` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `bookstore` ;

-- -----------------------------------------------------
-- Table `bookstore`.`books`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstore`.`books` ;

CREATE TABLE IF NOT EXISTS `bookstore`.`books` (
  `book_id` INT NOT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `author` VARCHAR(255) NULL DEFAULT NULL,
  `price` DECIMAL(10,2) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `publisher` VARCHAR(255) NULL DEFAULT NULL,
  `publication_date` DATE NULL DEFAULT NULL,
  `genre` VARCHAR(255) NULL DEFAULT NULL,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `stock` INT NULL DEFAULT NULL,
  PRIMARY KEY (`book_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bookstore`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstore`.`categories` ;

CREATE TABLE IF NOT EXISTS `bookstore`.`categories` (
  `category_id` INT NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bookstore`.`bookcategories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstore`.`bookcategories` ;

CREATE TABLE IF NOT EXISTS `bookstore`.`bookcategories` (
  `book_id` INT NOT NULL DEFAULT NULL,
  `category_id` INT NOT NULL DEFAULT NULL,
  INDEX `book_id` (`book_id` ASC) VISIBLE,
  INDEX `category_id` (`category_id` ASC) VISIBLE,
  PRIMARY KEY (`book_id`, `category_id`),
  CONSTRAINT `bookcategories_ibfk_1`
    FOREIGN KEY (`book_id`)
    REFERENCES `bookstore`.`books` (`book_id`),
  CONSTRAINT `bookcategories_ibfk_2`
    FOREIGN KEY (`category_id`)
    REFERENCES `bookstore`.`categories` (`category_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bookstore`.`publishers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstore`.`publishers` ;

CREATE TABLE IF NOT EXISTS `bookstore`.`publishers` (
  `publisher_id` INT NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `phone` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`publisher_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bookstore`.`bookpublishers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstore`.`bookpublishers` ;

CREATE TABLE IF NOT EXISTS `bookstore`.`bookpublishers` (
  `book_id` INT NOT NULL,
  `publisher_id` INT NOT NULL DEFAULT NULL,
  INDEX `book_id` (`book_id` ASC) VISIBLE,
  INDEX `publisher_id` (`publisher_id` ASC) VISIBLE,
  PRIMARY KEY (`publisher_id`, `book_id`),
  CONSTRAINT `bookpublishers_ibfk_1`
    FOREIGN KEY (`book_id`)
    REFERENCES `bookstore`.`books` (`book_id`),
  CONSTRAINT `bookpublishers_ibfk_2`
    FOREIGN KEY (`publisher_id`)
    REFERENCES `bookstore`.`publishers` (`publisher_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bookstore`.`customers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstore`.`customers` ;

CREATE TABLE IF NOT EXISTS `bookstore`.`customers` (
  `customer_id` INT NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `phone` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bookstore`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstore`.`orders` ;

CREATE TABLE IF NOT EXISTS `bookstore`.`orders` (
  `order_id` INT NOT NULL,
  `customer_id` INT NULL DEFAULT NULL,
  `order_date` TIMESTAMP NULL DEFAULT NULL,
  `total_amount` DECIMAL(10,2) NULL DEFAULT NULL,
  `status` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `customer_id` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `orders_ibfk_1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `bookstore`.`customers` (`customer_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bookstore`.`orderdetails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstore`.`orderdetails` ;

CREATE TABLE IF NOT EXISTS `bookstore`.`orderdetails` (
  `order_id` INT NOT NULL DEFAULT NULL,
  `book_id` INT NOT NULL DEFAULT NULL,
  `quantity` INT NULL DEFAULT NULL,
  PRIMARY KEY (`book_id`, `order_id`),
  INDEX `order_id` (`order_id` ASC) VISIBLE,
  INDEX `book_id` (`book_id` ASC) VISIBLE,
  CONSTRAINT `orderdetails_ibfk_1`
    FOREIGN KEY (`order_id`)
    REFERENCES `bookstore`.`orders` (`order_id`),
  CONSTRAINT `orderdetails_ibfk_2`
    FOREIGN KEY (`book_id`)
    REFERENCES `bookstore`.`books` (`book_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
