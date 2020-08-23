import express from 'express';

//const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import 'graphql-import-node';
import * as typeDefs from './graphql/schemas/schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
const resolvers = require('./graphql/resolvers');
import { GraphQLSchema } from 'graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
const server = new ApolloServer({
  schema
});

server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);

httpServer.listen(
  { port: 8000 },(): void => console.log(`server Start`)
);