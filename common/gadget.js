/*
 * Non-localized javascript
 * vim: ts=2 et nospell
 */

var isDirty = true;

var mainDateFormat = null;
var mainTimeFormat = null;
var tzLabel = null;
var tzName = null;
var fontFamily = null;
var locale = 'en';
var L = null;

var gTime = null;
var gDate = null;
var gLabel = null;

function readSetting( settingName ) {
  return System.Gadget.Settings.read( settingName );
}

function setLocale() {
  if ( locale === '' ) locale = 'en';
	L = translations[locale];
}

function readSettings() {
  mainDateFormat = readSetting( "mainDateFormat" );
  mainTimeFormat = readSetting( "mainTimeFormat" );
  tzLabel = readSetting( "tzLabel" );
  tzName = readSetting( "tzName" );
  locale = readSetting( "locale" );
  fontFamily = readSetting( "fontFamily" );

  setLocale();
//	document.tzOffsets = readSetting( "tzOffsets" );
}

function setDefaults() {
  var lang = getSystemLanguage();
  setLocale(lang);
  
  System.Gadget.Settings.write( "mainDateFormat", L.defaultDateFormat );
  System.Gadget.Settings.write( "mainTimeFormat", L.defaultTimeFormat );
  System.Gadget.Settings.write( "locale", lang );
  System.Gadget.Settings.write( "fontFamily", "Segoe UI" );
  System.Gadget.Settings.write( "fontColor", "16777215" );
}

function startup() {
  System.Gadget.settingsUI = "settings.html";
  System.Gadget.onSettingsClosed = readSettings;
  System.Gadget.visibilityChanged = checkVisibility;

  readSettings();

	if ( ! mainTimeFormat ) {
		setDefaults();
		readSettings();
	}

  var background = document.getElementById('imgBackground');
  background.src = 'images/background-black.png';

  gDate = background.addTextObject("", "Segoe UI", 11, "white", 0, 0 );
  gTime = background.addTextObject("", "Segoe UI", 12, "white", 0, 0 );
  gLabel = background.addTextObject("", "Segoe UI", 11, "white", 0, 0 );

  updateGadget();
}

function changeColor( lat, lon, gmt ) {
  return;
/*
  var now = new Date();

  var jd = calcJD( now.getFullYear(), 1+now.getMonth(), now.getDate() );
  var sunriseUTC = calcSunriseUTC( jd, lat, lon );
  var sunsetUTC = calcSunsetUTC( jd, lat, lon );

  var h = sunriseUTC + gmt*60;
  var i = sunsetUTC + gmt*60;

  var dateArea = document.getElementById( "dateArea" );
  var sunrise = timeStringDate(h,jd);
  var sunset = timeStringDate(i,jd);

  dateArea.innerHTML = sunrise + " " + sunset;
*/
}

