const request = require('supertest');
const server = require('../../api/server.js');

const db = require('../../data/dbConfig.js');

// create a new user we can test logging in with
beforeAll( async () => {
    await db.seed.run(db);
    await request(server).post('/api/register').send({ username: 'Micah', email: 'micah@micah.com', password: 'secretpassword' });
})

describe('login router tests', () => {
    // logging in the user
    describe('logging in a user', () => {
        it('should return 200 OK', async () => {          
            const res = await request(server).post('/api/login').send({ username: 'Micah', password: 'secretpassword' });
            
            expect(res.status).toBe(200);
        });

        it('should return a JSON object', () => {
            return request(server).post('/api/login').send({ username: 'Micah', password: 'secretpassword' })
                    .then(res => {
                        expect(res.type).toBe('application/json');
                    })
        })

        it('should return a token in the body', () => {
            return request(server).post('/api/login').send({ username: 'Micah', password: 'secretpassword' })
            .then(res => {
                expect(res.body.token).toBeDefined();
                expect(typeof res.body.token).toBe('string');
            })
        });

        it('should return a user in the body', () => {
            return request(server).post('/api/login').send({ username: 'Micah', password: 'secretpassword' })
            .then(res => {
                expect(res.body.user).toBeDefined();
                expect(typeof res.body.user).toBe('object');
                expect(res.body.user.id).toBeDefined();
                expect(res.body.user.username).toBeDefined();
            })
        });
    });
})
