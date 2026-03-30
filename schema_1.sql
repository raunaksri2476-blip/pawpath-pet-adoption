CREATE DATABASE pawpath_db;
USE pawpath_db;

CREATE TABLE USERS (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100),
  password VARCHAR(255),
  role VARCHAR(20)
);