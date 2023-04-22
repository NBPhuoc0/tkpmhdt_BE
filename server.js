const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors");
const helmet = require('helmet');
const config = require('./api/config/config');

app.use(helmet());

// const corsOptions = {
//     origin: "http://localhost:8080"
// };
  
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// database
const db = require("./api/models");
db.sequelize.sync();

//routes
require('./api/routes/admin.router')(app)
require('./api/routes/user.router')(app)

const port = config.PORT || 8080
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})

console.log('RESTful API server started on: ' + port)
