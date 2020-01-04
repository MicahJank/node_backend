const Comments = require('./comments-model.js');
const db = require('../../data/dbConfig.js');

beforeEach(async () => {
    await db.seed.run(db);
});

describe('comments model testing', () => {

    describe('saveComment', () => {
        it('should add the comment to the database', async () => {
            const comments = await Comments.saveComment({
                troll_username: 'troll_lova',
                comment_toxicity: 0.6,
                comment: 'Im a troll muahahahaha'
            }, 1);

            expect(comments).toBeDefined();
            expect(Array.isArray(comments)).toBe(true);
            expect(comments).toHaveLength(3);
        })
    })

    describe('findSaved', () => {
        it('should return a list of all the saved comments that the currently logged in user has saved', async () => {
            const comments = await Comments.findSaved(1);

            expect(comments).toBeDefined();
            expect(Array.isArray(comments)).toBe(true);
            expect(comments).toHaveLength(2);
        });
    });

    describe('deleteComment', () => {
        it('should delete the saved comment from the database', async () => {
            const comments = await Comments.deleteComment(1)

            expect(comments).toBeDefined();
            expect(Array.isArray(comments)).toBe(true);
            expect(comments).toHaveLength(1);
        })
    })
})