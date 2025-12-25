// ======================
// CEK LOGIN
// ======================
if (window.location.pathname.includes("home.html")) {
  if (localStorage.getItem("login") !== "true") {
    window.location.href = "index.html";
  }
}

// ======================
// MAP
// ======================
var map = L.map('map').setView([-7.6959, 111.9424], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// ======================
// KOORDINAT BIDANG TANAH
// (FORMAT LEAFLET: [LAT, LNG])
// ======================
var koordinatLeaflet = [
  [-7.6956, 111.9419],
  [-7.6955, 111.9432],
  [-7.6964, 111.9433],
  [-7.6965, 111.9420]
];

// ======================
// POLYGON
// ======================
var polygon = L.polygon(koordinatLeaflet, {
  color: "#ffffff",
  weight: 2,
  fillColor: "#b71c1c",
  fillOpacity: 0.6
}).addTo(map);

map.fitBounds(polygon.getBounds());

// ======================
// TITIK SUDUT
// ======================
koordinatLeaflet.forEach((titik, index) => {
  L.circleMarker(titik, {
    radius: 5,
    color: "#000",
    fillColor: "#fff",
    fillOpacity: 1
  }).addTo(map)
    .bindPopup("Titik " + (index + 1));
});

// ======================
// HITUNG LUAS (TURF)
// FORMAT TURF: [LNG, LAT]
// ======================
var koordinatTurf = [
  [
    [111.9419, -7.6956],
    [111.9432, -7.6955],
    [111.9433, -7.6964],
    [111.9420, -7.6965],
    [111.9419, -7.6956] // WAJIB DITUTUP
  ]
];

var turfPolygon = turf.polygon(koordinatTurf);
var luas = turf.area(turfPolygon);

document.getElementById("luas").innerText =
  luas.toFixed(2);

// ======================
// LOGOUT
// ======================
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
