/*
 * JavaScript code for Presto's Sidebar Clock
 *
 *   Copyright (c) 2011-2012, Preston Hunt <me@prestonhunt.com>
 *   All rights reserved.
 *
 * Non-localized javascript
 * vim: ts=2 et nospell nowrap
 */

var isDirty = true;
var DEBUG = false;

// Global stored settings
// Also see setDefaults() which initializes this data structure
var G = 
    { mainDateFormat: null
    , mainTimeFormat: null
    , tzLabel: null
    , tzName: null
    , swaplabels: false
    , suncolors: false
    , sunset_opacity: null
    , updatecheck: null
    , background_file: null

    , gDatefontfamily: null
    , gDatefontsize: null
    , gDatefontcolor: null

    , gTimefontfamily: null
    , gTimefontsize: null
    , gTimefontcolor: null

    , gLabelfontfamily: null
    , gLabelfontsize: null
    , gLabelfontcolor: null

    , locale: null
    , numerals: null
    };

var L = null;

var gTime = null;
var gDate = null;
var gLabel = null;
var gOpacity = 100;
var gNow = null;
var gGmtOffset = null;

function alert( mesg ) {
    /*jsl:ignore*/
    if ( ! DEBUG ) return;
    System.Debug.outputString( mesg );
    /*jsl:end*/
    // See: http://keithelder.net/blog/archive/2008/01/31/Debugging-Vista-Sidebar-Gadgets-in-Visual-Studio-2008.aspx
}

function readSetting( settingName ) {
    return System.Gadget.Settings.read( settingName );
}

function setLocale() {
    if ( G.locale === '' ) G.locale = 'en';
    L = translations[ G.locale ];
}

function readSettings() {
    settingsRegistryToG();
    setLocale();

    imgBackground.src = G.background_file;

    var illegal_opacity = G.sunset_opacity < 0 || G.sunset_opacity > 100;
    if ( illegal_opacity ) {
        G.sunset_opacity = 50;
    } 

    if ( DEBUG ) {
        G.tzLabel += " (DEBUG)";
    }
}

function setDefaults() {
    var lang = getSystemLanguage();
    setLocale(lang);

    System.Gadget.Settings.write( "mainDateFormat", L.defaultDateFormat );
    System.Gadget.Settings.write( "mainTimeFormat", L.defaultTimeFormat );
    System.Gadget.Settings.write( "locale", lang );
    System.Gadget.Settings.write( "numerals", "a" );

    System.Gadget.Settings.write( "sunset_opacity", 30 );
    System.Gadget.Settings.write( "updatecheck", true );

    System.Gadget.Settings.write( "background_file", 'images/background-black.png' );

    var elements = [ 'gDate', 'gTime', 'gLabel' ];
    for ( var el in elements ) {
        var base = elements[el];
        System.Gadget.Settings.write( base+"fontfamily", "Segoe UI" );
        System.Gadget.Settings.write( base+"fontsize", "Auto" );
        System.Gadget.Settings.write( base+"fontcolor", "White" );
    }
}

function startup() {
    alert( "Entering startup()" );

    System.Gadget.settingsUI = "settings.html";
    System.Gadget.onSettingsClosed = afterSettingsClosed;
    System.Gadget.visibilityChanged = checkVisibility;

    readSettings();

    if ( ! G.mainTimeFormat ) {
        setDefaults();
        readSettings();
    }

    gDate = imgBackground.addTextObject("", "Segoe UI", 11, "white", 0, 0 );
    gTime = imgBackground.addTextObject("", "Segoe UI", 12, "white", 0, 0 );
    gLabel = imgBackground.addTextObject("", "Segoe UI", 11, "white", 0, 0 );

    updateFonts();
    updateGadget();
}

function afterSettingsClosed() {
    readSettings();
    updateFonts();
    adjustOpacityByCurrentTime();

    /* We have to handle a corner case here.  If the time format is
     * changing from not display seconds to display seconds, then the
     * clock won't be updated until the minute changes, which could be up
     * to 59 seconds away.  A quick hack is to simply calculate how many
     * seconds are remaining until the next minute and manually update the
     * clock that many times. 
     */
    var now = new Date();
    var secondsUntilNextMinute = 60 - now.getSeconds();
    var milliseconds_to_wait = 1000 - now.getMilliseconds();
    for ( var i = secondsUntilNextMinute; i >= 0; i-- ) {
        window.setTimeout( displayGadget, i*1000 + milliseconds_to_wait );
    }
}

