const Query = require('./query');
const Mutation = require('./mutation');
const { GraphQLDateTime } = require('graphql-iso-date');

const DateTimeResolver = {
    name: 'DateTime',
    ...GraphQLDateTime
  };

module.exports = {
    Query,
    Mutation,
    DateTime: DateTimeResolver
  };