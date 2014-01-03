<?php

/**
 *  Usage:
 *  Send the url you want to access url encoded in the url paramater, for example (This is with JS): 
 *  /twitter-proxy.php?url='+encodeURIComponent('statuses/user_timeline.json?screen_name=MikeRogers0&count=2')
*/



ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
	'oauth_access_token' => '776357066-jWIbz9ZEJ4KIywvS5DKEyftEZtkTNrrCNrVXebEi',
	'oauth_access_token_secret' => 'Ljq5a7UKPGYqVbq1AfegjBRDA8NhSVnP7zvY97t8Bak',
	'consumer_key' => '2xmicQGImhP2aq7jJe0m8A',
	'consumer_secret' => 'b9NwiN1HpjRI5XszwAAI2dECAPqXHIVkbYFYaAtqnas',
);

/** URL for REST request, see: https://dev.twitter.com/docs/api/1.1/ **/
/*$url = 'https://api.twitter.com/1.1/blocks/create.json';
$requestMethod = 'POST';

/** POST fields required by the URL above. See relevant docs as above **/
/*$postfields = array(
    'screen_name' => 'usernameToBlock', 
    'skip_status' => '1'
);
*/


/** Perform a POST request and echo the response **/
/*
$twitter = new TwitterAPIExchange($settings);
echo $twitter->buildOauth($url, $requestMethod)
             ->setPostfields($postfields)
             ->performRequest();*/

/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/



$screen_name = $_GET['screen_name'];

if(!isset($screen_name)){
    die();
}


$url = 'http://api.twitter.com/1.1/statuses/user_timeline.json';
$getfield = '?screen_name='.$screen_name."&count=10";
$requestMethod = 'GET';


$twitter = new TwitterAPIExchange($settings);


$recentTweets = $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();


$output = json_decode($recentTweets);



echo $recentTweets;

