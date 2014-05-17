/*
    http://www.JSON.org/json2.js
    2011-01-18

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    "use strict";

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
// formatDate :
// a PHP date like function, for formatting date strings
// authored by Svend Tofte <www.svendtofte.com>
// the code is in the public domain
//
// see http://www.svendtofte.com/code/date_format/
// and http://www.php.net/date
//
// thanks to 
//  - Daniel Berlin <mail@daniel-berlin.de>,
//    major overhaul and improvements
//  - Matt Bannon,
//    correcting some stupid bugs in my days-in-the-months list!
//  - levon ghazaryan. pointing out an error in z switch.
//  - Andy Pemberton. pointing out error in c switch 
//
// input : format string
// time : epoch time (seconds, and optional)
//
// if time is not passed, formatting is based on 
// the current "this" date object's set time.
//
// supported switches are
// a, A, B, c, d, D, F, g, G, h, H, i, I (uppercase i), j, l (lowecase L), 
// L, m, M, n, N, O, P, r, s, S, t, U, w, W, y, Y, z, Z
// J (uppercase)
// 
// unsupported (as compared to date in PHP 5.1.3)
// T, e, o

/*
 * Moved to gadget.html for ease of localization
    var daysLong =    ["Sunday", "Monday", "Tuesday", "Wednesday", 
                       "Thursday", "Friday", "Saturday"];
    var daysShort =   ["Sun", "Mon", "Tue", "Wed", 
                       "Thu", "Fri", "Sat"];
    var monthsShort = ["Jan", "Feb", "Mar", "Apr",
                       "May", "Jun", "Jul", "Aug", "Sep",
                       "Oct", "Nov", "Dec"];
    var monthsLong =  ["January", "February", "March", "April",
                       "May", "June", "July", "August", "September",
                       "October", "November", "December"];
*/

