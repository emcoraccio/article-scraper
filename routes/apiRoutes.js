const axios   = require("axios"),
      cheerio = require("cheerio"),
      db      = require("../models"),
      express = require("express"),
      router  = express.Router();
      

router.get("/scrape", function (req, res) {

    axios.get("https://www.npr.org/sections/news/").then(function (response) {

      let $ = cheerio.load(response.data);

      $("article div.item-info").each(function (i, element) {

        let result = {};

        result.title = $(element)
          .children("h2")
          .children("a")
          .text();

        result.link = $(this)
          .children("h2")
          .children("a")
          .attr("href");

        result.summary = $(this)
          .children("p.teaser")
          .text();

        result.category = $(this)
          .children("div.slug-wrap")
          .children("h3")
          .children("a")
          .text()

        db.Article.findOne(
          {
            title: result.title
          }
        ).then(function (dbArticle) {

          if (!dbArticle) {
            console.log("new article!");

            db.Article.create(result)
              .then(function (dbArticle) {
                console.log(dbArticle);
              })
              .catch(function (err) {
                res.sendStatus(500);
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


  module.exports = router;