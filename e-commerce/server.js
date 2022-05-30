const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const { MONGODB } = require("./config.js");

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;
const resolvers = {
  Query: {
    hello: () => "Hello World",
  },
};
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub }),
  });
  await server.start();
  const app = require("./app");
  server.applyMiddleware({ app });
  await mongoose.connect(MONGODB, { useNewUrlParser: true });
  console.log("mongose connected...");
  app.listen({ port: 4001 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4001${server.graphqlPath}`
    );
  });
}
startServer();
