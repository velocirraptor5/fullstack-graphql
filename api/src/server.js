const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { models, db } = require('./db')
const dotenv = require('dotenv');

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    const user = models.User.findOne()
    return { models, db }
  }
})

server.listen(process.env.SERVER_PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
})
