// Hello world!

$(document).ready(function() {
	$(".cont").prepend("<div class='fold'></div>");
	$(".last .cont").hide();

	$(".fold").click(function(e){
		var p = $(this).parent();
		if($(this).parent().hasClass("last")) {
		    $(".last > .cont").show();
		    $(".last > .cont").addClass("last");
		    p.removeClass("last");
		} else {
		    p.addClass("last");
		    p.children(".cont").hide(); 
		}
	    });

    });
