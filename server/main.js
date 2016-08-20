import { Meteor } from 'meteor/meteor'
import Twitter from 'twitter'
import bodyParser from 'body-parser'

import {
	TWITTER_CONSUMER_KEY, 
	TWITTER_CONSUMER_SECRET, 
	TWITTER_ACCESS_TOKEN_KEY, 
	TWITTER_ACCESS_TOKEN_SECRET
} from './constants.js'


if(Meteor.isServer) {
	Meteor.startup(() => {
	  	// code to run on server at startup
	  	const client = new Twitter({
		  consumer_key: TWITTER_CONSUMER_KEY,
		  consumer_secret: TWITTER_CONSUMER_SECRET,
		  access_token_key: TWITTER_ACCESS_TOKEN_KEY,
		  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
		});

	  	app = Express();
		app.use( bodyParser.json() );       // to support JSON-encoded bodies
		app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		  extended: true
		}));

		const hastag = 'Usain Bolt'
		const twitterStream = client.stream('statuses/filter', {track: String(hastag)});
		let i = 0
		twitterStream.on('data', function(tweet) {
		  	// Send a message to all connected sessions (Client & server)
		  	if (i%10 === 0) {
		  		console.log('tweet --> ', tweet.id_str)
				Streamy.broadcast('hello', tweet);	
		  	}
			i++
		});

		app.get('/trends/available', function(req, res) {
			client.get('trends/available', function(error, tweets, response){
				if(error) throw error;
				if ( response ) {
					res.json({data: response.body});
				}
			});
			
		});
		
		app.post('/tweets', function(req, res) {
			var hastag = req.body.hastag
		    if (hastag) {
		    	console.log("hastag: ", hastag)
		  //   	const twitterStream = client.stream('statuses/filter', {track: String(hastag)});
				// twitterStream.on('data', function(tweet) {
				//   	// Send a message to all connected sessions (Client & server)
				// 	Streamy.broadcast('hello', tweet);
				// });
		    }
		});

		app.post('/trends', function(req, res) {
		    var woeid = req.body.woeid
		    if (woeid) {
		    	console.log("woeid: ",woeid)
		    	client.get('trends/place', {id: woeid}, function(error, tweets, response){
					if(error) throw error;
					if ( response ) {
						res.json({data: response.body});
					}
				});
		    }
		});
	 // 	Picker.route('/get/tutu', function(params, req, res, next) {
		  	
		// });
	 //    // Maps to: /api/articles/:id
		// Api.addRoute('trends/available', {authRequired: false}, {
		// 	get: function () {
		// 		
		// 	}
		// });
  	});
}

