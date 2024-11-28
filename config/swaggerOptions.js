const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Newton Product',
            version: '1.0.0',
            description: 'API documentation for managing events, clubs, clans, and more.',
            contact: {
                name: 'API Support',
                email: 'support@example.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:' + (process.env.PORT||6969), // Replace with your server's URL
                description: 'Development server',
            },
        ],
    },
    schemas:{
        Clan :{
            type:"Object",

        }

    },
    apis: ['../src/routes/*.js'], // Path to the API route files for auto-generating documentation
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
