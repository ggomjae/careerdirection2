
import { IResolvers } from 'graphql-tools';
const userResolver = require('./user');

const resolverMap: IResolvers = {
  Query: {
    ...userResolver.queries
  },
};

module.exports = resolverMap;