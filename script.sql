-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bookstore
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bookstore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bookstore` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `bookstore` ;

-- -----------------------------------------------------
-- Table `bookstore`.`books`
-- -----------------------------------------------------
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
CREATE TABLE IF NOT EXISTS `bookstore`.`bookcategories` (
  `book_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`book_id`, `category_id`),
  INDEX `book_id` (`book_id` ASC) VISIBLE,
  INDEX `category_id` (`category_id` ASC) VISIBLE,
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
CREATE TABLE IF NOT EXISTS `bookstore`.`bookpublishers` (
  `book_id` INT NOT NULL,
  `publisher_id` INT NOT NULL,
  PRIMARY KEY (`publisher_id`, `book_id`),
  INDEX `book_id` (`book_id` ASC) VISIBLE,
  INDEX `publisher_id` (`publisher_id` ASC) VISIBLE,
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
-- Table `bookstore`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`users` (
  `user_id` INT NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `phone` VARCHAR(20) NULL DEFAULT NULL,
  `is_admin` VARCHAR(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bookstore`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`carts` (
  `cart_id` INT NOT NULL,
  `user_id` INT NULL DEFAULT NULL,
  `total_price` DECIMAL(10,2) NULL DEFAULT NULL,
  `total_amount` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  INDEX `user_id` (`user_id` ASC) INVISIBLE,
  CONSTRAINT `carts_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `bookstore`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bookstore`.`cartdetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`cartdetails` (
  `cart_id` INT NOT NULL,
  `book_id` INT NOT NULL,
  `quantity` INT NULL DEFAULT NULL,
  PRIMARY KEY (`cart_id`, `book_id`),
  INDEX `book_id` (`book_id` ASC) VISIBLE,
  INDEX `cart_id` (`cart_id` ASC) VISIBLE,
  CONSTRAINT `cartdetails_ibfk_1`
    FOREIGN KEY (`cart_id`)
    REFERENCES `bookstore`.`carts` (`cart_id`),
  CONSTRAINT `cartdetails_ibfk_2`
    FOREIGN KEY (`book_id`)
    REFERENCES `bookstore`.`books` (`book_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bookstore`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`orders` (
  `order_id` INT NOT NULL,
  `user_id` INT NULL DEFAULT NULL,
  `order_date` TIMESTAMP NULL DEFAULT NULL,
  `total_amount` DECIMAL(10,2) NULL DEFAULT NULL,
  `status` VARCHAR(20) NULL DEFAULT NULL,
  `total_price` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `user_id` (`user_id` ASC) INVISIBLE,
  CONSTRAINT `orders_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `bookstore`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bookstore`.`orderdetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`orderdetails` (
  `order_id` INT NOT NULL,
  `book_id` INT NOT NULL,
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
