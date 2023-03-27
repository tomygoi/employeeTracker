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