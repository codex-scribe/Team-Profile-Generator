const Intern = require('../lib/Intern')
const joe = new Intern('Joe', 392, 'joe@gmail.com', 'Beekman');

test('Can instatiate an Employee', ()=>{
 expect(typeof(joe)).toBe('object')
});
test('Can set name', () => {
    expect(joe.name).toBe('Joe');
});

test('getSchool method returns the school', () => {
    expect(joe.getSchool()).toBe('Beekman');
})