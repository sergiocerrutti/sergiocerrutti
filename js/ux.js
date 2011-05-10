/*
Created by Sergio Cerrutti
http://www.sergiocerrutti.com
March 2011
*/


$(document).ready(function() {
    
	// Cargo cufon para reemplazar algunos encabezados
  Cufon.replace('.cufon');
	
	// Por defecto, toda la información de los bloques inferiores sale colapsada si está el javascript activado, y se expande al hacer click
	$("section article").hide();
	$("section").click(function () { 
    $("section").addClass("expanded");
    $("section > article").slideDown();
  });
  
  // Efecto de opacidad para los enlaces del pie
  $("footer li a").css({ opacity: "0.65" }).hover(function() {
  	$(this).animate({ opacity:"1" }, 250);
	},function() {
	  $(this).animate({ opacity:"0.65" }, 250);
	});
	
	// Si nos situamos en la parte superior, se carga una capa con información social por encima de la foto
	$("#profile").hover(function() {
  	$("#social").stop(true, true).fadeIn();
	},function() {
	  $("#social").fadeOut();
	});
	
	// Cargamos el tweetline
	loadTweets();
	
});