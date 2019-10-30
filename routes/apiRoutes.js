const axios = require("axios"),
  cheerio = require("cheerio"),
  db = require("../models"),
  express = require("express"),
  router = express.Router();


router.get("/scrape", function (req, res) {

  axios.get("https://www.npr.org/sections/news/").then(function (response) {

    let $ = cheerio.load(response.data);

    $("article div.item-info").each(function (i, element) {

      let result = {};

      result.title = $(this).children("h2").children("a").text();
      result.link = $(this).children("h2").children("a").attr("href");
      result.summary = $(this).children("p.teaser").text();
      result.category = $(this).children("div.slug-wrap").children("h3").children("a").text();


      db.Article.findOne(
        {
          title: result.title
        }
      ).then(function (dbArticle) {
        console.log(result.title);
        console.log(result.link);

        if (!dbArticle && result.title && result.link) {
          console.log("new article!");

          db.Article.create(result)
            .then(function (dbArticle) {
              console.log(dbArticle);
              res.sendStatus(200);
            })

        }
        else {
          console.log("already exists in db");
        }
      }).catch(function (err) {

        res.sendStatus(500);

      })
    });
  }).catch(

    res.sendStatus(500)

  )
});

router.get("/articles/:id", (req, res) => {

  db.Article.findOne(
    {
      _id: req.params.id
    })
    .populate("note")
    .then( (dbArticle) => {

      res.json(dbArticle);

    }).catch( (err) => {

      res.json(err);

    })
});

router.post("/articles/:id", (req, res) => {

  db.Note.create(req.body)
    .then( (dbNote) => {
      console.log(dbNote);

      return db.Article.findOneAndUpdate({
        _id: req.params.id
      },
      {
        note: dbNote._id
      },
      {
        new: true
      });
    })
    .then( (dbArticle) => {
      res.json(dbArticle);
    })
    .catch( (err) => { res.json(err); } );

});





module.exports = router;