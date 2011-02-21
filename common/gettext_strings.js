// vim: fileencoding=utf-8 nospell ts=2 et

// "xgettext -k_ gadget.js" to generate .po file
var gt = new Gettext( { 
        "domain": "PrestoClock", 
        //"domain": "", 
        "locale_data": locale_data 
        } ); 

function _ ( msgid ) {
    // Convenience shortcut for GetText

    var translated = gt.gettext( msgid );
    if ( translated ) {
        return translated;
    } else {
        // If there is no translation, return original string
        return msgid;
    }
}

function get_string( id ) {
    var strings = {
        // Do not change the order of the days or months!
        'daysLong': [ 
            _("Sunday"), _("Monday"), _("Tuesday"),
            _("Wednesday"), _("Thursday"), _("Friday"), _("Saturday")
            ],
        'daysShort': [
            _("Sun"), _("Mon"), _("Tue"),
            _("Wed"), _("Thu"), _("Fri"), _("Sat") 
            ],
        'monthsLong': [
            _("January"), _("February"), _("March"),
            _("April"), _("May"), _("June"),
            _("July"), _("August"), _("September"),
            _("October"), _("November"), _("December")
            ],
        'monthsShort': [
            _("Jan"), _("Feb"), _("Mar"),
            _("Apr"), _("May"), _("Jun"),
            _("Jul"), _("Aug"), _("Sep"),
            _("Oct"), _("Nov"), _("Dec")
            ],

        'am': _("am"),
        'pm': _("pm"),

        'defaultDateFormat': _("D M d"),
        'defaultTimeFormat': _("h:i a"),

        't_dateformat':     _("Date format:"),
        't_timeformat':     _("Time format:"),
        't_timezone':       _("Time zone:"),
        't_localtime':      _("Local time"),
        't_bottomlabel':    _("Bottom label:"),
        't_optional':       _("(optional)"),
        't_examples':       _("Examples:"),
        't_date':           _("Date:"),
        't_time':           _("Time:"),
        't_label':          _("Label:"),
        't_dateexamples':   _("D M d = Sat Apr 07<br>n/j l = 4/7 Saturday"),
        't_timeexamples':   _("g:i a = 5:44 pm<br>H:i = 17:44"),
        't_labelexamples':  _("Portland, Tokyo, GMT+2"),
        't_formathelp':     _("<a href=\"http://us.php.net/manual/en/function.date.php\">Format help</a>"),
        't_formathelplong': _("<a href=\"http://us.php.net/manual/en/function.date.php\">Format help</a> (unsupported: T, e, o, u)"),
        
        // Don't modify xxVER or xxDATE
        't_version':        _("Version xxVER (xxDATE)"),
        't_about':          _("About this gadget"),
 
        // If you want credit for translation, translate "Languagename translation by your name"
        't_translateby':    _(""),
        't_language':       _("Language:"),
        't_charity':        _("Presto's Clock is Charityware. If you like it, please consider a donation to the less fortunate of the world. See the project page for <a href=\"http://prestonhunt.com/story/110\">information on how to donate</a>."),
        't_fontfamily1':     _("Font:"),
        't_fontfamily2':     _("Font:"),
        't_fontfamily3':     _("Font:"),
        't_fontsize1':       _("Font size:"),
        't_fontsize2':       _("Font size:"),
        't_fontsize3':       _("Font size:"),
        't_fontcolor1':      _("Font color:"),
        't_fontcolor2':      _("Font color:"),
        't_fontcolor3':      _("Font color:"),
      //	't_background':  		_("Background image"),
        't_date2': 				 	 _("Date"),
        't_time2': 				 	 _("Time"),
        't_label2': 			 	 _("Label"),
        't_swap_labels':     _("Swap date and bottom label"),
        't_sun_colors':      _("Dim clock at night (beta)"),
        't_tab1':            _("General"), 
        't_tab2':            _("Appearance"),
        't_tab3':            _("About"),
        't_tab4':            _("Background"),
        't_copyright':       _("Copyright 2009-2011 Preston Hunt"),
        't_auto_check':      _("Notify me when new versions of the clock are available"),
        't_update':          _("A newer version of Presto's Clock is available. <a href=\"http://gallery.live.com/liveItemDetail.aspx?li=348e5816-f95b-493e-a6df-a03980e34e51\">Update now!</a>"),
        // Replace English with the name of your language in your language
        't_languagename':    _("English"),

        't_backup_settings': _("Backup settings"),
        't_backup':          _("Backup settings to clipboard"),
        't_restore':         _("Restore settings from clipboard")
    };

    var str = strings[ id ];

    if ( ! str ) {
        str = "UNDEFINED!";
    }

    return str;
}
