/*
 * Non-localized javascript
 * vim: ts=2 et nospell nowrap
 */

var isDirty = true;

// Global stored settings
var G = {
  'mainDateFormat': null,
  'mainTimeFormat': null,
  'tzLabel': null,
  'tzName': null,
  'swaplabels': false,

  'gDatefontfamily': null,
  'gDatefontsize': null,
  'gDatefontcolor': null,

  'gTimefontfamily': null,
  'gTimefontsize': null,
  'gTimefontcolor': null,

  'gLabelfontfamily': null,
  'gLabelfontsize': null,
  'gLabelfontcolor': null,

  'locale': 'en'
};

// Localized text
var L = null;

var gTime = null;
var gDate = null;
var gLabel = null;

function alert( mesg ) {
  /*jsl:ignore*/
  return; // uncomment this line for release app
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
  for ( var key in G ) {
    G[key] = readSetting( key );
  }

  setLocale();
}

function setDefaults() {
  var lang = getSystemLanguage();
  setLocale(lang);
  
  System.Gadget.Settings.write( "mainDateFormat", L.defaultDateFormat );
  System.Gadget.Settings.write( "mainTimeFormat", L.defaultTimeFormat );
  System.Gadget.Settings.write( "locale", lang );

  var elements = [ 'gDate', 'gTime', 'gLabel' ];
  for ( var el in elements ) {
    var base = elements[el];
    System.Gadget.Settings.write( base+"fontfamily", "Segoe UI" );
    System.Gadget.Settings.write( base+"fontsize", "Auto" );
    System.Gadget.Settings.write( base+"fontcolor", "White" );
  }
}

function startup() {
  System.Gadget.settingsUI = "settings.html";
  System.Gadget.onSettingsClosed = afterSettingsClosed;
  System.Gadget.visibilityChanged = checkVisibility;

  readSettings();

	if ( ! G.mainTimeFormat ) {
		setDefaults();
		readSettings();
	}

  imgBackground.src = 'images/background-black.png';

  gDate = imgBackground.addTextObject("", "Segoe UI", 11, "white", 0, 0 );
  gTime = imgBackground.addTextObject("", "Segoe UI", 12, "white", 0, 0 );
  gLabel = imgBackground.addTextObject("", "Segoe UI", 11, "white", 0, 0 );

  updateFonts();
  updateGadget();
}

function afterSettingsClosed() {
  readSettings();
  updateFonts();
}

function changeColor( lat, lon, gmt ) {
  if ( G.tzLabel != 'sunrise' ) return;
  var now = new Date();

  var jd = calcJD( now.getFullYear(), 1+now.getMonth(), now.getDate() );
  var sunriseUTC = calcSunriseUTC( jd, lat, lon );
  var sunsetUTC = calcSunsetUTC( jd, lat, lon );

  var h = sunriseUTC + gmt*60;
  var i = sunsetUTC + gmt*60;

  //var dateArea = document.getElementById( "dateArea" );
  var sunrise = timeStringDate(h,jd);
  var sunset = timeStringDate(i,jd);

  //dateArea.innerHTML = sunrise + " " + sunset;
  gLabel.value = sunrise + " " + sunset;
}

function get_milliseconds_to_wait() {
  /* To reduce power usage, we determine polling frequency based on the
   * time format string.  If seconds are included, then we update every
   * second.  But if no seconds are included, then we only update every
   * minute. */

  var now = new Date();

  if ( G.mainTimeFormat.indexOf('s') >= 0 ) {
    // Time format string includes seconds, need to update quickly
    return 1000 - now.getMilliseconds();
  } else {
    // Time format does not include seconds, can delay update until next
    // the next minute.  But we need to make sure that we update after
    // the minute has switched, otherwise we will be out of commission
    // for another whole minute.
    var seconds_to_wait = 60 - now.getSeconds();
    var milliseconds_to_wait = 1000 - now.getMilliseconds();
    var safety_factor_in_ms = 100;

    return ( seconds_to_wait * 1000 ) + milliseconds_to_wait + safety_factor_in_ms;
  }
}

function updateGadget() {
  if ( ! System.Gadget.visible ) {
    isDirty = true;
  } else {
    displayGadget();
    isDirty = false;
    //window.setTimeout(updateGadget, 1000);
    window.setTimeout( updateGadget, get_milliseconds_to_wait() );
  }
}

function checkVisibility() {
  // See http://blogs.msdn.com/sidebar/archive/2006/08/18/706495.aspx
  if ( System.Gadget.visible && isDirty ) {
    updateGadget();
  }
}

function getOffsetInMinutes( tzName, utcEpoch ) {
//  var tzOffsets = document.tzOffsets;
  var tzOffsets = tzdata[ tzName ];
	var offset = 0;
	for ( var cutoff in tzOffsets ) {
	  if ( utcEpoch > cutoff ) {
		  offset = tzOffsets[ cutoff ];
		}
	}
	return offset;
}

