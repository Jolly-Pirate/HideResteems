// ==UserScript==
// @name         Hide ReSteems
// @namespace    http://tampermonkey.net/
// @version      0.12
// @description  Button to Toggle ReSTEEMs from a User's STEEMIT.com Profile and Feed Page
// @author       @alexpmorris
// @match        https://steemit.com/*
// @grant        none
// @require https://code.jquery.com/jquery-1.12.4.min.js
// @require https://greasyfork.org/scripts/6250-waitforkeyelements/code/waitForKeyElements.js?version=23756
// ==/UserScript==

(function() {
    'use strict';

    var isHiding = false;

    waitForKeyElements ("#posts_list", addReSteemToggleBtn);

    function addReSteemToggleBtn(userDiv) {

        var validUrl = document.URL.replace("https://steemit.com/","");

        if ((userDiv !== null) && (validUrl.startsWith("@")) && ((validUrl.indexOf("/")==-1) || (validUrl.endsWith("/feed"))) ) {

            isHiding = false;
            var zNode       = document.createElement ('div');
            zNode.innerHTML = '<button id="rsButton" type="button"><img id="rsBtnImg" src="https://steemitimages.com/DQmQYXHkLv4A3h8pZ1ntQM1FTTT6knt5EaVUo7hdj2nNAcR/button_hide-resteems.png"></button>';
            zNode.setAttribute ('id', 'rsContainer');
            zNode.setAttribute ('style', 'width:120px; margin-bottom:5px;');
            userDiv.prepend(zNode);

            //activate new button
            document.getElementById ("rsButton").addEventListener (
                "click", ButtonClickAction, false);

            function ButtonClickAction (zEvent) {
                if (!isHiding) {
                    $("#rsBtnImg").attr('src', 'https://steemitimages.com/DQmaRcPxCKNV45aPVaWMbBkP7WvJatgkKqtih7ZCfVsLs4r/button_show-resteems.png');
                    if (validUrl.endsWith("/feed")) $(".PostSummary__reblogged_by").parent('').hide(); else
                        $(".PostSummary__reblogged_by").filter(function () {return ($(".UserNames",this)[0] == null);}).parent('').hide();
                } else {
                    $("#rsBtnImg").attr('src', 'https://steemitimages.com/DQmQYXHkLv4A3h8pZ1ntQM1FTTT6knt5EaVUo7hdj2nNAcR/button_hide-resteems.png');
                    $(".PostSummary__reblogged_by").parent('').show();
                }
                isHiding = !isHiding;

            }

        }
    }

})();
