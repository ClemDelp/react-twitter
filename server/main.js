import { Meteor } from 'meteor/meteor'
import Twitter from 'twitter'
import bodyParser from 'body-parser'
import { Trend } from '../imports/api/Trend.js'
import { Woeid } from '../imports/api/Woeid.js'
var Fiber = require('fibers')

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

		// TO TEST
		// const hastag = 'Usain Bolt'
		// const twitterStream = client.stream('statuses/filter', {track: String(hastag)});
		// let i = 0
		// twitterStream.on('data', function(tweet) {
		//   	// Send a message to all connected sessions (Client & server)
		//   	if (i%10 === 0) {
		//   		console.log('tweet --> ', tweet.id_str)
		// 		Streamy.broadcast('hello', tweet);	
		//   	}
		// 	i++
		// });
		// -----

		const timeCondition = function (lastDatetime, cbYes, cbNo) {
			var last = new Date(lastDatetime)
			var now = new Date()
			console.log(last, now)
			var timeDiff = Math.abs(now.getTime() - last.getTime())
			var diffSeconds = Math.ceil(timeDiff / (1000))
			console.log('diff in seconds: ', diffSeconds)
			// CHECK 15 MINUTES INTERVAL
			if (diffSeconds > 15*60) {
				console.log('more than 15 minutes: request twitter...')
				cbYes()
			} else {
				console.log('less than 15 minutes: send last saved woeid...')
				cbNo()
			}
		}

		app.get('/trends/available', function(req, res) {
			const woeid = Woeid.findOne({}, {sort: {datetime: -1, limit: 1}});
			let datetime = 0
			if (woeid && woeid.datetime) datetime = woeid.datetime 
			timeCondition(
				datetime,
				function() {
					client.get('trends/available', function(error, tweets, response){
						if(error) throw error;
						if ( response ) {
							// INSERT IN DB
							Fiber(function () {
		          				Woeid.insert({
		          					datetime: new Date(),
		          					body: response.body
		          				}, function (error, response) {
		          					console.log(response)
						        	console.log('new woeid in db ', Woeid.find().count())
						        })
		        			}).run()
							res.json({data: response.body});
						}
					});	
				}, function() {
					res.json({data: woeid.body})
				}
			)
		});
		
		app.post('/trends', function(req, res) {
			var woeid = req.body.woeid
			if (woeid) {
				Fiber(function () {
					console.log(woeid)
					const trend = Trend.findOne({woeid: woeid}, {sort: {datetime: -1, limit: 1}});
					let datetime = 0
					if (trend && trend.datetime) datetime = trend.datetime 
					timeCondition(
						datetime,
						function() {
							client.get('trends/place', {id: woeid}, function(error, tweets, response){
								if(error) throw error;
								if ( response ) {
									// INSERT IN DB
									Fiber(function () {
				          				Trend.insert({
				          					woeid: woeid,
				          					datetime: new Date(),
				          					body: response.body
				          				}, function (error, response) {
				          					console.log(response)
								        	console.log('new trend in db ', Trend.find().count())
								        })
				        			}).run()
									res.json({data: response.body});
								}
							});	
						}, function() {
							res.json({data: woeid.body})
						}
					)
				}).run()	
			} else {
				res.json({data: 'error required a valid woeid'})
			}
			
		});

		app.post('/tweets', function(req, res) {
			var hastag = req.body.hastag
		    if (hastag) {
		    	console.log("hastag: ", hastag)
		    	// const hastag = 'Usain Bolt'
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
		    }
		});

  	});
}

