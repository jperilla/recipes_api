const hapi = require('hapi');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

mongoose.connect('mongodb://mongo:M!ckey16!@ds139920.mlab.com:39920/recipes')
mongoose.connection.once('open', () => {
  console.log('Connected to recipes database')
})

const server = hapi.server({
  port: 4000,
  host: 'localhost'
});

const init = async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      return '<h1>Recipe API</h1>';
    }
  }),
  server.route({
    method: 'GET',
    path: '/rest/v1/recipes',
    handler: (req, reply) => {
      return Recipe.find();
    }
  }),server.route({
    method: 'POST',
    path: '/rest/v1/recipes',
    handler: (req, reply) => {
      const { title, prepTimeInMinutes, totalTimeInMinutes, numberOfServings,
        calories, ingredients, instructions, photos, tags, favorite } = req.payload;
      const recipe = new Recipe({
        title,
        prepTimeInMinutes,
        totalTimeInMinutes,
        numberOfServings,
        calories,
        ingredients,
        instructions,
        photos,
        tags,
        favorite
      });

      return recipe.save();
    }
  });
  await server.start();
  console.log('Server running at: ' + server.info.uri);
}

init();
