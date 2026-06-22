function initMap() {

    const map = new google.maps.Map(
        document.getElementById("map"),
        {
            zoom: 13,
            center: coordinates
        }
    );

    new google.maps.Marker({
        position: coordinates,
        map: map
    });
}