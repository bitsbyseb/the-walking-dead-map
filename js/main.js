'use strict';
import "./Popup.component.js";

/**
 * @typedef placeInfo
 * @property {string} nombre
 * @property {string} estado
 * @property {number[]} coordenadas
 * @property {string} temporadas
 * @property {string} descripcion
 * @returns {Promise<placeInfo[]>}
 */
async function getPlacesData() {
  const res = await fetch('https://bitsbyseb.github.io/the-walking-dead-map/data.json');
  const data = await res.json();
  console.log(data);
  return data;
}

const map = L.map('map').setView([34.0, -84.0], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 18,
}).addTo(map);


const places = await getPlacesData();
const coordenadas = places.map(x => x.coordenadas);
for (const place of places) {
  const circle = L.circle(place.coordenadas, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 2 * 1000
  });
  circle.addTo(map);

  const temporalParentNode = document.createElement('div');

  const component = document.createElement('popup-element');
  component.setAttribute('nombre', place.nombre);
  component.setAttribute('estado', place.estado);
  component.setAttribute('temporadas', place.temporadas);
  component.setAttribute('descripcion', place.descripcion);
  component.setAttribute('coordenadas', place.coordenadas);

  temporalParentNode.appendChild(component);

  circle.bindPopup(`${temporalParentNode.innerHTML}`);
}

const path = L.polyline(coordenadas, {
  color: 'blue',      // color del trazo
  weight: 4,         // grosor
  opacity: 0.8,      // transparencia
  dashArray: '5, 10' // linea discontinua
}).addTo(map);
