// ==UserScript==
// @name         Grails Search
// @namespace    http://lti-admin-ui.eols.io/
// @version      0.3
// @description  Search Grails at your leisure.
// @author       Paul Smith
// @match        *lti-admin-ui.eols.io/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @require      https://cdn.datatables.net/v/bs4/dt-1.10.16/datatables.min.js
// @resource     customCSS https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==
var warn = 0;
$(document).ready(function() {
    'use strict';
    var newCSS = GM_getResourceText("customCSS");
    GM_addStyle(newCSS);

    var maxOffset;
    var url = window.location.href;
    var table;

    switch (window.location.pathname) {
        case '/lmsConfig/index':
            $('#list-lmsConfig > div.pagination').hide();
            maxOffset = ($('#list-lmsConfig > div.pagination > a:nth-child(12)').text() + '0') - 10;
            table = $('#list-lmsConfig > table').DataTable({
                "scrollX": true
            });
            concatTables(url, maxOffset, table, 'clientName');
            break;
        case '/consumerKey/index':
            $('#list-consumerKey > div.pagination').hide();
            maxOffset = ($('#list-consumerKey > div.pagination > a:nth-child(12)').text() + '0') - 10;
            table = $('#list-consumerKey > table').DataTable();
            concatTables(url, maxOffset, table, 'key');
            break;
        case '/outcomeBuffer/index':
            console.log('true');
            $('#list-outcomeBuffer > div.pagination').hide();
            maxOffset = ($('#list-outcomeBuffer > div.pagination > a:nth-child(12)').text() + '0') - 10;
            table = $('#list-outcomeBuffer > table').DataTable();
            concatTables(url, maxOffset, table, 'lmsClientId');
            break;
        case '/outcomeLog/index':
            break;
        default:
            break;
    }
});

function concatTables(url, maxOffset, table, sortOrder) {
    for (var i = 10; i <= maxOffset; i += 10) {
        var payload = {
            sort: sortOrder,
            order: 'asc',
            offset: i,
            max: '10'
        }
        $.ajax({
            url: url,
            type: 'GET',
            data: payload,
            contentType: 'application/json',
            success: function(data) {
                var rows = $($($.parseHTML(data)).children()[3]).children(0).children(1);
                $.each(rows, function(index, value) {
                    if (!(index === 0)) {
                        table.row.add(value).draw();
                    }
                });
            },
            error: function(e) {
                if (warn === 0) {
                    alert('There was an error retreiving datatable information! See the console for more info.');
                    console.log(e);
                    warn = 1;
                }
            }
        });
    }
}