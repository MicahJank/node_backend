const db = process.env.DATABASE_URL;


module.exports = {
    find,
    findBy,
    findById,
    addUser,
    removeUser
}

function find() {
    return db('users').select('id', 'username');
}

function findBy(filter) {
    return db('users').where(filter).first();
}

function findById(id) {
    return db('users').where({id}).first().select('id', 'username');
}

function addUser(user) {
    return db('users').insert(user)
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