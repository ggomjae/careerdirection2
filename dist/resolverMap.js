"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolverMap = {
    Query: {
        helloWorld: function (_, args) {
            return "Hello GraphQL~!";
        },
    },
};
exports.default = resolverMap;
