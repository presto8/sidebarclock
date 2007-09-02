/*
 * Non-localized javascript
 */

var isDirty = true

function readSetting( settingName, defaultValue ) {
  var val = System.Gadget.Settings.read( settingName )
  if ( val != "" ) return val
  return defaultValue
}

function readSettings() {
  System.Gadget.background = "images/background-black.png"

  document.mainDateFormat = readSetting( "mainDateFormat", defaultDateFormat )
  document.mainTimeFormat = readSetting( "mainTimeFormat", defaultTimeFormat )
  document.tzLabel = readSetting( "tzLabel", "" )
  document.tzName = readSetting( "tzName", "" )

  displayGadget()
}

function loadTimeZones() {
  fleegix.date.timezone.loadZoneInfo( zones_json, rules_json )
}

function startup() {
  System.Gadget.settingsUI = "settings.html"
  System.Gadget.onSettingsClosed = readSettings
  System.Gadget.visibilityChanged = checkVisibility

  loadTimeZones()

  readSettings()
  window.setInterval(updateGadget, 1000)
}

function updateGadget() {
  if ( ! System.Gadget.visible ) {
    isDirty = true
  } else {
    displayGadget()
    isDirty = false
  }
}

function checkVisibility() {
  // See http://blogs.msdn.com/sidebar/archive/2006/08/18/706495.aspx
  if ( System.Gadget.visible && isDirty ) {
    updateGadget()
  }
}

function displayGadget() {
  var now = new Date()

  var dateArea = document.getElementById( "dateArea" )
  var timeArea = document.getElementById( "timeArea" )
  var bottomArea = document.getElementById( "bottomArea" )

  bottomArea.innerText = document.tzLabel

  if ( document.tzName.length > 0 ) {
    var utc = now.getTime() + now.getTimezoneOffset()*60*1000
    var utcDate = new Date( utc )
    var otherOffset = fleegix.date.timezone.getOffset( utcDate, document.tzName )
    var otherTime = utc - otherOffset*60*1000

    now = new Date( otherTime )
  }

  dateArea.innerHTML = '<a href="http://www.timeanddate.com/calendar/">' + formatDate( document.mainDateFormat, now ) + '</a>'
  timeArea.innerHTML = '<a href="http://www.timeanddate.com/worldclock/">' + formatDate( document.mainTimeFormat, now ) + '</a>'

  autoDateSize( dateArea )
  autoTimeSize( timeArea, bottomArea )
}

function autoDateSize( dateArea ) {
  var maxSize = 18
  var dateLen = dateArea.innerText.length

  if ( dateLen > maxSize ) {
    dateArea.style.fontSize = '0.9em'
  } else {
    dateArea.style.fontSize = '1.1em'
  }
}

function autoTimeSize( timeArea, bottomArea ) {
  var maxSize = 11     // Maximum time ~ 11 characters (10:02:29 AM)
  var minSize = 5      // Minimum time ~ 4-5 characters (2302) or (23:02)
  var timeLen = timeArea.innerText.length
  var minEl = 2.0
  var maxEl = 4.0

  if ( timeLen < minSize ) timeLen = minSize
  var size = 2.0 * maxSize / timeLen

  if ( size < minEl ) size = minEl
  if ( size > maxEl ) size = maxEl 

  if ( bottomArea.innerText.length > 0 ) {
    if ( size > (maxEl-1.2) ) size = maxEl-1.2
    timeArea.style.lineHeight = '40px'
  } else {
    timeArea.style.lineHeight = '50px'
  }

  timeArea.style.fontSize = size + 'em'
}

function CheckAndSet( variablename ) {
  var varEl = document.getElementById( variablename )
  var varVal = varEl.value
  System.Gadget.Settings.write( variablename, varVal )
}

function addOptions() {
  loadTimeZones()

  var zones = fleegix.date.timezone.getAllZones()
  var selectId = document.getElementById( "tzName" )

  for ( var z in zones ) {
    selectId.add( new Option( zones[z], zones[z] ) )
  } 
}


function init_settings() {
  System.Gadget.onSettingsClosing = SettingsClosing;

  document.getElementById("mainDateFormat").value = readSetting( "mainDateFormat", "D M d" );
  document.getElementById("mainTimeFormat").value = readSetting( "mainTimeFormat", "h:i a" );
  document.getElementById("tzLabel").value = readSetting( "tzLabel", "" )
  
  addOptions()
  document.getElementById("tzName").value = readSetting( "tzName", "" )
}

function SettingsClosing(event) {
  if (event.closeAction == event.Action.commit) {
    CheckAndSet( "mainDateFormat" )
    CheckAndSet( "mainTimeFormat" )
    CheckAndSet( "tzLabel" )
    CheckAndSet( "tzName" )
  }
		
  event.cancel = false;
}