//Date.prototype.formatDate = function (input,time) {
// @param time is a Date() object with the time in the destination time zone,
// but the timezone value is not valid
formatDate = function (input,time,offsetmins) {
    var switches = { // switches object
        
        a : function () {
            // Lowercase Ante meridiem and Post meridiem
            return date.getHours() > 11 ? L.pm : L.am;
            //return date.getHours() > 11? "pm" : "am";
        },
        
        A : function () {
            // Uppercase Ante meridiem and Post meridiem
            return (this.a().toUpperCase ());
        },
    
        B : function (){
            // Swatch internet time. code simply grabbed from ppk,
            // since I was feeling lazy:
            // http://www.xs4all.nl/~ppk/js/beat.html
            //var off = (date.getTimezoneOffset() + 60)*60;
            var off = offsetmins * 60;
            off += 1*60*60; // adjust for UTC+1
            var theSeconds = (date.getHours() * 3600) + 
                             (date.getMinutes() * 60) + 
                              date.getSeconds() + off;
            var beat = Math.floor(theSeconds/86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if ((String(beat)).length == 1) beat = "00"+beat;
            if ((String(beat)).length == 2) beat = "0"+beat;
            return beat;
        },
        
        c : function () {
            // ISO 8601 date (e.g.: "2004-02-12T15:19:21+00:00"), as per
            // http://www.cl.cam.ac.uk/~mgk25/iso-time.html
            return (this.Y() + "-" + this.m() + "-" + this.d() + "T" + 
                    this.H() + ":" + this.i() + ":" + this.s() + this.P());
        },
        
        d : function () {
            // Day of the month, 2 digits with leading zeros
            var j = String(this.j());
            return (j.length == 1 ? "0"+j : j);
        },
        
        D : function () {
            // A textual representation of a day, three letters
            return L.daysShort[date.getDay()];
        },
        
        F : function () {
            // A full textual representation of a month
            return L.monthsLong[date.getMonth()];
        },
        
        g : function () {
            // 12-hour format of an hour without leading zeros
	    if ( date.getHours() == 0 ) return 12;
            return date.getHours() > 12? date.getHours()-12 : date.getHours();
        },
        
        G : function () {
            // 24-hour format of an hour without leading zeros
            return date.getHours();
        },
        
        h : function () {
            // 12-hour format of an hour with leading zeros
            var g = String(this.g());
            return (g.length == 1 ? "0"+g : g);
        },
        
        H : function () {
            // 24-hour format of an hour with leading zeros
            var G = String(this.G());
            return (G.length == 1 ? "0"+G : G);
        },
        
        i : function () {
            // Minutes with leading zeros
            var min = String (date.getMinutes ());
            return (min.length == 1 ? "0" + min : min);
        },
        
        I : function () {
            // Whether or not the date is in daylight saving time (DST)
            // note that this has no bearing in actual DST mechanics,
            // and is just a pure guess. buyer beware.
            var noDST = new Date ("January 1 " + this.Y() + " 00:00:00");
            return (noDST.getTimezoneOffset () == 
                    date.getTimezoneOffset () ? 0 : 1);
        },
        
        j : function () {
            // Day of the month without leading zeros
            return date.getDate();
        },
        
        l : function () {
            // A full textual representation of the day of the week
            return L.daysLong[date.getDay()];
        },
        
        L : function () {
            // leap year or not. 1 if leap year, 0 if not.
            // the logic should match iso's 8601 standard.
            // http://www.uic.edu/depts/accc/software/isodates/leapyear.html
            var Y = this.Y();
            if (         
                (Y % 4 == 0 && Y % 100 != 0) ||
                (Y % 4 == 0 && Y % 100 == 0 && Y % 400 == 0)
                ) {
                return 1;
            } else {
                return 0;
            }
        },
        
        m : function () {
            // Numeric representation of a month, with leading zeros
            var n = String(this.n());
            return (n.length == 1 ? "0"+n : n);
        },
        
        M : function () {
            // A short textual representation of a month, three letters
            return L.monthsShort[date.getMonth()];
        },
        
        n : function () {
            // Numeric representation of a month, without leading zeros
            return date.getMonth()+1;
        },
        
        N : function () {
            // ISO-8601 numeric representation of the day of the week
            var w = this.w();
            return (w == 0 ? 7 : w);
        },
        
        O : function () {
            // Difference to Greenwich time (GMT) in hours
			//var os = Math.abs(date.getTimezoneOffset());
			var os = Math.abs(offsetmins);
			var h = String(Math.floor(os/60));
			var m = String(os%60);
			h.length == 1? h = "0"+h:1;
			m.length == 1? m = "0"+m:1;
			//return date.getTimezoneOffset() < 0 ? "+"+h+m : "-"+h+m;
			return offsetmins < 0 ? "+"+h+m : "-"+h+m;
        },

        Q : function () {
            // Difference to local time zone, with colons
			var localOffset = date.getTimezoneOffset();
			var offset = localOffset - offsetmins;
			var os = Math.abs( offset );
			//var os = Math.abs(date.getTimezoneOffset());
			var h = String(Math.floor(os/60));
			var m = String(os%60);
			h.length == 1? h = "0"+h:1;
			m.length == 1? m = "0"+m:1;
			return offset > 0 ? "+"+h+":"+m : "-"+h+":"+m;
        },
        
        
        P : function () {
            // Difference to GMT, with colon between hours and minutes
            var O = this.O();
            return (O.substr(0, 3) + ":" + O.substr(3, 2));
        },      
        
        r : function () {
            // RFC 822 formatted date
            var r; // result
            //  Thu         ,     21               Dec              2000
            r = this.D() + ", " + this.d() + " " + this.M() + " " + this.Y() +
            //    16          :    01          :    07               0200
            " " + this.H() + ":" + this.i() + ":" + this.s() + " " + this.O();
            return r;
        },

        s : function () {
            // Seconds, with leading zeros
            var sec = String (date.getSeconds ());
            return (sec.length == 1 ? "0" + sec : sec);
        },        
        
        S : function () {
            // English ordinal suffix for the day of the month, 2 characters
            switch (date.getDate ()) {
                case  1: return ("st"); 
                case  2: return ("nd"); 
                case  3: return ("rd");
                case 21: return ("st"); 
                case 22: return ("nd"); 
                case 23: return ("rd");
                case 31: return ("st");
                default: return ("th");
            }
        },
        
        t : function () {
            // thanks to Matt Bannon for some much needed code-fixes here!
            var daysinmonths = [null,31,28,31,30,31,30,31,31,30,31,30,31];
            if (this.L()==1 && this.n()==2) return 29; // ~leap day
            return daysinmonths[this.n()];
        },
        
        U : function () {
            // Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
            return Math.round(date.getTime()/1000);
        },

        V : function () {
            // Intel weeknumber, if it is different from ISO
            return this.W() + 1;
        },
        
        w : function () {
            // Numeric representation of the day of the week
            return date.getDay();
        },
        
        W : function () {
            // Weeknumber, as per ISO specification:
            // http://www.cl.cam.ac.uk/~mgk25/iso-time.html
        
            var DoW = this.N ();
            var DoY = this.z ();

            // If the day is 3 days before New Year's Eve and is Thursday or earlier,
            // it's week 1 of next year.
            var daysToNY = 364 + this.L () - DoY;
            if (daysToNY <= 2 && DoW <= (3 - daysToNY)) {
                return 1;
            }

            // If the day is within 3 days after New Year's Eve and is Friday or later,
            // it belongs to the old year.
            if (DoY <= 2 && DoW >= 5) {
                //return new Date (this.Y () - 1, 11, 31).formatDate ("W");
                //rewriting since we aren't extending the Date prototype
                return formatDate( 'W', new Date (this.Y() - 1, 11, 31), offsetmins );
            }
            
            var nyDoW = new Date (this.Y (), 0, 1).getDay ();
            nyDoW = nyDoW != 0 ? nyDoW - 1 : 6;

            if (nyDoW <= 3) { // First day of the year is a Thursday or earlier
                return (1 + Math.floor ((DoY + nyDoW) / 7));
            } else {  // First day of the year is a Friday or later
                return (1 + Math.floor ((DoY - (7 - nyDoW)) / 7));
            }
        },
        
        y : function () {
            // A two-digit representation of a year
            var y = String(this.Y());
            return y.substring(y.length-2,y.length);
        },        
        
        Y : function () {
            // A full numeric representation of a year, 4 digits
    
            // we first check, if getFullYear is supported. if it
            // is, we just use that. ppks code is nice, but wont
            // work with dates outside 1900-2038, or something like that
            if (date.getFullYear) {
                var newDate = new Date("January 1 2001 00:00:00 +0000");
                var x = newDate .getFullYear();
                if (x == 2001) {              
                    // i trust the method now
                    return date.getFullYear();
                }
            }
            // else, do this:
            // codes thanks to ppk:
            // http://www.xs4all.nl/~ppk/js/introdate.html
            var x = date.getYear();
            var y = x % 100;
            y += (y < 38) ? 2000 : 1900;
            return y;
        },

        
        z : function () {
            // The day of the year, zero indexed! 0 through 366
            // Extremely tricky to calculate
            // First, find current time delta since Jan 1 in GMT only
            var jan1_gmt = new Date( "January 1 " + this.Y() + " 00:00:00 GMT" );
            var now_gmt = new Date();
            var diff = now_gmt - jan1_gmt;

            // Now, apply the timezone offset for the target timezone to the GMT diff
            diff -= offsetmins * 60 * 1000;

            return Math.floor(diff/1000/60/60/24);
        },

        J : function () {
			return this.z() + 1;
			/*
            // Julian date - day of the year, one indexed! 1 through 367
            var t = new Date("January 1 " + this.Y() + " 00:00:00");
            var diff = date.getTime() - t.getTime();
            return 1 + Math.floor(diff/1000/60/60/24);
			*/
        },

        Z : function () {
            // Timezone offset in seconds
            return (date.getTimezoneOffset () * -60);
        }        
    
    }

    function getSwitch(str) {
        if (switches[str] != undefined) {
            return switches[str]();
        } else {
            return str;
        }
    }

    var date;
    if (time) {
        var date = new Date (time);
    } else {
        var date = this;
    }

    var formatString = input.split("");
    var i = 0;
    while (i < formatString.length) {
        if (formatString[i] == "\\") {
            // this is our way of allowing users to escape stuff
            formatString.splice(i,1);
        } else {
            formatString[i] = getSwitch(formatString[i]);
        }
        i++;
    }
    
    return formatString.join("");
}


// Some (not all) predefined format strings from PHP 5.1.1, which 
// offer standard date representations.
// See: http://www.php.net/manual/en/ref.datetime.php#datetime.constants
//

// Atom      "2005-08-15T15:52:01+00:00"
Date.DATE_ATOM    = "Y-m-d\\TH:i:sP";
// ISO-8601  "2005-08-15T15:52:01+0000"
Date.DATE_ISO8601 = "Y-m-d\\TH:i:sO";
// RFC 2822  "Mon, 15 Aug 2005 15:52:01 +0000"
Date.DATE_RFC2822 = "D, d M Y H:i:s O";
// W3C       "2005-08-15T15:52:01+00:00"
Date.DATE_W3C     = "Y-m-d\\TH:i:sP";
var tzdata = { 
"Africa/Abidjan":{1400248800:0},
"Africa/Accra":{1400248800:0},
"Africa/Addis Ababa":{1400248800:-180},
"Africa/Algiers":{1400248800:-60},
"Africa/Asmara":{1400248800:-180},
"Africa/Bamako":{1400248800:0},
"Africa/Bangui":{1400248800:-60},
"Africa/Banjul":{1400248800:0},
"Africa/Bissau":{1400248800:0},
"Africa/Blantyre":{1400248800:-120},
"Africa/Brazzaville":{1400248800:-60},
"Africa/Bujumbura":{1400248800:-120},
"Africa/Cairo":{1400248800:-180,1403992800:-120,1406584800:-180,1411678800:-120,1429826400:-180,1434578400:-120,1437170400:-180,1443128400:-120,1461880800:-180,1465250400:-120,1467842400:-180,1475182800:-120,1493330400:-180,1495836000:-120,1498428000:-180,1506632400:-120,1524780000:-180,1526421600:-120,1529013600:-180,1538082000:-120,1556229600:-180,1557093600:-120,1559685600:-180,1569531600:-120,1590271200:-180,1600981200:-120,1620856800:-180,1633035600:-120,1651528800:-180,1664485200:-120,1682632800:-180,1695934800:-120,1714082400:-180},
"Africa/Casablanca":{1400248800:-60,1404007200:0,1406599200:-60,1414288800:0,1427594400:-60,1434592800:0,1437184800:-60,1445738400:0,1459044000:-60,1465264800:0,1467856800:-60,1477792800:0,1490493600:-60,1495850400:0,1498442400:-60,1509242400:0,1521943200:-60,1526436000:0,1529028000:-60,1540692000:0,1553997600:-60,1557108000:0,1559700000:-60,1572141600:0,1585447200:-60,1587693600:0,1590285600:-60,1603591200:0,1616896800:-60,1618279200:0,1620871200:-60,1635645600:0,1648346400:-60,1648951200:0,1651543200:-60,1667095200:0,1682128800:-60,1698544800:0,1712714400:-60},
"Africa/Ceuta":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Africa/Conakry":{1400248800:0},
"Africa/Dakar":{1400248800:0},
"Africa/Dar es Salaam":{1400248800:-180},
"Africa/Djibouti":{1400248800:-180},
"Africa/Douala":{1400248800:-60},
"Africa/El Aaiun":{1400248800:-60,1404007200:0,1406599200:-60,1414288800:0,1427594400:-60,1434592800:0,1437184800:-60,1445738400:0,1459044000:-60,1465264800:0,1467856800:-60,1477792800:0,1490493600:-60,1495850400:0,1498442400:-60,1509242400:0,1521943200:-60,1526436000:0,1529028000:-60,1540692000:0,1553997600:-60,1557108000:0,1559700000:-60,1572141600:0,1585447200:-60,1587693600:0,1590285600:-60,1603591200:0,1616896800:-60,1618279200:0,1620871200:-60,1635645600:0,1648346400:-60,1648951200:0,1651543200:-60,1667095200:0,1682128800:-60,1698544800:0,1712714400:-60},
"Africa/Freetown":{1400248800:0},
"Africa/Gaborone":{1400248800:-120},
"Africa/Harare":{1400248800:-120},
"Africa/Johannesburg":{1400248800:-120},
"Africa/Juba":{1400248800:-180},
"Africa/Kampala":{1400248800:-180},
"Africa/Khartoum":{1400248800:-180},
"Africa/Kigali":{1400248800:-120},
"Africa/Kinshasa":{1400248800:-60},
"Africa/Lagos":{1400248800:-60},
"Africa/Libreville":{1400248800:-60},
"Africa/Lome":{1400248800:0},
"Africa/Luanda":{1400248800:-60},
"Africa/Lubumbashi":{1400248800:-120},
"Africa/Lusaka":{1400248800:-120},
"Africa/Malabo":{1400248800:-60},
"Africa/Maputo":{1400248800:-120},
"Africa/Maseru":{1400248800:-120},
"Africa/Mbabane":{1400248800:-120},
"Africa/Mogadishu":{1400248800:-180},
"Africa/Monrovia":{1400248800:0},
"Africa/Nairobi":{1400248800:-180},
"Africa/Ndjamena":{1400248800:-60},
"Africa/Niamey":{1400248800:-60},
"Africa/Nouakchott":{1400248800:0},
"Africa/Ouagadougou":{1400248800:0},
"Africa/Porto-Novo":{1400248800:-60},
"Africa/Sao Tome":{1400248800:0},
"Africa/Tripoli":{1400248800:-120},
"Africa/Tunis":{1400248800:-60},
"Africa/Windhoek":{1400248800:-60,1410051600:-120,1428192000:-60,1441501200:-120,1459641600:-60,1472950800:-120,1491091200:-60,1504400400:-120,1522540800:-60,1535850000:-120,1554595200:-60,1567299600:-120,1586044800:-60,1599354000:-120,1617494400:-60,1630803600:-120,1648944000:-60,1662253200:-120,1680393600:-60,1693702800:-120,1712448000:-60},
"America/Adak":{1400248800:540,1414926000:600,1425816000:540,1446375600:600,1457870400:540,1478430000:600,1489320000:540,1509879600:600,1520769600:540,1541329200:600,1552219200:540,1572778800:600,1583668800:540,1604228400:600,1615723200:540,1636282800:600,1647172800:540,1667732400:600,1678622400:540,1699182000:600,1710072000:540},
"America/Anchorage":{1400248800:480,1414922400:540,1425812400:480,1446372000:540,1457866800:480,1478426400:540,1489316400:480,1509876000:540,1520766000:480,1541325600:540,1552215600:480,1572775200:540,1583665200:480,1604224800:540,1615719600:480,1636279200:540,1647169200:480,1667728800:540,1678618800:480,1699178400:540,1710068400:480},
"America/Anguilla":{1400248800:240},
"America/Antigua":{1400248800:240},
"America/Araguaina":{1400248800:180},
"America/Argentina/Buenos Aires":{1400248800:180},
"America/Argentina/Catamarca":{1400248800:180},
"America/Argentina/Cordoba":{1400248800:180},
"America/Argentina/Jujuy":{1400248800:180},
"America/Argentina/La Rioja":{1400248800:180},
"America/Argentina/Mendoza":{1400248800:180},
"America/Argentina/Rio Gallegos":{1400248800:180},
"America/Argentina/Salta":{1400248800:180},
"America/Argentina/San Juan":{1400248800:180},
"America/Argentina/San Luis":{1400248800:180},
"America/Argentina/Tucuman":{1400248800:180},
"America/Argentina/Ushuaia":{1400248800:180},
"America/Aruba":{1400248800:240},
"America/Asuncion":{1400248800:240,1412481600:180,1426993200:240,1443931200:180,1459047600:240,1475380800:180,1490497200:240,1506830400:180,1521946800:240,1538884800:180,1553396400:240,1570334400:180,1584846000:240,1601784000:180,1616900400:240,1633233600:180,1648350000:240,1664683200:180,1679799600:240,1696132800:180,1711249200:240},
"America/Atikokan":{1400248800:300},
"America/Bahia":{1400248800:180},
"America/Bahia Banderas":{1400248800:300,1414306800:360,1428220800:300,1445756400:360,1459670400:300,1477810800:360,1491120000:300,1509260400:360,1522569600:300,1540710000:360,1554624000:300,1572159600:360,1586073600:300,1603609200:360,1617523200:300,1635663600:360,1648972800:300,1667113200:360,1680422400:300,1698562800:360,1712476800:300},
"America/Barbados":{1400248800:240},
"America/Belem":{1400248800:180},
"America/Belize":{1400248800:360},
"America/Blanc-Sablon":{1400248800:240},
"America/Boa Vista":{1400248800:240},
"America/Bogota":{1400248800:300},
"America/Boise":{1400248800:360,1414915200:420,1425805200:360,1446364800:420,1457859600:360,1478419200:420,1489309200:360,1509868800:420,1520758800:360,1541318400:420,1552208400:360,1572768000:420,1583658000:360,1604217600:420,1615712400:360,1636272000:420,1647162000:360,1667721600:420,1678611600:360,1699171200:420,1710061200:360},
"America/Cambridge Bay":{1400248800:360,1414915200:420,1425805200:360,1446364800:420,1457859600:360,1478419200:420,1489309200:360,1509868800:420,1520758800:360,1541318400:420,1552208400:360,1572768000:420,1583658000:360,1604217600:420,1615712400:360,1636272000:420,1647162000:360,1667721600:420,1678611600:360,1699171200:420,1710061200:360},
"America/Campo Grande":{1400248800:240,1413691200:180,1424574000:240,1445140800:180,1456023600:240,1476590400:180,1487473200:240,1508040000:180,1518922800:240,1540094400:180,1550372400:240,1571544000:180,1581822000:240,1602993600:180,1613876400:240,1634443200:180,1645326000:240,1665892800:180,1677380400:240,1697342400:180,1708225200:240},
"America/Cancun":{1400248800:300,1414306800:360,1428220800:300,1445756400:360,1459670400:300,1477810800:360,1491120000:300,1509260400:360,1522569600:300,1540710000:360,1554624000:300,1572159600:360,1586073600:300,1603609200:360,1617523200:300,1635663600:360,1648972800:300,1667113200:360,1680422400:300,1698562800:360,1712476800:300},
"America/Caracas":{1400248800:270},
"America/Cayenne":{1400248800:180},
"America/Cayman":{1400248800:300},
"America/Central Time":{1400248800:300,1414911600:360,1425801600:300,1446361200:360,1457856000:300,1478415600:360,1489305600:300,1509865200:360,1520755200:300,1541314800:360,1552204800:300,1572764400:360,1583654400:300,1604214000:360,1615708800:300,1636268400:360,1647158400:300,1667718000:360,1678608000:300,1699167600:360,1710057600:300},
"America/Chicago":{1400248800:300,1414911600:360,1425801600:300,1446361200:360,1457856000:300,1478415600:360,1489305600:300,1509865200:360,1520755200:300,1541314800:360,1552204800:300,1572764400:360,1583654400:300,1604214000:360,1615708800:300,1636268400:360,1647158400:300,1667718000:360,1678608000:300,1699167600:360,1710057600:300},
"America/Chihuahua":{1400248800:360,1414310400:420,1428224400:360,1445760000:420,1459674000:360,1477814400:420,1491123600:360,1509264000:420,1522573200:360,1540713600:420,1554627600:360,1572163200:420,1586077200:360,1603612800:420,1617526800:360,1635667200:420,1648976400:360,1667116800:420,1680426000:360,1698566400:420,1712480400:360},
"America/Costa Rica":{1400248800:360},
"America/Creston":{1400248800:420},
"America/Cuiaba":{1400248800:240,1413691200:180,1424574000:240,1445140800:180,1456023600:240,1476590400:180,1487473200:240,1508040000:180,1518922800:240,1540094400:180,1550372400:240,1571544000:180,1581822000:240,1602993600:180,1613876400:240,1634443200:180,1645326000:240,1665892800:180,1677380400:240,1697342400:180,1708225200:240},
"America/Curacao":{1400248800:240},
"America/Danmarkshavn":{1400248800:0},
"America/Dawson":{1400248800:420,1414918800:480,1425808800:420,1446368400:480,1457863200:420,1478422800:480,1489312800:420,1509872400:480,1520762400:420,1541322000:480,1552212000:420,1572771600:480,1583661600:420,1604221200:480,1615716000:420,1636275600:480,1647165600:420,1667725200:480,1678615200:420,1699174800:480,1710064800:420},
"America/Dawson Creek":{1400248800:420},
"America/Denver":{1400248800:360,1414915200:420,1425805200:360,1446364800:420,1457859600:360,1478419200:420,1489309200:360,1509868800:420,1520758800:360,1541318400:420,1552208400:360,1572768000:420,1583658000:360,1604217600:420,1615712400:360,1636272000:420,1647162000:360,1667721600:420,1678611600:360,1699171200:420,1710061200:360},
"America/Detroit":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Dominica":{1400248800:240},
"America/Eastern Time":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Edmonton":{1400248800:360,1414915200:420,1425805200:360,1446364800:420,1457859600:360,1478419200:420,1489309200:360,1509868800:420,1520758800:360,1541318400:420,1552208400:360,1572768000:420,1583658000:360,1604217600:420,1615712400:360,1636272000:420,1647162000:360,1667721600:420,1678611600:360,1699171200:420,1710061200:360},
"America/Eirunepe":{1400248800:300},
"America/El Salvador":{1400248800:360},
"America/Fortaleza":{1400248800:180},
"America/Glace Bay":{1400248800:180,1414904400:240,1425794400:180,1446354000:240,1457848800:180,1478408400:240,1489298400:180,1509858000:240,1520748000:180,1541307600:240,1552197600:180,1572757200:240,1583647200:180,1604206800:240,1615701600:180,1636261200:240,1647151200:180,1667710800:240,1678600800:180,1699160400:240,1710050400:180},
"America/Godthab":{1400248800:120,1414285200:180,1427590800:120,1445734800:180,1459040400:120,1477789200:180,1490490000:120,1509238800:180,1521939600:120,1540688400:180,1553994000:120,1572138000:180,1585443600:120,1603587600:180,1616893200:120,1635642000:180,1648342800:120,1667091600:180,1679792400:120,1698541200:180,1711846800:120},
"America/Goose Bay":{1400248800:180,1414904400:240,1425794400:180,1446354000:240,1457848800:180,1478408400:240,1489298400:180,1509858000:240,1520748000:180,1541307600:240,1552197600:180,1572757200:240,1583647200:180,1604206800:240,1615701600:180,1636261200:240,1647151200:180,1667710800:240,1678600800:180,1699160400:240,1710050400:180},
"America/Grand Turk":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Grenada":{1400248800:240},
"America/Guadeloupe":{1400248800:240},
"America/Guatemala":{1400248800:360},
"America/Guayaquil":{1400248800:300},
"America/Guyana":{1400248800:240},
"America/Halifax":{1400248800:180,1414904400:240,1425794400:180,1446354000:240,1457848800:180,1478408400:240,1489298400:180,1509858000:240,1520748000:180,1541307600:240,1552197600:180,1572757200:240,1583647200:180,1604206800:240,1615701600:180,1636261200:240,1647151200:180,1667710800:240,1678600800:180,1699160400:240,1710050400:180},
"America/Havana":{1400248800:240,1414904400:300,1425790800:240,1446354000:300,1457845200:240,1478408400:300,1489294800:240,1509858000:300,1520744400:240,1541307600:300,1552194000:240,1572757200:300,1583643600:240,1604206800:300,1615698000:240,1636261200:300,1647147600:240,1667710800:300,1678597200:240,1699160400:300,1710046800:240},
"America/Hermosillo":{1400248800:420},
"America/Indiana/Indianapolis":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Indiana/Knox":{1400248800:300,1414911600:360,1425801600:300,1446361200:360,1457856000:300,1478415600:360,1489305600:300,1509865200:360,1520755200:300,1541314800:360,1552204800:300,1572764400:360,1583654400:300,1604214000:360,1615708800:300,1636268400:360,1647158400:300,1667718000:360,1678608000:300,1699167600:360,1710057600:300},
"America/Indiana/Marengo":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Indiana/Petersburg":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Indiana/Tell City":{1400248800:300,1414911600:360,1425801600:300,1446361200:360,1457856000:300,1478415600:360,1489305600:300,1509865200:360,1520755200:300,1541314800:360,1552204800:300,1572764400:360,1583654400:300,1604214000:360,1615708800:300,1636268400:360,1647158400:300,1667718000:360,1678608000:300,1699167600:360,1710057600:300},
"America/Indiana/Vevay":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Indiana/Vincennes":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Indiana/Winamac":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Inuvik":{1400248800:360,1414915200:420,1425805200:360,1446364800:420,1457859600:360,1478419200:420,1489309200:360,1509868800:420,1520758800:360,1541318400:420,1552208400:360,1572768000:420,1583658000:360,1604217600:420,1615712400:360,1636272000:420,1647162000:360,1667721600:420,1678611600:360,1699171200:420,1710061200:360},
"America/Iqaluit":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Jamaica":{1400248800:300},
"America/Juneau":{1400248800:480,1414922400:540,1425812400:480,1446372000:540,1457866800:480,1478426400:540,1489316400:480,1509876000:540,1520766000:480,1541325600:540,1552215600:480,1572775200:540,1583665200:480,1604224800:540,1615719600:480,1636279200:540,1647169200:480,1667728800:540,1678618800:480,1699178400:540,1710068400:480},
"America/Kentucky/Louisville":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Kentucky/Monticello":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Kralendijk":{1400248800:240},
"America/La Paz":{1400248800:240},
"America/Lima":{1400248800:300},
"America/Los Angeles":{1400248800:420,1414918800:480,1425808800:420,1446368400:480,1457863200:420,1478422800:480,1489312800:420,1509872400:480,1520762400:420,1541322000:480,1552212000:420,1572771600:480,1583661600:420,1604221200:480,1615716000:420,1636275600:480,1647165600:420,1667725200:480,1678615200:420,1699174800:480,1710064800:420},
"America/Lower Princes":{1400248800:240},
"America/Maceio":{1400248800:180},
"America/Managua":{1400248800:360},
"America/Manaus":{1400248800:240},
"America/Marigot":{1400248800:240},
"America/Martinique":{1400248800:240},
"America/Matamoros":{1400248800:300,1414911600:360,1425801600:300,1446361200:360,1457856000:300,1478415600:360,1489305600:300,1509865200:360,1520755200:300,1541314800:360,1552204800:300,1572764400:360,1583654400:300,1604214000:360,1615708800:300,1636268400:360,1647158400:300,1667718000:360,1678608000:300,1699167600:360,1710057600:300},
"America/Mazatlan":{1400248800:360,1414310400:420,1428224400:360,1445760000:420,1459674000:360,1477814400:420,1491123600:360,1509264000:420,1522573200:360,1540713600:420,1554627600:360,1572163200:420,1586077200:360,1603612800:420,1617526800:360,1635667200:420,1648976400:360,1667116800:420,1680426000:360,1698566400:420,1712480400:360},
"America/Menominee":{1400248800:300,1414911600:360,1425801600:300,1446361200:360,1457856000:300,1478415600:360,1489305600:300,1509865200:360,1520755200:300,1541314800:360,1552204800:300,1572764400:360,1583654400:300,1604214000:360,1615708800:300,1636268400:360,1647158400:300,1667718000:360,1678608000:300,1699167600:360,1710057600:300},
"America/Merida":{1400248800:300,1414306800:360,1428220800:300,1445756400:360,1459670400:300,1477810800:360,1491120000:300,1509260400:360,1522569600:300,1540710000:360,1554624000:300,1572159600:360,1586073600:300,1603609200:360,1617523200:300,1635663600:360,1648972800:300,1667113200:360,1680422400:300,1698562800:360,1712476800:300},
"America/Metlakatla":{1400248800:480},
"America/Mexico City":{1400248800:300,1414306800:360,1428220800:300,1445756400:360,1459670400:300,1477810800:360,1491120000:300,1509260400:360,1522569600:300,1540710000:360,1554624000:300,1572159600:360,1586073600:300,1603609200:360,1617523200:300,1635663600:360,1648972800:300,1667113200:360,1680422400:300,1698562800:360,1712476800:300},
"America/Miquelon":{1400248800:120,1414900800:180,1425790800:120,1446350400:180,1457845200:120,1478404800:180,1489294800:120,1509854400:180,1520744400:120,1541304000:180,1552194000:120,1572753600:180,1583643600:120,1604203200:180,1615698000:120,1636257600:180,1647147600:120,1667707200:180,1678597200:120,1699156800:180,1710046800:120},
"America/Moncton":{1400248800:180,1414904400:240,1425794400:180,1446354000:240,1457848800:180,1478408400:240,1489298400:180,1509858000:240,1520748000:180,1541307600:240,1552197600:180,1572757200:240,1583647200:180,1604206800:240,1615701600:180,1636261200:240,1647151200:180,1667710800:240,1678600800:180,1699160400:240,1710050400:180},
"America/Monterrey":{1400248800:300,1414306800:360,1428220800:300,1445756400:360,1459670400:300,1477810800:360,1491120000:300,1509260400:360,1522569600:300,1540710000:360,1554624000:300,1572159600:360,1586073600:300,1603609200:360,1617523200:300,1635663600:360,1648972800:300,1667113200:360,1680422400:300,1698562800:360,1712476800:300},
"America/Montevideo":{1400248800:180,1412485200:120,1425787200:180,1443934800:120,1457841600:180,1475384400:120,1489291200:180,1506834000:120,1520740800:180,1538888400:120,1552190400:180,1570338000:120,1583640000:180,1601787600:120,1615694400:180,1633237200:120,1647144000:180,1664686800:120,1678593600:180,1696136400:120,1710043200:180},
"America/Montreal":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Montserrat":{1400248800:240},
"America/Mountain Time":{1400248800:360,1414915200:420,1425805200:360,1446364800:420,1457859600:360,1478419200:420,1489309200:360,1509868800:420,1520758800:360,1541318400:420,1552208400:360,1572768000:420,1583658000:360,1604217600:420,1615712400:360,1636272000:420,1647162000:360,1667721600:420,1678611600:360,1699171200:420,1710061200:360},
"America/Nassau":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/New York":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Nipigon":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Nome":{1400248800:480,1414922400:540,1425812400:480,1446372000:540,1457866800:480,1478426400:540,1489316400:480,1509876000:540,1520766000:480,1541325600:540,1552215600:480,1572775200:540,1583665200:480,1604224800:540,1615719600:480,1636279200:540,1647169200:480,1667728800:540,1678618800:480,1699178400:540,1710068400:480},
"America/Noronha":{1400248800:120},
"America/North Dakota/Beulah":{1400248800:300,1414911600:360,1425801600:300,1446361200:360,1457856000:300,1478415600:360,1489305600:300,1509865200:360,1520755200:300,1541314800:360,1552204800:300,1572764400:360,1583654400:300,1604214000:360,1615708800:300,1636268400:360,1647158400:300,1667718000:360,1678608000:300,1699167600:360,1710057600:300},
"America/North Dakota/Center":{1400248800:300,1414911600:360,1425801600:300,1446361200:360,1457856000:300,1478415600:360,1489305600:300,1509865200:360,1520755200:300,1541314800:360,1552204800:300,1572764400:360,1583654400:300,1604214000:360,1615708800:300,1636268400:360,1647158400:300,1667718000:360,1678608000:300,1699167600:360,1710057600:300},
"America/North Dakota/New Salem":{1400248800:300,1414911600:360,1425801600:300,1446361200:360,1457856000:300,1478415600:360,1489305600:300,1509865200:360,1520755200:300,1541314800:360,1552204800:300,1572764400:360,1583654400:300,1604214000:360,1615708800:300,1636268400:360,1647158400:300,1667718000:360,1678608000:300,1699167600:360,1710057600:300},
"America/Ojinaga":{1400248800:360,1414915200:420,1425805200:360,1446364800:420,1457859600:360,1478419200:420,1489309200:360,1509868800:420,1520758800:360,1541318400:420,1552208400:360,1572768000:420,1583658000:360,1604217600:420,1615712400:360,1636272000:420,1647162000:360,1667721600:420,1678611600:360,1699171200:420,1710061200:360},
"America/Pacific Time":{1400248800:420,1414918800:480,1425808800:420,1446368400:480,1457863200:420,1478422800:480,1489312800:420,1509872400:480,1520762400:420,1541322000:480,1552212000:420,1572771600:480,1583661600:420,1604221200:480,1615716000:420,1636275600:480,1647165600:420,1667725200:480,1678615200:420,1699174800:480,1710064800:420},
"America/Panama":{1400248800:300},
"America/Pangnirtung":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Paramaribo":{1400248800:180},
"America/Phoenix":{1400248800:420},
"America/Port of Spain":{1400248800:240},
"America/Port-au-Prince":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Portland Oregon":{1400248800:420,1414918800:480,1425808800:420,1446368400:480,1457863200:420,1478422800:480,1489312800:420,1509872400:480,1520762400:420,1541322000:480,1552212000:420,1572771600:480,1583661600:420,1604221200:480,1615716000:420,1636275600:480,1647165600:420,1667725200:480,1678615200:420,1699174800:480,1710064800:420},
"America/Porto Velho":{1400248800:240},
"America/Puerto Rico":{1400248800:240},
"America/Rainy River":{1400248800:300,1414911600:360,1425801600:300,1446361200:360,1457856000:300,1478415600:360,1489305600:300,1509865200:360,1520755200:300,1541314800:360,1552204800:300,1572764400:360,1583654400:300,1604214000:360,1615708800:300,1636268400:360,1647158400:300,1667718000:360,1678608000:300,1699167600:360,1710057600:300},
"America/Rankin Inlet":{1400248800:300,1414911600:360,1425801600:300,1446361200:360,1457856000:300,1478415600:360,1489305600:300,1509865200:360,1520755200:300,1541314800:360,1552204800:300,1572764400:360,1583654400:300,1604214000:360,1615708800:300,1636268400:360,1647158400:300,1667718000:360,1678608000:300,1699167600:360,1710057600:300},
"America/Recife":{1400248800:180},
"America/Regina":{1400248800:360},
"America/Resolute":{1400248800:300,1414911600:360,1425801600:300,1446361200:360,1457856000:300,1478415600:360,1489305600:300,1509865200:360,1520755200:300,1541314800:360,1552204800:300,1572764400:360,1583654400:300,1604214000:360,1615708800:300,1636268400:360,1647158400:300,1667718000:360,1678608000:300,1699167600:360,1710057600:300},
"America/Rio Branco":{1400248800:300},
"America/Santa Isabel":{1400248800:420,1414314000:480,1428228000:420,1445763600:480,1459677600:420,1477818000:480,1491127200:420,1509267600:480,1522576800:420,1540717200:480,1554631200:420,1572166800:480,1586080800:420,1603616400:480,1617530400:420,1635670800:480,1648980000:420,1667120400:480,1680429600:420,1698570000:480,1712484000:420},
"America/Santarem":{1400248800:180},
"America/Santiago":{1400248800:240,1410062400:180,1430017200:240,1441512000:180,1461466800:240,1472961600:180,1492916400:240,1504411200:180,1524970800:240,1535860800:180,1556420400:240,1567915200:180,1587870000:240,1599364800:180,1619319600:240,1630814400:180,1650769200:240,1662264000:180,1682218800:240,1693713600:180,1714273200:240},
"America/Santo Domingo":{1400248800:240},
"America/Sao Paulo":{1400248800:180,1413687600:120,1424570400:180,1445137200:120,1456020000:180,1476586800:120,1487469600:180,1508036400:120,1518919200:180,1540090800:120,1550368800:180,1571540400:120,1581818400:180,1602990000:120,1613872800:180,1634439600:120,1645322400:180,1665889200:120,1677376800:180,1697338800:120,1708221600:180},
"America/Scoresbysund":{1400248800:0,1414285200:60,1427590800:0,1445734800:60,1459040400:0,1477789200:60,1490490000:0,1509238800:60,1521939600:0,1540688400:60,1553994000:0,1572138000:60,1585443600:0,1603587600:60,1616893200:0,1635642000:60,1648342800:0,1667091600:60,1679792400:0,1698541200:60,1711846800:0},
"America/Sitka":{1400248800:480,1414922400:540,1425812400:480,1446372000:540,1457866800:480,1478426400:540,1489316400:480,1509876000:540,1520766000:480,1541325600:540,1552215600:480,1572775200:540,1583665200:480,1604224800:540,1615719600:480,1636279200:540,1647169200:480,1667728800:540,1678618800:480,1699178400:540,1710068400:480},
"America/St Barthelemy":{1400248800:240},
"America/St Johns":{1400248800:150,1414902600:210,1425792600:150,1446352200:210,1457847000:150,1478406600:210,1489296600:150,1509856200:210,1520746200:150,1541305800:210,1552195800:150,1572755400:210,1583645400:150,1604205000:210,1615699800:150,1636259400:210,1647149400:150,1667709000:210,1678599000:150,1699158600:210,1710048600:150},
"America/St Kitts":{1400248800:240},
"America/St Lucia":{1400248800:240},
"America/St Pierre":{1400248800:120,1414900800:180,1425790800:120,1446350400:180,1457845200:120,1478404800:180,1489294800:120,1509854400:180,1520744400:120,1541304000:180,1552194000:120,1572753600:180,1583643600:120,1604203200:180,1615698000:120,1636257600:180,1647147600:120,1667707200:180,1678597200:120,1699156800:180,1710046800:120},
"America/St Thomas":{1400248800:240},
"America/St Vincent":{1400248800:240},
"America/Swift Current":{1400248800:360},
"America/Tegucigalpa":{1400248800:360},
"America/Thule":{1400248800:180,1414904400:240,1425794400:180,1446354000:240,1457848800:180,1478408400:240,1489298400:180,1509858000:240,1520748000:180,1541307600:240,1552197600:180,1572757200:240,1583647200:180,1604206800:240,1615701600:180,1636261200:240,1647151200:180,1667710800:240,1678600800:180,1699160400:240,1710050400:180},
"America/Thunder Bay":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Tijuana":{1400248800:420,1414918800:480,1425808800:420,1446368400:480,1457863200:420,1478422800:480,1489312800:420,1509872400:480,1520762400:420,1541322000:480,1552212000:420,1572771600:480,1583661600:420,1604221200:480,1615716000:420,1636275600:480,1647165600:420,1667725200:480,1678615200:420,1699174800:480,1710064800:420},
"America/Toronto":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"America/Tortola":{1400248800:240},
"America/Vancouver":{1400248800:420,1414918800:480,1425808800:420,1446368400:480,1457863200:420,1478422800:480,1489312800:420,1509872400:480,1520762400:420,1541322000:480,1552212000:420,1572771600:480,1583661600:420,1604221200:480,1615716000:420,1636275600:480,1647165600:420,1667725200:480,1678615200:420,1699174800:480,1710064800:420},
"America/Whitehorse":{1400248800:420,1414918800:480,1425808800:420,1446368400:480,1457863200:420,1478422800:480,1489312800:420,1509872400:480,1520762400:420,1541322000:480,1552212000:420,1572771600:480,1583661600:420,1604221200:480,1615716000:420,1636275600:480,1647165600:420,1667725200:480,1678615200:420,1699174800:480,1710064800:420},
"America/Winnipeg":{1400248800:300,1414911600:360,1425801600:300,1446361200:360,1457856000:300,1478415600:360,1489305600:300,1509865200:360,1520755200:300,1541314800:360,1552204800:300,1572764400:360,1583654400:300,1604214000:360,1615708800:300,1636268400:360,1647158400:300,1667718000:360,1678608000:300,1699167600:360,1710057600:300},
"America/Yakutat":{1400248800:480,1414922400:540,1425812400:480,1446372000:540,1457866800:480,1478426400:540,1489316400:480,1509876000:540,1520766000:480,1541325600:540,1552215600:480,1572775200:540,1583665200:480,1604224800:540,1615719600:480,1636279200:540,1647169200:480,1667728800:540,1678618800:480,1699178400:540,1710068400:480},
"America/Yellowknife":{1400248800:360,1414915200:420,1425805200:360,1446364800:420,1457859600:360,1478419200:420,1489309200:360,1509868800:420,1520758800:360,1541318400:420,1552208400:360,1572768000:420,1583658000:360,1604217600:420,1615712400:360,1636272000:420,1647162000:360,1667721600:420,1678611600:360,1699171200:420,1710061200:360},
"Antarctica/Casey":{1400248800:-480},
"Antarctica/Davis":{1400248800:-420},
"Antarctica/DumontDUrville":{1400248800:-600},
"Antarctica/Macquarie":{1400248800:-660},
"Antarctica/Mawson":{1400248800:-300},
"Antarctica/McMurdo":{1400248800:-720,1411826400:-780,1428156000:-720,1443276000:-780,1459605600:-720,1474725600:-780,1491055200:-720,1506175200:-780,1522504800:-720,1538229600:-780,1554559200:-720,1569679200:-780,1586008800:-720,1601128800:-780,1617458400:-720,1632578400:-780,1648908000:-720,1664028000:-780,1680357600:-720,1695477600:-780,1712412000:-720},
"Antarctica/Palmer":{1400248800:240,1410062400:180,1430017200:240,1441512000:180,1461466800:240,1472961600:180,1492916400:240,1504411200:180,1524970800:240,1535860800:180,1556420400:240,1567915200:180,1587870000:240,1599364800:180,1619319600:240,1630814400:180,1650769200:240,1662264000:180,1682218800:240,1693713600:180,1714273200:240},
"Antarctica/Rothera":{1400248800:180},
"Antarctica/Syowa":{1400248800:-180},
"Antarctica/Troll":{1400248800:-120,1414285200:0,1427590800:-120,1445734800:0,1459040400:-120,1477789200:0,1490490000:-120,1509238800:0,1521939600:-120,1540688400:0,1553994000:-120,1572138000:0,1585443600:-120,1603587600:0,1616893200:-120,1635642000:0,1648342800:-120,1667091600:0,1679792400:-120,1698541200:0,1711846800:-120},
"Antarctica/Vostok":{1400248800:-360},
"Arctic/Longyearbyen":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Asia/Aden":{1400248800:-180},
"Asia/Almaty":{1400248800:-360},
"Asia/Amman":{1400248800:-180,1414706400:-120,1427407200:-180,1446156000:-120,1459461600:-180,1477605600:-120,1490911200:-180,1509055200:-120,1522360800:-180,1540504800:-120,1553810400:-180,1571954400:-120,1585260000:-180,1604008800:-120,1616709600:-180,1635458400:-120,1648764000:-180,1666908000:-120,1680213600:-180,1698357600:-120,1711663200:-180},
"Asia/Anadyr":{1400248800:-720},
"Asia/Aqtau":{1400248800:-300},
"Asia/Aqtobe":{1400248800:-300},
"Asia/Ashgabat":{1400248800:-300},
"Asia/Baghdad":{1400248800:-180},
"Asia/Bahrain":{1400248800:-180},
"Asia/Baku":{1400248800:-300,1414281600:-240,1427587200:-300,1445731200:-240,1459036800:-300,1477785600:-240,1490486400:-300,1509235200:-240,1521936000:-300,1540684800:-240,1553990400:-300,1572134400:-240,1585440000:-300,1603584000:-240,1616889600:-300,1635638400:-240,1648339200:-300,1667088000:-240,1679788800:-300,1698537600:-240,1711843200:-300},
"Asia/Bangkok":{1400248800:-420},
"Asia/Beirut":{1400248800:-180,1414270800:-120,1427580000:-180,1445720400:-120,1459029600:-180,1477774800:-120,1490479200:-180,1509224400:-120,1521928800:-180,1540674000:-120,1553983200:-180,1572123600:-120,1585432800:-180,1603573200:-120,1616882400:-180,1635627600:-120,1648332000:-180,1667077200:-120,1679781600:-180,1698526800:-120,1711836000:-180},
"Asia/Bishkek":{1400248800:-360},
"Asia/Brunei":{1400248800:-480},
"Asia/Calcutta":{1400248800:-330},
"Asia/China":{1400248800:-480},
"Asia/Choibalsan":{1400248800:-480},
"Asia/Chongqing":{1400248800:-480},
"Asia/Colombo":{1400248800:-330},
"Asia/Damascus":{1400248800:-180,1414702800:-120,1427407200:-180,1446152400:-120,1458856800:-180,1477602000:-120,1490911200:-180,1509051600:-120,1522360800:-180,1540501200:-120,1553810400:-180,1571950800:-120,1585260000:-180,1604005200:-120,1616709600:-180,1635454800:-120,1648159200:-180,1666904400:-120,1680213600:-180,1698354000:-120,1711663200:-180},
"Asia/Dhaka":{1400248800:-360},
"Asia/Dili":{1400248800:-540},
"Asia/Dubai":{1400248800:-240},
"Asia/Dushanbe":{1400248800:-300},
"Asia/Gaza":{1400248800:-180,1411678800:-120,1427407200:-180,1443128400:-120,1459461600:-180,1474578000:-120,1490911200:-180,1506027600:-120,1522360800:-180,1537477200:-120,1553810400:-180,1569531600:-120,1585260000:-180,1600981200:-120,1616709600:-180,1632430800:-120,1648764000:-180,1663880400:-120,1680213600:-180,1695330000:-120,1711663200:-180},
"Asia/Harbin":{1400248800:-480},
"Asia/Hebron":{1400248800:-180,1411678800:-120,1427407200:-180,1443128400:-120,1459461600:-180,1474578000:-120,1490911200:-180,1506027600:-120,1522360800:-180,1537477200:-120,1553810400:-180,1569531600:-120,1585260000:-180,1600981200:-120,1616709600:-180,1632430800:-120,1648764000:-180,1663880400:-120,1680213600:-180,1695330000:-120,1711663200:-180},
"Asia/Ho Chi Minh":{1400248800:-420},
"Asia/Hong Kong":{1400248800:-480},
"Asia/Hovd":{1400248800:-420},
"Asia/India":{1400248800:-330},
"Asia/Irkutsk":{1400248800:-540},
"Asia/Jakarta":{1400248800:-420},
"Asia/Jayapura":{1400248800:-540},
"Asia/Jerusalem":{1400248800:-180,1414278000:-120,1427414400:-180,1445727600:-120,1458864000:-180,1477782000:-120,1490313600:-180,1509231600:-120,1521763200:-180,1540681200:-120,1553817600:-180,1572130800:-120,1585267200:-180,1603580400:-120,1616716800:-180,1635634800:-120,1648166400:-180,1667084400:-120,1679616000:-180,1698534000:-120,1711670400:-180},
"Asia/Kabul":{1400248800:-270},
"Asia/Kamchatka":{1400248800:-720},
"Asia/Karachi":{1400248800:-300},
"Asia/Kashgar":{1400248800:-480},
"Asia/Kathmandu":{1400248800:-345},
"Asia/Khandyga":{1400248800:-600},
"Asia/Kolkata":{1400248800:-330},
"Asia/Krasnoyarsk":{1400248800:-480},
"Asia/Kuala Lumpur":{1400248800:-480},
"Asia/Kuching":{1400248800:-480},
"Asia/Kuwait":{1400248800:-180},
"Asia/Macau":{1400248800:-480},
"Asia/Magadan":{1400248800:-720},
"Asia/Makassar":{1400248800:-480},
"Asia/Manila":{1400248800:-480},
"Asia/Muscat":{1400248800:-240},
"Asia/New Delhi":{1400248800:-330},
"Asia/Nicosia":{1400248800:-180,1414285200:-120,1427590800:-180,1445734800:-120,1459040400:-180,1477789200:-120,1490490000:-180,1509238800:-120,1521939600:-180,1540688400:-120,1553994000:-180,1572138000:-120,1585443600:-180,1603587600:-120,1616893200:-180,1635642000:-120,1648342800:-180,1667091600:-120,1679792400:-180,1698541200:-120,1711846800:-180},
"Asia/Novokuznetsk":{1400248800:-420},
"Asia/Novosibirsk":{1400248800:-420},
"Asia/Omsk":{1400248800:-420},
"Asia/Oral":{1400248800:-300},
"Asia/Phnom Penh":{1400248800:-420},
"Asia/Pontianak":{1400248800:-420},
"Asia/Pyongyang":{1400248800:-540},
"Asia/Qatar":{1400248800:-180},
"Asia/Qyzylorda":{1400248800:-360},
"Asia/Rangoon":{1400248800:-390},
"Asia/Riyadh":{1400248800:-180},
"Asia/Sakhalin":{1400248800:-660},
"Asia/Samarkand":{1400248800:-300},
"Asia/Seoul":{1400248800:-540},
"Asia/Shanghai":{1400248800:-480},
"Asia/Singapore":{1400248800:-480},
"Asia/Taipei":{1400248800:-480},
"Asia/Tashkent":{1400248800:-300},
"Asia/Tbilisi":{1400248800:-240},
"Asia/Tehran":{1400248800:-270,1411327800:-210,1426969800:-270,1442863800:-210,1458505800:-270,1474399800:-210,1490128200:-270,1506022200:-210,1521664200:-270,1537558200:-210,1553200200:-270,1569094200:-210,1584736200:-270,1600630200:-210,1616358600:-270,1632252600:-210,1647894600:-270,1663788600:-210,1679430600:-270,1695324600:-210,1710966600:-270},
"Asia/Thimphu":{1400248800:-360},
"Asia/Tokyo":{1400248800:-540},
"Asia/Ulaanbaatar":{1400248800:-480},
"Asia/Urumqi":{1400248800:-480},
"Asia/Ust-Nera":{1400248800:-660},
"Asia/Vientiane":{1400248800:-420},
"Asia/Vladivostok":{1400248800:-660},
"Asia/Yakutsk":{1400248800:-600},
"Asia/Yekaterinburg":{1400248800:-360},
"Asia/Yerevan":{1400248800:-240},
"Atlantic/Azores":{1400248800:0,1414285200:60,1427590800:0,1445734800:60,1459040400:0,1477789200:60,1490490000:0,1509238800:60,1521939600:0,1540688400:60,1553994000:0,1572138000:60,1585443600:0,1603587600:60,1616893200:0,1635642000:60,1648342800:0,1667091600:60,1679792400:0,1698541200:60,1711846800:0},
"Atlantic/Bermuda":{1400248800:180,1414904400:240,1425794400:180,1446354000:240,1457848800:180,1478408400:240,1489298400:180,1509858000:240,1520748000:180,1541307600:240,1552197600:180,1572757200:240,1583647200:180,1604206800:240,1615701600:180,1636261200:240,1647151200:180,1667710800:240,1678600800:180,1699160400:240,1710050400:180},
"Atlantic/Canary":{1400248800:-60,1414285200:0,1427590800:-60,1445734800:0,1459040400:-60,1477789200:0,1490490000:-60,1509238800:0,1521939600:-60,1540688400:0,1553994000:-60,1572138000:0,1585443600:-60,1603587600:0,1616893200:-60,1635642000:0,1648342800:-60,1667091600:0,1679792400:-60,1698541200:0,1711846800:-60},
"Atlantic/Cape Verde":{1400248800:60},
"Atlantic/Faroe":{1400248800:-60,1414285200:0,1427590800:-60,1445734800:0,1459040400:-60,1477789200:0,1490490000:-60,1509238800:0,1521939600:-60,1540688400:0,1553994000:-60,1572138000:0,1585443600:-60,1603587600:0,1616893200:-60,1635642000:0,1648342800:-60,1667091600:0,1679792400:-60,1698541200:0,1711846800:-60},
"Atlantic/Madeira":{1400248800:-60,1414285200:0,1427590800:-60,1445734800:0,1459040400:-60,1477789200:0,1490490000:-60,1509238800:0,1521939600:-60,1540688400:0,1553994000:-60,1572138000:0,1585443600:-60,1603587600:0,1616893200:-60,1635642000:0,1648342800:-60,1667091600:0,1679792400:-60,1698541200:0,1711846800:-60},
"Atlantic/Reykjavik":{1400248800:0},
"Atlantic/South Georgia":{1400248800:120},
"Atlantic/St Helena":{1400248800:0},
"Atlantic/Stanley":{1400248800:180},
"Australia/Adelaide":{1400248800:-570,1412440200:-630,1428165000:-570,1443889800:-630,1459614600:-570,1475339400:-630,1491064200:-570,1506789000:-630,1522513800:-570,1538843400:-630,1554568200:-570,1570293000:-630,1586017800:-570,1601742600:-630,1617467400:-570,1633192200:-630,1648917000:-570,1664641800:-630,1680366600:-570,1696091400:-630,1712421000:-570},
"Australia/Brisbane":{1400248800:-600},
"Australia/Broken Hill":{1400248800:-570,1412440200:-630,1428165000:-570,1443889800:-630,1459614600:-570,1475339400:-630,1491064200:-570,1506789000:-630,1522513800:-570,1538843400:-630,1554568200:-570,1570293000:-630,1586017800:-570,1601742600:-630,1617467400:-570,1633192200:-630,1648917000:-570,1664641800:-630,1680366600:-570,1696091400:-630,1712421000:-570},
"Australia/Currie":{1400248800:-600,1412438400:-660,1428163200:-600,1443888000:-660,1459612800:-600,1475337600:-660,1491062400:-600,1506787200:-660,1522512000:-600,1538841600:-660,1554566400:-600,1570291200:-660,1586016000:-600,1601740800:-660,1617465600:-600,1633190400:-660,1648915200:-600,1664640000:-660,1680364800:-600,1696089600:-660,1712419200:-600},
"Australia/Darwin":{1400248800:-570},
"Australia/Eucla":{1400248800:-525},
"Australia/Hobart":{1400248800:-600,1412438400:-660,1428163200:-600,1443888000:-660,1459612800:-600,1475337600:-660,1491062400:-600,1506787200:-660,1522512000:-600,1538841600:-660,1554566400:-600,1570291200:-660,1586016000:-600,1601740800:-660,1617465600:-600,1633190400:-660,1648915200:-600,1664640000:-660,1680364800:-600,1696089600:-660,1712419200:-600},
"Australia/Lindeman":{1400248800:-600},
"Australia/Lord Howe":{1400248800:-630,1412436600:-660,1428159600:-630,1443886200:-660,1459609200:-630,1475335800:-660,1491058800:-630,1506785400:-660,1522508400:-630,1538839800:-660,1554562800:-630,1570289400:-660,1586012400:-630,1601739000:-660,1617462000:-630,1633188600:-660,1648911600:-630,1664638200:-660,1680361200:-630,1696087800:-660,1712415600:-630},
"Australia/Melbourne":{1400248800:-600,1412438400:-660,1428163200:-600,1443888000:-660,1459612800:-600,1475337600:-660,1491062400:-600,1506787200:-660,1522512000:-600,1538841600:-660,1554566400:-600,1570291200:-660,1586016000:-600,1601740800:-660,1617465600:-600,1633190400:-660,1648915200:-600,1664640000:-660,1680364800:-600,1696089600:-660,1712419200:-600},
"Australia/Perth":{1400248800:-480},
"Australia/Sydney":{1400248800:-600,1412438400:-660,1428163200:-600,1443888000:-660,1459612800:-600,1475337600:-660,1491062400:-600,1506787200:-660,1522512000:-600,1538841600:-660,1554566400:-600,1570291200:-660,1586016000:-600,1601740800:-660,1617465600:-600,1633190400:-660,1648915200:-600,1664640000:-660,1680364800:-600,1696089600:-660,1712419200:-600},
"Europe/Amsterdam":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Andorra":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Athens":{1400248800:-180,1414285200:-120,1427590800:-180,1445734800:-120,1459040400:-180,1477789200:-120,1490490000:-180,1509238800:-120,1521939600:-180,1540688400:-120,1553994000:-180,1572138000:-120,1585443600:-180,1603587600:-120,1616893200:-180,1635642000:-120,1648342800:-180,1667091600:-120,1679792400:-180,1698541200:-120,1711846800:-180},
"Europe/Belgrade":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Berlin":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Bratislava":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Brussels":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Bucharest":{1400248800:-180,1414285200:-120,1427590800:-180,1445734800:-120,1459040400:-180,1477789200:-120,1490490000:-180,1509238800:-120,1521939600:-180,1540688400:-120,1553994000:-180,1572138000:-120,1585443600:-180,1603587600:-120,1616893200:-180,1635642000:-120,1648342800:-180,1667091600:-120,1679792400:-180,1698541200:-120,1711846800:-180},
"Europe/Budapest":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Busingen":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Central European Time":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Chisinau":{1400248800:-180,1414285200:-120,1427590800:-180,1445734800:-120,1459040400:-180,1477789200:-120,1490490000:-180,1509238800:-120,1521939600:-180,1540688400:-120,1553994000:-180,1572138000:-120,1585443600:-180,1603587600:-120,1616893200:-180,1635642000:-120,1648342800:-180,1667091600:-120,1679792400:-180,1698541200:-120,1711846800:-180},
"Europe/Copenhagen":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Dublin":{1400248800:-60,1414285200:0,1427590800:-60,1445734800:0,1459040400:-60,1477789200:0,1490490000:-60,1509238800:0,1521939600:-60,1540688400:0,1553994000:-60,1572138000:0,1585443600:-60,1603587600:0,1616893200:-60,1635642000:0,1648342800:-60,1667091600:0,1679792400:-60,1698541200:0,1711846800:-60},
"Europe/Gibraltar":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Guernsey":{1400248800:-60,1414285200:0,1427590800:-60,1445734800:0,1459040400:-60,1477789200:0,1490490000:-60,1509238800:0,1521939600:-60,1540688400:0,1553994000:-60,1572138000:0,1585443600:-60,1603587600:0,1616893200:-60,1635642000:0,1648342800:-60,1667091600:0,1679792400:-60,1698541200:0,1711846800:-60},
"Europe/Helsinki":{1400248800:-180,1414285200:-120,1427590800:-180,1445734800:-120,1459040400:-180,1477789200:-120,1490490000:-180,1509238800:-120,1521939600:-180,1540688400:-120,1553994000:-180,1572138000:-120,1585443600:-180,1603587600:-120,1616893200:-180,1635642000:-120,1648342800:-180,1667091600:-120,1679792400:-180,1698541200:-120,1711846800:-180},
"Europe/Isle of Man":{1400248800:-60,1414285200:0,1427590800:-60,1445734800:0,1459040400:-60,1477789200:0,1490490000:-60,1509238800:0,1521939600:-60,1540688400:0,1553994000:-60,1572138000:0,1585443600:-60,1603587600:0,1616893200:-60,1635642000:0,1648342800:-60,1667091600:0,1679792400:-60,1698541200:0,1711846800:-60},
"Europe/Istanbul":{1400248800:-180,1414285200:-120,1427590800:-180,1445734800:-120,1459040400:-180,1477789200:-120,1490490000:-180,1509238800:-120,1521939600:-180,1540688400:-120,1553994000:-180,1572138000:-120,1585443600:-180,1603587600:-120,1616893200:-180,1635642000:-120,1648342800:-180,1667091600:-120,1679792400:-180,1698541200:-120,1711846800:-180},
"Europe/Jersey":{1400248800:-60,1414285200:0,1427590800:-60,1445734800:0,1459040400:-60,1477789200:0,1490490000:-60,1509238800:0,1521939600:-60,1540688400:0,1553994000:-60,1572138000:0,1585443600:-60,1603587600:0,1616893200:-60,1635642000:0,1648342800:-60,1667091600:0,1679792400:-60,1698541200:0,1711846800:-60},
"Europe/Kaliningrad":{1400248800:-180},
"Europe/Kiev":{1400248800:-180,1414285200:-120,1427590800:-180,1445734800:-120,1459040400:-180,1477789200:-120,1490490000:-180,1509238800:-120,1521939600:-180,1540688400:-120,1553994000:-180,1572138000:-120,1585443600:-180,1603587600:-120,1616893200:-180,1635642000:-120,1648342800:-180,1667091600:-120,1679792400:-180,1698541200:-120,1711846800:-180},
"Europe/Lisbon":{1400248800:-60,1414285200:0,1427590800:-60,1445734800:0,1459040400:-60,1477789200:0,1490490000:-60,1509238800:0,1521939600:-60,1540688400:0,1553994000:-60,1572138000:0,1585443600:-60,1603587600:0,1616893200:-60,1635642000:0,1648342800:-60,1667091600:0,1679792400:-60,1698541200:0,1711846800:-60},
"Europe/Ljubljana":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/London":{1400248800:-60,1414285200:0,1427590800:-60,1445734800:0,1459040400:-60,1477789200:0,1490490000:-60,1509238800:0,1521939600:-60,1540688400:0,1553994000:-60,1572138000:0,1585443600:-60,1603587600:0,1616893200:-60,1635642000:0,1648342800:-60,1667091600:0,1679792400:-60,1698541200:0,1711846800:-60},
"Europe/Luxembourg":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Madrid":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Malta":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Mariehamn":{1400248800:-180,1414285200:-120,1427590800:-180,1445734800:-120,1459040400:-180,1477789200:-120,1490490000:-180,1509238800:-120,1521939600:-180,1540688400:-120,1553994000:-180,1572138000:-120,1585443600:-180,1603587600:-120,1616893200:-180,1635642000:-120,1648342800:-180,1667091600:-120,1679792400:-180,1698541200:-120,1711846800:-180},
"Europe/Minsk":{1400248800:-180},
"Europe/Monaco":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Moscow":{1400248800:-240},
"Europe/Oslo":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Paris":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Podgorica":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Prague":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Riga":{1400248800:-180,1414285200:-120,1427590800:-180,1445734800:-120,1459040400:-180,1477789200:-120,1490490000:-180,1509238800:-120,1521939600:-180,1540688400:-120,1553994000:-180,1572138000:-120,1585443600:-180,1603587600:-120,1616893200:-180,1635642000:-120,1648342800:-180,1667091600:-120,1679792400:-180,1698541200:-120,1711846800:-180},
"Europe/Rome":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Samara":{1400248800:-240},
"Europe/San Marino":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Sarajevo":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Simferopol":{1400248800:-240},
"Europe/Skopje":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Sofia":{1400248800:-180,1414285200:-120,1427590800:-180,1445734800:-120,1459040400:-180,1477789200:-120,1490490000:-180,1509238800:-120,1521939600:-180,1540688400:-120,1553994000:-180,1572138000:-120,1585443600:-180,1603587600:-120,1616893200:-180,1635642000:-120,1648342800:-180,1667091600:-120,1679792400:-180,1698541200:-120,1711846800:-180},
"Europe/Stockholm":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Tallinn":{1400248800:-180,1414285200:-120,1427590800:-180,1445734800:-120,1459040400:-180,1477789200:-120,1490490000:-180,1509238800:-120,1521939600:-180,1540688400:-120,1553994000:-180,1572138000:-120,1585443600:-180,1603587600:-120,1616893200:-180,1635642000:-120,1648342800:-180,1667091600:-120,1679792400:-180,1698541200:-120,1711846800:-180},
"Europe/Tirane":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Uzhgorod":{1400248800:-180,1414285200:-120,1427590800:-180,1445734800:-120,1459040400:-180,1477789200:-120,1490490000:-180,1509238800:-120,1521939600:-180,1540688400:-120,1553994000:-180,1572138000:-120,1585443600:-180,1603587600:-120,1616893200:-180,1635642000:-120,1648342800:-180,1667091600:-120,1679792400:-180,1698541200:-120,1711846800:-180},
"Europe/Vaduz":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Vatican":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Vienna":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Vilnius":{1400248800:-180,1414285200:-120,1427590800:-180,1445734800:-120,1459040400:-180,1477789200:-120,1490490000:-180,1509238800:-120,1521939600:-180,1540688400:-120,1553994000:-180,1572138000:-120,1585443600:-180,1603587600:-120,1616893200:-180,1635642000:-120,1648342800:-180,1667091600:-120,1679792400:-180,1698541200:-120,1711846800:-180},
"Europe/Volgograd":{1400248800:-240},
"Europe/Warsaw":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Zagreb":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"Europe/Zaporozhye":{1400248800:-180,1414285200:-120,1427590800:-180,1445734800:-120,1459040400:-180,1477789200:-120,1490490000:-180,1509238800:-120,1521939600:-180,1540688400:-120,1553994000:-180,1572138000:-120,1585443600:-180,1603587600:-120,1616893200:-180,1635642000:-120,1648342800:-180,1667091600:-120,1679792400:-180,1698541200:-120,1711846800:-180},
"Europe/Zurich":{1400248800:-120,1414285200:-60,1427590800:-120,1445734800:-60,1459040400:-120,1477789200:-60,1490490000:-120,1509238800:-60,1521939600:-120,1540688400:-60,1553994000:-120,1572138000:-60,1585443600:-120,1603587600:-60,1616893200:-120,1635642000:-60,1648342800:-120,1667091600:-60,1679792400:-120,1698541200:-60,1711846800:-120},
"GMT-12":{0:720},
"GMT-11":{0:660},
"GMT-10":{0:600},
"GMT-09":{0:540},
"GMT-08":{0:480},
"GMT-07":{0:420},
"GMT-06":{0:360},
"GMT-05":{0:300},
"GMT-04":{0:240},
"GMT-03":{0:180},
"GMT-02":{0:120},
"GMT-01":{0:60},
"GMT+00":{0:0},
"GMT+01":{0:-60},
"GMT+02":{0:-120},
"GMT+03":{0:-180},
"GMT+04":{0:-240},
"GMT+05":{0:-300},
"GMT+06":{0:-360},
"GMT+07":{0:-420},
"GMT+08":{0:-480},
"GMT+09":{0:-540},
"GMT+10":{0:-600},
"GMT+11":{0:-660},
"GMT+12":{0:-720},
"Indian Ocean/Antananarivo":{1400248800:-180},
"Indian Ocean/Chagos":{1400248800:-360},
"Indian Ocean/Christmas":{1400248800:-420},
"Indian Ocean/Cocos":{1400248800:-390},
"Indian Ocean/Comoro":{1400248800:-180},
"Indian Ocean/Kerguelen":{1400248800:-300},
"Indian Ocean/Mahe":{1400248800:-240},
"Indian Ocean/Maldives":{1400248800:-300},
"Indian Ocean/Mauritius":{1400248800:-240},
"Indian Ocean/Mayotte":{1400248800:-180},
"Indian Ocean/Reunion":{1400248800:-240},
"Pacific/Apia":{1400248800:-780,1411826400:-840,1428156000:-780,1443276000:-840,1459605600:-780,1474725600:-840,1491055200:-780,1506175200:-840,1522504800:-780,1538229600:-840,1554559200:-780,1569679200:-840,1586008800:-780,1601128800:-840,1617458400:-780,1632578400:-840,1648908000:-780,1664028000:-840,1680357600:-780,1695477600:-840,1712412000:-780},
"Pacific/Auckland":{1400248800:-720,1411826400:-780,1428156000:-720,1443276000:-780,1459605600:-720,1474725600:-780,1491055200:-720,1506175200:-780,1522504800:-720,1538229600:-780,1554559200:-720,1569679200:-780,1586008800:-720,1601128800:-780,1617458400:-720,1632578400:-780,1648908000:-720,1664028000:-780,1680357600:-720,1695477600:-780,1712412000:-720},
"Pacific/Chatham":{1400248800:-765,1411826400:-825,1428156000:-765,1443276000:-825,1459605600:-765,1474725600:-825,1491055200:-765,1506175200:-825,1522504800:-765,1538229600:-825,1554559200:-765,1569679200:-825,1586008800:-765,1601128800:-825,1617458400:-765,1632578400:-825,1648908000:-765,1664028000:-825,1680357600:-765,1695477600:-825,1712412000:-765},
"Pacific/Chuuk":{1400248800:-600},
"Pacific/Easter":{1400248800:360,1410062400:300,1430017200:360,1441512000:300,1461466800:360,1472961600:300,1492916400:360,1504411200:300,1524970800:360,1535860800:300,1556420400:360,1567915200:300,1587870000:360,1599364800:300,1619319600:360,1630814400:300,1650769200:360,1662264000:300,1682218800:360,1693713600:300,1714273200:360},
"Pacific/Efate":{1400248800:-660},
"Pacific/Enderbury":{1400248800:-780},
"Pacific/Fakaofo":{1400248800:-780},
"Pacific/Fiji":{1400248800:-720,1414245600:-780,1421499600:-720,1445695200:-780,1453554000:-720,1477144800:-780,1485003600:-720,1508594400:-780,1516453200:-720,1540044000:-780,1547902800:-720,1572098400:-780,1579352400:-720,1603548000:-780,1611406800:-720,1634997600:-780,1642856400:-720,1666447200:-780,1674306000:-720,1697896800:-780,1705755600:-720},
"Pacific/Funafuti":{1400248800:-720},
"Pacific/Galapagos":{1400248800:360},
"Pacific/Gambier":{1400248800:540},
"Pacific/Guadalcanal":{1400248800:-660},
"Pacific/Guam":{1400248800:-600},
"Pacific/Honolulu":{1400248800:600},
"Pacific/Johnston":{1400248800:600},
"Pacific/Kiritimati":{1400248800:-840},
"Pacific/Kosrae":{1400248800:-660},
"Pacific/Kwajalein":{1400248800:-720},
"Pacific/Majuro":{1400248800:-720},
"Pacific/Marquesas":{1400248800:570},
"Pacific/Midway":{1400248800:660},
"Pacific/Nauru":{1400248800:-720},
"Pacific/Niue":{1400248800:660},
"Pacific/Norfolk":{1400248800:-690},
"Pacific/Noumea":{1400248800:-660},
"Pacific/Pago Pago":{1400248800:660},
"Pacific/Palau":{1400248800:-540},
"Pacific/Pitcairn":{1400248800:480},
"Pacific/Pohnpei":{1400248800:-660},
"Pacific/Port Moresby":{1400248800:-600},
"Pacific/Rarotonga":{1400248800:600},
"Pacific/Saipan":{1400248800:-600},
"Pacific/Tahiti":{1400248800:600},
"Pacific/Tarawa":{1400248800:-720},
"Pacific/Tongatapu":{1400248800:-780},
"Pacific/Wake":{1400248800:-720},
"Pacific/Wallis":{1400248800:-720},
"UTC":{1400248800:0},
"UTC-05:00/Eastern Time (US & Canada)":{1400248800:240,1414908000:300,1425798000:240,1446357600:300,1457852400:240,1478412000:300,1489302000:240,1509861600:300,1520751600:240,1541311200:300,1552201200:240,1572760800:300,1583650800:240,1604210400:300,1615705200:240,1636264800:300,1647154800:240,1667714400:300,1678604400:240,1699164000:300,1710054000:240},
"UTC-08:00/Pacific Time (US & Canada)":{1400248800:420,1414918800:480,1425808800:420,1446368400:480,1457863200:420,1478422800:480,1489312800:420,1509872400:480,1520762400:420,1541322000:480,1552212000:420,1572771600:480,1583661600:420,1604221200:480,1615716000:420,1636275600:480,1647165600:420,1667725200:480,1678615200:420,1699174800:480,1710064800:420}
};
//   SunriseSunset Class (2011-05-02)
//
// OVERVIEW
//
//   Implementation of http://williams.best.vwh.net/sunrise_sunset_algorithm.htm
//
// LICENSE
//
//   Copyright 2011 Preston Hunt <me@prestonhunt.com>
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
// DESCRIPTION
//
//   Provides sunrise and sunset times for specified date and position.
//   All dates are UTC.  Year is 4-digit.  Month is 1-12.  Day is 1-31.
//   Longitude is positive for east, negative for west. Latitude is
//   positive for north, negative for south.
//
// SAMPLE USAGE
//
//   var tokyo = new SunriseSunset( 2011, 1, 19, 35+40/60, 139+45/60); 
//   tokyo.sunriseUtcHours()      --> 21.8199 = 21:49 GMT
//   tokyo.sunsetUtcHours()       --> 7.9070  = 07:54 GMT
//   tokyo.sunriseLocalHours(9)   --> 6.8199  = 06:49 at GMT+9
//   tokyo.sunsunsetLocalHours(9) --> 16.9070 = 16:54 at GMT+9
//   tokyo.isDaylight(1.5)        --> true
//
//   var losangeles = new SunriseSunset( 2011, 1, 19, 34.05, -118.233333333 );
//   etc.

var SunriseSunset = function( utcFullYear, utcMonth, utcDay, latitude, longitude ) {
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
};

SunriseSunset.prototype = {
    sin: function( deg ) { return Math.sin( deg * Math.PI / 180 ); },
    cos: function( deg ) { return Math.cos( deg * Math.PI / 180 ); },
    tan: function( deg ) { return Math.tan( deg * Math.PI / 180 ); },
    asin: function( x ) { return (180/Math.PI) * Math.asin(x); },
    acos: function( x ) { return (180/Math.PI) * Math.acos(x); },
    atan: function( x ) { return (180/Math.PI) * Math.atan(x); },

    getDOY: function() {
        var month = this.utcMonth,
            year = this.utcFullYear,
            day = this.utcDay;

        var N1 = Math.floor( 275 * month / 9 );
        var N2 = Math.floor( (month + 9) / 12 );
        var N3 = (1 + Math.floor((year - 4 * Math.floor(year / 4 ) + 2) / 3));
        var N = N1 - (N2 * N3) + day - 30;
        return N;
    },

    approximateTime: function() {
        var doy = this.getDOY();
        if ( this.rising ) {
            return doy + ((6 - this.lngHour) / 24);
        } else {
            return doy + ((18 - this.lngHour) / 24);
        }
    },

    meanAnomaly: function() {
        var t = this.approximateTime();
        return (0.9856 * t) - 3.289;
    },

    trueLongitude: function() {
        var M = this.meanAnomaly();
        var L = M + (1.916 * this.sin(M)) + (0.020 * this.sin(2 * M)) + 282.634;
        return L % 360;
    },

    rightAscension: function() {
        var L = this.trueLongitude();
        var RA = this.atan(0.91764 * this.tan(L));
        RA %= 360;

        var Lquadrant  = (Math.floor( L/90)) * 90;
        var RAquadrant = (Math.floor(RA/90)) * 90;
        RA = RA + (Lquadrant - RAquadrant);
        RA /= 15;

        return RA;
    },

    sinDec: function() {
        var L = this.trueLongitude(),
            sinDec = 0.39782 * this.sin(L);

        return sinDec;
    },

    cosDec: function() {
        return this.cos(this.asin(this.sinDec()));
    },

    localMeanTime: function() {
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
    },

    hoursRange: function( h ) {
        return (h+24) % 24;
    },

    UTCTime: function() {
        var T = this.localMeanTime();
        var UT = T - this.lngHour;
        return this.hoursRange( UT );
        //if ( UT < 0 ) UT += 24;
        //return UT % 24;
    },

    sunriseUtcHours: function() {
        this.rising = true;
        return this.UTCTime();
    },

    sunsetUtcHours: function() {
        this.rising = false;
        return this.UTCTime();
    },

    sunriseLocalHours: function(gmt) {
        return this.hoursRange( gmt + this.sunriseUtcHours() );
    },

    sunsetLocalHours: function(gmt) {
        return this.hoursRange( gmt + this.sunsetUtcHours() );
    },

    isDaylight: function( utcCurrentHours ) {
        var sunriseHours = this.sunriseUtcHours(),
            sunsetHours = this.sunsetUtcHours();

        if ( sunsetHours < sunriseHours ) {
            // Either the sunrise or sunset time is for tomorrow
            if ( utcCurrentHours > sunriseHours ) {
                return true;
            } else if ( utcCurrentHours < sunsetHours ) {
                return true;
            } else {
                return false;
            }
        }

        if ( utcCurrentHours >= sunriseHours ) {
            return utcCurrentHours < sunsetHours;
        } 

        return false;
    }
};

function SunriseSunsetTest() {
    var testcases = {
        'Los Angeles': {
            'lat': 34.05, 'lon': -118.23333333,
            'tests': [ 
                { 'year': 2011, 'month': 1, 'day': 22, 'utcHours': 19.6666666, 'isDaylight': true }
            ]
        },
        'Berlin': {
            'lat': 52.5, 'lon': 13.366666667,
            'tests': [ 
                { 'year': 2011, 'month': 1, 'day': 25, 'utcHours': 1.25, 'isDaylight': false },
                { 'year': 2011, 'month': 2, 'day': 22, 'utcHours': 2.5, 'isDaylight': false }
            ]
        },
        'Tokyo': {
            'lat': 35+40/60, 'lon': 139+45/60,
            'tests': [ 
                { 'year': 2011, 'month': 1, 'day': 23, 'utcHours': 1.5, 'isDaylight': true },
                { 'year': 2011, 'month': 1, 'day': 23, 'utcHours': 22.5, 'isDaylight': true }
            ]
        },
        'Seoul': {
            'lat': 37.55, 'lon': 126.966666667,
            'tests': [ 
                { 'year': 2011, 'month': 4, 'day': 10, 'utcHours': 15+30/60, 'isDaylight': false }
            ]
        },
        'New Delhi': {
            'lat': 35+40/60, 'lon': 139+45/60,
            'tests': [ 
            ]
        },
        'Sydney': {
            'lat': -(33+55/60), 'lon': 151+17/60,
            'tests': [ 
                { 'year': 2011, 'month': 5, 'day': 1, 'utcHours': 17+53/60, 'isDaylight': false }
            ]
        },
        'Santiago': {
            'lat': -(33+26/60), 'lon': -(70+40/60),
            'tests': [ 
                { 'year': 2011, 'month': 5, 'day': 1, 'utcHours': 17+54/60, 'isDaylight': true }
            ]
        }
    };

    var tests_run = 0;
    var tests_failed = 0;

    for ( var city_name in testcases ) {
        var city = testcases[ city_name ];
        for ( var i=0; i<city.tests.length; i++ ) {
            var t = city.tests[i];
            var ss = new SunriseSunset( t.year, t.month, t.day, city.lat, city.lon );
            var expected = t.isDaylight;
            var result = ss.isDaylight( t.utcHours );
            var passed = result === expected;

            tests_run++;
            if ( ! passed ) tests_failed++;
            
            /*jsl:ignore*/
            print( city_name, t.year, t.month, t.day, t.utcHours, "passed:", passed );
            if ( ! passed ) {
                print( "sunriseUtcHours=" + ss.sunriseUtcHours() + 
                        ", sunsetUtcHours=" + ss.sunsetUtcHours() );
            }

            /*jsl:end*/
        }
    }

    /*jsl:ignore*/
    print( "tests: " + tests_run, "failed: " + tests_failed );
    /*jsl:end*/
}
var latlon = {
"America/Portland Oregon": [45.5235, -122.6762],
"America/Pacific Time": [34.05, -118.233333333], // Use Los Angeles
"Europe/Andorra":[42.5,1.51666666667],
"Asia/Dubai":[25.3,55.3],
"Asia/Kabul":[34.5166666667,69.2],
"America/Antigua":[17.05,-61.8],
"America/Anguilla":[18.2,-63.0666666667],
"Europe/Tirane":[41.3333333333,19.8333333333],
"Asia/Yerevan":[40.1833333333,44.5],
"America/Curacao":[12.1833333333,-69.0],
"Africa/Luanda":[-8.8,13.2333333333],
"Antarctica/McMurdo":[-77.8333333333,166.6],
"Antarctica/South Pole":[-90.0,0.0],
"Antarctica/Rothera":[-67.5666666667,-68.1333333333], "Antarctica/Palmer":[-64.8,-64.1], "Antarctica/Mawson":[-67.6,62.8833333333], "Antarctica/Davis":[-68.5833333333,77.9666666667], "Antarctica/Casey":[-66.2833333333,110.516666667], "Antarctica/Vostok":[-78.4,106.9], "Antarctica/DumontDUrville":[-66.6666666667,140.016666667], "Antarctica/Syowa":[-69.0,39.5833333333], "America/Argentina/Buenos Aires":[-34.6,-58.45], "America/Argentina/Cordoba":[-31.4,-64.1833333333], "America/Argentina/Jujuy":[-24.1833333333,-65.3], "America/Argentina/Tucuman":[-26.8166666667,-65.2166666667], "America/Argentina/Catamarca":[-28.4666666667,-65.7833333333], "America/Argentina/La Rioja":[-29.4333333333,-66.85], "America/Argentina/San Juan":[-31.5333333333,-68.5166666667], "America/Argentina/Mendoza":[-32.8833333333,-68.8166666667], "America/Argentina/Rio Gallegos":[-51.6333333333,-69.2166666667], "America/Argentina/Ushuaia":[-54.8,-68.3], "Pacific/Pago Pago":[-14.2666666667,-170.7], "Europe/Vienna":[48.2166666667,16.3333333333], "Australia/Lord Howe":[-31.55,159.083333333], "Australia/Hobart":[-42.8833333333,147.316666667], "Australia/Currie":[-39.9333333333,143.866666667], "Australia/Melbourne":[-37.8166666667,144.966666667], "Australia/Sydney":[-33.8666666667,151.216666667], "Australia/Broken Hill":[-31.95,141.45], "Australia/Brisbane":[-27.4666666667,153.033333333], "Australia/Lindeman":[-20.2666666667,149.0], "Australia/Adelaide":[-34.9166666667,138.583333333], "Australia/Darwin":[-12.4666666667,130.833333333], "Australia/Perth":[-31.95,115.85], "Australia/Eucla":[-31.7166666667,128.866666667], "America/Aruba":[12.5,-69.9666666667], "Europe/Mariehamn":[60.1,19.95], "Asia/Baku":[40.3833333333,49.85], "Europe/Sarajevo":[43.8666666667,18.4166666667], "America/Barbados":[13.1,-59.6166666667], "Asia/Dhaka":[23.7166666667,90.4166666667], "Europe/Brussels":[50.8333333333,4.33333333333], "Africa/Ouagadougou":[12.3666666667,-1.51666666667], "Europe/Sofia":[42.6833333333,23.3166666667], "Asia/Bahrain":[26.3833333333,50.5833333333], "Africa/Bujumbura":[-3.38333333333,29.3666666667], "Africa/Porto-Novo":[6.48333333333,2.61666666667], "America/St Barthelemy":[17.8833333333,-62.85], "Atlantic/Bermuda":[32.2833333333,-64.7666666667], "Asia/Brunei":[4.93333333333,114.916666667], "America/La Paz":[-16.5,-68.15], "America/Noronha":[-3.85,-32.4166666667], "America/Belem":[-1.45,-48.4833333333], "America/Fortaleza":[-3.71666666667,-38.5], "America/Recife":[-8.05,-34.9], "America/Araguaina":[-7.2,-48.2], "America/Maceio":[-9.66666666667,-35.7166666667], "America/Bahia":[-12.9833333333,-38.5166666667], "America/Sao Paulo":[-23.5333333333,-46.6166666667], "America/Campo Grande":[-20.45,-54.6166666667], "America/Cuiaba":[-15.5833333333,-56.0833333333], "America/Porto Velho":[-8.76666666667,-63.9], "America/Boa Vista":[2.81666666667,-60.6666666667], "America/Manaus":[-3.13333333333,-60.0166666667], "America/Eirunepe":[-6.66666666667,-69.8666666667], "America/Rio Branco":[-9.96666666667,-67.8], "America/Nassau":[25.0833333333,-77.35], "Asia/Thimphu":[27.4666666667,89.65], "Africa/Gaborone":[-25.75,25.9166666667], "Europe/Minsk":[53.9,27.5666666667], "America/Belize":[17.5,-88.2], "America/St Johns":[47.5666666667,-52.7166666667], "America/Halifax":[44.65,-63.6], "America/Glace Bay":[46.2,-59.95], "America/Moncton":[46.1,-64.7833333333], "America/Goose Bay":[53.3333333333,-60.4166666667], "America/Blanc-Sablon":[51.4166666667,-57.1166666667], "America/Montreal":[45.5166666667,-73.5666666667], "America/Toronto":[43.65,-79.3833333333], "America/Nipigon":[49.0166666667,-88.2666666667], "America/Thunder Bay":[48.3833333333,-89.25], "America/Iqaluit":[63.7333333333,-68.4666666667], "America/Pangnirtung":[66.1333333333,-65.7333333333], "America/Resolute":[74.6833333333,-94.8166666667], "America/Atikokan":[48.75,-91.6166666667], "America/Rankin Inlet":[62.8166666667,-92.0666666667], "America/Winnipeg":[49.8833333333,-97.15], "America/Rainy River":[48.7166666667,-94.5666666667], "America/Regina":[50.4,-104.65], "America/Swift Current":[50.2833333333,-107.833333333], "America/Edmonton":[53.55,-113.466666667], "America/Cambridge Bay":[69.1,-105.05], "America/Yellowknife":[62.45,-114.35], "America/Inuvik":[68.3333333333,-133.716666667], "America/Dawson Creek":[59.7666666667,-120.233333333], "America/Vancouver":[49.2666666667,-123.116666667], "America/Whitehorse":[60.7166666667,-135.05], "America/Dawson":[64.0666666667,-139.416666667], "Indian/Cocos":[-12.1666666667,96.9166666667], "Africa/Kinshasa":[-4.3,15.3], "Africa/Lubumbashi":[-11.6666666667,27.4666666667], "Africa/Bangui":[4.36666666667,18.5833333333], "Africa/Brazzaville":[-4.26666666667,15.2833333333], "Europe/Zurich":[47.3833333333,8.53333333333], "Africa/Abidjan":[5.31666666667,-4.03333333333], "Pacific/Rarotonga":[-21.2333333333,-159.766666667], "America/Santiago":[-33.45,-70.6666666667], "Pacific/Easter":[-27.15,-109.433333333], "Africa/Douala":[4.05,9.7], "Asia/Shanghai":[31.2333333333,121.466666667], "Asia/Harbin":[45.75,126.683333333], "Asia/Chongqing":[29.5666666667,106.583333333], "Asia/Urumqi":[43.8,87.5833333333], "Asia/Kashgar":[39.4833333333,75.9833333333], "America/Bogota":[4.6,-74.0833333333], "America/Costa Rica":[9.93333333333,-84.0833333333], "America/Havana":[23.1333333333,-82.3666666667], "Atlantic/Cape Verde":[14.9166666667,-23.5166666667], "Indian/Christmas":[-10.4166666667,105.716666667], "Asia/Nicosia":[35.1666666667,33.3666666667], "Europe/Prague":[50.0833333333,14.4333333333], "Europe/Berlin":[52.5,13.3666666667], "Africa/Djibouti":[11.6,43.15], "Europe/Copenhagen":[55.6666666667,12.5833333333], "America/Dominica":[15.3,-61.4], "America/Santo Domingo":[18.4666666667,-69.9], "Africa/Algiers":[36.7833333333,3.05], "America/Guayaquil":[-2.16666666667,-79.8333333333], "Pacific/Galapagos":[-0.9,-89.6], "Europe/Tallinn":[59.4166666667,24.75], "Africa/Cairo":[30.05,31.25], "Africa/El Aaiun":[27.15,-13.2], "Africa/Asmara":[15.3333333333,38.8833333333], "Europe/Madrid":[40.4,-3.68333333333], "Africa/Ceuta":[35.8833333333,-5.31666666667], "Atlantic/Canary":[28.1,-15.4], "Africa/Addis Ababa":[9.03333333333,38.7], "Europe/Helsinki":[60.1666666667,24.9666666667], "Pacific/Fiji":[-18.1333333333,178.416666667], "Atlantic/Stanley":[-51.7,-57.85], "Pacific/Truk":[7.41666666667,151.783333333], "Pacific/Ponape":[6.96666666667,158.216666667], "Pacific/Kosrae":[5.31666666667,162.983333333], "Atlantic/Faroe":[62.0166666667,-6.76666666667], "Europe/Paris":[48.8666666667,2.33333333333], "Africa/Libreville":[0.383333333333,9.45], "Europe/London":[51.5,-0.116666666667], "America/Grenada":[12.05,-61.75], "Asia/Tbilisi":[41.7166666667,44.8166666667], "America/Cayenne":[4.93333333333,-52.3333333333], "Europe/Guernsey":[49.45,-2.53333333333], "Africa/Accra":[5.55,-0.216666666667], "Europe/Gibraltar":[36.1333333333,-5.35], "America/Godthab":[64.1833333333,-51.7333333333], "America/Danmarkshavn":[76.7666666667,-18.6666666667], "America/Scoresbysund":[70.4833333333,-21.9666666667], "America/Thule":[76.5666666667,-68.7833333333], "Africa/Banjul":[13.4666666667,-16.65], "Africa/Conakry":[9.51666666667,-13.7166666667], "America/Guadeloupe":[16.2333333333,-61.5333333333], "Africa/Malabo":[3.75,8.78333333333], "Europe/Athens":[37.9666666667,23.7166666667], "Atlantic/South Georgia":[-54.2666666667,-36.5333333333], "America/Guatemala":[14.6333333333,-90.5166666667], "Pacific/Guam":[13.4666666667,144.75], "Africa/Bissau":[11.85,-15.5833333333], "America/Guyana":[6.8,-58.1666666667], "Asia/Hong Kong":[22.2833333333,114.15], "America/Tegucigalpa":[14.1,-87.2166666667], "Europe/Zagreb":[45.8,15.9666666667], "America/Port-au-Prince":[18.5333333333,-72.3333333333], "Europe/Budapest":[47.5,19.0833333333], "Asia/Jakarta":[-6.16666666667,106.8], "Asia/Pontianak":[-0.0333333333333,109.333333333], "Asia/Makassar":[-5.11666666667,119.4], "Asia/Jayapura":[-2.53333333333,140.7], "Europe/Dublin":[53.3333333333,-6.25], "Asia/Jerusalem":[31.7666666667,35.2333333333], "Europe/Isle of Man":[54.15,-4.46666666667],
"Asia/Calcutta":[22.5333333333,88.3666666667],
"Asia/Kolkata":[22.5333333333,88.3666666667],
"Asia/New Delhi":[22.5333333333,88.3666666667],
"Asia/India":[22.5333333333,88.3666666667],
"Asia/New Delhi":[28+35/60,77+12/60],
"Indian/Chagos":[-7.33333333333,72.4166666667], "Asia/Baghdad":[33.35,44.4166666667], "Asia/Tehran":[35.6666666667,51.4333333333], "Atlantic/Reykjavik":[64.15,-21.85], "Europe/Rome":[41.9,12.4833333333], "Europe/Jersey":[49.2,-2.11666666667], "America/Jamaica":[18.0,-76.8], "Asia/Amman":[31.95,35.9333333333], "Asia/Tokyo":[35.65,139.733333333], "Africa/Nairobi":[-1.28333333333,36.8166666667], "Asia/Bishkek":[42.9,74.6], "Asia/Phnom Penh":[11.55,104.916666667], "Pacific/Tarawa":[1.41666666667,173.0], "Pacific/Enderbury":[-3.13333333333,-171.083333333], "Pacific/Kiritimati":[1.86666666667,-157.333333333], "Indian/Comoro":[-11.6833333333,43.2666666667], "America/St Kitts":[17.3,-62.7166666667], "Asia/Pyongyang":[39.0166666667,125.75], "Asia/Seoul":[37.55,126.966666667], "Asia/Kuwait":[29.3333333333,47.9833333333], "America/Cayman":[19.3,-81.3833333333], "Asia/Almaty":[43.25,76.95], "Asia/Qyzylorda":[44.8,65.4666666667], "Asia/Aqtobe":[50.2833333333,57.1666666667], "Asia/Aqtau":[44.5166666667,50.2666666667], "Asia/Oral":[51.2166666667,51.35], "Asia/Vientiane":[17.9666666667,102.6], "Asia/Beirut":[33.8833333333,35.5], "America/St Lucia":[14.0166666667,-61.0], "Europe/Vaduz":[47.15,9.51666666667], "Asia/Colombo":[6.93333333333,79.85], "Africa/Monrovia":[6.3,-10.7833333333], "Africa/Maseru":[-29.4666666667,27.5], "Europe/Vilnius":[54.6833333333,25.3166666667], "Europe/Luxembourg":[49.6,6.15], "Europe/Riga":[56.95,24.1], "Africa/Tripoli":[32.9,13.1833333333], "Africa/Casablanca":[33.65,-7.58333333333], "Europe/Monaco":[43.7,7.38333333333], "Europe/Chisinau":[47.0,28.8333333333], "Europe/Podgorica":[42.4333333333,19.2666666667], "America/Marigot":[18.0666666667,-63.0833333333], "Indian/Antananarivo":[-18.9166666667,47.5166666667], "Pacific/Majuro":[7.15,171.2], "Pacific/Kwajalein":[9.08333333333,167.333333333], "Europe/Skopje":[41.9833333333,21.4333333333], "Africa/Bamako":[12.65,-8.0], "Asia/Rangoon":[16.7833333333,96.1666666667], "Asia/Ulaanbaatar":[47.9166666667,106.883333333], "Asia/Hovd":[48.0166666667,91.65], "Asia/Choibalsan":[48.0666666667,114.5], "Asia/Macau":[22.2333333333,113.583333333], "Pacific/Saipan":[15.2,145.75], "America/Martinique":[14.6,-61.0833333333], "Africa/Nouakchott":[18.1,-15.95], "America/Montserrat":[16.7166666667,-62.2166666667], "Europe/Malta":[35.9,14.5166666667], "Indian/Mauritius":[-20.1666666667,57.5], "Indian/Maldives":[4.16666666667,73.5], "Africa/Blantyre":[-15.7833333333,35.0], "America/Mexico City":[19.4,-99.15], "America/Cancun":[21.0833333333,-86.7666666667], "America/Merida":[20.9666666667,-89.6166666667], "America/Monterrey":[25.6666666667,-100.316666667], "America/Mazatlan":[23.2166666667,-106.416666667], "America/Chihuahua":[28.6333333333,-106.083333333], "America/Hermosillo":[29.0666666667,-110.966666667], "America/Tijuana":[32.5333333333,-117.016666667], "Asia/Kuala Lumpur":[3.16666666667,101.7], "Asia/Kuching":[1.55,110.333333333], "Africa/Maputo":[-25.9666666667,32.5833333333], "Africa/Windhoek":[-22.5666666667,17.1], "Pacific/Noumea":[-22.2666666667,165.5], "Africa/Niamey":[13.5166666667,2.11666666667], "Pacific/Norfolk":[-29.05,167.966666667], "Africa/Lagos":[6.45,3.4], "America/Managua":[12.15,-86.2833333333], "Europe/Amsterdam":[52.3666666667,4.9], "Europe/Oslo":[59.9166666667,10.75], "Asia/Katmandu":[27.7166666667,85.3166666667], "Pacific/Nauru":[-0.516666666667,166.916666667], "Pacific/Niue":[-19.0166666667,169.916666667], "Pacific/Auckland":[-36.8666666667,174.766666667], "Pacific/Chatham":[-43.95,-176.55], "Asia/Muscat":[23.6,58.5833333333], "America/Panama":[8.96666666667,-79.5333333333], "America/Lima":[-12.05,-77.05], "Pacific/Tahiti":[-17.5333333333,-149.566666667], "Pacific/Marquesas":[-9.0,-139.5], "Pacific/Gambier":[-23.1333333333,-134.95], "Pacific/Port Moresby":[-9.5,147.166666667], "Asia/Manila":[14.5833333333,121.0], "Asia/Karachi":[24.8666666667,67.05], "Europe/Warsaw":[52.25,21.0], "America/Miquelon":[47.05,-56.3333333333], "Pacific/Pitcairn":[-25.0666666667,-130.083333333], "America/Puerto Rico":[18.4666666667,-66.1], "Asia/Gaza":[31.5,34.4666666667], "Europe/Lisbon":[38.7166666667,-9.13333333333], "Atlantic/Madeira":[32.6333333333,-16.9], "Atlantic/Azores":[37.7333333333,-25.6666666667], "Pacific/Palau":[7.33333333333,134.483333333], "America/Asuncion":[-25.2666666667,-57.6666666667], "Asia/Qatar":[25.2833333333,51.5333333333], "Indian/Reunion":[-20.8666666667,55.4666666667], "Europe/Bucharest":[44.4333333333,26.1], "Europe/Belgrade":[44.8333333333,20.5], "Europe/Kaliningrad":[54.7166666667,20.5], "Europe/Moscow":[55.75,37.5833333333], "Europe/Volgograd":[48.7333333333,44.4166666667], "Europe/Samara":[53.2,50.15], "Asia/Yekaterinburg":[56.85,60.6], "Asia/Omsk":[55.0,73.4], "Asia/Novosibirsk":[55.0333333333,82.9166666667], "Asia/Krasnoyarsk":[56.0166666667,92.8333333333], "Asia/Irkutsk":[52.2666666667,104.333333333], "Asia/Yakutsk":[62.0,129.666666667], "Asia/Vladivostok":[43.1666666667,131.933333333], "Asia/Sakhalin":[46.9666666667,142.7], "Asia/Magadan":[59.5666666667,150.8], "Asia/Kamchatka":[53.0166666667,158.65], "Asia/Anadyr":[64.75,177.483333333], "Africa/Kigali":[-1.95,30.0666666667], "Asia/Riyadh":[24.6333333333,46.7166666667], "Pacific/Guadalcanal":[-9.53333333333,160.2], "Indian/Mahe":[-4.66666666667,55.4666666667], "Africa/Khartoum":[15.6,32.5333333333], "Europe/Stockholm":[59.3333333333,18.05], "Asia/Singapore":[1.28333333333,103.85], "Atlantic/St Helena":[-15.9166666667,-5.7], "Europe/Ljubljana":[46.05,14.5166666667], "Arctic/Longyearbyen":[78.0,16.0], "Europe/Bratislava":[48.15,17.1166666667], "Africa/Freetown":[8.5,-13.25], "Europe/San Marino":[43.9166666667,12.4666666667], "Africa/Dakar":[14.6666666667,-17.4333333333], "Africa/Mogadishu":[2.06666666667,45.3666666667], "America/Paramaribo":[5.83333333333,-55.1666666667], "Africa/Sao Tome":[0.333333333333,6.73333333333], "America/El Salvador":[13.7,-89.2], "Asia/Damascus":[33.5,36.3], "Africa/Mbabane":[-26.3,31.1], "America/Grand Turk":[21.4666666667,-71.1333333333], "Africa/Ndjamena":[12.1166666667,15.05], "Indian/Kerguelen":[-49.35,70.2166666667], "Africa/Lome":[6.13333333333,1.21666666667], "Asia/Bangkok":[13.75,100.516666667], "Asia/Dushanbe":[38.5833333333,68.8], "Pacific/Fakaofo":[-9.36666666667,-171.233333333], "Asia/Dili":[-8.55,125.583333333], "Asia/Ashgabat":[37.95,58.3833333333], "Africa/Tunis":[36.8,10.1833333333], "Pacific/Tongatapu":[-21.1666666667,175.166666667], "Europe/Istanbul":[41.0166666667,28.9666666667], "America/Port of Spain":[10.65,-61.5166666667], "Pacific/Funafuti":[-8.51666666667,179.216666667], "Asia/Taipei":[25.05,121.5], "Africa/Dar es Salaam":[-6.8,39.2833333333], "Europe/Kiev":[50.4333333333,30.5166666667], "Europe/Uzhgorod":[48.6166666667,22.3], "Europe/Zaporozhye":[47.8333333333,35.1666666667], "Europe/Simferopol":[44.95,34.1], "Africa/Kampala":[0.316666666667,32.4166666667], "Pacific/Johnston":[16.75,-169.516666667], "Pacific/Midway":[28.2166666667,-177.366666667], "Pacific/Wake":[19.2833333333,166.616666667], "America/New York":[40.7,-74.0], "America/Detroit":[42.3166666667,-83.0333333333], "America/Kentucky/Louisville":[38.25,-85.75], "America/Kentucky/Monticello":[36.8166666667,-84.8333333333], "America/Indiana/Indianapolis":[39.7666666667,-86.15], "America/Indiana/Vincennes":[38.6666666667,-87.5166666667], "America/Indiana/Knox":[41.2833333333,-86.6166666667], "America/Indiana/Winamac":[41.05,-86.6], "America/Indiana/Marengo":[38.3666666667,-86.3333333333], "America/Indiana/Vevay":[38.7333333333,-85.0666666667], "America/Chicago":[41.85,-87.65], "America/Indiana/Tell City":[37.95,-86.75], "America/Indiana/Petersburg":[38.4833333333,-87.2666666667], "America/Menominee":[45.1,-87.6], "America/North Dakota/Center":[47.1,-101.283333333], "America/North Dakota/New Salem":[46.8333333333,-101.4], "America/Denver":[39.7333333333,-104.983333333], "America/Boise":[43.6,-116.2], "America/Shiprock":[36.7833333333,-108.683333333], "America/Phoenix":[33.4333333333,-112.066666667], 
"America/Los Angeles":[34.05,-118.233333333],
"America/Anchorage":[61.2166666667,-149.9], "America/Juneau":[58.3,-134.416666667], "America/Yakutat":[59.5333333333,-139.716666667], "America/Nome":[64.5,-165.4], "America/Adak":[51.8666666667,-176.65], "Pacific/Honolulu":[21.3,-157.85], "America/Montevideo":[-34.8833333333,-56.1833333333], "Asia/Samarkand":[39.6666666667,66.8], "Asia/Tashkent":[41.3333333333,69.3], "Europe/Vatican":[41.9,12.45], "America/St Vincent":[13.15,-61.2333333333], "America/Caracas":[10.5,-66.9333333333], "America/Tortola":[18.45,-64.6166666667], "America/St Thomas":[18.35,-64.9333333333], "Asia/Saigon":[10.75,106.666666667], "Pacific/Efate":[-17.6666666667,168.416666667], "Pacific/Wallis":[-13.3,-176.166666667], "Pacific/Apia":[-13.8333333333,-171.733333333], "Asia/Aden":[12.75,45.2], "Indian/Mayotte":[-12.7833333333,45.2333333333], "Africa/Johannesburg":[-26.25,28.0], "Africa/Lusaka":[-15.4166666667,28.2833333333], "Africa/Harare":[-17.8333333333,31.05] };
/*
Pure Javascript implementation of Uniforum message translation.
Copyright (C) 2008 Joshua I. Miller <unrtst@cpan.org>, all rights reserved

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU Library General Public License as published
by the Free Software Foundation; either version 2, or (at your option)
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Library General Public License for more details.

You should have received a copy of the GNU Library General Public
License along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307,
USA.

=head1 NAME

Javascript Gettext - Javascript implemenation of GNU Gettext API.

=head1 SYNOPSIS

 // //////////////////////////////////////////////////////////
 // Optimum caching way
 <script language="javascript" src="/path/LC_MESSAGES/myDomain.json"></script>
 <script language="javascript" src="/path/Gettext.js'></script>

 // assuming myDomain.json defines variable json_locale_data
 var params = {  "domain" : "myDomain",
                 "locale_data" : json_locale_data
              };
 var gt = new Gettext(params);
 // create a shortcut if you'd like
 function _ (msgid) { return gt.gettext(msgid); }
 alert(_("some string"));
 // or use fully named method
 alert(gt.gettext("some string"));
 // change to use a different "domain"
 gt.textdomain("anotherDomain");
 alert(gt.gettext("some string"));


 // //////////////////////////////////////////////////////////
 // The other way to load the language lookup is a "link" tag
 // Downside is that not all browsers cache XMLHttpRequests the
 // same way, so caching of the language data isn't guarenteed
 // across page loads.
 // Upside is that it's easy to specify multiple files
 <link rel="gettext" href="/path/LC_MESSAGES/myDomain.json" />
 <script language="javascript" src="/path/Gettext.js'></script>

 var gt = new Gettext({ "domain" : "myDomain" });
 // rest is the same


 // //////////////////////////////////////////////////////////
 // The reson the shortcuts aren't exported by default is because they'd be
 // glued to the single domain you created. So, if you're adding i18n support
 // to some js library, you should use it as so:

 if (typeof(MyNamespace) == 'undefined') MyNamespace = {};
 MyNamespace.MyClass = function () {
     var gtParms = { "domain" : 'MyNamespace_MyClass' };
     this.gt = new Gettext(gtParams);
     return this;
 };
 MyNamespace.MyClass.prototype._ = function (msgid) {
     return this.gt.gettext(msgid);
 };
 MyNamespace.MyClass.prototype.something = function () {
     var myString = this._("this will get translated");
 };

 // //////////////////////////////////////////////////////////
 // Adding the shortcuts to a global scope is easier. If that's
 // ok in your app, this is certainly easier.
 var myGettext = new Gettext({ 'domain' : 'myDomain' });
 function _ (msgid) {
     return myGettext.gettext(msgid);
 }
 alert( _("text") );

 // //////////////////////////////////////////////////////////
 // Data structure of the json data
 // NOTE: if you're loading via the <script> tag, you can only
 // load one file, but it can contain multiple domains.
 var json_locale_data = {
     "MyDomain" : {
         "" : {
             "header_key" : "header value",
             "header_key" : "header value",
         "msgid" : [ "msgid_plural", "msgstr", "msgstr_plural", "msgstr_pluralN" ],
         "msgctxt\004msgid" : [ null, "msgstr" ],
         },
     "AnotherDomain" : {
         },
     }

=head1 DESCRIPTION

This is a javascript implementation of GNU Gettext, providing internationalization support for javascript. It differs from existing javascript implementations in that it will support all current Gettext features (ex. plural and context support), and will also support loading language catalogs from .mo, .po, or preprocessed json files (converter included).

The locale initialization differs from that of GNU Gettext / POSIX. Rather than setting the category, domain, and paths, and letting the libs find the right file, you must explicitly load the file at some point. The "domain" will still be honored. Future versions may be expanded to include support for set_locale like features.


=head1 INSTALL

To install this module, simply copy the file lib/Gettext.js to a web accessable location, and reference it from your application.


=head1 CONFIGURATION

Configure in one of two ways:

=over

=item 1. Optimal. Load language definition from statically defined json data.

    <script language="javascript" src="/path/locale/domain.json"></script>

    // in domain.json
    json_locale_data = {
        "mydomain" : {
            // po header fields
            "" : {
                "plural-forms" : "...",
                "lang" : "en",
                },
            // all the msgid strings and translations
            "msgid" : [ "msgid_plural", "translation", "plural_translation" ],
        },
    };
    // please see the included bin/po2json script for the details on this format

This method also allows you to use unsupported file formats, so long as you can parse them into the above format.

=item 2. Use AJAX to load language file.

Use XMLHttpRequest (actually, SJAX - syncronous) to load an external resource.

Supported external formats are:

=over

=item * Javascript Object Notation (.json)

(see bin/po2json)

    type=application/json

=item * Uniforum Portable Object (.po)

(see GNU Gettext's xgettext)

    type=application/x-po

=item * Machine Object (compiled .po) (.mo)

NOTE: .mo format isn't actually supported just yet, but support is planned.

(see GNU Gettext's msgfmt)

    type=application/x-mo

=back

=back

=head1 METHODS

The following methods are implemented:

  new Gettext(args)
  textdomain  (domain)
  gettext     (msgid)
  dgettext    (domainname, msgid)
  dcgettext   (domainname, msgid, LC_MESSAGES)
  ngettext    (msgid, msgid_plural, count)
  dngettext   (domainname, msgid, msgid_plural, count)
  dcngettext  (domainname, msgid, msgid_plural, count, LC_MESSAGES)
  pgettext    (msgctxt, msgid)
  dpgettext   (domainname, msgctxt, msgid)
  dcpgettext  (domainname, msgctxt, msgid, LC_MESSAGES)
  npgettext   (msgctxt, msgid, msgid_plural, count)
  dnpgettext  (domainname, msgctxt, msgid, msgid_plural, count)
  dcnpgettext (domainname, msgctxt, msgid, msgid_plural, count, LC_MESSAGES)
  strargs     (string, args_array)


=head2 new Gettext (args)

Several methods of loading locale data are included. You may specify a plugin or alternative method of loading data by passing the data in as the "locale_data" option. For example:

    var get_locale_data = function () {
        // plugin does whatever to populate locale_data
        return locale_data;
    };
    var gt = new Gettext( 'domain' : 'messages',
                          'locale_data' : get_locale_data() );

The above can also be used if locale data is specified in a statically included <SCRIPT> tag. Just specify the variable name in the call to new. Ex:

    var gt = new Gettext( 'domain' : 'messages',
                          'locale_data' : json_locale_data_variable );

Finally, you may load the locale data by referencing it in a <LINK> tag. Simply exclude the 'locale_data' option, and all <LINK rel="gettext" ...> items will be tried. The <LINK> should be specified as:

    <link rel="gettext" type="application/json" href="/path/to/file.json">
    <link rel="gettext" type="text/javascript"  href="/path/to/file.json">
    <link rel="gettext" type="application/x-po" href="/path/to/file.po">
    <link rel="gettext" type="application/x-mo" href="/path/to/file.mo">

args:

=over

=item domain

The Gettext domain, not www.whatev.com. It's usually your applications basename. If the .po file was "myapp.po", this would be "myapp".

=item locale_data

Raw locale data (in json structure). If specified, from_link data will be ignored.

=back

=cut

*/

Gettext = function (args) {
    this.domain         = 'messages';
    // locale_data will be populated from <link...> if not specified in args
    this.locale_data    = undefined;

    // set options
    var options = [ "domain", "locale_data" ];
    if (this.isValidObject(args)) {
        for (var i in args) {
            for (var j=0; j<options.length; j++) {
                if (i == options[j]) {
                    // don't set it if it's null or undefined
                    if (this.isValidObject(args[i]))
                        this[i] = args[i];
                }
            }
        }
    }

    // try to load the lang file from somewhere
    this.try_load_lang();

    return this;
}

Gettext.context_glue = "\004";
Gettext._locale_data = {};

Gettext.prototype.try_load_lang = function() {
    // check to see if language is statically included
    if (typeof(this.locale_data) != 'undefined') {
        // we're going to reformat it, and overwrite the variable
        var locale_copy = this.locale_data;
        this.locale_data = undefined;
        this.parse_locale_data(locale_copy);

        if (typeof(Gettext._locale_data[this.domain]) == 'undefined') {
            throw new Error("Error: Gettext 'locale_data' does not contain the domain '"+this.domain+"'");
        }

        return;
    }


    // try loading from JSON
    // get lang links
    var lang_link = this.get_lang_refs();

    if (typeof(lang_link) == 'object' && lang_link.length > 0) {
        // NOTE: there will be a delay here, as this is async.
        // So, any i18n calls made right after page load may not
        // get translated.
        // XXX: we may want to see if we can "fix" this behavior
        for (var i=0; i<lang_link.length; i++) {
            var link = lang_link[i];
            if (link.type == 'application/json') {
                if (! this.try_load_lang_json(link.href) ) {
                    throw new Error("Error: Gettext 'try_load_lang_json' failed. Unable to exec xmlhttprequest for link ["+link.href+"]");
                }
            } else if (link.type == 'application/x-po') {
                if (! this.try_load_lang_po(link.href) ) {
                    throw new Error("Error: Gettext 'try_load_lang_po' failed. Unable to exec xmlhttprequest for link ["+link.href+"]");
                }
            } else {
                // TODO: implement the other types (.mo)
                throw new Error("TODO: link type ["+link.type+"] found, and support is planned, but not implemented at this time.");
            }
        }
    }
};

// This takes the bin/po2json'd data, and moves it into an internal form
// for use in our lib, and puts it in our object as:
//  Gettext._locale_data = {
//      domain : {
//          head : { headfield : headvalue },
//          msgs : {
//              msgid : [ msgid_plural, msgstr, msgstr_plural ],
//          },
Gettext.prototype.parse_locale_data = function(locale_data) {
    if (typeof(Gettext._locale_data) == 'undefined') {
        Gettext._locale_data = { };
    }

    // suck in every domain defined in the supplied data
    for (var domain in locale_data) {
        // skip empty specs (flexibly)
        if ((! locale_data.hasOwnProperty(domain)) || (! this.isValidObject(locale_data[domain])))
            continue;
        // skip if it has no msgid's
        var has_msgids = false;
        for (var msgid in locale_data[domain]) {
            has_msgids = true;
            break;
        }
        if (! has_msgids) continue;

        // grab shortcut to data
        var data = locale_data[domain];

        // if they specifcy a blank domain, default to "messages"
        if (domain == "") domain = "messages";
        // init the data structure
        if (! this.isValidObject(Gettext._locale_data[domain]) )
            Gettext._locale_data[domain] = { };
        if (! this.isValidObject(Gettext._locale_data[domain].head) )
            Gettext._locale_data[domain].head = { };
        if (! this.isValidObject(Gettext._locale_data[domain].msgs) )
            Gettext._locale_data[domain].msgs = { };

        for (var key in data) {
            if (key == "") {
                var header = data[key];
                for (var head in header) {
                    var h = head.toLowerCase();
                    Gettext._locale_data[domain].head[h] = header[head];
                }
            } else {
                Gettext._locale_data[domain].msgs[key] = data[key];
            }
        }
    }

    // build the plural forms function
    for (var domain in Gettext._locale_data) {
        if (this.isValidObject(Gettext._locale_data[domain].head['plural-forms']) &&
            typeof(Gettext._locale_data[domain].head.plural_func) == 'undefined') {
            // untaint data
            var plural_forms = Gettext._locale_data[domain].head['plural-forms'];
            var pf_re = new RegExp('^(\\s*nplurals\\s*=\\s*[0-9]+\\s*;\\s*plural\\s*=\\s*(?:\\s|[-\\?\\|&=!<>+*/%:;a-zA-Z0-9_\(\)])+)', 'm');
            if (pf_re.test(plural_forms)) {
                //ex english: "Plural-Forms: nplurals=2; plural=(n != 1);\n"
                //pf = "nplurals=2; plural=(n != 1);";
                //ex russian: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10< =4 && (n%100<10 or n%100>=20) ? 1 : 2)
                //pf = "nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)";

                var pf = Gettext._locale_data[domain].head['plural-forms'];
                if (! /;\s*$/.test(pf)) pf = pf.concat(';');
                /* We used to use eval, but it seems IE has issues with it.
                 * We now use "new Function", though it carries a slightly
                 * bigger performance hit.
                var code = 'function (n) { var plural; var nplurals; '+pf+' return { "nplural" : nplurals, "plural" : (plural === true ? 1 : plural ? plural : 0) }; };';
                Gettext._locale_data[domain].head.plural_func = eval("("+code+")");
                */
                var code = 'var plural; var nplurals; '+pf+' return { "nplural" : nplurals, "plural" : (plural === true ? 1 : plural ? plural : 0) };';
                Gettext._locale_data[domain].head.plural_func = new Function("n", code);
            } else {
                throw new Error("Syntax error in language file. Plural-Forms header is invalid ["+plural_forms+"]");
            }   

        // default to english plural form
        } else if (typeof(Gettext._locale_data[domain].head.plural_func) == 'undefined') {
            Gettext._locale_data[domain].head.plural_func = function (n) {
                var p = (n != 1) ? 1 : 0;
                return { 'nplural' : 2, 'plural' : p };
                };
        } // else, plural_func already created
    }

    return;
};


// try_load_lang_po : do an ajaxy call to load in the .po lang defs
Gettext.prototype.try_load_lang_po = function(uri) {
    var data = this.sjax(uri);
    if (! data) return;

    var domain = this.uri_basename(uri);
    var parsed = this.parse_po(data);

    var rv = {};
    // munge domain into/outof header
    if (parsed) {
        if (! parsed[""]) parsed[""] = {};
        if (! parsed[""]["domain"]) parsed[""]["domain"] = domain;
        domain = parsed[""]["domain"];
        rv[domain] = parsed;

        this.parse_locale_data(rv);
    }

    return 1;
};

Gettext.prototype.uri_basename = function(uri) {
    var rv;
    if (rv = uri.match(/^(.*\/)?(.*)/)) {
        var ext_strip;
        if (ext_strip = rv[2].match(/^(.*)\..+$/))
            return ext_strip[1];
        else
            return rv[2];
    } else {
        return "";
    }
};

Gettext.prototype.parse_po = function(data) {
    var rv = {};
    var buffer = {};
    var lastbuffer = "";
    var errors = [];
    var lines = data.split("\n");
    for (var i=0; i<lines.length; i++) {
        // chomp
        lines[i] = lines[i].replace(/(\n|\r)+$/, '');

        var match;

        // Empty line / End of an entry.
        if (/^$/.test(lines[i])) {
            if (typeof(buffer['msgid']) != 'undefined') {
                var msg_ctxt_id = (typeof(buffer['msgctxt']) != 'undefined' &&
                                   buffer['msgctxt'].length) ?
                                  buffer['msgctxt']+Gettext.context_glue+buffer['msgid'] :
                                  buffer['msgid'];
                var msgid_plural = (typeof(buffer['msgid_plural']) != 'undefined' &&
                                    buffer['msgid_plural'].length) ?
                                   buffer['msgid_plural'] :
                                   null;

                // find msgstr_* translations and push them on
                var trans = [];
                for (var str in buffer) {
                    var match;
                    if (match = str.match(/^msgstr_(\d+)/))
                        trans[parseInt(match[1])] = buffer[str];
                }
                trans.unshift(msgid_plural);

                // only add it if we've got a translation
                // NOTE: this doesn't conform to msgfmt specs
                if (trans.length > 1) rv[msg_ctxt_id] = trans;

                buffer = {};
                lastbuffer = "";
            }

        // comments
        } else if (/^#/.test(lines[i])) {
            continue;

        // msgctxt
        } else if (match = lines[i].match(/^msgctxt\s+(.*)/)) {
            lastbuffer = 'msgctxt';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

        // msgid
        } else if (match = lines[i].match(/^msgid\s+(.*)/)) {
            lastbuffer = 'msgid';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

        // msgid_plural
        } else if (match = lines[i].match(/^msgid_plural\s+(.*)/)) {
            lastbuffer = 'msgid_plural';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

        // msgstr
        } else if (match = lines[i].match(/^msgstr\s+(.*)/)) {
            lastbuffer = 'msgstr_0';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

        // msgstr[0] (treak like msgstr)
        } else if (match = lines[i].match(/^msgstr\[0\]\s+(.*)/)) {
            lastbuffer = 'msgstr_0';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

        // msgstr[n]
        } else if (match = lines[i].match(/^msgstr\[(\d+)\]\s+(.*)/)) {
            lastbuffer = 'msgstr_'+match[1];
            buffer[lastbuffer] = this.parse_po_dequote(match[2]);

        // continued string
        } else if (/^"/.test(lines[i])) {
            buffer[lastbuffer] += this.parse_po_dequote(lines[i]);

        // something strange
        } else {
            errors.push("Strange line ["+i+"] : "+lines[i]);
        }
    }


    // handle the final entry
    if (typeof(buffer['msgid']) != 'undefined') {
        var msg_ctxt_id = (typeof(buffer['msgctxt']) != 'undefined' &&
                           buffer['msgctxt'].length) ?
                          buffer['msgctxt']+Gettext.context_glue+buffer['msgid'] :
                          buffer['msgid'];
        var msgid_plural = (typeof(buffer['msgid_plural']) != 'undefined' &&
                            buffer['msgid_plural'].length) ?
                           buffer['msgid_plural'] :
                           null;

        // find msgstr_* translations and push them on
        var trans = [];
        for (var str in buffer) {
            var match;
            if (match = str.match(/^msgstr_(\d+)/))
                trans[parseInt(match[1])] = buffer[str];
        }
        trans.unshift(msgid_plural);

        // only add it if we've got a translation
        // NOTE: this doesn't conform to msgfmt specs
        if (trans.length > 1) rv[msg_ctxt_id] = trans;

        buffer = {};
        lastbuffer = "";
    }


    // parse out the header
    if (rv[""] && rv[""][1]) {
        var cur = {};
        var hlines = rv[""][1].split(/\\n/);
        for (var i=0; i<hlines.length; i++) {
            if (! hlines.length) continue;

            var pos = hlines[i].indexOf(':', 0);
            if (pos != -1) {
                var key = hlines[i].substring(0, pos);
                var val = hlines[i].substring(pos +1);
                var keylow = key.toLowerCase();

                if (cur[keylow] && cur[keylow].length) {
                    errors.push("SKIPPING DUPLICATE HEADER LINE: "+hlines[i]);
                } else if (/#-#-#-#-#/.test(keylow)) {
                    errors.push("SKIPPING ERROR MARKER IN HEADER: "+hlines[i]);
                } else {
                    // remove begining spaces if any
                    val = val.replace(/^\s+/, '');
                    cur[keylow] = val;
                }

            } else {
                errors.push("PROBLEM LINE IN HEADER: "+hlines[i]);
                cur[hlines[i]] = '';
            }
        }

        // replace header string with assoc array
        rv[""] = cur;
    } else {
        rv[""] = {};
    }

    // TODO: XXX: if there are errors parsing, what do we want to do?
    // GNU Gettext silently ignores errors. So will we.
    // alert( "Errors parsing po file:\n" + errors.join("\n") );

    return rv;
};


Gettext.prototype.parse_po_dequote = function(str) {
    var match;
    if (match = str.match(/^"(.*)"/)) {
        str = match[1];
    }
    str = str.replace(/\\"/, "");
    return str;
};


// try_load_lang_json : do an ajaxy call to load in the lang defs
Gettext.prototype.try_load_lang_json = function(uri) {
    var data = this.sjax(uri);
    if (! data) return;

    var rv = this.JSON(data);
    this.parse_locale_data(rv);

    return 1;
};

// this finds all <link> tags, filters out ones that match our
// specs, and returns a list of hashes of those
Gettext.prototype.get_lang_refs = function() {
    var langs = new Array();
    var links = document.getElementsByTagName("link");
    // find all <link> tags in dom; filter ours
    for (var i=0; i<links.length; i++) {
        if (links[i].rel == 'gettext' && links[i].href) {
            if (typeof(links[i].type) == 'undefined' ||
                links[i].type == '') {
                if (/\.json$/i.test(links[i].href)) {
                    links[i].type = 'application/json';
                } else if (/\.js$/i.test(links[i].href)) {
                    links[i].type = 'application/json';
                } else if (/\.po$/i.test(links[i].href)) {
                    links[i].type = 'application/x-po';
                } else if (/\.mo$/i.test(links[i].href)) {
                    links[i].type = 'application/x-mo';
                } else {
                    throw new Error("LINK tag with rel=gettext found, but the type and extension are unrecognized.");
                }
            }

            links[i].type = links[i].type.toLowerCase();
            if (links[i].type == 'application/json') {
                links[i].type = 'application/json';
            } else if (links[i].type == 'text/javascript') {
                links[i].type = 'application/json';
            } else if (links[i].type == 'application/x-po') {
                links[i].type = 'application/x-po';
            } else if (links[i].type == 'application/x-mo') {
                links[i].type = 'application/x-mo';
            } else {
                throw new Error("LINK tag with rel=gettext found, but the type attribute ["+links[i].type+"] is unrecognized.");
            }

            langs.push(links[i]);
        }
    }
    return langs;
};


/*

=head2 textdomain( domain )

Set domain for future gettext() calls

A  message  domain  is  a  set of translatable msgid messages. Usually,
every software package has its own message domain. The domain  name  is
used to determine the message catalog where a translation is looked up;
it must be a non-empty string.

The current message domain is used by the gettext, ngettext, pgettext,
npgettext functions, and by the dgettext, dcgettext, dngettext, dcngettext,
dpgettext, dcpgettext, dnpgettext and dcnpgettext functions when called
with a NULL domainname argument.

If domainname is not NULL, the current message domain is set to
domainname.

If domainname is undefined, null, or empty string, the function returns
the current message domain.

If  successful,  the  textdomain  function  returns the current message
domain, after possibly changing it. (ie. if you set a new domain, the 
value returned will NOT be the previous domain).

=cut

*/
Gettext.prototype.textdomain = function (domain) {
    if (domain && domain.length) this.domain = domain;
    return this.domain;
}

/*

=head2 gettext( MSGID )

Returns the translation for B<MSGID>.  Example:

    alert( gt.gettext("Hello World!\n") );

If no translation can be found, the unmodified B<MSGID> is returned,
i. e. the function can I<never> fail, and will I<never> mess up your
original message.

One common mistake is to interpolate a variable into the string like this:

  var translated = gt.gettext("Hello " + full_name);

The interpolation will happen before it's passed to gettext, and it's 
unlikely you'll have a translation for every "Hello Tom" and "Hello Dick"
and "Hellow Harry" that may arise.

Use C<strargs()> (see below) to solve this problem:

  var translated = Gettext.strargs( gt.gettext("Hello %1"), [full_name] );

This is espeically useful when multiple replacements are needed, as they 
may not appear in the same order within the translation. As an English to
French example:

  Expected result: "This is the red ball"
  English: "This is the %1 %2"
  French:  "C'est le %2 %1"
  Code: Gettext.strargs( gt.gettext("This is the %1 %2"), ["red", "ball"] );

(The example is stupid because neither color nor thing will get
translated here ...).

=head2 dgettext( TEXTDOMAIN, MSGID )

Like gettext(), but retrieves the message for the specified 
B<TEXTDOMAIN> instead of the default domain.  In case you wonder what
a textdomain is, see above section on the textdomain() call.

=head2 dcgettext( TEXTDOMAIN, MSGID, CATEGORY )

Like dgettext() but retrieves the message from the specified B<CATEGORY>
instead of the default category C<LC_MESSAGES>.

NOTE: the categories are really useless in javascript context. This is
here for GNU Gettext API compatability. In practice, you'll never need
to use this. This applies to all the calls including the B<CATEGORY>.


=head2 ngettext( MSGID, MSGID_PLURAL, COUNT )

Retrieves the correct translation for B<COUNT> items.  In legacy software
you will often find something like:

    alert( count + " file(s) deleted.\n" );

or

    printf(count + " file%s deleted.\n", $count == 1 ? '' : 's');

I<NOTE: javascript lacks a builtin printf, so the above isn't a working example>

The first example looks awkward, the second will only work in English
and languages with similar plural rules.  Before ngettext() was introduced,
the best practice for internationalized programs was:

    if (count == 1) {
        alert( gettext("One file deleted.\n") );
    } else {
        printf( gettext("%d files deleted.\n"), count );
    }

This is a nuisance for the programmer and often still not sufficient
for an adequate translation.  Many languages have completely different
ideas on numerals.  Some (French, Italian, ...) treat 0 and 1 alike,
others make no distinction at all (Japanese, Korean, Chinese, ...),
others have two or more plural forms (Russian, Latvian, Czech,
Polish, ...).  The solution is:

    printf( ngettext("One file deleted.\n",
                     "%d files deleted.\n",
                     count), // argument to ngettext!
            count);          // argument to printf!

In English, or if no translation can be found, the first argument
(B<MSGID>) is picked if C<count> is one, the second one otherwise.
For other languages, the correct plural form (of 1, 2, 3, 4, ...)
is automatically picked, too.  You don't have to know anything about
the plural rules in the target language, ngettext() will take care
of that.

This is most of the time sufficient but you will have to prove your
creativity in cases like

    "%d file(s) deleted, and %d file(s) created.\n"

That said, javascript lacks C<printf()> support. Supplied with Gettext.js
is the C<strargs()> method, which can be used for these cases:

    Gettext.strargs( gt.ngettext( "One file deleted.\n",
                                  "%d files deleted.\n",
                                  count), // argument to ngettext!
                     count); // argument to strargs!

NOTE: the variable replacement isn't done for you, so you must
do it yourself as in the above.

=head2 dngettext( TEXTDOMAIN, MSGID, MSGID_PLURAL, COUNT )

Like ngettext() but retrieves the translation from the specified
textdomain instead of the default domain.

=head2 dcngettext( TEXTDOMAIN, MSGID, MSGID_PLURAL, COUNT, CATEGORY )

Like dngettext() but retrieves the translation from the specified
category, instead of the default category C<LC_MESSAGES>.


=head2 pgettext( MSGCTXT, MSGID )

Returns the translation of MSGID, given the context of MSGCTXT.

Both items are used as a unique key into the message catalog.

This allows the translator to have two entries for words that may
translate to different foreign words based on their context. For
example, the word "View" may be a noun or a verb, which may be
used in a menu as File->View or View->Source.

    alert( pgettext( "Verb: To View", "View" ) );
    alert( pgettext( "Noun: A View", "View"  ) );

The above will both lookup different entries in the message catalog.

In English, or if no translation can be found, the second argument
(B<MSGID>) is returned.

=head2 dpgettext( TEXTDOMAIN, MSGCTXT, MSGID )

Like pgettext(), but retrieves the message for the specified 
B<TEXTDOMAIN> instead of the default domain.

=head2 dcpgettext( TEXTDOMAIN, MSGCTXT, MSGID, CATEGORY )

Like dpgettext() but retrieves the message from the specified B<CATEGORY>
instead of the default category C<LC_MESSAGES>.


=head2 npgettext( MSGCTXT, MSGID, MSGID_PLURAL, COUNT )

Like ngettext() with the addition of context as in pgettext().

In English, or if no translation can be found, the second argument
(MSGID) is picked if B<COUNT> is one, the third one otherwise.

=head2 dnpgettext( TEXTDOMAIN, MSGCTXT, MSGID, MSGID_PLURAL, COUNT )

Like npgettext() but retrieves the translation from the specified
textdomain instead of the default domain.

=head2 dcnpgettext( TEXTDOMAIN, MSGCTXT, MSGID, MSGID_PLURAL, COUNT, CATEGORY )

Like dnpgettext() but retrieves the translation from the specified
category, instead of the default category C<LC_MESSAGES>.

=cut

*/

// gettext
Gettext.prototype.gettext = function (msgid) {
    var msgctxt;
    var msgid_plural;
    var n;
    var category;
    return this.dcnpgettext(null, msgctxt, msgid, msgid_plural, n, category);
};

Gettext.prototype.dgettext = function (domain, msgid) {
    var msgctxt;
    var msgid_plural;
    var n;
    var category;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

Gettext.prototype.dcgettext = function (domain, msgid, category) {
    var msgctxt;
    var msgid_plural;
    var n;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

// ngettext
Gettext.prototype.ngettext = function (msgid, msgid_plural, n) {
    var msgctxt;
    var category;
    return this.dcnpgettext(null, msgctxt, msgid, msgid_plural, n, category);
};

Gettext.prototype.dngettext = function (domain, msgid, msgid_plural, n) {
    var msgctxt;
    var category;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

Gettext.prototype.dcngettext = function (domain, msgid, msgid_plural, n, category) {
    var msgctxt;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category, category);
};

// pgettext
Gettext.prototype.pgettext = function (msgctxt, msgid) {
    var msgid_plural;
    var n;
    var category;
    return this.dcnpgettext(null, msgctxt, msgid, msgid_plural, n, category);
};

Gettext.prototype.dpgettext = function (domain, msgctxt, msgid) {
    var msgid_plural;
    var n;
    var category;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

Gettext.prototype.dcpgettext = function (domain, msgctxt, msgid, category) {
    var msgid_plural;
    var n;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

// npgettext
Gettext.prototype.npgettext = function (msgctxt, msgid, msgid_plural, n) {
    var category;
    return this.dcnpgettext(null, msgctxt, msgid, msgid_plural, n, category);
};

Gettext.prototype.dnpgettext = function (domain, msgctxt, msgid, msgid_plural, n) {
    var category;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

// this has all the options, so we use it for all of them.
Gettext.prototype.dcnpgettext = function (domain, msgctxt, msgid, msgid_plural, n, category) {
    if (! this.isValidObject(msgid)) return '';

    var plural = this.isValidObject(msgid_plural);
    var msg_ctxt_id = this.isValidObject(msgctxt) ? msgctxt+Gettext.context_glue+msgid : msgid;

    var domainname = this.isValidObject(domain)      ? domain :
                     this.isValidObject(this.domain) ? this.domain :
                                                       'messages';

    // category is always LC_MESSAGES. We ignore all else
    var category_name = 'LC_MESSAGES';
    var category = 5;

    var locale_data = new Array();
    if (typeof(Gettext._locale_data) != 'undefined' &&
        this.isValidObject(Gettext._locale_data[domainname])) {
        locale_data.push( Gettext._locale_data[domainname] );

    } else if (typeof(Gettext._locale_data) != 'undefined') {
        // didn't find domain we're looking for. Search all of them.
        for (var dom in Gettext._locale_data) {
            locale_data.push( Gettext._locale_data[dom] );
        }
    }

    var trans = [];
    var found = false;
    var domain_used; // so we can find plural-forms if needed
    if (locale_data.length) {
        for (var i=0; i<locale_data.length; i++) {
            var locale = locale_data[i];
            if (this.isValidObject(locale.msgs[msg_ctxt_id])) {
                // make copy of that array (cause we'll be destructive)
                for (var j=0; j<locale.msgs[msg_ctxt_id].length; j++) {
                    trans[j] = locale.msgs[msg_ctxt_id][j];
                }
                trans.shift(); // throw away the msgid_plural
                domain_used = locale;
                found = true;
                // only break if found translation actually has a translation.
                if ( trans.length > 0 && trans[0].length != 0 )
                    break;
            }
        }
    }

    // default to english if we lack a match, or match has zero length
    if ( trans.length == 0 || trans[0].length == 0 ) {
        trans = [ msgid, msgid_plural ];
    }

    var translation = trans[0];
    if (plural) {
        var p;
        if (found && this.isValidObject(domain_used.head.plural_func) ) {
            var rv = domain_used.head.plural_func(n);
            if (! rv.plural) rv.plural = 0;
            if (! rv.nplural) rv.nplural = 0;
            // if plurals returned is out of bound for total plural forms
            if (rv.nplural <= rv.plural) rv.plural = 0;
            p = rv.plural;
        } else {
            p = (n != 1) ? 1 : 0;
        }
        if (this.isValidObject(trans[p]))
            translation = trans[p];
    }

    return translation;
};


/*

=head2 strargs (string, argument_array)

  string : a string that potentially contains formatting characters.
  argument_array : an array of positional replacement values

This is a utility method to provide some way to support positional parameters within a string, as javascript lacks a printf() method.

The format is similar to printf(), but greatly simplified (ie. fewer features).

Any percent signs followed by numbers are replaced with the corrosponding item from the B<argument_array>.

Example:

    var string = "%2 roses are red, %1 violets are blue";
    var args   = new Array("10", "15");
    var result = Gettext.strargs(string, args);
    // result is "15 roses are red, 10 violets are blue"

The format numbers are 1 based, so the first itme is %1.

A lone percent sign may be escaped by preceeding it with another percent sign.

A percent sign followed by anything other than a number or another percent sign will be passed through as is.

Some more examples should clear up any abmiguity. The following were called with the orig string, and the array as Array("[one]", "[two]") :

  orig string "blah" becomes "blah"
  orig string "" becomes ""
  orig string "%%" becomes "%"
  orig string "%%%" becomes "%%"
  orig string "%%%%" becomes "%%"
  orig string "%%%%%" becomes "%%%"
  orig string "tom%%dick" becomes "tom%dick"
  orig string "thing%1bob" becomes "thing[one]bob"
  orig string "thing%1%2bob" becomes "thing[one][two]bob"
  orig string "thing%1asdf%2asdf" becomes "thing[one]asdf[two]asdf"
  orig string "%1%2%3" becomes "[one][two]"
  orig string "tom%1%%2%aDick" becomes "tom[one]%2%aDick"

This is especially useful when using plurals, as the string will nearly always contain the number.

It's also useful in translated strings where the translator may have needed to move the position of the parameters.

For example:

  var count = 14;
  Gettext.strargs( gt.ngettext('one banana', '%1 bananas', count), [count] );

NOTE: this may be called as an instance method, or as a class method.

  // instance method:
  var gt = new Gettext(params);
  gt.strargs(string, args);

  // class method:
  Gettext.strargs(string, args);

=cut

*/
/* utility method, since javascript lacks a printf */
Gettext.strargs = function (str, args) {
    // make sure args is an array
    if ( null == args ||
         'undefined' == typeof(args) ) {
        args = [];
    } else if (args.constructor != Array) {
        args = [args];
    }

    // NOTE: javascript lacks support for zero length negative look-behind
    // in regex, so we must step through w/ index.
    // The perl equiv would simply be:
    //    $string =~ s/(?<!\%)\%([0-9]+)/$args[$1]/g;
    //    $string =~ s/\%\%/\%/g; # restore escaped percent signs

    var newstr = "";
    while (true) {
        var i = str.indexOf('%');
        var match_n;

        // no more found. Append whatever remains
        if (i == -1) {
            newstr += str;
            break;
        }

        // we found it, append everything up to that
        newstr += str.substr(0, i);

        // check for escpaed %%
        if (str.substr(i, 2) == '%%') {
            newstr += '%';
            str = str.substr((i+2));

        // % followed by number
        } else if ( match_n = str.substr(i).match(/^%(\d+)/) ) {
            var arg_n = parseInt(match_n[1]);
            var length_n = match_n[1].length;
            if ( arg_n > 0 && args[arg_n -1] != null && typeof(args[arg_n -1]) != 'undefined' )
                newstr += args[arg_n -1];
            str = str.substr( (i + 1 + length_n) );

        // % followed by some other garbage - just remove the %
        } else {
            newstr += '%';
            str = str.substr((i+1));
        }
    }

    return newstr;
}

/* instance method wrapper of strargs */
Gettext.prototype.strargs = function (str, args) {
    return Gettext.strargs(str, args);
}

/* verify that something is an array */
Gettext.prototype.isArray = function (thisObject) {
    return this.isValidObject(thisObject) && thisObject.constructor == Array;
};

/* verify that an object exists and is valid */
Gettext.prototype.isValidObject = function (thisObject) {
    if (null == thisObject) {
        return false;
    } else if ('undefined' == typeof(thisObject) ) {
        return false;
    } else {
        return true;
    }
};

Gettext.prototype.sjax = function (uri) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else if (navigator.userAgent.toLowerCase().indexOf('msie 5') != -1) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }

    if (! xmlhttp)
        throw new Error("Your browser doesn't do Ajax. Unable to support external language files.");

    xmlhttp.open('GET', uri, false);
    try { xmlhttp.send(null); }
    catch (e) { return; }

    // we consider status 200 and 0 as ok.
    // 0 happens when we request local file, allowing this to run on local files
    var sjax_status = xmlhttp.status;
    if (sjax_status == 200 || sjax_status == 0) {
        return xmlhttp.responseText;
    } else {
        var error = xmlhttp.statusText + " (Error " + xmlhttp.status + ")";
        if (xmlhttp.responseText.length) {
            error += "\n" + xmlhttp.responseText;
        }
        alert(error);
        return;
    }
}

Gettext.prototype.JSON = function (data) {
    return eval('(' + data + ')');
}


/*

=head1 NOTES

These are some notes on the internals

=over

=item LOCALE CACHING

Loaded locale data is currently cached class-wide. This means that if two scripts are both using Gettext.js, and both share the same gettext domain, that domain will only be loaded once. This will allow you to grab a new object many times from different places, utilize the same domain, and share a single translation file. The downside is that a domain won't be RE-loaded if a new object is instantiated on a domain that had already been instantiated.

=back

=head1 BUGS / TODO

=over

=item error handling

Currently, there are several places that throw errors. In GNU Gettext, there are no fatal errors, which allows text to still be displayed regardless of how broken the environment becomes. We should evaluate and determine where we want to stand on that issue.

=item syncronous only support (no ajax support)

Currently, fetching language data is done purely syncronous, which means the page will halt while those files are fetched/loaded.

This is often what you want, as then following translation requests will actually be translated. However, if all your calls are done dynamically (ie. error handling only or something), loading in the background may be more adventagous.

It's still recommended to use the statically defined <script ...> method, which should have the same delay, but it will cache the result.

=item domain support

domain support while using shortcut methods like C<_('string')> or C<i18n('string')>.

Under normal apps, the domain is usually set globally to the app, and a single language file is used. Under javascript, you may have multiple libraries or applications needing translation support, but the namespace is essentially global.

It's recommended that your app initialize it's own shortcut with it's own domain.  (See examples/wrapper/i18n.js for an example.)

Basically, you'll want to accomplish something like this:

    // in some other .js file that needs i18n
    this.i18nObj = new i18n;
    this.i18n = this.i18nObj.init('domain');
    // do translation
    alert( this.i18n("string") );

If you use this raw Gettext object, then this is all handled for you, as you have your own object then, and will be calling C<myGettextObject.gettext('string')> and such.


=item encoding

May want to add encoding/reencoding stuff. See GNU iconv, or the perl module Locale::Recode from libintl-perl.

=back


=head1 COMPATABILITY

This has been tested on the following browsers. It may work on others, but these are all those to which I have access.

    FF1.5, FF2, FF3, IE6, IE7, Opera9, Opera10, Safari3.1, Chrome

    *FF = Firefox
    *IE = Internet Explorer


=head1 REQUIRES

bin/po2json requires perl, and the perl modules Locale::PO and JSON.

=head1 SEE ALSO

bin/po2json (included),
examples/normal/index.html,
examples/wrapper/i18n.html, examples/wrapper/i18n.js,
Locale::gettext_pp(3pm), POSIX(3pm), gettext(1), gettext(3)

=head1 AUTHOR

Copyright (C) 2008, Joshua I. Miller E<lt>unrtst@cpan.orgE<gt>, all rights reserved. See the source code for details.

=cut

*/

// vim: fileencoding=utf-8 nospell ts=2 et

// All email addresses get stripped from this file before publishing

// Translation instructions:
// Each line has one phrase that needs translating.  Only edit the 
// part in "quotation marks" after the colon.  Try to use a Unicode/UTF-8 editor to 
// preserve special characters.
//
// Example:
// , t_label:      "Replace this part with the translation"

var translations = {

en:
// Do not change the order of the days or months!
{ daysLong           : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
, daysShort          : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
, monthsLong         : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
, monthsShort        : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
, am                 : "am"
, pm                 : "pm"

// Update these with the correct format for your country
, defaultDateFormat  : "D M d"
, defaultTimeFormat  : "h:i a"

, t_dateformat       : "Date format:"
, t_timeformat       : "Time format:"
, t_timezone         : "Time zone:"
, t_localtime        : "Local time"
, t_bottomlabel      : "Bottom label:"
, t_optional         : "(optional)"
, t_examples         : "Examples:"
, t_date             : "Date:"
, t_time             : "Time:"
, t_label            : "Label:"
// Please translate the examples as well
, t_dateexamples     : "D M d = Sat Apr 07<br>n/j l = 4/7 Saturday"
, t_timeexamples     : "g:i a = 5:44 pm<br>H:i = 17:44"
// Replace Portland with a major city in your country or known to speakers of the language
, t_labelexamples    : "Portland, Tokyo, GMT+2"
, t_formathelp       : "<a href=http://us.php.net/manual/en/function.date.php>Format help</a>"
, t_formathelplong   : "<a href=http://us.php.net/manual/en/function.date.php>Format help</a> (unsupported: T, e, o, u)"
// Don't modify xxVER or xxDATE
, t_version          : "Version xxVER (xxDATE)"
, t_about            : "About this gadget"
// If you want credit for translation, translate "<Language name> translation by <your name>"
, t_translateby      : ""
, t_language         : "Language:"
, t_charity          : "Presto's Clock is Charityware. If you like it, please consider a donation to the less fortunate of the world. See the project page for <a href=\"http://prestonhunt.com/story/110\">information on how to donate</a>."
, t_license          : "Free for personal or educational use. License required for commercial or government use. Please see the <a href=\"\">license information</a> for more details."
, t_fontfamily1      : "Font:"
, t_fontfamily2      : "Font:"
, t_fontfamily3      : "Font:"
, t_fontsize1        : "Font size:"
, t_fontsize2        : "Font size:"
, t_fontsize3        : "Font size:"
, t_fontcolor1       : "Font color:"
, t_fontcolor2       : "Font color:"
, t_fontcolor3       : "Font color:"
, t_background       : "Background image"
, t_background_help  : "Will be resized to 130x67 pixels"
, t_date2            : "Date"
, t_time2            : "Time"
, t_label2           : "Label"
, t_swap_labels      : "Swap date and bottom label"
// Put the text that comes before the dimming percent entry box
, t_dim_before       : "Dim clock at night by"
// Put the text that comes after the dimming percent entry box
, t_dim_after   : "percent"
, t_dim_disabled     : "(Dimming is not available for this time zone selection.)"
, t_tab1             : "General"
, t_tab2             : "Appearance"
, t_tab3             : "About"
  //'t_tab4:            "Background"
, t_copyright        : "Copyright 2009-2013 Preston Hunt"
, t_auto_check       : "Notify when new versions of the clock are available"
, t_update           : "A newer version of Presto's Clock is available. <a href=\"http://prestonhunt.com/go/sidebarclock\">Update now!</a>"
// Replace English with the name of your language in your language
, t_languagename     : "English"

, t_backup_settings  : "Backup settings"
, t_backup           : "Backup settings to clipboard"
, t_restore          : "Restore settings from clipboard"
, t_settings_copied  : "Settings copied to clipboard!"
, t_settings_loaded  : "Settings loaded from clipboard!"
, t_settings_invalid : "Clipboard does not contain valid settings."
, t_title            : "Presto's Clock"
, t_numerals         : "Numeral system:"
, t_transparent_back : "Use transparent background"
},

// Basque translation by Unai Garcia Vara <garciavaraunai@gmail.com>
eu:
// Do not change the order of the days or months!
{ daysLong           : ["Igandea", "Astelehena", "Asteartea", "Asteazkena", "Osteguna", "Ostirala", "Larunbata"]
, daysShort          : ["Iga", "Asl", "Asr", "Asz", "Osg", "Osr", "Lar"]
, monthsLong         : ["Urtarrilak", "Otsailak", "Martxoak", "Apirilak", "Maiatzak", "Ekainak", "Uztailak", "Abuztuak", "Irailak", "Urriak", "Azaroak", "Abenduak"]
, monthsShort        : ["Urt", "Ots", "Mar", "Api", "Mai", "Eka", "Uzt", "Abu", "Ira", "Urr", "Aza", "Abe"]
, am                 : "am"
, pm                 : "pm"

// Update these with the correct format for your country
, defaultDateFormat  : "Y F j"
, defaultTimeFormat  : "h:i a"

, t_dateformat       : "Data formatua:"
, t_timeformat       : "Ordu formatua:"
, t_timezone         : "Ordu eremua:"
, t_localtime        : "Ordu lokala"
, t_bottomlabel      : "Azpiko etiketa:"
, t_optional         : "(hautazkoa)"
, t_examples         : "Adibidez:"
, t_date             : "Data:"
, t_time             : "Ordua:"
, t_label            : "Etiketa"
// Please translate the examples as well
, t_dateexamples     : "Y F j = 2013 otsailak 14<br>n/j l = 4/7 Larunbata"
, t_timeexamples     : "h:i = 16:42 pm<br>H:i = 17:44"
// Replace Portland with a major city in your country or known to speakers of the language
, t_labelexamples    : "Bilbao, Donostia, GMT+1"
, t_formathelp       : "<a href=http://us.php.net/manual/en/function.date.php>Laguntza</a>"
, t_formathelplong   : "<a href=http://us.php.net/manual/en/function.date.php>Laguntza</a> (Ezin dira erabili: T, e, o, u)"
// Don't modify xxVER or xxDATE
, t_version          : "Bertsioa: xxVER (xxDATE)"
, t_about            : "Gadget honi buruz"
// If you want credit for translation, translate "<Euskera> translation by <Unai García>"
, t_translateby      : ""
, t_language         : "Hizkuntza:"
, t_charity          : "Presto's Clock karitate merkantzia da. Gustokoa baduzu, kontsidera ezazu donazio bat egitea behartsuenentzat. Ikusi web-orrialdea <a href=\"http://prestonhunt.com/story/110\">informatzeko edota donazioak egiteko.</a>."
, t_license          : "Informazio askea.</a> Gehiago jakin nahi baduzu."
, t_fontfamily1      : "Letra iturria:"
, t_fontfamily2      : "Letra iturria:"
, t_fontfamily3      : "Letra iturria:"
, t_fontsize1        : "Letra tamaina:"
, t_fontsize2        : "Letra tamaina:"
, t_fontsize3        : "Letra tamaina:"
, t_fontcolor1       : "Letra kolorea:"
, t_fontcolor2       : "Letra kolorea:"
, t_fontcolor3       : "Letra kolorea:"
, t_background       : "Atzekalde irudia:"
, t_background_help  : "130x67 pixelera aldatuko da."
, t_date2            : "Data"
, t_time2            : "Ordua"
, t_label2           : "Etiketa"
, t_swap_labels      : "Trukatu data eta etiketa tokiak."
// Put the text that comes before the dimming percent entry box
, t_dim_before       : "Ilundu gauez erlojuak"
// Put the text that comes after the dimming percent entry box
, t_dim_after   : "portzentaia"
, t_dim_disabled     : "(Ordu eremu hoentan ezin da iluntze funtzioa ezarri)"
, t_tab1             : "Orokorra"
, t_tab2             : "Itxura"
, t_tab3             : "Buruz"
  //'t_tab4:            "Atzealdea"
, t_copyright        : "Eskubideak 2009-2013 Preston Hunt"
, t_auto_check       : "Jakinarazi bertsio berri bat dagoenean"
, t_update           : "Presto's Clock-eko bertsio berri bat dago. <a href=\"http://prestonhunt.com/go/sidebarclock\">Update now!</a>"
// Replace English with the name of your language in your language
, t_languagename     : "Euskera"

, t_backup_settings  : "Segurtasun kopia konfiguratu"
, t_backup           : "Kopiatu konfigurazioa paperzorroan"
, t_restore          : "Berriztapen konfigurazioa kopiatu paperzorroan"
, t_settings_copied  : "Konfigurazioa kopiatu da paperzorrora!"
, t_settings_loaded  : "Konfigurazioa kargatu da paperzorrotik"
, t_settings_invalid : "Paperzorroan ez dago konfiguraziorik"
, t_title            : "Presto's Clock"
, t_numerals         : "Zenbaki sistema:"
, t_transparent_back : "Atzealde gardena jarri"
},

// Korean translation by Seungbeom Kim <musiphil@bawi.org>
ko:
// Do not change the order of the days or months!
{ daysLong           : ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
, daysShort          : ["일", "월", "화", "수", "목", "금", "토"]
, monthsLong         : ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
, monthsShort        : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
, am                 : "오전"
, pm                 : "오후"

// Update these with the correct format for your country
, defaultDateFormat  : "m/d D"
, defaultTimeFormat  : "a h:i"

, t_dateformat       : "날짜 형식:"
, t_timeformat       : "시각 형식:"
, t_timezone         : "시간대:"
, t_localtime        : "지방시"
, t_bottomlabel      : "아래 문구:"
, t_optional         : "(생략 가능)"
, t_examples         : "예제:"
, t_date             : "날짜:"
, t_time             : "시각:"
, t_label            : "문구:"
// Please translate the examples as well
, t_dateexamples     : "m/d D = 04/07 토<br>n월 j일 l = 4월 7일 토요일"
, t_timeexamples     : "a g:i = 오후 5:44<br>H:i = 17:44"
// Replace Portland with a major city in your country or known to speakers of the language
, t_labelexamples    : "서울, 동경, UTC+09"
, t_formathelp       : "<a href=http://us.php.net/manual/en/function.date.php>서식 도움말</a>"
, t_formathelplong   : "<a href=http://us.php.net/manual/en/function.date.php>서식 도움말</a> (T, e, o, u는 미지원)"
// Don't modify xxVER or xxDATE
, t_version          : "버전 xxVER (xxDATE)"
, t_about            : "이 가젯에 대하여"
// If you want credit for translation, translate "<Language name> translation by <your name>"
, t_translateby      : "한국어 번역: 김승범"
, t_language         : "언어:"
, t_charity          : "Presto's Clock은 자선웨어(charityware)입니다. 마음에 드시면, 세상의 불우한 이들에게 기부하는 것을 고려해 주시기 바랍니다. <a href=\"http://prestonhunt.com/story/110\">기부하는 방법에 대한 정보</a>는 프로젝트 페이지를 참조하세요."
, t_license          : "개인용이나 교육용으로는 무료입니다. 상업용이나 관공서용으로는 라이선스가 필요합니다. 더 자세한 것은 <a href=\"\">라이선스 정보</a>를 참조하세요."
, t_fontfamily1      : "글꼴:"
, t_fontfamily2      : "글꼴:"
, t_fontfamily3      : "글꼴:"
, t_fontsize1        : "글꼴 크기:"
, t_fontsize2        : "글꼴 크기:"
, t_fontsize3        : "글꼴 크기:"
, t_fontcolor1       : "글꼴 색상:"
, t_fontcolor2       : "글꼴 색상:"
, t_fontcolor3       : "글꼴 색상:"
, t_background       : "배경 그림"
, t_background_help  : "크기는 130x67 픽셀로 조정됩니다."
, t_date2            : "날짜"
, t_time2            : "시각"
, t_label2           : "문구"
, t_swap_labels      : "날짜와 아래 문구 맞바꿈"
, t_dim_before       : "야간에 시계를"
, t_dim_after        : "퍼센트만큼 어둡게 함"
, t_dim_disabled     : "(선택된 이 시간대에서는 어둡게 하기가 불가능합니다.)"
, t_tab1             : "일반"
, t_tab2             : "모양"
, t_tab3             : "정보"
  //'t_tab4:            "배경"
, t_copyright        : "저작권 2009-2013 Preston Hunt"
, t_auto_check       : "새 버전이 나오면 알림"
, t_update           : "Presto's Clock 새 버전이 나왔습니다. <a href=\"http://prestonhunt.com/go/sidebarclock\">지금 업데이트하세요!</a>"
// Replace English with the name of your language in your language (e.g., German = Deutsch)
, t_languagename     : "한국어"

, t_backup_settings  : "설정 백업"
, t_backup           : "설정을 클립보드에 백업합니다."
, t_restore          : "설정을 클립보드로부터 복원합니다."
, t_settings_copied  : "설정을 클립보드에 복사했습니다."
, t_settings_loaded  : "설정을 클립보드로부터 읽어들였습니다."
, t_settings_invalid : "클립보드에 올바른 설정이 없습니다."
, t_title            : "Presto's Clock"
, t_numerals         : "기수법:"
, t_transparent_back : "투명 배경 사용"
},

// Russian translation by Denis Baumgaertner <denco@freenet.de>
'ru': {
// Do not change the order of the days or months!
'daysLong':    ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
'daysShort':   ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
'monthsLong':  ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
'monthsShort': ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
'defaultDateFormat': "D M d",
'defaultTimeFormat': "H:i",

't_dateformat':     'Формат даты:',
't_timeformat':     'Формат времени:',
't_timezone':       'Часовой пояс:',
't_localtime':      'Местное время',
't_bottomlabel':    'Текст:',
't_optional':       '(дополнительно)',
't_examples':       'Примеры:',
't_date':           'Дата:',
't_time':           'Время:',
't_label':          'Текст:',
't_dateexamples':   'D M d = Сб Апр 07<br>n/j l = 4/7 Суббота',
't_timeexamples':   'g:i a = 5:44 pm<br>H:i = 17:44',
't_labelexamples':  'Москва, GMT+3',
't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">Справка по формату</a>',
't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">Справка по формату</a> (не поддерживаются: T, e, o, u)',
't_version':        'Версия xxVER (xxDATE)',
't_about':          'О гаджете',
't_translateby':    'Перевод на русский от Дениса Баумгертнера',
't_language':       'Язык:',
't_charity':        "Presto's Clock это Charityware. Если приложение Вам понравилось, пожалуйста внесите пожертвования в поддержку нуждающихся. Подробная <a href=\"http://prestonhunt.com/story/110\">информация для пожертвований</a> находится на моей домашней странице.",
't_fontfamily1':     'Шрифт:',
't_fontfamily2':     'Шрифт:',
't_fontfamily3':     'Шрифт:',
't_fontsize1':       'Размер шрифта:',
't_fontsize2':       'Размер шрифта:',
't_fontsize3':       'Размер шрифта:',
't_fontcolor1':      'Цвет шрифта:',
't_fontcolor2':      'Цвет шрифта:',
't_fontcolor3':      'Цвет шрифта:',
't_background':  		'Фоновое изображение',
't_date2': 				 	 'Дата',
't_time2': 				 	 'Время',
't_label2': 			 	 'Текст',
't_swap_labels':     'Поменять местами дату и текст',
't_tab1':            'Общее', 
't_tab2':            'Настройки',
't_tab3':            'О программе',
't_copyright':       'Copyright 2009-2013 Preston Hunt',
't_languagename':    'Русский'
},

// Bulgarian translation by Artyom Ivanov <artyom.ivanov@abv.bg>

"bg": {
  "daysLong":          ["Неделя","Понеделник","Вторник","Сряда","Четвъртък","Петък","Събота"],
  "daysShort":         ["Нед","Пон","Вто","Сря","Чет","Пет","Съб"],
  "monthsLong":        ["Януари","Февруари","Март","Април","Май","Юни","Юли","Август","Септември","Октомври","Ноември","Декември"],
  "monthsShort":       ["Яну","Фев","Мар","Апр","Май","Юни","Юли","Авг","Сеп","Окт","Ное","Дек"],
  "defaultDateFormat": "D M d",
  "defaultTimeFormat": "H:i:s",
  "t_dateformat":      "Формат на датата:",
  "t_timeformat":      "Формат на часа:",
  "t_timezone":        "Часови пояс:",
  "t_localtime":       "Местно време",
  "t_bottomlabel":     "Текст:",
  "t_optional":        "(допълнително)",
  "t_examples":        "Примери:",
  "t_date":            "Дата:",
  "t_time":            "Час:",
  "t_label":           "Текст:",
  "t_dateexamples":    "D M d = Съб Апр 07<br>n/j l = 4/7 Събота",
  "t_timeexamples":    "g:i a = 5:44 pm<br>H:i = 17:44",
  "t_labelexamples":   "София, GMT+2",
  "t_formathelp":      '<a href="http://us.php.net/manual/bg/function.date.php">Справка за формата</a>',
  "t_formathelplong":  '<a href="http://us.php.net/manual/bg/function.date.php">Справка за формата</a> (не се поддържат: T, e, o, u)',
  "t_version":         "Версия xxVER (xxDATE)",
  "t_about":           "За гаджета",
  "t_translateby":     "Превод на български ArTy  &copy;",
  "t_language":        "Език:",
  "t_charity":         'Presto\'s Clock това е Charityware. Ако приложението Ви е харесало, моля направете дарение за да подпомогнете нуждаещите се по света. Повече <a href="http://prestonhunt.com/story/110">информация за да направите дарение</a> може да намерите на страницата на проекта.',
  "t_fontfamily1":     "Шрифт:",
  "t_fontfamily2":     "Шрифт:",
  "t_fontfamily3":     "Шрифт:",
  "t_fontsize1":       "Размер на шрифта:",
  "t_fontsize2":       "Размер на шрифта:",
  "t_fontsize3":       "Размер на шрифта:",
  "t_fontcolor1":      "Цвят на шрифта:",
  "t_fontcolor2":      "Цвят на шрифта:",
  "t_fontcolor3":      "Цвят на шрифта:",
  "t_date2":           "Дата",
  "t_time2":           "Час",
  "t_label2":          "Текст",
  "t_swap_labels":     "Размени местата на датата и текста",
  "t_tab1":            "Настройки",
  "t_tab2":            "Външност",
  "t_tab3":            "За програмата",
  "t_copyright":       "Copyright 2009-2013 Preston Hunt",
  "t_languagename":    "Български"
},

// First Spanish translation by Tom <getkresh@yahoo.ca>
// Updated Spanish translation by Alex Covarrubias <alex.covarrubias@gmail.com>
es:
// Do not change the order of the days or months!
{ daysLong           : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
, daysShort          : ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sab"]
, monthsLong         : ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
, monthsShort        : ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
, am                 : "am"
, pm                 : "pm"

// Update these with the correct format for your country
, defaultDateFormat  : "l d M"
, defaultTimeFormat  : "H:i"

, t_dateformat       : "Formato de fecha:"
, t_timeformat       : "Formato de hora:"
, t_timezone         : "Zona horaria:"
, t_localtime        : "Hora local"
, t_bottomlabel      : "Etiqueta:"
, t_optional         : "(opcional)"
, t_examples         : "Ejemplos:"
, t_date             : "Fecha:"
, t_time             : "Hora:"
, t_label            : "Etiqueta:"
// Please translate the examples as well
, t_dateexamples     : "D M d = Sáb Abr 07<br>n/j l = 4/7 Sábado"
, t_timeexamples     : "g:i a = 5:44 pm<br>H:i = 17:44"
// Replace Portland with a major city in your country or known to speakers of the language
, t_labelexamples    : "Madrid, España, GMT+1"
, t_formathelp       : "<a href=http://us.php.net/manual/en/function.date.php>Ayuda de formatos</a>"
, t_formathelplong   : "<a href=http://us.php.net/manual/en/function.date.php>Ayuda de formatos</a> (no soportados: T, e, o, u)"
// Don't modify xxVER or xxDATE
, t_version          : "Versión xxVER (xxDATE)"
, t_about            : "Acerca de este gadget"
// If you want credit for translation, translate "<Language name> translation by <your name>"
, t_translateby      : "Traducción al Español por Covarrubias"
, t_language         : "Idioma:"
, t_charity          : "Presto's Clock es Charityware. Si le gusta, considere una donación a los menos afortunados del mundo. Vaya a la página del proyecto <a href=\"http://prestonhunt.com/story/110\">para ver información de cómo donar</a>."
, t_license          : "Gratis para uso personal o educacional. Se requiere licencia para uso comercial o gubernamental. Por favor vea la <a href=\"\">información de licencia</a> para más detalles."
, t_fontfamily1      : "Fuente:"
, t_fontfamily2      : "Fuente:"
, t_fontfamily3      : "Fuente:"
, t_fontsize1        : "Tamaño Fuente:"
, t_fontsize2        : "Tamaño Fuente:"
, t_fontsize3        : "Tamaño Fuente:"
, t_fontcolor1       : "Color Fuente:"
, t_fontcolor2       : "Color Fuente:"
, t_fontcolor3       : "Color Fuente:"
, t_background       : "Imagen de fondo"
, t_background_help  : "Se ajustará a 130x67 pixels"
, t_date2            : "Fecha"
, t_time2            : "Hora"
, t_label2           : "Etiqueta"
, t_swap_labels      : "Intercambiar fecha y etiqueta inferior"
, t_dim_before       : "Oscurecer reloj de noche en un"
, t_dim_disabled     : "(Oscurecer no está disponible para esta zona horaria.)"
, t_tab1             : "General"
, t_tab2             : "Apariencia"
, t_tab3             : "Acerca de"
  //'t_tab4:            "Fondo"
, t_copyright        : "Copyright 2009-2013 Preston Hunt"
, t_auto_check       : "Notifíqueme cuando estén disponibles nuevas versiones del reloj"
, t_update           : "Hay disponible una nueva versión de Presto's Clock. <a href=\"http://prestonhunt.com/go/sidebarclock\">¡Actualícese ahora!</a>"
// Replace English with the name of your language in your language
, t_languagename     : "Español"

, t_backup_settings  : "Configuración de Copia de Seguridad"
, t_backup           : "Copiar configuración al portapapeles"
, t_restore          : "Restaurar configuración del portapapeles"
, t_dim_after   : "porciento"
, t_settings_copied  : "¡Configuración copiada al portapapeles!"
, t_settings_loaded  : "¡Configuración cargada desde el portapapeles!"
, t_settings_invalid : "El portapapeles no contiene una configuración válida."
, t_title            : "Presto's Clock"
, t_numerals         : "Sistema numeral:"
, t_transparent_back : "Usar fondo transparente"
},

// Danish translation by Dennis Boffy <adidas.lover2000@yahoo.com>
'dk': {
	'daysLong':    ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
	'daysShort':   ["søn", "man", "tir", "ons", "tor", "fre", "lør"],
	'monthsShort': ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
	'monthsLong':  ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"],
	'defaultDateFormat': "D d M",
	'defaultTimeFormat': "H:i",

	't_dateformat':    'Formatering af dato:',
	't_timeformat':    'Formatering af tid:',
	't_timezone':      'Tidszone:',
	't_localtime':     'Lokal tid',
	't_bottomlabel':   'Angivelse af tidszone:',
	't_optional':      '(valgfrit)',
	't_examples':      'Eksempler:',
	't_date':          'Dato:',
	't_time':          'Tid:',
	't_label':         'Angivelse:',
	't_dateexamples':  'D d M = lør 10 apr<br>l j/n = lørdag 4/7',
	't_timeexamples':  'g:i a = 5:44 pm<br>H:i = 17:44',
	't_labelexamples': 'CET, GMT+1, København, London',
	't_formathelp':    '<a href="http://php.net/date">Hjælp til formatering</a>',
	't_formathelplong':'<a href="http://php.net/date">Hjælp til formatering</a> (ikke understøttet: T, e, o, u)',
	't_version':       'Version xxVER (xxDATE)',
	't_about':         'Om denne gadget',
	't_translateby':   'Dansk oversættelse af Dennis Boffy',
	't_language':      'Sprog:',
	't_charity':        "Presto's Clock er charityware. Hvis du kan lide denne gadget, kan du overveje at donere et beløb til mennesker, der ikke er lige så godt stillet som dig. Besøg projektsiden for <a href=\"http://prestonhunt.com/story/110\">oplysninger om, hvordan du kan give et bidrag</a>.",
	't_fontfamily1':     'Skrifttype:',
	't_fontfamily2':     'Skrifttype:',
	't_fontfamily3':     'Skrifttype:',
	't_fontsize1':       'Skriftstørrelse:',
	't_fontsize2':       'Skriftstørrelse:',
	't_fontsize3':       'Skriftstørrelse:',
	't_fontcolor1':      'Skriftfarve:',
	't_fontcolor2':      'Skriftfarve:',
	't_fontcolor3':      'Skriftfarve:',
  't_background':  		'Baggrundsbillede',
	't_date2': 				 	 'Dato',
	't_time2': 				 	 'Tid',
	't_label2': 			 	 'Angivelse af tidszone',
	't_swap_labels':     'Byt om på dato og angivelse af tidszone',
  't_tab1':            'General',
  't_tab2':            'Appearance',
  't_tab3':            'About',
  't_copyright':       'Copyright 2009-2013 Preston Hunt'
},

// French translation by Erik Vandevoorde <erik.vdvoorde@gmail.com>
'fr': {
	'daysLong':    ["Dimanche", "Lundi", "Mardi", "Mercredi","Jeudi", "Vendredi", "Samedi"],
	'daysShort':   ["Dim", "Lun", "Mar", "Mer","Jeu", "Ven", "Sam"],
	'monthsShort': ["Jan", "Fév", "Mars", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"],
	'monthsLong':  [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ],
	'defaultDateFormat': "D d M",
	'defaultTimeFormat': "H:i",

	't_dateformat':    'Format de la date:',
	't_timeformat':    "Format de l'heure:",
	't_timezone':      'Fuseau horaire:',
	't_localtime':     'Local time',
	't_bottomlabel':   'Nom:',
	't_optional':      '(facultatif)',
	't_examples':      'Exemples:',
	't_date':          'La date:',
	't_time':          "L'heure:",
	't_label':         'Nom:',
	't_dateexamples':  'D d M = Sam 07 Avr<br>l j/n = Samedi 7/4',
	't_timeexamples':  'H:i = 17:44',
	't_labelexamples': 'Paris, Bruxelles, GMT+1',
	't_formathelp':    '<a href="http://us.php.net/manual/fr/function.date.php">Aide paramètrage format</a>',
	't_formathelplong':'<a href="http://us.php.net/manual/fr/function.date.php">Aide paramètrage format</a> (non reconnus: T, e, o, u)',
	't_version':       'Version xxVER (xxDATE)',
	't_about':         'A propos de ce gadget',
	't_translateby':   'Traduction française par DionysosX',
	't_language':      'Language:',
	't_charity':        "Presto's Clock is Charityware. If you like it, please consider a donation to the less fortunate of the world. See the project page for <a href=\"http://prestonhunt.com/story/110\">information on how to donate</a>.",
	't_fontfamily1':     'Font:',
	't_fontfamily2':     'Font:',
	't_fontfamily3':     'Font:',
	't_fontsize1':       'Font size:',
	't_fontsize2':       'Font size:',
	't_fontsize3':       'Font size:',
	't_fontcolor1':      'Font color:',
	't_fontcolor2':      'Font color:',
	't_fontcolor3':      'Font color:',
  't_background':  		'Background image',
	't_date2': 				 	 'Date',
	't_time2': 				 	 'Time',
	't_label2': 			 	 'Label',
	't_swap_labels':     'Swap date and bottom label',
  't_tab1':            'General',
  't_tab2':            'Appearance',
  't_tab3':            'About',
  't_copyright':       'Copyright 2009-2013 Preston Hunt'
, t_dim_before       : "Dim clock at night by"
},

// Italian translation by Mirko Mazzacano <michy91@alice.it>
'it': {
	'daysLong':    ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"],
	'daysShort':   ["Dom", "Lun", "Mar" , "Mer", "Giov", "Ven","Sab"],
	'monthsShort': ["Gen","Feb","Mar","Apr", "Mag","Giu","Lug","Agosto","Set","Ott","Nov","Dic"],
	'monthsLong':  ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],
	'defaultDateFormat': "D d M",
	'defaultTimeFormat': "H:i",

	't_dateformat':    'Formato data:',
	't_timeformat':    'Formato orario:',
	't_timezone':      'Nome orologio:',
	't_localtime':     'Local time',
	't_bottomlabel':   'Nomi:',
	't_optional':      '(optioneel)',
	't_examples':      'Esempi:',
	't_date':          'Data:',
	't_time':          'Orario:',
	't_label':         'Nomi:',
	't_dateexamples':  'D d M = Za 07 Apr<br>l j/n = Zaterdag 7/4',
	't_timeexamples':  'H:i = 17:44',
	't_labelexamples': 'Roma, Tokyo, GMT+1',
	't_formathelp':    '<a href="http://us3.php.net/manual/it/function.date.php">Aiuto formato</a>',
	't_formathelplong':'<a href="http://us3.php.net/manual/it/function.date.php">Aiuto formato</a> (non supportato: T, e, o, u)',
	't_version':       'Versione xxVER (xxDATE)',
	't_about':         'Informazioni su gadget',
	't_translateby':   'Traduzione italiana di Mirko Mazzacano.',
	't_language':      'Lingua:',
	't_charity':        "Presto's Clock is Charityware. If you like it, please consider a donation to the less fortunate of the world. See the project page for <a href=\"http://prestonhunt.com/story/110\">information on how to donate</a>.",
	't_fontfamily1':     'Font:',
	't_fontfamily2':     'Font:',
	't_fontfamily3':     'Font:',
	't_fontsize1':       'Font size:',
	't_fontsize2':       'Font size:',
	't_fontsize3':       'Font size:',
	't_fontcolor1':      'Font color:',
	't_fontcolor2':      'Font color:',
	't_fontcolor3':      'Font color:',
  't_background':  		'Background image',
	't_date2': 				 	 'Date',
	't_time2': 				 	 'Time',
	't_label2': 			 	 'Label',
	't_swap_labels':     'Swap date and bottom label',
  't_tab1':            'General',
  't_tab2':            'Apperance',
  't_tab3':            'About',
  't_copyright':       'Copyright 2009-2013 Preston Hunt'
},

// Polish translation by Marcin Michalak <marcin.michalak@gmail.com> and Dariusz Bodzęta <darek334@gazeta.pl>
pl: 
{ daysLong           : ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]
, daysShort          : ["Ni", "Pn", "Wt", "Śr", "Cz", "Pt", "So"]
, monthsLong         : ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"]
, monthsShort        : ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"]
, defaultDateFormat  : "D d M"
, defaultTimeFormat  : "H:i"
, t_dateformat       : 'Format daty:'
, t_timeformat       : 'Format godziny:'
, t_timezone         : 'Strefa czasu:'
, t_localtime        : 'Czas lokalny'
, t_bottomlabel      : 'Tekst:'
, t_optional         : '(opcjonalnie)'
, t_examples         : 'Przykłady:'
, t_date             : 'Data:'
, t_time             : 'Godzina:'
, t_label            : 'Tekst:'
, t_dateexamples     : 'D d M = Sob Kwi 07<br>l/j n = Sobota 7/4'
, t_timeexamples     : 'g:i a = 5:44 pm<br>H:i = 17:44'
, t_labelexamples    : 'Warszawa, GMT+1'
, t_formathelp       : '<a href="http://us.php.net/manual/pl/function.date.php">Więcej o formacie</a>'
, t_formathelplong   : '<a href="http://us.php.net/manual/pl/function.date.php">Więcej o formacie</a> (nieobsługiwane: T, e, o, u)'
, t_version          : 'Wersja xxVER (xxDATE)'
, t_about            : 'O tym gadżecie'
, t_translateby      : 'Przetłumaczył na polski Dariusz Bodzęta & Marcin Michalak'
, t_language         : 'Język:'
, t_charity          : "Zegar Preston'a jest oprogramowaniem charityware-darowiznowym. Jeśli Ci się podoba, pomyśl o darowiźnie dla mniej szczęśliwych tego świata. Na stronie projektu znajdziesz <a href=\"http://prestonhunt.com/story/110\">informację, jak złożyć darowiznę</a>."
, t_license          : "Bezpłatny do użytku domowego lub w celach dydaktyczno-naukowych, z wyłączeniem używania w firmach i innych instytucjach. <a href=\"\">więcej o licencji</a>"
, t_fontfamily1      : 'Czcionka:'
, t_fontfamily2      : 'Czcionka:'
, t_fontfamily3      : 'Czcionka:'
, t_fontsize1        : 'Rozmiar czcionki:'
, t_fontsize2        : 'Rozmiar czcionki:'
, t_fontsize3        : 'Rozmiar czcionki:'
, t_fontcolor1       : 'Kolor czcionki:'
, t_fontcolor2       : 'Kolor czcionki:'
, t_fontcolor3       : 'Kolor czcionki:'
, t_background       : 'Obraz tła'
, t_background_help  : 'Zostanie wyskalowany do 130x67 pixelów'
, t_date2            : 'Data'
, t_time2            : 'Godzina'
, t_label2           : 'Tekst'
, t_swap_labels      : 'Zamień datę i dolny tekst'
, t_dim_before       : 'Tonuj zegar w nocy o:'
, t_dim_disabled     : '(Opcja tonowania nie jest dostępna w tej strefie czasowej.)'
, t_tab1             : 'Ustawienia'
, t_tab2             : 'Wygląd'
, t_tab3             : 'O gadżecie'
, t_tab4             : 'Tło'
, t_copyright        : 'Copyright 2009-2013 Preston Hunt'
, t_auto_check       : 'Informuj, kiedy będzie dostępna nowsza wersja'
, t_update           : "Dostępna jest nowsza wersja Presto's Clock <a href=\"http://prestonhunt.com/go/sidebarclock\">Aktualizuj teraz !</a>"
, t_languagename     : 'Polski'
, t_backup_settings  : "Przenoszenie ustawień:"
, t_backup           : "Zapisz ustawienia w schowku"
, t_restore          : "Przywróć ustawienia ze schowka"
, t_dim_after   : "procent"
, t_settings_copied  : "Skopiowano ustawienia do schowka!"
, t_settings_loaded  : "Wgrano nowe ustawienia ze schowka!"
, t_settings_invalid : "Schowek nie zawierał właściwych ustawień!"
, t_title            : "Zegar Prestona"
, t_numerals         : "Rodzaj cyfr:"
},

// Dutch translation by Edwin Walstra <ewalstra@xs4all.nl>
'nl': {
	'daysLong':    ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"],
	'daysShort':   ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
	'monthsShort': ["Jan", "Feb", "Maa", "Apr","Mei", "Jun", "Jul", "Aug", "Sep","Okt", "Nov", "Dec"],
	'monthsLong':  ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
	'defaultDateFormat': "D d M",
	'defaultTimeFormat': "H:i",

	't_dateformat':    'Datumaanduiding:',
	't_timeformat':    'Tijdsaanduiding:',
	't_timezone':      'Tijdzone:',
	't_localtime':     'Lokale Tijd',
	't_bottomlabel':   'Label:',
	't_optional':      '(optioneel)',
	't_examples':      'Voorbeelden:',
	't_date':          'Datum:',
	't_time':          'Tijd:',
	't_label':         'Label:',
	't_dateexamples':  'D d M = Za 07 Apr<br>l j/n = Zaterdag 7/4',
	't_timeexamples':  'g:i a = 5:44 pm<br>H:i = 17:44',
	't_labelexamples': 'Amsterdam, CET, GMT+2',
	't_formathelp':    '<a href="http://us.php.net/manual/nl/function.date.php">Formaat help</a>',
	't_formathelplong':'<a href="http://us.php.net/manual/nl/function.date.php">Formaat help</a> (niet ondersteund: T, e, o, u)',
	't_version':       'Versie xxVER (xxDATE)',
	't_about':         'Informatie over deze gadget',
	't_translateby':   'Nederlandse vertaling door Edwin Walstra',
	't_language':      'Taal:',
  't_charity':       "Presto's Clock is Liefdadigheidsware. Vind je deze gadget goed, overweeg dan een gift aan de minderbedeelden van deze wereld. Zie de projectpagina voor <a href=\"http://prestonhunt.com/story/110\">informatie over giften</a>.",
	't_fontfamily1':     'Lettertype:',
	't_fontfamily2':     'Lettertype:',
	't_fontfamily3':     'Lettertype:',
	't_fontsize1':       'Lettergrootte:',
	't_fontsize2':       'Lettergrootte:',
	't_fontsize3':       'Lettergrootte:',
	't_fontcolor1':      'Letterkleur:',
	't_fontcolor2':      'Letterkleur:',
	't_fontcolor3':      'Letterkleur:',
  't_background':  		'Achtergrond plaatje',
	't_date2': 				 	 'Datum',
	't_time2': 				 	 'Tijd',
	't_label2': 			 	 'Label',
	't_swap_labels':     'Verwissel datum en onderste label',
  't_tab1':            'General',
  't_tab2':            'Apperance',
  't_tab3':            'About',
  't_copyright':       'Copyright 2009-2013 Preston Hunt'
},

// Swedish translation by Jari Tammisto <jari@bildagenturen.se>
'se': {
  "daysLong":    ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],
	"daysShort":   ["sön","mån","tis","ons","tor","fre","lör"],
	"monthsShort": ["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"],
	"monthsLong":  ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"],
	"defaultDateFormat": "D d M",
	"defaultTimeFormat": "H:i",

	"t_dateformat":     "Formatering av datum:",
	"t_timeformat":     "Formatering av tid:",
	"t_timezone":       "Tidszon:",
	"t_localtime":      "Lokal tid",
	"t_bottomlabel":    "Etikett:",
	"t_optional":       "(valfri)",
	"t_examples":       "Exempel:",
	"t_date":           "Datum:",
	"t_time":           "Tid:",
	"t_label":          "Etikett:",
	"t_dateexamples":   "D d M = lör 10 apr<br>l j/n = lördag 4/7",
	"t_timeexamples":   "g:i a = 5:44 pm<br>H:i = 17:44",
	"t_labelexamples":  "CET, GMT+1, Stockholm, London",
	"t_formathelp":     '<a href="http://php.net/date">Hjälp till formatering</a>',
	"t_formathelplong": '<a href="http://php.net/date">Formateringshjälp</a> (Stöds ej: T, e, o, u)',
	"t_version":        "Version xxVER (xxDATE)",
	"t_about":          "Om denna gadget",
	"t_translateby":    "Svensk översättning av Jari Tammisto",
	"t_language":       "Språk:",
	't_charity':        "Presto's Clock är så kallat Charityware. Om du gillar programmet, vänligen överväg att skänka ett bidrag till de mindre lyckligt lottade i världen. Se projektsidan för <a href=\"http://prestonhunt.com/story/110\">information om hur du kan bidra</a>.",
	't_fontfamily1':     'Teckensnitt:',
	't_fontfamily2':     'Teckensnitt:',
	't_fontfamily3':     'Teckensnitt:',
	't_fontsize1':       'Teckenstorlek:',
	't_fontsize2':       'Teckenstorlek:',
	't_fontsize3':       'Teckenstorlek:',
	't_fontcolor1':      'Teckenfärg:',
	't_fontcolor2':      'Teckenfärg:',
	't_fontcolor3':      'Teckenfärg:',
  't_background':  		'Bakgrundsbild',
	't_date2': 				 	 'Datum',
	't_time2': 				 	 'Tid',
	't_label2': 			 	 'Etikett',
	't_swap_labels':     'Växla datum och etikett',
  't_tab1':            'Allmän',
  't_tab2':            'Utseende',
  't_tab3':            'Om',
  't_copyright':       'Copyright 2009-2013 Preston Hunt'
},

// Czech translation by Jan Pintr <jan.pintr@gmail.com>
'cs': {
	'daysLong':    ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"],
	'daysShort':   ["NE", "PO", "ÚT", "ST", "ČT", "PÁ", "SO"],
	'monthsLong':  ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
	'monthsShort': ["Led", "Úno", "Bře", "Dub", "Kvě", "Čen", "Čec", "Srp", "Zář", "Říj", "Lis", "Pro"],
	'defaultDateFormat': "D M d",
	'defaultTimeFormat': "h:i a",

	't_dateformat':     'Formát data:',
	't_timeformat':     'Formát času:',
	't_timezone':       'Časové pásmo:',
	't_localtime':      'Lokální čas',
	't_bottomlabel':    'Spodní označení:',
	't_optional':       '(nepovinné)',
	't_examples':       'Příklad:',
	't_date':           'Datum:',
	't_time':           'Čas:',
	't_label':          'Označení:',
	't_dateexamples':   'D M d = SO Dub 07<br>n/j l = 4/7 sobota',
	't_timeexamples':   'g:i a = 5:44 pm<br>H:i = 17:44',
	't_labelexamples':  'Portland, Tokyo, GMT+2',
	't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">Další možnosti uspořádání</a>',
	't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">Další možnosti uspořádání</a> (nepodporuje: T, e, o, u)',
	't_version':        'Verze xxVER (xxDATE)',
	't_about':          'Informace o této aplikaci',
	't_translateby':    'Český překlad vytvořil: jan.pintr@gmail.com',
	't_language':       'Jazyk:',
	't_charity':         "Presto's Clock je Charityware. Pokud budete chtít, prosím obdarujte méně šťastné na tomto světě. Podívejte se na stránku <a href=\"http://prestonhunt.com/story/110\">s informacemi jak pomoci</a>.",
	't_fontfamily1':     'Písmo:',
	't_fontfamily2':     'Písmo:',
	't_fontfamily3':     'Písmo:',
	't_fontsize1':       'Velikost písma:',
	't_fontsize2':       'Velikost písma:',
	't_fontsize3':       'Velikost písma:',
	't_fontcolor1':      'Barva písma:',
	't_fontcolor2':      'Barva písma:',
	't_fontcolor3':      'Barva písma:',
  't_background':  		'Obrázek na pozadí',
	't_date2': 				 	 'Datum',
	't_time2': 				 	 'Čas',
	't_label2': 			 	 'Označení',
	't_swap_labels':     'Prohodit datum a spodní označení',
  't_tab1':            'Všeobecný',
  't_tab2':            'Vzhled',
  't_tab3':            'Info',
  't_copyright':       'Copyright 2009-2013 Preston Hunt',
	't_languagename':    'Čeština'
},

// German translation by Florian Thomsen <florian.thomsen@gmx.com>
'de': {
  "daysLong":    ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
	"daysShort":   ["So","Mo","Di","Mi","Do","Fr","Sa"],
	"monthsLong":  ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
	"monthsShort": ["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],
	"defaultDateFormat": "D., d. F",
	"defaultTimeFormat": "H:i",
	
	"t_dateformat":      "Datumsformat:",
	"t_timeformat":      "Zeitformat:",
	"t_timezone":        "Zeitzone:",
	"t_localtime":       "Ortszeit",
	"t_bottomlabel":     "Zusätzlicher Text:",
	"t_optional":        "(Optional)",
	"t_examples":        "Beispiele:",
	"t_date":            "Datum:",
	"t_time":            "Zeit:",
	"t_label":           "Optional:",
	"t_dateexamples":    "D M d = Sa Apr 07<br>n/j l = 4/7 Samstag",
	"t_timeexamples":    "H:i = 17:44",
	"t_labelexamples":   "Berlin, GMT+1",
	"t_formathelp":      '<a href="http://us.php.net/manual/de/function.date.php">Hilfe zu den Formaten</a>',
	"t_formathelplong":  '<a href="http://us.php.net/manual/de/function.date.php">Hilfe zu den Formaten</a> (Nicht unterstützt: T, e, o, u)',
	"t_version":         "Version xxVER (xxDATE)",
	"t_about":           "Über dieses Gadget",
	"t_translateby":     "Deutsche Übersetzung von Florian Thomsen",
	"t_language":        "Sprache:",
	't_charity':         "Presto\'s Clock ist Charityware. Wenn Ihnen diese Software gefällt, spenden Sie bitte für die hilfsbedürftigen Menschen dieser Welt. Auf meiner Homepage finden Sie weitere Infos <a href=\"http://prestonhunt.com/story/110\">wie Sie spenden</a>.",
	't_fontfamily1':     'Schrift:',
	't_fontfamily2':     'Schrift:',
	't_fontfamily3':     'Schrift:',
	't_fontsize1':       'Schriftgröße:',
	't_fontsize2':       'Schriftgröße:',
	't_fontsize3':       'Schriftgröße:',
	't_fontcolor1':       'Schriftfarbe:',
	't_fontcolor2':      'Schriftfarbe:',
	't_fontcolor3':      'Schriftfarbe:',
  't_background': 		'Hintergrundbild',
	't_date2': 					 'Datum',
	't_time2': 					 'Zeit',
	't_label2': 				 'Optional',
	't_swap_labels':     'Datum und zusätzlichen Text vertauschen',
  't_tab1':            'Einstellungen',
  't_tab2':            'Darstellung',
  't_tab3':            'Über',
  't_copyright':       'Copyright 2009-2013 Preston Hunt'
},

// Ukrainian translation by mr.gorka <mr.gorka@gmail.com>
'uk': {
	'daysLong':    ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота"],
	'daysShort':   ["Нед", "Пон", "Вів", "Сер", "Чет", "Пʼят", "Суб"],
	'monthsLong':  ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
	'monthsShort': ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
	'defaultDateFormat': "D d M ",
	'defaultTimeFormat': "h:i ",

	't_dateformat':     'Формат дати:',
	't_timeformat':     'Формат часу:',
	't_timezone':       'Часовий пояс:',
	't_localtime':      'Локальний час:',
	't_bottomlabel':    'Текст:',
	't_optional':       "(необов'язково)",
	't_examples':       'Наприклад:',
	't_date':           'Дата:',
	't_time':           'Час:',
	't_label':          'Текст:',
	't_dateexamples':   'D d M = Суб 07 Кві<br>l n/j = Субота 7/4',
	't_timeexamples':   'g:i a = 5:44 pm<br>H:i = 17:44',
	't_labelexamples':  'Ukraine, Kiev, GMT+2',
	't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">Format help</a>',
	't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">Format help</a> (не підтримується: T, e, o, u)',
	't_version':        'Версія xxVER (xxDATE)',
	't_about':          'Про гаджет',
	't_translateby':    '',
	't_language':       'Мова:',
	't_charity':        "Годинник Presto's - Безкоштовний гаджет. Якщо Вам він сподобався, будь-ласка розгляньте  можливість пожертвування менш вдалому з цього світу. Див. сторінку для цього <a href=\"http://prestonhunt.com/story/110\">information on how to donate</a>. Переклав українською Ігор Каплін",
	't_fontfamily1':     'Шрифт:',
	't_fontfamily2':     'Шрифт:',
	't_fontfamily3':     'Шрифт:',
	't_fontsize1':       'Розмір шрифту:',
	't_fontsize2':       'Розмір шрифту:',
	't_fontsize3':       'Розмір шрифту:',
	't_fontcolor1':      'Колір шрифту:',
	't_fontcolor2':      'Колір шрифту:',
	't_fontcolor3':      'Колір шрифту:',
  't_background':  		'Другорядне зображення',
	't_date2': 				 	 'Дата',
	't_time2': 				 	 'Час',
	't_label2': 			 	 'Текст',
	't_swap_labels':     'Зміна розташування дати',
  't_tab1':            'Загально', 
  't_tab2':            'Зовнішній вигляд',
  't_tab3':            'Про',
  't_copyright':       'Авторське право 2009-2013 Preston Hunt'
},

// Hungarian translation by Nagy László <nalaszi@gmail.com>
'hu': {
	'daysLong':    ["Vasárnap", "Hétfõ", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"],
	'daysShort':   ["Va", "Hé", "Ke", "Sze", "Csü", "Pé", "Szo"],
	'monthsLong':  ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
	'monthsShort': ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec"],
	'defaultDateFormat': "Y M d",
	'defaultTimeFormat': "H:i:s",

	't_dateformat':     'Dátum formátuma:',
	't_timeformat':     'Idõ formátuma:',
	't_timezone':       'Idõzóna:',
	't_localtime':      'Helyi idõ',
	't_bottomlabel':    'Alsó felirat:',
	't_optional':       '(választható)',
	't_examples':       'Példák:',
	't_date':           'Dátum:',
	't_time':           'Idõ:',
	't_label':          'Felirat:',
	't_dateexamples':   'D M d = Szo Ápr 07<br>n/j l = 4/7 Szombat',
	't_timeexamples':   'g:i a = 5:44 pm<br>H:i = 17:44',
	't_labelexamples':  'Budapest, Kaposvár, GMT+1',
	't_formathelp':     '<a href="http://us.php.net/manual/hu/function.date.php">Formázási segítség</a>',
	't_formathelplong': '<a href="http://us.php.net/manual/hu/function.date.php">Formázási segítség</a> (nem támogatott: T, e, o, u)',
	't_version':        'Verzió: xxVER (xxDATE)',
	't_about':          'Információk a minialkalmazásról',
	't_translateby':    'A magyar fordítást készítette: Nagy László',
	't_language':       'Nyelv:',
	't_charity':        "Presto Órája Charityware program. Amennyiben tetszik kérlek támogasd adományoddal a világ kevésbé szerencsés embereit. Nézd meg a részleteket <a href=\"http://prestonhunt.com/story/110\">információért hogyan adakozhatsz</a>.",
	't_fontfamily1':     'Betû:',
	't_fontfamily2':     'Betû:',
	't_fontfamily3':     'Betû:',
	't_fontsize1':       'Betûméret:',
	't_fontsize2':       'Betûméret:',
	't_fontsize3':       'Betûméret:',
	't_fontcolor1':      'Betûszín:',
	't_fontcolor2':      'Betûszín:',
	't_fontcolor3':      'Betûszín:',
  't_background':  		'Háttérkép',
	't_date2': 				 	 'Dátum',
	't_time2': 				 	 'Idõ',
	't_label2': 			 	 'Felirat',
	't_swap_labels':     'Dátum és az alsó felirat felcserélése',
  't_tab1':            'Általános', 
  't_tab2':            'Megjelenés',
  't_tab3':            'Rólunk',
  't_copyright':       'Szerzõi Jog: 2009-2013 Preston Hunt'
},

// Portuguese translation by Mateus Scherer Cardoso <matschcar@terra.com.br>
'pt': {
  daysLong:      ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],
  daysShort:      ["dom","seg","ter","qua","qui","sex","sáb"],
  monthsLong:     ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],
  monthsShort:    ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],
  defaultDateFormat:    "D M d",
  defaultTimeFormat:    "h:i a",
  t_dateformat:         "Formato da data:",
  t_timeformat:         "Formato do horário:",
  t_timezone:           "Fuso horário:",
  t_localtime:          "Horário local",
  t_bottomlabel:        "Linha inferior:",
  t_optional:           "(opcional)",
  t_examples:           "Exemplos:",
  t_date:               "Data:",
  t_time:               "Horário:",
  t_label:              "Linha:",
  t_dateexamples:       "D M d = Sáb Abr 07<br>n/j l = 4/7 Sábado",
  t_timeexamples:       "g:i a = 5:44 pm<br>H:i = 17:44",
  t_labelexamples:      "Portland, Tokyo, GMT+2",
  t_formathelp:         '<a href="http://us.php.net/manual/en/function.date.php">Ajuda do formato</a>',
  t_formathelplong:     '<a href="http://us.php.net/manual/en/function.date.php">Ajuda do formato</a> (não suportado: T, e, o, u)',
  t_version:            "Versão xxVER (xxDATE)",
  t_about:              "Sobre este gadget",
  t_translateby:        "",
  t_language:           "Idioma:",
  t_charity:            'Presto\'s Clock é Charityware. Se você gostar, por favor considere uma doação para o menos afortunado do mundo. Veja a página do projeto para <a href="http://prestonhunt.com/story/110">informações de como doar</a>.',
  t_fontfamily1:        "Fonte:",
  t_fontfamily2:        "Fonte:",
  t_fontfamily3:        "Fonte:",
  t_fontsize1:          "Tamanho da fonte:",
  t_fontsize2:          "Tamanho da fonte:",
  t_fontsize3:          "Tamanho da fonte:",
  t_fontcolor1:         "Cor da fonte:",
  t_fontcolor2:         "Cor da fonte:",
  t_fontcolor3:         "Cor da fonte:",
  t_date2:              "Data",
  t_time2:              "Horário",
  t_label2:             "Linha",
  t_swap_labels:        "Trocar a data com a linha inferior",
  t_tab1:               "Geral",
  t_tab2:               "Aparência",
  t_tab3:               "Sobre",
  t_copyright:          "Copyright 2009-2013 Preston Hunt",
  t_update:             'Uma nova versão do Presto\'s Clock está disponível. <a href="http://prestonhunt.com/go/sidebarclock">Atualize agora!</a>',
  t_languagename:       "Português"
},


// Преведено на македонски од Виктор Манчев <viktor.mancev@gmail.com>
'mk': {
	'daysLong':    ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"],
	'daysShort':   ["Нед", "Пон", "Вто", "Сре", "Чет", "Пет", "Саб"],
	'monthsLong':  ["Јануари", "Февруари", "Март", "Април", "Мај", "Јуни", "Јули", "Август", "Септември", "Октомври", "Ноември", "Декември"],
	'monthsShort': ["Јан", "Фев", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Ное", "Дек"],
	'defaultDateFormat': "D d M",
	'defaultTimeFormat': "H:i",

	't_dateformat':     'Изглед на датумот:',
	't_timeformat':     'Изглед на часовникот:',
	't_timezone':       'Временска зона:',
	't_localtime':      'Локално време',
	't_bottomlabel':    'Текст:',
	't_optional':       '(дополнително)',
	't_examples':       'Примери:',
	't_date':           'Датум:',
	't_time':           'Време:',
	't_label':          'Текст:',
	't_dateexamples':   'D d M = Саб 07 Апр<br>n/j l = 4/7 Сабота',
	't_timeexamples':   'g:i a = 5:44 pm<br>H:i = 17:44',
	't_labelexamples':  'Скопје, UTC+1',
	't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">Помош за изгледот</a>',
	't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">Помош за изгледот</a> (не се поддржани: T, e, o, u)',
	't_version':        'Верзија xxVER (xxDATE)',
	't_about':          'За овој gadget',
	't_translateby':    'Преведено на македонски од Виктор Манчев',
	't_language':       'Јазик:',
	't_charity':        "Presto's Clock претставува Charityware. Ако ви се допаѓа и често го користите, ве молам размислете да донирате на помалку среќните. Посетете ја веб-страницата на проектов <a href=\"http://prestonhunt.com/story/110\">за повеќе информации</a>.",
	't_fontfamily1':     'Фонт:',
	't_fontfamily2':     'Фонт:',
	't_fontfamily3':     'Фонт:',
	't_fontsize1':       'Големина на фонтот:',
	't_fontsize2':       'Големина на фонтот:',
	't_fontsize3':       'Големина на фонтот:',
	't_fontcolor1':      'Боја на фонтот:',
	't_fontcolor2':      'Боја на фонтот:',
	't_fontcolor3':      'Боја на фонтот:',
  't_background':  		'Позадина',
	't_date2': 				 	 'Датум',
	't_time2': 				 	 'Време',
	't_label2': 			 	 'Текст',
	't_swap_labels':     'Промени ги местата на датумот и текстот',
  't_tab1':            'Општо', 
  't_tab2':            'Изглеd',
  't_tab3':            'Информации',
  't_copyright':       'Copyright 2009-2013 Preston Hunt',
  't_update':          "Достапна е понова верзија од Presto's Clock. <a href=\"http://prestonhunt.com/go/sidebarclock\">Превземете ја!</a>",
  't_languagename':    'Mакедонски'
},

// Afrikaans translation by Constant Van Wyk <constant.vanwyk@xtremekiwi.com>
'af': {
  // Do not change the order of the days or months!
	'daysLong':    ["Sondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrydag", "Saterdag"],
	'daysShort':   ["Son", "Ma", "Di", "Wo", "Do", "Vr", "Sa"],
	'monthsLong':  ["Januarie", "Februarie", "Maart", "April", "Mei", "Junie", "Julie", "Augustus", "September", "Oktober", "November", "Desember"],
	'monthsShort': ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  // Update these with the correct format for your country
	'defaultDateFormat': "D M d",
	'defaultTimeFormat': "h:i a",

	't_dateformat':     'Datum formaat:',
	't_timeformat':     'Tyd formaat:',
	't_timezone':       'Tyd zone:',
	't_localtime':      'Plaaslike tyd',
	't_bottomlabel':    'Onderste etiket:',
	't_optional':       '(Optioneel)',
	't_examples':       'Voorbeeld:',
	't_date':           'Datum:',
	't_time':           'Tyd:',
	't_label':          'Etiket:',
	't_dateexamples':   'D M d = Sa Apr 07<br>n/j l = 4/7 Saterdag',
	't_timeexamples':   'g:i a = 5:44 nm<br>H:i = 17:44',
	't_labelexamples':  'Portland, Tokyo, GMT+2',
	't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">Format help</a>',
	't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">Format help</a> (unsupported: T, e, o, u)',
	't_version':        'Veergawe xxVER (xxDATE)',
	't_about':          'Inligitng oor gadget',
	't_translateby':    '',
	't_language':       'Taal:',
	't_charity':        "Presto's Clock is Liefdadigheids waare. As jy ddar van hou, stuur asseblief `n donasie aan die minder bevoregtes. Verwys asseblief na die project blad <a href=\"http://prestonhunt.com/story/110\">information on how to donate</a>.",
	't_fontfamily1':     'Karaktertipe:',
	't_fontfamily2':     'Karaktertipe:',
	't_fontfamily3':     'Karaktertipe:',
	't_fontsize1':       'Karaktertipe grootte:',
	't_fontsize2':       'Karaktertipe grootte:',
	't_fontsize3':       'Karaktertipe grootte:',
	't_fontcolor1':      'Karaktertipe kleur:',
	't_fontcolor2':      'Karaktertipe kleur:',
	't_fontcolor3':      'Karaktertipe kleur:',
  't_background':  		'Agtergrond prentjie',
	't_date2': 				 	 'Datum',
	't_time2': 				 	 'Tyd',
	't_label2': 			 	 'Label',
	't_swap_labels':     'Ruil die datum and onderste etiket om',
  't_tab1':            'Algemeen', 
  't_tab2':            'Voorkoms',
  't_tab3':            'Inligting',
  't_copyright':       'Kopiereg 2009-2013 Preston Hunt',
  't_update':          "1n Nuwer weergawe van die Presto's Clock is hier beskikbaar. <a href=\"http://prestonhunt.com/go/sidebarclock\">Update now!</a>",
  't_languagename':    'Afrikaans'
},

// Lithuanian translation by Gintaras Pavilionis <fongintas@gmail.com>
'lt': {
	'daysLong':    ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"],
	'daysShort':   ["S", "Pr", "A", "T", "K", "Pn", "Š"],
	'monthsLong':  ["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"],
	'monthsShort': ["Sau", "Vas", "Kov", "Bal", "Geg", "Birž", "Lie", "Rugpj", "Rugs", "Spa", "Lapkr", "Gruo"],
	'defaultDateFormat': "Y F d",
	'defaultTimeFormat': "H:i:s",

	't_dateformat':     'Datos formatas:',
	't_timeformat':     'Laiko formatas:',
	't_timezone':       'Laiko juosta:',
	't_localtime':      'Vietos laikas',
	't_bottomlabel':    'Tekstas:',
	't_optional':       '(papildomai)',
	't_examples':       'Pavyzdžiai:',
	't_date':           'Data:',
	't_time':           'Laikas:',
	't_label':          'Tekstas:',
	't_dateexamples':   'Y F d = 2009 Lapkričio 24<br>y n/j l = 09 11/24 Antradienis',
	't_timeexamples':   'g:i a = 5:44 pm<br>H:i = 17:44',
	't_labelexamples':  'Vilnius, Ryga, GMT+2',
	't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">Formato pagalba</a>',
	't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">Formato pagalba</a> (nepalaikoma: T, e, o, u)',
  // Don't modify xxVER or xxDATE
	't_version':        'Versija xxVER (xxDATE)',
	't_about':          'Apie',
	't_translateby':    'Išvertė į lietuvių kalbą Gintaras Pavilionis',
	't_language':       'Kalba:',
	't_charity':        "Presto's Clock yra Charityware (labdaros išlaikoma programa). Jeigu Jums patiko programa ir norėtumėte prisidėti prie jos palaikymo ir tobulinimo, prašome Jus, paaukoti mažiau pasiekusiems šiame pasaulyje. Žiūrėkite projekto puslapyje <a href=\"http://prestonhunt.com/story/110\">informacija kaip paaukoti</a>.",
	't_fontfamily1':     'Šriftas:',
	't_fontfamily2':     'Šriftas:',
	't_fontfamily3':     'Šriftas:',
	't_fontsize1':       'Šrifto dydis:',
	't_fontsize2':       'Šrifto dydis:',
	't_fontsize3':       'Šrifto dydis:',
	't_fontcolor1':      'Šrifto spalva:',
	't_fontcolor2':      'Šrifto spalva:',
	't_fontcolor3':      'Šrifto spalva:',
  't_background':  		'Fonas',
	't_date2': 				 	 'Data',
	't_time2': 				 	 'Laikas',
	't_label2': 			 	 'Tekstas',
	't_swap_labels':     'Sukeisti vietomis datą su tekstu',
  't_tab1':            'Bendri', 
  't_tab2':            'Nustatymai',
  't_tab3':            'Apie programą',
  't_copyright':       'Copyright 2009-2013 Preston Hunt',
  't_update':          "Galima naujesnė Presto's Clock versija. <a href=\"http://prestonhunt.com/go/sidebarclock\">Atnaujinti!</a>",
  // Replace English with the name of your language in your language
  't_languagename':    'Lietuvių'
},

// Slovenian translation by Janez Pobezin <janez76@gmail.com>
'sl': {
  // Do not change the order of the days or months!
  'daysLong':    ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"],
  'daysShort':   ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"],
  'monthsLong':  ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
  'monthsShort': ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
  // Update these with the correct format for your country
  'defaultDateFormat': "D d M",
  'defaultTimeFormat': "H:i",

  't_dateformat':     'Oblika datuma:',
  't_timeformat':     'Oblika časa:',
  't_timezone':       'Časovna cona:',
  't_localtime':      'Krajevni čas',
  't_bottomlabel':    'Napis spodaj:',
  't_optional':       '(možnost)',
  't_examples':       'Primer:',
  't_date':           'Datum:',
  't_time':           'Čas:',
  't_label':          'Naslov:',
  't_dateexamples':   'D M d = Sob Apr 07<br>n/j l = 4/7 Sobota',
  't_timeexamples':   'g:i a = 5:44 pm<br>H:i = 17:44',
  't_labelexamples':  'Portland, Tokyo, GMT+2',
  't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">Format help</a>',
  't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">Pomoč</a> (ne podpira: T, e, o, u)',
  // Don't modify xxVER or xxDATE
  't_version':        'Različica xxVER (xxDATE)',
  't_about':          'O programu',
  // If you want credit for translation, translate "V slovenščino prevedel Janez Pobežin"
  't_translateby':    'V slovenščino prevedel Janez Pobežin',
  't_language':       'Jezik:',
  't_charity':        "Presto's Clock je zasnovan na prostovoljnih prispevkih. Če vam je program všeč, vas prosimo, da razmislite o donaciji. Obiščite projektno stran za <a href=\"http://prestonhunt.com/story/110\">informacije kako lahko donirate</a>.",
  't_fontfamily1':     'Pisava:',
  't_fontfamily2':     'Pisava:',
  't_fontfamily3':     'Pisava:',
  't_fontsize1':       'Velikost pisave:',
  't_fontsize2':       'Velikost pisave:',
  't_fontsize3':       'Velikost pisave:',
  't_fontcolor1':      'Barva pisave:',
  't_fontcolor2':      'Barva pisave:',
  't_fontcolor3':      'Barva pisave:',
 't_background':     'Slika za ozadje',
  't_date2':           'Datum',
  't_time2':           'Ura',
  't_label2':          'Naslov',
  't_swap_labels':     'Zamenjaj datum in spodnjo oznako oz. napis',
  't_tab1':            'Osnovno', 
  't_tab2':            'Izgled',
  't_tab3':            'O programu',
  't_copyright':       'Avtorske pravice 2009-2013 Preston Hunt',
  't_update':          "Novejša različica programa Presto's Clock je dosegljiva. <a href=\"http://prestonhunt.com/go/sidebarclock\">Update now!</a>",
  't_languagename':    'Slovenščina'
},

// Serbian translation by Milan <n.milan.n@gmail.com>
'sr': {
	'daysLong':    ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"],
	'daysShort':   ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"],
	'monthsLong':  ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
	'monthsShort': ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
	'defaultDateFormat': "D M d",
	'defaultTimeFormat': "h:i a",

	't_dateformat':     'Format datuma:',
	't_timeformat':     'Format vremena:',
	't_timezone':       'Vremenska zona:',
	't_localtime':      'Lokalno vreme',
	't_bottomlabel':    'Donji naslov:',
	't_optional':       '(opcionalno)',
	't_examples':       'Primer:',
	't_date':           'Datum:',
	't_time':           'Vreme:',
	't_label':          'Naslov:',
	't_dateexamples':   'D M d = Sub Apr 07<br>n/j l = 4/7 Subota',
	't_timeexamples':   'g:i a = 5:44 pm<br>H:i = 17:44',
	't_labelexamples':  'Portland, Tokyo, GMT+2',
	't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">Pomoć za oblik prikaza</a>',
	't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">Format help</a> (Nije podržano: T, e, o, u)',
	't_version':        'Verzija xxVER (xxDATE)',
	't_about':          'Info o gadget-u',
	't_translateby':    'Na srpski preveo Milan Nagulić',
	't_language':       'Jezik:',
	't_charity':        "Presto's Clock je zasnovan na dobrovoljnim donacijama. Ako Vam se sviđa, molim Vas razmislite o donaciji manje srećnim ljudima u svetu. Pogledajte projektnu stranicu za <a href=\"http://prestonhunt.com/story/110\">Informaciju kako da date donaciju</a>.",
	't_fontfamily1':     'Font:',
	't_fontfamily2':     'Font:',
	't_fontfamily3':     'Font:',
	't_fontsize1':       'Veličina fonta:',
	't_fontsize2':       'Veličina fonta:',
	't_fontsize3':       'Veličina fonta:',
	't_fontcolor1':      'Boja fonta:',
	't_fontcolor2':      'Boja fonta:',
	't_fontcolor3':      'Boja fonta:',
  't_background':  		'Pozadinska slika',
	't_date2': 				 	 'Datum',
	't_time2': 				 	 'Vreme',
	't_label2': 			 	 'Naslov',
	't_swap_labels':     'Zamenite datum sa donjim naslovom',
  't_tab1':            'Opšte', 
  't_tab2':            'Izgled',
  't_tab3':            'Info',
  't_copyright':       'Autorsko pravo 2009-2013 Preston Hunt'
},

// Marathi
'mr': {
  // Do not change the order of the days or months!
	'daysLong':    ["रविवार", "सोमवार", "मंगळवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
	'daysShort':   ["रवि", "सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"],
	'monthsLong':  ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जूलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"],
	'monthsShort': ["जाने", "फेब्रु", "मार्च", "एप्रिल", "मे", "जून", "जूलै", "ऑगस्ट", "सप्टें", "ऑक्टो", "नोव्हें", "डिसें"],
  'am':          'पू.मा.',
  'pm':          'उ.मा.',
  // Update these with the correct format for your country
	'defaultDateFormat': "l d M",
	'defaultTimeFormat': "g:i a",

	't_dateformat':     'दिनांक स्वरुप:',
	't_timeformat':     'वेळ स्वरुप:',
	't_timezone':       'कालविभाग:',
	't_localtime':      'स्थानिक वेळ',
	't_bottomlabel':    'तळमजकूर:',
	't_optional':       '(ऐच्छिक)',
	't_examples':       'उदाहरणे:',
	't_date':           'दिनांक:',
	't_time':           'वेळ:',
	't_label':          'मजकूर:',
	't_dateexamples':   'D M d = शनि एप्रिल ०७<br>n/j l = ४/७ शनिवार',
	't_timeexamples':   'g:i a = ५:४४ उ.मा.<br>H:i = १७:४४',
	't_labelexamples':  'पुणे, भारत, जी एम टी+५.३०',
	't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">स्वरुपन मदत</a>',
	't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">स्वरुपन मदत</a> (unsupported: T, e, o, u)',
  // Don't modify xxVER or xxDATE
	't_version':        'आवृत्ती xxVER (xxDATE)',
	't_about':          'या उपकरणा विषयी',
  // If you want credit for translation, translate "Languagename translation by your name"
	't_translateby':    'मराठी भाषांतर संतोष साळुंके यांनी केले',
	't_language':       'भाषा:',
	't_charity':        "प्रेस्टोचे घडयाळ हा एक धर्मदाय प्रकल्प आहे. जर तुम्हाला आमचा हा प्रयत्न आवडला असेल तर कृपया दान करा. <a href=\"http://prestonhunt.com/story/110\">देणगी व प्रकल्पा विषयी अधिक माहिती येथे वाचा.</a>.",
	't_fontfamily1':     'अक्षरशैली:',
	't_fontfamily2':     'अक्षरशैली:',
	't_fontfamily3':     'अक्षरशैली:',
	't_fontsize1':       'अक्षरांचा आकार:',
	't_fontsize2':       'अक्षरांचा आकार:',
	't_fontsize3':       'अक्षरांचा आकार:',
	't_fontcolor1':      'अक्षरांचा रंग:',
	't_fontcolor2':      'अक्षरांचा रंग:',
	't_fontcolor3':      'अक्षरांचा रंग:',
  't_background':  		'पार्श्वचित्र',
	't_date2': 				 	 'दिनांक',
	't_time2': 				 	 'वेळ',
	't_label2': 			 	 'मजकूर',
	't_swap_labels':     'दिनांक व तळमजकूर यांच्या जागांची अदलाबदल करा',
  't_tab1':            'साधारण', 
  't_tab2':            'स्वरुप',
  't_tab3':            'विषयक',
  't_tab4':            'पार्श्वभूमी',
  't_copyright':       'प्रताधिकार २००९ प्रेस्टो हंट. सर्व हक्क स्वाधीन.',
  't_update':          "प्रेस्टोच्या घडयाळाची नवीन आवृत्ती आता उपलब्ध आहे. <a href=\"http://prestonhunt.com/go/sidebarclock\">येथुन अद्ययावत करा.</a>",
  // Replace English with the name of your language in your language
  't_languagename':    'मराठी',

  't_backup_settings': "सेटिंग्जचा बॅकअप ",
  't_backup':          "सेटिंग्जचा बॅकअप क्लिपबोर्डवर ठेवा",
  't_restore':         "सेटिंग्जचा बॅकअप क्लिपबोर्डवरुन आयात करा"
},

'zh': {
  // Do not change the order of the days or months!
  'daysLong':    ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  'daysShort':   ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  'monthsLong':  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  'monthsShort': ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  //'am':          '上午',
  //'pm':          '下午',
  // Update these with the correct format for your country
  'defaultDateFormat': "n月 j日 D",
  'defaultTimeFormat': "H:i",

  't_dateformat':     '日期格式:',
  't_timeformat':     '时间格式:',
  't_timezone':       '时区:',
  't_localtime':      '本地时间',
  't_bottomlabel':    '下标:',
  't_optional':       '(可选)',
  't_examples':       '样例:',
  't_date':           '日期:',
  't_time':           '时间:',
  't_label':          '标识:',
  't_dateexamples':   'M d D = 4月 7日 星期日',
  't_timeexamples':   'g:i a = 5:44 下午<br>H:i = 17:44',
  't_labelexamples':  '北京,重庆,香港 GMT+8',
  't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">格式信息</a>',
  't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">格式信息</a> (不支持: T, e, o, u)',
  // Don't modify xxVER or xxDATE
  't_version':        '版本 xxVER (xxDATE)',
  't_about':          '关于这个小玩意',
  // If you want credit for translation, translate "Languagename translation by your name"
  't_translateby':    '中文翻译 Knight Lin',
  't_language':       '语言:',
  't_charity':        "Presto's Clock 是一个慈善软件,如果你喜欢,请考虑为需要幸福的世界捐出您的一份心意. 请参照项目页面 <a href=\"http://prestonhunt.com/story/110\">关于如何捐赠</a>.",
  't_fontfamily1':     '字体:',
  't_fontfamily2':     '字体:',
  't_fontfamily3':     '字体:',
  't_fontsize1':       '字体大小:',
  't_fontsize2':       '字体大小:',
  't_fontsize3':       '字体大小:',
  't_fontcolor1':      '字体颜色:',
  't_fontcolor2':      '字体颜色:',
  't_fontcolor3':      '字体颜色:',
 't_background':     '背景图片',
  't_date2':           '日期',
  't_time2':           '时间',
  't_label2':          '时钟标识',
  't_swap_labels':     '交换日期和时钟标识位置',
  't_tab1':            '常规', 
  't_tab2':            '显示',
  't_tab3':            '关于',
  't_copyright':       '版权 2009-2013 Preston Hunt',
  't_update':          "Presto's Clock 版本更新. <a href=\"http://prestonhunt.com/go/sidebarclock\">立即更新!</a>",
  // Replace English with the name of your language in your language
  't_languagename':    '简体中文'
},

'eo': {
  // Do not change the order of the days or months!
	'daysLong':    ["dimanĉo", "lundo", "mardo", "merkredo", "ĵaŭdo", "vendredo", "sabato"],
	'daysShort':   ["dim", "lun", "mar", "mer", "ĵaŭ", "ven", "sab"],
	'monthsLong':  ["januaro", "februaro", "marto", "aprilo", "majo", "junio", "julio", "aŭgusto", "septembro", "oktobro", "novembro", "decembro"],
	'monthsShort': ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aŭg", "sep", "okt", "nov", "dec"],
  'am':          'atm',
  'pm':          'ptm',
  // Update these with the correct format for your country
	'defaultDateFormat': 'D, j\a \d\e M',
	'defaultTimeFormat': "H:i",

	't_dateformat':     'Data formo:',
	't_timeformat':     'Tempa formo:',
	't_timezone':       'Tempa zono:',
	't_localtime':      'Loka tempo',
	't_bottomlabel':    'Malsupra etikedo:',
	't_optional':       '(nedeviga)',
	't_examples':       'Ekzemploj:',
	't_date':           'Dato:',
	't_time':           'Tempo:',
	't_label':          'Etikedo:',
	't_dateexamples':   'D M d = sab apr 07<br>n/j l = 4/7 sabato<br>l, \\l\\a j\\a \\d\\e F = sabado, la 7a de aprilo',
	't_timeexamples':   'g:i a = 5:44 ptm<br>H:i = 17:44',
	't_labelexamples':  'Portland, Tokyo, GMT+2',
	't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">Forma helpo</a>',
	't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">Forma helpo</a> (malsubtenita: T, e, o, u)',
  // Don't modify xxVER or xxDATE
	't_version':        'Eldonnumero xxVER (xxDATE)',
	't_about':          'Pri ĉi tiu aparato',
  // If you want credit for translation, translate "Languagename translation by your name"
	't_translateby':    '',
	't_language':       'Lingvo:',
	't_charity':        "Presto's Clock estas 'Charityware' (bonfarada softvaro). Se vi aprecas ĝin, bonvolu pripensi donacon al la malpli bonsortaj gentoj de la mondo. Vidu la projektan paĝon trovi <a href=\"http://prestonhunt.com/story/110\">informon sur kiel donaci</a>.",
	't_fontfamily1':     'Litertipo:',
	't_fontfamily2':     'Litertipo:',
	't_fontfamily3':     'Litertipo:',
	't_fontsize1':       'Litertipa grandeco:',
	't_fontsize2':       'Litertipa grandeco:',
	't_fontsize3':       'Litertipa grandeco:',
	't_fontcolor1':      'Litertipa koloro:',
	't_fontcolor2':      'Litertipa koloro:',
	't_fontcolor3':      'Litertipa koloro:',
  't_background':  		 'Fona bildo',
	't_date2': 				 	 'Dato',
	't_time2': 				 	 'Tempo',
	't_label2': 			 	 'Etikedo',
	't_swap_labels':     'Interŝanĝu dato kun malsupra etikedo',
	't_dim_before':      'Obskurigu horloĝon ĉe nokto (beta-ekzaminanta)',
  't_tab1':            'Vulgara informo', 
  't_tab2':            'Aspekto',
  't_tab3':            'Pri tio ĉi',
  't_tab4':            'Fono',
  't_copyright':       'Tio ĉi estas kopirajta 2009-2013 Preston Hunt',
  't_auto_check':      'Sciigas min kiam novaj versioj de la horloĝo estas havebla',
  't_update':          "Pli nova versio de Presto's Clock estas havebla. <a href=\"http://prestonhunt.com/go/sidebarclock\">Akiras la ĝisdatigon nun!</a>",
  // Replace Esperanto with the name of your language in your language
  't_languagename':    'Esperanto',

  't_backup_settings': "Rezervaj fiksoj",
  't_backup':          "Rezervaj fiksoj al clipboard",
  't_restore':         "Restarigas fiksojn de *clipboard",
  't_dim_after':  "Procento obskurigi horloĝon ĉe sunsubiro"
},

// Catalan translation by Enric Montorio i Puig <enric.mon2@gmail.com>
'ca': {
  // Do not change the order of the days or months!
	'daysLong':    ["Diumenge", "Dilluns","Dimarts","Dimecres","Dijous","Divendres","Dissabte"],
	'daysShort':   ["Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"],
	'monthsLong':  ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
	'monthsShort': ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"],
  'am':          'am',
  'pm':          'pm',
  // Update these with the correct format for your country
	'defaultDateFormat': "D M d",
	'defaultTimeFormat': "h:i a",

	't_dateformat':     'Format data:',
	't_timeformat':     'Format hora:',
	't_timezone':       'Zona horària:',
	't_localtime':      'Hora local',
	't_bottomlabel':    'Etiqueta:',
	't_optional':       '(opcional)',
	't_examples':       'Exemples:',
	't_date':           'Data:',
	't_time':           'Hora:',
	't_label':          'Etiqueta:',
	't_dateexamples':   'D M d = Ds Abr 07<br>n/j l = 4/7 Dissabte',
	't_timeexamples':   'g:i a = 5:44 pm<br>H:i = 17:44',
	't_labelexamples':  'Portland, Tokyo, GMT+2',
	't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">Ajuda amb el format</a>',
	't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">Ajuda amb el format</a> (sense suport: T, e, o, u)',
  // Don't modify xxVER or xxDATE
	't_version':        'Versió xxVER (xxDATE)',
	't_about':          'En quant a aquest gadget',
  // If you want credit for translation, translate "Languagename translation by your name"
	't_translateby':    'Traduït al català per Enric Montorio i Puig',
	't_language':       'Idioma:',
	't_charity':        "Presto és un rellotge Charityware. Si t'agrada, si us plau, consideri una donació per als menys afortunats del món. Visiteu la pàgina del projecte per obtenir informació sobre com  <a href=\"http://prestonhunt.com/story/110\"> donar. </ a>",
  't_license':        "Gratuït per a ús personal o educatiu. Cal llicència per a ús comercial o de govern. Consulteu la informació de la llicència per més detalls.",
	't_fontfamily1':     'Lletra:',
	't_fontfamily2':     'Lletra:',
	't_fontfamily3':     'Lletra:',
	't_fontsize1':       'Tamany lletra:',
	't_fontsize2':       'Tamany lletra:',
	't_fontsize3':       'Tamany lletra:',
	't_fontcolor1':      'Color lletra:',
	't_fontcolor2':      'Color lletra:',
	't_fontcolor3':      'Color lletra:',
  't_background':  		 'Imatge de fons',
  't_background_help': 'Es canviarà la mida de 130x67 píxels',
	't_date2': 				 	 'Data',
	't_time2': 				 	 'Hora',
	't_label2': 			 	 'Etiqueta',
	't_swap_labels':     "Bescanvi, la data a baix i l'etiqueta amunt",
	't_dim_before':      'Atenua el rellotge a la nit',
  't_dim_disabled':    '(La atenuació no està disponible per aquesta selecció de zona horària.)',
  't_tab1':            'General', 
  't_tab2':            'Aparença',
  't_tab3':            'En quant a',
  //'t_tab4':            'Background',
  't_copyright':       'Copyright 2009-2013 Preston Hunt',
  't_auto_check':      'Notificar quan les noves versions del rellotge estiguin disponibles',
  't_update':          "Una nova versió del rellotge Presto està disponible. <a href=\"http://prestonhunt.com/go/sidebarclock\">Actualitza ara</a>",
  // Put the name of your language in your language (e.g., "German" is "Deutsch")
  't_languagename':    'Català',

  't_backup_settings': "configuració de còpia de seguretat",
  't_backup':          "Configuració de còpia de seguretat al porta-retalls",
  't_restore':         "Restaurar la configuració des del porta-retalls",
  't_dim_after':  "per cent"
},

// Norwegian translation by Tom Ryan Svart <sydox86@gmail.com>
'no': {
  // Do not change the order of the days or months!
	'daysLong':    ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
	'daysShort':   ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
	'monthsLong':  ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
	'monthsShort': ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
 	'am':          'am',
 	'pm':          'pm',

  // Update these with the correct format for your country
	'defaultDateFormat': "D n/j",
	'defaultTimeFormat': "H:i",

	't_dateformat':     'Dato format:',
	't_timeformat':     'Tids format:',
	't_timezone':       'Tids sone:',
	't_localtime':      'Lokal tid',
	't_bottomlabel':    'Under etikett:',
	't_optional':       '(alternativt)',
	't_examples':       'Eksempler:',
	't_date':           'Dato:',
	't_time':           'Tid:',
	't_label':          'Etikett:',
	't_dateexamples':   'D M d = Lør Apr 07<br>n/j l = 4/7 Lørdag',
	't_timeexamples':   'g:i a = 5:44 pm<br>H:i = 17:44',
	't_labelexamples':  'Portland, Tokyo, GMT+2',
	't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">Format hjelp</a>',
	't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">Format hjelp</a> (ustøttet: T, e, o, u)',

  // Don't modify xxVER or xxDATE
	't_version':        'Versjon xxVER (xxDATE)',
	't_about':          'Om dette miniprogrammet',

  // If you want credit for translation, translate "Languagename translation by your name"
	't_translateby':    'Norsk oversettelse av Tom Ryan Svart',
	't_language':       'Språk:',
	't_charity':        "Presto's Clock er <a href=\"http://charityware.info/wiki/what-is-a-charityware\">Charityware</a>. Hvis du liker det, gi gjerne en liten sum til de mer trengende i verden. Pengene går til UNICEF. <a href=\"http://prestonhunt.com/story/110\">Les mer!</a>.",
	't_fontfamily1':    'Skrift:',
	't_fontfamily2':    'Skrift:',
	't_fontfamily3':    'Skrift:',
	't_fontsize1':      'Skrift størresle:',
	't_fontsize2':      'Skrift størresle:',
	't_fontsize3':      'Skrift størresle:',
	't_fontcolor1':     'Skrift farge:',
	't_fontcolor2':     'Skrift farge:',
	't_fontcolor3':     'Skrift farge:',
  't_background':     'Bakgrunnsbilde',
	't_date2': 	    'Dato',
	't_time2':	    'Tid',
	't_label2':	    'Etikett',
	't_swap_labels':    'Bytt om dato og under etikett',
	't_tab1':           'Generell', 
	't_tab2':           'Utseende',
	't_tab3':           'Om',
	't_tab4':           'Bakgrund',
	't_copyright':      'Copyright 2009-2013 Preston Hunt',
	't_update':         "En nyere versjon av Presto's Clock er tilgjengelig. <a href=\"http://prestonhunt.com/go/sidebarclock\">Oppdater nå!</a>",

  // Replace English with the name of your language in your language

	't_languagename':   'Norsk',

	't_backup_settings': "Sikkerhetskopier instillinger",
	't_backup':          "Eksporter instillinger til utklippstavle",
	't_restore':         "Importer instillinger fra utklippstavle"
},

'ro': {
  // Do not change the order of the days or months!
	'daysLong':    ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"],
	'daysShort':   ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
	'monthsLong':  ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
	'monthsShort': ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Noi", "Dec"],
  'am':          'am',
  'pm':          'pm',
  // Update these with the correct format for your country
	'defaultDateFormat': "D, d M",
	'defaultTimeFormat': "H:i",

	't_dateformat':     'Format dată:',
	't_timeformat':     'Format oră:',
	't_timezone':       'Fus orar:',
	't_localtime':      'Ora locală',
	't_bottomlabel':    'Etichetă:',
	't_optional':       '(opțional)',
	't_examples':       'Exemple:',
	't_date':           'Data:',
	't_time':           'Ora:',
	't_label':          'Etichetă:',
	't_dateexamples':   'D M d = Sâm Apr 07<br>n/j l = 4/7 Sâmbătă',
	't_timeexamples':   'g:i a = 5:44 pm<br>H:i = 17:44',
	't_labelexamples':  'Portland, Tokyo, GMT+2',
	't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">Ajutor formate</a>',
	't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">Ajutor formate</a> (nesuportat: T, e, o, u)',
  // Don't modify xxVER or xxDATE
	't_version':        'Versiune xxVER (xxDATE)',
	't_about':          'Despre acest gadget',
  // If you want credit for translation, translate "Languagename translation by your name"
	't_translateby':    'Goia Valentin'
, t_language:       'Language:',
	't_charity':        "Presto's Clock este gratuit. Dacă vă place acest gadget, vă rog contribuiți cu o donație. Vizitați pagina mea pentru a afla <a href=\"http://prestonhunt.com/story/110\">cum se poate face o donație</a>.",
  't_license':        "Licență gratuită pentru uz personal sau educațional. Pentru uz comercial necesită licență plătită. Vizitați <a href=\"\">informații despre licență</a> pentru mai multe detalii.",
	't_fontfamily1':     'Font:',
	't_fontfamily2':     'Font:',
	't_fontfamily3':     'Font:',
	't_fontsize1':       'Mărime font:',
	't_fontsize2':       'Mărime font:',
	't_fontsize3':       'Mărime font:',
	't_fontcolor1':      'Culoare font:',
	't_fontcolor2':      'Culoare font:',
	't_fontcolor3':      'Culoare font:',
  't_background':  		 'Imagine fundal',
  't_background_help': 'Va fi redimensionată la 130x67 pixeli',
	't_date2': 				 	 'Data',
	't_time2': 				 	 'Ora',
	't_label2': 			 	 'Eticheta',
	't_swap_labels':     'Inversează data cu eticheta',
	't_dim_before':      'Noaptea se reduce lumina ceasului cu',
  't_dim_disabled':    '(Reducerea luminii ceasului nu este disponibilă pentru acest fus orar.)',
  't_tab1':            'General', 
  't_tab2':            'Aspect',
  't_tab3':            'Despre',
  //'t_tab4':            'Fundal',
  't_copyright':       'Copyright 2009-2013 Preston Hunt',
  't_auto_check':      'Anunță-mă când apare o vesiune nouă',
  't_update':          "O nouă versiune este disponibilă. <a href=\"http://prestonhunt.com/go/sidebarclock\">Actualizează acum!</a>",
  // Replace the word below with the name of your language in your language
  't_languagename':    'Română',

  't_backup_settings': "Salvează setările",
  't_backup':          "Salvează setările în clipboard",
  't_restore':         "Restaurează setările din clipboard",
  't_dim_after':  "procente"
},

// Irish Gaelic translation by April McCabe
ga:
{ daysLong:    ["Dé Domhnaigh", "Dé Luain", "Dé Máirt", "Dé Céadaoin", "Déardaoin", "Dé hAoine", "Dé Sathairn"]
, daysShort:   ["Dom", "Lua", "Mái", "Céa", "Déa", "Aoi", "Sat"]
, monthsLong:  ["Eanáir", "Feabhra", "Márta", "Aibreán", "Bealtaine", "Meitheamh", "Iúil", "Lúnasa", "Meán Fómhair", "Deireadh Fómhair", "Samhain", "Nollaig"]
, monthsShort: ["Ean", "Fea", "Mar", "Aib", "Bea", "Mei", "Iúi", "Lún", "MeáFó", "DeiFó", "Sam", "Nol"]
, am:          "rn"
, pm:          "in"

// Update these with the correct format for your country
, defaultDateFormat: "j F Y D"
, defaultTimeFormat: "g:i a"

, t_dateformat:     "Formáid an dáta:"
, t_timeformat:     "Formáid an ama:"
, t_timezone:       "Amchrios:"
, t_localtime:      "Am Áitiúil"
, t_bottomlabel:    "Bunlipéad:"
, t_optional:       "(roghnach)"
, t_examples:       "Samplaí:"
, t_date:           "Dáta:"
, t_time:           "Am:"
, t_label:          "Lipéad:"
, t_dateexamples:   "D M d = Sat Aib 07<br>n/j l = 4/7 Dé Sathairn"
, t_timeexamples:   "g:i a = 5:44 in<br>H:i = 17:44"
, t_labelexamples:  "Baile Átha Cliath, Tokyo, GMT+2"
, t_formathelp:     "<a href=http://us.php.net/manual/en/function.date.php>Format help</a>"
, t_formathelplong: "<a href=http://us.php.net/manual/en/function.date.php>Format help</a> (unsupported: T, e, o, u)"
  // Don't modify xxVER or xxDATE
, t_version:        "Leagan xxVER (xxDATE)"
, t_about:          "Faoin nGiuirléid Seo"
  // If you want credit for translation, translate "Languagename translation by your name"
, t_translateby:    "Aistriúchán le AKMcCabe"
, t_language:       "Teanga:"
, t_charity:        "Is bogearraí carthanach é Clog Phresto. Más maith leat é, le do thoil, déan deirc ar dhuine bocht. Is féidir leat dul go dtí an <a href=\"http://prestonhunt.com/story/110\">suíomh seo chun níos mó eolais a fháil.</a>."
, t_license:        "Saor in aisce le leas pearsanta nó leas oideachasúil. Tá ceadúnas de dhíth ar chomhlachtaí tráchtála agus rialtais roimh úsáid. Breathnaigh ar <a href=\"\">shonraí an cheadúnais</a> chun níos mó eolais a fháil."
, t_fontfamily1:     "Clófhoirne:"
, t_fontfamily2:     "Clófhoirne:"
, t_fontfamily3:     "Clófhoirne:"
, t_fontsize1:       "Méid an Chló:"
, t_fontsize2:       "Méid an Chló:"
, t_fontsize3:       "Méid an Chló:"
, t_fontcolor1:      "Dath an Chló:"
, t_fontcolor2:      "Dath an Chló:"
, t_fontcolor3:      "Dath an Chló:"
, t_background:  		 "Íomha Chúlra"
, t_background_help: "Beidh méid na híomhá 130x67 pixels"
, t_date2: 				 	 "Dáta"
, t_time2: 				 	 "Am"
, t_label2: 			 	 "Lipéad"
, t_swap_labels:     "Aistrigh an dáta agus an bunlipéad"
, t_dim_before:      "Maolaigh an solas atá ag teacht as scaileán an chlog"
, t_dim_disabled:    "(Níl sé ar fáil don amchrios seo.)"
, t_tab1:            "Ginearalta"
, t_tab2:            "Cuma"
, t_tab3:            "Eolas"
  //'t_tab4:            "Cúlra"
, t_copyright:       "Cóipcheart 2009-2013 Preston Hunt"
, t_auto_check:      "Cuir in iúl dom nuair a bhionns leaganacha nua ar fáil"
, t_update:          "Tá leagan nua ar fáil. <a href=\"http://prestonhunt.com/go/sidebarclock\">Nuashonraigh anois!</a>"
  // Replace English with the name of your language in your language
, t_languagename:    "Gaeilge"

, t_backup_settings: "Socruithe Cúltaca"
, t_backup:          "Cóipeáil na socruithe cúltaca chuig an ngreamchlár"
, t_restore:         "Aischur na socruithe cúltaca ón ngreamchlár"
, t_dim_after:  "faoin gcéad"
, t_settings_copied:   "Chóipeáil na sochruithe chuig an ngreamchlár!"
, t_settings_loaded:   "Bhí na socruithe lódáilte!"
, t_settings_invalid:  "Ní bhfuarthas na socruithe ceart sa ngreamchlár."
, t_title:             "Clog Phresto"
, t_numerals:          "Coras Uimhreach:"
}

};
/*
 * JavaScript code for Presto's Sidebar Clock
 *
 *   Copyright (c) 2011-2013, Preston Hunt <me@prestonhunt.com>
 *   All rights reserved.
 *
 * Non-localized javascript
 * vim: ts=2 et nospell nowrap
 */

var isDirty = true;
var DEBUG = false;

// Global stored settings
// Also see setDefaults() which initializes this data structure
var G = 
    { mainDateFormat: null
    , mainTimeFormat: null
    , tzLabel: null
    , tzName: null
    , swaplabels: false
    , suncolors: false
    , sunset_opacity: null
    , updatecheck: null
    , background_file: null
    , use_transparent_background: false

    , gDatefontfamily: null
    , gDatefontsize: null
    , gDatefontcolor: null

    , gTimefontfamily: null
    , gTimefontsize: null
    , gTimefontcolor: null

    , gLabelfontfamily: null
    , gLabelfontsize: null
    , gLabelfontcolor: null

    , locale: null
    , numerals: null
    };

var L = null;

var gTime = null;
var gDate = null;
var gLabel = null;
var gOpacity = 100;
var gNow = null;
var gGmtOffset = null;
var gGadgetWidth = 130;
var gGadgetHeight = 67;
var gMaxLabelHeight = 16;

function alert( mesg ) {
    /*jsl:ignore*/
    if ( ! DEBUG ) return;
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

function read_settings() {
    settingsRegistryToG();
    setLocale();

    set_background();

    var illegal_opacity = G.sunset_opacity < 0 || G.sunset_opacity > 100;
    if ( illegal_opacity ) {
        G.sunset_opacity = 50;
    } 

    if ( DEBUG ) {
        G.tzLabel += " (DEBUG)";
    }
}

function setDefaults() {
    var lang = getSystemLanguage();
    setLocale(lang);

    System.Gadget.Settings.write( "mainDateFormat", L.defaultDateFormat );
    System.Gadget.Settings.write( "mainTimeFormat", L.defaultTimeFormat );
    System.Gadget.Settings.write( "locale", lang );
    System.Gadget.Settings.write( "numerals", "a" );

    System.Gadget.Settings.write( "sunset_opacity", 30 );
    System.Gadget.Settings.write( "updatecheck", true );

    System.Gadget.Settings.write( "background_file", '' );

    var elements = [ 'gDate', 'gTime', 'gLabel' ];
    for ( var el in elements ) {
        var base = elements[el];
        System.Gadget.Settings.write( base+"fontfamily", "Segoe UI" );
        System.Gadget.Settings.write( base+"fontsize", "Auto" );
        System.Gadget.Settings.write( base+"fontcolor", "White" );
    }
}

function set_gadget_size(w, h) {
    gGadgetWidth = w;
    gGadgetHeight = h;
    document.body.style.width = gGadgetWidth;
    document.body.style.height = gGadgetHeight;
    set_background();
}

function dock_gadget() {
    set_gadget_size(130, 67);
    gMaxLabelHeight = 16;
    displayGadget();
}

function undock_gadget() {
    set_gadget_size(260, 134);
    gMaxLabelHeight = 32;
    displayGadget();
}

function check_dock_state() {
    if (System.Gadget.docked) {
        dock_gadget();
    } else {
        undock_gadget();
    }
}

function startup() {
    alert( "Entering startup()" );

    System.Gadget.settingsUI = "settings.html";
    System.Gadget.onSettingsClosed = afterSettingsClosed;
    System.Gadget.visibilityChanged = checkVisibility;
    System.Gadget.onDock = dock_gadget;
    System.Gadget.onUndock = undock_gadget;

    read_settings();

    if ( ! G.mainTimeFormat ) {
        setDefaults();
        read_settings();
    }

    gDate = imgBackground.addTextObject("", "Segoe UI", 11, "white", 0, 0 );
    gTime = imgBackground.addTextObject("", "Segoe UI", 12, "white", 0, 0 );
    gLabel = imgBackground.addTextObject("", "Segoe UI", 11, "white", 0, 0 );

    updateFonts();
    check_dock_state();
    updateGadget();
}

function afterSettingsClosed() {
    read_settings();
    updateFonts();
    adjustOpacityByCurrentTime();

    /* We have to handle a corner case here.  If the time format is
     * changing from not display seconds to display seconds, then the
     * clock won't be updated until the minute changes, which could be up
     * to 59 seconds away.  A quick hack is to simply calculate how many
     * seconds are remaining until the next minute and manually update the
     * clock that many times. 
     */
    var now = new Date();
    var secondsUntilNextMinute = 60 - now.getSeconds();
    var milliseconds_to_wait = 1000 - now.getMilliseconds();
    for ( var i = secondsUntilNextMinute; i >= 0; i-- ) {
        window.setTimeout( displayGadget, i*1000 + milliseconds_to_wait );
    }
}

function adjustOpacityByCurrentTime() {
    if ( G.suncolors === false || G.tzName.length === 0 ) {
        gOpacity = 100;
        return;
    }

    var coords = latlon[ G.tzName ];
    if ( ! coords ) return;
    var lat = coords[0];
    var lon = coords[1];

    var now = new Date(); // Don't use gNow here!

    var sunobj = new SunriseSunset( now.getUTCFullYear(),
            1+now.getUTCMonth(), now.getUTCDate(), lat, lon);

    var nowUtcHours = now.getUTCHours() + now.getUTCMinutes() / 60;
    var isLight = sunobj.isDaylight( nowUtcHours );

    var new_opacity = 100 - G.sunset_opacity;
    gOpacity = isLight ? 100 : new_opacity;
}

function getMillisecondsToWait() {
    /* To reduce power usage, we determine polling frequency based on the
     * time format string.  If seconds are included, then we update every
     * second.  But if no seconds are included, then we only update every
     * minute. */

    var now = gNow;
    var milliseconds_to_wait = 1000 - now.getMilliseconds() + 1;

    if ( G.mainTimeFormat.indexOf('s') >= 0 ) {
        // Time format string includes seconds, need to update quickly
        return milliseconds_to_wait;
    } else {
        // Time format does not include seconds, can delay update until next
        // the next minute.  But we need to make sure that we update after
        // the minute has switched, otherwise we will be out of commission
        // for another whole minute.
        var seconds_to_wait = 60 - now.getSeconds();

        return ( seconds_to_wait * 1000 ) + milliseconds_to_wait;
    }
}

function updateNow() {
    gNow = new Date();
    gGmtOffset = gNow.getTimezoneOffset();

    if ( G.tzName.length > 0 ) {
        try {
            var utc = gNow.getTime() + gGmtOffset*60*1000;
            var utcEpoch = Math.round(utc/1000.0);
            var otherOffset = getOffsetInMinutes( G.tzName, utcEpoch );
            var otherTime = utc - otherOffset*60*1000;

            gNow = new Date( otherTime );
            gGmtOffset = otherOffset;
        } catch(err) {
            G.tzName = ''; // no tzdata for this entry, clear it away
        }
    }

    return gNow;
}

function updateGadget() {
    alert( "Entering updateGadget()" );

    if ( ! System.Gadget.visible ) {
        isDirty = true;
    } else {
        displayGadget();
        isDirty = false;
        window.setTimeout( updateGadget, getMillisecondsToWait() );
    }
}

function checkVisibility() {
    // See http://blogs.msdn.com/sidebar/archive/2006/08/18/706495.aspx
    if ( System.Gadget.visible && isDirty ) {
        adjustOpacityByCurrentTime();
        updateGadget();
    }
}

function getOffsetInMinutes( tzName, utcEpoch ) {
    var tzOffsets = tzdata[ tzName ];
    var offset = 0;
    for ( var cutoff in tzOffsets ) {
        if ( utcEpoch > cutoff ) {
            offset = tzOffsets[ cutoff ];
        }
    }
    return offset;
}

function devadigits(s) {
    // Function provided by Robert Lozyniak <r07271368@hotmail.com>
    // takes a string and outputs same but with
    // European digits changed to Devanagari digits
    var p; var c;
    var d="";
    for (p=0; p<s.length; p++) {
        c=s.charCodeAt(p);
        if(c>=48 && c<=57) c+=2358;
        d+=String.fromCharCode(c);
    }
    return d;
}

function displayGadget() {
    updateNow();
    adjustOpacityByCurrentTime();

    gLabel.opacity = G.tzLabel ? gOpacity : 0; // this has to be done before changing the text!
    gLabel.value = formatTzLabel( G.tzLabel, gNow, gGmtOffset );
    gLabel.width = gLabel.height = 0; // force recalculation of width

    gDate.opacity = G.mainDateFormat ? gOpacity : 0;
    gDate.value = G.mainDateFormat ? formatDate( G.mainDateFormat, gNow, gGmtOffset ) : '';
    gDate.height = gDate.width = 0; // force recalculation of width

    gTime.opacity = G.mainTimeFormat ? gOpacity : 0;
    gTime.value = formatDate( G.mainTimeFormat, gNow, gGmtOffset );
    gTime.height = gTime.width = 0; // force recalculation of width

    if ( G.numerals == 'd' ) {
        gDate.value = devadigits( gDate.value ); 
        gTime.value = devadigits( gTime.value ); 
    }

    if (G.swaplabels) {
        adjustPositions(gLabel, G.gLabelfontsize, gDate, G.gDatefontsize);
    } else {
        adjustPositions(gDate, G.gDatefontsize, gLabel, G.gLabelfontsize);
    }
}

function adjustPositions(top, topfontsize, bot, botfontsize) {
    var topMargin = 0.03*gGadgetHeight;
    var botMargin = 0.02*gGadgetHeight;
    var availHeight = gGadgetHeight;

    var timeHeight = 0.65 * availHeight;
    var topHeight = (availHeight - timeHeight)/2;
    var botHeight = topHeight;

    var padding = 0.03 * availHeight;
    var timeOffset = padding;

    // Do we have a top? If not, add the space budget to the time area
    if (top.value.length === 0) {
        timeHeight += topHeight;
        topHeight = 0;
        timeOffset = 1*padding;
    }

    // Same for bottom
    if (bot.value.length === 0) {
        timeHeight += botHeight;
        botHeight = 0;
        timeOffset = 2*padding;
    }

    // If we have top and bottom, decrease padding size
    if (botHeight > 0 && topHeight > 0) {
        timeHeight += 4*padding;
        timeOffset = 4*padding;
    }

    adjustToFit( gTime, G.gTimefontsize, gGadgetWidth, timeHeight );
    adjustToFit( top, topfontsize, gGadgetWidth, topHeight*1.4 );
    adjustToFit( bot, botfontsize, gGadgetWidth, botHeight*1.4 );

    // Horizontal center
    top.left = ( gGadgetWidth - top.width ) / 2;
    bot.left = ( gGadgetWidth - bot.width ) / 2;
    gTime.left = ( gGadgetWidth - gTime.width ) / 2;

    top.top = topMargin + (topHeight ? padding : 0);
    gTime.top = top.top + topHeight + (timeHeight - gTime.height)/2 - timeOffset;
    bot.top = gGadgetHeight - botMargin - padding - bot.height;
}

function adjustToFit( obj, size, maxWidth, maxHeight ) {
    if ( size != 'Auto' ) {
        obj.fontsize = size;
        return;
    }

    var newFontSize = obj.fontSize * maxWidth / obj.width;
    if ( newFontSize > 500 ) newFontSize = 12;
    obj.fontsize = newFontSize;

    if ( obj.height > maxHeight ) {
        obj.fontsize *= maxHeight / obj.height;
    }
}

function getFormValue( variablename ) {
    var varEl = document.getElementById( variablename );
    if ( varEl === null ) return "form-element-not-found";

    var varVal;
    if ( varEl.type == 'checkbox' ) {
        varVal = varEl.checked ? true : false;
    } else {
        varVal = varEl.value;
    }
    return varVal;
}

function setFormValue( varname, varVal ) {
    var varEl = document.getElementById( varname );
    if ( varEl === null ) return;

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

function GToForm() {
    for ( var key in G ) {
        setFormValue( key, G[key] );
    }
}

function formToG() {
    for ( var key in G ) {
        var val = getFormValue( key );
        if ( val !== 'form-element-not-found' ) {
            G[key] = val;
        }
    }
}

function GToSettingsRegistry() {
    for ( var key in G ) {
        System.Gadget.Settings.write( key, G[key] );
    }
}

function settingsRegistryToG() {
    for ( var key in G ) {
        G[key] = readSetting( key );
    }
}

function createSettingsHtmlElements() {
    var elements = [ 'gDate', 'gTime', 'gLabel' ];
    for ( var el in elements ) {
        var base = elements[el];
        document.getElementById(base+'_fontList').innerHTML = 
            createFontSelect( base+'fontfamily');
        document.getElementById(base+'_fontSizeList').innerHTML =
            createFontSizeSelect( base+'fontsize' );
        document.getElementById(base+'_fontColorList').innerHTML =
            createFontColorSelect( base+'fontcolor' );
    }
}

function initSettings() {
    System.Gadget.onSettingsClosing = settingsClosing;

    createSettingsHtmlElements();

    settingsRegistryToG();
    GToForm();

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

function changeLocale( newlocale ) {
    G.locale = newlocale;
    setLocale();
    document.getElementById("mainDateFormat").value = L.defaultDateFormat;
    document.getElementById("mainTimeFormat").value = L.defaultTimeFormat;

    displaySettings();
}

function changeNumerals( newvalue ) {
    G.numerals = newvalue;
}

function set_background() {
    // If user specififed a background, use it and exit
    if ( G.background_file !== '' ) {
        imgBackground.src = G.background_file;
        return;
    }

    // Use default background, black or transparent, and with correct size
    // Format is background-C-WxH.png, where C is "black" or "transparent" and W and H are numbers.
    var trans = G.use_transparent_background ? "transparent" : "black";
    var size = gGadgetWidth + "x" + gGadgetHeight;
    imgBackground.src = "images/background-" + trans + "-" + size + ".png";
    imgBackground.style.width = gGadgetWidth;
    imgBackground.style.height = gGadgetHeight;
}

function displaySettings() {
    setTzOptions();
    localizeText();
    showIfUpdateAvailable();
    gotoTab( 1 );
    timezoneChanged();
}

function settingsClosing(event) {
    if ( event.closeAction == event.Action.commit ) {
        formToG();
        GToSettingsRegistry();
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

function createFontColorSelect( id ) {
    var colors = getMicrosoftColors();
    var out = '';
    for ( var c in colors ) {
        var display_color = colors[c];
        var background_color = 'Black';
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
    if ( G.updatecheck === false ) return false;

    var url = 'http://prestonhunt.com/m/2009/prestosidebarclock.version';
    var newestText = getHttpAsText( url + '?cacheBuster=' + Math.random() );
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

function saveIniFile() {
    var json_settings = document.getElementById( "json_settings" );

    copySettingsToClipboard();
    json_settings.value = L.t_settings_copied; //"Settings copied to clipboard";
}

function setBackupStatus( mesg ) {
    var el = document.getElementById( "t_backup_status" );
    el.innerText = mesg;
}

function loadIniFile() {
    var new_G = pasteSettingsFromClipboard();
    if ( ! new_G ) {
        setBackupStatus( L.t_settings_invalid );
        return;
    }

    if ( new_G.background_file == "images/background-black.png" ) {
        new_G.background_file = "";
    }

    G = new_G;
    GToForm();
    setBackupStatus( L.t_settings_loaded );
}

function copySettingsToClipboard() {
    G.settingsVersion = 2;
    formToG();
    window.clipboardData.setData( "Text", JSON.stringify( G ) );
    setBackupStatus( L.t_settings_copied );
}

function pasteSettingsFromClipboard() {
    try {
        var clip = window.clipboardData.getData( "Text" );
        var new_G = JSON.parse( clip );
    } catch(err) {
        return null;
    }

    if ( new_G.settingsVersion != 2 ) {
        new_G = null;
    }

    return new_G;
}

function swapEscapes( label ) {
    var newlabel = '';

    var last_was_slash = false;
    for ( var i=0, len=label.length; i < len; i++ ) {
        var c = label.charAt(i);
        if ( c != '\\' ) {
            if ( ! last_was_slash ) newlabel += '\\';
            newlabel += c;
        } 
        last_was_slash = ( c == '\\' );
    }

    return newlabel;
}

function formatTzLabel( label, now, gmtOffset ) {
    // Only process if there is a slash in the label
    if ( label.indexOf('\\') < 0 ) {
        return label;
    } else {
        var newlabel = swapEscapes( label );
        return formatDate( newlabel, now, gmtOffset );
    }
}

function timezoneChanged() {
    var dimControl = document.getElementById( 'dimcontrol' );
    var dimDisabled = document.getElementById( 'dimdisabled' );
    var tzName = document.getElementById( 'tzName' ).value;
    var tzNameSet = tzName !== '';
    var coords = latlon[ tzName ];

    if ( tzNameSet && coords ) {
        dimControl.style.display = 'inline';
        dimDisabled.style.display = 'none';
    } else {
        dimControl.style.display = 'none';
        dimDisabled.style.display = 'inline';
    }
}

function setBackground( newvalue ) {
    var dest = document.getElementById( 'background_file' );
    dest.value = newvalue;
}

