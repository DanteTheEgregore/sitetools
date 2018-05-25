// ==UserScript==
// @name         Backoffice Auto Complete
// @namespace    https://backoffice.ehsevolve.com
// @version      0.1
// @description  Autogenerate Key/Secret if one doesn't exist.
// @author       Paul Smith
// @match        *backoffice.ehsevolve.com/admin/adoptions/detail*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @require      https://raw.github.com/bermi/password-generator/master/dist/password-generator.min.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

$(document).ready(function() {
    'use strict';
    if (!($('#format :selected').text() === 'Moodle') && !($('#ltiDetailsURL').length === 0)) {
        $('#ltiDetailsURL').val('https://authgateway.elsevier.com/tools/ltiContentTool')
        $('#adoption-input-details > tbody > tr:nth-child(8)').after(
            '<tr><td width="50%"><button id="newInfo" type="button">Generate New</button></td><td width="50%"><button id="goInfo" type="button">Go to Grails</button></td></tr>');
        $('#newInfo').click(function() {
            $('#ltiDetailsKey').val($('#lmsAdministratorEmail').val().split('@')[1]);
            $('#ltiDetailsSecret').val(generatePassword(16, false));
        });
        $('#goInfo').click(function() {
            window.open('http://lti-admin-ui.eols.io/consumerKey/index?sort=institutionId&max=10&order=desc');
        });
    }
});