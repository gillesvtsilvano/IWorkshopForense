/*

    Warsaw Agent
    GAS Tecnologia - 2017
*/
/* Version 1.4.3.15 */
'use strict';window.wsawie=function(){return/Trident|EDGE/ig.test(window.navigator.userAgent)&&!window.ActiveXObject};
window.wsawas=function(c,a){function b(b){return function(){!b.readyState||"loaded"!==b.readyState&&"complete"!==b.readyState||(b.onload=null,b.onreadystatechange=null,a())}}function f(b){return function(){b.onload=null;b.onreadystatechange=null;a()}}for(var d=document.getElementsByTagName("SCRIPT"),e=0;e<d.length;++e)if(void 0!==d[e].attributes.src&&null!==d[e].attributes.src){var g=d[e].attributes.src.value.split("/");if(-1!==g[g.length-1].indexOf("warsaw-agent.js")){g=g.slice(0,-1);g.push(c);var g=
g.join("/"),h=document.createElement("script");h.onload=f(h);h.onreadystatechange=b(h);h.setAttribute("type","text/javascript");h.setAttribute("src",g);d[e].parentNode.insertBefore(h,d[e]);return h}}};
window.wsawb64=function(){function c(){}c.prototype.p=function(a){return 26>a?a+65:52>a?a+71:62>a?a-4:62===a?43:63===a?47:65};c.prototype.u=function(a){var b=new Uint8Array(a);wsawgb()==k&&(b=a);a=2;for(var f="",d=b.byteLength,e=0,c=0;c<d;c++)if(a=c%3,0<c&&0===4*c/3%76&&(f+="\r\n"),e|=b[c]<<(16>>>a&24),2===a||1===b.byteLength-c)f+=String.fromCharCode(this.p(e>>>18&63),this.p(e>>>12&63),this.p(e>>>6&63),this.p(e&63)),e=0;return f.substr(0,f.length-2+a)+(2===a?"":1===a?"=":"==")};return c}();
var k=1;window.wsawgb=function(){var c=!!window.opera||0<=navigator.userAgent.indexOf(" OPR/"),a="undefined"!==typeof InstallTrigger,b=!!window.N||-1!=navigator.userAgent.indexOf(" Safari/")||-1!=Object.prototype.toString.call(window.M).indexOf("Constructor"),f=!!document.documentMode||-1<navigator.userAgent.toLowerCase().indexOf("msie");return window.chrome&&!c?2:a?3:f?k:c?4:b?5:0};
window.wsawax=function(){function c(){var a=this;this.onmessage=this.onerror=null;this.B=!0;try{this.s=new ActiveXObject("Warsaw.Object.1"),this.s.addEvent("onerror",function(b){if(null!==a.onerror)a.onerror(b)}),this.s.addEvent("onmessage",function(b){if(null!==a.onmessage)a.onmessage(b)})}catch(b){this.B=!1}}c.prototype.send=function(a){!0===this.B&&this.s.send(a)};return c}();var l=1;
window.wsawobj=function(){function c(a){var b=this;this.url=a;this.q=this.f=!1;this.a=[];this.i=Math.floor(3001*Math.random());this.error=!1;this.H=wsawgb();this.m=this.h=!1;this.J=["Install"];this.method=l;this.H==k&&this.C();this.h||(wsawie()?setTimeout(function(){b.k()},1500):this.k())}c.prototype.j=function(a){this.q=this.f=!0;this.L();if(this.onconnect)this.onconnect(a)};c.prototype.w=function(a){if(this.q){this.f=!1;var b=this;setTimeout(function(){3===b.method?b.C():b.method===l?b.k():2===
b.method&&b.l()},5E3)}else void 0!==a.target&&null!==a.target||this.g(a)};c.prototype.v=function(){if(void 0!==this.e&&null!==this.e){this.e.onmessage=null;this.e=this.e.onerror=null;for(var a=0;a<this.a.length;++a)this.a[a].A=!0}};c.prototype.C=function(){this.v();this.e=new wsawax;var a=this;this.e.onerror=function(b){a.g(b)};this.e.onmessage=function(b){a.o(b)};if(this.f=this.e.B)this.method=3,this.m=this.h=!0,this.j({target:null})};c.prototype.k=function(){this.v();if(void 0===window.WebSocket)this.l();
else{var a=this;try{if(void 0===this.b||3==this.b.readyState)this.b=new WebSocket(a.url)}catch(b){this.l();return}this.b.binaryType="arraybuffer";this.b.onopen=function(b){a.j(b)};this.b.onclose=function(b){a.w(b)};this.b.onmessage=function(b){a.o(b)};this.b.onerror=function(b){a.g(b)}}};c.prototype.l=function(){var a=this;if(void 0!==window.WEB_SOCKET_SWF_LOCATION)this.m=!0,this.b=new FlashWebSocket(a.url),this.b.onopen=function(b){a.j(b)},this.b.onclose=function(b){a.w(b)},this.b.onmessage=function(b){a.o(b)},
this.b.onerror=function(b){a.g(b)};else{this.v();window.WEB_SOCKET_SWF_LOCATION="warsaw-websocket.swf";for(var b=document.getElementsByTagName("SCRIPT"),f=0;f<b.length;++f)if(void 0!==b[f].attributes.src&&null!==b[f].attributes.src){var c=b[f].attributes.src.value.split("/");-1!==c[c.length-1].indexOf("warsaw-agent.js")&&(c=c.slice(0,-1),c.push("warsaw-websocket.swf"),c=c.join("/"),window.WEB_SOCKET_SWF_LOCATION=c)}window.WEB_SOCKET_FORCE_FLASH=!0;this.method=2;wsawas("warsaw-swfobject.js",function(){wsawas("warsaw-web_socket.js",
function(){11>swfobject.getFlashPlayerVersion().major?a.g({target:null}):(a.m=!0,a.b=new FlashWebSocket(a.url),a.b.onopen=function(b){a.j(b)},a.b.onclose=function(b){a.w(b)},a.b.onmessage=function(b){a.o(b)},a.b.onerror=function(b){a.g(b)})})})}};c.prototype.g=function(a){3===this.method&&"string"===typeof a&&-1!==a.indexOf("connect")&&(this.f=this.q=!1);if(this.q){var b=this;setTimeout(function(){3===b.method?b.C():b.method===l?b.k():2===b.method&&b.l()},5E3)}else if(this.h)this.h=this.f=!1,this.k();
else if(void 0!==a.target&&null!==a.target)this.l();else{this.error=!0;for(a=0;a<this.a.length;++a)this.a[a].onerror("Close");this.a=[]}};c.prototype.o=function(a){var b=null;try{var c="",c=this.h?JSON.parse(a):JSON.parse(a.data);for(a=0;a<this.a.length;a++)if(c.ri==this.a[a].F){b=this.a[a];this.D(a);break}if("object"==typeof c.r)b.onsuccess(JSON.stringify(c.r));else b.onsuccess(c.r)}catch(d){if(b&&b.onerror)b.onerror("Syntax error")}};c.prototype.D=function(a){for(var b=[],c=0;c<this.a.length;c++)c!=
a&&b.push(this.a[c]);this.a=b};c.prototype.I=function(a,b){var c=a,d=0;if(b&1)for(b+=1,c=new Uint8Array(b),d=c[b-1]=0;d<b-1;d++)c[d]=a[d]&255;for(var e=0,d=0;d<b;d+=2)e+=c[d]<<8|c[d+1];for(;e>>16;)e=(e&65535)+(e>>16);return~e&65535};c.prototype.L=function(){for(var a=0;a<this.a.length;a++)if(this.a[a].A&&(this.a[a].A=!1,this.f&&!this.error))if(this.m)void 0===this.e||null===this.e?this.b.send("WS!"+(new wsawb64).u(this.a[a].data)):this.e.send("WS!"+(new wsawb64).u(this.a[a].data));else try{this.b.send(this.a[a].data)}catch(b){if("NS_ERROR_CANNOT_CONVERT_DATA"===
b.name)this.b.send("WS!"+(new wsawb64).u(this.a[a].data)),this.m=!0;else throw b;}};c.prototype.K=function(a){for(var b=0;b<this.a.length;b++)if(this.a[b].F==a){this.a[b].onerror("Close");this.D(b);break}};c.prototype.G=function(a){for(var b=0;b<a.length;++b){var c=a.charCodeAt(b);if(256<c)if(c="&#"+c.toString()+";",wsawgb()==k){var d=escape(a.substr(b,1));a=escape(a);a=a.replace(d,c);a=unescape(a)}else a=a.replace(a[b],c)}c=a.length+5;b=new Uint8Array(c);b[0]=65;b[1]=1;b[2]=0;b[3]=0;for(var d=b[4]=
0,e=a.length;d<e;++d)b[d+5]=a.charCodeAt(d);a=this.I(b,c);b[2]=(65280&a)>>8;b[3]=a&255;return b};c.prototype.execute=function(a){if(-1<window.location.hash.indexOf("###")||!a||!a.d)return!1;a.d=JSON.parse(a.d);a.onerror||(a.onerror=function(){});a.onsuccess||(a.onsuccess=function(){});var b=6E4;a.t&&(b=a.t);try{this.i+=1;this.onconnect=a.onconnect;a.d.ri=this.i.toString();a.d.c=a.params;var c=this.G(JSON.stringify(a.d,function(a,b){return"number"!==typeof b||isFinite(b)?b:String(b)}));this.a.push({A:!0,
data:c,F:this.i.toString(),onsuccess:a.onsuccess,onerror:a.onerror});this.error?this.g({target:null}):this.f&&this.j({target:null});if(0<b){var d=JSON.parse(a.d.d).n,e=this.i.toString(),g=this;0>this.J.indexOf(d)&&setTimeout(function(){g.K(e)},b)}}catch(h){return!1}return!0};return c}();wsawgb()==k&&(wsawas("warsaw-json.js",function(){}),wsawas("warsaw-typedarray.js",function(){}));window.wsaw=new wsawobj("wss://127.0.0.1:30900");
window.warsawExec=function(c){if(window.wsaw.error){if(c.onerror)c.onerror("Close");return!1}return window.wsaw.execute(c)};
