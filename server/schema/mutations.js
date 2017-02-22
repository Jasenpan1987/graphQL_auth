const graphql = require("graphql");

const {
    GraphQLObjectType,
    GraphQLString
} = graphql;

const UserType = require("./types/user_type");
const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parentValue, args, request){ // the request is the req in express
                const { email, password } = args;
                return AuthService.signup({email, password, req: request})
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, request){
                const { user } = request; // save a user copy, otherwise user will be removed from req
                request.logout();
                return user;
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, args, request){
                const { email, password } = args;
                return AuthService.login({ email, password, req: request})
            }
        }
    }
});

module.exports = mutation;