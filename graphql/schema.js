/* This tells the client what data is available to query, and maps models to GraphQL types */
const graphql = require('graphql');
const RecipeType = require('./RecipeType');
const Recipe = require('./../models/recipe');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    recipe: {
      type: RecipeType,
      args: { id: {type: GraphQLString } },
      resolve(parent, args) {
        return Recipe.findById(args.id)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
