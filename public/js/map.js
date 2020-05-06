const mymap = L.map('map').setView([51.0, -1.0], 4);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {
  attribution,
  noWrap: true,
  maxZoom: 18,
  minZoom: 2,
  worldCopyJump: true,
  maxBoundsViscosity: 1.0
});
mymap.setMaxBounds([[-90, -180], [90, 180]]);
tiles.addTo(mymap);

// Fetch places from places api
async function getPlaces() {
  const res = await fetch('/places');
  const data = await res.json();

  const pointList = [];
  for (item of data.data) {
    const lat = item.location.coordinates[1];
    const lon = item.location.coordinates[0];
    pointList.push([lat, lon]);

    const marker = L.marker([lat, lon], { title: item.placeId }).addTo(mymap);

    let txt = ` <h2>${item.placeId}</h2>
                <P><span class="dark">Address:</span></P>
                <p>${item.location.formattedAddress}</p>
                <p><span class="dark">Coordinates:</span></p>
                <p><span class="dark">Latitude</span>: ${lat} &nbsp;&nbsp; <span class="dark">Longitude</span>: ${lon}</p>
                <a href="#" class="delete" data-id="${item._id}">Delete</a>`;

    marker.bindPopup(txt);
  }
}

getPlaces();
