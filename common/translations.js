// vim: fileencoding=utf-8 nospell ts=2 et

// Translation instructions:
// Each line has one phrase that needs translating.  Only edit the 
// part after the colon.  Try to use a Unicode/UTF-8 editor to 
// preserve special characters.
//
// Example:
//   't_label':      'Replace this part with the translation'

var translations = {

'en': {
  // Do not change the order of the days or months!
	'daysLong':    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	'daysShort':   ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	'monthsLong':  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	'monthsShort': ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	'defaultDateFormat': "D M d",
	'defaultTimeFormat': "h:i a",

	't_dateformat':     'Date format:',
	't_timeformat':     'Time format:',
	't_timezone':       'Time zone:',
	't_localtime':      'Local time',
	't_bottomlabel':    'Bottom label:',
	't_optional':       '(optional)',
	't_examples':       'Examples:',
	't_date':           'Date:',
	't_time':           'Time:',
	't_label':          'Label:',
	't_dateexamples':   'D M d = Sat Apr 07<br>n/j l = 4/7 Saturday',
	't_timeexamples':   'g:i a = 5:44 pm<br>H:i = 17:44',
	't_labelexamples':  'Portland, Tokyo, GMT+2',
	't_formathelp':     '<a href="http://us.php.net/manual/en/function.date.php">Format help</a>',
	't_formathelplong': '<a href="http://us.php.net/manual/en/function.date.php">Format help</a> (unsupported: T, e, o, u)',
	't_version':        'Version xxVER (xxDATE)',
	't_about':          'About this gadget',
	't_translateby':    '',
	't_language':       'Language:',
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
//	't_background':  		'Background image',
	't_date2': 				 	 'Date',
	't_time2': 				 	 'Time',
	't_label2': 			 	 'Label',
	't_swap_labels':     'Swap date and bottom label',
  't_tab1':            'General', 
  't_tab2':            'Appearance',
  't_tab3':            'About',
  't_copyright':       'Copyright 2009 Preston Hunt',
  't_update':          "A newer version of Presto's Clock is available. <a href=\"http://gallery.live.com/liveItemDetail.aspx?li=348e5816-f95b-493e-a6df-a03980e34e51\">Update now!</a>",
  't_languagename':    'English'
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
//	't_background':  		'Фоновое изображение',
	't_date2': 				 	 'Дата',
	't_time2': 				 	 'Время',
	't_label2': 			 	 'Текст',
	't_swap_labels':     'Поменять местами дату и текст',
  't_tab1':            'Общее', 
  't_tab2':            'Настройки',
  't_tab3':            'О программе',
  't_copyright':       'Copyright 2009 Preston Hunt',
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
  "t_copyright":       "Copyright 2009 Preston Hunt",
  "t_languagename":    "Български"
},

// Spanish translation by Tom <getkresh@yahoo.ca>
'es': {
	'daysLong':    ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
	'daysShort':   ["D", "L", "M", "X", "J", "V", "S"],
	'monthsShort': ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
	'monthsLong':  ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
	'defaultDateFormat': "D M d",
	'defaultTimeFormat': "H:i",

	't_dateformat':    'Formato de fecha:',
	't_timeformat':    'Formato de hora:',
	't_timezone':      'Zona horaria:',
	't_localtime':     'Hora local',
	't_bottomlabel':   'Etiqueta:',
	't_optional':      '(opcional)',
	't_examples':      'Ejemplos:',
	't_date':          'Fecha:',
	't_time':          'Hora:',
	't_label':         'Etiqueta:',
	't_dateexamples':  'D M d = L abr 07<br>n/j l = 4/7 sábado',
	't_timeexamples':  'H:i = 17:44',
	't_labelexamples': 'CET, Madrid, Paris, GMT+1',
	't_formathelp':    '<a href="http://us.php.net/manual/es/function.date.php">Ayuda con el formato</a>',
	't_formathelplong':'<a href="http://us.php.net/manual/es/function.date.php">Ayuda con el formato</a> (no posibles: T, e, o, u)',
	't_version':       'Versión xxVER (xxDATE)',
	't_about':         'Acerca de este gadget',
	't_translateby':   'Traducción en español por Lucía y Tom',
	't_language':      'Idioma:',
	't_charity':        "Presto's Clock is Charityware. If you like it, please consider a donation to the less fortunate of the world. See the project page for <a href=\"http://prestonhunt.com/story/110\">information on how to donate</a>.",
	't_fontfamily1':     'Font:', // TODO
	't_fontfamily2':     'Font:', // TODO
	't_fontfamily3':     'Font:', // TODO
	't_fontsize1':       'Font size:', // TODO
	't_fontsize2':       'Font size:', // TODO
	't_fontsize3':       'Font size:', // TODO
	't_fontcolor1':      'Font color:', // TODO
	't_fontcolor2':      'Font color:', // TODO
	't_fontcolor3':      'Font color:', // TODO
//	't_background':  		'Background image', // TODO
	't_date2': 				 	 'Datum',
	't_time2': 				 	 'Hora',
	't_label2': 			 	 'Etiqueta',
	't_swap_labels':     'Swap date and bottom label', // TODO
  't_tab1':            'General', // TODO
  't_tab2':            'Apariencia', // TODO
  't_tab3':            'Sobre', // TODO
  't_copyright':       'Copyright 2009 Preston Hunt'
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
//	't_background':  		'Baggrundsbillede',
	't_date2': 				 	 'Dato',
	't_time2': 				 	 'Tid',
	't_label2': 			 	 'Angivelse af tidszone',
	't_swap_labels':     'Byt om på dato og angivelse af tidszone',
  't_tab1':            'General',
  't_tab2':            'Appearance',
  't_tab3':            'About',
  't_copyright':       'Copyright 2009 Preston Hunt'
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
//	't_background':  		'Background image',
	't_date2': 				 	 'Date',
	't_time2': 				 	 'Time',
	't_label2': 			 	 'Label',
	't_swap_labels':     'Swap date and bottom label',
  't_tab1':            'General',
  't_tab2':            'Appearance',
  't_tab3':            'About',
  't_copyright':       'Copyright 2009 Preston Hunt'
},

// Italian translation by Mirko Mazzacano <michy91@alice.it>
'it': {
	'daysLong':    ["Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"],
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
//	't_background':  		'Background image',
	't_date2': 				 	 'Date',
	't_time2': 				 	 'Time',
	't_label2': 			 	 'Label',
	't_swap_labels':     'Swap date and bottom label',
  't_tab1':            'General',
  't_tab2':            'Apperance',
  't_tab3':            'About',
  't_copyright':       'Copyright 2009 Preston Hunt'
},

// Polish translation by Marcin Michalak <marcin.michalak@gmail.com>
'pl': {
	'daysLong':    ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
	'daysShort':   ["Ni", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
	'monthsLong':  ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
	'monthsShort': ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"],
	'defaultDateFormat': "D d M",
	'defaultTimeFormat': "H:i",

	't_dateformat':    'Format daty:',
	't_timeformat':    'Format godziny:',
	't_timezone':      'Strefa czasu:',
	't_localtime':     'Czas lokalny',
	't_bottomlabel':   'Tekst:',
	't_optional':      '(opcjonalnie)',
	't_examples':      'Przykłady:',
	't_date':          'Data:',
	't_time':          'Godzina:',
	't_label':         'Tekst:',
	't_dateexamples':  'D d M = Sob Kwi 07<br>l/j n = Sobota 7/4',
	't_timeexamples':  'g:i a = 5:44 pm<br>H:i = 17:44',
	't_labelexamples': 'Warszawa, GMT+1',
	't_formathelp':    '<a href="http://us.php.net/manual/pl/function.date.php">Więcej o formacie</a>',
	't_formathelplong':'<a href="http://us.php.net/manual/pl/function.date.php">Więcej o formacie</a> (nieobsługiwane: T, e, o, u)',
	't_version':       'Wersja xxVER (xxDATE)',
	't_about':         'O tym gadżecie',
	't_translateby':   'Przetłumaczył na polski Marcin Michalak',
	't_language':      'Język:',
	't_charity':        "Zegar Preston'a jest oprogramowaniem darowiznowym. Jeśli Ci się podoba, pomyśl o darowiźnie dla mniej szczęśliwych tego świata. Na stronie projektu znajdziesz <a href=\"http://prestonhunt.com/story/110\">informację, jak złożyć darowiznę</a>.",
	't_fontfamily1':     'Czcionka:',
	't_fontfamily2':     'Czcionka:',
	't_fontfamily3':     'Czcionka:',
	't_fontsize1':       'Rozmiar czcionki:',
	't_fontsize2':       'Rozmiar czcionki:',
	't_fontsize3':       'Rozmiar czcionki:',
	't_fontcolor1':      'Kolor czcionki:',
	't_fontcolor2':      'Kolor czcionki:',
	't_fontcolor3':      'Kolor czcionki:',
//	't_background':  		'Obraz tła',
	't_date2': 				 	 'Data',
	't_time2': 				 	 'Godzina',
	't_label2': 			 	 'Tekst',
	't_swap_labels':     'Zamień datę i dolny tekst',
  't_tab1':            'General',
  't_tab2':            'Apperance',
  't_tab3':            'About',
  't_copyright':       'Copyright 2009 Preston Hunt'
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
//	't_background':  		'Achtergrond plaatje',
	't_date2': 				 	 'Datum',
	't_time2': 				 	 'Tijd',
	't_label2': 			 	 'Label',
	't_swap_labels':     'Verwissel datum en onderste label',
  't_tab1':            'General',
  't_tab2':            'Apperance',
  't_tab3':            'About',
  't_copyright':       'Copyright 2009 Preston Hunt'
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
//	't_background':  		'Bakgrundsbild',
	't_date2': 				 	 'Datum',
	't_time2': 				 	 'Tid',
	't_label2': 			 	 'Etikett',
	't_swap_labels':     'Växla datum och etikett',
  't_tab1':            'Allmän',
  't_tab2':            'Utseende',
  't_tab3':            'Om',
  't_copyright':       'Copyright 2009 Preston Hunt'
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
//	't_background':  		'Obrázek na pozadí',
	't_date2': 				 	 'Datum',
	't_time2': 				 	 'Čas',
	't_label2': 			 	 'Označení',
	't_swap_labels':     'Prohodit datum a spodní označení',
  't_tab1':            'Všeobecný',
  't_tab2':            'Vzhled',
  't_tab3':            'Info',
  't_copyright':       'Copyright 2009 Preston Hunt',
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
	"t_timeexamples":    "H:i a = 17:44",
	"t_labelexamples":   "Berlin, GMT+1",
	"t_formathelp":      '<a href="http://us.php.net/manual/de/function.date.php">Hilfe zu den Formaten</a>',
	"t_formathelplong":  '<a href="http://us.php.net/manual/de/function.date.php">Hilfe zu den Formaten</a> (Nicht unterstützt: T, e, o, u)',
	"t_version":         "Version xxVER (xxDATE)",
	"t_about":           "Über dieses Gadget",
	"t_translateby":     "Deutsche Übersetzung von Florian Thomsen",
	"t_language":        "Sprache:",
	't_charity':         "Presto's Clock ist Charityware. Wenn Ihnen diese Software gefällt, spenden Sie bitte für die hilfsbedürftigen Menschen dieser Welt. Auf meiner Homepage finden Sie weitere Infos, <a href=\"http://prestonhunt.com/story/110\">wie Sie spenden</a>.",
	't_fontfamily1':     'Schrift:',
	't_fontfamily2':     'Schrift:',
	't_fontfamily3':     'Schrift:',
	't_fontsize1':       'Schriftgröße:',
	't_fontsize2':       'Schriftgröße:',
	't_fontsize3':       'Schriftgröße:',
	't_fontcolor1':       'Schriftfarbe:',
	't_fontcolor2':      'Schriftfarbe:',
	't_fontcolor3':      'Schriftfarbe:',
//	't_background': 		'Hintergrundbild',
	't_date2': 					 'Datum',
	't_time2': 					 'Zeit',
	't_label2': 				 'Optional',
	't_swap_labels':     'Datum und zusätzlichen Text vertauschen',
  't_tab1':            'General',
  't_tab2':            'Apperance',
  't_tab3':            'About',
  't_copyright':       'Copyright 2009 Preston Hunt'
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
//	't_background':  		'Другорядне зображення',
	't_date2': 				 	 'Дата',
	't_time2': 				 	 'Час',
	't_label2': 			 	 'Текст',
	't_swap_labels':     'Зміна розташування дати',
  't_tab1':            'Загально', 
  't_tab2':            'Зовнішній вигляд',
  't_tab3':            'Про',
  't_copyright':       'Авторське право 2009 Preston Hunt'
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
//	't_background':  		'Háttérkép',
	't_date2': 				 	 'Dátum',
	't_time2': 				 	 'Idõ',
	't_label2': 			 	 'Felirat',
	't_swap_labels':     'Dátum és az alsó felirat felcserélése',
  't_tab1':            'Általános', 
  't_tab2':            'Megjelenés',
  't_tab3':            'Rólunk',
  't_copyright':       'Szerzõi Jog: 2009 Preston Hunt'
},

// Portuguese translation by Mateus Scherer Cardoso <matschcar@terra.com.br>
pt: {
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
  t_copyright:          "Copyright 2009 Preston Hunt",
  t_update:             'Uma nova versão do Presto\'s Clock está disponível. <a href="http://gallery.live.com/liveItemDetail.aspx?li=348e5816-f95b-493e-a6df-a03980e34e51">Atualize agora!</a>',
  t_languagename:       "Português"
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
//	't_background':  		'Pozadinska slika',
	't_date2': 				 	 'Datum',
	't_time2': 				 	 'Vreme',
	't_label2': 			 	 'Naslov',
	't_swap_labels':     'Zamenite datum sa donjim naslovom',
  't_tab1':            'Opšte', 
  't_tab2':            'Izgled',
  't_tab3':            'Info',
  't_copyright':       'Autorsko pravo 2009 Preston Hunt'
}

};