function updateGadget() {
  if ( ! System.Gadget.visible ) {
    isDirty = true;
  } else {
    displayGadget();
    isDirty = false;
    window.setTimeout(updateGadget, 1000);
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
  var tzOffsets = tzdata2007k[ tzName ];
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

  gLabel.opacity = tzLabel ? 100 : 0; // this has to be done BEFORE changing the text!
  gLabel.value = tzLabel;
  gLabel.width = gLabel.height = 0; // force recalculation of width

  if ( tzName.length > 0 ) {
    try {
      var utc = now.getTime() + gmtOffset*60*1000;
			var utcEpoch = Math.round(utc/1000.0);
      var otherOffset = getOffsetInMinutes( tzName, utcEpoch );
      var otherTime = utc + otherOffset*60*1000;

      now = new Date( otherTime );
      gmtOffset = otherOffset;
    } catch(err) {
      tzName = '';
      // no tzdata for this entry, clear it away
    }
  }

// window.dateArea.innerHTML = '<a href="http://www.timeanddate.com/calendar/">' + formatDate( mainDateFormat, now ) + '</a>';
//  gTime.value = '<a href="http://www.timeanddate.com/worldclock/">' + formatDate( mainTimeFormat, now ) + '</a>';

  gDate.opacity = mainDateFormat ? 100 : 0;
  gDate.value = mainDateFormat ? formatDate( mainDateFormat, now ) : '';
  gDate.height = gDate.width = 0;

  gTime.value = formatDate( mainTimeFormat, now );

  updateFonts();
  adjustTimeToFit();
  adjustPositions();

  var okToUpdate = now.getMinutes() % 15;

  if ( okToUpdate && tzName.length ) {
    var coords = latlon[ tzName ];
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

  // Adjust tops
  gDate.top = 5;
  gLabel.top = 47;

  // Now the trickiest to adjust, the time position
  // Start off directly in the middle
  gTime.top = ( maxHeight - gTime.height ) / 2;

  if ( gDate.value.length && ! gLabel.value.length ) {
    // Adjust down if there is date only
    gTime.top += ( gDate.height - 5 ) / 2;
  } else if ( ! gDate.value.length && gLabel.value.length ) {
    // Adjust up if there is label only
    gTime.top -= ( gLabel.height - 5 ) / 2;
  }
}

function adjustTimeToFit() {
  var maxWidth = 130;
  var maxHeight = getProperTimeHeight();

//  gLabel.value = gTime.fontsize * maxWidth / gTime.width;
//gLabel.value = maxHeight;
//  gLabel.opacity = 100;

  var newFontSize = Math.floor( gTime.fontSize * maxWidth / gTime.width );
  gTime.fontsize = newFontSize;

  if ( gTime.height > maxHeight ) {
    gTime.fontsize *= maxHeight / gTime.height;
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

  //if ( window.timeArea.className == 'bigTime' ) return 67;
  //if ( window.timeArea.className == 'smallTime' ) return 33;
  //return 44; // was 45
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
  var varVal = varEl.value;
  System.Gadget.Settings.write( variablename, varVal );
}

function setTzOptions() {
  var selectId = document.getElementById( "tzName" );
	var zones = tzdata2007k;

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
  if ( ! tzdata2007k[lang] ) return 'en';
  return lang;
}

function init_settings() {
  System.Gadget.onSettingsClosing = settingsClosing;

  document.getElementById("mainDateFormat").value = readSetting( "mainDateFormat" );
  document.getElementById("mainTimeFormat").value = readSetting( "mainTimeFormat" );
  document.getElementById("tzLabel").value = readSetting( "tzLabel" );
  locale = document.getElementById("locale").value = readSetting( "locale" );

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
    locale = newlocale;
    setLocale();
    document.getElementById("mainDateFormat").value = L.defaultDateFormat;
    document.getElementById("mainTimeFormat").value = L.defaultTimeFormat;
  }

  setTzOptions();
	localizeText();

  document.getElementById('fontList').innerHTML = createFontSelect();
  document.getElementById('fontFamily').value = readSetting('fontFamily');
}

function settingsClosing(event) {
  if ( event.closeAction == event.Action.commit ) {
    CheckAndSet( "mainDateFormat" );
    CheckAndSet( "mainTimeFormat" );
    CheckAndSet( "tzLabel" );
    CheckAndSet( "tzName" );
    CheckAndSet( "locale" );
    CheckAndSet( "fontFamily" );
    CheckAndSet( "fontColor" );

//		var tzName = document.getElementById('tzName').value;
//    var tzOffsets = tzdata2007k[ tzName ];
//		System.Gadget.Settings.write( 'tzOffsets', tzOffsets );
  }

  event.cancel = false;
}

function updateFonts() {
  if ( ! gTime ) return;
  if ( gTime.font == fontFamily ) return;

  gDate.font = gTime.font = gLabel.font = fontFamily;
}

function getSystemFontsList() {
 // http://msdn.microsoft.com/en-us/library/ms537454.aspx

  var fontNames = new Array();

  for (var i=1; i < dlgHelper.fonts.count; i++) {
    fontNames.push( dlgHelper.fonts(i) );
  }
 
 return fontNames.sort();
}

function createFontSelect() {
  var values = createSelectOptions( getSystemFontsList() );
  return '<select id=fontFamily>' + values + '</select>';
}

function createSelectOptions( values ) {
  var out = null;

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


/*
function oldgetSystemFontsList() {
  // http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=1959226&SiteID=1
  var HKLM = 2147483650;
  var rPath = "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts\\";
  var rValue;

  // connect to the registry
  var oSwbem = new ActiveXObject("WbemScripting.SwbemLocator");
  var oSvc = oSwbem.ConnectServer(null, "root\\default");
  var oReg = oSvc.Get("StdRegProv");

  // enumerate the values 
  var oMethod = oReg.Methods_.Item("EnumValues");
  var oInParam = oMethod.InParameters.SpawnInstance_();
  oInParam.hDefKey = HKLM;
  oInParam.sSubKeyName = rPath;
  var oOutParam = oReg.ExecMethod_(oMethod.Name, oInParam);

  // get the values into an array
  var sNames = oOutParam.sNames.toArray();

  return sNames;

//  for (var i = 0; i < sNames.length; i++) {
//    document.write( sNames[i] );
//   // font names are in sNames[i]
//  }
}
*/


