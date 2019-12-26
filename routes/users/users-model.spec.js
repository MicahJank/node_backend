const Users = require('./users-model.js');
const db = require('../../data/dbConfig.js');

beforeAll(async () => {
    await db('users').truncate();
})

describe('users model testing', () => {
    describe('addUser', () => {
        it('should add the user to the database',  async () => {
    
            const newUser = await Users.addUser({ username: 'BillyBob', password: 'mycoolpassword' });

            expect(newUser).toBeDefined();
            expect(typeof newUser).toBe('object');
            expect(newUser.username).toBe('BillyBob');
        });
    });

    describe('find', () => {
        it('should find and return an array off all the users in the database', async () => {
            const users = await Users.find();
            
            expect(users).toBeDefined();
            expect(Array.isArray(users)).toBe(true);

        });

    });

    describe('findBy', () => {
        it('should find and return the user by username', async () => {
            const newUser2 = await Users.addUser({ username: 'JohnnyJohn', password: 'mycoolpassword' });
            const user = await Users.findBy({ username: 'JohnnyJohn' })

            expect(user).toBeDefined();
            expect(typeof user).toBe('object');
            expect(user.username).toBe('JohnnyJohn');
        });
    });

    describe('findById', () => {
        it('should return the user with the specified id', async () => {
            const user = await Users.findById(1);

            expect(user).toBeDefined();
            expect(typeof user).toBe('object');
            expect(user.id).toBe(1);

        });
    });

    describe('removeUser', () => {
        it('should return an array of users after removing the user with the specified id', async () => {
            const users  = await Users.removeUser(1);

            expect(users).toBeDefined();
            expect(Array.isArray(users)).toBe(true);
        })
    })

})