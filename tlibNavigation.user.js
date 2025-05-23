// ==UserScript==
// @name        tLib navigation
// @version     5.4
// @namespace   http://tampermonkey.net/
// @description Improve Tlib navigation
// @downloadURL https://github.com/se-ti/tlibNavigation/raw/master/tlibNavigation.user.js
// @updateURL   https://github.com/se-ti/tlibNavigation/raw/master/tlibNavigation.user.js
// @author      Serge Titov
// @grant       none
// @match *://*.tlib.ru/doc.aspx*
// @match *://*.tlib.ru/
// ==/UserScript==


(function() {
  'use strict';

  var sett = {
    compatibilityMode: true,                   // работа из userScript вместе со скрпитом, уже установленным на сайте tLib
    openMapByDefault: (document.cookie || '').indexOf('openMapByDefault=1') >= 0,                    // открывать карту
    tracksInArchive: false,                    // запрашивать все треки в 1 архиве

    searchOnMain: true,                        // предзаполнять поле Маршрут на главной значением из параметра запроса http://tlib.ru/#s=Казбек, и искать по нему, синтезируя событие click
    navClicks: true,                           // перехватывать клик в номер страницы скана и подменять лишь ссылку на картинку
    keyboardNavigationBetweenReports: true,    // Ctrl+Alt+стрелки -- переход между отчетами (кажется не работает в FF)

    // debug section
    logAllEntries: false,
    logSummary: false
  };


// хорошие
// https://www.tlib.ru/doc.aspx?id=43694&page=1
// https://www.tlib.ru/doc.aspx?id=43707&page=1

// https://www.tlib.ru/doc.aspx?id=43540&page=1 -- пустой
// https://www.tlib.ru/doc.aspx?id=43553&page=1 -- пустой!
// https://www.tlib.ru/doc.aspx?id=43728&page=1 pdf в macos
// https://www.tlib.ru/doc.aspx?id=43497&page=1 single pdf 866
// https://www.tlib.ru/doc.aspx?id=43597&page=1 images in archive

// https://www.tlib.ru/doc.aspx?id=39856&page=1 один трек, большой kmz
// https://www.tlib.ru/doc.aspx?id=44302&page=1 нормальный gpx
// https://www.tlib.ru/doc.aspx?id=44360&page=1 куча gpx

// https://www.tlib.ru/doc.aspx?id=44362&page=1 -- битый архив


// see https://github.com/gildas-lormeau/zip.js/releases 2.6.62
// zip.js-2.6.62.zip\dist\zip-no-worker-inflate.min.js
((e,t)=>{"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).zip={})})(this,(function(e){"use strict";const{Array:t,Object:n,String:i,Number:r,BigInt:a,Math:s,Date:o,Map:l,Set:c,Response:d,URL:u,Error:f,Uint8Array:_,Uint16Array:h,Uint32Array:w,DataView:p,Blob:b,Promise:g,TextEncoder:m,TextDecoder:y,document:x,crypto:k,btoa:v,TransformStream:S,ReadableStream:R,WritableStream:z,CompressionStream:D,DecompressionStream:E,navigator:T,Worker:A}="undefined"!=typeof globalThis?globalThis:this||self,C=-2,F=-3,U=-5,W=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],L=[96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,192,80,7,10,0,8,96,0,8,32,0,9,160,0,8,0,0,8,128,0,8,64,0,9,224,80,7,6,0,8,88,0,8,24,0,9,144,83,7,59,0,8,120,0,8,56,0,9,208,81,7,17,0,8,104,0,8,40,0,9,176,0,8,8,0,8,136,0,8,72,0,9,240,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,200,81,7,13,0,8,100,0,8,36,0,9,168,0,8,4,0,8,132,0,8,68,0,9,232,80,7,8,0,8,92,0,8,28,0,9,152,84,7,83,0,8,124,0,8,60,0,9,216,82,7,23,0,8,108,0,8,44,0,9,184,0,8,12,0,8,140,0,8,76,0,9,248,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,196,81,7,11,0,8,98,0,8,34,0,9,164,0,8,2,0,8,130,0,8,66,0,9,228,80,7,7,0,8,90,0,8,26,0,9,148,84,7,67,0,8,122,0,8,58,0,9,212,82,7,19,0,8,106,0,8,42,0,9,180,0,8,10,0,8,138,0,8,74,0,9,244,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,204,81,7,15,0,8,102,0,8,38,0,9,172,0,8,6,0,8,134,0,8,70,0,9,236,80,7,9,0,8,94,0,8,30,0,9,156,84,7,99,0,8,126,0,8,62,0,9,220,82,7,27,0,8,110,0,8,46,0,9,188,0,8,14,0,8,142,0,8,78,0,9,252,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,194,80,7,10,0,8,97,0,8,33,0,9,162,0,8,1,0,8,129,0,8,65,0,9,226,80,7,6,0,8,89,0,8,25,0,9,146,83,7,59,0,8,121,0,8,57,0,9,210,81,7,17,0,8,105,0,8,41,0,9,178,0,8,9,0,8,137,0,8,73,0,9,242,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,202,81,7,13,0,8,101,0,8,37,0,9,170,0,8,5,0,8,133,0,8,69,0,9,234,80,7,8,0,8,93,0,8,29,0,9,154,84,7,83,0,8,125,0,8,61,0,9,218,82,7,23,0,8,109,0,8,45,0,9,186,0,8,13,0,8,141,0,8,77,0,9,250,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,198,81,7,11,0,8,99,0,8,35,0,9,166,0,8,3,0,8,131,0,8,67,0,9,230,80,7,7,0,8,91,0,8,27,0,9,150,84,7,67,0,8,123,0,8,59,0,9,214,82,7,19,0,8,107,0,8,43,0,9,182,0,8,11,0,8,139,0,8,75,0,9,246,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,206,81,7,15,0,8,103,0,8,39,0,9,174,0,8,7,0,8,135,0,8,71,0,9,238,80,7,9,0,8,95,0,8,31,0,9,158,84,7,99,0,8,127,0,8,63,0,9,222,82,7,27,0,8,111,0,8,47,0,9,190,0,8,15,0,8,143,0,8,79,0,9,254,96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,193,80,7,10,0,8,96,0,8,32,0,9,161,0,8,0,0,8,128,0,8,64,0,9,225,80,7,6,0,8,88,0,8,24,0,9,145,83,7,59,0,8,120,0,8,56,0,9,209,81,7,17,0,8,104,0,8,40,0,9,177,0,8,8,0,8,136,0,8,72,0,9,241,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,201,81,7,13,0,8,100,0,8,36,0,9,169,0,8,4,0,8,132,0,8,68,0,9,233,80,7,8,0,8,92,0,8,28,0,9,153,84,7,83,0,8,124,0,8,60,0,9,217,82,7,23,0,8,108,0,8,44,0,9,185,0,8,12,0,8,140,0,8,76,0,9,249,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,197,81,7,11,0,8,98,0,8,34,0,9,165,0,8,2,0,8,130,0,8,66,0,9,229,80,7,7,0,8,90,0,8,26,0,9,149,84,7,67,0,8,122,0,8,58,0,9,213,82,7,19,0,8,106,0,8,42,0,9,181,0,8,10,0,8,138,0,8,74,0,9,245,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,205,81,7,15,0,8,102,0,8,38,0,9,173,0,8,6,0,8,134,0,8,70,0,9,237,80,7,9,0,8,94,0,8,30,0,9,157,84,7,99,0,8,126,0,8,62,0,9,221,82,7,27,0,8,110,0,8,46,0,9,189,0,8,14,0,8,142,0,8,78,0,9,253,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,195,80,7,10,0,8,97,0,8,33,0,9,163,0,8,1,0,8,129,0,8,65,0,9,227,80,7,6,0,8,89,0,8,25,0,9,147,83,7,59,0,8,121,0,8,57,0,9,211,81,7,17,0,8,105,0,8,41,0,9,179,0,8,9,0,8,137,0,8,73,0,9,243,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,203,81,7,13,0,8,101,0,8,37,0,9,171,0,8,5,0,8,133,0,8,69,0,9,235,80,7,8,0,8,93,0,8,29,0,9,155,84,7,83,0,8,125,0,8,61,0,9,219,82,7,23,0,8,109,0,8,45,0,9,187,0,8,13,0,8,141,0,8,77,0,9,251,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,199,81,7,11,0,8,99,0,8,35,0,9,167,0,8,3,0,8,131,0,8,67,0,9,231,80,7,7,0,8,91,0,8,27,0,9,151,84,7,67,0,8,123,0,8,59,0,9,215,82,7,19,0,8,107,0,8,43,0,9,183,0,8,11,0,8,139,0,8,75,0,9,247,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,207,81,7,15,0,8,103,0,8,39,0,9,175,0,8,7,0,8,135,0,8,71,0,9,239,80,7,9,0,8,95,0,8,31,0,9,159,84,7,99,0,8,127,0,8,63,0,9,223,82,7,27,0,8,111,0,8,47,0,9,191,0,8,15,0,8,143,0,8,79,0,9,255],O=[80,5,1,87,5,257,83,5,17,91,5,4097,81,5,5,89,5,1025,85,5,65,93,5,16385,80,5,3,88,5,513,84,5,33,92,5,8193,82,5,9,90,5,2049,86,5,129,192,5,24577,80,5,2,87,5,385,83,5,25,91,5,6145,81,5,7,89,5,1537,85,5,97,93,5,24577,80,5,4,88,5,769,84,5,49,92,5,12289,82,5,13,90,5,3073,86,5,193,192,5,24577],N=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],I=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,112,112],H=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],P=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];function M(){let e,t,n,i,r,a;function s(e,t,s,o,l,c,d,u,f,_,h){let w,p,b,g,m,y,x,k,v,S,R,z,D,E,T;S=0,m=s;do{n[e[t+S]]++,S++,m--}while(0!==m);if(n[0]==s)return d[0]=-1,u[0]=0,0;for(k=u[0],y=1;15>=y&&0===n[y];y++);for(x=y,y>k&&(k=y),m=15;0!==m&&0===n[m];m--);for(b=m,k>m&&(k=m),u[0]=k,E=1<<y;m>y;y++,E<<=1)if(0>(E-=n[y]))return F;if(0>(E-=n[m]))return F;for(n[m]+=E,a[1]=y=0,S=1,D=2;0!=--m;)a[D]=y+=n[S],D++,S++;m=0,S=0;do{0!==(y=e[t+S])&&(h[a[y]++]=m),S++}while(++m<s);for(s=a[b],a[0]=m=0,S=0,g=-1,z=-k,r[0]=0,R=0,T=0;b>=x;x++)for(w=n[x];0!=w--;){for(;x>z+k;){if(g++,z+=k,T=b-z,T=T>k?k:T,(p=1<<(y=x-z))>w+1&&(p-=w+1,D=x,T>y))for(;++y<T&&(p<<=1)>n[++D];)p-=n[D];if(T=1<<y,_[0]+T>1440)return F;r[g]=R=_[0],_[0]+=T,0!==g?(a[g]=m,i[0]=y,i[1]=k,y=m>>>z-k,i[2]=R-r[g-1]-y,f.set(i,3*(r[g-1]+y))):d[0]=R}for(i[1]=x-z,s>S?h[S]<o?(i[0]=256>h[S]?0:96,i[2]=h[S++]):(i[0]=c[h[S]-o]+16+64,i[2]=l[h[S++]-o]):i[0]=192,p=1<<x-z,y=m>>>z;T>y;y+=p)f.set(i,3*(R+y));for(y=1<<x-1;0!=(m&y);y>>>=1)m^=y;for(m^=y,v=(1<<z)-1;(m&v)!=a[g];)g--,z-=k,v=(1<<z)-1}return 0!==E&&1!=b?U:0}function o(s){let o;for(e||(e=[],t=[],n=new Int32Array(16),i=[],r=new Int32Array(15),a=new Int32Array(16)),t.length<s&&(t=[]),o=0;s>o;o++)t[o]=0;for(o=0;16>o;o++)n[o]=0;for(o=0;3>o;o++)i[o]=0;r.set(n.subarray(0,15),0),a.set(n.subarray(0,16),0)}this.inflate_trees_bits=(n,i,r,a,l)=>{let c;return o(19),e[0]=0,c=s(n,0,19,19,null,null,r,i,a,e,t),c==F?l.msg="oversubscribed dynamic bit lengths tree":c!=U&&0!==i[0]||(l.msg="incomplete dynamic bit lengths tree",c=F),c},this.inflate_trees_dynamic=(n,i,r,a,l,c,d,u,f)=>{let _;return o(288),e[0]=0,_=s(r,0,n,257,N,I,c,a,u,e,t),0!=_||0===a[0]?(_==F?f.msg="oversubscribed literal/length tree":-4!=_&&(f.msg="incomplete literal/length tree",_=F),_):(o(288),_=s(r,n,i,0,H,P,d,l,u,e,t),0!=_||0===l[0]&&n>257?(_==F?f.msg="oversubscribed distance tree":_==U?(f.msg="incomplete distance tree",_=F):-4!=_&&(f.msg="empty distance tree with lengths",_=F),_):0)}}function B(){const e=this;let t,n,i,r,a=0,s=0,o=0,l=0,c=0,d=0,u=0,f=0,_=0,h=0;function w(e,t,n,i,r,a,s,o){let l,c,d,u,f,_,h,w,p,b,g,m,y,x,k,v;h=o.next_in_index,w=o.avail_in,f=s.bitb,_=s.bitk,p=s.write,b=p<s.read?s.read-p-1:s.end-p,g=W[e],m=W[t];do{for(;20>_;)w--,f|=(255&o.read_byte(h++))<<_,_+=8;if(l=f&g,c=n,d=i,v=3*(d+l),0!==(u=c[v]))for(;;){if(f>>=c[v+1],_-=c[v+1],0!=(16&u)){for(u&=15,y=c[v+2]+(f&W[u]),f>>=u,_-=u;15>_;)w--,f|=(255&o.read_byte(h++))<<_,_+=8;for(l=f&m,c=r,d=a,v=3*(d+l),u=c[v];;){if(f>>=c[v+1],_-=c[v+1],0!=(16&u)){for(u&=15;u>_;)w--,f|=(255&o.read_byte(h++))<<_,_+=8;if(x=c[v+2]+(f&W[u]),f>>=u,_-=u,b-=y,x>p){k=p-x;do{k+=s.end}while(0>k);if(u=s.end-k,y>u){if(y-=u,p-k>0&&u>p-k)do{s.win[p++]=s.win[k++]}while(0!=--u);else s.win.set(s.win.subarray(k,k+u),p),p+=u,k+=u,u=0;k=0}}else k=p-x,p-k>0&&2>p-k?(s.win[p++]=s.win[k++],s.win[p++]=s.win[k++],y-=2):(s.win.set(s.win.subarray(k,k+2),p),p+=2,k+=2,y-=2);if(p-k>0&&y>p-k)do{s.win[p++]=s.win[k++]}while(0!=--y);else s.win.set(s.win.subarray(k,k+y),p),p+=y,k+=y,y=0;break}if(0!=(64&u))return o.msg="invalid distance code",y=o.avail_in-w,y=y>_>>3?_>>3:y,w+=y,h-=y,_-=y<<3,s.bitb=f,s.bitk=_,o.avail_in=w,o.total_in+=h-o.next_in_index,o.next_in_index=h,s.write=p,F;l+=c[v+2],l+=f&W[u],v=3*(d+l),u=c[v]}break}if(0!=(64&u))return 0!=(32&u)?(y=o.avail_in-w,y=y>_>>3?_>>3:y,w+=y,h-=y,_-=y<<3,s.bitb=f,s.bitk=_,o.avail_in=w,o.total_in+=h-o.next_in_index,o.next_in_index=h,s.write=p,1):(o.msg="invalid literal/length code",y=o.avail_in-w,y=y>_>>3?_>>3:y,w+=y,h-=y,_-=y<<3,s.bitb=f,s.bitk=_,o.avail_in=w,o.total_in+=h-o.next_in_index,o.next_in_index=h,s.write=p,F);if(l+=c[v+2],l+=f&W[u],v=3*(d+l),0===(u=c[v])){f>>=c[v+1],_-=c[v+1],s.win[p++]=c[v+2],b--;break}}else f>>=c[v+1],_-=c[v+1],s.win[p++]=c[v+2],b--}while(b>=258&&w>=10);return y=o.avail_in-w,y=y>_>>3?_>>3:y,w+=y,h-=y,_-=y<<3,s.bitb=f,s.bitk=_,o.avail_in=w,o.total_in+=h-o.next_in_index,o.next_in_index=h,s.write=p,0}e.init=(e,a,s,o,l,c)=>{t=0,u=e,f=a,i=s,_=o,r=l,h=c,n=null},e.proc=(e,p,b)=>{let g,m,y,x,k,v,S,R=0,z=0,D=0;for(D=p.next_in_index,x=p.avail_in,R=e.bitb,z=e.bitk,k=e.write,v=k<e.read?e.read-k-1:e.end-k;;)switch(t){case 0:if(v>=258&&x>=10&&(e.bitb=R,e.bitk=z,p.avail_in=x,p.total_in+=D-p.next_in_index,p.next_in_index=D,e.write=k,b=w(u,f,i,_,r,h,e,p),D=p.next_in_index,x=p.avail_in,R=e.bitb,z=e.bitk,k=e.write,v=k<e.read?e.read-k-1:e.end-k,0!=b)){t=1==b?7:9;break}o=u,n=i,s=_,t=1;case 1:for(g=o;g>z;){if(0===x)return e.bitb=R,e.bitk=z,p.avail_in=x,p.total_in+=D-p.next_in_index,p.next_in_index=D,e.write=k,e.inflate_flush(p,b);b=0,x--,R|=(255&p.read_byte(D++))<<z,z+=8}if(m=3*(s+(R&W[g])),R>>>=n[m+1],z-=n[m+1],y=n[m],0===y){l=n[m+2],t=6;break}if(0!=(16&y)){c=15&y,a=n[m+2],t=2;break}if(0==(64&y)){o=y,s=m/3+n[m+2];break}if(0!=(32&y)){t=7;break}return t=9,p.msg="invalid literal/length code",b=F,e.bitb=R,e.bitk=z,p.avail_in=x,p.total_in+=D-p.next_in_index,p.next_in_index=D,e.write=k,e.inflate_flush(p,b);case 2:for(g=c;g>z;){if(0===x)return e.bitb=R,e.bitk=z,p.avail_in=x,p.total_in+=D-p.next_in_index,p.next_in_index=D,e.write=k,e.inflate_flush(p,b);b=0,x--,R|=(255&p.read_byte(D++))<<z,z+=8}a+=R&W[g],R>>=g,z-=g,o=f,n=r,s=h,t=3;case 3:for(g=o;g>z;){if(0===x)return e.bitb=R,e.bitk=z,p.avail_in=x,p.total_in+=D-p.next_in_index,p.next_in_index=D,e.write=k,e.inflate_flush(p,b);b=0,x--,R|=(255&p.read_byte(D++))<<z,z+=8}if(m=3*(s+(R&W[g])),R>>=n[m+1],z-=n[m+1],y=n[m],0!=(16&y)){c=15&y,d=n[m+2],t=4;break}if(0==(64&y)){o=y,s=m/3+n[m+2];break}return t=9,p.msg="invalid distance code",b=F,e.bitb=R,e.bitk=z,p.avail_in=x,p.total_in+=D-p.next_in_index,p.next_in_index=D,e.write=k,e.inflate_flush(p,b);case 4:for(g=c;g>z;){if(0===x)return e.bitb=R,e.bitk=z,p.avail_in=x,p.total_in+=D-p.next_in_index,p.next_in_index=D,e.write=k,e.inflate_flush(p,b);b=0,x--,R|=(255&p.read_byte(D++))<<z,z+=8}d+=R&W[g],R>>=g,z-=g,t=5;case 5:for(S=k-d;0>S;)S+=e.end;for(;0!==a;){if(0===v&&(k==e.end&&0!==e.read&&(k=0,v=k<e.read?e.read-k-1:e.end-k),0===v&&(e.write=k,b=e.inflate_flush(p,b),k=e.write,v=k<e.read?e.read-k-1:e.end-k,k==e.end&&0!==e.read&&(k=0,v=k<e.read?e.read-k-1:e.end-k),0===v)))return e.bitb=R,e.bitk=z,p.avail_in=x,p.total_in+=D-p.next_in_index,p.next_in_index=D,e.write=k,e.inflate_flush(p,b);e.win[k++]=e.win[S++],v--,S==e.end&&(S=0),a--}t=0;break;case 6:if(0===v&&(k==e.end&&0!==e.read&&(k=0,v=k<e.read?e.read-k-1:e.end-k),0===v&&(e.write=k,b=e.inflate_flush(p,b),k=e.write,v=k<e.read?e.read-k-1:e.end-k,k==e.end&&0!==e.read&&(k=0,v=k<e.read?e.read-k-1:e.end-k),0===v)))return e.bitb=R,e.bitk=z,p.avail_in=x,p.total_in+=D-p.next_in_index,p.next_in_index=D,e.write=k,e.inflate_flush(p,b);b=0,e.win[k++]=l,v--,t=0;break;case 7:if(z>7&&(z-=8,x++,D--),e.write=k,b=e.inflate_flush(p,b),k=e.write,v=k<e.read?e.read-k-1:e.end-k,e.read!=e.write)return e.bitb=R,e.bitk=z,p.avail_in=x,p.total_in+=D-p.next_in_index,p.next_in_index=D,e.write=k,e.inflate_flush(p,b);t=8;case 8:return b=1,e.bitb=R,e.bitk=z,p.avail_in=x,p.total_in+=D-p.next_in_index,p.next_in_index=D,e.write=k,e.inflate_flush(p,b);case 9:return b=F,e.bitb=R,e.bitk=z,p.avail_in=x,p.total_in+=D-p.next_in_index,p.next_in_index=D,e.write=k,e.inflate_flush(p,b);default:return b=C,e.bitb=R,e.bitk=z,p.avail_in=x,p.total_in+=D-p.next_in_index,p.next_in_index=D,e.write=k,e.inflate_flush(p,b)}},e.free=()=>{}}M.inflate_trees_fixed=(e,t,n,i)=>(e[0]=9,t[0]=5,n[0]=L,i[0]=O,0);const q=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];function V(e,t){const n=this;let i,r=0,a=0,s=0,o=0;const l=[0],c=[0],d=new B;let u=0,f=new Int32Array(4320);const h=new M;n.bitk=0,n.bitb=0,n.win=new _(t),n.end=t,n.read=0,n.write=0,n.reset=(e,t)=>{t&&(t[0]=0),6==r&&d.free(e),r=0,n.bitk=0,n.bitb=0,n.read=n.write=0},n.reset(e,null),n.inflate_flush=(e,t)=>{let i,r,a;return r=e.next_out_index,a=n.read,i=(a>n.write?n.end:n.write)-a,i>e.avail_out&&(i=e.avail_out),0!==i&&t==U&&(t=0),e.avail_out-=i,e.total_out+=i,e.next_out.set(n.win.subarray(a,a+i),r),r+=i,a+=i,a==n.end&&(a=0,n.write==n.end&&(n.write=0),i=n.write-a,i>e.avail_out&&(i=e.avail_out),0!==i&&t==U&&(t=0),e.avail_out-=i,e.total_out+=i,e.next_out.set(n.win.subarray(a,a+i),r),r+=i,a+=i),e.next_out_index=r,n.read=a,t},n.proc=(e,t)=>{let _,w,p,b,g,m,y,x;for(b=e.next_in_index,g=e.avail_in,w=n.bitb,p=n.bitk,m=n.write,y=m<n.read?n.read-m-1:n.end-m;;){let k,v,S,R,z,D,E,T;switch(r){case 0:for(;3>p;){if(0===g)return n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);t=0,g--,w|=(255&e.read_byte(b++))<<p,p+=8}switch(_=7&w,u=1&_,_>>>1){case 0:w>>>=3,p-=3,_=7&p,w>>>=_,p-=_,r=1;break;case 1:k=[],v=[],S=[[]],R=[[]],M.inflate_trees_fixed(k,v,S,R),d.init(k[0],v[0],S[0],0,R[0],0),w>>>=3,p-=3,r=6;break;case 2:w>>>=3,p-=3,r=3;break;case 3:return w>>>=3,p-=3,r=9,e.msg="invalid block type",t=F,n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t)}break;case 1:for(;32>p;){if(0===g)return n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);t=0,g--,w|=(255&e.read_byte(b++))<<p,p+=8}if((~w>>>16&65535)!=(65535&w))return r=9,e.msg="invalid stored block lengths",t=F,n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);a=65535&w,w=p=0,r=0!==a?2:0!==u?7:0;break;case 2:if(0===g)return n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);if(0===y&&(m==n.end&&0!==n.read&&(m=0,y=m<n.read?n.read-m-1:n.end-m),0===y&&(n.write=m,t=n.inflate_flush(e,t),m=n.write,y=m<n.read?n.read-m-1:n.end-m,m==n.end&&0!==n.read&&(m=0,y=m<n.read?n.read-m-1:n.end-m),0===y)))return n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);if(t=0,_=a,_>g&&(_=g),_>y&&(_=y),n.win.set(e.read_buf(b,_),m),b+=_,g-=_,m+=_,y-=_,0!=(a-=_))break;r=0!==u?7:0;break;case 3:for(;14>p;){if(0===g)return n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);t=0,g--,w|=(255&e.read_byte(b++))<<p,p+=8}if(s=_=16383&w,(31&_)>29||(_>>5&31)>29)return r=9,e.msg="too many length or distance symbols",t=F,n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);if(_=258+(31&_)+(_>>5&31),!i||i.length<_)i=[];else for(x=0;_>x;x++)i[x]=0;w>>>=14,p-=14,o=0,r=4;case 4:for(;4+(s>>>10)>o;){for(;3>p;){if(0===g)return n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);t=0,g--,w|=(255&e.read_byte(b++))<<p,p+=8}i[q[o++]]=7&w,w>>>=3,p-=3}for(;19>o;)i[q[o++]]=0;if(l[0]=7,_=h.inflate_trees_bits(i,l,c,f,e),0!=_)return(t=_)==F&&(i=null,r=9),n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);o=0,r=5;case 5:for(;_=s,258+(31&_)+(_>>5&31)>o;){let a,d;for(_=l[0];_>p;){if(0===g)return n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);t=0,g--,w|=(255&e.read_byte(b++))<<p,p+=8}if(_=f[3*(c[0]+(w&W[_]))+1],d=f[3*(c[0]+(w&W[_]))+2],16>d)w>>>=_,p-=_,i[o++]=d;else{for(x=18==d?7:d-14,a=18==d?11:3;_+x>p;){if(0===g)return n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);t=0,g--,w|=(255&e.read_byte(b++))<<p,p+=8}if(w>>>=_,p-=_,a+=w&W[x],w>>>=x,p-=x,x=o,_=s,x+a>258+(31&_)+(_>>5&31)||16==d&&1>x)return i=null,r=9,e.msg="invalid bit length repeat",t=F,n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);d=16==d?i[x-1]:0;do{i[x++]=d}while(0!=--a);o=x}}if(c[0]=-1,z=[],D=[],E=[],T=[],z[0]=9,D[0]=6,_=s,_=h.inflate_trees_dynamic(257+(31&_),1+(_>>5&31),i,z,D,E,T,f,e),0!=_)return _==F&&(i=null,r=9),t=_,n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);d.init(z[0],D[0],f,E[0],f,T[0]),r=6;case 6:if(n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,1!=(t=d.proc(n,e,t)))return n.inflate_flush(e,t);if(t=0,d.free(e),b=e.next_in_index,g=e.avail_in,w=n.bitb,p=n.bitk,m=n.write,y=m<n.read?n.read-m-1:n.end-m,0===u){r=0;break}r=7;case 7:if(n.write=m,t=n.inflate_flush(e,t),m=n.write,y=m<n.read?n.read-m-1:n.end-m,n.read!=n.write)return n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);r=8;case 8:return t=1,n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);case 9:return t=F,n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t);default:return t=C,n.bitb=w,n.bitk=p,e.avail_in=g,e.total_in+=b-e.next_in_index,e.next_in_index=b,n.write=m,n.inflate_flush(e,t)}}},n.free=e=>{n.reset(e,null),n.win=null,f=null},n.set_dictionary=(e,t,i)=>{n.win.set(e.subarray(t,t+i),0),n.read=n.write=i},n.sync_point=()=>1==r?1:0}const K=13,Z=[0,0,255,255];function G(){const e=this;function t(e){return e&&e.istate?(e.total_in=e.total_out=0,e.msg=null,e.istate.mode=7,e.istate.blocks.reset(e,null),0):C}e.mode=0,e.method=0,e.was=[0],e.need=0,e.marker=0,e.wbits=0,e.inflateEnd=t=>(e.blocks&&e.blocks.free(t),e.blocks=null,0),e.inflateInit=(n,i)=>(n.msg=null,e.blocks=null,8>i||i>15?(e.inflateEnd(n),C):(e.wbits=i,n.istate.blocks=new V(n,1<<i),t(n),0)),e.inflate=(e,t)=>{let n,i;if(!e||!e.istate||!e.next_in)return C;const r=e.istate;for(t=4==t?U:0,n=U;;)switch(r.mode){case 0:if(0===e.avail_in)return n;if(n=t,e.avail_in--,e.total_in++,8!=(15&(r.method=e.read_byte(e.next_in_index++)))){r.mode=K,e.msg="unknown compression method",r.marker=5;break}if(8+(r.method>>4)>r.wbits){r.mode=K,e.msg="invalid win size",r.marker=5;break}r.mode=1;case 1:if(0===e.avail_in)return n;if(n=t,e.avail_in--,e.total_in++,i=255&e.read_byte(e.next_in_index++),((r.method<<8)+i)%31!=0){r.mode=K,e.msg="incorrect header check",r.marker=5;break}if(0==(32&i)){r.mode=7;break}r.mode=2;case 2:if(0===e.avail_in)return n;n=t,e.avail_in--,e.total_in++,r.need=(255&e.read_byte(e.next_in_index++))<<24&4278190080,r.mode=3;case 3:if(0===e.avail_in)return n;n=t,e.avail_in--,e.total_in++,r.need+=(255&e.read_byte(e.next_in_index++))<<16&16711680,r.mode=4;case 4:if(0===e.avail_in)return n;n=t,e.avail_in--,e.total_in++,r.need+=(255&e.read_byte(e.next_in_index++))<<8&65280,r.mode=5;case 5:return 0===e.avail_in?n:(n=t,e.avail_in--,e.total_in++,r.need+=255&e.read_byte(e.next_in_index++),r.mode=6,2);case 6:return r.mode=K,e.msg="need dictionary",r.marker=0,C;case 7:if(n=r.blocks.proc(e,n),n==F){r.mode=K,r.marker=0;break}if(0==n&&(n=t),1!=n)return n;n=t,r.blocks.reset(e,r.was),r.mode=12;case 12:return e.avail_in=0,1;case K:return F;default:return C}},e.inflateSetDictionary=(e,t,n)=>{let i=0,r=n;if(!e||!e.istate||6!=e.istate.mode)return C;const a=e.istate;return r<1<<a.wbits||(r=(1<<a.wbits)-1,i=n-r),a.blocks.set_dictionary(t,i,r),a.mode=7,0},e.inflateSync=e=>{let n,i,r,a,s;if(!e||!e.istate)return C;const o=e.istate;if(o.mode!=K&&(o.mode=K,o.marker=0),0===(n=e.avail_in))return U;for(i=e.next_in_index,r=o.marker;0!==n&&4>r;)e.read_byte(i)==Z[r]?r++:r=0!==e.read_byte(i)?0:4-r,i++,n--;return e.total_in+=i-e.next_in_index,e.next_in_index=i,e.avail_in=n,o.marker=r,4!=r?F:(a=e.total_in,s=e.total_out,t(e),e.total_in=a,e.total_out=s,o.mode=7,0)},e.inflateSyncPoint=e=>e&&e.istate&&e.istate.blocks?e.istate.blocks.sync_point():C}function j(){}j.prototype={inflateInit(e){const t=this;return t.istate=new G,e||(e=15),t.istate.inflateInit(t,e)},inflate(e){const t=this;return t.istate?t.istate.inflate(t,e):C},inflateEnd(){const e=this;if(!e.istate)return C;const t=e.istate.inflateEnd(e);return e.istate=null,t},inflateSync(){const e=this;return e.istate?e.istate.inflateSync(e):C},inflateSetDictionary(e,t){const n=this;return n.istate?n.istate.inflateSetDictionary(n,e,t):C},read_byte(e){return this.next_in[e]},read_buf(e,t){return this.next_in.subarray(e,e+t)}};const X=4294967295,Y=65535,J=33639248,Q=101075792,$=void 0,ee="undefined",te="function";class ne{constructor(e){return class extends S{constructor(t,n){const i=new e(n);super({transform(e,t){t.enqueue(i.append(e))},flush(e){const t=i.flush();t&&e.enqueue(t)}})}}}}let ie=2;try{typeof T!=ee&&T.hardwareConcurrency&&(ie=T.hardwareConcurrency)}catch(e){}const re={chunkSize:524288,maxWorkers:ie,terminateWorkerTimeout:5e3,useWebWorkers:!0,useCompressionStream:!0,workerScripts:$,CompressionStreamNative:typeof D!=ee&&D,DecompressionStreamNative:typeof E!=ee&&E},ae=n.assign({},re);function se(){return ae}function oe(e){const{baseURL:n,chunkSize:i,maxWorkers:r,terminateWorkerTimeout:a,useCompressionStream:s,useWebWorkers:o,Deflate:l,Inflate:c,CompressionStream:d,DecompressionStream:u,workerScripts:_}=e;if(le("baseURL",n),le("chunkSize",i),le("maxWorkers",r),le("terminateWorkerTimeout",a),le("useCompressionStream",s),le("useWebWorkers",o),l&&(ae.CompressionStream=new ne(l)),c&&(ae.DecompressionStream=new ne(c)),le("CompressionStream",d),le("DecompressionStream",u),_!==$){const{deflate:e,inflate:n}=_;if((e||n)&&(ae.workerScripts||(ae.workerScripts={})),e){if(!t.isArray(e))throw new f("workerScripts.deflate must be an array");ae.workerScripts.deflate=e}if(n){if(!t.isArray(n))throw new f("workerScripts.inflate must be an array");ae.workerScripts.inflate=n}}}function le(e,t){t!==$&&(ae[e]=t)}const ce=[];for(let e=0;256>e;e++){let t=e;for(let e=0;8>e;e++)1&t?t=t>>>1^3988292384:t>>>=1;ce[e]=t}class de{constructor(e){this.crc=e||-1}append(e){let t=0|this.crc;for(let n=0,i=0|e.length;i>n;n++)t=t>>>8^ce[255&(t^e[n])];this.crc=t}get(){return~this.crc}}class ue extends S{constructor(){const e=new de;super({transform(t){e.append(t)},flush(t){const n=new _(4);new p(n.buffer).setUint32(0,e.get()),t.enqueue(n)}})}}const fe={concat(e,t){if(0===e.length||0===t.length)return e.concat(t);const n=e[e.length-1],i=fe.getPartial(n);return 32===i?e.concat(t):fe._shiftRight(t,i,0|n,e.slice(0,e.length-1))},bitLength(e){const t=e.length;if(0===t)return 0;const n=e[t-1];return 32*(t-1)+fe.getPartial(n)},clamp(e,t){if(32*e.length<t)return e;const n=(e=e.slice(0,s.ceil(t/32))).length;return t&=31,n>0&&t&&(e[n-1]=fe.partial(t,e[n-1]&2147483648>>t-1,1)),e},partial:(e,t,n)=>32===e?t:(n?0|t:t<<32-e)+1099511627776*e,getPartial:e=>s.round(e/1099511627776)||32,_shiftRight(e,t,n,i){for(void 0===i&&(i=[]);t>=32;t-=32)i.push(n),n=0;if(0===t)return i.concat(e);for(let r=0;r<e.length;r++)i.push(n|e[r]>>>t),n=e[r]<<32-t;const r=e.length?e[e.length-1]:0,a=fe.getPartial(r);return i.push(fe.partial(t+a&31,t+a>32?n:i.pop(),1)),i}},_e={bytes:{fromBits(e){const t=fe.bitLength(e)/8,n=new _(t);let i;for(let r=0;t>r;r++)0==(3&r)&&(i=e[r/4]),n[r]=i>>>24,i<<=8;return n},toBits(e){const t=[];let n,i=0;for(n=0;n<e.length;n++)i=i<<8|e[n],3==(3&n)&&(t.push(i),i=0);return 3&n&&t.push(fe.partial(8*(3&n),i)),t}}},he={getRandomValues(e){const t=new w(e.buffer),n=e=>{let t=987654321;const n=4294967295;return()=>(t=36969*(65535&t)+(t>>16)&n,(((t<<16)+(e=18e3*(65535&e)+(e>>16)&n)&n)/4294967296+.5)*(s.random()>.5?1:-1))};for(let i,r=0;r<e.length;r+=4){const e=n(4294967296*(i||s.random()));i=987654071*e(),t[r/4]=4294967296*e()|0}return e}},we={importKey:e=>new we.hmacSha1(_e.bytes.toBits(e)),pbkdf2(e,t,n,i){if(n=n||1e4,0>i||0>n)throw new f("invalid params to pbkdf2");const r=1+(i>>5)<<2;let a,s,o,l,c;const d=new ArrayBuffer(r),u=new p(d);let _=0;const h=fe;for(t=_e.bytes.toBits(t),c=1;(r||1)>_;c++){for(a=s=e.encrypt(h.concat(t,[c])),o=1;n>o;o++)for(s=e.encrypt(s),l=0;l<s.length;l++)a[l]^=s[l];for(o=0;(r||1)>_&&o<a.length;o++)u.setInt32(_,a[o]),_+=4}return d.slice(0,i/8)},hmacSha1:class{constructor(e){const n=this,i=n._hash=class{constructor(e){const t=this;t.blockSize=512,t._init=[1732584193,4023233417,2562383102,271733878,3285377520],t._key=[1518500249,1859775393,2400959708,3395469782],e?(t._h=e._h.slice(0),t._buffer=e._buffer.slice(0),t._length=e._length):t.reset()}reset(){const e=this;return e._h=e._init.slice(0),e._buffer=[],e._length=0,e}update(e){const t=this;"string"==typeof e&&(e=_e.utf8String.toBits(e));const n=t._buffer=fe.concat(t._buffer,e),i=t._length,r=t._length=i+fe.bitLength(e);if(r>9007199254740991)throw new f("Cannot hash more than 2^53 - 1 bits");const a=new w(n);let s=0;for(let e=t.blockSize+i-(t.blockSize+i&t.blockSize-1);r>=e;e+=t.blockSize)t._block(a.subarray(16*s,16*(s+1))),s+=1;return n.splice(0,16*s),t}finalize(){const e=this;let t=e._buffer;const n=e._h;t=fe.concat(t,[fe.partial(1,1)]);for(let e=t.length+2;15&e;e++)t.push(0);for(t.push(s.floor(e._length/4294967296)),t.push(0|e._length);t.length;)e._block(t.splice(0,16));return e.reset(),n}_f(e,t,n,i){return e>19?e>39?e>59?e>79?void 0:t^n^i:t&n|t&i|n&i:t^n^i:t&n|~t&i}_S(e,t){return t<<e|t>>>32-e}_block(e){const n=this,i=n._h,r=t(80);for(let t=0;16>t;t++)r[t]=e[t];let a=i[0],o=i[1],l=i[2],c=i[3],d=i[4];for(let e=0;79>=e;e++){16>e||(r[e]=n._S(1,r[e-3]^r[e-8]^r[e-14]^r[e-16]));const t=n._S(5,a)+n._f(e,o,l,c)+d+r[e]+n._key[s.floor(e/20)]|0;d=c,c=l,l=n._S(30,o),o=a,a=t}i[0]=i[0]+a|0,i[1]=i[1]+o|0,i[2]=i[2]+l|0,i[3]=i[3]+c|0,i[4]=i[4]+d|0}},r=[[],[]];n._baseHash=[new i,new i];const a=n._baseHash[0].blockSize/32;e.length>a&&(e=(new i).update(e).finalize());for(let t=0;a>t;t++)r[0][t]=909522486^e[t],r[1][t]=1549556828^e[t];n._baseHash[0].update(r[0]),n._baseHash[1].update(r[1]),n._resultHash=new i(n._baseHash[0])}reset(){const e=this;e._resultHash=new e._hash(e._baseHash[0]),e._updated=!1}update(e){this._updated=!0,this._resultHash.update(e)}digest(){const e=this,t=e._resultHash.finalize(),n=new e._hash(e._baseHash[1]).update(t).finalize();return e.reset(),n}encrypt(e){if(this._updated)throw new f("encrypt on already updated hmac called!");return this.update(e),this.digest(e)}}},pe=void 0!==k&&"function"==typeof k.getRandomValues,be="Invalid password",ge="Invalid signature";function me(e){return pe?k.getRandomValues(e):he.getRandomValues(e)}const ye=16,xe={name:"PBKDF2"},ke=n.assign({hash:{name:"HMAC"}},xe),ve=n.assign({iterations:1e3,hash:{name:"SHA-1"}},xe),Se=["deriveBits"],Re=[8,12,16],ze=[16,24,32],De=10,Ee=[0,0,0,0],Te="undefined",Ae="function",Ce=typeof k!=Te,Fe=Ce&&k.subtle,Ue=Ce&&typeof Fe!=Te,We=_e.bytes,Le=class{constructor(e){const t=this;t._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],t._tables[0][0][0]||t._precompute();const n=t._tables[0][4],i=t._tables[1],r=e.length;let a,s,o,l=1;if(4!==r&&6!==r&&8!==r)throw new f("invalid aes key size");for(t._key=[s=e.slice(0),o=[]],a=r;4*r+28>a;a++){let e=s[a-1];(a%r==0||8===r&&a%r==4)&&(e=n[e>>>24]<<24^n[e>>16&255]<<16^n[e>>8&255]<<8^n[255&e],a%r==0&&(e=e<<8^e>>>24^l<<24,l=l<<1^283*(l>>7))),s[a]=s[a-r]^e}for(let e=0;a;e++,a--){const t=s[3&e?a:a-4];o[e]=4>=a||4>e?t:i[0][n[t>>>24]]^i[1][n[t>>16&255]]^i[2][n[t>>8&255]]^i[3][n[255&t]]}}encrypt(e){return this._crypt(e,0)}decrypt(e){return this._crypt(e,1)}_precompute(){const e=this._tables[0],t=this._tables[1],n=e[4],i=t[4],r=[],a=[];let s,o,l,c;for(let e=0;256>e;e++)a[(r[e]=e<<1^283*(e>>7))^e]=e;for(let d=s=0;!n[d];d^=o||1,s=a[s]||1){let a=s^s<<1^s<<2^s<<3^s<<4;a=a>>8^255&a^99,n[d]=a,i[a]=d,c=r[l=r[o=r[d]]];let u=16843009*c^65537*l^257*o^16843008*d,f=257*r[a]^16843008*a;for(let n=0;4>n;n++)e[n][d]=f=f<<24^f>>>8,t[n][a]=u=u<<24^u>>>8}for(let n=0;5>n;n++)e[n]=e[n].slice(0),t[n]=t[n].slice(0)}_crypt(e,t){if(4!==e.length)throw new f("invalid aes block size");const n=this._key[t],i=n.length/4-2,r=[0,0,0,0],a=this._tables[t],s=a[0],o=a[1],l=a[2],c=a[3],d=a[4];let u,_,h,w=e[0]^n[0],p=e[t?3:1]^n[1],b=e[2]^n[2],g=e[t?1:3]^n[3],m=4;for(let e=0;i>e;e++)u=s[w>>>24]^o[p>>16&255]^l[b>>8&255]^c[255&g]^n[m],_=s[p>>>24]^o[b>>16&255]^l[g>>8&255]^c[255&w]^n[m+1],h=s[b>>>24]^o[g>>16&255]^l[w>>8&255]^c[255&p]^n[m+2],g=s[g>>>24]^o[w>>16&255]^l[p>>8&255]^c[255&b]^n[m+3],m+=4,w=u,p=_,b=h;for(let e=0;4>e;e++)r[t?3&-e:e]=d[w>>>24]<<24^d[p>>16&255]<<16^d[b>>8&255]<<8^d[255&g]^n[m++],u=w,w=p,p=b,b=g,g=u;return r}},Oe=class{constructor(e,t){this._prf=e,this._initIv=t,this._iv=t}reset(){this._iv=this._initIv}update(e){return this.calculate(this._prf,e,this._iv)}incWord(e){if(255==(e>>24&255)){let t=e>>16&255,n=e>>8&255,i=255&e;255===t?(t=0,255===n?(n=0,255===i?i=0:++i):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=i}else e+=1<<24;return e}incCounter(e){0===(e[0]=this.incWord(e[0]))&&(e[1]=this.incWord(e[1]))}calculate(e,t,n){let i;if(!(i=t.length))return[];const r=fe.bitLength(t);for(let r=0;i>r;r+=4){this.incCounter(n);const i=e.encrypt(n);t[r]^=i[0],t[r+1]^=i[1],t[r+2]^=i[2],t[r+3]^=i[3]}return fe.clamp(t,r)}},Ne=we.hmacSha1;let Ie=Ce&&Ue&&typeof Fe.importKey==Ae,He=Ce&&Ue&&typeof Fe.deriveBits==Ae;class Pe extends S{constructor({password:e,signed:t,encryptionStrength:i}){super({start(){n.assign(this,{ready:new g((e=>this.resolveReady=e)),password:e,signed:t,strength:i-1,pending:new _})},async transform(e,t){const n=this,{password:i,strength:r,resolveReady:a,ready:s}=n;i?(await(async(e,t,n,i)=>{const r=await qe(e,t,n,Ke(i,0,Re[t])),a=Ke(i,Re[t]);if(r[0]!=a[0]||r[1]!=a[1])throw new f(be)})(n,r,i,Ke(e,0,Re[r]+2)),e=Ke(e,Re[r]+2),a()):await s;const o=new _(e.length-De-(e.length-De)%ye);t.enqueue(Be(n,e,o,0,De,!0))},async flush(e){const{signed:t,ctr:n,hmac:i,pending:r,ready:a}=this;await a;const s=Ke(r,0,r.length-De),o=Ke(r,r.length-De);let l=new _;if(s.length){const e=Ge(We,s);i.update(e);const t=n.update(e);l=Ze(We,t)}if(t){const e=Ke(Ze(We,i.digest()),0,De);for(let t=0;De>t;t++)if(e[t]!=o[t])throw new f(ge)}e.enqueue(l)}})}}class Me extends S{constructor({password:e,encryptionStrength:t}){let i;super({start(){n.assign(this,{ready:new g((e=>this.resolveReady=e)),password:e,strength:t-1,pending:new _})},async transform(e,t){const n=this,{password:i,strength:r,resolveReady:a,ready:s}=n;let o=new _;i?(o=await(async(e,t,n)=>{const i=me(new _(Re[t]));return Ve(i,await qe(e,t,n,i))})(n,r,i),a()):await s;const l=new _(o.length+e.length-e.length%ye);l.set(o,0),t.enqueue(Be(n,e,l,o.length,0))},async flush(e){const{ctr:t,hmac:n,pending:r,ready:a}=this;await a;let s=new _;if(r.length){const e=t.update(Ge(We,r));n.update(e),s=Ze(We,e)}i.signature=Ze(We,n.digest()).slice(0,De),e.enqueue(Ve(s,i.signature))}}),i=this}}function Be(e,t,n,i,r,a){const{ctr:s,hmac:o,pending:l}=e,c=t.length-r;let d;for(l.length&&(t=Ve(l,t),n=((e,t)=>{if(t&&t>e.length){const n=e;(e=new _(t)).set(n,0)}return e})(n,c-c%ye)),d=0;c-ye>=d;d+=ye){const e=Ge(We,Ke(t,d,d+ye));a&&o.update(e);const r=s.update(e);a||o.update(r),n.set(Ze(We,r),d+i)}return e.pending=Ke(t,d),n}async function qe(e,i,r,a){e.password=null;const s=(e=>{if(void 0===m){const t=new _((e=unescape(encodeURIComponent(e))).length);for(let n=0;n<t.length;n++)t[n]=e.charCodeAt(n);return t}return(new m).encode(e)})(r),o=await(async(e,t,n,i,r)=>{if(!Ie)return we.importKey(t);try{return await Fe.importKey("raw",t,n,!1,r)}catch(e){return Ie=!1,we.importKey(t)}})(0,s,ke,0,Se),l=await(async(e,t,n)=>{if(!He)return we.pbkdf2(t,e.salt,ve.iterations,n);try{return await Fe.deriveBits(e,t,n)}catch(i){return He=!1,we.pbkdf2(t,e.salt,ve.iterations,n)}})(n.assign({salt:a},ve),o,8*(2*ze[i]+2)),c=new _(l),d=Ge(We,Ke(c,0,ze[i])),u=Ge(We,Ke(c,ze[i],2*ze[i])),f=Ke(c,2*ze[i]);return n.assign(e,{keys:{key:d,authentication:u,passwordVerification:f},ctr:new Oe(new Le(d),t.from(Ee)),hmac:new Ne(u)}),f}function Ve(e,t){let n=e;return e.length+t.length&&(n=new _(e.length+t.length),n.set(e,0),n.set(t,e.length)),n}function Ke(e,t,n){return e.subarray(t,n)}function Ze(e,t){return e.fromBits(t)}function Ge(e,t){return e.toBits(t)}class je extends S{constructor({password:e,passwordVerification:t}){super({start(){n.assign(this,{password:e,passwordVerification:t}),Qe(this,e)},transform(e,t){const n=this;if(n.password){const t=Ye(n,e.subarray(0,12));if(n.password=null,t[11]!=n.passwordVerification)throw new f(be);e=e.subarray(12)}t.enqueue(Ye(n,e))}})}}class Xe extends S{constructor({password:e,passwordVerification:t}){super({start(){n.assign(this,{password:e,passwordVerification:t}),Qe(this,e)},transform(e,t){const n=this;let i,r;if(n.password){n.password=null;const t=me(new _(12));t[11]=n.passwordVerification,i=new _(e.length+t.length),i.set(Je(n,t),0),r=12}else i=new _(e.length),r=0;i.set(Je(n,e),r),t.enqueue(i)}})}}function Ye(e,t){const n=new _(t.length);for(let i=0;i<t.length;i++)n[i]=et(e)^t[i],$e(e,n[i]);return n}function Je(e,t){const n=new _(t.length);for(let i=0;i<t.length;i++)n[i]=et(e)^t[i],$e(e,t[i]);return n}function Qe(e,t){const i=[305419896,591751049,878082192];n.assign(e,{keys:i,crcKey0:new de(i[0]),crcKey2:new de(i[2])});for(let n=0;n<t.length;n++)$e(e,t.charCodeAt(n))}function $e(e,t){let[n,i,r]=e.keys;e.crcKey0.append([t]),n=~e.crcKey0.get(),i=nt(s.imul(nt(i+tt(n)),134775813)+1),e.crcKey2.append([i>>>24]),r=~e.crcKey2.get(),e.keys=[n,i,r]}function et(e){const t=2|e.keys[2];return tt(s.imul(t,1^t)>>>8)}function tt(e){return 255&e}function nt(e){return 4294967295&e}const it="deflate-raw";class rt extends S{constructor(e,{chunkSize:t,CompressionStream:n,CompressionStreamNative:i}){super({});const{compressed:r,encrypted:a,useCompressionStream:s,zipCrypto:o,signed:l,level:c}=e,d=this;let u,f,_=st(super.readable);a&&!o||!l||([_,u]=_.tee(),u=ct(u,new ue)),r&&(_=lt(_,s,{level:c,chunkSize:t},i,n)),a&&(o?_=ct(_,new Xe(e)):(f=new Me(e),_=ct(_,f))),ot(d,_,(async()=>{let e;a&&!o&&(e=f.signature),a&&!o||!l||(e=await u.getReader().read(),e=new p(e.value.buffer).getUint32(0)),d.signature=e}))}}class at extends S{constructor(e,{chunkSize:t,DecompressionStream:n,DecompressionStreamNative:i}){super({});const{zipCrypto:r,encrypted:a,signed:s,signature:o,compressed:l,useCompressionStream:c}=e;let d,u,_=st(super.readable);a&&(r?_=ct(_,new je(e)):(u=new Pe(e),_=ct(_,u))),l&&(_=lt(_,c,{chunkSize:t},i,n)),a&&!r||!s||([_,d]=_.tee(),d=ct(d,new ue)),ot(this,_,(async()=>{if((!a||r)&&s){const e=await d.getReader().read(),t=new p(e.value.buffer);if(o!=t.getUint32(0,!1))throw new f(ge)}}))}}function st(e){return ct(e,new S({transform(e,t){e&&e.length&&t.enqueue(e)}}))}function ot(e,t,i){t=ct(t,new S({flush:i})),n.defineProperty(e,"readable",{get:()=>t})}function lt(e,t,n,i,r){try{e=ct(e,new(t&&i?i:r)(it,n))}catch(i){if(!t)throw i;e=ct(e,new r(it,n))}return e}function ct(e,t){return e.pipeThrough(t)}const dt="data",ut="inflate";class ft extends S{constructor(e,t){super({});const i=this,{codecType:r}=e;let a;r.startsWith("deflate")?a=rt:r.startsWith(ut)&&(a=at);let s=0;const o=new a(e,t),l=super.readable,c=new S({transform(e,t){e&&e.length&&(s+=e.length,t.enqueue(e))},flush(){const{signature:e}=o;n.assign(i,{signature:e,size:s})}});n.defineProperty(i,"readable",{get:()=>l.pipeThrough(o).pipeThrough(c)})}}const _t=typeof A!=ee;class ht{constructor(e,{readable:t,writable:i},{options:r,config:a,streamOptions:s,useWebWorkers:o,transferStreams:l,scripts:c},d){const{signal:u}=s;return n.assign(e,{busy:!0,readable:t.pipeThrough(new wt(t,s,a),{signal:u}),writable:i,options:n.assign({},r),scripts:c,transferStreams:l,terminate(){const{worker:t,busy:n}=e;t&&!n&&(t.terminate(),e.interface=null)},onTaskFinished(){e.busy=!1,d(e)}}),(o&&_t?gt:bt)(e,a)}}class wt extends S{constructor(e,{onstart:t,onprogress:n,size:i,onend:r},{chunkSize:a}){let s=0;super({start(){t&&pt(t,i)},async transform(e,t){s+=e.length,n&&await pt(n,s,i),t.enqueue(e)},flush(){e.size=s,r&&pt(r,s)}},{highWaterMark:1,size:()=>a})}}async function pt(e,...t){try{await e(...t)}catch(e){}}function bt(e,t){return{run:()=>(async({options:e,readable:t,writable:n,onTaskFinished:i},r)=>{const a=new ft(e,r);try{await t.pipeThrough(a).pipeTo(n,{preventClose:!0,preventAbort:!0});const{signature:e,size:r}=a;return{signature:e,size:r}}finally{i()}})(e,t)}}function gt(e,{baseURL:t,chunkSize:i}){return e.interface||n.assign(e,{worker:xt(e.scripts[0],t,e),interface:{run:()=>(async(e,t)=>{let i,r;const a=new g(((e,t)=>{i=e,r=t}));n.assign(e,{reader:null,writer:null,resolveResult:i,rejectResult:r,result:a});const{readable:s,options:o,scripts:l}=e,{writable:c,closed:d}=(e=>{const t=e.getWriter();let n;const i=new g((e=>n=e));return{writable:new z({async write(e){await t.ready,await t.write(e)},close(){t.releaseLock(),n()},abort:e=>t.abort(e)}),closed:i}})(e.writable);kt({type:"start",scripts:l.slice(1),options:o,config:t,readable:s,writable:c},e)||n.assign(e,{reader:s.getReader(),writer:c.getWriter()});const u=await a;try{await c.close()}catch(e){}return await d,u})(e,{chunkSize:i})}}),e.interface}let mt=!0,yt=!0;function xt(e,t,i){const r={type:"module"};let a,s;typeof e==te&&(e=e());try{a=new u(e,t)}catch(t){a=e}if(mt)try{s=new A(a)}catch(e){mt=!1,s=new A(a,r)}else s=new A(a,r);return s.addEventListener("message",(e=>(async({data:e},t)=>{const{type:i,value:r,messageId:a,result:s,error:o}=e,{reader:l,writer:c,resolveResult:d,rejectResult:u,onTaskFinished:h}=t;try{if(o){const{message:e,stack:t,code:i,name:r}=o,a=new f(e);n.assign(a,{stack:t,code:i,name:r}),w(a)}else{if("pull"==i){const{value:e,done:n}=await l.read();kt({type:dt,value:e,done:n,messageId:a},t)}i==dt&&(await c.ready,await c.write(new _(r)),kt({type:"ack",messageId:a},t)),"close"==i&&w(null,s)}}catch(o){w(o)}function w(e,t){e?u(e):d(t),c&&c.releaseLock(),h()}})(e,i))),s}function kt(e,{worker:t,writer:n,onTaskFinished:i,transferStreams:r}){try{let{value:n,readable:i,writable:a}=e;const s=[];if(n){const{buffer:t,length:i}=n;i!=t.byteLength&&(n=new _(n)),e.value=n.buffer,s.push(e.value)}if(r&&yt?(i&&s.push(i),a&&s.push(a)):e.readable=e.writable=null,s.length)try{return t.postMessage(e,s),!0}catch(n){yt=!1,e.readable=e.writable=null,t.postMessage(e)}else t.postMessage(e)}catch(e){throw n&&n.releaseLock(),i(),e}}let vt=[];const St=[];let Rt=0;function zt(e){const{terminateTimeout:t}=e;t&&(clearTimeout(t),e.terminateTimeout=null)}const Dt="HTTP error ",Et="HTTP Range not supported",Tt="Writer iterator completed too soon",At="GET",Ct=65536,Ft="writable";class Ut{constructor(){this.size=0}init(){this.initialized=!0}}class Wt extends Ut{get readable(){const e=this,{chunkSize:t=Ct}=e,n=new R({start(){this.chunkOffset=0},async pull(i){const{offset:r=0,size:a,diskNumberStart:o}=n,{chunkOffset:l}=this;i.enqueue(await rn(e,r+l,s.min(t,a-l),o)),l+t>a?i.close():this.chunkOffset+=t}});return n}}class Lt extends Ut{constructor(){super();const e=this,t=new z({write:t=>e.writeUint8Array(t)});n.defineProperty(e,Ft,{get:()=>t})}writeUint8Array(){}}class Ot extends Wt{constructor(e){super(),n.assign(this,{blob:e,size:e.size})}async readUint8Array(e,t){const n=this,i=e+t,r=e||i<n.size?n.blob.slice(e,i):n.blob;return new _(await r.arrayBuffer())}}class Nt extends Ut{constructor(e){super();const t=new S,i=[];e&&i.push(["Content-Type",e]),n.defineProperty(this,Ft,{get:()=>t.writable}),this.blob=new d(t.readable,{headers:i}).blob()}getData(){return this.blob}}class It extends Wt{constructor(e,t){super(),Pt(this,e,t)}async init(){super.init(),await Mt(this,Xt,Kt)}readUint8Array(e,t){return Bt(this,e,t,Xt,Kt)}}class Ht extends Wt{constructor(e,t){super(),Pt(this,e,t)}async init(){super.init(),await Mt(this,Yt,Zt)}readUint8Array(e,t){return Bt(this,e,t,Yt,Zt)}}function Pt(e,t,i){const{preventHeadRequest:r,useRangeHeader:a,forceRangeRequests:s}=i;delete(i=n.assign({},i)).preventHeadRequest,delete i.useRangeHeader,delete i.forceRangeRequests,delete i.useXHR,n.assign(e,{url:t,options:i,preventHeadRequest:r,useRangeHeader:a,forceRangeRequests:s})}async function Mt(e,t,n){const{url:i,useRangeHeader:a,forceRangeRequests:s}=e;if((e=>{const{baseURL:t}=se(),{protocol:n}=new u(e,t);return"http:"==n||"https:"==n})(i)&&(a||s)){const{headers:i}=await t(At,e,qt(e));if(!s&&"bytes"!=i.get("Accept-Ranges"))throw new f(Et);{let a;const s=i.get("Content-Range");if(s){const e=s.trim().split(/\s*\/\s*/);if(e.length){const t=e[1];t&&"*"!=t&&(a=r(t))}}a===$?await jt(e,t,n):e.size=a}}else await jt(e,t,n)}async function Bt(e,t,n,i,r){const{useRangeHeader:a,forceRangeRequests:s,options:o}=e;if(a||s){const r=await i(At,e,qt(e,t,n));if(206!=r.status)throw new f(Et);return new _(await r.arrayBuffer())}{const{data:i}=e;return i||await r(e,o),new _(e.data.subarray(t,t+n))}}function qt(e,t=0,i=1){return n.assign({},Vt(e),{Range:"bytes="+t+"-"+(t+i-1)})}function Vt({options:e}){const{headers:t}=e;if(t)return Symbol.iterator in t?n.fromEntries(t):t}async function Kt(e){await Gt(e,Xt)}async function Zt(e){await Gt(e,Yt)}async function Gt(e,t){const n=await t(At,e,Vt(e));e.data=new _(await n.arrayBuffer()),e.size||(e.size=e.data.length)}async function jt(e,t,n){if(e.preventHeadRequest)await n(e,e.options);else{const i=(await t("HEAD",e,Vt(e))).headers.get("Content-Length");i?e.size=r(i):await n(e,e.options)}}async function Xt(e,{options:t,url:i},r){const a=await fetch(i,n.assign({},t,{method:e,headers:r}));if(400>a.status)return a;throw 416==a.status?new f(Et):new f(Dt+(a.statusText||a.status))}function Yt(e,{url:t},i){return new g(((r,a)=>{const s=new XMLHttpRequest;if(s.addEventListener("load",(()=>{if(400>s.status){const e=[];s.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach((t=>{const n=t.trim().split(/\s*:\s*/);n[0]=n[0].trim().replace(/^[a-z]|-[a-z]/g,(e=>e.toUpperCase())),e.push(n)})),r({status:s.status,arrayBuffer:()=>s.response,headers:new l(e)})}else a(416==s.status?new f(Et):new f(Dt+(s.statusText||s.status)))}),!1),s.addEventListener("error",(e=>a(e.detail.error)),!1),s.open(e,t),i)for(const e of n.entries(i))s.setRequestHeader(e[0],e[1]);s.responseType="arraybuffer",s.send()}))}class Jt extends Wt{constructor(e,t={}){super(),n.assign(this,{url:e,reader:t.useXHR?new Ht(e,t):new It(e,t)})}set size(e){}get size(){return this.reader.size}async init(){super.init(),await this.reader.init()}readUint8Array(e,t){return this.reader.readUint8Array(e,t)}}class Qt extends Wt{constructor(e){super(),this.readers=e}async init(){super.init();const e=this,{readers:t}=e;e.lastDiskNumber=0,await g.all(t.map((async t=>{await t.init(),e.size+=t.size})))}async readUint8Array(e,t,n=0){const i=this,{readers:r}=this;let a,o=n;-1==o&&(o=r.length-1);let l=e;for(;l>=r[o].size;)l-=r[o].size,o++;const c=r[o],d=c.size;if(l+t>d){const r=d-l;a=new _(t),a.set(await rn(c,l,r)),a.set(await i.readUint8Array(e+r,t-r,n),r)}else a=await rn(c,l,t);return i.lastDiskNumber=s.max(o,i.lastDiskNumber),a}}class $t extends Ut{constructor(e,t=4294967295){super();const i=this;let r,a,s;n.assign(i,{diskNumber:0,diskOffset:0,size:0,maxSize:t,availableSize:t});const o=new z({async write(t){const{availableSize:n}=i;if(s)t.length<n?await l(t):(await l(t.slice(0,n)),await c(),i.diskOffset+=r.size,i.diskNumber++,s=null,await this.write(t.slice(n)));else{const{value:n,done:o}=await e.next();if(o&&!n)throw new f(Tt);r=n,r.size=0,r.maxSize&&(i.maxSize=r.maxSize),i.availableSize=i.maxSize,await en(r),a=n.writable,s=a.getWriter(),await this.write(t)}},async close(){await s.ready,await c()}});async function l(e){const t=e.length;t&&(await s.ready,await s.write(e),r.size+=t,i.size+=t,i.availableSize-=t)}async function c(){a.size=r.size,await s.close()}n.defineProperty(i,Ft,{get:()=>o})}}async function en(e,t){e.init&&!e.initialized&&await e.init(t)}function tn(e){return t.isArray(e)&&(e=new Qt(e)),e instanceof R&&(e={readable:e}),e}function nn(e){e.writable===$&&typeof e.next==te&&(e=new $t(e)),e instanceof z&&(e={writable:e});const{writable:t}=e;return t.size===$&&(t.size=0),e instanceof $t||n.assign(e,{diskNumber:0,diskOffset:0,availableSize:1/0,maxSize:1/0}),e}function rn(e,t,n,i){return e.readUint8Array(t,n,i)}const an=Qt,sn=$t,on="\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ".split("");function ln(e,t){return t&&"cp437"==t.trim().toLowerCase()?(e=>{{let t="";for(let n=0;n<e.length;n++)t+=on[e[n]];return t}})(e):new y(t).decode(e)}const cn="filename",dn="rawFilename",un="comment",fn="rawComment",_n="uncompressedSize",hn="compressedSize",wn="offset",pn="diskNumberStart",bn="lastModDate",gn="rawLastModDate",mn="lastAccessDate",yn="creationDate",xn=[cn,dn,hn,_n,bn,gn,un,fn,mn,yn,wn,pn,pn,"internalFileAttribute","externalFileAttribute","msDosCompatible","zip64","directory","bitFlag","encrypted","signature","filenameUTF8","commentUTF8","compressionMethod","version","versionMadeBy","extraField","rawExtraField","extraFieldZip64","extraFieldUnicodePath","extraFieldUnicodeComment","extraFieldAES","extraFieldNTFS","extraFieldExtendedTimestamp"];class kn{constructor(e){xn.forEach((t=>this[t]=e[t]))}}const vn="File format is not recognized",Sn="End of central directory not found",Rn="End of Zip64 central directory not found",zn="End of Zip64 central directory locator not found",Dn="Central directory header not found",En="Local file header not found",Tn="Zip64 extra field not found",An="File contains encrypted entry",Cn="Encryption method not supported",Fn="Compression method not supported",Un="Split zip file",Wn="utf-8",Ln="cp437",On=[[_n,X],[hn,X],[wn,X],[pn,Y]],Nn={[Y]:{getValue:Gn,bytes:4},[X]:{getValue:jn,bytes:8}};class In{constructor(e,t,i){n.assign(this,{reader:e,config:t,options:i})}async getData(e,t,i={}){const a=this,{reader:s,offset:o,diskNumberStart:l,extraFieldAES:c,compressionMethod:d,config:u,bitFlag:h,signature:w,rawLastModDate:p,uncompressedSize:b,compressedSize:m}=a,y=a.localDirectory={},x=Xn(await rn(s,o,30,l));let k=Bn(a,i,"password");if(k=k&&k.length&&k,c&&99!=c.originalCompressionMethod)throw new f(Fn);if(0!=d&&8!=d)throw new f(Fn);if(67324752!=Gn(x,0))throw new f(En);Hn(y,x,4),y.rawExtraField=y.extraFieldLength?await rn(s,o+30+y.filenameLength,y.extraFieldLength,l):new _,await Pn(a,y,x,4),n.assign(t,{lastAccessDate:y.lastAccessDate,creationDate:y.creationDate});const v=a.encrypted&&y.encrypted,S=v&&!c;if(v){if(!S&&c.strength===$)throw new f(Cn);if(!k)throw new f(An)}const R=o+30+y.filenameLength+y.extraFieldLength,z=s.readable;z.diskNumberStart=l,z.offset=R;const D=z.size=m,E=Bn(a,i,"signal");e=nn(e),await en(e,b);const{writable:T}=e,{onstart:A,onprogress:C,onend:F}=i,U={options:{codecType:ut,password:k,zipCrypto:S,encryptionStrength:c&&c.strength,signed:Bn(a,i,"checkSignature"),passwordVerification:S&&(h.dataDescriptor?p>>>8&255:w>>>24&255),signature:w,compressed:0!=d,encrypted:v,useWebWorkers:Bn(a,i,"useWebWorkers"),useCompressionStream:Bn(a,i,"useCompressionStream"),transferStreams:Bn(a,i,"transferStreams")},config:u,streamOptions:{signal:E,size:D,onstart:A,onprogress:C,onend:F}};return T.size+=(await(async(e,t)=>{const{options:n,config:i}=t,{transferStreams:a,useWebWorkers:s,useCompressionStream:o,codecType:l,compressed:c,signed:d,encrypted:u}=n,{workerScripts:f,maxWorkers:_,terminateWorkerTimeout:h}=i;t.transferStreams=a||a===$;const w=!(c||d||u||t.transferStreams);let p;t.useWebWorkers=!w&&(s||s===$&&i.useWebWorkers),t.scripts=t.useWebWorkers&&f?f[l]:[],n.useCompressionStream=o||o===$&&i.useCompressionStream;const b=vt.find((e=>!e.busy));if(b)zt(b),p=new ht(b,e,t,m);else if(vt.length<_){const n={indexWorker:Rt};Rt++,vt.push(n),p=new ht(n,e,t,m)}else p=await new g((n=>St.push({resolve:n,stream:e,workerOptions:t})));return p.run();function m(e){if(St.length){const[{resolve:t,stream:n,workerOptions:i}]=St.splice(0,1);t(new ht(e,n,i,m))}else e.worker?(zt(e),r.isFinite(h)&&h>=0&&(e.terminateTimeout=setTimeout((()=>{vt=vt.filter((t=>t!=e)),e.terminate()}),h))):vt=vt.filter((t=>t!=e))}})({readable:z,writable:T},U)).size,Bn(a,i,"preventClose")||await T.close(),e.getData?e.getData():T}}function Hn(e,t,i){const r=e.rawBitFlag=Zn(t,i+2),a=1==(1&r),s=Gn(t,i+6);n.assign(e,{encrypted:a,version:Zn(t,i),bitFlag:{level:(6&r)>>1,dataDescriptor:8==(8&r),languageEncodingFlag:2048==(2048&r)},rawLastModDate:s,lastModDate:qn(s),filenameLength:Zn(t,i+22),extraFieldLength:Zn(t,i+24)})}async function Pn(e,t,i,r){const{rawExtraField:a}=t,s=t.extraField=new l,c=Xn(new _(a));let d=0;try{for(;d<a.length;){const e=Zn(c,d),t=Zn(c,d+2);s.set(e,{type:e,data:a.slice(d+4,d+4+t)}),d+=4+t}}catch(e){}const u=Zn(i,r+4);n.assign(t,{signature:Gn(i,r+10),uncompressedSize:Gn(i,r+18),compressedSize:Gn(i,r+14)});const h=s.get(1);h&&(((e,t)=>{t.zip64=!0;const n=Xn(e.data),i=On.filter((([e,n])=>t[e]==n));for(let r=0,a=0;r<i.length;r++){const[s,o]=i[r];if(t[s]==o){const i=Nn[o];t[s]=e[s]=i.getValue(n,a),a+=i.bytes}else if(e[s])throw new f(Tn)}})(h,t),t.extraFieldZip64=h);const w=s.get(28789);w&&(await Mn(w,cn,dn,t,e),t.extraFieldUnicodePath=w);const p=s.get(25461);p&&(await Mn(p,un,fn,t,e),t.extraFieldUnicodeComment=p);const b=s.get(39169);b?(((e,t,i)=>{const r=Xn(e.data),a=Kn(r,4);n.assign(e,{vendorVersion:Kn(r,0),vendorId:Kn(r,2),strength:a,originalCompressionMethod:i,compressionMethod:Zn(r,5)}),t.compressionMethod=e.compressionMethod})(b,t,u),t.extraFieldAES=b):t.compressionMethod=u;const g=s.get(10);g&&(((e,t)=>{const i=Xn(e.data);let r,a=4;try{for(;a<e.data.length&&!r;){const t=Zn(i,a),n=Zn(i,a+2);1==t&&(r=e.data.slice(a+4,a+4+n)),a+=4+n}}catch(e){}try{if(r&&24==r.length){const i=Xn(r),a=i.getBigUint64(0,!0),s=i.getBigUint64(8,!0),o=i.getBigUint64(16,!0);n.assign(e,{rawLastModDate:a,rawLastAccessDate:s,rawCreationDate:o});const l={lastModDate:Vn(a),lastAccessDate:Vn(s),creationDate:Vn(o)};n.assign(e,l),n.assign(t,l)}}catch(e){}})(g,t),t.extraFieldNTFS=g);const m=s.get(21589);m&&(((e,t)=>{const n=Xn(e.data),i=Kn(n,0),r=[],a=[];1==(1&i)&&(r.push(bn),a.push(gn)),2==(2&i)&&(r.push(mn),a.push("rawLastAccessDate")),4==(4&i)&&(r.push(yn),a.push("rawCreationDate"));let s=1;r.forEach(((i,r)=>{if(e.data.length>=s+4){const l=Gn(n,s);t[i]=e[i]=new o(1e3*l);const c=a[r];e[c]=l}s+=4}))})(m,t),t.extraFieldExtendedTimestamp=m)}async function Mn(e,t,i,r,a){const s=Xn(e.data),o=new de;o.append(a[i]);const l=Xn(new _(4));l.setUint32(0,o.get(),!0),n.assign(e,{version:Kn(s,0),signature:Gn(s,1),[t]:await ln(e.data.subarray(5)),valid:!a.bitFlag.languageEncodingFlag&&e.signature==Gn(l,0)}),e.valid&&(r[t]=e[t],r[t+"UTF8"]=!0)}function Bn(e,t,n){return t[n]===$?e.options[n]:t[n]}function qn(e){const t=(4294901760&e)>>16,n=65535&e;try{return new o(1980+((65024&t)>>9),((480&t)>>5)-1,31&t,(63488&n)>>11,(2016&n)>>5,2*(31&n),0)}catch(e){}}function Vn(e){return new o(r(e/a(1e4)-a(116444736e5)))}function Kn(e,t){return e.getUint8(t)}function Zn(e,t){return e.getUint16(t,!0)}function Gn(e,t){return e.getUint32(t,!0)}function jn(e,t){return r(e.getBigUint64(t,!0))}function Xn(e){return new p(e.buffer)}oe({Inflate:function(e){const t=new j,n=e&&e.chunkSize?s.floor(2*e.chunkSize):131072,i=new _(n);let r=!1;t.inflateInit(),t.next_out=i,this.append=(e,a)=>{const s=[];let o,l,c=0,d=0,u=0;if(0!==e.length){t.next_in_index=0,t.next_in=e,t.avail_in=e.length;do{if(t.next_out_index=0,t.avail_out=n,0!==t.avail_in||r||(t.next_in_index=0,r=!0),o=t.inflate(0),r&&o===U){if(0!==t.avail_in)throw new f("inflating: bad input")}else if(0!==o&&1!==o)throw new f("inflating: "+t.msg);if((r||1===o)&&t.avail_in===e.length)throw new f("inflating: bad input");t.next_out_index&&(t.next_out_index===n?s.push(new _(i)):s.push(i.slice(0,t.next_out_index))),u+=t.next_out_index,a&&t.next_in_index>0&&t.next_in_index!=c&&(a(t.next_in_index),c=t.next_in_index)}while(t.avail_in>0||0===t.avail_out);return s.length>1?(l=new _(u),s.forEach((e=>{l.set(e,d),d+=e.length}))):l=s[0]||new _,l}},this.flush=()=>{t.inflateEnd()}}}),e.BlobReader=Ot,e.BlobWriter=Nt,e.Data64URIReader=class extends Wt{constructor(e){super();let t=e.length;for(;"="==e.charAt(t-1);)t--;const i=e.indexOf(",")+1;n.assign(this,{dataURI:e,dataStart:i,size:s.floor(.75*(t-i))})}readUint8Array(e,t){const{dataStart:n,dataURI:i}=this,r=new _(t),a=4*s.floor(e/3),o=atob(i.substring(a+n,4*s.ceil((e+t)/3)+n)),l=e-3*s.floor(a/4);for(let e=l;l+t>e;e++)r[e-l]=o.charCodeAt(e);return r}},e.Data64URIWriter=class extends Lt{constructor(e){super(),n.assign(this,{data:"data:"+(e||"")+";base64,",pending:[]})}writeUint8Array(e){const t=this;let n=0,r=t.pending;const a=t.pending.length;for(t.pending="",n=0;n<3*s.floor((a+e.length)/3)-a;n++)r+=i.fromCharCode(e[n]);for(;n<e.length;n++)t.pending+=i.fromCharCode(e[n]);r.length>2?t.data+=v(r):t.pending=r}getData(){return this.data+v(this.pending)}},e.ERR_BAD_FORMAT=vn,e.ERR_CENTRAL_DIRECTORY_NOT_FOUND=Dn,e.ERR_ENCRYPTED=An,e.ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND=zn,e.ERR_EOCDR_NOT_FOUND=Sn,e.ERR_EOCDR_ZIP64_NOT_FOUND=Rn,e.ERR_EXTRAFIELD_ZIP64_NOT_FOUND=Tn,e.ERR_HTTP_RANGE=Et,e.ERR_INVALID_PASSWORD=be,e.ERR_INVALID_SIGNATURE=ge,e.ERR_ITERATOR_COMPLETED_TOO_SOON=Tt,e.ERR_LOCAL_FILE_HEADER_NOT_FOUND=En,e.ERR_SPLIT_ZIP_FILE=Un,e.ERR_UNSUPPORTED_COMPRESSION=Fn,e.ERR_UNSUPPORTED_ENCRYPTION=Cn,e.HttpRangeReader=class extends Jt{constructor(e,t={}){t.useRangeHeader=!0,super(e,t)}},e.HttpReader=Jt,e.Reader=Wt,e.SplitDataReader=Qt,e.SplitDataWriter=$t,e.SplitZipReader=an,e.SplitZipWriter=sn,e.TextReader=class extends Ot{constructor(e){super(new b([e],{type:"text/plain"}))}},e.TextWriter=class extends Nt{constructor(e){super(e),n.assign(this,{encoding:e,utf8:!e||"utf-8"==e.toLowerCase()})}async getData(){const{encoding:e,utf8:t}=this,i=await super.getData();if(i.text&&t)return i.text();{const t=new FileReader;return new g(((r,a)=>{n.assign(t,{onload:({target:e})=>r(e.result),onerror:()=>a(t.error)}),t.readAsText(i,e)}))}}},e.Uint8ArrayReader=class extends Wt{constructor(e){super(),n.assign(this,{array:e,size:e.length})}readUint8Array(e,t){return this.array.slice(e,e+t)}},e.Uint8ArrayWriter=class extends Lt{init(e=0){super.init(),n.assign(this,{offset:0,array:new _(e)})}writeUint8Array(e){const t=this;if(t.offset+e.length>t.array.length){const n=t.array;t.array=new _(n.length+e.length),t.array.set(n)}t.array.set(e,t.offset),t.offset+=e.length}getData(){return this.array}},e.Writer=Lt,e.ZipReader=class{constructor(e,t={}){n.assign(this,{reader:tn(e),options:t,config:se()})}async*getEntriesGenerator(e={}){const t=this;let{reader:i}=t;const{config:r}=t;if(await en(i),i.size!==$&&i.readUint8Array||(i=new Ot(await new d(i.readable).blob()),await en(i)),22>i.size)throw new f(vn);i.chunkSize=(e=>s.max(e.chunkSize,64))(r);const a=await(async(e,t,n)=>{const i=new _(4);return Xn(i).setUint32(0,101010256,!0),await r(22)||await r(s.min(1048582,n));async function r(t){const r=n-t,a=await rn(e,r,t);for(let e=a.length-22;e>=0;e--)if(a[e]==i[0]&&a[e+1]==i[1]&&a[e+2]==i[2]&&a[e+3]==i[3])return{offset:r+e,buffer:a.slice(e,e+22).buffer}}})(i,0,i.size);if(!a)throw 134695760==Gn(Xn(await rn(i,0,4)))?new f(Un):new f(Sn);const o=Xn(a);let l=Gn(o,12),c=Gn(o,16);const u=a.offset,h=Zn(o,20),w=u+22+h;let p=Zn(o,4);const b=i.lastDiskNumber||0;let m=Zn(o,6),y=Zn(o,8),x=0,k=0;if(c==X||l==X||y==Y||m==Y){const e=Xn(await rn(i,a.offset-20,20));if(117853008!=Gn(e,0))throw new f(Rn);c=jn(e,8);let t=await rn(i,c,56,-1),n=Xn(t);const r=a.offset-20-56;if(Gn(n,0)!=Q&&c!=r){const e=c;c=r,x=c-e,t=await rn(i,c,56,-1),n=Xn(t)}if(Gn(n,0)!=Q)throw new f(zn);p==Y&&(p=Gn(n,16)),m==Y&&(m=Gn(n,20)),y==Y&&(y=jn(n,32)),l==X&&(l=jn(n,40)),c-=l}if(b!=p)throw new f(Un);if(0>c||c>=i.size)throw new f(vn);let v=0,S=await rn(i,c,l,m),R=Xn(S);if(l){const e=a.offset-l;if(Gn(R,v)!=J&&c!=e){const t=c;c=e,x=c-t,S=await rn(i,c,l,m),R=Xn(S)}}if(0>c||c>=i.size)throw new f(vn);const z=Bn(t,e,"filenameEncoding"),D=Bn(t,e,"commentEncoding");for(let a=0;y>a;a++){const o=new In(i,r,t.options);if(Gn(R,v)!=J)throw new f(Dn);Hn(o,R,v+6);const l=!!o.bitFlag.languageEncodingFlag,c=v+46,d=c+o.filenameLength,u=d+o.extraFieldLength,_=Zn(R,v+4),h=0==(0&_),w=S.subarray(c,d),p=Zn(R,v+32),b=u+p,m=S.subarray(u,b),E=l,T=l,A=h&&16==(16&Kn(R,v+38)),C=Gn(R,v+42)+x;n.assign(o,{versionMadeBy:_,msDosCompatible:h,compressedSize:0,uncompressedSize:0,commentLength:p,directory:A,offset:C,diskNumberStart:Zn(R,v+34),internalFileAttribute:Zn(R,v+36),externalFileAttribute:Gn(R,v+38),rawFilename:w,filenameUTF8:E,commentUTF8:T,rawExtraField:S.subarray(d,u)});const[F,U]=await g.all([ln(w,E?Wn:z||Ln),ln(m,T?Wn:D||Ln)]);n.assign(o,{rawComment:m,filename:F,comment:U,directory:A||F.endsWith("/")}),k=s.max(C,k),await Pn(o,o,R,v+6);const W=new kn(o);W.getData=(e,t)=>o.getData(e,W,t),v=b;const{onprogress:L}=e;if(L)try{await L(a+1,y,new kn(o))}catch(e){}yield W}const E=Bn(t,e,"extractPrependedData"),T=Bn(t,e,"extractAppendedData");return E&&(t.prependedData=k>0?await rn(i,0,k):new _),t.comment=h?await rn(i,u+22,h):new _,T&&(t.appendedData=w<i.size?await rn(i,w,i.size-w):new _),!0}async getEntries(e={}){const t=[];for await(const n of this.getEntriesGenerator(e))t.push(n);return t}async close(){}},e.configure=oe,e.getMimeType=()=>"application/octet-stream",e.initReader=tn,e.initStream=en,e.initWriter=nn,e.readUint8Array=rn,e.terminateWorkers=()=>{vt.forEach((e=>{zt(e),e.terminate()}))},n.defineProperty(e,"__esModule",{value:!0})}));


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

  function $find(name) {
    return document.querySelector('[name=' + (name || '') + ']');
  }

  function toHTML(str) {
    if (!str)
      return '';

    if (typeof(str) !== 'string' && !(str instanceof String))
      throw Error("Can't toHTML not a string");

    if (!str.replace)
      throw Error("String object doesn't have replace method");

    var res = str;
    for (var i = 0; i < __htmlSubstitutes.length; i++)
      res = res.replace(__htmlSubstitutes[i].r, __htmlSubstitutes[i].t);
    return res;
  }

  String.format = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
      var reg = new RegExp("\\{" + i + "\\}", "gm");
      s = s.replace(reg, arguments[i + 1]);
    }

    return s;
  }

  function beautySizeHtml(szBytes) {
    var sz = +szBytes;
    if (isNaN(sz) || sz < 0)
      return szBytes;

    var sfx = ['б', 'Кб', 'Мб', 'Гб', 'Тб'];

    var i = 0;
    sz = Math.round(sz);
    for (; i < sfx.length && sz > 3000; i++)
      sz /= 1024;

    var scale = sz < 5 && i > 0 ? 10 : 1;
    return Math.round(sz * scale) / scale + ' ' + sfx[Math.min(i, sfx.length - 1)];
  }

  function decline(num, arr)
  {
    if (num == null || !arr || !(arr instanceof Array) || arr.length < 1)
      return '';

    if (arr.length < 3)
      return arr[0];
    // числа, кончающиеся на 11 - 14, требуют своего управления
    if (num % 100 >= 11 && num % 100 <= 14)
      return arr[2];

    // остальные группируются так:
    switch (num % 10)
    {
      case 1: return arr[0];

      case 2:
      case 3:
      case 4:
        return arr[1];

      default: return arr[2];
    }
    return arr[0];
  }

  function getDocId(href) {
    var res = /id=(\d+)/.exec(href);
    return res ? res[1] : '';
  };

  function getPageId(href) {
    var res = pathRe.exec(href);
    return res ? res[1] : '';
  };

  function onTlibKeyDown(evt) {
    if (evt.key != 'ArrowRight' && evt.code != 'ArrowLeft')
      return;

    var doc = +getDocId(window.location.href)
    if (sett.keyboardNavigationBetweenReports && evt.ctrlKey && evt.altKey && doc > 0) {
      var shift = evt.code == 'ArrowLeft' ? -1: 1
      window.location.search = window.location.search.replace(/id=\d+&.*/, 'id=' + (doc+shift) + '&page=1');
      evt.stopPropagation();
      return;
    }

    if ((evt.altKey || evt.metaKey) && !evt.ctrlKey && !evt.shiftKey)    // alt- (на маке -- Command aka meta)стрелки -- стандартные шорткаты браузеров back-forward
      return;

    if (!document.querySelectorAll)
      return;

    var navs = getNavAnchors();
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

  function onTlibClick(evt) {
    var tgt = +getPageId(evt.target.href);

    if (evt.button != 0 || evt.altKey || evt.ctrlKey || !evt.target.href || tgt == '' || !document.querySelectorAll)
      return;

    var navs = getNavAnchors();
    if (navs.length < 2)
      return;

    navigateTo(+tgt, +getPageId(navs[navs.length - 1].getAttribute('href')));
    evt.preventDefault();
  }

  function onPopState(evt) {
    var navs = getNavAnchors();
    if (navs.length < 2)
      window.reload();
    else
      updateLinks(+getPageId(window.location), +getPageId(navs[navs.length - 1].getAttribute('href')));
  }

  function navigateTo(pageId, last) {
    if (!history.pushState) {
      window.location.search = window.location.search.replace(pathRe, 'page=' + pageId);
      return;
    }

    history.pushState(null, '', window.location.toString().replace(pathRe, 'page=' + pageId));
    updateLinks(pageId, last);
  }

  function updateLinks(pageId, last) {
    var el = $get('Image1');
    el.setAttribute('src', el.getAttribute('src').replace(/\d+\.png/, pageId + '.png'));

    el = $get('HyperLinkGetTiff');
    el.setAttribute('href', el.getAttribute('href').replace(/\d+\.tif/, pageId + '.tif'));

    el = $get('doc');
    el.setAttribute('action', el.getAttribute('action').replace(pathRe, 'page=' + pageId));


    $get('Label2').innerHTML = toHTML('Страница ' + pageId + ' из ' + last);
    $get('Panel1').innerHTML = generateNavString(pageId, last);
  }

  function getNavAnchors() {
    return document.querySelectorAll('.NavigateString a');
  }

  function generateNavString(current, last) {
    var res = [];
    var space = '<span> &nbsp;</span>';

    res.push(current > 1 ? navItem(1, '<'): space)

    for (var i = Math.max(1, current - 5); i <= Math.min(last, current + 5); i++)
      res.push(i != current ? navItem(i) : '<span>' + toHTML('' + current) + '</span>');

    res.push(current < last ? navItem(last, '>') : space);
    return res.join(space);
  }

  function navItem(id, caption) {
    return '<span><a href="doc.aspx' + window.location.search.replace(pathRe, 'page=' + id) + '">' + toHTML((caption || id) + '') + '</a></span>';
  }


  function trySearch(hash) {
    var fields = { 's': 'ctl00'}; //key - control id

    var m;
    var has = false;
    var re = /#?(([^=]+)=([^&]+)&?)+/igm;
    while ( (m=re.exec(hash)) ) {
      if (fields[decodeURIComponent(m[2])]) {
        $find(fields[decodeURIComponent(m[2])]).value = decodeURIComponent(m[3]);
        has = true;
      }
    }

    if (has)
      $find('ctl22').click();
  }

  function toggleDownload(start) {
    var id = 'tLibZipDl';
    var dl = $get(id);
    if (!dl) {
      if (!start)
        return;

      dl = document.createElement('div');
      dl.id = id;

      dl.className = 'shadowedPanel';
      dl.style.top = '20%';
      dl.style.left = '45%';
      dl.style.padding = '2ex';
      dl.style.position = 'fixed';
      document.body.append(dl);
    }
    dl._count = (dl._count || 0) + (start ? 1 : -1);
    dl.textContent = (dl._count <= 1 ? 'Загружается' : 'Загружаются ' + dl._count) + '...';
    dl.style.display = dl._count > 0 ? 'block' : 'none';
  }

  function onZipLinkClick(evt) {
    if (evt.target.nodeName != 'A' || evt.target.getAttribute('href') != '')
      return;

    evt.preventDefault();
    var entry = evt.target.zipEntry;
    var viewable = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'txt'].includes(entry.ext);

    var tag = evt.target;
    toggleDownload(true);
    entry.getData(new zip.BlobWriter(entry.mime), { forceRangeRequests: true })
      .then(function(blob) {
        toggleDownload(false);

        if (!viewable)
          tag.download = tag.textContent;
        var url = URL.createObjectURL(blob);
        tag.href = url;
        tag.click();
        if (!viewable)
          window.setTimeout(function() {URL.revokeObjectURL(url); }, 0);
      })
      .catch(function(e) {console.error(e); toggleDownload(false);});
  }

  var Tlib = function() {
      this.zipEntries = [];

      this._idx = { ext: this._indexable, entries: [], lim: 5, cap: ['с текстом']};
      this._img = { ext: this._images, entries: [], lim: 3, cap: ['изображение', 'изображения', 'изображений']};
      this._geo = { ext: this._geodata, entries: [], lim: 4, cap: ['с геоданными']};
      this._map = { ext: this._maps, entries: [], lim: 3, cap: ['с картами']};
      this._skip = { ext: this._skip, entries: [], lim: 0, cap: ['прочее', 'прочих', 'прочих']};
      this._other = { ext: this._otherExt, entries: [], lim:3, cap: ['прочее', 'прочих', 'прочих']};


      this._known = [this._idx, this._img, this._geo, this._skip];

      this._unknown = 0;
      this._unknExt = {};
      this._total = 0;
  }

  Tlib.prototype = {
    mappable: ['kml', 'kmz', 'gpx', 'plt', 'wpt'], // , 'geojson' хороший, но его плохо поддерживает nakarte
    _indexable: {'htm': 'text/html', 'html': 'text/html', 'mhtml': 'application/x-mimearchive', 'shtml': 'text/html', 'pdf':'application/pdf', 'doc': 'application/msword', 'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'odp': 'application/vnd.oasis.opendocument.presentation', 'ppt': 'application/vnd.ms-powerpoint', 'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'odt': 'application/vnd.oasis.opendocument.text', 'rtf': 'application/rtf', 'txt': 'text/plain', 'xps': 'application/vnd.ms-xpsdocument', 'djvu': 'image/vnd'},
    _images: {'bmp': 'image/bmp', 'gif': 'image/gif', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'png': 'image/png', 'tif': 'image/tiff', 'tiff': 'image/tiff', 'webp': 'image/webp',
              //video
              'avi': 'video/x-msvideo', 'mp4': 'video/mp4', 'swf': 'application/x-shockwave-flash'
             },
    _geodata: {'kml': 'application/vnd.google-earth.kml+xml', 'kmz': 'application/vnd.google-earth.kmz', 'gpx': 'application/gpx+xml', 'plt': 'application/x-plt', 'wpt': 'text/wpt', 'gdb': 'application/octet-stream', 'geojson': 'application/geo+json'},
    _maps: {'jnx': 'application/jnx', 'img': 'application/octet-stream', 'mp': 'application/octet-stream', 'ocd': 'application/octet-stream'},

    // знаем, даем скачать
    _otherExt: {'bz': 'application/x-bzip', 'bz2': 'application/x-bzip2', 'zip': 'application/zip', '7z': 'application/x-7z-compressed', 'rar': 'application/vnd.rar', 'gz': 'application/gzip', 'tar': 'application/x-tar', 'csv': 'text/csv', 'ods': 'application/vnd.oasis.opendocument.spreadsheet', 'xls': 'application/vnd.ms-excel', 'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},

    // знаем, скачать не даем
    _skip: {'btr': '', 'cnf': '', 'cnt': '', 'db': '', 'ini': '', 'js': '', 'jsp': '', 'php': '', 'css': '', 'ico': '', 'ec4': '', 'woff':'', 'woff2': '',
            'pl': '', 'bat': '', 'cmd': '', 'exe': '', 'com': '', 'pif': '', 'sh': '', 'lck': '', 'lnk': '', 'tmp': '', 'mps': '',
            // умеренно полезные, либо знающих, что с ними делать -- единицы
            'ozf4': '', 'gmw': '', 'jgw': '', 'prj': '', 'map': '', 'xml': ''
           },

    add: function(entry, idx) {
      sett.logAllEntries && console.log(idx+1, entry.filename.replace(/.*\//,''));
      var pt = (entry.filename + '').lastIndexOf('.');
      if (pt < 0)
        return this;

      var ext = entry.filename.substring(pt+1).toLowerCase();

      var imgType = this._known.find(function(cl) { return cl.ext[ext] != null; });
      this._add(imgType || this._other, entry, ext);

      return this;
    },

    _add: function(imgClass, entry, ext) {
      this.zipEntries.push(entry);
      this._total++;

      entry.mime = imgClass.ext[ext];
      entry.ext = ext;
      imgClass.entries.push(entry);
      if (entry.mime == null)
        this._unknExt[ext] = true;
    },

    _toRec: function(res, imgType, lim) {
        var cn = imgType.entries.length;
        if (cn <= 0)
          return res;

        lim = Math.min(cn, lim || 4);
        if (cn < lim + 3)  // боремся с "и ещё 2"
          lim = cn;

        for (var i = 0; i < lim; i++)
          res.items.push({cap: '', more: 0, entry: imgType.entries[i]});

        if (cn > lim)
          res.more.push({cap: imgType.cap, more: cn - lim, entry: null});
        return res;
    },

    summary: function() {
        var res = {items: [], more:[]};

        [this._idx, this._geo, this._map, this._img]
            .forEach(function(e) { this._toRec(res, e) }, this);

        this._toRec(res, this._other, 1);

        if (Object.keys(this._unknExt).length > 0)
          console.error('unknown extensions', Object.keys(this._unknExt));

        return res;
    },

    getMappable: function() {
        return this._geo.entries.filter(function (e) { return this.mappable.includes(e.ext); }, this);
    }
  }


  function listZip(href) {
    if (!href)
      return Promise.reject('listZip: no href');

    zip.configure({ useWebWorkers: false });
    var opt = { forceRangeRequests: true };

    // https://gildas-lormeau.github.io/zip.js/core-api.html#zip-writer
    const reader = new zip.ZipReader(new zip.HttpReader(href, opt), opt);
    return reader.getEntries()
      .then((entries) => {
        reader.close();
        return entries;
      })
      .catch(e => {
        reader.close();
        console.error(e);
      });
  }

  function insertHolder(tgt) {
    if (!tgt)
      return null;

    var styleId = 'tlibCustomStyle';
    var style = $get(styleId);
    if (style == null)
    {
        style = document.createElement('link');
        style.id = styleId;
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/js/tlibnav.css?v=5.3');
        document.body.append(style);
    }

    var td = tgt.parentElement;
    var elem = td.querySelector('.shadowedPanel');
    if (elem)
      return elem;

    var wrapper = document.createElement('div');
    wrapper.className = td.className + ' visToggle';
    td.append(wrapper);

    elem = document.createElement('span');
    elem.className = 'visActivator MainButton';
    elem.innerHTML = '?';
    wrapper.append(tgt, ' ', elem);

    elem = document.createElement('div');
    elem.className = 'visHidden shadowedPanel';

    wrapper.append(elem);

    return elem;
  }

  function showMap(href, reset) {
    href = href || '';
    var id = 'localMap';
    var map;
    var holder = $get(id);
    reset = holder == null || reset && holder && holder.querySelector('iframe').src != href;
    if (!holder) {
      Array.from(document.querySelectorAll('form > table, table.MainHeader, body > div')).forEach(function(sel) { (sel).style.marginLeft = 'max(0px, calc(50% - 390px))';} );

      var style = document.createElement('style');
      style.innerHTML = '#localMap {width: 0; position: fixed; top: 0; height: 100%; right: -4px; transition: width 0.7s; padding 0;} #localMap iframe {width: 100%; height: 100%;} form > table, body> div, body > .MainHeader { transition: margin-left 0.7s; } ' +
          'button.showMap, .showMap button {min-height: 3.4ex; vertical-align: bottom;} .showMap + .showMap { margin-left: 1ex; } button.showMap.inner, .showMap.show .show,  .showMap .hide {display: none;} .showMap.show .hide { display: inline; }'  +

          '@media (min-width: 890px) { .has-map #localMap { width: calc(90% - 780px + 78px - 4em); } ' +
          '.has-map form > table, .has-map > div, .has-map .MainHeader { margin-left: calc(10% - 78px) !important; } ' +
          'button .invis {display: none;} button.showMap.inner {display: unset;} }';

      document.body.append(style);

      holder = document.createElement('div');
      holder.id = id;
      document.body.append(holder);
    }
    if (reset) {
      map = holder.querySelector('iframe');
      map && map.remove();

      holder.innerHTML = '<iframe></iframe>';
    }

    map = holder.querySelector('iframe');
    document.body.classList.toggle('has-map', href != '');
    if (href != '' && map.src != href)
      map.src = href;
  }

  function addMapsButton(tgt, docId, urls, reset, autoShow) {
    urls = urls || [];
    if (urls.length == 0)
      return;

    var hrefMin = tracksHref(docId, urls, true);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'showMap inner' + (autoShow ? ' show' : '');
    btn.innerHTML = '<span class="show">треки</span><span class="hide">скрыть</span>';
    btn.addEventListener('click', function(e) {
        var show = !btn.classList.contains('show') || !document.body.classList.contains('has-map');
        document.body.classList.toggle('has-map', show);
        Array.from(document.querySelectorAll('button.showMap.show')).forEach(function(e) { e.classList.remove('show'); });
        btn.classList.toggle('show', show);

        if (show)
          showMap(hrefMin, reset);
    });

    var elem = document.createElement('a');
    elem.target='_blank';
    elem.className = 'showMap';
    elem.title = 'показать треки на nakarte.me';
    elem.innerHTML = '<button type="button"><span class="invis">треки </span>&#8599;</button>';
    elem.href = tracksHref(docId, urls, false);

    tgt.append(document.createElement('br'), btn, elem);
  }

  function tracksHref(docId, urls, minimize) {
    if (urls.length == 0)
      return '';

    var parts = [];
    if (minimize)
      parts.push('min=1/1/1/1');

    var str = JSON.stringify(urls.map(function(u) {return { n: u.decFname.replace(/\.[^\.]*$/, ''), u: dlHref(docId, u)}}));
    var enc = bytesToBase64(new TextEncoder().encode(str))
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    if (!sett.tracksInArchive)
      parts.push('nktj=' + enc);
    else
      parts.push('nktu=' + encodeURIComponent(String.format('https://westra.ru/passes/tlp.php?i={0}/geo', docId)));

    return 'https://nakarte.me/#' + parts.join('&');
  }

  function bytesToBase64(bytes) {
    const binString = Array.from(bytes, function(byte) {
      return String.fromCodePoint(byte);}
    ).join('');
    return btoa(binString);
  }

  function dlHref(docId, entry) {
    return String.format('https://westra.ru/passes/tlp.php?i={0}/{1}/.{2}', docId, entry.zipIdx, entry.ext); // заэнкодят их позже!
  }

  function isUtf8(byteArray) {
    if (!byteArray)
      return false;

    var stat = byteArray.reduce(function(agg, v) { if (v > 127) agg.large++; if (v == 0xd0 || v == 0xd1) agg.d0d1++; return agg;}, { large: 0, d0d1: 0});
    return stat.large > 0 && stat.d0d1 * 10 > 4 * stat.large; // в русском тексте, закодированном utf-8, почти все буквы содержат старший байт 0xd0 или 0xd1
  }

  function normalizeName(entry, dec866, decUtf8) {
    if (!entry.filenameUTF8)
      return (isUtf8(entry.rawFilename) ? decUtf8 : dec866).decode(entry.rawFilename).replace(/.*\//,'');

    return entry.filename.replace(/.*\//,'');
  }

  function render(summ, rootElem, docPage) {
    if (!summ || !rootElem)
      return;

    var summary = summ.summary();
    if (summary.length <= 0)
      return;

    var dec866 = new TextDecoder('866');
    var decUtf = new TextDecoder('utf8');
    var m = /(\d+)\.zip/i.exec(rootElem.href);
    var docId = m ? m[1] : null;

    var mappable = summ.getMappable().map(function(e) { e.decFname = normalizeName(e, dec866, decUtf); return e; }, this);
    if (docPage && sett.openMapByDefault)
      showMap(tracksHref(docId, mappable, true));

    if (sett.logSummary)
      console.log('summary', summary);
    var tgt = insertHolder(rootElem);
    if (!tgt)
      return;

    if (!docPage || !sett.compatibilityMode) {
      tgt.zipEntries = summ.zipEntries;

      var entries = [];
      var html = summary.items.map(function(it) {
        entries.push(it.entry);
        it.entry.decFname = normalizeName(it.entry, dec866, decUtf);
        return '<tr><td><a href="" class="zLink">' + toHTML(it.entry.decFname) + '</a></td><td align="right">' + beautySizeHtml(it.entry.uncompressedSize) + '</td></tr>';
      });

      var more = '';
      if (summary.more.length > 0) {
        var set = summary.more.map(function(it, idx, arr) { var sep = idx == 0 ? '' : (idx == arr.length -1 ? ' и ' : ', '); return sep + it.more + ' ' + toHTML(decline(it.more, it.cap || [])); });
        more = '<tr><td colspan="2">и ещё ' + set.join('') + '</td></tr>';
      }

      tgt.innerHTML = '<table border="0" cellspacing="3">' + html.join('') + more + '</table>';
      tgt.addEventListener('click', onZipLinkClick, true);
      tgt.dataset['pageId'] = docId;

      var hrefs = tgt.querySelectorAll('a');
      entries.forEach(function(e, idx) { if (hrefs[idx]) hrefs[idx].zipEntry = e; });
    }
    else if (docPage && tgt.parentNode.parentNode.nodeName == 'TD') {
        var el = tgt.querySelector('.visToggle .visActivator');
        el && el.remove(); //: tgt.parentNode.querySelector('.visActivator').remove();
        el = tgt.querySelector('.visToggle .shadowedPanel');
        el && el.remove(); // : tgt.remove();
    }

    addMapsButton(tgt.parentNode.parentNode, docId, mappable, !docPage, docPage && sett.openMapByDefault);
  }

  function getSummary(zipEntries) {
    if (zipEntries == null)
      return;

    var macSys = '__MACOSX/';
    return zipEntries.map(function(e, idx) {e.zipIdx = idx; return e;})
        .filter(function(e) { return !e.directory && !(e.filename.indexOf(macSys) == 0 || e.filename.indexOf('/' + macSys) >= 0); })
        .reduce(function(map, entry, idx) { return map.add(entry, idx)}, new Tlib());
  }

  function tryEnrichZip(anchorElem, docPage) {
    if (!anchorElem)
      return;

    listZip(anchorElem.href)
      .catch(e => {if (e != 'listZip: no href') console.error(e);})
      .then(entries => getSummary(entries))
      .then(summary => render(summary, anchorElem, docPage));
  }

  function autoOpenMap(autoOpen) {
    window.cookieStore.set({
        url: 'https://www.tlib.ru',
        name: "openMapByDefault",
        value: autoOpen ? 1 : 0,
    });
  }

  function initExt() {
    // на странице отчета
    var zipHref = $get('HyperLinkGetZip');
    if (!sett.compatibilityMode)
      tryEnrichZip(zipHref, true);
    showMap('');

    // на главной
    (document.querySelectorAll('#DataGrid1 tbody tr td:last-child a') || [])
      .forEach(e => tryEnrichZip(e, false));

    if ((window.location.pathname || '').length > 1) {
      if (sett.compatibilityMode)
        return;

  	  document.body.addEventListener('keydown', onTlibKeyDown);

      if (history.pushState)
        window.addEventListener('popstate', onPopState, false);

      var e = $get('Panel1');
      if (sett.navClicks && e) {
        e.addEventListener('click', onTlibClick, true);
        e.title = 'Для листания отчетов используйте стрелки влево/вправо';
      }
    }
    else if (sett.searchOnMain && (window.location.hash || '').length > 0)
      trySearch(window.location.hash);
  }

  window.tlibAutoOpenMap = autoOpenMap;

  if (sett.compatibilityMode)
    initExt();
  else
    window.addEventListener("load", (event) => initExt());
})();
