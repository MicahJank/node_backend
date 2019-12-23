const genToken = require('./genToken.js');

describe('generate token helper function', () => {
    it('should generate and return a token as a string', () => {
        const token = genToken({id: 1, username: 'Micah' });

        expect(token).toBeDefined();
        expect(token).toBeTruthy();
        expect(token).not.toBeNull();
        expect(typeof token).toBe('string');
    })

})