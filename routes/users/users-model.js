const db = require('../../data/dbConfig.js');


module.exports = {
    find,
    findBy,
    findById,
    addUser,
    removeUser,
    updateUsername
}

function find() {
    return db('users');
}

function findBy(filter) {
    return db('users').where(filter).first();
}

function findById(id) {
    return db('users').where({id}).first();
}

function addUser(user) {
    return db('users').returning('id').insert(user)
            .then(ids => {
                const [id] = ids;
                return findById(id);
            });
}

// remove the specified user and then return all users
function removeUser(id) {
    return db('users').where({id}).del()
            .then(count => {
                return find();
            })
}

function updateUsername(id, newUsername) {
    return db('users').returning('id').where({ id }).update(newUsername)
            .then(ids => {
            const [id] = ids;
                return findById(id);
            })
}