function adjustOpacityByCurrentTime() {
    if ( G.suncolors === false || G.tzName.length === 0 ) {
        gOpacity = 100;
        return;
    }

    var coords = latlon[ G.tzName ];
    if ( ! coords ) return;
    var lat = coords[0];
    var lon = coords[1];

    var now = new Date(); // Don't use gNow here!

    var sunobj = new SunriseSunset( now.getUTCFullYear(),
            1+now.getUTCMonth(), now.getUTCDate(), lat, lon);

    var nowUtcHours = now.getUTCHours() + now.getUTCMinutes() / 60;
    var isLight = sunobj.isDaylight( nowUtcHours );

    var new_opacity = 100 - G.sunset_opacity;
    gOpacity = isLight ? 100 : new_opacity;
}

function getMillisecondsToWait() {
    /* To reduce power usage, we determine polling frequency based on the
     * time format string.  If seconds are included, then we update every
     * second.  But if no seconds are included, then we only update every
     * minute. */

    var now = gNow;
    var milliseconds_to_wait = 1000 - now.getMilliseconds() + 1;

    if ( G.mainTimeFormat.indexOf('s') >= 0 ) {
        // Time format string includes seconds, need to update quickly
        return milliseconds_to_wait;
    } else {
        // Time format does not include seconds, can delay update until next
        // the next minute.  But we need to make sure that we update after
        // the minute has switched, otherwise we will be out of commission
        // for another whole minute.
        var seconds_to_wait = 60 - now.getSeconds();

        return ( seconds_to_wait * 1000 ) + milliseconds_to_wait;
    }
}

function updateNow() {
    gNow = new Date();
    gGmtOffset = gNow.getTimezoneOffset();

    if ( G.tzName.length > 0 ) {
        try {
            var utc = gNow.getTime() + gGmtOffset*60*1000;
            var utcEpoch = Math.round(utc/1000.0);
            var otherOffset = getOffsetInMinutes( G.tzName, utcEpoch );
            var otherTime = utc - otherOffset*60*1000;

            gNow = new Date( otherTime );
            gGmtOffset = otherOffset;
        } catch(err) {
            G.tzName = ''; // no tzdata for this entry, clear it away
        }
    }

    return gNow;
}

function updateGadget() {
    alert( "Entering updateGadget()" );

    if ( ! System.Gadget.visible ) {
        isDirty = true;
    } else {
        displayGadget();
        isDirty = false;
        window.setTimeout( updateGadget, getMillisecondsToWait() );
    }
}

function checkVisibility() {
    // See http://blogs.msdn.com/sidebar/archive/2006/08/18/706495.aspx
    if ( System.Gadget.visible && isDirty ) {
        adjustOpacityByCurrentTime();
        updateGadget();
    }
}

function getOffsetInMinutes( tzName, utcEpoch ) {
    var tzOffsets = tzdata[ tzName ];
    var offset = 0;
    for ( var cutoff in tzOffsets ) {
        if ( utcEpoch > cutoff ) {
            offset = tzOffsets[ cutoff ];
        }
    }
    return offset;
}

function devadigits(s) {
    // Function provided by Robert Lozyniak <r07271368@hotmail.com>
    // takes a string and outputs same but with
    // European digits changed to Devanagari digits
    var p; var c;
    var d="";
    for (p=0; p<s.length; p++) {
        c=s.charCodeAt(p);
        if(c>=48 && c<=57) c+=2358;
        d+=String.fromCharCode(c);
    }
    return d;
}

function displayGadget() {
    updateNow();
    adjustOpacityByCurrentTime();

    gLabel.opacity = G.tzLabel ? gOpacity : 0; // this has to be done before changing the text!
    gLabel.value = formatTzLabel( G.tzLabel, gNow, gGmtOffset );
    gLabel.width = gLabel.height = 0; // force recalculation of width

    gDate.opacity = G.mainDateFormat ? gOpacity : 0;
    gDate.value = G.mainDateFormat ? formatDate( G.mainDateFormat, gNow, gGmtOffset ) : '';
    gDate.height = gDate.width = 0; // force recalculation of width

    gTime.opacity = G.mainTimeFormat ? gOpacity : 0;
    gTime.value = formatDate( G.mainTimeFormat, gNow, gGmtOffset );
    gTime.height = gTime.width = 0; // force recalculation of width

    if ( G.numerals == 'd' ) {
        gDate.value = devadigits( gDate.value ); 
        gTime.value = devadigits( gTime.value ); 
    }

    adjustTimeToFit();
    adjustDateToFit();
    adjustLabelToFit();

    adjustPositions();
}

