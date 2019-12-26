const request = require('supertest');
const server = require('../../api/server.js');

const db = require('../../data/dbConfig.js');


// let token;
// let id;
// // create a new user we can test logging in with
// beforeAll(done => {
//     db('users').truncate()
//         .then(() => {
//             request(server).post('api/register').send({ username: 'Micah', password: 'secretpassword' })
//             .end((err, response) => {
//                 token = response.body.token;
//                 id = response.body.created_user.id;
//                 done();
//             });
//         })
// })

beforeAll(async () => {
    await db('users').truncate();
})

describe('login router tests', () => {
    // logging in the user
    describe('logging in a user', () => {
        it('should return 200 OK', () => {
            return registerUser({ username: 'Micah', password: 'secretpassword' })
                        .then(res => {
                            return res;
                        })
                        .then(res => {
                            return request(server).post('/api/login').send({ username: 'Micah', password: 'secretpassword' })
                        })
                        .then(res => {
                            expect(res.status).toEqual(200);
                            db('users').truncate();
                        })

            
            // return request(server).post('/api/login').send({ username: 'Micah', password: 'secretpassword' })
            //             .then(res => {
            //                 expect(res.status).toBe(200);
            //             })
        });

        // it('should return a JSON object', () => {
        //     return request(server).post('/api/login').send(user)
        //             .then(res => {
        //                 expect(res.type).toBe('application/json');
        //             })
        // })

        // it('should return a token in the body', () => {
        //     return request(server).post('/api/login').send(user)
        //     .then(res => {
        //         expect(res.body.token).toBeDefined();
        //         expect(typeof res.body.token).toBe('string');
        //     })
        // });

        // it('should return a user in the body', () => {
        //     return request(server).post('/api/login').send(user)
        //     .then(res => {
        //         expect(res.body.user).toBeDefined();
        //         expect(typeof res.body.user).toBe('object');
        //         expect(res.body.user.id).toBeDefined();
        //         expect(res.body.user.username).toBeDefined();
        //     })
        // });
    });
})


function registerUser(user) {
    return request(server).post('/api/register').send(user)
            .then(res => {
                return res;
            })
}

async function clearDB() {
    await db('users').truncate();
}