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

  start_utc = datetime.now( utc )
  stop_utc = start_utc + timedelta(days=+10*365)
  step = timedelta(hours=+1)

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

zones = {}
for tz in pytz.common_timezones:
  if tz.startswith('US/'): continue
  if tz.startswith('Canada/'): continue
  zones[ fixTzName(tz) ] = tz
zones['Asia/New Delhi'] = 'Asia/Calcutta'

output = []
for label in sorted( zones.keys() ):
  output.append( findDSTRules(zones[label], label) )

print "var tzdata = { "
print ",\n".join( output )
print "};"
