const request = require('supertest');
const server = require('../../api/server.js');

const db = require('../../data/dbConfig.js');

let token;
// create a new user we can test the user-router routes with
beforeAll( async () => {
    await db('users').where({username: 'Jenny'}).truncate();
   const res = await request(server).post('/api/register').send({ username: 'Jenny', password: 'secretpassword' });
   token = res.body.token;
})

afterAll(async () => {
    await db('users').where({username: 'Jenny'}).truncate();
})

describe('users-router testing', () => {

    describe('GET a list of all registered users at endpoint /api/users', () => {
        it('should return 200 OK', async () => {
            const res = await request(server).get('/api/users').set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
        })
    })

    describe('PUT/UPDATE a specific user at endpoint /api/users', () => {
        it('should return 200 OK', async () => {

        })
    })

    describe('DELETE a specific user at endpoint /api/users', () => {
        it('should return 200 OK', async () => {
            
        })
    })
})