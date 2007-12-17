# 
# Replace xxVER and xxDATE
# How: Find all files with .xx extension.  Search for xxVAR and replace it with value in this file.  Output results to filename mnus .xx extension.

version = 1.11
date = 2007-12-08

dist:
	# check for file .remove_for_production and abort if present
	rm -rf .hg .hgtags 
	
	VER=$(version)
	DATE=$(date)
	find . -type f -name gadget.xml -exec sed -i -e 's/xxVER/$VER/g' -e 's/xxDATE/$DATE/g' "{}" \;
	find . -type f -name settings.html -exec sed -i -e 's/xxVER/$VER/g' -e 's/xxDATE/$DATE/g' "{}" \;

	yuicompressor common/gadget.js >gadget.min.js
	mv -f js/gadget.min.js js/gadget.js
