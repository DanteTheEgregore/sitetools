// ==UserScript==
// @name         EvolveTools
// @namespace    https://evolve.elsevier.com
// @version      0.1
// @description  A set of tools meant to make browsing Evolve less painful.
// @author       Paul Smith
// @match        *evolve.elsevier.com/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @require      https://www.google.com/jsapi
// @resource     customCSS https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css
// ==/UserScript==
$(document).ready(function() {
    llamas();
});

function llamas() {
    google.load('search', '1');
    google.setOnLoadCallback(OnLoad);
    var search;
    var keyword = 'llamas';
    search = new google.search.ImageSearch();
    search.setSearchCompleteCallback(this, searchComplete, null);
    search.execute(keyword);
}

function searchComplete() {
    if (search.results && search.results.length > 0) {
        var rnd = Math.floor(Math.random() * search.results.length);
        $('body > ui-view > div > div > div.container__hero-image.container__hero-image__image--split').replaceWith('<img src="' + search.results[rnd]['url'] + '"/>');
    }
}