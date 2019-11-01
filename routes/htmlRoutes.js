const axios = require("axios"),
  cheerio = require("cheerio"),
  db = require("../models"),
  express = require("express"),
  router = express.Router();

router.get("", function (req, res) {

  db.Article.find({})
    .populate("note")
    .then(function (dbArticles) {

      // console.log(dbArticles);

      dbArticles.forEach(art => {

        console.log(art.note);

      });

      res.render("index", {

        articles: dbArticles

      });

    }).catch((err) => {
      console.log(err);
    })

});

router.get("/:condition-:value", function (req, res) {

  let condition;
  let value;

  if (req.params.condition && req.params.value) {

    condition = req.params.condition === "notes" ? "note.0" : req.params.condition;
    value = condition === "note.0" ? { $exists: true } : req.params.value;

      console.log(condition, value);
      db.Article.find({
        [condition]: value
      })
        .populate("note")
        .then(function (dbArticles) {
          if (dbArticles.length) {

            console.log(dbArticles);

            res.render("index", {

              articles: dbArticles

            });
          }
          else {
            res.redirect("/");
          }

        }).catch((err) => {
          res.redirect("/");
        })

  }
  else {
    console.log("nope, no conditions");
  }
});

router.get("*", function (req, res) {
  res.redirect("/");
});



module.exports = router;
