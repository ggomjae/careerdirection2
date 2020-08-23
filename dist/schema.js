"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
var graphql_tools_1 = require("graphql-tools");
var resolverMap_1 = __importDefault(require("./resolverMap"));
var typeDefs = require('./schema/schema.graphql');
var schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolverMap_1.default,
});
exports.default = schema;
