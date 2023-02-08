const Engineer = require('../lib/Engineer')
const joe = new Engineer('Joe', 392, 'joe@gmail.com', 'catsocks');

test('Can instatiate an Employee', ()=>{
 expect(typeof(joe)).toBe('object')
});
test('Can set name', () => {
    expect(joe.name).toBe('Joe');
});

test('getGithub method returns the github', () => {
    expect(joe.getGithub()).toBe('catsocks');
})