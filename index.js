const hapi = require('hapi');
const mongoose = require('mongoose');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');

const Recipe = require('./models/recipe');
const schema = require('./graphql/schema');

mongoose.connect('mongodb://mongo:M!ckey16!@ds139920.mlab.com:39920/recipes')
mongoose.connection.once('open', () => {
  console.log('Connected to recipes database')
})

const server = hapi.server({
  port: 4000,
  host: 'localhost'
});

const init = async () => {
  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql'
      },
      route: { cors: true }
    }
  });

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema
      },
      route: { cors: true }
    }
  });

  // Register Hapi Swagger modules
  const swaggerOptions = {
    info: {
            title: 'Recipes API Documentation',
            version: Pack.version,
        },
    };

  await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

  // Server routes - move to router.js
  server.route([{
      method: 'GET',
      path: '/',
      handler: (req, reply) => {
        return '<h1>Recipe API</h1>';
      }
    },
    {
      method: 'GET',
      path: '/rest/v1/recipes',
      config: { /* for swagger docs */
        description: 'Get all of the recipes.',
        tags: ['api', 'v1', 'recipes'] /* api tag is necessary for swagger to recognize */
      },
      handler: (req, reply) => {
        return Recipe.find();
      }
    },
    {
      method: 'POST',
      path: '/rest/v1/recipes',
      config: {
        description: 'Create a new recipe.',
        tags: ['api', 'v1', 'recipes']
      },
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
    }
  ]);

  try {
    await server.start();
    console.log('Server running at: ', server.info.uri);
  } catch(err) {
    console.log(err);
  }
}

init();
