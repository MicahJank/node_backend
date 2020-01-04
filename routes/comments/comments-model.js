const db = require('../../data/dbConfig.js');

module.exports = {
    findSaved,
    saveComment,
    deleteComment
}

// returns all the comments the current user has saved in the database
// it is important to note that we are ONLY returning comments that belong to the user id that is passed in
function findSaved(users_id) {
    return db('comments').where({ users_id }).select('id', 'troll_username', 'comment_toxicity', 'comment');
}

// saves the comment to the database and returns a list of all saved comments by the current user
function saveComment(comment, users_id) {
    return db('comments').returning('users_id').insert({ ...comment, users_id })
            .then(usersIds => {
                const [id] = usersIds;
                return findSaved(id); // return only comments that belong to the user who saved the comment
            });
}

// deletes the comment from the database that has the specified id
function deleteComment(id) {
    return db('comments').where({ id }).returning('users_id').del()
            .then(idArray => {
                const [id] = idArray;
                return findSaved(id); // again the list of comments that should be returned belong ONLY to the user who deleted the comment
            });
}

