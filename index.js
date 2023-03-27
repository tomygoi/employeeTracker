const inquirer = require("inquirer");
const mysql = require("mysql");
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
            "Update an Employee Role"
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
        }
    });
}