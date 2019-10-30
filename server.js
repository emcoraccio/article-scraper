const express  = require("express"),
      exphbs   = require("express-handlebars"),
      mongoose = require("mongoose"),
      axios    = require("axios"),
      cheerio  = require("cheerio"),
      db       = require("./models");

const PORT = process.env.PORT || 8080;
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

require('dotenv').config()

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);



app.listen(PORT, function () {
  console.log(`App running on port ${PORT}!`);
});