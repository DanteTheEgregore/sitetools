// ==UserScript==
// @name         Grails Completion
// @namespace    http://lti-admin-ui.eols.io/
// @version      0.2
// @description  Automatically fills out certain fields in Grails
// @author       Paul Smith
// @match        *http://lti-admin-ui.eols.io/lmsConfig/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==
$(document).ready(function() {
    'use strict';
    $('#systemName').change(function() {
        clearValues();
        switch ($('#systemName').val()) {
            case 'Blackboard':
                $('#clientKey').val('Not Needed');
                $('#clientProgramId').val('bb-integration');
                $('#clientVendorId').val('Elsevier');
                break;
            case 'Canvas':
                $('#clientKey').val('Not Needed');
                $('#systemApiUrl').val('https://');
                break;
            case 'D2L':
                $('#clientKey').val('Not Needed');
                $('#systemApiUrl').val('https://');
                break;
            case 'eCollege':
                break;
            case 'Moodle':
                break;
            case 'Other':
                break
            default:
                window.alert('Unable to match "System Name" value for Completion. This script may need to be updated. Please see the console log for further information.');
                console.log(GM_Info);
        }
    });
});

function clearValues() {
    $('#create-lmsConfig > form > fieldset.form').find('input').each(function(index, value) {
    	console.log(value);
    	$(value).val('');
    });
}