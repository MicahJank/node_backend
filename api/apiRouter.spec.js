const request = require('supertest');
const server = require('./server.js');


describe('api router tests', () => {
    
    describe('GET the /api endpoint', () => {
        it('should return 200 OK', () => {
            return request(server).get('/api')
                    .then(res => {
                        expect(res.status).toBe(200);
                    })
        })
        it('should return html', () => {
            return request(server).get('/api')
                    .then(res => {
                        expect(res.type).toBe('text/html');
                        expect(res.text).toBe('<h1>Api is up and running</h1>')
                    })
        })
    })
})