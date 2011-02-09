files = json2.js formatDate.js tzdata-2010g3_json.js sun.js latlon_json.js \
	Gettext.js translations.js gadget.js

#all: jslint gadget.all.min.js
all: jslint gadget.all.js

jslint:
	jsl -conf jsl.conf

gadget.all.js: $(files)
	cat $(files) >$@

#gadget.all.min.js: gadget.all.js
#	yui-compressor --charset utf-8 $< -o $@

debug: gadget.all.js

clean:
	rm gadget.all.js gadget.all.min.js
