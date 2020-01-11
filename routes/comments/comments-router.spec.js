const request = require('supertest');
const server = require('../../api/server.js');

const Comments = require('./comments-model.js');
const db = require('../../data/dbConfig.js');


let token;
let id;
// create a new user we can test the comments-router routes with
beforeAll( async () => {
    await db.seed.run(db);
    const res = await request(server).post('/api/register').send({ username: 'Micah', email: 'micah@gmail.com', password: 'shamalamadingdong' });
    token = res.body.token;
    id = res.body.created_user.id;
});

describe('comments router testing', () => {
    describe('find saved comments', () => {
        it('should return 200 OK', async () => {
            const res = await request(server).get('/api/comments').set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
        });

        it('should return JSON', async () => {
            const res = await request(server).get('/api/comments').set('Authorization', `Bearer ${token}`);

            expect(res.type).toBe('application/json');
        });

        it('returned body should be an array of comments', async () => {
            const res = await request(server).get('/api/comments').set('Authorization', `Bearer ${token}`);

            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body).toHaveLength(0); // newly created user has not added any new comments
        });
    })

    describe('save comment', () => {
        it('should pass the tests', async () => {
            const comment = {
                troll_username: 'tricky_troll',
                comment_toxicity: 0.8,
                comment: 'Im a troll muahahahaha',
            };

            const res = await request(server).post('/api/comments').send(comment).set('Authorization', `Bearer ${token}`);
            
            expect(res.status).toBe(201);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body).toHaveLength(1);
        });
    });

    describe('delete a saved comment', () => {
        it('should pass the tests', async () => {
            const res = await request(server).delete('/api/comments').send({ id: 5 }).set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body).toHaveLength(0);
        })
    })
})