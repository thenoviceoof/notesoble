/* Code for Note-able */

/* UTILITIES */

function array_replace(elem,repl_with){
    return this.map(function(a){
	    if(a==elem){
		return repl_with;
	    } else {
		return a;
	    }
	});
}
Array.prototype.replace = array_replace;

function offsetPos(pos,left,top){
    pos.left += left;
    pos.top  += top;
    return pos;
}

/* FADING CODE */

var keyFade = false;
var duration = 1800;
function fadeFade(obj){
    if(keyFade){
	obj.css('opacity',obj.css('opacity')-50.0/duration);
	if(obj.css('opacity')<0){
	    keyFade=false;
	}
	setTimeout(function(){fadeFade(obj);},50);
    }
}
function fadeControl(obj){
    obj.css('opacity',1.0);
    if(!keyFade){
	keyFade = true;
	setTimeout(function(){fadeFade(obj);},50);
    }
}

/* DATA/TEXT TRACKING */

var grabInput = true;

var cur_para = 0; var num_para = 1; var prev_para = 0;
var cur_pos  = 0;
var datacont = [[]];

function addchar(char){
    datacont[cur_para].splice(cur_pos+1,0,char);
    cur_pos += 1;
}

function rmchar() {
    datacont[cur_para].splice(cur_pos+1,1);
}

function backchar(){
    datacont[cur_para].splice(cur_pos,1);
    cur_pos -= 1;
}

function addpara(){
    datacont.splice(cur_para+1,0,[]);
    cur_para += 1; num_para += 1;
    cur_pos = 0;
    $("#cont").append("<div id='para"+cur_para+"' class='para'></div>");
}

/* movement */

function moveChar(horz,vert){
    if(horz!=0){
	if(cur_pos+horz>=0 && cur_pos+horz<=datacont[cur_para].length){
	    cur_pos+=horz;}}
    if(vert!=0){
	if(cur_para+vert>=0 && cur_para+vert<num_para){
	    prev_para=cur_para;
	    cur_para+=vert;
	    if(cur_pos+horz<=datacont[cur_para].length){
		cur_pos+=horz;
	    }else{
		cur_pos=datacont[cur_para].length;
	    }
	}
    }
}

function moveEnd(){
    cur_pos = datacont[cur_para].length
}

/* insertion mechanisms */



/* DATA/TEXT PRESENTATION */

function pgetPara(num){return $("#para"+num);}

function pcurPara(){return pgetPara(cur_para);}

function cursor_html(){return "<span id='cursor'>|</span><span id='restline'>";}

function updatePara(num){
    data = datacont[num].slice(); /* to get array copying */
    if(cur_para==num){
	data.splice(cur_pos+1,0,cursor_html());
    }
    data = data.replace(" ","&nbsp;");
    thtml = data.join("");
    thtml += "</span>";
    pgetPara(num).html(thtml);
}

function update(){
    updatePara(cur_para);
    if(cur_para!=prev_para){
	updatePara(prev_para);
    }
}

/* insertion pres */

function showMenu(){
    pos = $('#cursor').offset();
    $('#insert').offset(offsetPos(pos,9,18));
    $('#insert').css('display','block');
    $('#insert input').focus();
    grabInput = false;
}

/* SHORTCUT */

/* shortcut - movements */
shortcut.add("Ctrl+N",function(){moveChar(0, 1);},{'propagate':false});
shortcut.add("Ctrl+P",function(){moveChar(0,-1);},{'propagate':false});
shortcut.add("Ctrl+F",function(){moveChar( 1,0);},{'propagate':false});
shortcut.add("Ctrl+B",function(){moveChar(-1,0);},{'propagate':false});
shortcut.add("Down",  function(){moveChar(0, 1);},{'propagate':false});
shortcut.add("Up",    function(){moveChar(0,-1);},{'propagate':false});
shortcut.add("Left",  function(){moveChar(-1,0);},{'propagate':false});

/* Basic editing stuff */
shortcut.add("Enter",addpara);
shortcut.add("Backspace",backchar);
shortcut.add("Delete",rmchar,{'propagate':false});
shortcut.add("Ctrl-D",rmchar,{'propagate':false});

/* Insertion stuff */
shortcut.add("Ctrl+Space",showMenu,{'propagate':false});

/* PRESENTATION-MODE STYLE KEYSTROKE SHOW */
/* also, text-entry tied up in it too */

function make_proto_hash(input){
    var arr = new Object();
    for(var i=0;i<input.length/2;i++){
	arr[input[2*i]] = input[2*i+1];
    }
    return arr;
}
keycodes = make_proto_hash([46,"Delete",8,"Backspace",27,"Escape",9,
			    "Tab",13,"Enter",38,
			    "Up",40,"Down",37,"Left",39,"Right"]);

$(document).keypress(function(event){
	tmp = String.fromCharCode(event.charCode);
	disp = tmp;
	special = false;
	if(keycodes[event.keyCode]){
	    disp = keycodes[event.keyCode];
	}
	if(disp!=tmp){special=true;}
	if(event.shiftKey) { disp = "Shift + " + disp; }
	if(event.ctrlKey)  { disp = "Ctrl + " + disp; special = true; }
	if(event.altKey)   { disp = "Alt + " + disp; special = true; }
	if(event.charCode==32){ disp = "Space"; }
	if(!special && grabInput){
	    addchar(tmp);
	}
	update();
	$('#keytrack').text(disp);
	fadeControl($('#keytrack'));
});

/* STARTUP */

$(document).ready(function(){update();});
$(window).unload(function(){storage.setItem("doc",JSON.stringify(datacont));});