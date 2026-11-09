/* map.js - interactive map for the Contact page */

document.addEventListener("DOMContentLoaded", function () {

    const mapElement = document.getElementById("map");
    if (!mapElement) return;   // page has no map, do nothing

    // 1. The places shown on the map.
    const locations = [
        { name: "New Beginnings Foundation Head Office", description: "Johannesburg CBD",
          lat: -26.2041, lng: 28.0473 },
        { name: "Community Support Centre", description: "Braamfontein",
          lat: -26.1929, lng: 28.0305 },
        { name: "Rehabilitation Programme Site", description: "Soweto",
          lat: -26.2485, lng: 27.8540 }
    ];

    // 2. Create the map
    const map = L.map("map").setView([locations[0].lat, locations[0].lng], 12);

    // 3. Add the map tiles (OpenStreetMap, free, no key needed)
            L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 18,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, HERE, Garmin, OpenStreetMap contributors'
    }).addTo(map);

    // 4. Add a marker with a popup for each location
    const bounds = [];
    locations.forEach(function (place) {
        L.marker([place.lat, place.lng])
            .addTo(map)
            .bindPopup("<strong>" + place.name + "</strong><br>" + place.description);
        bounds.push([place.lat, place.lng]);
    });

    // 5. Zoom so every marker is visible
    map.fitBounds(bounds, { padding: [40, 40] });
});