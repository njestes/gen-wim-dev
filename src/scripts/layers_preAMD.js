//Crude start to the layers.js file

dojo.require("esri.arcgis.utils");
dojo.require("esri.dijit.Popup");
dojo.require("esri.dijit.Legend");
dojo.require("esri.geometry.Extent");
dojo.require("esri.graphic");
dojo.require("esri.layers.WMSLayer");
dojo.require("esri.layers.WMSLayerInfo");
dojo.require("esri.map");
dojo.require("esri.tasks.locator");
dojo.require("esri.virtualearth.VETiledLayer");

dojo.require("dijit.form.CheckBox");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.TitlePane");
dojo.require("dijit.Tooltip");

//various global variables are set here (Declare here, instantiate below) 
var allLayers;    
var legendLayers = [];
var layersObject = [];
var layerArray = [];
var radioGroupArray = [];
var staticLegendImage;
var identifyTask, identifyParams;
var navToolbar;
var locator;


function initLayers() {

	//This object contains all layer and their ArcGIS and Wim specific mapper properties (can do feature, wms and dynamic map layers)
	allLayers = {
			"ESRI Sample WMS": {
				"url" : "http://sampleserver1.arcgisonline.com/ArcGIS/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/WMSServer",
				"arcOptions":{
					"id": "esriSampleWMS",
					"opacity": 0.6,
					"visible": false,
					"resourceInfo":  {
			            "extent": new esri.geometry.Extent(-126.40869140625, 31.025390625, -109.66552734375, 41.5283203125, {
				            "wkid": 4326
				        }),
			            "layerInfos": [new esri.layers.WMSLayerInfo({
				          	"name": "1",
				          	"title": "Rivers"
				        }), new esri.layers.WMSLayerInfo({
				          	"name": "2",
				          	"title": "Cities"
				        })]
			         },
	              	"visibleLayers": ['1', '2']
				},
				"wimOptions": {
					"type": "layer",
					"layerType": "agisWMS",
					"includeInLayerList": true
				}
			}, "NOAA Flood Warnings": {
				"url" : "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/wwa",
				"arcOptions":{
					"id": "noaaFloodWarn",
					"opacity": 0.6,
					"visible": false,
					"resourceInfo":  {
			            "extent": new esri.geometry.Extent( -127.177734375,17.578125,-65.302734375,52.470703125, {
			              	"wkid": 4326
			            }),
			            "layerInfos": [new esri.layers.WMSLayerInfo({
		                  	"name": 'floodWarnLyr',
		                  	"title": 'Flood Warnings',
		                  	"transparent": false
						})]
			         },
	              	"visibleLayers": ['WARN_SHORT_FLW']
				},
				"wimOptions": {
					"type": "layer",
					"layerType": "agisWMS",
					"includeInLayerList": true,
					"includeLegend": true,
					"staticLegendOptions": {
						"hasStaticLegend": true,
						//this is not the right legend for this layer. just a place holder url
						"legendTitle": "NOAA Flood Warnings (not the right legend, by the way)",
						"legendUrl": "http://nowcoast.noaa.gov/LayerInfo?layer=NHC_TRACK_POLY&data=legend"
					}
				}
			}, "WMS Heading": {
				"wimOptions": {
					"type": "heading",
					"includeInLayerList": true
				}
			}, "Cat 2": {
				"url" : "http://olga.er.usgs.gov/stpgis/rest/services/Vulnerability/NACCH_change_probabilities/MapServer/",
				"visibleLayers": [13,14,15],
				"arcOptions":{
					"id": "cat2",
					"opacity": 1.0,
					"visible": false
				},
				"wimOptions": {
					"type": "layer",
					"includeInLayerList": true,
					"layerOptions":{
						"selectorType": "radio",
						"radioGroup": "coastalErode"
					}
				}
			}, "Cat 1":{
				"url" : "http://olga.er.usgs.gov/stpgis/rest/services/Vulnerability/NACCH_change_probabilities/MapServer/",
				"visibleLayers": [5,6,7],
				"arcOptions":{
					"id": "cat1",
					"opacity": 1.0,
					"visible": false
				},
				"wimOptions":{
					"type": "layer",
					"includeInLayerList": true,
					"layerOptions":{
						"selectorType": "radio",
						"radioGroup": "coastalErode"
					}
				}
			}, "Coastal Erosion Hazard":{
				"wimOptions": {
					"type": "radioParent",
					"includeInLayerList": true,
					"layerOptions": {
						"selectorType": "radioParent",  
						"radioGroup": "coastalErode"
					}
				}
			}, "Radio Group Heading": {
				"wimOptions": {
					"type": "heading",
					"includeInLayerList": true
				}
			}, "Pt Feature Layer" : {
				"url": "http://wim.usgs.gov/arcgis/rest/services/BadRiverDataPortal/NWIS_Sites/MapServer/0",
				"arcOptions": {
					"id": "ptFeatureLayer",
					"visible": true,
					"mode": esri.layers.FeatureLayer.MODE_SNAPSHOT
				},
				"wimOptions": {
					"type": "layer",
					"layerType": "agisFeature",
					"includeInLayerList": true
				}
			}, "FIM Sites" : {
				"url": "http://fimlb-1071089098.us-east-1.elb.amazonaws.com/arcgis/rest/services/FIMMapper/sites/MapServer/0",
				"arcOptions": {
					"opacity": 0.75,
					"visible": true,
					"mode": esri.layers.FeatureLayer.MODE_SNAPSHOT
				},
				"wimOptions": {
					"type": "layer",
					"layerType": "agisFeature",
					"includeInLayerList": true,
				}
			}, "Feature Layers": {
				"wimOptions": {
					"type": "heading",
					"includeInLayerList": true
				}
			}, "Wetlands" : {
				"url": "http://107.20.228.18/ArcGIS/rest/services/Wetlands/MapServer",
				"arcOptions": {
					"opacity": 0.75,
					"visible": true
				},
				"wimOptions": {
					"type": "layer",
					"includeInLayerList": true,
					"zoomScale": 144448
				}
			}, "NAWQA networks test" : {
				"url": "http://wimsharedlb-418672833.us-east-1.elb.amazonaws.com/arcgis/rest/services/NAWQA/tablesTest/MapServer",
				"visibleLayers": [1], 
				"arcOptions": {
					"visible": true, 
					"opacity": 1.0
				},
				"wimOptions": {
					"type": "layer",
					"includeInLayerList": true
				}
			}, "Dynamic Layers": {
				"wimOptions": {
					"type": "heading",
					"includeInLayerList": true
				}
			}
		};

	dojo.connect(map,'onLayersAddResult',function(results){
		//$("#legendDiv").hide();

		var legend = new esri.dijit.Legend({
			map:map,
			layerInfos:legendLayers
		},"legendDiv");
		legend.startup();
		
		//this counter to track first and last of items in legendLayers
		var i = 0;
		var lastItem = layersObject.length;
		//this forEach loop generates the checkbox toggles for each layer by looping through the legendLayers array (same way the legend element is generated). 
		dojo.forEach (layersObject, function(layer){
			
			var layerName = layer.title;
				
			if (layer.layer != "heading") {
				
				if (layer.toggleType == "radioParent") {
						
					var radioParentCheck = new dijit.form.CheckBox({
						name: "radioParentCheck" + layer.group,
						id: "radioParentCheck_" + layer.group,
						params: {group: layer.group},
						onChange: function(evt){
							var radChildLayers = [];
							var grp = this.params.group;
							dojo.forEach (layersObject, function (layer){
								if (grp == layer.group && layer.toggleType != "radioParent"  ){
									radChildLayers.push(layer.layer);
								}
							});
							if (!this.checked){
								dojo.forEach (radChildLayers, function (layer){
									layer.setVisibility(false);
								});	
								var divs = dojo.query("." + grp);
								for(var i = 0; i < divs.length; i++) {
									divs[i].style.display= "none";  
								}
							} 
							if (this.checked){
								var divs = dojo.query("." + grp);
								for(var i = 0; i < divs.length; i++) {
								    divs[i].style.display= "block"; 
								}
								dojo.forEach (radChildLayers, function (layer){
									if (dojo.byId("radioButton"+layer.id).checked) {
										layer.setVisibility(true);
									}
								});
							}
							//Check radio buttons in this group to see what's visible
							//jquery selector to get based on group name and then loop through
							/*var checkLayer = map.getLayer(this.value);
							checkLayer.setVisibility(!checkLayer.visible);
							this.checked = checkLayer.visible;	*/
						}
					});
					var toggleDiv = dojo.doc.createElement("div");			
					dojo.place(toggleDiv,dojo.byId("toggle"), "after" );
					dojo.place(radioParentCheck.domNode,toggleDiv,"first");
					dojo.setStyle(toggleDiv, "paddingLeft", "15px");
					if (i == 0) {
						dojo.setStyle(toggleDiv, "paddingBottom", "10px");
					} else if (i == lastItem) {
						dojo.setStyle(toggleDiv, "paddingTop", "10px");
					}
					var radioParentCheckLabel = dojo.create('label',{'for':radioParentCheck.name,innerHTML:layerName},radioParentCheck.domNode,"after");
					dojo.place("<br/>",radioParentCheckLabel,"after");

				} else if (layer.toggleType == "radio") {
						
					var radioButton = new dijit.form.RadioButton({
						name: layer.group,
						id: "radioButton" + layer.layer.id,
						value:layer.layer.id,
						checked:layer.layer.visible,
						params: {group: layer.group},
						onChange:function(evt){
							var radioLayer = map.getLayer(this.value);
							var parentID = "radioParentCheck_" + layer.group;
							(this.checked && dijit.byId(parentID).checked) ? radioLayer.setVisibility(true) : radioLayer.setVisibility(false);						
						}
					});
					var toggleDiv = dojo.doc.createElement("div");
					dojo.place(toggleDiv,dojo.byId("toggle"), "after" );
					dojo.place(radioButton.domNode,toggleDiv,"first");
					dojo.setAttr(toggleDiv, "class", radioButton.params.group);
					dojo.setStyle(toggleDiv, "paddingLeft", "25px");
					dojo.setStyle(toggleDiv, "display", "none");
					if (i == 0) {
						dojo.setStyle(toggleDiv, "paddingBottom", "10px");
					} else if (i == lastItem) {
						dojo.setStyle(toggleDiv, "paddingTop", "10px");
					}
					var radioLabel = dojo.create('label',{'for':radioButton.name,innerHTML:layerName},radioButton.domNode,"after");
					dojo.place("<br/>",radioLabel,"after");
					
				} else {
					
					var checkBox = new dijit.form.CheckBox({
						name:"checkBox" + layer.layer.id,
						value:layer.layer.id,
						checked:layer.layer.visible,
						onChange:function(evt){
							var checkLayer = map.getLayer(this.value);
							checkLayer.setVisibility(!checkLayer.visible);
							this.checked = checkLayer.visible;
							if (allLayers[layerName].wimOptions.includeLegend == true && allLayers[layerName].wimOptions.staticLegendOptions.hasStaticLegend == true) {
								if (checkLayer.visible) {
									$("#" + layer.layer.id + "Legend").show();
								} else {
									$("#" + layer.layer.id + "Legend").hide();
								}
								
							}				
						}
					});
					if (allLayers[layerName].wimOptions.zoomScale) {
						//create the holder for the checkbox and zoom icon
						var toggleDiv = dojo.doc.createElement("div");
						dojo.place(toggleDiv,dojo.byId("toggle"),"after");
						dojo.place(checkBox.domNode,toggleDiv,"first");
						var checkLabel = dojo.create('label',{'for':checkBox.name,innerHTML:layerName},checkBox.domNode,"after");
						var scale = allLayers[layerName].wimOptions.zoomScale;
						var zoomImage = dojo.doc.createElement("div");
						zoomImage.id = 'zoom' + layer.layer.id;
						zoomImage.innerHTML = '<img id="zoomImage" style="height: 18px;width: 18px" src="images/zoom.gif" />';
						dojo.connect(zoomImage, "click", function() {
							if (map.getScale() > scale) {
								map.setScale(scale);;
							}
						});
						dojo.place(zoomImage,toggleDiv,"last");
						dojo.setStyle(checkBox.domNode, "float", "left");
						dojo.setStyle(toggleDiv, "paddingLeft", "15px");
						dojo.setStyle(checkLabel, "float", "left");
						dojo.setStyle(toggleDiv, "paddingTop", "5px");
						dojo.setStyle(dojo.byId("zoomImage"), "paddingLeft", "10px");
						dojo.setStyle(toggleDiv, "height", "25px");
						if (i == 0) {
							dojo.setStyle(toggleDiv, "paddingBottom", "10px");
						} else if (i == lastItem) {
							dojo.setStyle(toggleDiv, "paddingTop", "10px");
						}
						dojo.place("<br/>",zoomImage,"after");
					} else {
						var toggleDiv = dojo.doc.createElement("div");
						dojo.place(toggleDiv,dojo.byId("toggle"),"after");
						dojo.place(checkBox.domNode,toggleDiv,"first");
						dojo.setStyle(toggleDiv, "paddingLeft", "15px");
						if (i == 0) {
							dojo.setStyle(toggleDiv, "paddingBottom", "10px");
						} else if (i == lastItem) {
							dojo.setStyle(toggleDiv, "paddingTop", "10px");
						}
						var checkLabel = dojo.create('label',{'for':checkBox.name,innerHTML:layerName},checkBox.domNode,"after");
						dojo.place("<br/>",checkLabel,"after");
					}
					
				}
			} else {
				var headingDiv = dojo.doc.createElement("div");
				headingDiv.innerHTML = layer.title;
				dojo.place(headingDiv,dojo.byId("toggle"),"after");
				dojo.setStyle(headingDiv, "paddingTop", "10px");
				dojo.setStyle(headingDiv, "color", "#D3CFBA");
				if (i == 0) {
					dojo.setStyle(headingDiv, "paddingBottom", "10px");
				} else if (i == lastItem) {
					dojo.setStyle(headingDiv, "paddingTop", "10px");
				}
			}
			i++;
		});
		
		//function to handle styling adjustments to the esri legend dijit
		setTimeout(function(){
			$.each($('div[id^="legendDiv_"]'), function (index, item) {
				for (layer in allLayers) {
					if (layer == $('#'+item.id+' span').html()) {
						if (allLayers[layer].wimOptions.esriLegendLabel !== undefined && allLayers[layer].wimOptions.esriLegendLabel == false) {
							$('#'+item.id+' table.esriLegendLayerLabel').remove();
						}
					}
				}
			});
			$("#legendDiv").show();
		}, 1000);
		
	});

	addAllLayers();

	//function to iterate through allLayers array and build array for legend as well as array for adding services based on esri and wim specific options
	function addAllLayers() {
			
		for (layer in allLayers) {
			if (allLayers[layer].wimOptions.type == "layer") {
				console.log(layer);
				var newLayer;
				if (allLayers[layer].wimOptions.layerType == "agisFeature") {
					newLayer = new esri.layers.FeatureLayer(allLayers[layer].url, allLayers[layer].arcOptions);
				} else if (allLayers[layer].wimOptions.layerType == "agisWMS") {
					newLayer = new esri.layers.WMSLayer(allLayers[layer].url, allLayers[layer].arcOptions);
					if (allLayers[layer].wimOptions.includeLegend == true && allLayers[layer].wimOptions.staticLegendOptions.hasStaticLegend == true) {
						var staticLegendImage = dojo.doc.createElement("div");
						staticLegendImage.id = allLayers[layer].arcOptions.id + 'Legend';
						staticLegendImage.innerHTML = '<b style="">' + allLayers[layer].wimOptions.staticLegendOptions.legendTitle + '</b><br/><img style="padding-top: 10px; width: ' + (parseInt($("#explanation").width())-25).toString() + 'px" src="' + allLayers[layer].wimOptions.staticLegendOptions.legendUrl + '" />';
						dojo.place(staticLegendImage,dojo.byId("legendDiv"),"after");
						if (allLayers[layer].arcOptions.visible == false) {
							$("#" + staticLegendImage.id).hide();
						}
					}
				} else {
					newLayer = new esri.layers.ArcGISDynamicMapServiceLayer(allLayers[layer].url, allLayers[layer].arcOptions);
					if (allLayers[layer].visibleLayers) {
						newLayer.setVisibleLayers(allLayers[layer].visibleLayers);
					}
				}
				
				//set wim options
				if (allLayers[layer].wimOptions) {
					if (allLayers[layer].wimOptions.includeInLayerList == true) {
						if (allLayers[layer].wimOptions.layerOptions && allLayers[layer].wimOptions.layerOptions.selectorType == "radio" ) {

							radioGroup = allLayers[layer].wimOptions.layerOptions.radioGroup;
							radioGroupArray.push({group: radioGroup, layer:newLayer});

							addToObjects({layer: newLayer, type:"layer", title: layer, toggleType: "radio", group: radioGroup}, allLayers[layer].wimOptions)
							
						} else {
							addToObjects({layer: newLayer, type:"layer", title: layer, toggleType: "checkbox", group: ""}, allLayers[layer].wimOptions)
						}
					}
				} else {
					addToObjects({layer: newLayer, title: layer}, allLayers[layer].wimOptions)
				}
				layerArray.push(newLayer);
			} else if (allLayers[layer].wimOptions.type == "radioParent") {
				
				radioGroup = allLayers[layer].wimOptions.layerOptions.radioGroup;
				radioGroupArray.push({group: radioGroup, layer: null});
				
				layersObject.push({layer: null, type: "radioParent", title: layer, toggleType: "radioParent", group: radioGroup});
				
			} else {
				
				layersObject.push({layer: "heading", type: "heading", title: layer});
				
			}
		}
		
		map.addLayers(layerArray);
		
		function addToObjects(fullObject, wimOptions) {
			layersObject.push(fullObject); 
			if (wimOptions.includeLegend != false) {
				legendLayers.push(fullObject); 
			}
		}
		
	}

}

dojo.ready(initLayers);