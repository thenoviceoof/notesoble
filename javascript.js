// Hello world!

$(document).ready(function() {
	$(".cont").filter(":not(.bot)").prepend("<div class='fold'></div>");
	$(".last .cont").hide();

	$("cont .fold").click(function(e){
		var p = $(this).parent();
		if(p.hasClass("last")) {
		    p.children("section").show();
		    p.children("section").addClass("last");
		    p.removeClass("last");
		} else {
		    p.find("section").hide();
		    p.find(".last").removeClass("last");
		    p.addClass("last");
		}
	    });

    });
