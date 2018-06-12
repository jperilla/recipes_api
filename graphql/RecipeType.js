const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } = graphql;

const RecipeType =  new GraphQLObjectType({
  name: 'Recipe',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    prepTimeInMinutes: { type: GraphQLInt },
    totalTimeInMinutes: { type: GraphQLInt },
    numberOfServings: { type: GraphQLInt },
    calories: { type: GraphQLInt },
    ingredients: { type: GraphQLList(GraphQLString) },
    instructions: { type: GraphQLList(GraphQLString) },
    photos: { type: GraphQLList(GraphQLString) },
    tags: { type: GraphQLList(GraphQLString) },
    favorite: { type: GraphQLBoolean }
  })
});

module.exports = RecipeType;
