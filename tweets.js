var casper = require('casper').create({
	verbose : true,
	logLevel : 'error',
	pageSettings : {
		loadImages: true
	}
});


var url = 'https://www.twitter.com/';
var twitterId = "achrefbenahmed1";
var email = "achref.benhmed@gmail.com";
var auth ="moimememoimeme0007";
var searchkey = "#ghannouchi";
var tweets=[];

function getTweets (){
	var tweets = document.querySelectorAll('.js-tweet-text-container p.TweetTextSize.js-tweet-text.tweet-text');
	return Array.prototype.map.call(tweets,function(e){
		return e.innerText;
	});
};

casper.start(url + twitterId, function() {
    this.echo(this.getTitle());
});

casper.then(function(){
	this.fillSelectors('form.js-front-signin',{
		'input[name="session[username_or_email]"]': email,
		'input[name="session[password]"]': auth

	}, true);
});

casper.then(function(){
	console.log( 'Authenticated at : ' + this.getCurrentUrl());
});


casper.then(function(){
	this.fill('form#global-nav-search',
	{
		q:searchkey
	}, true);
});

casper.wait(2000, function(){
	console.log('waited');
});


casper.waitForSelector('.trends-inner', function(){
	console.log('selector loaded');
});
casper.waitForSelector('.js-media-container', function(){
	console.log('selector loaded');
});

casper.then( function() {
    tweets= this.evaluate (getTweets);
    
    this.echo (tweets.length + 'tweets found:' );
    this.echo ('-'+ tweets.join('\n -')).exit;
    //this.echo (entreprises.length + 'entreprises found:' );
    //this.echo ('-'+ entreprises.join('\n -')).exit;
});

casper.run();