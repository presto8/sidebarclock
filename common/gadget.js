/*
 * Non-localized javascript
 * vim: ts=2 et
 */

var isDirty = true;

var mainDateFormat = null;
var mainTimeFormat = null;
var tzLabel = null;
var tzName = null;
var locale = 'en';
var L = null;

function readSetting( settingName ) {
  return System.Gadget.Settings.read( settingName );
}

function setLocale() {
  if ( locale === '' ) locale = 'en';
	L = translations[locale];
}

function readSettings() {
  System.Gadget.background = "images/background-black.png";

  mainDateFormat = readSetting( "mainDateFormat" );
  mainTimeFormat = readSetting( "mainTimeFormat" );
  tzLabel = readSetting( "tzLabel" );
  tzName = readSetting( "tzName" );
  locale = readSetting( "locale" );

  setLocale();
//	document.tzOffsets = readSetting( "tzOffsets" );
}

function setDefaults() {
  var lang = getSystemLanguage();
  setLocale(lang);
  
  System.Gadget.Settings.write( "mainDateFormat", L.defaultDateFormat );
  System.Gadget.Settings.write( "mainTimeFormat", L.defaultTimeFormat );
  System.Gadget.Settings.write( "locale", lang );
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

  window.bottomArea.innerText = tzLabel;

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

  window.dateArea.innerHTML = '<a href="http://www.timeanddate.com/calendar/">' + formatDate( mainDateFormat, now ) + '</a>';
  window.timeArea.innerHTML = '<a href="http://www.timeanddate.com/worldclock/">' + formatDate( mainTimeFormat, now ) + '</a>';

  adjustHeights();
  adjustDateFont();
  adjustTimeToFit();

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

function adjustTimeToFit() {
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
  window.timeArea.style.paddingTop = whiteSpace/2;
  window.timeArea.style.lineHeight = 1.0;
}

function getProperTimeHeight() {
  if ( window.timeArea.className == 'bigTime' ) return 67;
  if ( window.timeArea.className == 'smallTime' ) return 33;
  return 45;
}

function adjustHeights() {
  var dateLen = window.dateArea.innerText.length;
  var bottomLen = window.bottomArea.innerText.length;

  window.dateArea.style.display = dateLen ? 'block' : 'none';
  window.bottomArea.style.display = bottomLen ? 'block' : 'none';

  if ( dateLen === 0 && bottomLen === 0 ) {
    window.timeArea.className = 'bigTime';
  } else if ( dateLen > 0 && bottomLen > 0 ) {
    window.timeArea.className = 'smallTime';
  } else {
    window.timeArea.className = 'normalTime';
  }
}

function adjustDateFont() {
  var width = window.timeArea.offsetWidth;
  var maxLen = 18;
  var dateLen = window.dateArea.innerText.length;

  window.dateArea.className = (dateLen > maxLen) ? 'smallDate' : 'normalDate';
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
}

function settingsClosing(event) {
  if ( event.closeAction == event.Action.commit ) {
    CheckAndSet( "mainDateFormat" );
    CheckAndSet( "mainTimeFormat" );
    CheckAndSet( "tzLabel" );
    CheckAndSet( "tzName" );
    CheckAndSet( "locale" );

//		var tzName = document.getElementById('tzName').value;
//    var tzOffsets = tzdata2007k[ tzName ];
//		System.Gadget.Settings.write( 'tzOffsets', tzOffsets );
  }

  event.cancel = false;
}

function getSystemFontsList() {
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

/*
  for (var i = 0; i < sNames.length; i++) {
    document.write( sNames[i] );
   // font names are in sNames[i]
  }
*/
}
