#!/usr/bin/env python
# vim: ts=2 et

from datetime import datetime, timedelta
from time import mktime
from calendar import timegm
import pytz, re

def timedeltaToMinutes(td):
  day = td.days
  minutes = td.seconds/60
  if day < 0: return -(60*24 - minutes)
  return minutes

def fixTzName(tzname):
  tzname = re.sub( 'Indian/', 'Indian Ocean/', tzname )
  tzname = re.sub( '_', ' ', tzname )
  return tzname

def findDSTRules( tzname, label ):
  utc = pytz.utc
  tz = pytz.timezone(tzname)

  out_str = ''
  out_str += '"%s":{' % (label)

  start_utc = datetime.now( utc ).replace( minute=0, second=0, microsecond=0 )
  stop_utc = start_utc + timedelta(days=+10*365)
#  step = timedelta(hours=+1)
  step = timedelta( minutes=+15 )

  d = start_utc
  prevOffset = None
  while d <= stop_utc:
    offset = d.astimezone(tz).utcoffset()
    if offset != prevOffset:
      if prevOffset != None: out_str += ","
      unixtime = int(timegm(d.timetuple()))
      out_str += "%d:%d" % (unixtime, timedeltaToMinutes(offset))
      prevOffset = offset
    d = d + step
  out_str += "}"

  return out_str

def formatGMTRules( gmtOffset ):
  offsetMinutes = gmtOffset * 60
  if gmtOffset >= 0:
    label = "GMT+%02d" % gmtOffset
  else:
    label = "GMT%03d" % gmtOffset
  unixtime = 0

  out_str = ''
  out_str += '"%s":{' % (label)
  out_str += "%d:%d" % (unixtime, offsetMinutes)
  out_str += "}"

  return out_str

zones = {}
for tz in pytz.common_timezones:
  if tz.startswith('US/'): continue
  if tz.startswith('Canada/'): continue
  zones[ fixTzName(tz) ] = tz
zones['Asia/New Delhi'] = 'Asia/Calcutta'

output = []
for label in sorted( zones.keys() ):
  if label == 'GMT':
    before_gmt_output = output
    output = []
  else:
    output.append( findDSTRules(zones[label], label) )

for gmt in range(-12,13):
  before_gmt_output.append( formatGMTRules(gmt) )

combined = before_gmt_output + output

print "var tzdata = { "
print ",\n".join( combined )
print "};"
