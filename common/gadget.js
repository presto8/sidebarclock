/*
 * Non-localized javascript
 */

var isDirty = true;

function readSetting( settingName, defaultValue ) {
  var val = System.Gadget.Settings.read( settingName );
  if ( val !== "" ) return val;
  return defaultValue;
}

function readSettings() {
  System.Gadget.background = "images/background-black.png";

  document.mainDateFormat = readSetting( "mainDateFormat", defaultDateFormat );
  document.mainTimeFormat = readSetting( "mainTimeFormat", defaultTimeFormat );
  document.tzLabel = readSetting( "tzLabel", "" );
  document.tzName = readSetting( "tzName", "" );

  displayGadget();
}

function loadTimeZones() {
	var _tz = fleegix.date.timezone;
	_tz.loadingScheme = _tz.loadingSchemes.MANUAL_LOAD;
	for (var z in tzdata2007k.zones) {
		_tz.zones[z] = tzdata2007k.zones[z];
	}
	for (var r in tzdata2007k.rules) {
		_tz.rules[r] = tzdata2007k.rules[r];
	}
}

function startup() {
  System.Gadget.settingsUI = "settings.html";
  System.Gadget.onSettingsClosed = readSettings;
  System.Gadget.visibilityChanged = checkVisibility;

  loadTimeZones();

  readSettings();
  window.setInterval(updateGadget, 1000);

	sunriseTest();
}

function sunriseTest() {
var lat = 21.3;
var lon = 157.85;
var gmt = -10;
var jd = calcJD( 2008, 2, 11 );
var sunriseUTC = calcSunriseUTC( jd, lat, lon );
var sunsetUTC = calcSunsetUTC( jd, lat, lon );

var h = sunriseUTC + gmt*60;
var i = sunsetUTC + gmt*60;

document.sunrise.innerHTML = timeStringDate(h,jd);
}

function updateGadget() {
  if ( ! System.Gadget.visible ) {
    isDirty = true;
  } else {
    displayGadget();
    isDirty = false;
  }
}

function checkVisibility() {
  // See http://blogs.msdn.com/sidebar/archive/2006/08/18/706495.aspx
  if ( System.Gadget.visible && isDirty ) {
    updateGadget();
  }
}

function displayGadget() {
  var now = new Date();

  var dateArea = document.getElementById( "dateArea" );
  var timeArea = document.getElementById( "timeArea" );
  var bottomArea = document.getElementById( "bottomArea" );

  bottomArea.innerText = document.tzLabel;

  if ( document.tzName.length > 0 ) {
    var utc = now.getTime() + now.getTimezoneOffset()*60*1000;
    var utcDate = new Date( utc );
    var tzInfo = fleegix.date.timezone.getTzInfo( utcDate, document.tzName );
    var otherOffset = tzInfo.tzOffset;
    var otherTime = utc - otherOffset*60*1000;

    now = new Date( otherTime );
  }

  dateArea.innerHTML = '<a href="http://www.timeanddate.com/calendar/">' + formatDate( document.mainDateFormat, now ) + '</a>';
  timeArea.innerHTML = '<a href="http://www.timeanddate.com/worldclock/">' + formatDate( document.mainTimeFormat, now ) + '</a>';

  autoDateSize( dateArea );
  autoTimeSize( timeArea, bottomArea );
}

function autoDateSize( dateArea ) {
  var maxSize = 18;
  var dateLen = dateArea.innerText.length;

  if ( dateLen > maxSize ) {
    dateArea.style.fontSize = '0.9em';
  } else {
    dateArea.style.fontSize = '1.1em';
  }
}

function autoTimeSize( timeArea, bottomArea ) {
  var maxSize = 11;     // Maximum time ~ 11 characters (10:02:29 AM)
  var minSize = 5;      // Minimum time ~ 4-5 characters (2302) or (23:02)
  var timeLen = timeArea.innerText.length;
  var minEl = 2.0;
  var maxEl = 4.0;

  if ( timeLen < minSize ) timeLen = minSize;
  var size = 2.0 * maxSize / timeLen;

  if ( size < minEl ) size = minEl;
  if ( size > maxEl ) size = maxEl;

  if ( bottomArea.innerText.length > 0 ) {
    if ( size > (maxEl-1.2) ) size = maxEl-1.2;
    timeArea.style.lineHeight = '40px';
  } else {
    timeArea.style.lineHeight = '50px';
  }

  timeArea.style.fontSize = size + 'em';
}

function CheckAndSet( variablename ) {
  var varEl = document.getElementById( variablename );
  var varVal = varEl.value;
  System.Gadget.Settings.write( variablename, varVal );
}

function addOptions() {
  loadTimeZones();

  var zones = fleegix.date.timezone.getAllZones();
  var selectId = document.getElementById( "tzName" );

  for ( var z in zones ) {
	  if ( zones[z].search(/gmt/i) == -1 ) {
			selectId.add( new Option( zones[z], zones[z] ) );
		}
  } 
}


function init_settings() {
  System.Gadget.onSettingsClosing = SettingsClosing;

  document.getElementById("mainDateFormat").value = readSetting( "mainDateFormat", "D M d" );
  document.getElementById("mainTimeFormat").value = readSetting( "mainTimeFormat", "h:i a" );
  document.getElementById("tzLabel").value = readSetting( "tzLabel", "" );
  
  addOptions();
  document.getElementById("tzName").value = readSetting( "tzName", "" );
}

function SettingsClosing(event) {
  if (event.closeAction == event.Action.commit) {
    CheckAndSet( "mainDateFormat" );
    CheckAndSet( "mainTimeFormat" );
    CheckAndSet( "tzLabel" );
    CheckAndSet( "tzName" );
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

  for (var i = 0; i < sNames.length; i++) {
    document.write( sNames[i] );
   // font names are in sNames[i]
  }
}
