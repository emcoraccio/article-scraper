const axios   = require("axios"),
      cheerio = require("cheerio"),
      db      = require("../models"),
      express = require("express"),
      router  = express.Router();

router.get("*", function(req, res) {
  
  db.Article.find({})
    .populate("note")
    .then(function(dbArticles) {
    console.log(dbArticles);
    dbArticles.forEach(art => {
      console.log(art.note);
    });

    res.render("index", {
      articles: dbArticles
    })

  }).catch((err) => {
    console.log(err);
  })

})





module.exports = router;
