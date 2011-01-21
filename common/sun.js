// SunriseSunset Class
//   By Preston Hunt <me@prestonhunt.com>
//
//   Implementation of http://williams.best.vwh.net/sunrise_sunset_algorithm.htm
//
//   Provides sunrise and sunset times for specified date and position.
//   All dates are UTC.  Year is 4-digit.  Month is 1-12.  Day is 1-31.
//   Longitude is positive for east, negative for west.
//
//   Sample usage:
//   var tokyo = new SunriseSunset( 2011, 1, 19, 35+40/60, 139+45/60); 
//   tokyo.sunriseUtcHours()      --> 21.8199 = 21:49 GMT
//   tokyo.sunsetUtcHours()       --> 7.9070  = 07:54 GMT
//   tokyo.sunriseLocalHours(9)   --> 6.8199  = 06:49 at GMT+9
//   tokyo.sunsunsetLocalHours(9) --> 16.9070 = 16:54 at GMT+9
//
//   var losangeles = new SunriseSunset( 2011, 1, 19, 34.05, -118.233333333 );

function SunriseSunset( utcFullYear, utcMonth, utcDay, latitude, longitude ) {
    this.zenith = 90 + 50/60; //   offical      = 90 degrees 50'
                              //   civil        = 96 degrees
                              //   nautical     = 102 degrees
                              //   astronomical = 108 degrees

    this.utcFullYear = utcFullYear;
    this.utcMonth = utcMonth;
    this.utcDay = utcDay;
    this.latitude = latitude;
    this.longitude = longitude;

    this.rising = true; // set to true for sunrise, false for sunset
    this.lngHour = this.longitude / 15;

    this.sin = function( deg ) { return Math.sin( deg * Math.PI / 180 ); };
    this.cos = function( deg ) { return Math.cos( deg * Math.PI / 180 ); };
    this.tan = function( deg ) { return Math.tan( deg * Math.PI / 180 ); };
    this.asin = function( x ) { return (180/Math.PI) * Math.asin(x); };
    this.acos = function( x ) { return (180/Math.PI) * Math.acos(x); };
    this.atan = function( x ) { return (180/Math.PI) * Math.atan(x); };

    this.getDOY = function() {
        var month = this.utcMonth;
        var year = this.utcFullYear;
        var day = this.utcDay;

        var N1 = Math.floor( 275 * month / 9 );
        var N2 = Math.floor( (month + 9) / 12 );
        var N3 = (1 + Math.floor((year - 4 * Math.floor(year / 4 ) + 2) / 3));
        var N = N1 - (N2 * N3) + day - 30;
        return N;
    };

    this.approximateTime = function() {
        var doy = this.getDOY();
        if ( this.rising ) {
            return doy + ((6 - this.lngHour) / 24);
        } else {
            return doy + ((18 - this.lngHour) / 24);
        }
    };

    this.meanAnomaly = function() {
        var t = this.approximateTime();
        return (0.9856 * t) - 3.289;
    };

    this.trueLongitude = function() {
        var M = this.meanAnomaly();
        var L = M + (1.916 * this.sin(M)) + (0.020 * this.sin(2 * M)) + 282.634;
        return L % 360;
    };

    this.rightAscension = function() {
        var L = this.trueLongitude();
        var RA = this.atan(0.91764 * this.tan(L));
        RA %= 360;

        var Lquadrant  = (Math.floor( L/90)) * 90;
        var RAquadrant = (Math.floor(RA/90)) * 90;
        RA = RA + (Lquadrant - RAquadrant);
        RA /= 15;

        return RA;
    };

    this.sinDec = function() {
        var L = this.trueLongitude();
        var sinDec = 0.39782 * this.sin(L);
        return sinDec;
    };

    this.cosDec = function() {
        return this.cos(this.asin(this.sinDec()));
    };

    this.localMeanTime = function() {
        var cosH = (this.cos(this.zenith) - (this.sinDec() * this.sin(this.latitude))) 
            / (this.cosDec() * this.cos(this.latitude));

        if (cosH >  1) {
            return "the sun never rises on this location (on the specified date)";
        } else if (cosH < -1) {
            return "the sun never sets on this location (on the specified date)";
        } else {
            var H = this.rising ? 360 - this.acos(cosH) : this.acos(cosH);
            H /= 15;
            var RA = this.rightAscension();
            var t = this.approximateTime();
            var T = H + RA - (0.06571 * t) - 6.622;
            return T;
        }
    };

    this.UTCTime = function() {
        var T = this.localMeanTime();
        var UT = T - this.lngHour;
        return UT % 24;
    };

    this.sunriseUtcHours = function() {
        this.rising = true;
        return this.UTCTime();
    };

    this.sunsetUtcHours = function() {
        this.rising = false;
        return this.UTCTime();
    };

    this.hoursRange = function( h ) {
        if ( h >= 24 ) {
            return h - 24;
        } else if ( h < 0 ) {
            return h + 24;
        } else {
            return h;
        }
    };

    this.sunriseLocalHours = function(gmt) {
        return this.hoursRange( gmt + this.sunriseUtcHours() );
    };

    this.sunsetLocalHours = function(gmt) {
        return this.hoursRange( gmt + this.sunsetUtcHours() );
    };
}

//Los Angeles
//x = new SunriseSunset( new Date(), 34.05, -118.233333333 );

//Tokyo
//x = new SunriseSunset( 2011, 1, 19, 35+40/60, 139+45/60);
