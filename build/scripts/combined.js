function addCommas(e){e+="";for(var a=e.split("."),i=a[0],t=a.length>1?"."+a[1]:"",s=/(\d+)(\d{3})/;s.test(i);)i=i.replace(s,"$1,$2");return i+t}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,a){return 0==a?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}var allLayers;require(["esri/geometry/Extent","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,a,i){allLayers=[{groupHeading:"WMS layers",showGroupHeading:!0,includeInLayerList:!0,layers:{"ESRI Sample WMS":{url:"http://sampleserver1.arcgisonline.com/ArcGIS/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/WMSServer",options:{id:"esriSampleWMS",transparent:!0,opacity:.6,visible:!0,resourceInfo:{extent:new e(-126.40869140625,31.025390625,-109.66552734375,41.5283203125,{wkid:4326}),layerInfos:[new a({name:"1",title:"Rivers"}),new a({name:"2",title:"Cities"})]},visibleLayers:["1","2"]},wimOptions:{type:"layer",layerType:"agisWMS",includeInLayerList:!0,includeLegend:!0}},"NOAA Flood Warnings":{url:"http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/wwa",options:{id:"noaaFloodWarn",transparent:!0,opacity:.6,visible:!0,resourceInfo:{extent:new e(-126.40869140625,31.025390625,-109.66552734375,41.5283203125,{wkid:4326}),layerInfos:[new a({name:"floodWarnLyr",title:"Flood Warnings",transparent:!1})]},visibleLayers:["WARN_SHORT_FLW"]},wimOptions:{type:"layer",layerType:"agisWMS",includeInLayerList:!0,includeLegend:!0,staticLegendOptions:{hasStaticLegend:!0,legendTitle:"NOAA Flood Warnings (not the right legend, by the way)",legendUrl:"http://nowcoast.noaa.gov/LayerInfo?layer=NHC_TRACK_POLY&data=legend"}}}}},{groupHeading:"feature layers",showGroupHeading:!0,includeInLayerList:!0,layers:{"Pt Feature Layer":{url:"http://wim.usgs.gov/arcgis/rest/services/BadRiverDataPortal/NWIS_Sites/MapServer/0",options:{id:"ptFeatureLayer",visible:!0},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,includeLegend:!1}},"FIM Sites":{url:"http://fimlb-1071089098.us-east-1.elb.amazonaws.com/arcgis/rest/services/FIMMapper/sites/MapServer/0",options:{id:"fimSites",opacity:.75,visible:!0},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,hasOpacitySlider:!0,includeLegend:!0}}}},{groupHeading:"radio button example",showGroupHeading:!0,includeInLayerList:!0,layers:{"Cat 1":{url:"http://olga.er.usgs.gov/stpgis/rest/services/Vulnerability/NACCH_change_probabilities/MapServer",visibleLayers:[5,6,7],options:{id:"cat1",opacity:1,visible:!0},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,exclusiveGroupName:"Coastal Erosion Hazard",includeLegend:!0}},"Cat 2":{url:"http://olga.er.usgs.gov/stpgis/rest/services/Vulnerability/NACCH_change_probabilities/MapServer",visibleLayers:[13,14,15],options:{id:"cat2",opacity:1,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,exclusiveGroupName:"Coastal Erosion Hazard",includeLegend:!0}}}},{groupHeading:"ESRI dynamic map services",showGroupHeading:!0,includeInLayerList:!0,layers:{Wetlands:{url:"http://107.20.228.18/ArcGIS/rest/services/Wetlands/MapServer",options:{id:"Wetlands",opacity:.75,visible:!0},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0}},"NAWQA networks":{url:"http://wimsharedlb-418672833.us-east-1.elb.amazonaws.com/arcgis/rest/services/NAWQA/tablesTest/MapServer",options:{id:"nawqaNetworks",layers:[1],visible:!1,opacity:.6},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,hasOpacitySlider:!0,includeLegend:!1}}}}]});var map,allLayers,maxLegendHeight,maxLegendDivHeight;require(["esri/map","esri/dijit/HomeButton","esri/layers/ArcGISTiledMapServiceLayer","esri/dijit/Geocoder","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Multipoint","esri/symbols/PictureMarkerSymbol","esri/geometry/webMercatorUtils","dojo/dom","dojo/on","dojo/domReady!"],function(e,a,i,t,s,n,o,l,r,p,c){function d(){S.activeGeocoder.searchExtent=1===p.byId("chkExtent").checked?map.extent:null}function g(){d();var e=S.find();e.then(function(e){y(e)}),$("#geosearchModal").modal("hide")}function u(e){v();var a=e.graphic?e.graphic:e.result.feature;a.setSymbol(x),h(e.result,a.symbol),$("#geosearchModal").modal("hide")}function y(e){if(e=e.results,e.length>0){v();for(var a=x,i=0;i<e.length;i++)h(e[i],a);f(e)}}function m(e){var a=e.indexOf(",");return a>0&&(e=e.substring(0,a)),e}function h(e,a){var i,t,o,l,r={};o=e.feature.geometry,r.address=e.name,r.score=e.feature.attributes.Score,i={address:m(r.address),score:r.score,lat:o.getLatitude().toFixed(2),lon:o.getLongitude().toFixed(2)},t=new s({title:"{address}",description:"Latitude: {lat}<br/>Longitude: {lon}"}),l=new n(o,a,i,t),map.graphics.add(l)}function f(e){for(var a=new o(map.spatialReference),i=0;i<e.length;i++)a.addPoint(e[i].feature.geometry);map.setExtent(a.getExtent().expand(2))}function v(){map.infoWindow.hide(),map.graphics.clear()}function b(e,a,i,t,s){return new l({angle:0,xoffset:a,yoffset:i,type:"esriPMS",url:e,contentType:"image/png",width:t,height:s})}map=e("mapDiv",{basemap:"national-geographic",center:[-95.6,38.6],zoom:5});var L=new a({map:map},"homeButton");L.startup(),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),c(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var a=r.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(a.y.toFixed(3)),$("#longitude").html(a.x.toFixed(3))}),c(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),c(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var a=r.webMercatorToGeographic(e.mapPoint);$("#latitude").html(a.y.toFixed(3)),$("#longitude").html(a.x.toFixed(3))}}),c(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=r.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var w=new i("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer");c(p.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(w)}),c(p.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(w)}),c(p.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(w)}),c(p.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(w)}),c(p.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(w)}),c(p.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(w)}),c(p.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(w)}),c(p.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(w)}),c(p.byId("btnNatlMap"),"click",function(){map.addLayer(w)});var S=new t({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");S.startup(),S.on("select",u),S.on("findResults",y),S.on("clear",v),c(S.inputNode,"keydown",function(e){13==e.keyCode&&d()});var x=b("../images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),c(p.byId("btnGeosearch"),"click",g),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),$("#legendDiv").niceScroll(),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),$("#legendCollapse").on("shown.bs.collapse",function(){maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")})}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,a,i,t,s,n,o,l,r,p,c,d,g,u,y,m,h,f,v){function b(e,a,i,t,s,n,o){if(map.addLayer(i),w.push([s,camelize(t),i]),s){if(!$("#"+camelize(s)).length){var l=$('<div id="'+camelize(s+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+s+"</button> </div>");l.click(function(e){l.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(w,function(e,a){var i=map.getLayer(a[2].id);if(a[0]==s)if($("#"+a[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&l.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",a[1]),map.addLayer(a[2]);var i=map.getLayer(a[2].id);i.setVisibility(!0)}else l.find("i.glyphspan").hasClass("fa-square-o")&&(console.log("removing layer: ",a[1]),map.removeLayer(a[2]))})});var r=$('<div id="'+camelize(s)+'" class="btn-group-vertical" data-toggle="buttons"></div');$("#toggle").append(r)}if(i.visible)var p=$('<div id="'+camelize(t)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(s)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(s)+'"></i>&nbsp;&nbsp;'+t+"</label> </div>");else var p=$('<div id="'+camelize(t)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(s)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(s)+'"></i>&nbsp;&nbsp;'+t+"</label> </div>");$("#"+camelize(s)).append(p),p.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var a=$(this)[0].id;$.each(w,function(e,i){if(i[0]==s)if(i[1]==a&&$("#"+camelize(s+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",i[1]),map.addLayer(i[2]);var t=map.getLayer(i[2].id);t.setVisibility(!0)}else i[1]==a&&$("#"+camelize(s+" Root")).find("i.glyphspan").hasClass("fa-square-o")?console.log("groud heading not checked"):(console.log("removing layer: ",i[1]),map.removeLayer(i[2]),$("#"+i[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+i[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o"))})}})}else{if(i.visible&&void 0!==o.hasOpacitySlider&&1==o.hasOpacitySlider)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+'<span id="opacity'+camelize(t)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(i.visible||void 0===o.hasOpacitySlider||1!=o.hasOpacitySlider)if(i.visible)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+"</button></span></div>");else var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+"</button> </div>");else var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+'<span id="opacity'+camelize(t)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');p.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),e.preventDefault(),e.stopPropagation(),$("#"+camelize(t)).toggle(),i.setVisibility(i.visible?!1:!0)})}if(a){var c=camelize(e);if(!$("#"+c).length){var d=$('<div id="'+c+'"><div class="alert alert-info" role="alert"><strong>'+e+"</strong></div></div>");$("#toggle").append(d)}s?($("#"+c).append(l),$("#"+c).append(r)):($("#"+c).append(p),$("#opacity"+camelize(t)).length>0&&$("#opacity"+camelize(t)).hover(function(){$(".opacitySlider").remove();var e=map.getLayer(n.id).opacity,a=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+e+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(a),$("#slider")[0].value=100*e,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var a=$("#slider")[0].value/100;console.log("o: "+a),$("#opacityValue").html("Opacity: "+a),map.getLayer(n.id).setOpacity(a)})}))}else $("#toggle").append(p)}var L=[],w=[];$.each(allLayers,function(e,a){console.log("processing: ",a.groupHeading),$.each(a.layers,function(e,i){var t="";if(i.wimOptions.exclusiveGroupName&&(t=i.wimOptions.exclusiveGroupName),"agisFeature"===i.wimOptions.layerType){var s=new r(i.url,i.options);i.wimOptions&&1==i.wimOptions.includeLegend&&L.push({layer:s,title:e}),b(a.groupHeading,a.showGroupHeading,s,e,t,i.options,i.wimOptions)}else if("agisWMS"===i.wimOptions.layerType){var s=new p(i.url,{resourceInfo:i.options.resourceInfo,visibleLayers:i.options.visibleLayers},i.options);i.wimOptions&&1==i.wimOptions.includeLegend&&L.push({layer:s,title:e}),b(a.groupHeading,a.showGroupHeading,s,e,t,i.options,i.wimOptions)}else if("agisDynamic"===i.wimOptions.layerType){var s=new l(i.url,i.options);i.wimOptions&&1==i.wimOptions.includeLegend&&L.push({layer:s,title:e}),i.visibleLayers&&s.setVisibleLayers(i.visibleLayers),b(a.groupHeading,a.showGroupHeading,s,e,t,i.options,i.wimOptions)}})});var S=new e({map:map,layerInfos:L},"legendDiv");S.startup()})}),$(document).ready(function(){});