// imported keys & modules
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');


var client = new Twitter({

	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});

function runLiri(){

	var action = process.argv[2];
	var val = process.argv[3];

	switch(action){
		case 'my-tweets':
			getTweets();
		break;

		case 'spotify-this-song':
			getSpotified();
		break;

		case 'movie-this':
			switch(val){
				case undefined:
					getMovieStuff('Mr. Nobody');
				break;

				default:
					getMovieStuff(val);
			}
			
		break;

		case 'do-what-it-says':
			doSomething();
		break;

	}
}


function getTweets(){

	client.get('statuses/user_timeline.json?screen_name=cort0619&count=20', {q: 'node.js'}, function(err, tweets, response){

		if(err){
			return console.log(err);
		}

		if(client){

			obj = tweets;

			for(var prop in obj){

				console.log("Tweet: " + obj[prop].text);
				console.log("Created: " + obj[prop].created_at + "\n");
			}

		}
	});

}

function getSpotified(){

	if(val != undefined){

		spotify.search({type: 'track', query: val}, function(err, data){

			if(err){

				return console.log(err);
			}

			console.log(data);
			console.log(data.tracks[0]);
		});

	} else {

		spotify.search({type: 'track', query: 'what\'s my age again'}, function(err, data){

			if(err){

				return console.log(err);
			}

			console.log(data);
		});
	}
}

function getMovieStuff(movie){

	if(process.argv.length > 4){

		for(var i = 4; i < process.argv.length; i++){

			movie += "+" +process.argv[i];

		}
	}

	request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&r=json&tomatoes=true', function(err, response, body){

		if(err){

			return console.log(err);
		}

		body = JSON.parse(body);

		//console.log(body);
		console.log("Movie title: " + body.Title);
		console.log("Year: " + body.Year);
		console.log("IMDB rating: " + body.imdbRating);
		console.log("Country: " + body.Country);
		console.log("Language: " + body.Language);
		console.log("Plot: " + body.Plot);
		console.log("Actors: " + body.Actors);
		console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
		console.log("Rotten Tomatoes URL: " + body.tomatoURL);
	});

}

function doSomething(){

	fs.readFile('./random.txt', "utf8", function(err, data){

		if(err){
			return console.log(err);
		}

		data = data.split(', ');

		console.log(data[0]);





	});
}

runLiri();