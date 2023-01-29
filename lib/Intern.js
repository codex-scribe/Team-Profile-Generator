const employee = require('./Employee');

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getRole() {
        console.log('Intern');
    }

    getSchool() {
        console.log(`${this.school}`)
    }
}

module.exports = Intern;