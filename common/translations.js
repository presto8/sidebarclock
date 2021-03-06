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
, t_copyright        : "Copyright 2009-2014 Preston Hunt"
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
, t_dateexamples     : "Y F j = 2014 otsailak 14<br>n/j l = 4/7 Larunbata"
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
, t_copyright        : "Eskubideak 2009-2014 Preston Hunt"
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
, t_copyright        : "저작권 2009-2014 Preston Hunt"
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
't_copyright':       'Copyright 2009-2014 Preston Hunt',
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
  "t_copyright":       "Copyright 2009-2014 Preston Hunt",
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
, t_copyright        : "Copyright 2009-2014 Preston Hunt"
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
  't_copyright':       'Copyright 2009-2014 Preston Hunt'
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
  't_copyright':       'Copyright 2009-2014 Preston Hunt'
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
  't_copyright':       'Copyright 2009-2014 Preston Hunt'
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
, t_copyright        : 'Copyright 2009-2014 Preston Hunt'
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
  't_copyright':       'Copyright 2009-2014 Preston Hunt'
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
  't_copyright':       'Copyright 2009-2014 Preston Hunt'
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
  't_copyright':       'Copyright 2009-2014 Preston Hunt',
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
  't_copyright':       'Copyright 2009-2014 Preston Hunt'
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
  't_copyright':       'Авторське право 2009-2014 Preston Hunt'
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
  't_copyright':       'Szerzõi Jog: 2009-2014 Preston Hunt'
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
  t_copyright:          "Copyright 2009-2014 Preston Hunt",
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
  't_copyright':       'Copyright 2009-2014 Preston Hunt',
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
  't_copyright':       'Kopiereg 2009-2014 Preston Hunt',
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
  't_copyright':       'Copyright 2009-2014 Preston Hunt',
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
  't_copyright':       'Avtorske pravice 2009-2014 Preston Hunt',
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
  't_copyright':       'Autorsko pravo 2009-2014 Preston Hunt'
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
  't_copyright':       '版权 2009-2014 Preston Hunt',
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
  't_copyright':       'Tio ĉi estas kopirajta 2009-2014 Preston Hunt',
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
  't_copyright':       'Copyright 2009-2014 Preston Hunt',
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
	't_copyright':      'Copyright 2009-2014 Preston Hunt',
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
  't_copyright':       'Copyright 2009-2014 Preston Hunt',
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
, t_copyright:       "Cóipcheart 2009-2014 Preston Hunt"
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
