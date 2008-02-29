#!/usr/bin/env python
# vim: ts=2 et

from datetime import datetime, timedelta
from time import mktime
import pytz

def timedeltaToMinutes(td):
  day = td.days
  minutes = td.seconds/60
  if day < 0: return -(60*24 - minutes)
  return minutes

def findDSTRules(tzname):
  utc = pytz.utc
  tz = pytz.timezone(tzname)

  print '"%s":{' % (tzname),

  start_utc = datetime( 2008, 1, 1, 0, 0, 0, tzinfo=utc )
  stop_utc = datetime( 2018, 1, 1, 0, 0, 0, tzinfo=utc )
  step = timedelta(hours=+1)

  d = start_utc
  prevOffset = None
  while d <= stop_utc:
    offset = d.astimezone(tz).utcoffset()
    if offset != prevOffset:
      if prevOffset: print ",",
      unixtime = int(mktime(d.timetuple()))
      print "%d:%d" % (unixtime, timedeltaToMinutes(offset)),
      prevOffset = offset
    d = d + step
  print "},"

print "var tzdata2007k = { "
for tz in pytz.common_timezones:
  #if tz.startswith('America/New_York'):
  findDSTRules(tz)
print "};"
