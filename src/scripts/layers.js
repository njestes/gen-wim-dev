/**
 * Created by bdraper on 4/27/2015.
 */
var allLayers;

require([
    "esri/geometry/Extent",
    "esri/layers/WMSLayerInfo",
    "esri/layers/FeatureLayer",
    'dojo/domReady!'
], function(
    Extent,
    WMSLayerInfo,
    FeatureLayer
) {

    allLayers = [
        {
            "groupHeading": "WMS layers",
            "showGroupHeading": true,
            "includeInLayerList": true,
            "layers": {
                "ESRI Sample WMS": {
                    "url" : "http://sampleserver1.arcgisonline.com/ArcGIS/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/WMSServer",
                    "options":{
                        "id": "esriSampleWMS",
                        //"format": "image/png",
                        "transparent":true,
                        "opacity": 0.6,
                        "visible": true,
                        //"extent": "-126.40869140625, 31.025390625, -109.66552734375, 41.5283203125",
                        //"wkid": 4326,
                        "resourceInfo":  {
                            "extent": new Extent(-126.40869140625, 31.025390625, -109.66552734375, 41.5283203125, {
                                "wkid": 4326
                            }),
                            "layerInfos": [new WMSLayerInfo({
                                "name": "1",
                                "title": "Rivers"
                            }), new WMSLayerInfo({
                                "name": "2",
                                "title": "Cities"
                            })]
                        },
                        "visibleLayers": ["1", "2"]
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisWMS",
                        "includeInLayerList": true,
                        "includeLegend" : true
                    }
                },
                "NOAA Flood Warnings": {
                    "url" : "http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/wwa",
                    "options":{
                        "id": "noaaFloodWarn",
                        "transparent":true,
                        "opacity": 0.6,
                        "visible": true,
                        "resourceInfo":  {
                            "extent": new Extent( -126.40869140625, 31.025390625, -109.66552734375, 41.5283203125, {
                                "wkid": 4326
                            }),
                            "layerInfos": [new WMSLayerInfo({
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
                            "legendTitle": "NOAA Flood Warnings (not the right legend, by the way)",
                            "legendUrl": "http://nowcoast.noaa.gov/LayerInfo?layer=NHC_TRACK_POLY&data=legend"
                        }
                    }
                }
            }
        },
        {
            "groupHeading": "feature layers",
            "showGroupHeading": true,
            "includeInLayerList": true,
            "layers": {
                "FIM Sites": {
                    "url" : "http://fim.wimcloud.usgs.gov/arcgis/rest/services/FIMMapper/sites/MapServer/0",
                    "options": {
                        "id": "fimSites",
                        "opacity": 0.75,
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "hasZoomto": true,
                        "includeLegend" : true
                    }
                }
            }
        },
        {
            "groupHeading": "radio button example",
            "showGroupHeading": true,
            "includeInLayerList": true,
            "layers": {
                "Cat 1":{
                    "url" : "http://olga.er.usgs.gov/stpgis/rest/services/Vulnerability/NACCH_change_probabilities/MapServer",
                    "visibleLayers": [5,6,7],
                    "options":{
                        "id": "cat1",
                        "opacity": 1.0,
                        "visible": true
                    },
                    "wimOptions":{
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "exclusiveGroupName":"Coastal Erosion Hazard",
                        "includeLegend" : true
                    }
                },
                "Cat 2": {
                    "url" : "http://olga.er.usgs.gov/stpgis/rest/services/Vulnerability/NACCH_change_probabilities/MapServer",
                    "visibleLayers": [13,14,15],
                    "options":{
                        "id": "cat2",
                        "opacity": 1.0,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "exclusiveGroupName":"Coastal Erosion Hazard",
                        "includeLegend" : true
                    }
                }
            }
        },
        {
            "groupHeading": "ESRI dynamic map services",
            "showGroupHeading": true,
            "includeInLayerList": true,
            "layers": {
                "Wetlands" : {
                    "url": "http://107.20.228.18/ArcGIS/rest/services/Wetlands/MapServer",
                    "options": {
                        "id": "Wetlands",
                        "opacity": 0.75,
                        "minScale": 144448,
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "zoomScale": 144448,
                        "hasOpacitySlider": true,
                        "hasZoomto" : true,
                        "includeLegend" : true
                    }
                },
                "NAWQA networks" : {
                    "url": "http://50.17.205.92/arcgis/rest/services/NAWQA/tablesTest/MapServer",
                    "options": {
                        "id": "nawqaNetworks",
                        "layers": [1],
                        "visible": false,
                        "opacity": 0.6
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "hasZoomto": true,
                        "includeLegend" : false
                    }
                }
            }
        },
        {
            "groupHeading": "ESRI image service",
            "showGroupHeading": true,
            "includeInLayerList": true,
            "layers": {
                "FIM Grids" : {
                    "url": "http://54.164.188.167:6080/arcgis/rest/services/FIMTest/gridsTest/ImageServer",
                    "options": {
                        "id": "grids",
                        "opacity": 1.0,
                        "visible": true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisImage",
                        "includeInLayerList": true,
                        "includeLegend" : true
                    }
                }
            }
        }
    ]

});





