import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
    tags: [
      { name: 'Authentication', description: 'Operations to Authentication' },
      { name: 'Health', description: 'Health' },
    ],
  },
  apis: ['./src/routes/**/*.ts']
};

const specs = swaggerJsdoc(options);

export default specs;
