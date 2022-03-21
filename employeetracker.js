//Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

//creates connection for the SQL Database
const connection = mysql.createConnection({
  host: "localhost",

  //sets up the port
  port: 3306,

  //username
  user: "root",

  //password
  password: "12345678",
  database: "employee_trackerDB"
});

//connects to MySQL server and database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  //function to start the questions 
  mainMenu();
});

//function to finish or return to the main menu
function mainMenu() {
  inquirer.prompt([{
    type: "list",
    name: "mainMenu",
    choices: ["Main Menu", "Finish"]
  }]).then(answer => {
    if (answer.mainMenu === "Main Menu") {
      userPrompt();
    } else {
      connection.end();
    }
  });
}

//function to add new employee
function addEmployee() {
  return inquirer.prompt([{
    type: "input",
    name: "name",
    message: "Please input the employee's name."
  }]).then(employeeAnswer => {
    connection.query("INSERT INTO employee SET ?", {
      employee_name: employeeAnswer.name,
    }, function (err) {
      if (err) {
        throw err;
      } else {
        console.log("\nNew Employee Added!\n")
        addRole();
      }
    });
  });
}

//function to add new department
function addDepartment() {
  return inquirer.prompt([{
    type: "input",
    name: "addDepartment",
    message: "What department does the employee work in?",
    choices: [
      "Sales",
      "Engineering",
      "Finance",
      "Legal",
    ]
  }]).then(answer => {
    connection.query("INSERT INTO department SET ?", {
      name: answer.addDepartment
    }, function (err) {
      if (err) {
        throw err;
      } else {
        console.log("\nNew Department Added\n");
        mainMenu();
      }
    });
  });
}

//function to add new role
function addRole() {
  return inquirer.prompt([{
    type: "list",
    name: "roleChoices",
    message: "What is the employee's title?",
    choices: [
      "Sales Lead",
      "Salesperson",
      "Software Engineer",
      "Account Manager",
      "Accountant",
      "Legal Team Lead"]
  }, {
    type: "input",
    name: "salary",
    message: "What is the salary for this role?"
  }, {
    type: "input",
    name: "departmentID",
    message: "Please input the department ID for this role.",
    // choices: [
    //   "1 - Sales",
    //   "2 - Engineering",
    //   "3 - Finance",
    //   "4 - Legal"
    // ]
}]).then(roleAnswer => {
    connection.query("INSERT INTO role SET ?", {
      title: roleAnswer.roleChoices,
      salary: roleAnswer.salary,
      department_id: roleAnswer.departmentID
    }, function (err) {
      if (err) {
        throw err;
      } else {
        console.log("\nNew Role Added\n")
        mainMenu();
      }
    });
  });
}

//function to view all employees
function viewEmployees() {
  connection.query("SELECT employee_name FROM employee", function (err, result) {
    for (let i = 0; i < result.length; i++);
    if (err) {
      throw err
    } else {
      console.log(result);
      console.table(result);
      mainMenu();
    }
  });
}

//function to all departments
function viewByDepartment() {
  connection.query("SELECT name FROM department", function (err, result) {
    for (let i = 0; i < result.length; i++);
    if (err) {
      throw err
    } else {
      console.log(result);
      console.table(result);
      mainMenu();
    }
  });
}


//function to view all roles
function viewRole() {
  connection.query("SELECT title, salary FROM role", function (err, result) {
    for (let i = 0; i < result.length; i++);
    if (err) {
      throw err
    } else {
      console.log(result);
      console.table(result);
      mainMenu();
    }
  });
}

//Prompts initial employee questions
function userPrompt() {
  return inquirer.prompt([{
    type: "list",
    name: "firstQuestion",
    message: "What would you like to do?",
    choices: [
      "Add Employee",
      "View All Employees",
      "View All Departments",
      "View All Roles",
      "Exit"
    ]
  }]).then(userInput => {
    switch (userInput.firstQuestion) {
      case "Add Employee":
        addEmployee(userInput);
        break;
      case "View All Employees":
        viewEmployees(userInput);
        break;
      case "View All Departments":
        viewByDepartment(userInput);
        break;
      case "Add Employee Role":
        addRole(userInput);
        break;
      case "View All Roles":
        viewRole(userInput);
        break;
      case "Add Employee Department":
        addDepartment(userInput);
        break;
      case "Exit":
        connection.end(userInput);
        break;
    }
  });
};