function displayGadget() {
  var now = new Date();
  var gmtOffset = now.getTimezoneOffset();

  gLabel.opacity = G.tzLabel ? 100 : 0; // this has to be done BEFORE changing the text!
  gLabel.value = G.tzLabel;
  gLabel.width = gLabel.height = 0; // force recalculation of width

  if ( G.tzName.length > 0 ) {
    try {
      var utc = now.getTime() + gmtOffset*60*1000;
			var utcEpoch = Math.round(utc/1000.0);
      var otherOffset = getOffsetInMinutes( G.tzName, utcEpoch );
      var otherTime = utc + otherOffset*60*1000;

      now = new Date( otherTime );
      gmtOffset = otherOffset;
    } catch(err) {
      G.tzName = ''; // no tzdata for this entry, clear it away
    }
  }

// window.dateArea.innerHTML = '<a href="http://www.timeanddate.com/calendar/">' + formatDate( mainDateFormat, now ) + '</a>';
//  gTime.value = '<a href="http://www.timeanddate.com/worldclock/">' + formatDate( mainTimeFormat, now ) + '</a>';

  gDate.opacity = G.mainDateFormat ? 100 : 0;
  gDate.value = G.mainDateFormat ? formatDate( G.mainDateFormat, now ) : '';
  gDate.height = gDate.width = 0; // force recalculation of width

  gTime.opacity = G.mainTimeFormat ? 100 : 0;
  gTime.value = formatDate( G.mainTimeFormat, now );
  gTime.height = gTime.width = 0; // force recalculation of width

  adjustTimeToFit();
  adjustDateToFit();
  adjustLabelToFit();

  adjustPositions();

  var okToUpdate = now.getMinutes() % 15;
  okToUpdate = true;

  if ( okToUpdate && G.tzName.length ) {
    var coords = latlon[ G.tzName ];
    if ( coords ) {
      var lat = coords[0];
      var lon = -coords[1];
      changeColor( lat, lon, gmtOffset/60 );
    }
  }
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

//  gLabel.value = gTime.fontsize * maxWidth / gTime.width;
//gLabel.value = maxHeight;
//  gLabel.opacity = 100;

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

function oldadjustTimeToFit() {
  var fontSize = 100;
  var maxWidth = 120;

  window.timeArea.style.fontSize = fontSize + 'px';

  var hscale = maxWidth / window.timeArea.offsetWidth;
  fontSize = Math.floor( fontSize * hscale );
  window.timeArea.style.fontSize = fontSize + 'px';

  var timeHeight = getProperTimeHeight();
  var vscale = timeHeight / window.timeArea.offsetHeight;
  if ( vscale < 1 ) {
    fontSize = Math.floor( fontSize * vscale );
    window.timeArea.style.fontSize = fontSize + 'px';
  }

  var whiteSpace = window.timeArea.offsetHeight - fontSize;
  window.timeArea.style.paddingTop = whiteSpace/2 + 'px';
  window.timeArea.style.lineHeight = 1.0;
}

function getProperTimeHeight() {
  var height = 67;
  if ( gLabel.value.length ) height -= gLabel.height - 5;
  if ( gDate.value.length ) height -= gDate.height - 5;
  return height;
}

var shown = false;
function dd( msg ) {
  if ( shown ) return;

  shown = true;
  var shell = new ActiveXObject("WScript.Shell");
  shell.Popup( msg );
}

function CheckAndSet( variablename ) {
  var varEl = document.getElementById( variablename );
  var varVal;
  if ( varEl.type == 'checkbox' ) {
    varVal = varEl.checked ? true : false;
  } else {
    varVal = varEl.value;
  }
  System.Gadget.Settings.write( variablename, varVal );
}

function LoadVarForSettings( variablename ) {
  var varEl = document.getElementById( variablename );
  var varVal = readSetting( variablename );

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

function init_settings() {
  System.Gadget.onSettingsClosing = settingsClosing;
  var varsToLoad = [ 'mainDateFormat', 'mainTimeFormat', 'tzLabel', 'swaplabels' ];

  var elements = [ 'gDate', 'gTime', 'gLabel' ];
  for ( var el in elements ) {
    var base = elements[el];
    document.getElementById(base+'_fontList').innerHTML = createFontSelect( base+'fontfamily');
    document.getElementById(base+'_fontSizeList').innerHTML = createFontSizeSelect( base+'fontsize' );
    document.getElementById(base+'_fontColorList').innerHTML = createFontColorSelect( base+'fontcolor' );

    varsToLoad.push( base+'fontfamily', base+'fontsize', base+'fontcolor' );
  }

  for ( var v in varsToLoad ) {
    LoadVarForSettings( varsToLoad[v] );
  }

  G.locale = document.getElementById("locale").value = readSetting( "locale" );

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

function displaySettings( newlocale ) {
  if ( newlocale !== undefined ) {
    G.locale = newlocale;
    setLocale();
    document.getElementById("mainDateFormat").value = L.defaultDateFormat;
    document.getElementById("mainTimeFormat").value = L.defaultTimeFormat;
  }

  setTzOptions();
  localizeText();
  showIfUpdateAvailable();
  gotoTab( 1 );
}

function settingsClosing(event) {
  if ( event.closeAction == event.Action.commit ) {
    CheckAndSet( "mainDateFormat" );
    CheckAndSet( "mainTimeFormat" );
    CheckAndSet( "tzLabel" );
    CheckAndSet( "tzName" );
    CheckAndSet( "locale" );
    CheckAndSet( "swaplabels" );

    var elements = [ 'gDate', 'gTime', 'gLabel' ];
    for ( var el in elements ) {
      var base = elements[el];
      CheckAndSet( base+"fontfamily" );
      CheckAndSet( base+"fontsize" );
      CheckAndSet( base+"fontcolor" );
    }
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

function getFontColor() {
  var decimalColor = dlgHelper.ChooseColorDlg();

  document.getElementById('fontColor').style.backgroundColor = decimalColor;
}

function createFontColorSelect( id ) {
  var colors = getMicrosoftColors();
  var out = '';
  for ( var c in colors ) {
    var display_color = colors[c];
    var background_color = 'Black';
//    if ( display_color == 'White' ) display_color = 'Black';
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
  var newestText = getHttpAsText( 'http://prestonhunt.com/m/2009/prestosidebarclock.version?cacheBuster=' + Math.random() );
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
