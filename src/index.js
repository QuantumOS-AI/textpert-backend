const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const redocExpress = require('redoc-express');
const redoc = redocExpress.default;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Textpert Backend API',
      version: '1.0.0',
      description: 'API documentation for the Textpert backend',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
  },
apis: ['src/routes/*.js', 'src/controllers/*.js'], // Path to the API routes and controllers
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Redoc documentation endpoint
app.get('/docs', redoc({
  specUrl: '/swagger.json',
  title: 'Textpert Backend API Documentation',
  redocOptions: {
    theme: {
      colors: {
        primary: {
          main: '#313131'
        }
      },
      typography: {
        fontFamily: 'Roboto',
        fontSize: '16px',
        lineHeight: '1.5',
      },
      sidebar: {
        width: '300px',
      },
      logo: {
        gutter: '30px'
      }
    }
  }
}));

// Swagger JSON endpoint
app.get('/swagger.json', (req, res) => {
  // console.log(swaggerDocs);
  res.json(swaggerDocs);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
