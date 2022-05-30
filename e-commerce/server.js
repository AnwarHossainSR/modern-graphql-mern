const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const { MONGODB, PORT } = require("./config.js");

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
  //apollo server start
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub }),
  });
  await server.start();

  const app = require("./app");
  server.applyMiddleware({ app });

  //mongo connection
  await mongoose.connect(MONGODB, { useNewUrlParser: true });
  console.log("mongose connected...");

  //express server
  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });

  // Unhandled Promise Rejection
  process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    app.close(() => {
      process.exit(1);
    });
  });
}
startServer();
