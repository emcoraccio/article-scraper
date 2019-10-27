const axios   = require("axios"),
      cheerio = require("cheerio"),
      db      = require("../models"),
      express = require("express"),
      router  = express.Router();

router.get("/home", function(req, res) {
  
  db.Article.find({}).then(function(dbArticles) {
    console.log(dbArticles);

    res.render("index", {
      articles: dbArticles
    })

  }).catch((err) => {
    console.log(err);
  })

})



module.exports = router;
