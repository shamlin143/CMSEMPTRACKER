CREATE DATABASE CMSEMPTRACKER_db

USE CMSEMPTRACKER_db;

CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30) 
   );
  
  CREATE TABLE role (
  id INT PRIMARY KEY,
  title varchar (30),
  salary DECIMAL(10,4) NULL,
  department_id INT(15.4) NULL
  );

CREATE TABLE employee (
id INT PRIMARY KEY,
first_name varchar (30) NULL,
last_name varchar (30) NULL,
role_id INT (15.4) Null,
manager_id INT (15.4) NULL
);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("41", "Scott", "Hmalin", "41", "51");
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("42", "Susie", "Bussure", "42", "52");
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("43", "Benjamin", "Hamlin", "43", "53");
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("44", "Joshua", "Hamlin", "44", "54");
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("45", "Tylie", "Baumgardner", "45", "55");
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("46","Heidi", "McCauley", "46", "56");


SELECT * FROM employee;
;

INSERT INTO department (id, name)
VALUES ("48", "Mgmt");
INSERT INTO department (id, name)
VALUES ("47", "Admin");
INSERT INTO department (id, name)
VALUES ("43", "Dev")
INSERT INTO department (id, name)
VALUE ("44", "QA");
INSERT INTO department (id, name)
VALUES ("45", "Sales");
INSERT INTO department (id, name)
VALUES ("46", "Shipping");

SELECT * FROM department;

INSERT INTO role (id, title, salary, department_id)
VALUES ("41", "Manager", "100000", "48");
INSERT INTO role (id, title, salary, department_id)
VALUES ("42", "Admin", "85000", "47");
INSERT INTO role (id, title, salary, department_id)
VALUES ("53", "Dev", "82000", "43");
INSERT INTO role (id, title, salary, department_id)
VALUES ("54", "QA", "80000", "44");
INSERT INTO role (id, title, salary, department_id)
VALUES ("45", "Sales", "78000", "45");
INSERT INTO role (id, title, salary, department_id)
VALUES ("46", "Shipping", "75000", "46");


