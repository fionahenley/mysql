USE employee_trackerDB;

/*inserting id and department into department table*/
INSERT INTO department (id, name)
VALUES (1, "Sales");

INSERT INTO department (id, name)
VALUES (2, "Engineering");

INSERT INTO department (id, name)
VALUES (3, "Finance");

INSERT INTO department (id, name)
VALUES (4, "Legal");


/*inserting employee title, salary, and department_ID into roles*/
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 70000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 150000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 100000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 200000, 4);


/*inserting employee names and role into employee table*/
INSERT INTO employee (employee_name, role_id)
VALUES ("Bruce Wayne", 6);

INSERT INTO employee (employee_name, role_id)
VALUES ("Carol Danvers", 4);

INSERT INTO employee (employee_name, role_id)
VALUES ("Diana Prince", 6);

INSERT INTO employee (employee_name, role_id)
VALUES ("Barry Allen", 3);

INSERT INTO employee (employee_name, role_id)
VALUES ("Fitzwilliam Darcy", 1);

INSERT INTO employee (employee_name, role_id)
VALUES ("Elizabeth Bennet", 4);

INSERT INTO employee (employee_name, role_id)
VALUES ("Tony Stark", 3);

INSERT INTO employee (employee_name, role_id)
VALUES ("Iris West-Allen", 5);

INSERT INTO employee (employee_name, role_id)
VALUES ("Oliver Queen", 5);

INSERT INTO employee (employee_name, role_id)
VALUES ("Wade Wilson", 1);