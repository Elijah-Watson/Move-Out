!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=30)}([function(t,e,n){(function(e){var n="object",r=function(t){return t&&t.Math==Math&&t};t.exports=r(typeof globalThis==n&&globalThis)||r(typeof window==n&&window)||r(typeof self==n&&self)||r(typeof e==n&&e)||Function("return this")()}).call(this,n(33))},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}n.d(e,"a",function(){return o});var o=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.element=e,this.sticky=this.element.offsetTop}var e,n,o;return e=t,(n=[{key:"onScroll",value:function(){window.pageYOffset>=this.sticky?this.element.classList.add("sticky"):this.element.classList.remove("sticky")}},{key:"init",value:function(){var t=this;window.addEventListener("scroll",function(){return t.onScroll()})}}])&&r(e.prototype,n),o&&r(e,o),t}()},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(7),o=n(12),a=n(9);t.exports=r?function(t,e,n){return o.f(t,e,a(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(1);t.exports=!r(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(0),o=n(13),a=n(37),i=r["__core-js_shared__"]||o("__core-js_shared__",{});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.2.0",mode:a?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var r=n(17),o=n(19);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(3);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(7),o=n(20),a=n(21),i=n(11),u=Object.defineProperty;e.f=r?u:function(t,e,n){if(a(t),e=i(e,!0),a(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(0),o=n(6);t.exports=function(t,e){try{o(r,t,e)}catch(n){r[t]=e}return e}},function(t,e,n){var r=n(25),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(0),o=n(8),a=n(23),i=n(53),u=r.Symbol,c=o("wks");t.exports=function(t){return c[t]||(c[t]=i&&u[t]||(i?u:a)("Symbol."+t))}},function(t,e,n){var r=n(7),o=n(34),a=n(9),i=n(10),u=n(11),c=n(5),s=n(20),l=Object.getOwnPropertyDescriptor;e.f=r?l:function(t,e){if(t=i(t),e=u(e,!0),s)try{return l(t,e)}catch(t){}if(c(t,e))return a(!o.f.call(t,e),t[e])}},function(t,e,n){var r=n(1),o=n(18),a="".split;t.exports=r(function(){return!Object("z").propertyIsEnumerable(0)})?function(t){return"String"==o(t)?a.call(t,""):Object(t)}:Object},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},function(t,e,n){var r=n(7),o=n(1),a=n(35);t.exports=!r&&!o(function(){return 7!=Object.defineProperty(a("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(3);t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},function(t,e,n){var r=n(8);t.exports=r("native-function-to-string",Function.toString)},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+r).toString(36)}},function(t,e){t.exports={}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(18);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(19);t.exports=function(t){return Object(r(t))}},function(t,e,n){var r=n(3),o=n(26),a=n(15)("species");t.exports=function(t,e){var n;return o(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!o(n.prototype)?r(n)&&null===(n=n[a])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},,function(t,e,n){"use strict";n.r(e);n(31),n(55),n(4);var r=n(2);function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}var u=function(){function t(){o(this,t),this.data={maritalStatus:null,finances:[],oneTimeExpenses:[],current:{state:null,zipCode:null,salesTaxPercent:null,job:{weeklyPay:null,monthlyPay:null,yearlyPay:null},incomeTaxValue:null,monthlyExpenses:[]},future:{state:null,zipCode:null,salesTaxPercent:null,job:{weeklyPay:null,monthlyPay:null,yearlyPay:null},incomeTaxValue:null,monthlyExpenses:[]}}}return i(t,[{key:"updateCurrentSalesTax",value:function(){var t=this,e={country:"USA",postalCode:this.data.current.zipCode},n=new XMLHttpRequest;n.onreadystatechange=function(){if(n.readyState===XMLHttpRequest.DONE)if(200===n.status){var e=JSON.parse(n.responseText);t.data.current.salesTaxPercent=e.totalRate}else console.log(JSON.parse(n.responseText))},n.open("POST","/.netlify/functions/sales-tax"),n.setRequestHeader("Content-type","application/json"),n.send(JSON.stringify(e))}},{key:"updateFutureSalesTax",value:function(){var t=this,e={country:"USA",postalCode:this.data.future.zipCode},n=new XMLHttpRequest;n.onreadystatechange=function(){if(n.readyState===XMLHttpRequest.DONE)if(200===n.status){var e=JSON.parse(n.responseText);t.data.future.salesTaxPercent=e.totalRate}else console.log(JSON.parse(n.responseText))},n.open("POST","/.netlify/functions/sales-tax"),n.setRequestHeader("Content-type","application/json"),n.send(JSON.stringify(e))}},{key:"updateCurrentIncomeTax",value:function(){var t=this,e=this.data.current.job.yearlyPay,n=this.data.maritalStatus,r=this.data.current.state,o={pay_rate:e,filing_status:n,state:r},a=new XMLHttpRequest;a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE)if(200===a.status){var e=JSON.parse(a.responseText),n=e.annual.federal.amount+e.annual.fica.amount;"TN"!==r&&"NH"!==r&&(n+=e.annual.state.amount),t.data.current.incomeTaxValue=n}else console.log(JSON.parse(a.responseText))},a.open("POST","/.netlify/functions/income-tax"),a.setRequestHeader("Content-Type","application/json"),a.send(JSON.stringify(o))}},{key:"updateFutureIncomeTax",value:function(){var t=this,e=this.data.future.job.yearlyPay,n=this.data.maritalStatus,r=this.data.future.state,o={pay_rate:e,filing_status:n,state:r},a=new XMLHttpRequest;a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE)if(200===a.status){var e=JSON.parse(a.responseText),n=e.annual.federal.amount+e.annual.fica.amount;"TN"!==r&&"NH"!==r&&(n+=e.annual.state.amount),t.data.future.incomeTaxValue=n}else console.log(JSON.parse(a.responseText))},a.open("POST","/.netlify/functions/income-tax"),a.setRequestHeader("Content-Type","application/json"),a.send(JSON.stringify(o))}},{key:"init",value:function(){document.querySelector("#personal-info").addEventListener("change",function(t){!t.target||"SELECT"!==t.target.nodeName&&"INPUT"!==t.target.nodeName||console.log("Personal Info")}),document.querySelectorAll(".input-section:not(#personal-info)").forEach(function(t){t.addEventListener("change",function(t){!t.target||"SELECT"!==t.target.nodeName&&"INPUT"!==t.target.nodeName||console.log("Other Info - Input")}),t.addEventListener("click",function(t){t.target&&(t.target.classList.contains("dynamic-table-add")||t.target.classList.contains("dynamic-table-remove"))&&console.log("Other Info - Button")})})}}]),t}(),c=function(){function t(){o(this,t);for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];this.sections=[].concat(n)}return i(t,[{key:"animate",value:function(){for(var t=window.innerHeight,e=this.sections,n=t-e[0][0].offsetHeight,r=-1/0,o=null,a=[],i=0;i<e.length;i++){var u=e[i],c=u[1].getBoundingClientRect().top-n;c>=r&&c<=0?(a[0]&&a.push(a[0]),o&&(a[0]=o),r=c,o=u[0]):a.push(u[0])}a.forEach(function(t){t&&t.classList.add("footer-bar--hidden")}),o&&o.classList.remove("footer-bar--hidden")}},{key:"init",value:function(){var t=this;window.addEventListener("scroll",function(){return t.animate()})}}]),t}(),s=function(){function t(e){o(this,t),this.dynamicTable=e}return i(t,[{key:"addDynamicTableRow",value:function(t){var e=this.dynamicTable.querySelector(".dynamic-table-body"),n=document.createElement("div"),r=document.createElement("input"),o=document.createElement("input"),a=document.createElement("div");n.classList.add("dynamic-table-row"),r.type="text",r.placeholder="Name",r.classList.add("dynamic-table-row-label"),o.type="text",o.placeholder="$00,000.00",o.classList.add("dynamic-table-row-value"),a.classList.add("dynamic-table-remove"),a.classList.add("circle-button"),n.appendChild(r),n.appendChild(o),n.appendChild(a),e.appendChild(n)}},{key:"removeDynamicTableRow",value:function(t){var e=t.target.parentNode;if(this.dynamicTable.querySelector(".dynamic-table-body").querySelectorAll(".dynamic-table-row").length<2)for(var n=e.querySelectorAll("input"),r=0;r<n.length;r++)n[r].value="";else e.parentNode.removeChild(e)}},{key:"init",value:function(){var t=this;this.dynamicTable.addEventListener("click",function(e){e.target&&e.target.classList.contains("dynamic-table-remove")?t.removeDynamicTableRow(e):e.target&&e.target.classList.contains("dynamic-table-add")&&t.addDynamicTableRow(e)})}}]),t}(),l=function(){function t(e){o(this,t),this.jobInputSection=e}return i(t,[{key:"determineMode",value:function(t){var e=this.jobInputSection.querySelector(".job-input-section-question-hours"),n=this.jobInputSection.querySelector(".job-input-section-question-wage").querySelector(".input-question-text");switch(t.target.value){case"hourly":e.classList.remove("disabled"),n.innerText="How much do you plan to make every hour?";break;case"weekly":e.classList.add("disabled"),n.innerText="How much do you plan to make every week?";break;case"monthly":e.classList.add("disabled"),n.innerText="How much do you plan to make every month?";break;case"yearly":e.classList.add("disabled"),n.innerText="How much do you plan to make every year?";break;default:console.log("error")}}},{key:"init",value:function(){var t=this;this.jobInputSection.addEventListener("change",function(e){e.target&&"SELECT"===e.target.nodeName&&t.determineMode(e)})}}]),t}();!function(){new r.a(document.querySelector(".site-nav")).init();var t=document.getElementById("current-footer-bar"),e=document.getElementById("current-input-container"),n=document.getElementById("future-footer-bar"),o=document.getElementById("future-input-container"),a=document.querySelector(".output-container");new c([t,e],[n,o],[null,a]).init();var i=[];document.querySelectorAll(".dynamic-table").forEach(function(t){var e=new s(t);e.init(),i.push(e)});var f=[];document.querySelectorAll(".job-input-section").forEach(function(t){var e=new l(t);e.init(),f.push(e)}),(new u).init()}()},function(t,e,n){"use strict";var r=n(32),o=n(1),a=n(26),i=n(3),u=n(27),c=n(14),s=n(52),l=n(28),f=n(54),p=n(15)("isConcatSpreadable"),d=!o(function(){var t=[];return t[p]=!1,t.concat()[0]!==t}),y=f("concat"),v=function(t){if(!i(t))return!1;var e=t[p];return void 0!==e?!!e:a(t)};r({target:"Array",proto:!0,forced:!d||!y},{concat:function(t){var e,n,r,o,a,i=u(this),f=l(i,0),p=0;for(e=-1,r=arguments.length;e<r;e++)if(a=-1===e?i:arguments[e],v(a)){if(p+(o=c(a.length))>9007199254740991)throw TypeError("Maximum allowed index exceeded");for(n=0;n<o;n++,p++)n in a&&s(f,p,a[n])}else{if(p>=9007199254740991)throw TypeError("Maximum allowed index exceeded");s(f,p++,a)}return f.length=p,f}})},function(t,e,n){var r=n(0),o=n(16).f,a=n(6),i=n(36),u=n(13),c=n(41),s=n(51);t.exports=function(t,e){var n,l,f,p,d,y=t.target,v=t.global,h=t.stat;if(n=v?r:h?r[y]||u(y,{}):(r[y]||{}).prototype)for(l in e){if(p=e[l],f=t.noTargetGet?(d=o(n,l))&&d.value:n[l],!s(v?l:y+(h?".":"#")+l,t.forced)&&void 0!==f){if(typeof p==typeof f)continue;c(p,f)}(t.sham||f&&f.sham)&&a(p,"sham",!0),i(n,l,p,t)}}},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";var r={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,a=o&&!r.call({1:2},1);e.f=a?function(t){var e=o(this,t);return!!e&&e.enumerable}:r},function(t,e,n){var r=n(0),o=n(3),a=r.document,i=o(a)&&o(a.createElement);t.exports=function(t){return i?a.createElement(t):{}}},function(t,e,n){var r=n(0),o=n(8),a=n(6),i=n(5),u=n(13),c=n(22),s=n(38),l=s.get,f=s.enforce,p=String(c).split("toString");o("inspectSource",function(t){return c.call(t)}),(t.exports=function(t,e,n,o){var c=!!o&&!!o.unsafe,s=!!o&&!!o.enumerable,l=!!o&&!!o.noTargetGet;"function"==typeof n&&("string"!=typeof e||i(n,"name")||a(n,"name",e),f(n).source=p.join("string"==typeof e?e:"")),t!==r?(c?!l&&t[e]&&(s=!0):delete t[e],s?t[e]=n:a(t,e,n)):s?t[e]=n:u(e,n)})(Function.prototype,"toString",function(){return"function"==typeof this&&l(this).source||c.call(this)})},function(t,e){t.exports=!1},function(t,e,n){var r,o,a,i=n(39),u=n(0),c=n(3),s=n(6),l=n(5),f=n(40),p=n(24),d=u.WeakMap;if(i){var y=new d,v=y.get,h=y.has,m=y.set;r=function(t,e){return m.call(y,t,e),e},o=function(t){return v.call(y,t)||{}},a=function(t){return h.call(y,t)}}else{var g=f("state");p[g]=!0,r=function(t,e){return s(t,g,e),e},o=function(t){return l(t,g)?t[g]:{}},a=function(t){return l(t,g)}}t.exports={set:r,get:o,has:a,enforce:function(t){return a(t)?o(t):r(t,{})},getterFor:function(t){return function(e){var n;if(!c(e)||(n=o(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}}},function(t,e,n){var r=n(0),o=n(22),a=r.WeakMap;t.exports="function"==typeof a&&/native code/.test(o.call(a))},function(t,e,n){var r=n(8),o=n(23),a=r("keys");t.exports=function(t){return a[t]||(a[t]=o(t))}},function(t,e,n){var r=n(5),o=n(42),a=n(16),i=n(12);t.exports=function(t,e){for(var n=o(e),u=i.f,c=a.f,s=0;s<n.length;s++){var l=n[s];r(t,l)||u(t,l,c(e,l))}}},function(t,e,n){var r=n(43),o=n(45),a=n(50),i=n(21);t.exports=r("Reflect","ownKeys")||function(t){var e=o.f(i(t)),n=a.f;return n?e.concat(n(t)):e}},function(t,e,n){var r=n(44),o=n(0),a=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?a(r[t])||a(o[t]):r[t]&&r[t][e]||o[t]&&o[t][e]}},function(t,e,n){t.exports=n(0)},function(t,e,n){var r=n(46),o=n(49).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(5),o=n(10),a=n(47).indexOf,i=n(24);t.exports=function(t,e){var n,u=o(t),c=0,s=[];for(n in u)!r(i,n)&&r(u,n)&&s.push(n);for(;e.length>c;)r(u,n=e[c++])&&(~a(s,n)||s.push(n));return s}},function(t,e,n){var r=n(10),o=n(14),a=n(48),i=function(t){return function(e,n,i){var u,c=r(e),s=o(c.length),l=a(i,s);if(t&&n!=n){for(;s>l;)if((u=c[l++])!=u)return!0}else for(;s>l;l++)if((t||l in c)&&c[l]===n)return t||l||0;return!t&&-1}};t.exports={includes:i(!0),indexOf:i(!1)}},function(t,e,n){var r=n(25),o=Math.max,a=Math.min;t.exports=function(t,e){var n=r(t);return n<0?o(n+e,0):a(n,e)}},function(t,e){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(1),o=/#|\.prototype\./,a=function(t,e){var n=u[i(t)];return n==s||n!=c&&("function"==typeof e?r(e):!!e)},i=a.normalize=function(t){return String(t).replace(o,".").toLowerCase()},u=a.data={},c=a.NATIVE="N",s=a.POLYFILL="P";t.exports=a},function(t,e,n){"use strict";var r=n(11),o=n(12),a=n(9);t.exports=function(t,e,n){var i=r(e);i in t?o.f(t,i,a(0,n)):t[i]=n}},function(t,e,n){var r=n(1);t.exports=!!Object.getOwnPropertySymbols&&!r(function(){return!String(Symbol())})},function(t,e,n){var r=n(1),o=n(15)("species");t.exports=function(t){return!r(function(){var e=[];return(e.constructor={})[o]=function(){return{foo:1}},1!==e[t](Boolean).foo})}},function(t,e,n){var r=n(0),o=n(56),a=n(57),i=n(6);for(var u in o){var c=r[u],s=c&&c.prototype;if(s&&s.forEach!==a)try{i(s,"forEach",a)}catch(t){s.forEach=a}}},function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},function(t,e,n){"use strict";var r=n(58).forEach,o=n(61);t.exports=o("forEach")?function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}:[].forEach},function(t,e,n){var r=n(59),o=n(17),a=n(27),i=n(14),u=n(28),c=[].push,s=function(t){var e=1==t,n=2==t,s=3==t,l=4==t,f=6==t,p=5==t||f;return function(d,y,v,h){for(var m,g,b=a(d),x=o(b),S=r(y,v,3),w=i(x.length),T=0,L=h||u,O=e?L(d,w):n?L(d,0):void 0;w>T;T++)if((p||T in x)&&(g=S(m=x[T],T,b),t))if(e)O[T]=g;else if(g)switch(t){case 3:return!0;case 5:return m;case 6:return T;case 2:c.call(O,m)}else if(l)return!1;return f?-1:s||l?l:O}};t.exports={forEach:s(0),map:s(1),filter:s(2),some:s(3),every:s(4),find:s(5),findIndex:s(6)}},function(t,e,n){var r=n(60);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},function(t,e,n){"use strict";var r=n(1);t.exports=function(t,e){var n=[][t];return!n||!r(function(){n.call(null,e||function(){throw 1},1)})}}]);