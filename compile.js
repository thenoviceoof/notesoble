// hand in a jquery obj
function compile(obj,doc) {
    // container for displayed meta info
    var header = $("<header />");
    obj.append(header);
    
    // handle meta information to be displayed
    var meta = doc["meta"];
    if(meta['title'])
	header.append($("<h1></h1>",{html:meta['title'],
			"id":"title"}));
    if(meta['author'])
	header.append($("<h2></h2>",{html:meta['author'],
			"id":"author"}));
    var metaCont = $("<div/>",{'class':'meta'});
    if(meta['copyright']) {
	metaCont.append($("<h2/>",{html:"Copyright"}));
	metaCont.append($("<p></p>",{html:meta['copyright'],
			"id":"copyright"}));
    }
    if(meta['version']) {
	metaCont.append($("<h2/>",{html:"Versions"}));
	metaCont.append($("<p></p>",{html:meta['version'],
			"id":"version"}));	
    }

    header.append(metaCont);
    var metaFold = $("<div/>",{"class":"fold folded"});
    metaFold.click(function(){
	    $(".meta").toggle();
	    $(this).toggleClass("folded");
	});
    header.prepend(metaFold);
    
    // container holder
    var cont = $("<div class='cont'></div>");
    obj.append(cont);
    
    // run the content generator
    var content = gen_sections(doc["docs"]);
    content.addClass("last");
    cont.append(content);
}

// recursively generate the content
function gen_sections(docs) {
    // if not a list
    // here to handle bad errors
    if(typeof docs == "string") {
	return gen_text({"text":docs});
    }
    var content = $("<section/>",
		    {'class':'',});
    // figure out whether or not we need to fold this
    var foldp = false;
    for(var i in docs) {
	if(typeof docs[i] == "string") {
	    // handle the raw strings
	    var sum = gen_text({"text":docs[i]});
	    content.append(sum);
	} else if(docs[i]["text"]) {
	    // handle the hashes
	    var sum = gen_text(docs[i]);
	    content.append(sum);
	} else { 
	    // it's an array!
	    foldp = true;
	    content.append(gen_sections(docs[i]));	    
	}
    }
    if(foldp) {
	var fold = $("<div/>",
		     {'class':'fold'});
	content.prepend(fold);
    }
    return content;
    // maybe hand back the height also?
}

function gen_text(dict) {
    var sum = $("<summary/>").html(dict["text"]);
    return sum;
}

$(document).ready(function(){
	compile($("body"),data);
    });