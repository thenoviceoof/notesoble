// Hello world!

$(document).ready(function() {
	$(".last section").hide();

	$(".cont .fold").click(function(e){
		var p = $(this).parent();
		if(p.hasClass("last")) {
		    // expand the section
		    p.children("section").show();
		    p.children("section").addClass("last");
		    p.removeClass("last");
		} else {
		    // fold up the section
		    p.find("section").hide();
		    p.find(".last").removeClass("last");
		    p.addClass("last");
		}
	    });

    });
