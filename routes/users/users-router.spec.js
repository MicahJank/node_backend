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

        it('res should return be a json object', async () => {
            const res = await request(server).get('/api/users').set('Authorization', `Bearer ${token}`);

            expect(res.type).toBe('application/json');
        })

        it('res should return an array in the body', async () => {
            const res = await request(server).get('/api/users').set('Authorization', `Bearer ${token}`);

            expect(Array.isArray(res.body)).toBe(true);
        })
    })

    describe('PUT/UPDATE a specific user at endpoint /api/users', () => {
        it('should return 200 OK', async () => {
            const res = await request(server).put('/api/users').send({ username: 'UpdatedJenny' }).set('Authorization', `Bearer ${token}`);
            
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
            expect(res.body.username).toBe('UpdatedJenny');
        })
    })

    describe('DELETE a specific user at endpoint /api/users', () => {
        it('should return 200 OK', async () => {
            const res = await request(server).delete('/api/users').set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.users)).toBe(true);
            expect(res.body.message).toBeDefined();
            expect(typeof res.body.message).toBe('string');
            expect(res.body.message).toMatch('successfully');
        })
    })
})