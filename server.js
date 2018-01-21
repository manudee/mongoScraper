var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require("express");
var requestPromise = require('request-promise');
var axios = require('axios');
var exphbs = require('express-handlebars');
var router = express.Router();


var db = require('./models');

var PORT = process.env.PORT || 3000;


var app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/webScraper", {useMongoClient: true});


console.log("******Scraping high heel confidential********");

//home route to render index html page
app.get('/', function(req,res){

		res.render('index');
	
});


//scrape route to scrape articles and create articles collections in db
app.get('/scrape', function(req,res){

	request('https://www.highheelconfidential.com/', function(error, response, html){

		var $ = cheerio.load(html);

		$('li').each(function(i, element){
			var results = {};

			results.title = $(element).text();
			results.link = $(element).children().attr('href');


			db.article
			.create(results)
			.then(function(dbarticle){

				console.log(dbarticle);

			})
			.catch(function(err){

				return res.json(err)
			});

	});

	res.redirect('/articles');
		

	});

});



//articles route to get all the articles from the database
app.get('/articles', function(req,res){

	db.article.find({})
	.then(function(dbarticle){

		console.log(dbarticle.length);

		var dbarticleObj = {
			articles : dbarticle
		}
		//res.json(dbarticleObj);
		res.render('index',dbarticleObj);
	})
	.catch(function(err){
		res.json(err);
	})

});



app.put('/articles/:id', function(req, res){

	console.log(req.body);

	db.article.findByIdAndUpdate(
		req.params.id,
		{$set:req.body}, {new:true}, function(err,saved){

			if(err)
			{
				console.log("error")

			}
			else
			{
				console.log(saved);
			}
		});

	// console.log("Article updated to saved");


})


app.get('/savedArticles', function(req, res){



	db.article.find({saved: true})
	.populate("note")
	.then(function(savedArticles){


		//console.log(savedArticles);

		var savedArticlesObj = {
			articlesAfterSave : savedArticles
		}

		//console.log(savedArticlesObj);

		//res.json(savedArticlesObj);
		res.render('saved',savedArticlesObj);

	})
	.catch(function(err){
		res.json(err);
	})


})


app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entrys0
  db.note
  .create(req.body)
  .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
  })
  .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
   //   res.json(dbArticle);
      console.log(dbArticle);
  })
  .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
  });
});




// //route for populating articles with its notes
// app.get("/articles/:id", function(req, res) {
//   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//   db.article
//   .findOne({ _id: req.params.id })
//     // ..and populate all of the notes associated with it
//     .populate("note")
//     .then(function(dbArticleNotes) {
//       // If we were able to successfully find an Article with the given id, send it back to the client
//       res.json(dbArticleNotes);

//       	//res.render('saved',dbArticle);
//       })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//   });
// });



app.post("/notes/:id", function(req,res){




	db.note.findOneAndRemove({"_id": req.params.id}, function (err, deletedNote) {

		if (err) {
			console.log(err);
		} else {

		}
		res.send(deletedNote);



	});

})

	app.listen(PORT, function() {
		console.log("App running on port " + PORT + "!");
	});
