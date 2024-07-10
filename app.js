const express = require('express'),
bodyParser = require("body-parser"),
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");
require('dotenv').config();
const app = express();
const db = require('./models');
const { JournalCategoryComponent } = require('./schemas')

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Journal App Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "SuperTech Nomads",
        url: "https://supertechnomads.com",
        email: "nickforbizz@email.com",
      },
    },
    components: {
      schemas: {
        JournalCategoryComponent
      }
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [
    "./routes/Auth.js", "./routes/Journal.js", "./routes/JournalCategory.js", "./routes//Test.js", "./routes/User.js"
  ],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs , { explorer: true })
);

app.use(express.json());
app.get('/api', (req, res) => {
  res.json({
    success: 1,
    message: 'The app is working'
  })
})


// Routes
require("./routes/Test")(app);
require("./routes/User")(app);
require("./routes/Auth")(app);
require("./routes/JournalCategory")(app);
require("./routes/Journal")(app);

db.sequelize.sync().then((req) => {
  app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening on port ${process.env.APP_PORT}`)
  })

})