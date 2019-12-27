const request = require('supertest');
const server = require('../../api/server.js');

const db = require('../../data/dbConfig.js');

afterAll(async () => {
    await db('users').where({username: 'John'}).truncate()
})

describe('register-router testing', () => {

    describe('registering a user', () => {
        it('should return 201 OK', async () => {

            const res =  await request(server).post('/api/register').send({ username: 'John', password: 'johnsnewpassword' });

            expect(res.status).toBe(201);
            expect(res.type).toBe('application/json');
            expect(res.body.token).toBeDefined();
            expect(typeof res.body.token).toBe('string');
        })
    })
})