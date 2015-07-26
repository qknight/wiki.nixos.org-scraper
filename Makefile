all : wiki options-search

wiki :
	echo "removing old html files from wiki/*"
	rm -Rf wiki/*.html
	echo "note: wiki/*.css manually downloaded css and style_fixes.css"
	echo "scraping the wiki"
	nix-shell -p casperjs --command 'casperjs wiki.nixos.org-scraper.js'
	echo "generating the wiki.qch documentation from wiki.qhp"
	qhelpgenerator wiki.qhp -o wiki.qch
	echo "now issue: assistant -register wiki.qch"
	echo "and afterwards start 'assistant'"

options-search :
	qhelpgenerator options-search.qhp -o options-search.qch
	echo "now issue: assistant -register options-search.qch"
	echo "and afterwards start 'assistant'"

clean :
	rm -f wiki.qch
	rm -f options-search.qch
