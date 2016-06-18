import { Meteor } from 'meteor/meteor'
import Twitter from 'twitter'
import {
	TWITTER_CONSUMER_KEY, 
	TWITTER_CONSUMER_SECRET, 
	TWITTER_ACCESS_TOKEN_KEY, 
	TWITTER_ACCESS_TOKEN_SECRET
} from './constants.js'

if(Meteor.isServer) {
	Meteor.startup(() => {
	  	// code to run on server at startup
	  	var client = new Twitter({
		  consumer_key: TWITTER_CONSUMER_KEY,
		  consumer_secret: TWITTER_CONSUMER_SECRET,
		  access_token_key: TWITTER_ACCESS_TOKEN_KEY,
		  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
		});

	  	app = Express();
		
		app.get('/trends/available', function(req, res) {
			client.get('trends/available', function(error, tweets, response){
				if(error) throw error;
				if ( response ) {
					res.json(response);
				} else {
					res.send("error")
				}
			});
			
		});

		app.get('/trends', function(req, res) {
			client.get('trends/place', {id: 1}, function(error, tweets, response){
				if(error) throw error;
				if ( response ) {
					res.json(response);
				} else {
					res.send("error")
				}
			});
			
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

