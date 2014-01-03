<?php

//file_put_contents('/var/www/my_logs/cbc.log', 'top of file   ', FILE_APPEND);
    
$type = $_GET['type'];

    
if($type=='news'){
    $xml = file_get_contents('http://athlonecc.ie/index.php?option=com_ninjarsssyndicator&feed_id=1&format=raw');    
}
elseif ($type=='staff') { 
    $xml = file_get_contents('http://athlonecc.ie/index.php?option=com_ninjarsssyndicator&feed_id=9&format=raw');
}
elseif ($type=='parents') { 
       
    $xml = file_get_contents('http://www.athlonecc.ie/index.php?option=com_ninjarsssyndicator&feed_id=7&format=raw');
    
}
elseif($type=="sports"){

    $xml = file_get_contents('http://www.athlonecc.ie/index.php?option=com_ninjarsssyndicator&feed_id=11&format=raw');    
    
}
elseif($type=="curriculum"){

    $xml = file_get_contents('http://www.athlonecc.ie/index.php?option=com_ninjarsssyndicator&feed_id=12&format=raw');    
    
}
elseif($type=="extracurricular"){

    $xml = file_get_contents('http://www.athlonecc.ie/index.php?option=com_ninjarsssyndicator&feed_id=10&format=raw');    
    
}
elseif($type=="calendar"){

    $xml = file_get_contents('https://www.google.com/calendar/feeds/athlonecc.college@gmail.com/public/full?orderby=starttime&sortorder=ascending&max-results=10&futureevents=true');    
    
}
elseif($type=="albums"){
    
    file_put_contents('/var/www/my_logs/albums.log', 'getting photos with link '.$link);
    
    $link = "http://api.flickr.com/services/rest/?";
    $link .= "&method=flickr.photosets.getList";
    $link .= "&api_key=761fa2a4f0ff982d9f4dd692cd322f1f";
    $link .= "&user_id=103885491@N02";
    
    $xml = file_get_contents($link);
    
}
elseif($type=="photos"){
    
    $photoset_id = $_GET['photoset_id'];
    
    $link = 'http://api.flickr.com/services/rest/?';
    $link .= '&method=flickr.photosets.getPhotos';
    $link .= '&api_key=761fa2a4f0ff982d9f4dd692cd322f1f&user_id=103885491@N02';
    $link .= "&extras=url_sq,url_t,url_s,url_m,url_o";
    $link .= "&photoset_id=".$photoset_id;
    
    file_put_contents('/var/www/my_logs/photos.log', 'getting photos with link '.$link);
    
    $xml = file_get_contents($link);
    
}
elseif($type=="student"){

    $xml = file_get_contents('http://www.athlonecc.ie/index.php?option=com_ninjarsssyndicator&feed_id=14&format=raw');    
    
}

/*
$xml = '<?xml version="1.0" encoding="utf-8"?>
<!-- generator="FeedCreator 1.8.0-dev (info@mypapit.net)" -->
<rss version="2.0"  xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>RSS Latest News</title>
        <description></description>
        <link>http://athlonecc.ie/</link>
        <lastBuildDate>Wed, 13 Nov 2013 11:03:41 GMT</lastBuildDate>
        <generator>FeedCreator 1.8.0-dev (info@mypapit.net)</generator>
		<atom:link href="http://athlonecc.ie/index.php?option=com_ninjarsssyndicator&amp;feed_id=1&amp;format=raw" rel="self" type="application/rss+xml" />        <item>
            <title>24 Oct 2013: Senior Rugby </title>
            <link>http://athlonecc.ie/index.php/2013-05-28-13-58-38/latest-news/177-24-oct-2013-senior-rugby</link>
            <description><![CDATA[<p>Senior Rugby</p>
<p>CBC 22 V 15 Kilkenny College</p>
<p><img style="display: block; margin-left: auto; margin-right: auto;" src="/images/latestnews2/logo.JPG" alt="logo" /></p>]]></description>
            <author> info@schoolspace.ie (Super User)</author>
			<pubDate>Wed, 06 Nov 2013 13:03:05 GMT</pubDate>
            <guid isPermaLink="false">http://athlonecc.ie/index.php/2013-05-28-13-58-38/latest-news/177-24-oct-2013-senior-rugby</guid>
        </item>
    </channel>
</rss>';
*/
echo $xml;

