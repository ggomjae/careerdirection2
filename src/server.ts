import express from 'express';
import 'reflect-metadata';
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import 'graphql-import-node';
import * as typeDefs from './graphql/schemas/schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
const resolvers = require('./graphql/resolvers');
import { GraphQLSchema } from 'graphql';
//////
// import { buildSchema } from 'type-graphql';
// import { UserResolver } from './graphql/resolvers';

// const tempschema = await buildSchema({
//   resolvers: [UserResolver]
// });
/////
//require('dotenv').config();
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