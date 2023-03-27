const inquirer = require("inquirer");
const mysql = require("mysql");
const Connection = require("mysql2/typings/mysql/lib/Connection");
require("console.table");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Potatocodge23!',
        database: 'employeesDB'
    },
    console.log('Conncted to the employeesDB database')
);

connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as ID" + connection.threadId)
    startPrompt();
});

function startPrompt() {
    inquirer
    .prompt({
        type: "list", 
        name: "task", 
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View all Employees",
            "Add a Department",
            "Add a role",
            "Add an Employee",
            "Update an Employee Role",
            "End Program"
        ]
    })
    .then(function ({task}) {
        switch (task) {
            case "View All Departments":
                viewDepartments();
                break;
            case "View All Roles": 
                viewRoles();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "add an Employee":
                addEmployee();
                break;
            case "Update an Employee":
                updateEmployee();
                break;
            case "End Program":
                connection.end();
                break;
        }
    });
}

function viewDepartments() {
    console.log("Viewing all Departments...\n");

   connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.table(res);
   });
}

function viewRoles() {
    console.log("Viewing all Roles...\n");
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
    });
}

function viewEmployees() {
    console.log("Viewing all Employees...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
    });
}

function addDepartment() {
    console.log("Adding a new department...\n")
    inquirer
    .prompt({
        name: "departmentName",
        type: "input",
        message: "What is the name of the new department?",
    })
    .then(function (answer) {
        connection.query("INSERT INTO department SET ?",
        {
            name: answer.departmentName,
        },
        function (err, res) {
            if (err) throw err;
            console.table(res);
            firstPrompt();
        })
    })
}

function addRole() {
    console.log("Adding a new role...\n");
    

}

function addEmployee() {

}

function updateEmployee() {

}