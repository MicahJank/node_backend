// --- this file is used by the server at the /graphql endpoint -- look at the server.js file to see more

// bringing in the model files because i want to use the model functions to get the data
const Users = require('../routes/users/users-model.js');
const Comments = require('../routes/comments/comments-model.js');

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList, GraphQLSchema, GraphQLNonNull } = require('graphql');

// these userTypes and CommentType here are kinda of like schemas in migrations - this is what determines the kind of data we will get back
// below in our RootQuery when we make the requests
const UserType = new GraphQLObjectType({
   name: 'User',
   fields: () => ({
       id: { type: GraphQLInt },
       username: { type: GraphQLString },
       email: { type: GraphQLString },
       password: { type: GraphQLString }
   }) 
});

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLInt },
        troll_username: { type: GraphQLString },
        comment_toxicity: { type: GraphQLFloat },
        comment: { type: GraphQLString },
        // users_id: { type: GraphQLInt }
    }) 
 });

 // Root Query -- think of this like the routes that you make in express
 // we are building out the different datasets and will be using our model files
 // to bring in the data from the database we want
 // NOTE: These are like the GET REQUEST - we are only returning data here not adding it look at mutations below to see about adding data
 const RootQuery = new GraphQLObjectType({
     name: 'RootQueryType',
     fields: {
         // gets a list of users
         users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                // this is where we actually get our data
                return Users.find()
                        .then(res => {
                            return res
                        })
                        .catch(err => console.log(err));
            }
         },
         // gets a list of comments for a specific user
         comments: {
             type: new GraphQLList(CommentType),
             args: {
                 users_id: { type: GraphQLInt } // below in the resolve i can now use the users_id inside the findSaved parameter
             },
             resolve(parent, args) {
                return Comments.findSaved(args.users_id)
                    .then(res => res)
                    .catch(err => console.log(err));

             }
         },
         // gets a user by their username
         userByUsername: {
             type: UserType,
             args: {
                 username: { type: GraphQLString }
             },
             resolve(parent, args) {
                 return Users.findBy({username: args.username})
                    .then(res => res)
                    .catch(err => console.log(err));
             }
         },
         // gets a user by their id
         userById: {
             type: UserType,
             args: {
                 id: { type: GraphQLInt }
             },
             resolve(parent, args) {
                 return Users.findById(args.id)
                    .then(res => res)
                    .catch(err => console.log(err));
             }
         }
     }
 });

// mutations are like the request that manipulate the data in some way like PUT POST and DELETE
 const mutation = new GraphQLObjectType({
     name: 'Mutation',
     fields: {
         addUser: {
             type: UserType,
             args: {
                username: { type: new GraphQLNonNull(GraphQLString) }, // GraphQLNonNull is like the notNullable in migrations, it means that argument is required when doing this mutation
                email: { type: GraphQLString },
                password: { type: new GraphQLNonNull(GraphQLString) }
             },
             resolve(parent, args) {
                 return Users.addUser({ ...args })
                    .then(res => res)
                    .catch(err => console.log(err));
             }
         },
         deleteUser: {
             type: UserType,
             args: {
                 id: { type: new GraphQLNonNull(GraphQLInt) }
             },
             resolve(parent, args) {
                 return Users.removeUser(args.id)
                    .then(res => res)
                    .catch(err => console.log(err));
             }
         },
         updateUsername: {
             type: UserType,
             args: {
                 id: { type: new GraphQLNonNull(GraphQLInt) },
                 username: { type: new GraphQLNonNull(GraphQLString) }
             },
             resolve(parent, args) {
                 return Users.updateUsername(args.id, { username: args.username })
                 .then(res => res)
                 .catch(err => console.log(err));
             }
         }
     }
 })

 module.exports = new GraphQLSchema({
     query: RootQuery,
     mutation
 })