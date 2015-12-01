/**
 * Angular directive/filter/service for formatting date so that it displays how long ago the given time was compared to now.
 * @version v0.2.4 - 2015-08-30
 * @link https://github.com/yaru22/angular-timeago
 * @author Brian Park <yaru22@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
/* global angular */
'use strict';
angular.module('yaru22.angular-timeago', []).directive('timeAgo', [
  'timeAgo',
  'nowTime',
  function (timeAgo, nowTime) {
    return {
      scope: {
        fromTime: '@',
        format: '@'
      },
      restrict: 'EA',
      link: function (scope, elem) {
        var fromTime = timeAgo.parse(scope.fromTime);
        // Track changes to time difference
        scope.$watch(function () {
          return nowTime() - fromTime;
        }, function (value) {
          angular.element(elem).text(timeAgo.inWords(value, fromTime, scope.format));
        });
      }
    };
  }
]).factory('nowTime', [
  '$window',
  '$rootScope',
  function ($window, $rootScope) {
    var nowTime = Date.now();
    var updateTime = function () {
      $window.setTimeout(function () {
        $rootScope.$apply(function () {
          nowTime = Date.now();
          updateTime();
        });
      }, 1000);
    };
    updateTime();
    return function () {
      return nowTime;
    };
  }
]).factory('timeAgo', [
  '$filter',
  function ($filter) {
    var service = {};
    service.appSettings = {
      refreshMillis: 60000,
      allowFuture: false,
      overrideLang: null,
      fullDateAfterSeconds: null,
      strings: {
        'it_IT': {
          prefixAgo: null,
          prefixFromNow: null,
          suffixAgo: 'fa',
          suffixFromNow: 'da ora',
          seconds: 'meno di un minuto',
          minute: 'circa un minuto',
          minutes: '%d minuti',
          hour: 'circa un\' ora',
          hours: 'circa %d ore',
          day: 'un giorno',
          days: '%d giorni',
          month: 'circa un mese',
          months: '%d mesi',
          year: 'circa un anno',
          years: '%d anni',
          numbers: []
        },
        'en_US': {
          prefixAgo: null,
          prefixFromNow: null,
          suffixAgo: 'ago',
          suffixFromNow: 'from now',
          seconds: 'less than a minute',
          minute: 'about a minute',
          minutes: '%d minutes',
          hour: 'about an hour',
          hours: 'about %d hours',
          day: 'a day',
          days: '%d days',
          month: 'about a month',
          months: '%d months',
          year: 'about a year',
          years: '%d years',
          numbers: []
        },
        'de_DE': {
          prefixAgo: 'vor',
          prefixFromNow: 'in',
          suffixAgo: null,
          suffixFromNow: null,
          seconds: 'weniger als einer Minute',
          minute: 'ca. einer Minute',
          minutes: '%d Minuten',
          hour: 'ca. einer Stunde',
          hours: 'ca. %d Stunden',
          day: 'einem Tag',
          days: '%d Tagen',
          month: 'ca. einem Monat',
          months: '%d Monaten',
          year: 'ca. einem Jahr',
          years: '%d Jahren',
          numbers: []
        },
        'he_IL': {
          prefixAgo: null,
          prefixFromNow: null,
          suffixAgo: '\u05dc\u05e4\u05e0\u05d9',
          suffixFromNow: '\u05de\u05e2\u05db\u05e9\u05d9\u05d5',
          seconds: '\u05e4\u05d7\u05d5\u05ea \u05de\u05d3\u05e7\u05d4',
          minute: '\u05db\u05d3\u05e7\u05d4',
          minutes: '%d \u05d3\u05e7\u05d5\u05ea',
          hour: '\u05db\u05e9\u05e2\u05d4',
          hours: '\u05db %d \u05e9\u05e2\u05d5\u05ea',
          day: '\u05d9\u05d5\u05dd',
          days: '%d \u05d9\u05de\u05d9\u05dd',
          month: '\u05db\u05d7\u05d5\u05d3\u05e9',
          months: '%d \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd',
          year: '\u05db\u05e9\u05e0\u05d4',
          years: '%d \u05e9\u05e0\u05d9\u05dd',
          numbers: []
        },
        'pt_BR': {
          prefixAgo: null,
          prefixFromNow: 'daqui a',
          suffixAgo: 'atr\xe1s',
          suffixFromNow: null,
          seconds: 'menos de um minuto',
          minute: 'cerca de um minuto',
          minutes: '%d minutos',
          hour: 'cerca de uma hora',
          hours: 'cerca de %d horas',
          day: 'um dia',
          days: '%d dias',
          month: 'cerca de um m\xeas',
          months: '%d meses',
          year: 'cerca de um ano',
          years: '%d anos',
          numbers: []
        },
        'ca_ES': {
          prefixAgo: 'fa',
          prefixFromNow: 'd\'aqu\xed',
          suffixAgo: null,
          suffixFromNow: null,
          seconds: 'menys d\'un minut',
          minute: 'prop d\'un minut',
          minutes: '%d minuts',
          hour: 'prop d\'una hora',
          hours: 'prop de %d hores',
          day: 'un dia',
          days: '%d dies',
          month: 'prop d\'un mes',
          months: '%d mesos',
          year: 'prop d\'un any',
          years: '%d anys',
          numbers: []
        },
        'fr_FR': {
          prefixAgo: 'il y a',
          prefixFromNow: 'dans',
          suffixAgo: null,
          suffixFromNow: null,
          seconds: 'moins d\'une minute',
          minute: 'environ une minute',
          minutes: '%d minutes',
          hour: 'environ une heure',
          hours: 'environ %d heures',
          day: 'un jour',
          days: '%d jours',
          month: 'environ un mois',
          months: '%d mois',
          year: 'environ un an',
          years: '%d ans',
          numbers: []
        },
        'es_LA': {
          prefixAgo: 'hace',
          prefixFromNow: 'en',
          suffixAgo: null,
          suffixFromNow: null,
          seconds: 'menos de un minuto',
          minute: 'un minuto',
          minutes: '%d minutos',
          hour: 'una hora',
          hours: '%d horas',
          day: 'un d\xeda',
          days: '%d d\xedas',
          month: 'un mes',
          months: '%d meses',
          year: 'un a\xf1o',
          years: '%d a\xf1os',
          numbers: []
        },
        'nl_NL': {
          prefixAgo: null,
          prefixFromNow: 'over',
          suffixAgo: 'geleden',
          suffixFromNow: 'vanaf nu',
          seconds: 'een paar seconden',
          minute: 'ongeveer een minuut',
          minutes: '%d minuten',
          hour: 'een uur',
          hours: '%d uur',
          day: 'een dag',
          days: '%d dagen',
          month: 'een maand',
          months: '%d maanden',
          year: 'een jaar',
          years: '%d jaar',
          numbers: []
        }
      }
    };
    service.inWords = function (distanceMillis, fromTime, format, timezone) {
      var fullDateAfterSeconds = parseInt(service.appSettings.fullDateAfterSeconds, 10);
      if (!isNaN(fullDateAfterSeconds)) {
        var fullDateAfterMillis = fullDateAfterSeconds * 1000;
        if (distanceMillis >= 0 && fullDateAfterMillis <= distanceMillis || distanceMillis < 0 && fullDateAfterMillis >= distanceMillis) {
          if (format) {
            return $filter('date')(fromTime, format, timezone);
          }
          return fromTime;
        }
      }
      var overrideLang = service.appSettings.overrideLang;
      var documentLang = document.documentElement.lang;
      var sstrings = service.appSettings.strings;
      var lang, $l;
      if (typeof sstrings[overrideLang] !== 'undefined') {
        lang = overrideLang;
        $l = sstrings[overrideLang];
      } else if (typeof sstrings[documentLang] !== 'undefined') {
        lang = documentLang;
        $l = sstrings[documentLang];
      } else {
        lang = 'en_US';
        $l = sstrings[lang];
      }
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (service.appSettings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }
      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;
      function substitute(stringOrFunction, number) {
        var string = angular.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = $l.numbers && $l.numbers[number] || number;
        return string.replace(/%d/i, value);
      }
      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) || seconds < 90 && substitute($l.minute, 1) || minutes < 45 && substitute($l.minutes, Math.round(minutes)) || minutes < 90 && substitute($l.hour, 1) || hours < 24 && substitute($l.hours, Math.round(hours)) || hours < 42 && substitute($l.day, 1) || days < 30 && substitute($l.days, Math.round(days)) || days < 45 && substitute($l.month, 1) || days < 365 && substitute($l.months, Math.round(days / 30)) || years < 1.5 && substitute($l.year, 1) || substitute($l.years, Math.round(years));
      var separator = $l.wordSeparator === undefined ? ' ' : $l.wordSeparator;
      if (lang === 'he_IL') {
        return [
          prefix,
          suffix,
          words
        ].join(separator).trim();
      } else {
        return [
          prefix,
          words,
          suffix
        ].join(separator).trim();
      }
    };
    service.parse = function (input) {
      if (input instanceof Date) {
        return input;
      } else if (angular.isNumber(input)) {
        return new Date(input);
      } else if (/^\d+$/.test(input)) {
        return new Date(parseInt(input, 10));
      } else {
        var s = (input || '').trim();
        s = s.replace(/\.\d+/, '');
        // remove milliseconds
        s = s.replace(/-/, '/').replace(/-/, '/');
        s = s.replace(/T/, ' ').replace(/Z/, ' UTC');
        s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2');
        // -04:00 -> -0400
        return new Date(s);
      }
    };
    return service;
  }
]).filter('timeAgo', [
  'nowTime',
  'timeAgo',
  function (nowTime, timeAgo) {
    return function (value, format, timezone) {
      var fromTime = timeAgo.parse(value);
      var diff = nowTime() - fromTime;
      return timeAgo.inWords(diff, fromTime, format, timezone);
    };
  }
]);