const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Employee = require('./lib/Employee');
const inquirer = require('inquirer');
const fs = require('fs');

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

//logic to run when page initializes
const init = () => {
    fs.writeFile(
        "./db/employees.json", '[]',
        (err) => (err ? console.error(err) : console.log("success!"))
      )
      //Manager questions
    inquirer.prompt(managerQuestions).then((data) => {
        const manager = new Manager (data.name, data.id, data.email, data.officeNumber);
        console.log(manager);
        writeEmployees(manager);
    }
    )
}



//Writes data proved by user to a file
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

//asks if the user would like to add another employee
const addMoreOption = () => {
    inquirer.prompt({type: 'list', message: 'Do you want to add another employee?', choices: ['yes', 'no'], name: 'addAnother'})
    .then((response) => {
        if (response.addAnother == 'yes') {
            addEmployee();
        } else {
            createPage();
        }
    })
}

//
const addEmployee = () => {
    inquirer.prompt({type: 'list', message: 'What is this employee\'s role?', choices: ['Engineer', 'Intern'], name: 'newRole'})
    .then((response) => {
        switch (response.newRole) {
            case 'Engineer':
                engineerPrompts();
                break;
            case 'Intern':
                internPrompts();
                break;
        }

    })
}

const engineerPrompts = () => {
    inquirer.prompt(engineerQuestions).then((data) => {
        const engineer = new Engineer (data.name, data.id, data.email, data.github);
        writeEmployees(engineer);
    })
}

const internPrompts = () => {
    inquirer.prompt(internQuestions).then((data) => {
        const intern = new Intern (data.name, data.id, data.email, data.school);
        writeEmployees(intern);
    })
}

const createPage = () => {
    
    fs.writeFile(`index.html`, `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    `,(err) => err
        ? console.error(err)
        : console.log('New Employee Team Page has been generated!'))
}

init();