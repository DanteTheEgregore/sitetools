// ==UserScript==
// @name         Backoffice Tools
// @namespace    https://backoffice.ehsevolve.com/
// @version      0.1
// @description  Simple "Log in As" button similar to "Act as User" in Canvas
// @author       Paul Smith
// @match        *backoffice.ehsevolve.com/admin/viewUserProfile*
// @match        *backoffice.ehsevolve.com/admin/updateUserProfile*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

$(document).ready( function () {
    //Clone, enable, and align evolve_user_id field
    var userId = $('#evolve_user_id').clone().attr('type', 'text').attr('disabled', 'true').attr('id', 'evolve_user_id_COPY').wrap('<td valign="top"></td>').parent();
    $('#accountForm > table > tbody > tr:nth-child(6) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(9) > td').after(userId);
    $('#accountForm > table > tbody > tr:nth-child(6) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(9) > td:nth-child(1)').after('<td valign="top" width="173"><img height="20" src="/static/images/1x1.gif" width="20"></td>');
    $('#evolve_user_id_COPY').before('User ID: </br>');

    //Clone, enable, and align vst_guid field
    var vstId = $('#vst_guid').clone().attr('type', 'text').attr('disabled', 'true').attr('id', 'vst_guid_COPY').wrap('<td valign="top"></td>').parent().wrap('<tr></tr>').parent();
    $('#accountForm > table > tbody > tr:nth-child(6) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(9)').after(vstId);
    $('#accountForm > table > tbody > tr:nth-child(6) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(10)').before('<tr><td colspan="9" height="6"><img height="9" src="/static/images/1x1.gif"></td></tr>');
    $('#vst_guid_COPY').before('VST GUID: </br>');
});