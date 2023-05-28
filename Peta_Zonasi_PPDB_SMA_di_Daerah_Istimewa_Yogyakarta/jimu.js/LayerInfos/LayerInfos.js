// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/Deferred dojo/on dojo/topic dojo/Evented dojo/promise/all ./LayerInfoFactory libs/crc".split(" "),function(w,g,h,u,t,p,x,v,y,z){var k=w([x],{declaredClass:"jimu.LayerInfos",map:null,_operLayers:null,_layerInfos:null,_finalLayerInfos:null,_tableInfos:null,_basemapLayerInfos:null,_finalBasemapLayerInfos:null,_basemapLayers:null,_unreachableLayersTitleOfWebmap:null,_objectId:null,_layerInfoFactory:null,_previousLayerOrder:null,constructor:function(a,
b){this._objectId=Math.random();this._unreachableLayersTitleOfWebmap=[];this._basemapLayers=b.baseMap.baseMapLayers;this._operLayers=b.operationalLayers;this._tables=b.tables;this._layerInfoFactory=new y(a,this);this.map=a;this._previousLayerOrder=[].concat(this.map.layerIds,this.map.graphicsLayerIds);this._initLayerInfos();this._initBasemapLayerInfos();this._initTablesInfos();this.update();this._bindEvents()},update:function(){this._extraSetLayerInfos();this._clearAddedFlag(this._finalLayerInfos);
this._clearAddedFlag(this._finalBasemapLayerInfos);this._initFinalLayerInfos();this._initFinalBasemapLayerInfos();this._markFirstOrLastNode()},getLayerInfoArrayOfWebmap:function(){var a=[];g.forEach(this.getLayerInfoArray(),function(b){for(var c=0;c<this._operLayers.length;c++)if(b.id===this._operLayers[c].id){a.push(b);break}c===this._operLayers.length&&0<=this._removedLayerInfoIdsFromFeatureCollection.indexOf(b.id)&&a.push(b)},this);return a},getTableInfoArrayOfWebmap:function(){var a=[];g.forEach(this.getTableInfoArray(),
function(b){for(var c=0;c<this._tables.length;c++)if(b.id===this._tables[c].id){a.push(b);break}},this);return a},getLayerInfoArray:function(){return g.filter(this._finalLayerInfos,function(a){h.getObject("_wabProperties.isTemporaryLayer",!1,a.layerObject)&&(a._flag._isTemporaryLayerInfo=!0);return!a._flag._isTemporaryLayerInfo})},getTableInfoArray:function(){return this._tableInfos},getBasemapLayerInfoArray:function(){return this._finalBasemapLayerInfos},addFeatureCollection:function(a,b){var c=
this._getUniqueTopLayerInfoId(b),d={layers:[]};g.forEach(a,function(f,l){f.id=c+"_"+l;d.layers.push({id:f.id,layerObject:f})},this);this.map.addLayers(a);try{var e=this._layerInfoFactory.create({featureCollection:d,title:b||c,id:c},this.map);e.init()}catch(f){console.warn(f.message),e=null}e&&(e._extraOfWebmapLayerInfo=!0,this._layerInfos.push(e),this.update(),this._onLayersUpdated(e,e.getRootLayerInfo()))},addTable:function(a){a=this._addTables([a],this._tableInfos);return a[0]?a[0]:null},removeTable:function(a){var b=
-1;g.forEach(this._tableInfos,function(d,e){a.id===d.id&&(b=e)});if(0<=b){var c=this._tableInfos[b];this._tableInfos.splice(b,1);c.destroy();this._onTableChange([a],k.REMOVED)}},_addTables:function(a,b){var c=[],d=[];g.forEach(a,function(e){try{e.layerObject={url:e.url,featureCollectionData:e.featureCollectionData,empty:!0};e.id=this._getUniqueTableId(e.id);e.selfType="table";var f=this._layerInfoFactory.create(e);f.init()}catch(l){console.warn(l.message),f=null}f&&(c.push(f),b.push(f),d.push(f.getLayerObject()))},
this);v(d).then(h.hitch(this,function(e){var f=[];g.forEach(e,function(l,m){m=c[m];l?f.push(m):(this.removeTable(m),m.destroy())},this);this._onTableChange(f,k.ADDED)}));return c},_getUniqueTableId:function(a){var b=this._tableInfos.concat(this._tableInfos||[]);return this._getUniqueLayerOrTableId(a,b)},_getUniqueTopLayerInfoId:function(a){return this._getUniqueLayerOrTableId(a,this._finalLayerInfos)},_getUniqueLayerOrTableId:function(a,b){var c=1,d;a||(a="table");for(d=a;;){for(var e=0;e<b.length&&
b[e].id!==d;e++);if(e===b.length)return d;d=a+"_"+c.toString();c++}},_traversal:function(a,b){for(var c=0;c<b.length;c++)if(b[c].traversal(a))return!0;return!1},traversal:function(a){var b=this.getLayerInfoArray();return this._traversal(a,b)},traversalLayerInfosOfWebmap:function(a){var b=this.getLayerInfoArrayOfWebmap();return this._traversal(a,b)},traversalAll:function(a){var b=this.getLayerInfoArray(),c=this.getBasemapLayerInfoArray(),d=this.getTableInfoArray();b=b.concat(c.concat(d));return this._traversal(a,
b)},_traversalAllWithSpecialLayerInfo:function(a){return this._traversal(a,this._finalLayerInfos.concat(this._tableInfos))},getLayerInfoById:function(a){return this._findLayerInfoById(a)},getTableInfoById:function(a){var b=null;g.some(this.getTableInfoArray(),function(c){if(c.id===a)return b=c,!0});return b},getLayerOrTableInfoById:function(a){var b=null;this.traversalAll(function(c){if(c.id===a)return b=c,!0});return b},getLayerInfoByTopLayerId:function(a){return this._findTopLayerInfoById(a)},moveUpLayer:function(a,
b){var c=null;b=b?b:1;a=this._getTopLayerInfoIndexById(a.id);0<=a-b&&(c=this._finalLayerInfos[a-b].obtainLayerIndexesInMap().length,this._finalLayerInfos[a].moveRightOfIndex(this._finalLayerInfos[a-b].obtainLayerIndexesInMap()[c-1].index),c=this._finalLayerInfos[a-b]);return c},_reorderLayerInfosArray:function(a,b,c){"moveup"===c?(c=this._finalLayerInfos[a],this._finalLayerInfos.splice(a,1),this._finalLayerInfos.splice(a-b,0,c)):(c=this._finalLayerInfos[a],this._finalLayerInfos.splice(a+b+1,0,c),
this._finalLayerInfos.splice(a,1));this._markFirstOrLastNode();return c},moveDownLayer:function(a,b){var c=null;b=b?b:1;a=this._getTopLayerInfoIndexById(a.id);a+b<=this._finalLayerInfos.length-1&&(this._finalLayerInfos[a].moveLeftOfIndex(this._finalLayerInfos[a+b].obtainLayerIndexesInMap()[0].index),c=this._finalLayerInfos[a+b]);return c},getBasemapLayers:function(){var a=[];g.forEach(this.map.layerIds.concat(this.map.graphicsLayerIds||[]),function(b){b=this.map.getLayer(b);"basemap"!==b._basemapGalleryLayerType&&
"reference"!==b._basemapGalleryLayerType||a.push(b)},this);return a.reverse()},getMapNotesLayerInfoArray:function(){return g.filter(this.getLayerInfoArray(),function(a){return a.isMapNotesLayerInfo()},this)},restoreState:function(a){var b=a&&a.layerOptions?a.layerOptions:null;g.forEach(this._finalLayerInfos,function(c){c.resetLayerObjectVisibility(b)},this)},_getEncodedLayerIdsOfCurrentMap:function(){this._encodedLayerIds||(this._encodedLayerIds={encodedToLayerIds:{},layerIdsToEncoded:{}},this.traversal(h.hitch(this,
function(a){var b=this._encodeLayerId(a.id);this._encodedLayerIds.encodedToLayerIds[b]=a.id;this._encodedLayerIds.layerIdsToEncoded[a.id]=b})));return this._encodedLayerIds},_getShowOrHideLayerIdsBySimpleState:function(a){var b=[],c=[],d={showLayerIds:null,hideLayerIds:null},e=this._getEncodedLayerIdsOfCurrentMap().encodedToLayerIds;a&&a.showLayersEncoded&&e?(g.forEach(a.showLayersEncoded,function(f){(f=e[f])&&b.push(f)}),d.showLayerIds=b):a&&a.showLayers?d.showLayerIds=a.showLayers:a&&a.hideLayersEncoded&&
e?(g.forEach(a.hideLayersEncoded,function(f){(f=e[f])&&c.push(f)}),d.hideLayerIds=c):a&&a.hideLayers&&(d.hideLayerIds=a.hideLayers);return d},_getSibilingLayerInfos:function(a){return a.isRootLayer()?this._finalLayerInfos:a.parentLayerInfo.getSubLayers()},_revertSibilingLayersOnState:function(a,b,c){a=this._getSibilingLayerInfos(a);g.some(a,h.hitch(this,function(d){d=d.id;b.layerOptions[d]||(b.layerOptions[d]={visible:c})}))},setSimplificationState:function(a){var b={layerOptions:{}},c=this._getShowOrHideLayerIdsBySimpleState(a);
this.traversal(h.hitch(this,function(d){var e=null;if(c.showLayerIds){var f=c.showLayerIds;var l=!0}else f=c.hideLayerIds,l=!1;g.some(f,function(m){if(d.id===m)return e=d.id,!0;if(d.title.trim&&m.trim&&d.title.trim()===m.trim())return e=d.id,!1});l?null!==e?(b.layerOptions[d.id]={visible:!0},this._revertSibilingLayersOnState(d,b,!1)):0===f.length&&(b.layerOptions[d.id]={visible:!1}):null!==e?(b.layerOptions[d.id]={visible:!1},this._revertSibilingLayersOnState(d,b,!0)):0===f.length&&(b.layerOptions[d.id]=
{visible:!0})}));this.restoreState(b)},getSimplificationState:function(){var a={showLayers:[],showLayersEncoded:[],hideLayers:[],hideLayersEncoded:[]};this.traversal(h.hitch(this,function(b){b.isVisible()?(a.showLayers.push(b.id),a.showLayersEncoded.push(this._encodeLayerId(b.id))):(a.hideLayers.push(b.id),a.hideLayersEncoded.push(this._encodeLayerId(b.id)))}));return a},_encodeLayerId:function(a){var b=z.crc24;a=b(a);a=parseInt(a,16);return a=a.toString(36)},getUnreachableLayersTitle:function(){return this._unreachableLayersTitleOfWebmap},
getObjectId:function(){return this._objectId},_initLayerInfos:function(){this._layerInfos=[];this._initSpecifiedLayerInfos(this._operLayers,this._layerInfos)},_initBasemapLayerInfos:function(){this._basemapLayerInfos=[];this._initSpecifiedLayerInfos(this._basemapLayers,this._basemapLayerInfos)},_initSpecifiedLayerInfos:function(a,b){var c;g.forEach(a,function(d){try{c=this._layerInfoFactory.create(d),c.init()}catch(e){console.warn(e.message),c=null,0<=e.message.indexOf("declaredClass")&&this._unreachableLayersTitleOfWebmap.push(d.title)}c&&
b.push(c)},this)},_extraSetLayerInfos:function(){this._removedLayerInfoIdsFromFeatureCollection=[];g.forEach(this._finalLayerInfos||this._layerInfos,function(a,b){if(a._needToRenew()){try{var c=this._layerInfoFactory.create(a.originOperLayer);c.init()}catch(e){console.warn(e.message),c=null}c&&(a.destroy(),this._finalLayerInfos[b]=c)}else if(a.originOperLayer.featureCollection){var d=[];g.forEach(a.getSubLayers(),function(e){d.push(e.id)});g.forEach(d,function(e){this.map.getLayer(e)||a.removeSubLayerById(e)},
this);1===a.getSubLayers().length&&(b=a.getSubLayers()[0],this.map.getLayer(b.id).title=a.title,a.removeSubLayerById(b.id),this._removedLayerInfoIdsFromFeatureCollection.push(b.id),a.id+="_logically_removed")}},this)},_refineFinalLayerInfos:function(){this._finalLayerInfos&&(this._finalLayerInfos=g.filter(this._finalLayerInfos,function(a){return!a._flag._invalid}))},_initFinalLayerInfos:function(){var a,b=this._finalLayerInfos||this._layerInfos;this._finalLayerInfos=[];for(a=this.map.graphicsLayerIds.length-
1;0<=a;a--){var c=this.map.graphicsLayerIds[a];this._isBasemap(c)||this._addToFinalLayerInfos(this._findLayerInfoByIdAndReturnTopLayer(c,b),c,!0)}for(a=this.map.layerIds.length-1;0<=a;a--)c=this.map.layerIds[a],this._isBasemap(c)||this._addToFinalLayerInfos(this._findLayerInfoByIdAndReturnTopLayer(c,b),c,!1);this._refineFinalLayerInfos()},_initTablesInfos:function(){this._tableInfos=[];var a=this._tables&&this._tables.reverse();a&&this._addTables(a,this._tableInfos)},_initFinalBasemapLayerInfos:function(){var a=
this._finalBasemapLayerInfos||this._basemapLayerInfos;this._finalBasemapLayerInfos=[];g.forEach(this.getBasemapLayers(),function(b){var c;g.some(a,function(d){if(d.id===b.id)return c=d,!0},this);this._addToFinalBasemapLayerInfos(c,b.id,!1)},this)},_isBasemap:function(a){for(var b=!1,c=this.getBasemapLayers(),d=0;d<c.length;d++)c[d].id===a&&(b=!0);return b},_addToFinalBasemapLayerInfos:function(a,b,c){this._addToSpecifiedLayerInfos(a,b,c,this._finalBasemapLayerInfos)},_addToFinalLayerInfos:function(a,
b,c){this._addToSpecifiedLayerInfos(a,b,c,this._finalLayerInfos)},_addToSpecifiedLayerInfos:function(a,b,c,d){if(a)a._addedFlag||a.isGraphicLayer()!==c||(d.push(a),a._addedFlag=!0);else{a=this.map.getLayer(b);if("esri.layers.GraphicsLayer"!==a.declaredClass&&"esri.layers.LabelLayer"!==a.declaredClass){try{var e={layerObject:a,title:this._getLayerTitle(a),id:a.id||" "};h.mixin(e,h.getObject("_wabProperties.originOperLayer",!1,a));var f=this._layerInfoFactory.create(e,this.map);f.init()}catch(l){console.warn(l.message),
f=null}f&&(h.getObject("_wabProperties.isTemporaryLayer",!1,a)&&(f._flag._isTemporaryLayerInfo=!0),d.push(f))}("esri.layers.ArcGISDynamicMapServiceLayer"===a.declaredClass||"esri.layers.ArcGISTiledMapServiceLayer"===a.declaredClass)&&f&&f._getServiceDefinition().then(h.hitch(this,function(l){var m=[];g.forEach(l.tables,function(n){n.url=f.getUrl()+"/"+n.id;n.id=f.id+"_"+n.id;n.title=this._getLayerTitle(n);m.push(n)},this);this._addTables(m,this._tableInfos)}))}},_getLayerTitle:function(a){if(a.title)return a.title;
if(h.getObject("_wabProperties.originalLayerName",!1,a))return a.name||a.id;var b=a.label||a.name||"";if(a.url&&!h.getObject("_wabProperties.itemLayerInfo",!1,a)){var c=a.url.indexOf("/FeatureServer");-1===c&&(c=a.url.indexOf("/MapServer"));-1===c&&(c=a.url.indexOf("/service"));-1<c&&(c=a.url.substring(0,c),c=c.substring(c.lastIndexOf("/")+1,c.length),b=b?c+" - "+b:c)}return b||a.id},_findLayerInfoByIdAndReturnTopLayer:function(a,b){var c,d=null;b||(b=this._finalLayerInfos);for(c=0;c<b.length;c++)if(d=
b[c].findLayerInfoById(a)){d=b[c];break}return d},_findLayerInfoById:function(a,b){var c,d=null;b||(b=this._finalLayerInfos);for(c=0;c<b.length&&!(d=b[c].findLayerInfoById(a));c++);return d},_findTopLayerInfoById:function(a){var b,c=null,d=[].concat(this._finalLayerInfos||[],this._tableInfos||[]);for(b=0;b<d.length;b++)if(d[b].id===a){c=d[b];break}return c},_getTopLayerInfoIndexById:function(a){var b,c=-1;for(b=0;b<this._finalLayerInfos.length;b++)if(this._finalLayerInfos[b].id===a){c=b;break}return c},
_clearAddedFlag:function(a){g.forEach(a,function(b){b._addedFlag=!1})},_markFirstOrLastNode:function(){var a;if(this._finalLayerInfos.length){for(a=0;a<this._finalLayerInfos.length;a++)this._finalLayerInfos[a].isFirst=!1,this._finalLayerInfos[a].isLast=!1;this._finalLayerInfos[0].isFirst=!0;this._finalLayerInfos[this._finalLayerInfos.length-1].isLast=!0;for(a=0;a<this._finalLayerInfos.length;a++)if(!this._finalLayerInfos[a].isGraphicLayer()){a&&(this._finalLayerInfos[a-1].isLast=!0);this._finalLayerInfos[a].isFirst=
!0;break}}},_onReceiveBasemapGalleryeData:function(a,b,c){"BasemapGallery"===a&&(this._basemapLayers.length=0,g.forEach(c,h.hitch(this,function(d){this._basemapLayers.push({layerObject:d,id:d.id})}),this),this.update(),this.emit("layerInfosChanged"))},_onBasemapChange:function(a){var b;for(b=this._basemapLayers.length=0;b<a.layers.length;b++)this._basemapLayers.push({layerObject:a.layer[b],id:a.layers[b].id})},_destroyLayerInfos:function(){g.forEach(this._finalLayerInfos,h.hitch(this,function(a){a.destroy()}))},
_bindEvents:function(){var a=t(this.map,"layer-add-result",h.hitch(this,this._onLayersChange,k.ADDED));var b=t(this.map,"layer-remove",h.hitch(this,this._onLayersChange,k.REMOVED));var c=t(this.map,"layer-reorder",h.hitch(this,this._onLayerReorder));var d=p.subscribe("layerInfos/layerInfo/isShowInMapChanged",h.hitch(this,this._onShowInMapChanged));var e=p.subscribe("layerInfos/layerInfo/visibleChanged",h.hitch(this,this._onVisibleChanged));var f=p.subscribe("layerInfos/layerInfo/filterChanged",h.hitch(this,
this._onFilterChanged));var l=p.subscribe("layerInfos/layerInfo/rendererChanged",h.hitch(this,this._onRendererChanged));var m=p.subscribe("layerInfos/layerInfo/opacityChanged",h.hitch(this,this._onOpacityChanged));var n=p.subscribe("layerInfos/layerInfo/scaleRangeChanged",h.hitch(this,this._onScaleRangeChanged));var A=p.subscribe("layerInfos/layerInfo/timeExtentChanged",h.hitch(this,this._onTimeExtentChanged));var B=t(this.map,"before-unload",h.hitch(this,function(){a.remove();b.remove();c.remove();
d.remove();e.remove();f.remove();l.remove();B.remove();m.remove();n.remove();A.remove();this._destroyLayerInfos()}))},_emitEvent:function(){try{this.emit.apply(this,arguments)}catch(a){console.warn(a)}},_emitEventForEveryLayerInfo:function(a,b,c){try{g.forEach(b,function(d){d.emitEvent(a,c)},this)}catch(d){console.warn(d)}},_onLayersChange:function(a,b){var c=null;if(!b.error&&"esri.layers.GraphicsLayer"!==b.layer.declaredClass&&"esri.layers.LabelLayer"!==b.layer.declaredClass){if(a===k.ADDED){this.update();
c=a=this._findLayerInfoById(b.layer.id,b.layer._basemapGalleryLayerType?this._finalBasemapLayerInfos:this._finalLayerInfos);var d=k.ADDED;a&&!a.isRootLayer()&&(c=a.getRootLayerInfo(),d=k.SUBLAYER_ADDED)}else c=a=this._findLayerInfoById(b.layer.id,b.layer._basemapGalleryLayerType?this._finalBasemapLayerInfos:this._finalLayerInfos),d=k.REMOVED,a&&!a.isRootLayer()&&(c=a.getRootLayerInfo(),d=k.SUBLAYER_REMOVED),a&&a.destroy(),this.update();c&&(b.layer._basemapGalleryLayerType?(this._emitEvent("basemapLayersChanged"),
this._emitEvent("basemapLayerInfosChanged",c,d,a)):this._emitEvent("layerInfosChanged",c,d,a))}},_onTableChange:function(a,b){this._emitEvent("tableInfosChanged",a,b,a)},_onLayersUpdated:function(a,b){a.isTable?this._emitEvent("tableInfosChanged",[a],k.UPDATED,[b]):this._emitEvent("layerInfosChanged",a,k.UPDATED,b)},_onShowInMapChanged:function(a){this._emitEvent("layerInfosIsShowInMapChanged",a);this._emitEventForEveryLayerInfo("isShowInMapChanged",a)},_onVisibleChanged:function(a){this._emitEvent("layerInfosIsVisibleChanged",
a);this._emitEventForEveryLayerInfo("isVisibleChanged",a)},_onFilterChanged:function(a,b){this._emitEvent("layerInfosFilterChanged",a,b);this._emitEventForEveryLayerInfo("filterChanged",a,b)},_onLayerReorder:function(){var a=[].concat(this.map.layerIds,this.map.graphicsLayerIds),b=g.some(a,h.hitch(this,function(c,d){return c===this._previousLayerOrder[d]?!1:!0}));a.length===this._previousLayerOrder.length&&b&&(this.update(),this._emitEvent("layerInfosReorder",null,k.REORDERED));this._previousLayerOrder=
a},_onRendererChanged:function(a){this._emitEvent("layerInfosRendererChanged",a);this._emitEventForEveryLayerInfo("rendererChanged",a)},_onOpacityChanged:function(a){this._emitEvent("layerInfosOpacityChanged",a);this._emitEventForEveryLayerInfo("opacityChanged",a)},_onScaleRangeChanged:function(a){this._emitEvent("layerInfosScaleRangeChanged",a);this._emitEventForEveryLayerInfo("scaleRangeChanged",a)},_onTimeExtentChanged:function(a){this._emitEvent("layerInfosTimeExtentChanged",a);this._emitEventForEveryLayerInfo("timeExtentChanged",
a)}});k.getLayerInfoArrayByType=function(a,b){var c=new u,d=[],e=[];k.getInstance(a,a.iteminfo).then(function(f){f.traversal(function(l){var m=l.getLayerType();m.layerInfo=l;d.push(m)});v(d).then(function(l){g.forEach(l,function(m,n){b===m&&e.push(d[n].layerInfo)});c.resolve(e)})});return c};var r=null,q=null;k.getInstance=function(a,b){var c=new u;c.resolve(k.getInstanceSyncForInit(a,b));return c};k.getInstanceSyncForInit=function(a,b){r&&r!==a&&(q=r=null);q||(q=new k(a,b.itemData),r=a);return q};
k.getInstanceSync=function(){return q};k.setInstance=function(a,b){r=a;q=b};k.createInstance=function(a){var b=null;return b=new k(a,a.itemInfo.itemData)};h.mixin(k,{ADDED:"added",REMOVED:"removed",SUBLAYER_ADDED:"subLayerAdded",SUBLAYER_REMOVED:"subLayerRemoved",UPDATED:"updated",REORDERED:"reordered"});return k});