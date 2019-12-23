const Users = require('./users-model.js');
const db = require('../../data/dbConfig.js');



describe('users model testing', () => {
    describe('addUser', () => {
        it('should add the user to the database', () => {
            return db('users').truncate()
                            .then(res => {
                                return Users.addUser({ username: 'BillyBob', password: 'mycoolpassword' })
                            })
                            .then(res => {
                                return Users.findById(res.id)
                            })
                            .then(res => {
                                expect(res).toBeDefined();
                                expect(res.username).toBe('BillyBob');
                            })
        });
    });

    describe('find', () => {
        it('should find and return an array off all the users in the database', () => {
            return Users.find()
                .then(res => {
                    expect(res).toBeDefined();
                    expect(Array.isArray(res)).toBe(true);
                });
        });
    });

    describe('findBy', () => {
        it('should find and return the user by username', () => {
            return Users.findBy({ username: 'BillyBob' })
                        .then(res => {
                            expect(res).toBeDefined();
                            expect(typeof res).toBe('object');
                            expect(res.username).toBe('BillyBob');
                        })
        });
    });

    describe('findById', () => {
        it('should return the user with the specified id', () => {
            return Users.findById(1)
                        .then(res => {
                            expect(res).toBeDefined();
                            expect(typeof res).toBe('object');
                            expect(res.id).toBe(1);
                        })
        });
    });

    describe('removeUser', () => {
        it('should return an array of users', () => {
            return Users.removeUser(1)
                        .then(res => {
                            expect(res).toBeDefined();
                            expect(Array.isArray(res)).toBe(true);
                        })
        })
    })

})