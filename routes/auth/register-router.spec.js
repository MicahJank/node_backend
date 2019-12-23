const request = require('supertest');
const server = require('../../api/server.js');

const db = require('../../data/dbConfig.js');

describe('register-router testing', () => {

    describe('registering a user', () => {
        it('should return 201 OK', () => {
            return db('users').truncate()
                    .then(() => {
                        return request(server).post('/api/register').send({ username: 'John', password: 'johnsnewpassword' })
                    })
                    .then(res => {
                        expect(res.status).toBe(201);
                    });
        })

        it('should return a JSON object', () => {
            return db('users').truncate()
                    .then(() => {
                        return request(server).post('/api/register').send({ username: 'John', password: 'johnsnewpassword' })
                    })
                    .then(res => {
                        expect(res.type).toBe('application/json');
                    });
        })

        it('should return a token in the body', () => {
            return db('users').truncate()
                    .then(() => {
                        return request(server).post('/api/register').send({ username: 'John', password: 'johnsnewpassword' })
                    })
                    .then(res => {
                        expect(res.body.token).toBeDefined();
                        expect(typeof res.body.token).toBe('string');
                    });
        })
    })
})