function adjustPositions() {
    var maxWidth = 130;
    var maxHeight = 67;

    // Horizontal center
    gDate.left = ( maxWidth - gDate.width ) / 2;
    gLabel.left = ( maxWidth - gLabel.width ) / 2;
    gTime.left = ( maxWidth - gTime.width ) / 2;

    // Normal display
    var gTop = gDate;
    var gBottom = gLabel;

    if ( G.swaplabels ) {
        gTop = gLabel;
        gBottom = gDate;
    }

    // Adjust tops
    gTop.top = 5;
    gBottom.top = 47;

    // Now the trickiest to adjust, the time position
    // Start off directly in the middle
    gTime.top = ( maxHeight - gTime.height ) / 2;

    var topOnly = gTop.value.length && ! gBottom.value.length;
    var bottomOnly = ! gTop.value.length && gBottom.value.length;

    if ( topOnly ) {
        // Adjust down if there is no bottom field
        gTime.top += ( gTop.height - 5 ) / 2;
    } else if ( bottomOnly ) {
        // Adjust up if there is no top field
        gTime.top -= ( gBottom.height - 5 ) / 2;
    }
}

function workingadjustTimeToFit() {
    if ( G.gTimefontsize != 'Auto' ) {
        gTime.fontsize = G.gTimefontsize;
        return;
    }

    var maxWidth = 130;
    var maxHeight = getProperTimeHeight();

    var newFontSize = Math.floor( gTime.fontSize * maxWidth / gTime.width );
    if ( newFontSize > 100 ) newFontSize = 12;
    gTime.fontsize = newFontSize;

    if ( gTime.height > maxHeight ) {
        gTime.fontsize *= maxHeight / gTime.height;
    }
}

function adjustTimeToFit() {
    adjustToFit( gTime, G.gTimefontsize, 130, getProperTimeHeight() );
}

function adjustDateToFit() {
    adjustToFit( gDate, G.gDatefontsize, 130, 16 );
}

function adjustLabelToFit() {
    adjustToFit( gLabel, G.gLabelfontsize, 130, 16 );
}

function adjustToFit( obj, size, maxWidth, maxHeight ) {
    if ( size != 'Auto' ) {
        obj.fontsize = size;
        return;
    }

    var newFontSize = Math.floor( obj.fontSize * maxWidth / obj.width );
    if ( newFontSize > 100 ) newFontSize = 12;
    obj.fontsize = newFontSize;

    if ( obj.height > maxHeight ) {
        obj.fontsize *= maxHeight / obj.height;
    }
}

function getProperTimeHeight() {
    var height = 67;
    if ( gLabel.value.length ) height -= gLabel.height - 5;
    if ( gDate.value.length ) height -= gDate.height - 5;
    return height;
}

function getFormValue( variablename ) {
    var varEl = document.getElementById( variablename );
    if ( varEl === null ) return "form-element-not-found";

    var varVal;
    if ( varEl.type == 'checkbox' ) {
        varVal = varEl.checked ? true : false;
    } else {
        varVal = varEl.value;
    }
    return varVal;
}

function setFormValue( varname, varVal ) {
    var varEl = document.getElementById( varname );
    if ( varEl === null ) return;

    if ( varEl.type == 'checkbox' ) {
        varEl.checked = varVal;
    } else {
        varEl.value = varVal;
    }
}

function setTzOptions() {
    var selectId = document.getElementById( "tzName" );
    var zones = tzdata;

    selectId.length = 0;
    selectId.add( new Option( L.t_localtime, '' ) );

    for ( var z in zones ) {
        selectId.add( new Option( z, z ) );
    } 

    selectId.value = readSetting( "tzName" );
}

function getSystemLanguage() {
    var localeCode = window.navigator.userLanguage;
    if ( ! localeCode ) return 'en';
    var lang = localeCode.split( '-', 1 );
    if ( ! tzdata[lang] ) return 'en';
    return lang;
}

function GToForm() {
    for ( var key in G ) {
        setFormValue( key, G[key] );
    }
}

function formToG() {
    for ( var key in G ) {
        var val = getFormValue( key );
        if ( val !== 'form-element-not-found' ) {
            G[key] = val;
        }
    }
}

function GToSettingsRegistry() {
    for ( var key in G ) {
        System.Gadget.Settings.write( key, G[key] );
    }
}

