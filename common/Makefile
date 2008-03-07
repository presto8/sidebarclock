files = formatDate.js tzdata2007k_json.js noaa.js latlon_json.js \
translations.js gadget.js

all: gadget.all.min.js

gadget.all.js: $(files)
	cat $(files) >$@

gadget.all.min.js: gadget.all.js
	yuicompressor $< -o $@

debug: gadget.all.js
