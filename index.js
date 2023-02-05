const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Employee = require('./lib/Employee');
const inquirer = require('inquirer');
const fs = require('fs');

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
]

const engineerQuestions =     [{
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
]

const internQuestions =     [{
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
]

const init = () => {
    fs.writeFile(
        "./db/employees.json", '[]',
        (err) => (err ? console.error(err) : console.log("success!"))
      )
    inquirer.prompt(managerQuestions).then((data) => {
        console.log(data);
        writeEmployees(data);
    }
    )
}




const writeEmployees = (newEmployee) => {

    let employeeList = fs.readFileSync("./db/employees.json");
    let elArray = JSON.parse(employeeList);
    elArray.push(newEmployee);
    employeeList = JSON.stringify(elArray);
    fs.writeFile(`./db/employees.json`, employeeList, (err) => err
        ? console.error(err)
        : console.log('New Employee has been written to JSON file!'))
    addMoreOption();
}

const addMoreOption = () => {
    inquirer.prompt({type: 'list', message: 'Do you want to add another employee?', choices: ['yes', 'no'], name: 'addAnother'})
    .then((response) => {
        if (response.addAnother == 'yes') {
            addEmployee();
        } else {}
    })
}

const addEmployee = () => {
    inquirer.prompt({type: 'list', message: 'What is this employee\'s role?', choices: ['Engineer', 'Intern'], name: 'newRole'})
    .then((response) => {
        switch (response.newRole) {
            case 'Engineer':
                EngineerQuestions();
                break;
            case 'Intern':
                InternQuestions;
                break;
        }

    })
}

const engineerPrompts = () => {

}

init();