function settingsRegistryToG() {
    for ( var key in G ) {
        G[key] = readSetting( key );
    }
}

function createSettingsHtmlElements() {
    var elements = [ 'gDate', 'gTime', 'gLabel' ];
    for ( var el in elements ) {
        var base = elements[el];
        document.getElementById(base+'_fontList').innerHTML = 
            createFontSelect( base+'fontfamily');
        document.getElementById(base+'_fontSizeList').innerHTML =
            createFontSizeSelect( base+'fontsize' );
        document.getElementById(base+'_fontColorList').innerHTML =
            createFontColorSelect( base+'fontcolor' );
    }
}

function initSettings() {
    System.Gadget.onSettingsClosing = settingsClosing;

    createSettingsHtmlElements();

    settingsRegistryToG();
    GToForm();

    setLocale();

    displaySettings();
}

function localizeText() {
    for ( var key in L ) {
        var el = document.getElementById(key);
        if ( ! el ) continue;
        el.innerHTML = L[key] + ' ';
    }
}

function changeLocale( newlocale ) {
    G.locale = newlocale;
    setLocale();
    document.getElementById("mainDateFormat").value = L.defaultDateFormat;
    document.getElementById("mainTimeFormat").value = L.defaultTimeFormat;

    displaySettings();
}

function changeNumerals( newvalue ) {
    G.numerals = newvalue;
}

function displaySettings() {
    setTzOptions();
    localizeText();
    showIfUpdateAvailable();
    gotoTab( 1 );
    timezoneChanged();
}

function settingsClosing(event) {
    if ( event.closeAction == event.Action.commit ) {
        formToG();
        GToSettingsRegistry();
    }

    event.cancel = false;
}

function updateFonts() {
    // Only need to run this once, on first gadget startup or when
    // settings have been changed

    if ( ! gTime ) return;

    var elements = [ 'gDate', 'gTime', 'gLabel' ];
    for ( var el in elements ) {
        var base = elements[el];
        var cur; // declaring here to avoid lint warnings
        eval( 'cur = ' + base );

        if ( cur.font != G[base+'fontfamily'] ) {
            eval( base + '.font = G.'+base+'fontfamily' );
        }
        if ( cur.color != G[base+'fontcolor'] ) {
            eval( base + '.color = G.'+base+'fontcolor' );
        }
    }
}

function getSystemFontsList() {
    // http://msdn.microsoft.com/en-us/library/ms537454.aspx

    var fontNames = new Array();

    for (var i=1; i < dlgHelper.fonts.count; i++) {
        fontNames.push( dlgHelper.fonts(i) );
    }

    return fontNames.sort();
}

function createFontSelect( id ) {
    var values = createSelectOptions( getSystemFontsList() );
    return '<select id='+id+'>' + values + '</select>';
}

function createSelectOptions( values ) {
    var out = '';

    for ( var el in values ) {
        var name = values[el];
        out += '<option value="' + name + '">' + name + '</option>';
    }

    return out;
}

function createFontColorSelect( id ) {
    var colors = getMicrosoftColors();
    var out = '';
    for ( var c in colors ) {
        var display_color = colors[c];
        var background_color = 'Black';
        out += '<option value="' + colors[c] + 
            '" style="color: ' + display_color + 
            '; background-color: ' + background_color + 
            '">' + colors[c] + '</option>';

    }

    return '<select id=' + id + '>' + out + '</select>';
}

function createFontSizeSelect( id ) {
    var sizes = [ 'Auto', '8', '10', '12', '14', '16', '18', '20', '22',
        '24', '26', '28', '30', '32', '34', '36', '38', '40', '42', '44',
        '46', '48', '50' ];
    var values = createSelectOptions( sizes );
    return '<select id=' + id + '>' + values + '</select>';
}

