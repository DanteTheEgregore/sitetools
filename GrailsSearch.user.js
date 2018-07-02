// ==UserScript==
// @name         Grails Search
// @namespace    http://lti-admin-ui.eols.io/
// @version      0.5
// @description  Search Grails at your leisure.
// @author       Paul Smith
// @match        *lti-admin-ui.eols.io/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @require      https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js
// @require      https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap.min.js
// @require      https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js
// @require      https://cdn.datatables.net/responsive/2.2.3/js/responsive.bootstrap.min.js
// @resource     customCSS1 https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css
// @resource     customCSS2 https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap.min.css
// @resource     customCSS3 https://cdn.datatables.net/responsive/2.2.3/css/responsive.bootstrap.min.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==
var warn = 0;

$(document).ready(function() {
    'use strict';
    var newCSS1 = GM_getResourceText('customCSS1');
    var newCSS2 = GM_getResourceText('customCSS2');
    var newCSS3 = GM_getResourceText('customCSS3');
    GM_addStyle(newCSS1);
    GM_addStyle(newCSS2);
    GM_addStyle(newCSS3);
    GM_addStyle('.pagination>li>a,.pagination>li>span{position:relative;float:left;padding:6px 12px;margin-left:-1px;line-height:1.42857143;color:#abbf78;text-decoration:none;background-color:#fff;border:1px solid #ddd}.pagination>.active>a,.pagination>.active>a:focus,.pagination>.active>a:hover,.pagination>.active>span,.pagination>.active>span:focus,.pagination>.active>span:hover{z-index:3;color:#fff;cursor:default;background-color:#abbf78;border-color:#333}');
    $('body').css('margin', 'auto');
    $('body').css('font-size', '16px');
    $('table').css('border-spacing', '4px');
    var maxOffset;
    var url = window.location.href;
    var table;
    switch (window.location.pathname) {
        case '/lmsConfig/index':
            $('#list-lmsConfig > div.pagination').hide();
            maxOffset = ($('#list-lmsConfig > div.pagination > a:nth-child(12)').text() + '0') - 10;
            table = $('#list-lmsConfig > table').DataTable({
                'scrollX': true
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