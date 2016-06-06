var keys = require('./keys.js');

//console.log(keys.twitterKeys.consumer_key);

var Twitter = require('twitter');

var client = new Twitter({

	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});

console.log("consumer key is: " + client.consumer_key);

var spotify = require('spotify');
var request = require('request');

var action = process.argv[2];
var val = process.argv[3];

switch(action){
	case 'my-tweets':
		getTweets();
	break;

	case 'spotify-this-song':
	break;

	case 'movie-this':
	break;

	case 'do-what-it-says':
	break;

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