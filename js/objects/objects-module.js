"use strict";
var apingObjects = angular.module('jtt_aping_objects', []);


/*
Object Struktur

    {} appConfigObject (1x im scope)
        (gilt pro instanz = aufruf der direktive)
        Beinhaltet folgende Werte:
        {} App Default Settings
        {} Settings aus den Attributen

        []
            {} requestConfigObject
                (gilt für jeden request)
                Beinhaltet folgende Werte:
                {} Request Default Settings
                {} Settings aus dem betreffenden Attribut //z.b. {'user':'yyz','items':'5'}
                {} API spezifische Eigenschaften, die der Aufruf selbst hinzufügt
                    - (nextPageToken, ...)


    baseObjects
        * appConfigObject
        * requestConfigObject
        * platformObject (enhält
        * errorObject (enthält Errormeldungen)
        * infoObject


    outputObjects
        * channelObject (gleichbedeutend mit User, Page oder Kanal)
        * socialObject (jeglicher Social Media Content)
        * videoObject
        * pictureObject
        * audioObject
        * eventObject
        * ...


    Pro Object gibt es einen Service, der folgendes liefert
        * fn() liefert ein BlankoObject, das nur die notwendigsten Parameter hat
        * fn()s liefern bestimmte Werte für das jeweilige Setting



    Pro Plattform gibt es immer eine Factory und einen Service:
        Die FACTORY besorgt den API-Call und liefert die JSON-Daten zurück.

        Der SERVICE füllt die JSON-Daten in die entsprechenden Objekte um.
            Hierbei soll es immer eine Funktion geben, die einen kompletten Aufruf bearbeitet in dem sie
            jeweils pro Item eine eigene Funktion aufruft, in welcher die eigentliche Parse-Arbeit passiert


 */