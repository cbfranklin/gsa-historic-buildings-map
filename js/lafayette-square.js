var lafayetteSquareMap;
var emptyRegEx = "^\\s+$";
$(function() {
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2NvdHR6YWNoZWsiLCJhIjoiY2ludDF6eDJxMTFmZnVrbTMwcGV5OWpqYSJ9.t4IyHjLn3Y_6dUQNk7H0og';
    lafayetteSquareMap = L.mapbox.map('lafayetteSquareMap', 'mapbox.streets');

    var tableTemplate = $('#templates .template-table').html();
    var tableContent = Mustache.render(tableTemplate, lafayetteSquareData);
    $('#lafayetteSquareTable').html(tableContent)

    $('#lafayetteSquareTable table').addClass('stripe').DataTable({
        "info": false,
        "searching": false,
        "paging": false,
        "responsive": true,
        "scrollY": 200,
        "order": [
            [1, "asc"]
        ]
    });

    lafayetteSquareMap.whenReady(function() {
        lafayetteSquareMap.setView([38.899470, -77.036525], 18);

        // Disable drag and zoom handlers.
        /*lafayetteSquareMap.dragging.disable();
        lafayetteSquareMap.touchZoom.disable();
        lafayetteSquareMap.doubleClickZoom.disable();
        lafayetteSquareMap.scrollWheelZoom.disable();
        lafayetteSquareMap.keyboard.disable();*/
        
        var mainMarkerLayer = L.mapbox.featureLayer().addTo(lafayetteSquareMap);
        
        //var lafayetteMarkerLayer = L.mapbox.featureLayer().addTo(lafayetteSquareMap);
        //var lafayetteMarkerCluster = new L.MarkerClusterGroup();

        addMarkersTo(lafayetteSquareData,mainMarkerLayer)
        //addMarkersTo(lafayetteSquareData,lafayetteMarkerLayer,lafayetteMarkerCluster)
        
        function addMarkersTo(markerArray,layer,cluster) {
            for (i in markerArray) {
                
                if(cluster){
                    var layerOrCluster = cluster;
                }
                else{
                    var layerOrCluster = layer;
                }

                var data = markerArray[i]
                var lat = data['Lat'];
                var lng = data['Lng']
                if (!lat.match(emptyRegEx) && lat !== NaN && lat !== '' && !lng.match(emptyRegEx) && lng !== NaN && lng !== '') {
                    var latlng = [lat, lng];
                    var popupTemplate = $('#templates .template-popup').html();
                    var popupContent = Mustache.render(popupTemplate, data);
                    var markerTemplate = $('#templates .template-marker').html();
                    var markerContent = Mustache.render(markerTemplate, data);
                    var icon = L.divIcon({
                        iconSize: [30, 30],
                        popupAnchor: [0, 25],
                        //iconAnchor: [35, 10],
                        className: 'historic-buildings-marker',
                        html: markerContent
                    })
                    L.marker(latlng, {
                        icon: icon,
                    }).bindPopup(popupContent, {
                        closeButton: true,
                        minWidth: 280
                    }).addTo(layerOrCluster);
                }
                else{
                    console.log(data['Building Name'])
                }
            }

            if(cluster){
                layerOrCluster.addTo(layer)
            }

            layer.on('click', function(e) {
                e.layer.openPopup();
            });

            /*layer.on('mouseout', function(e) {
                e.layer.closePopup();
            });*/
        }
    });

});