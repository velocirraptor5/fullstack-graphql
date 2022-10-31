const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');

const typeDefs = gql`
"""
A pet is an animal that is kept as a companion or for enjoyment.
"""
    
    enum ShoeType{
        JORDAN
        NIKE
        ADIDAS
    }
    type User{
        email: String!
        avatar: String
        shoes:[Shoe]!
    }
    
    interface Shoe{
        brand: ShoeType!
        size: Int!
        user: User!
    }

    type Sneaker implements Shoe{
        brand: ShoeType!
        size: Int!
        user: User!
        sport: String!
    }

    type Boot implements Shoe{
        brand: ShoeType!
        size: Int!
        user: User!
        hasGrip: Boolean!
    }

    input ShoesInput{
        brand: ShoeType
        size: Int
    }

    input NewShoeInput{
        brand: ShoeType!
        size: Int!
    }

    type Query{
        me: User!
        shoes(input:ShoesInput):[Shoe]!
    }
    type Mutation{
        newShoe(input:NewShoeInput!): Shoe!
    }

`
const user = {
    id: 1,
    email: 'yoda@masters.com',
    avatar: 'https://yoda.png',
}

const shoes = [
    { brand: 'NIKE', size: 12, sport: 'ultimate', user: 1 },
    { brand: 'JORDAN', size: 14, hasGrip: true, user: 1 },
]

const resolvers = {
    Query: {
        shoes(_, { input }) {
            return shoes
        },

        me() {
            return user
        }
    },
    Mutation: {
        newShoe(_, { input }) {
            return input
        }
    },
    User: {
        shoes() {
            return shoes
        }
    },
    Shoe: {
        __resolveType(shoe) {
            if (shoe.sport) {
                return 'Sneaker'
            }
            return 'Boot'
        },
    },
    Sneaker: {
        user(shoe) {
            return user
        }
    },
    Boot: {
        user(shoe) {
            return user
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4295)
    .then(() => console.log('on port 4295 🚀'))