USE employeesDB;

INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id) VALUES
("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 130000, 2),
("Software Engineer", 110000, 2),
("Account Manager", 140000, 3),
("Accountant", 80000, 3),
("Legal Team Lead", 200000, 4),
("Lawyer", 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Johnny', 'Appleseed', 1, NULL), 
('Jeff', 'Davis', 2, 1), 
('Zach', 'Johnson', 3, NULL),
('Eric', 'Smith', 4, 3),
('Thomas', 'Dickens', 5, NULL),
('Jordan', 'Bass', 6, 5),
('Kevin', 'Tran', 7, NULL),
('Tommy', 'Nham', 8, 7);