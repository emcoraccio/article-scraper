# NPR Article Scraper

## Overview
This is a website which scrapes the NPR website for its articles and then displays them on the page 

Articles are displayed on cards with the title of the article, a short summary, a link to the website to read the article, and the ability to add a note to the article. Users are able to view all comments made by users, or delete any comments. They also have the ability "lock" certain articles so that they are saved to the page, and clear any articles which are not "locked" if there get to be too many articles on the page, and also scrape for new articles at any point.

Articles are scraped and then saved in the db, and any notes a user makes will be saved to the db too and a reference to them will be saved to the corresponding article as well. 

When there is a note on a certain article it will have a note icon next to the word "notes" on the card in order to indicate to users that there is a note to view there. Articles will also automatically lock when a note is added, but can always be unlocked if desired. 

Scrape/clear articles, and create/delete comments at your will

## Technologies/Packages Used
- NodeJS
- Express
- Handlebars
- MongoDB/Mongoose
- Axios
- Cheerio
- Jquery
- MaterializeCSS


## File Structure
This website is built using MVC structure. 

.
+-- _models
|   +-- Article.js
|   +-- index.js
|   +-- Note.js
+-- _public
|   +-- _images
|   +-- app.js
|   +-- styels.css
+-- _routes
|   +-- apiRoutes.js
|   +-- htmlRoutes.js
+-- _views
|   +-- _layouts
|     +-- _main.handlebars
|   +-- _partials
|     +-- _notes
|       +-- note-block.handlebars
|   +-- index.handlebars
+-- _node_modules
+-- package-lock.json
+-- package.json
+-- server.js


## Other Info
I built this website alone as part of an assignment for my coding bootcamp. The basic ability to scrape a website, display info, and make comments were part of the requirements of the assignment. The design and any extra features were my own.