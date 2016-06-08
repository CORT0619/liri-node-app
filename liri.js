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

function runLiri(input1, input2){


	var action = input1;
	var val = input2;

	switch(action){
		case 'my-tweets':
			getTweets();
		break;

		case 'spotify-this-song':
			getSpotified(val);
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

function getSpotified(param){

	if(param != undefined){

		if(process.argv.length > 4){

			for(var i = 4; i < process.argv.length; i++){

				param += "+" +process.argv[i];

			}
		}

		//spotify.search({type: 'track', query: param, limit: 1}, function(err, data){
		spotify.get("https://api.spotify.com/v1/search?q=" + param + "&type=track&limit=1", function(err, data){
			if(err){

				return console.log(err);
			}

			//console.log(data.tracks.items[0]);
			console.log(data.tracks.items[0].artists[0].name); // artist name
			console.log(data.tracks.items[0].name);// song name
			console.log(data.tracks.items[0].preview_url); //preview link			
			console.log(data.tracks.items[0].album.name); // album name

		});

	} else {

		spotify.search({type: 'track', query: 'whats my age again', limit: 1}, function(err, data){

			if(err){

				return console.log(err);
			}

			console.log(data);
			console.log("data" + data.tracks.items[0]);
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

		data = data.split(',');

		console.log(data);

		console.log(data[0]);
		console.log(data[1]);

		runLiri(data[0], data[1]);

	});
}

runLiri(process.argv[2], process.argv[3]);