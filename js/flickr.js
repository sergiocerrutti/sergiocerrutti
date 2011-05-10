/*
Created by Sergio Cerrutti
http://www.sergiocerrutti.com
March 2011
*/


/* Consulto mis últimas fotos de Flickr y saco las tres últimas */
windowWidth = $(window).width() - 48;
flickrItems = parseInt(windowWidth / 95);
flickrUrl = "http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a0bfe1a0f6654e19f60cb959095cbd88&user_id=34382828@N02&per_page=" + flickrItems + "&format=json&jsoncallback=?";

$.getJSON(flickrUrl, function (data) {
	var list = $('<ul class="content"></ul>');
	$.each(data.photos.photo, function (i, item) {
		var src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_s.jpg";
		var link = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_b.jpg";
		var title = item.title;
		$(list).append('<div class="showcase-slide"><div class="showcase-content"><img src="' + link + '" alt="' + title + '" height="480" /></div><div class="showcase-thumbnail"><img src="' + src + '" alt="' + title + '" width="75" height="75" /><div class="showcase-thumbnail-cover"></div></div></div>');
	});
	
	// Inserto las fotos de Flickr en su contenedor y quito el icono de loading
	$("#flickr").append(list);
	setTimeout(function(){
		$("#wrapper-top").animate({ opacity: "1" }, 250);
		setTimeout(function(){
			$("#wrapper-top").animate({ top: -587 }, 250);
		}, 2000);
	}, 2000);
	
	// Efecto de opacidad para las fotos de Flickr
  $("#flickr a").hover(function() {
  	$(this).animate({ opacity: "1" }, 250);
	},function() {
	  $(this).animate({ opacity: "0.8" }, 250);
	});

	// Cargamos la galería de Flickr
	$("#flickr .content").awShowcase({
		content_width:			900,
		content_height:			480,
		hundred_percent:		true,
		auto:					false,
		interval:				3000,
		continuous:				false,
		loading:				true,
		arrows:					true,
		buttons:				false,
		keybord_keys:			true,
		mousetrace:				false,
		pauseonover:			true,
		transition:				'hslide', /* hslide/vslide/fade */
		transition_speed:		500,
		transition_delay:		300,
		show_caption:			'onhover', /* onload/onhover/show */
		thumbnails:				true,
		thumbnails_position:	'outside-last', /* outside-last/outside-first/inside-last/inside-first */
		thumbnails_direction:	'horizontal', /* vertical/horizontal */
		thumbnails_slidex:		0, /* 0 = auto / 1 = slide one thumbnail / 2 = slide two thumbnails / etc. */
		dynamic_height:			true,
		speed_change:			false,
		viewline:				false
	});
	
	$("#wrapper-top").hover(function() {
  	$(this).stop(true, true).animate({ top:"0" }, 750, function() { $("#flickr-alert").fadeOut(); });
	},function() {
	  $(this).queue(function() {
	  setTimeout(function(){
			$(this).dequeue();
		}, 750);
		});
	  $(this).animate({ top:"-587" }, 250, function() { $("#flickr-alert").fadeIn(); });
	});
	
});