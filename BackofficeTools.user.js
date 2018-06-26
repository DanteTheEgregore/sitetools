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

$(document).ready(function() {
    //Clone, enable, and align evolve_user_id field
    var userId = $('#evolve_user_id').clone().attr('type', 'text').attr('disabled', 'true').attr('id', 'evolve_user_id_COPY').wrap('<td valign="top"></td>').parent();
    $('#password').closest('td').after(userId);
    $('#password').closest('td').after('<td valign="top" width="90"><img height="20" src="/static/images/1x1.gif" width="20"></td>');
    $('#evolve_user_id_COPY').before('User ID: </br>');

    //Clone, enable, and align vst_guid field
    var vstId = $('#vst_guid').clone().attr('type', 'text').attr('disabled', 'true').attr('id', 'vst_guid_COPY').wrap('<td valign="top"></td>').parent().wrap('<tr></tr>').parent();
    $('#password').closest('tr').after(vstId);
    $('#password').closest('tr').after('<tr><td colspan="9" height="6"><img height="9" src="/static/images/1x1.gif"></td></tr>');
    $('#vst_guid_COPY').before('VST GUID: </br>');
});