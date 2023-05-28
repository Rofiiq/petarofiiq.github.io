// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"url:widgets/AddData/search/templates/SearchBox.html":'\x3cdiv class\x3d"search-box2"\x3e\r\n\t\x3cinput type\x3d"text" class\x3d"search-textbox"\r\n\t\tplaceholder\x3d"${i18n.search.searchBox.placeholder}"\r\n\t\tdata-dojo-attach-point\x3d"searchTextBox"\r\n\t\x3e\x3cbutton class\x3d"btn btn-confirm" type\x3d"button"\r\n\t\tdata-dojo-attach-point\x3d"searchButton"\r\n\t\tdata-dojo-attach-event\x3d"onClick: searchButtonClicked"\r\n\t\ttitle\x3d"${i18n.search.searchBox.search}"\r\n\t\t\x3e\x3cspan class\x3d"esri-icon-search"\x3e\x3c/span\x3e\r\n\t\x3c/button\x3e\r\n\x3c!--\r\n\x3cdiv class\x3d"search-box"\x3e\r\n\t\x3cdiv class\x3d"input-group"\x3e\r\n\t\t\x3cinput type\x3d"text" class\x3d"search-textbox"\r\n\t\t\tplaceholder\x3d"${i18n.search.searchBox.placeholder}"\r\n\t\t\tdata-dojo-attach-point\x3d"searchTextBox"\x3e\r\n    \x3cspan class\x3d"search-btn"\x3e\r\n\t\t\t\x3cbutton class\x3d"btn btn-clear hidden" type\x3d"button"\r\n\t\t\t\tdata-dojo-attach-point\x3d"clearButton"\r\n\t\t\t\tdata-dojo-attach-event\x3d"onClick: clearButtonClicked"\x3e\r\n\t\t\t\t\x3cspan class\x3d"esri-icon-close"\x3e\x3c/span\x3e\r\n\t\t\t\x3c/button\x3e\r\n\t\t\t\x3cbutton class\x3d"btn btn-confirm" type\x3d"button"\r\n\t\t\t\tdata-dojo-attach-point\x3d"searchButton"\r\n\t\t\t\tdata-dojo-attach-event\x3d"onClick: searchButtonClicked"\r\n\t\t\t\ttitle\x3d"${i18n.search.searchBox.search}"\r\n\t\t\t\t\x3e\x3cspan class\x3d"esri-icon-search"\x3e\x3c/span\x3e\r\n\t\t\t\x3c/button\x3e\r\n\t\t\x3c/span\x3e\r\n\t\x3c/div\x3e\r\n\x3c/div\x3e\r\n--\x3e\r\n\x3c/div\x3e\r\n'}});
define("dojo/_base/declare dojo/_base/lang dojo/on dojo/keys ./SearchComponent dojo/text!./templates/SearchBox.html dojo/i18n!../nls/strings".split(" "),function(d,c,e,f,g,h,k){return d([g],{i18n:k,templateString:h,postCreate:function(){this.inherited(arguments);this._checkClearButton();this.own(e(this.searchTextBox,"keyup",c.hitch(this,function(b){this._checkClearButton();b.keyCode===f.ENTER&&this.search()})))},_checkClearButton:function(){},clearButtonClicked:function(){this.searchTextBox.value=
"";this._checkClearButton();this.search()},searchButtonClicked:function(){this.search()},appendQueryParams:function(b){var a=this.searchTextBox.value;null!==a&&(a=c.trim(a));null!==a&&0<a.length&&(b.canSortByRelevance=!0,a="("+a+")",b.q=null!==b.q&&0<b.q.length?b.q+(" AND "+a):a)}})});