function getMicrosoftColors() {
    // list of colors supported by g:text
    // http://msdn.microsoft.com/en-us/library/aa359339(VS.85).aspx

    var MicrosoftColors = [ 'AliceBlue', 'AntiqueWhite', 'Aqua',
        'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond',
        'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue',
        'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk',
        'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenrod',
        'DarkGray', 'DarkGreen', 'DarkKhaki', 'DarkMagenta',
        'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed',
        'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray',
        'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray',
        'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia',
        'Gainsboro', 'GhostWhite', 'Gold', 'Goldenrod', 'Gray', 'Green',
        'GreenYellow', 'Honeydew', 'HotPink', 'IndianRed', 'Indigo',
        'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen',
        'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan',
        'LightGoldenrodYellow', 'LightGreen', 'LightGrey', 'LightPink',
        'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray',
        'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen',
        'Magenta', 'Maroon', 'MediumAquamarine', 'MediumBlue',
        'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue',
        'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed',
        'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite',
        'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed',
        'Orchid', 'PaleGoldenrod', 'PaleGreen', 'PaleTurquoise',
        'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum',
        'PowderBlue', 'Purple', 'Red', 'RosyBrown', 'RoyalBlue',
        'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'Seashell',
        'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'Snow',
        'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato',
        'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow',
        'YellowGreen' ];

    return MicrosoftColors;
}

function gotoTab( tabNum ) {
    for ( var i=1; i<=3; i++ ) {
        document.getElementById( 'tab'+i ).style.display = 'none';
        document.getElementById( 'tabcontrol'+i ).className = '';
    }

    document.getElementById( 'tab'+tabNum ).style.display = 'block';
    document.getElementById( 'tabcontrol'+tabNum ).className = 'tab_selected';
}

function getHttpAsText( url ) {
    try {
        var req = new ActiveXObject( "Microsoft.XMLHTTP" );
        req.open( 'GET', url, false );
        req.send();
        if ( req.status == 200 ) {
            return req.responseText;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

function isUpdateAvailable() {
    if ( G.updatecheck === false ) return false;

    var url = 'http://prestonhunt.com/m/2009/prestosidebarclock.version';
    var newestText = getHttpAsText( url + '?cacheBuster=' + Math.random() );
    if ( newestText === false ) return false;

    var currentText = 'xxVER';

    var newestVersion = parseFloat( newestText );
    var currentVersion = parseFloat( currentText );

    return newestVersion > currentVersion;
}

function showIfUpdateAvailable() {
    if ( isUpdateAvailable() ) {
        document.getElementById( 't_update' ).style.display = 'block';
    }
}

function saveIniFile() {
    var json_settings = document.getElementById( "json_settings" );

    copySettingsToClipboard();
    json_settings.value = L.t_settings_copied; //"Settings copied to clipboard";
}

function setBackupStatus( mesg ) {
    var el = document.getElementById( "t_backup_status" );
    el.innerText = mesg;
}

function loadIniFile() {
    var new_G = pasteSettingsFromClipboard();
    if ( ! new_G ) {
        setBackupStatus( L.t_settings_invalid );
        return;
    }

    G = new_G;
    GToForm();
    setBackupStatus( L.t_settings_loaded );
}

function copySettingsToClipboard() {
    G.settingsVersion = 2;
    formToG();
    window.clipboardData.setData( "Text", JSON.stringify( G ) );
    setBackupStatus( L.t_settings_copied );
}

function pasteSettingsFromClipboard() {
    try {
        var clip = window.clipboardData.getData( "Text" );
        var new_G = JSON.parse( clip );
    } catch(err) {
        return null;
    }

    if ( new_G.settingsVersion != 2 ) {
        new_G = null;
    }

    return new_G;
}

function swapEscapes( label ) {
    var newlabel = '';

    var last_was_slash = false;
    for ( var i=0, len=label.length; i < len; i++ ) {
        var c = label.charAt(i);
        if ( c != '\\' ) {
            if ( ! last_was_slash ) newlabel += '\\';
            newlabel += c;
        } 
        last_was_slash = ( c == '\\' );
    }

    return newlabel;
}

function formatTzLabel( label, now, gmtOffset ) {
    // Only process if there is a slash in the label
    if ( label.indexOf('\\') < 0 ) {
        return label;
    } else {
        var newlabel = swapEscapes( label );
        return formatDate( newlabel, now, gmtOffset );
    }
}

function timezoneChanged() {
    var dimControl = document.getElementById( 'dimcontrol' );
    var dimDisabled = document.getElementById( 'dimdisabled' );
    var tzName = document.getElementById( 'tzName' ).value;
    var tzNameSet = tzName !== '';
    var coords = latlon[ tzName ];

    if ( tzNameSet && coords ) {
        dimControl.style.display = 'inline';
        dimDisabled.style.display = 'none';
    } else {
        dimControl.style.display = 'none';
        dimDisabled.style.display = 'inline';
    }
}

function setBackground( newvalue ) {
    var dest = document.getElementById( 'background_file' );
    dest.value = newvalue;
}

