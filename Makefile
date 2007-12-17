# 
# Replace xxVER and xxDATE
# How: Find all files with .xx extension.  Search for xxVAR and replace it with value in this file.  Output results to filename mnus .xx extension.

version = 1.11
date = 2007-12-08

dist:
	[ -e .remove_before_publishing ] && exit -1

	VER=$(version)
	DATE=$(date)

	# check for file .remove_for_production and abort if present
	
	echo Removing .hg and .hgtags
	rm -rf .hg .hgtags 
	
	echo Setting version and date in files
	find . -type f -name gadget.xml -exec sed -i -e 's/xxVER/$VER/g' -e 's/xxDATE/$DATE/g' "{}" \;
	find . -type f -name settings.html -exec sed -i -e 's/xxVER/$VER/g' -e 's/xxDATE/$DATE/g' "{}" \;

	echo Minifying javascript
	yuicompressor common/gadget.js >gadget.min.js
	mv -f js/gadget.min.js js/gadget.js

	echo Creating zip/gadget file
	ZIP=prestosidebarclock-$VERSION.gadget
	7z a -tzip $ZIP *

