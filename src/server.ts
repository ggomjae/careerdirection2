import express from 'express';
import 'reflect-metadata';
import 'graphql-import-node';

import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';

import * as typeDefs from './graphql/schemas/schema.graphql';
const resolvers = require('./graphql/resolvers');

import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

const db = require('./models');
db.sequelize.sync();

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