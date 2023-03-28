const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'enterPasswordHere',
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
            "View All Employees",
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
            case "Add an Employee":
                addEmployee();
                break;
            case "Update an Employee Role":
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
    startPrompt()
   });
}

function viewRoles() {
    console.log("Viewing all Roles...\n");
    connection.query("SELECT role.title AS 'Title', role.id AS 'Role ID', department.name AS 'Department', role.salary AS 'Salary' FROM role JOIN department ON role.department_id = department.id", function(err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt()
    });
}

function viewEmployees() {
    console.log("Viewing all Employees...\n");
    connection.query("SELECT employee.id AS 'Employee ID', employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Title', department.name AS 'Department', role.salary AS 'Salary', CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager' FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id", function(err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt()
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
            startPrompt();
        })
    })
}

function addRole() {
    console.log("Adding a new role...\n");
    connection.query("SELECT id, name FROM department", function(err, res) {
        if (err) throw err;
        const deptChoices = res.map(department => ({
            value: department.id,
            name: department.name
        }));
    
    inquirer
    .prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of the new role?",
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for the new role?",
        },
        {
            name: "departmentId",
            type: "list",
            message: "What department does the new role fall under?",
            choices: deptChoices,
        }
    ])
    .then(function (answer) {
        connection.query("INSERT INTO role SET ?",
        {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentId,
        },
        function (err, res) {
            if (err) throw err;
            console.table(res);
            console.log(res.affectedRows + " role inserted.\n");
            startPrompt();
        });
    });
});

}

function addEmployee() {
    console.log("Adding a new employee...\n");
    connection.query("SELECT id, title FROM role", function (err,res) {
        if (err) throw err;
        const roleChoices = res.map(role => ({
            name: role.title,
            value: role.id,
        }));
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", function (err, res) {
        if (err) throw err;
        const managerChoices = res.map(manager => ({
            name: manager.name,
            value: manager.id,
        }));
    
    inquirer
    .prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "roleId",
            type: "list",
            message: "What is the employee's role?",
            choices: roleChoices
        },
        {
            name: "managerId",
            type: "list",
            message: "Who is the employee's manager?",
            choices: managerChoices
        }

    ])
    .then(function (answer) {
        connection.query("INSERT INTO employee set ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleId,
            manager_id: answer.managerId
        },
        function (err, res) {
            if (err) {
                console.log("Error adding employee: " + err);
            } else {
            console.log(res.affectedRows + " employee added.\n");
            startPrompt();
    }});
    });
});
});
}

function updateEmployee() {
   console.log("Updating an employee's role...\n") ;
   connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", function (err, res) {
    if (err) throw err;
    const employeeChoices = res.map(employee => ({
        name: employee.name,
        value: employee.id,
    }));
    connection.query("SELECT id, title FROM role", function (err, res) {
        if (err) throw err;
        const roleChoices = res.map(role => ({
            name: role.title, 
            value: role.id,
        }));
        inquirer.prompt([
            {
            name: "employeeId", 
            type: "list",
            message: "Which employee's role do you wish to update?",
            choices: employeeChoices
            },
            {
                name: "roleId",
                type: "list",
                message: "What role do you wish to change this employee to?",
                choices: roleChoices
            }
        ])
        .then(function (answer) {
            connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answer.roleId, answer.employeeId], function (err, res) {
                if (err) {
                    console.log("Error updating employee role: " + err.message);
                } else {
                    console.log(res.affectedRows + "employee updated. \n");
                    startPrompt();
                }
            });
        });
    });
   });
}