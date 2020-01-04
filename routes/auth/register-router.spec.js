const request = require('supertest');
const server = require('../../api/server.js');

const db = require('../../data/dbConfig.js');

let user;
beforeAll(async () => {
    await db.seed.run(db);
    user =  await request(server).post('/api/register').send({ username: 'John', password: 'johnsnewpassword' });
});

describe('register-router testing', () => {

    describe('registering a user', () => {
        it('should return 201 OK', async () => {
            expect(user.status).toBe(201);
            expect(user.type).toBe('application/json');
            expect(user.body.token).toBeDefined();
            expect(typeof user.body.token).toBe('string');
        })
    })
})