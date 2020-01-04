const Users = require('./users-model.js');
const db = require('../../data/dbConfig.js');

let user;
beforeEach(async () => {
    await db.seed.run(db);
    user = await Users.addUser({ username: 'BillyBob', password: 'mycoolpassword' });
});

describe('users model testing', () => {
    describe('addUser', () => {
        it('should add the user to the database',  async () => {

            expect(user).toBeDefined();
            expect(typeof user).toBe('object');
            expect(user.username).toBe('BillyBob');
        });
    });

    describe('find', () => {
        it('should find and return an array off all the users in the database', async () => {
            const users = await Users.find();
            
            expect(users).toBeDefined();
            expect(Array.isArray(users)).toBe(true);
            expect(users).toHaveLength(5);

        });

    });

    describe('findBy', () => {
        it('should find and return the user by username', async () => {
            const foundUser = await Users.findBy({ username: 'BillyBob' })

            expect(foundUser).toBeDefined();
            expect(typeof foundUser).toBe('object');
            expect(foundUser.username).toBe('BillyBob');
        });
    });

    describe('findById', () => {
        it('should find the user by the passed in id', async () => {
            const user = await Users.findById(5);

            expect(user).toBeDefined();
            expect(typeof user).toBe('object');
            expect(user.id).toBe(5);

        })

    });

    describe('removeUser', () => {
        it('should return an array of users after removing the user with the specified id', async () => {

            const users  = await Users.removeUser(5);

            expect(users).toBeDefined();
            expect(Array.isArray(users)).toBe(true);
        })
    });

    describe('updateUsername', () => {
        it('return the updated user', async () => {
            const updatedUser = await Users.updateUsername(user.id, { username: 'NewBillyBob'});

            expect(updatedUser).toBeDefined();
            expect(typeof updatedUser).toBe('object');
            expect(updatedUser.username).toBe('NewBillyBob');
        } )
    })

})