files = tzdata-2202.7-1.js \
		json2.js formatDate.js sun.js latlon_json.js \
		Gettext.js translations.js \
		gadget.js

#all: jslint gadget.all.js tags
all: gadget.all.js tags

jslint:
	jsl -conf jsl.conf

gadget.all.js: $(files)
	cat $(files) >$@

debug: gadget.all.js

clean:
	rm gadget.all.js gadget.all.min.js

trans.po: gettext_strings.js
	xgettext -o trans.po --language=java --keyword=_ gettext_strings.js -j

trans.po.js: trans.po
	po2json -p trans.po > trans.po.js

tags: $(files)
	ctags $^

# 
# Minified
#
#
#all: jslint gadget.all.min.js
#
#gadget.all.min.js: gadget.all.js
#	yui-compressor --charset utf-8 $< -o $@

