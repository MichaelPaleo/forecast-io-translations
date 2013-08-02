function join_with_shared_prefix(a, b, joiner) {
  var i = 0;

  while(i !== a.length &&
        i !== b.length &&
        a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  return a.slice(0, i) + a.slice(i) + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "durante la noche" ? period.slice(4) :
         period.slice(0, 7) ===   "en la " ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "despejado",
  "no-precipitation": "sin precipitaci�n",
  "mixed-precipitation": "precipitaci�n mixta",
  "possible-very-light-precipitation": "posible precipitaci�n muy ligera",
  "very-light-precipitation": "precipitaci�n muy ligera",
  "possible-light-precipitation": "posible precipitaci�n ligera",
  "light-precipitation": "precipitaci�n ligera",
  "medium-precipitation": "precipitaci�n media",
  "heavy-precipitation": "precipitaci�n intensa",
  "possible-very-light-rain": "posible llovizna",
  "very-light-rain": "llovizna",
  "possible-light-rain": "posible lluvia ligera",
  "light-rain": "lluvia ligera",
  "medium-rain": "lluvia",
  "heavy-rain": "lluvia intensa",
  "possible-very-light-sleet": "posible aguanieve muy ligera",
  "very-light-sleet": "aguanieve muy ligera",
  "possible-light-sleet": "posible aguanieve ligera",
  "light-sleet": "aguanieve ligera",
  "medium-sleet": "aguanieve",
  "heavy-sleet": "aguanieve intensa",
  "possible-very-light-snow": "posible nieve muy ligera",
  "very-light-snow": "nieve muy ligera",
  "possible-light-snow": "posible nieve ligera",
  "light-snow": "nieve ligera",
  "medium-snow": "nieve",
  "heavy-snow": "nieve intensa",
  "light-wind": "poco ventoso",
  "medium-wind": "ventoso",
  "heavy-wind": "peligrosamente ventoso",
  "low-humidity": "seco",
  "high-humidity": "h�medo",
  "fog": "nublado",
  "light-clouds": "parcialmente nublado",
  "medium-clouds": "principalmente nublado",
  "heavy-clouds": "totalmente nublado",
  "today-morning": "esta ma�ana",
  "later-today-morning": "m�s adelante en la ma�ana",
  "today-afternoon": "esta tarde",
  "later-today-afternoon": "m�s adelante en la tarde",
  "today-evening": "esta noche",
  "later-today-evening": "m�s adelante en la noche",
  "today-night": "esta noche",
  "later-today-night": "m�s tarde esta noche",
  "tomorrow-morning": "ma�ana por la ma�ana",
  "tomorrow-afternoon": "ma�ana por la tarde",
  "tomorrow-evening": "ma�ana por la noche",
  "tomorrow-night": "ma�ana por la noche",
  "morning": "ma�ana",
  "afternoon": "tarde",
  "evening": "noche",
  "night": "noche",
  "today": "hoy",
  "tomorrow": "ma�ana",
  "sunday": "el domingo",
  "monday": "el lunes",
  "tuesday": "el martes",
  "wednesday": "el mi�rcoles",
  "thursday": "el jueves",
  "friday": "el viernes",
  "saturday": "el s�bado",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "bajo $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", y " : " y "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " a trav�s ");
  },
  "with": "$1, con $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 para la hora",
  "starting-in": "$1 comenzando en $2",
  "stopping-in": "$1 deteni�ndose en $2",
  "starting-then-stopping-later": "$1 comenzando en $2, deteni�ndose $3 m�s tarde",
  "stopping-then-starting-later": "$1 deteni�ndose in $2, comenzando de nuevo $3 m�s tarde",
  "for-day": "$1 durante todo el d�a",
  "starting": "$1 comenzando $2",
  "until": function(condition, period) {
    return condition + " hasta " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " hasta " + strip_prefix(a) + ", comenzando de nuevo " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " comenzando " + a + ", continuando hasta " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 durante toda la semana",
  "over-weekend": "$1 durante todo fin de semana",
  "temperatures-peaking": "temperaturas m�ximas de $1 $2",
  "temperatures-rising": "aumento de las temperaturas a $1 $2",
  "temperatures-valleying": "temperaturas de hasta $1 $2",
  "temperatures-falling": "temperaturas cayendo a $1 $2",
   /* In Spanish only need the first letter of a sentence in uppercase, i dont know regexp */
  "title": function(str) {
    return str.replace(
      /\b(?:a(?!nd\b)|[^\Wa])/g,
      function(letter) {
        return letter.toUpperCase();
      }
    );
  },
  /* Capitalize the first word of the sentence and end with a period. */
  "sentence": function(str) {
    /* Capitalize. */
    str = str.charAt(0).toUpperCase() + str.slice(1);

    /* Add a period if there isn't already one. */
    if(str.charAt(str.length - 1) !== ".")
      str += ".";

    return str;
  }
});
