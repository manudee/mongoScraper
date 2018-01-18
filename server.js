var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require("express");
var requestPromise = require('request-promise');
var axios = require('axios');
var exphbs = require('express-handlebars');

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


app.get('/', function(req,res){

	

	res.render('index');
	
});



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

				// var dbarticleObj = {
				// 	articles : dbarticle
				// }
				

				  //res.json(dbarticle);
				  //res.render('index',dbarticle);

				  console.log(dbarticle);
				})
			.catch(function(err){

				return res.json(err)
			});




		});

		

		res.send('scrape done');
		

	});

});




app.get('/articles', function(req,res){

	db.article.find({})
	.then(function(dbarticle){

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



app.post('/articles/:id', function(req, res){

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

	console.log(req.body);

	db.article.find({saved: true})
	.then(function(savedArticles){

		var savedArticlesObj = {
			savedArticles : savedArticles
		}

		//res.json(savedArticlesObj);
		res.render('saved',savedArticlesObj);

	})
	.catch(function(err){
		res.json(err);
	})


})



app.listen(PORT, function() {
	console.log("App running on port " + PORT + "!");
});
