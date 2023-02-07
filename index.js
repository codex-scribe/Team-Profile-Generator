const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const fs = require("fs");
let employeeArray = [];
let pageHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous"
    />
    </head>
    <header>
    <title>Team Profile Page</title>
    <nav class="navbar navbar-emp">
    <span class="navbar-brand mb-0 h1">Team Profiles</span></nav> </header>
    <body>
    <div class="row border-dark" id="card-area">`;

//Sets of questions for the inquirer prompts
const managerQuestions = [
  {
    type: "input",
    message: "Please enter the name of the manager:",
    name: "name",
  },
  {
    type: "input",
    message: "Please enter the manager's employee id:",
    name: "id",
  },
  {
    type: "input",
    message: "Please enter the manager's email:",
    name: "email",
  },
  {
    type: "input",
    message: "Please enter the manager's office number:",
    name: "officeNumber",
  },
];

const engineerQuestions = [
  {
    type: "input",
    message: "Please enter the name of the engineer:",
    name: "name",
  },
  {
    type: "input",
    message: "Please enter the engineer's employee id:",
    name: "id",
  },
  {
    type: "input",
    message: "Please enter the engineer's email:",
    name: "email",
  },
  {
    type: "input",
    message: "Please enter the engineer's github username:",
    name: "github",
  },
];

const internQuestions = [
  {
    type: "input",
    message: "Please enter the name of the intern:",
    name: "name",
  },
  {
    type: "input",
    message: "Please enter the intern's employee id:",
    name: "id",
  },
  {
    type: "input",
    message: "Please enter the intern's email:",
    name: "email",
  },
  {
    type: "input",
    message: "Please enter the intern's school:",
    name: "school",
  },
];

//logic to run when page initializes
const init = () => {
  //Manager questions
  inquirer.prompt(managerQuestions).then((data) => {
    const manager = new Manager(
      data.name,
      data.id,
      data.email,
      data.officeNumber
    );
    employeeArray.push(manager);
    addMoreOption();
  });
};

//asks if the user would like to add another employee
const addMoreOption = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Do you want to add another employee?",
      choices: ["yes", "no"],
      name: "addAnother",
    })
    .then((response) => {
      if (response.addAnother == "yes") {
        addEmployee();
      } else {
        createPage();
      }
    });
};

//
const addEmployee = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What is this employee's role?",
      choices: ["Engineer", "Intern"],
      name: "newRole",
    })
    .then((response) => {
      switch (response.newRole) {
        case "Engineer":
          engineerPrompts();
          break;
        case "Intern":
          internPrompts();
          break;
      }
    });
};

const engineerPrompts = () => {
  inquirer.prompt(engineerQuestions).then((data) => {
    const engineer = new Engineer(data.name, data.id, data.email, data.github);
    employeeArray.push(engineer);
    addMoreOption();
  });
};

const internPrompts = () => {
  inquirer.prompt(internQuestions).then((data) => {
    const intern = new Intern(data.name, data.id, data.email, data.school);
    employeeArray.push(intern);
    addMoreOption();
  });
};

const createPage = () => {
  for (let i = 0; i < employeeArray.length; i++) {
    var currentEmployee = employeeArray[i];
    console.log(currentEmployee);
    let empString = `<div class="text-white bg-secondary m-3 rounded" style="min-width: 20rem"><div class='card-header emp-head'>${currentEmployee.name} <br> ${currentEmployee.class} </div> <div class='card-body emp-body'> <p>ID: ${currentEmployee.id} </p> <p>email: ${currentEmployee.email} </p>`;
    pageHTML = pageHTML.concat(empString);
    if (currentEmployee.officeNumber) {
      pageHTML = pageHTML.concat(
        `<p>Office Number: ${currentEmployee.officeNumber} </p> </div></div>`
      );
    } else if (currentEmployee.github) {
      pageHTML = pageHTML.concat(
        `<p>Github: ${currentEmployee.github} </p> </div></div>`
      );
    } else if (currentEmployee.school) {
      pageHTML = pageHTML.concat(
        `<p>School: ${currentEmployee.school} </p> </div></div>`
      );
    }
  }
  pageHTML = pageHTML.concat(`</div></div><script
  src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
  integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
  integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
  integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
  crossorigin="anonymous"
></script>
</body></html>`);
fs.writeFile('./dist/index.html', pageHTML, (err) =>
err ? console.error(err) : console.log('Success!'))
};

init();
