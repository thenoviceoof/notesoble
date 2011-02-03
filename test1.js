var n;

$(document).ready(function() {
	$(".topLevel, .midLevel, .botLevel, .nope").prepend("<div class='up'></div>");
	$(".topLevel, .midLevel, .botLevel, .nope").prepend("<div class='down'></div>");

	$(".up").click(function(e){
		$(this).parent().removeClass("midLevel");
		$(this).parent().addClass("botLevel");
		var c = $(this).parent().children(".midLevel, .botLevel");
		n = c;
		c.removeClass("midLevel");
		c.removeClass("botLevel");
		c.addClass("nope");
	    });

	$(".down").click(function(e){
		if(!$(this).parent().hasClass("topLevel")) {
		    $(this).parent().removeClass("botLevel");
		    $(this).parent().addClass("midLevel");
		}
		var p = $(this).parent();
		p.children(".nope").removeClass("nope").addClass("botLevel");
	    });
    });
