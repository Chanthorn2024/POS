-- Active: 1733222268515@@127.0.0.1@3306@fullstack_db

CREATE TABLE user (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  role_id int(11) DEFAULT NULL, -- FK
  name varchar(120) DEFAULT NULL,
  username varchar(255) NOT NULL UNIQUE ,
  password varchar(255) DEFAULT NULL,
  is_active tinyint(1) DEFAULT NULL,
  create_by varchar(120) DEFAULT NULL,
  create_at timestamp NOT NULL DEFAULT current_timestamp()
);  -- run already

ALTER TABLE user
ADD FOREIGN KEY (role_id) REFERENCES role(id);

-- Insert Data to User Table

