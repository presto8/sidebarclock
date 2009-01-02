files = formatDate.js tzdata-2008i_json.js noaa.js latlon_json.js \
translations.js gadget.js

all: jslint gadget.all.min.js

jslint:
	jsl -conf jsl.conf

gadget.all.js: $(files)
	cat $(files) >$@

gadget.all.min.js: gadget.all.js
	yuicompressor --charset utf-8 $< -o $@

debug: gadget.all.js
