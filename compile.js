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

    // meta container
    var metaCont = $("<table/>",{'class':'meta'});
    if(meta['copyright']) {
	var row = $("<tr/>");
	row.append($("<td/>",{html:"Copyright"}));
	row.append($("<td/>",{html:meta['copyright'],
			"id":"copyright"}));
	metaCont.append(row)
    }
    if(meta['version']) {
	var row = $("<tr/>");
	metaCont.append($("<td/>",{html:"Versions"}));
	metaCont.append($("<td/>",{html:meta['version'],
			"id":"version"})); 
	metaCont.append(row)
    }
    
    header.append(metaCont);
    // fold away most of the meta info
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
    switch(dict["type"]) {
    case "h1":
    case "section title":
	var sum = $("<h1/>").html(dict["text"]);
	break;
    case "h2":
    case "chapter title":
	var sum = $("<h2/>").html(dict["text"]);
	break;	
    case "h3":
	var sum = $("<h3/>").html(dict["text"]);
	break;	
    case "h4":
	var sum = $("<h4/>").html(dict["text"]);
	break;	
    case "h5":
	var sum = $("<h5/>").html(dict["text"]);
	break;	
    case "h6":
	var sum = $("<h6/>").html(dict["text"]);
	break;	
    default:
	var sum = $("<summary/>").html(dict["text"]);
    }
    return sum;
}

$(document).ready(function(){
	compile($("body"),data);
    });