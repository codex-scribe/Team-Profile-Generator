const Employee = require('../lib/Employee')
const joe = new Employee('Joe', 392, 'joe@gmail.com');

test('Can instatiate an Employee', ()=>{
 expect(typeof(joe)).toBe('object')
});
test('Can set name', () => {
    expect(joe.name).toBe('Joe');
});

test('getName method returns the name', () => {
    expect(joe.getName()).toBe('Joe');
})