files = formatDate.js tzdata-2009p_json.js noaa.js latlon_json.js \
translations.js gadget.js

all: jslint gadget.all.min.js

jslint:
	jsl -conf jsl.conf

gadget.all.js: $(files)
	cat $(files) >$@

gadget.all.min.js: gadget.all.js
	yuicompressor --charset utf-8 $< -o $@
	#perl -Ipacker packer/jsPacker.pl -i $< -o $@ -e95 -s

debug: gadget.all.js
