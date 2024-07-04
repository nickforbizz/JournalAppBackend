const express = require('express')
require('dotenv').config();
const app = express()
const port = 3000
const db = require('./models')

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

db.sequelize.sync().then((req) => {
  app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening on port ${process.env.APP_PORT}`)
  })

})