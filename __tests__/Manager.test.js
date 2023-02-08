const Manager = require('../lib/Manager')
const joe = new Manager('Joe', 392, 'joe@gmail.com', 44);

test('Can instatiate an Employee', ()=>{
 expect(typeof(joe)).toBe('object')
});
test('Can set name', () => {
    expect(joe.name).toBe('Joe');
});

test('getRole method returns Manager', () => {
    expect(joe.getRole()).toBe('Manager');
})