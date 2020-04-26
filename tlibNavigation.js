// ==UserScript==
// @name     Tlib navigation
// @version  1
// @namespace    http://tampermonkey.net/
// @description  Improve Tlib navigation
// @author       Serge Titov
// @grant    none
// @match *://*.tlib.ru/*
// ==/UserScript==

(function() {
    'use strict';

    function onTlibKeyDown(evt) {
        var pathRe = /page=(\d+)/;
        
        var getPageId = function(href) {
			var res = pathRe.exec(href);
			return res ? res[1] : '';
		}


        if (evt.key != 'ArrowRight' && evt.code != 'ArrowLeft') {
            return;
        }

        var navs = document.querySelectorAll('.NavigateString a');
        if (navs.length < 2) {
            return;
        }

        var cur = +getPageId(window.location.search);
        var first = Math.min(cur, getPageId(navs[0].getAttribute('href')));
        var last = Math.max(cur, getPageId(navs[navs.length - 1].getAttribute('href')));

        var delta = evt.ctrlKey ? (evt.shiftKey ? 10000 : 5) : 1;
        if (evt.key == 'ArrowLeft') {
            delta *= -1;
        }

        var pageId = Math.max(first, Math.min(last, cur + delta));
        //	console.log(first, cur, last, delta, pageId);
        window.location.search = window.location.search.replace(pathRe, 'page=' + pageId);
    }

    document.body.addEventListener('keydown', onTlibKeyDown);
})();
