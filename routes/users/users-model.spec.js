const Users = require('./users-model.js');
const db = require('../../data/dbConfig.js');

afterEach(async () => {
    await db('users').where({username: 'BillyBob'}).truncate()
})

describe('users model testing', () => {
    describe('addUser', () => {
        it('should add the user to the database',  async () => {
            const user = await Users.addUser({ username: 'BillyBob', password: 'mycoolpassword' });

            expect(user).toBeDefined();
            expect(typeof user).toBe('object');
            expect(user.username).toBe('BillyBob');
        });
    });

    describe('find', () => {
        it('should find and return an array off all the users in the database', async () => {
            await db('users').insert({ username: 'BillyBob', password: 'mycoolpassword' })
            const users = await Users.find();
            
            expect(users).toBeDefined();
            expect(Array.isArray(users)).toBe(true);
            expect(users).toHaveLength(1);

        });

    });

    describe('findBy', () => {
        it('should find and return the user by username', async () => {
            await db('users').insert({ username: 'BillyBob', password: 'mycoolpassword' })
            const foundUser = await Users.findBy({ username: 'BillyBob' })

            expect(foundUser).toBeDefined();
            expect(typeof foundUser).toBe('object');
            expect(foundUser.username).toBe('BillyBob');
        });
    });

    describe('findById', () => {
        it('should find the user by the passed in id', async () => {
            const createUser = await db('users').returning('id').insert({ username: 'BillyBob', password: 'mycoolpassword' })
            const  [id]  = createUser;
            const user = await Users.findById(id);

            expect(user).toBeDefined();
            expect(typeof user).toBe('object');
            expect(user.id).toBe(id);

        })

    });

    describe('removeUser', () => {
        it('should return an array of users after removing the user with the specified id', async () => {
            const createUser = await db('users').returning('id').insert({ username: 'BillyBob', password: 'mycoolpassword' })
            const  [id]  = createUser;
            const users  = await Users.removeUser(id);

            expect(users).toBeDefined();
            expect(Array.isArray(users)).toBe(true);
        })
    });

    describe('updateUsername', () => {
        it('return the updated user', async () => {
            const createUser = await db('users').returning('id').insert({ username: 'BillyBob', password: 'mycoolpassword' })
            const  [id]  = createUser;

            const updatedUser = await Users.updateUsername(id, { username: 'NewBillyBob'});

            expect(updatedUser).toBeDefined();
            expect(typeof updatedUser).toBe('object');
            expect(updatedUser.username).toBe('NewBillyBob');
        } )
    })

})