/*
 * Non-localized javascript
 */

var isDirty = true;

function readSetting( settingName ) {
  return System.Gadget.Settings.read( settingName );
}

function readSettings() {
  System.Gadget.background = "images/background-black.png";

  document.mainDateFormat = readSetting( "mainDateFormat" );
  document.mainTimeFormat = readSetting( "mainTimeFormat" );
  document.tzLabel = readSetting( "tzLabel" );
  document.tzName = readSetting( "tzName" );
	document.tzOffsets = readSetting( "tzOffsets" );
}

function setDefaults() {
  System.Gadget.Settings.write( "mainDateFormat", defaultDateFormat );
  System.Gadget.Settings.write( "mainTimeFormat", defaultTimeFormat );
}

function startup() {
  System.Gadget.settingsUI = "settings.html";
  System.Gadget.onSettingsClosed = readSettings;
  System.Gadget.visibilityChanged = checkVisibility;

  readSettings();

	if ( ! document.mainTimeFormat ) {
		setDefaults();
	}

  updateGadget();
}

function changeColor( lat, lon, gmt ) {
  return;
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

  var dateArea = document.getElementById( "dateArea" );
  var timeArea = document.getElementById( "timeArea" );
  var bottomArea = document.getElementById( "bottomArea" );

  bottomArea.innerText = document.tzLabel;

  if ( document.tzName.length > 0 ) {
    try {
      var utc = now.getTime() + gmtOffset*60*1000;
			var utcEpoch = Math.round(utc/1000.0);
      var otherOffset = getOffsetInMinutes( document.tzName, utcEpoch );
      var otherTime = utc - otherOffset*60*1000;

      now = new Date( otherTime );
      gmtOffset = otherOffset;
    } catch(err) {
      document.tzName = '';
      // no tzdata for this entry, clear it away
    }
  }

  dateArea.innerHTML = '<a href="http://www.timeanddate.com/calendar/">' + formatDate( document.mainDateFormat, now ) + '</a>';
  timeArea.innerHTML = '<a href="http://www.timeanddate.com/worldclock/">' + formatDate( document.mainTimeFormat, now ) + '</a>';

  autoDateSize( dateArea );
  autoTimeSize( timeArea, bottomArea );

  var okToUpdate = now.getMinutes() % 15;

  if ( okToUpdate && document.tzName.length ) {
    var coords = latlon[ document.tzName ]
    if ( coords ) {
      var lat = coords[0];
      var lon = -coords[1];
      changeColor( lat, lon, -gmtOffset/60 );
    }
  }
}

function autoDateSize( dateArea ) {
  var maxSize = 18;
  var dateLen = dateArea.innerText.length;

  if ( dateLen === 0 ) {
    timeArea.style.top = '6px';
  } else if ( dateLen > maxSize ) {
    timeArea.style.top = '12px';
    dateArea.style.fontSize = '0.9em';
  } else {
    timeArea.style.top = '12px';
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
  var selectId = document.getElementById( "tzName" );
	var zones = tzdata2007k;
  for ( var z in zones ) {
		selectId.add( new Option( z, z ) );
  } 
}

function init_settings() {
  System.Gadget.onSettingsClosing = settingsClosing;

  document.getElementById("mainDateFormat").value = readSetting( "mainDateFormat" );
  document.getElementById("mainTimeFormat").value = readSetting( "mainTimeFormat" );
  document.getElementById("tzLabel").value = readSetting( "tzLabel" );
  
  addOptions();
  document.getElementById("tzName").value = readSetting( "tzName" );
}

function settingsClosing(event) {
  if ( event.closeAction == event.Action.commit ) {
    CheckAndSet( "mainDateFormat" );
    CheckAndSet( "mainTimeFormat" );
    CheckAndSet( "tzLabel" );
    CheckAndSet( "tzName" );

    var tzOffsets = tzdata2007k[ document.tzLabel ];
		System.Gadget.Settings.write( 'tzOffsets', tzOffsets );
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
