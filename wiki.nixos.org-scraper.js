var fs = require('fs');

var casper = require('casper').create({
    viewportSize: {
        width: 1024,
        height: 768
    }
});

var screnshot_counter = 0;

function screenshot() {
//  casper.waitForSelector('a', function() {
//    var name = 'screenshosts/' + 'vbt-' + timestamp + "-" + screnshot_counter++ + '.png';
//    console.log("making a screenshot named: " + name);
//    this.capture(name, {
//      top: 0,
//      left: 0,
//      width: 1024,
//      height: 768
//    });
//  });
};  

var links;

// 1. get a list of target URLs
var u0 = 'https://nixos.org/wiki/Special:AllPages';
var u1 = 'https://nixos.org/w/index.php?title=Special%3AAllPages&from=&to=&namespace=6';

casper.start().thenOpen(u0, function() {
  this.echo("TODO:", 'ERROR');
  this.echo(" +download and include images, use ", 'ERROR');
  this.echo(" +add special articles like talk and similar", 'ERROR');
  this.echo(" +add package search", 'ERROR');
  this.echo(" +add option search", 'ERROR');
  this.echo(" +fix Hosting providers & NixOS naming issue", 'ERROR');
  
  links = this.evaluate(function() {
    var found_links = document.getElementsByClassName('mw-allpages-table-chunk')[0].getElementsByTagName('a');
    var l = Array.prototype.map.call(found_links,function(link){
      return link.getAttribute('href');
    });
    return l;
  });
  screenshot();
//   this.echo(links);
  });

// 2. then download each element and while at it rewrite the links from:
//    https://nixos.org/wiki to ../wiki
var i = -1;
casper.then(function() {
	this.each(links, function() {
		i++;
		var zz = 'https://nixos.org' + links[i];
// 		this.echo(">>> now opening: " + zz);
 		var filename = zz.substring(zz.lastIndexOf('/')+1);
		this.thenOpen(zz, function(){
			this.echo("----------- " + zz + " ---------------");
			var ret = this.evaluate(function() {
				// remove toc
				var toc = document.getElementById('toc')
				if(toc !== null) {
					toc.innerHTML="";
				}

// 				// remove [edit]
				var edit = document.getElementsByClassName('mw-editsection');
				for (i = 0; i < edit.length; i++) {
					edit[i].innerHTML = "";
				}
// 
// 				// remove headline
				var headline = document.getElementById('firstHeading').innerText
// 
				// rewrite the links
				var links_on_page  = document.getElementsByTagName('a')
				for (i = 0; i < links_on_page.length; i++) {
					var el = links_on_page[i];
// 				            __utils__.echo("link: " + el.href);
					if (el.href.indexOf("https://nixos.org/wiki/") == 0)  {
// 						__utils__.echo("  -> rewriting link: " + el.href);
						el.href = el.href.substring(el.href.lastIndexOf('/')+1) + ".html";
					}
				}

				// special toc for qdoc for Main_Page.html
// 				var l = document.getElementsByTagName('span')
// 				for (i =0 ; i < l.length; i++) {
// 				if (l[i].id.length > 0) console.log("<section title=\"" + l[i].id + "\" " + "ref=\"Main_Page.html#" + l[i].id + "\"/>")
// 				}

				// extract the mw-contetnt-text div's childs
				var r = document.getElementById('mw-content-text').innerHTML;
				
				return "<title>" + headline + "</title>" + "<h1>" + headline + "</h1>" + r;
			});
			screenshot();  
			
			if (ret == null) {
				this.echo("the javascript code probably damaged the document and made it null");
				casper.exit(1);
			}
			// add html stuff to it and write it to disk
			var f1 = '<html><head><meta charset="UTF-8" /><link rel="stylesheet" type="text/css" href="style.css">'
			var f2 = '<link rel="stylesheet" type="text/css" href="style_fix.css"></head><body>'
			fs.write('wiki/' + filename + ".html", f1 + f2 + ret + "</body></html>" , 'w');
		});
	});
});

casper.run();






// this is here to have meaningful filenames without having to use a library

function pad(number) {
  var s = String(number);
  if (s.length < 2)
    return "0" + s;
  else 
    return s;
};


var currentTime = new Date();
var dd =   pad(currentTime.getDate());
var mm =   pad(currentTime.getMonth()+1); //January is 0!
var yyyy = currentTime.getFullYear();
var hh =   pad(currentTime.getHours());
var min =  pad(currentTime.getMinutes());
var ss =   pad(currentTime.getSeconds());

var timestamp = ""+ yyyy + mm + dd + "-" + hh +":"+ min +":"+ss;
