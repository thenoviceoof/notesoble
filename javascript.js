// Hello world!

$(document).ready(function() {
	$(".cont").filter(":not(.bot)").prepend("<div class='fold'></div>");
	$(".last .cont").hide();

	$(".fold").click(function(e){
		var p = $(this).parent();
		if(p.hasClass("last")) {
		    p.children(".cont").show();
		    p.children(".cont").addClass("last");
		    p.removeClass("last");
		} else {
		    p.find(".cont").hide();
		    p.find(".last").removeClass("last");
		    p.addClass("last");
		}
	    });

    });
