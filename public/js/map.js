const mymap = L.map('map').setView([51.5, -0.11], 3);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution, maxZoom: 18, minZoom: 3 });
tiles.addTo(mymap);

// Fetch places from API
async function getPlaces() {
  const res = await fetch('/places');
  const data = await res.json();

  // console.log(data);
  const pointList = [];
  for (item of data.data) {
    const lat = item.location.coordinates[1];
    const lon = item.location.coordinates[0];
    pointList.push([lat, lon]);

    const marker = L.marker([lat, lon]).addTo(mymap);

    let txt = ` <h2>${item.placeId}</h2>
                <P><span>Address:</span></P>
                <p>${item.location.formattedAddress}</p>
                <p><span>Coordinates:</span></p>
                <p><span>Latitude</span>: ${lat} &nbsp;&nbsp; <span>Longitude</span>: ${lon}</p>`;

    marker.bindPopup(txt);
  }
}


getPlaces();
