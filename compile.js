// hand in a jquery obj
function compile(obj,doc) {
    // container for displayed meta info
    var header = $("<header />");
    obj.append(header);
    
    // handle meta information to be displayed
    var meta = doc["meta"];
    var title = header.append($("<h1></h1>",{html:meta['title']}));
    var author = header.append($("<h2></h2>",{html:meta['author']}));
    
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
    var content = $("<section/>",
		    {'class':'',});
    for(var i in docs) {
	if(typeof docs[i] == "string") {
	    var sum = $("<summary/>").html(docs[i]);
	    content.append(sum);
	    // might have to include a hash option
	    // check for a particular attribute
	} else { // it's an array!
	    content.append(gen_sections(docs[i]));	    
	}
    }
    var fold = $("<div/>",
		 {'class':'fold'});
    content.prepend(fold);
    return content;
    // maybe hand back the height also?
}

$(document).ready(function(){
	compile($("#doc-cont"),data);
    });