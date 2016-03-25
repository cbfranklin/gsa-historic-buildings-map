var historicPreservationMap;
var emptyRegEx = "^\\s+$";
$(function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoiY29ubm9yM2VwIiwiYSI6ImNpbTU4YXNxOTAxbGJ1am0zazFvaWdteXkifQ.80poTj-_kKTVI5fELbD5YA';
    //([coords for map center], zoom-level])
    historicPreservationMap = L.mapbox.map('historicPreservationMap', 'mapbox.streets').setView([38.893106, -77.032891], 15);
    var markerLayer = L.mapbox.featureLayer().addTo(historicPreservationMap);
    // Disable drag and zoom handlers.
    /*map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.keyboard.disable();*/

    // Disable tap handler, if present.
    //if (map.tap) map.tap.disable();

    //json call to geoJSON objects where loc is array of coordinates [lat,lng]
    //$.getJSON(req, function(data) {
    //console.log(data)
    for (i in historicBuildingsData) {
        var data = historicBuildingsData[i]
        var lat = data['Lat'];
        var lng = data['Lng']
        if (!lat.match(emptyRegEx) && lat !== NaN && lat !== '' && !lng.match(emptyRegEx) && lng !== NaN && lng !== '') {
            var latlng = [lat, lng];
            console.log('accepted', data['Building Name'], lat, lng)
            var template = $('#templates .template-popup').html();
            var popupContent = Mustache.render(template, data);
            L.marker(latlng).bindPopup(popupContent, {
                closeButton: false,
                minWidth: 320
            }).addTo(markerLayer);
        } else {
            console.log('rejected:', data['Building Name'])
        }
    }
    markerLayer.on('mouseover', function(e) {
        e.layer.openPopup();
    });
    markerLayer.on('mouseout', function(e) {
        e.layer.closePopup();
    });
    //});
});
