// ==UserScript==
// @name     tLib navigation
// @version  2.0
// @namespace    http://tampermonkey.net/
// @description  Improve Tlib navigation
// @downloadURL https://github.com/se-ti/tlibNavigation/raw/master/tlibNavigation.user.js
// @updateURL   https://github.com/se-ti/tlibNavigation/raw/master/tlibNavigation.user.js
// @author       Serge Titov
// @grant    none
// @match *://*.tlib.ru/doc.aspx*
// ==/UserScript==

(function() {
  'use strict';
  
  var pathRe = /page=(\d+)/;
 
  var __htmlSubstitutes = [{r:/&/gi, t:'&amp;'},
    {r:/</gi, t:'&lt;'},
    {r:/\>/gi, t:'&gt;'},
    {r:/'/gi, t:'&apos;'},
    {r:/"/gi, t:'&quot;'}
  ];
  
  function $get(id) {
    return document.getElementById(id);
  }
  
  function toHTML(str) {
    if (!str)
      return '';

    if (typeof(str) !== 'string' && !(str instanceof String))
      throw Error("Can't toHTML not a string");

    if (!str.replace)
      throw Error("String object desn't have replace method");
    
    var res = str;
    for (var i = 0; i < __htmlSubstitutes.length; i++)
      res = res.replace(__htmlSubstitutes[i].r, arr[i].t);
    return res;
  }
  
  function onTlibKeyDown(evt)
  {    
    var getPageId = function(href) {
        var res = pathRe.exec(href);
        return res ? res[1] : '';
      };

    if (evt.key != 'ArrowRight' && evt.code != 'ArrowLeft' || !document.querySelectorAll)
      return;

    var navs = document.querySelectorAll('.NavigateString a');
    if (navs.length < 2)
      return;

    var cur = +getPageId(window.location.search);
    var first = Math.min(cur, getPageId(navs[0].getAttribute('href')));
    var last = Math.max(cur, getPageId(navs[navs.length - 1].getAttribute('href')));

    var delta = evt.ctrlKey ? (evt.shiftKey ? 10000 : 5) : 1;
    if (evt.key == 'ArrowLeft')
      delta *= -1;

    navigateTo(Math.max(first, Math.min(last, cur + delta)), last);
  }
  
  
  function navigateTo(pageId, last) {   
    if (!history.pushState) {
      window.location.search = window.location.search.replace(pathRe, 'page=' + pageId);
      return;
    }
    
    history.pushState(null, '', window.location.toString().replace(pathRe, 'page=' + pageId));
    
    var el = $get('Image1');
    el.setAttribute('src', el.getAttribute('src').replace(/\d+\.png/, pageId + '.png'));
    
    el = $get('HyperLinkGetTiff');
    el.setAttribute('href', el.getAttribute('href').replace(/\d+\.tif/, pageId + '.tif'));
    
    el = $get('doc');
    el.setAttribute('action', el.getAttribute('action').replace(pathRe, 'page=' + pageId));
    
    
    $get('Label2').innerHTML = toHTML('Страница ' + pageId + ' из ' + last);
    $get('Panel1').innerHTML = generateNavString(pageId, last);
  }
  
  
  function generateNavString(current, last) {
    var res = [];
    var space = '<span> &nbsp;</span>';
    
    res.push(current > 1 ? navItem(1, '<'): space)
    
    for (var i = Math.max(1, current - 5); i <= Math.min(last, current + 5); i++)
      res.push(i != current ? navItem(i) : '<span>' + toHTML(current) + '</span>');
    
    res.push(current < last ? navItem(last, '>') : space);
    return res.join(space);
  }
  
  function navItem(id, caption) {
    return '<span><a href="doc.aspx' + window.location.search.replace(pathRe, 'page=' + id) + '">' + toHTML(caption || id) + '</a></span>';
  }

  document.body.addEventListener('keydown', onTlibKeyDown);
})();
