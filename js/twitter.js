/*
Created by Sergio Cerrutti
http://www.sergiocerrutti.com
March 2011
*/

function fadear() {
	$("#social").fadeOut();
}

/* Formateo la fecha de los tweets */
function TwitterDateConverter(time){
	var date = new Date(time),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
 
	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;
 
	return day_diff == 0 && (
		diff < 60 && " unos segundos" ||
		diff < 120 && " un minuto" ||
		diff < 3600 && Math.floor( diff / 60 ) + " minutos" ||
		diff < 7200 && " una hora" ||
		diff < 86400 && Math.floor( diff / 3600 ) + " horas") ||
		day_diff == 1 && "Ayer" ||
		day_diff < 7 && day_diff + " días" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " semanas";
}

/* Localizo los hashtags de Twitter para convertirlos en enlace */
function linkHashtags(text) {
	hashtag_regexp = /#([a-zA-Z0-9]+)/g;
	return text.replace(hashtag_regexp, '<a title="$1" class="hashtag" href="http://twitter.com/#search?q=$1" target="_blank">#$1</a>');
}

/* Pinto los últimos tweets a la vez que convierto los hastags en enlace y formateo la fecha, lo recargo en directo */
$.ajaxSetup({ cache:false });
function loadTweets() {
	$.getJSON("http://twitter.com/statuses/user_timeline/sergiocerrutti.json?count=2&format=json&callback=?", function(data){
	  	$("#social").stop(true, true).fadeIn();
			$("#twitter").addClass("loading");
			$('#twitter .content').fadeOut("slow", function() {
				$(this).empty();
				for(i=0; i<2; i++) {
		  		$('#twitter .content').append(linkHashtags('<article><p><time>Hace ' + TwitterDateConverter(data[i].created_at) + '</time>' + data[i].text + '</p></article>'));
		  	}
		  	$('#twitter .content').fadeIn("slow", function() {
		  		$("#twitter").removeClass("loading");
		  		setTimeout(fadear,3000);
		  	});
			});
  	
	});
	setTimeout(loadTweets,20000);
}