const db = require('../../data/dbConfig.js');

module.exports = {
    findSaved,
    saveComment,
    deleteComment,
    findById
}

// returns all the comments the current user has saved in the database
// it is important to note that we are ONLY returning comments that belong to the user id that is passed in
function findSaved(users_id) {
    return db('comments').where({ users_id }).select('id', 'troll_username', 'comment_toxicity', 'comment');
}

// to avoid users from deleting other users comments, we need to verify specifically that the comment id the user is deleting is a part
// of their saved comments
function findById(id, users_id) {
    // findSaved will return the currently logged in users saved comments
    return findSaved(users_id)
            .then(comments => {
                // if the comment id we are trying to delete matches a comment id in the array that means the comment is the saved users comment
                if(comments.some(comment => comment.id === id)) {
                    return db('comments').where({id}).first();
                } else {
                    throw 'Cannot find comment with specified id.';
                }
            })
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

