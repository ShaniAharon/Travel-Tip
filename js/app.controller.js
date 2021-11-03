import {locService} from './services/loc.service.js';
import {mapService} from './services/map.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSearch = onSearch;
window.onCopyLoc = onCopyLoc;

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready');
      onOpenPage();
    })
    .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos');
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function onAddMarker() {
  console.log('Adding a marker');
  mapService.addMarker({lat: 32.0749831, lng: 34.9120554});
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    console.log('Locations:', locs);
    document.querySelector('.locs').innerText = JSON.stringify(locs);
  });
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords);
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
      mapService.panTo(pos.coords.latitude, pos.coords.longitude);
      mapService.addMarker({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    })
    .catch((err) => {
      console.log('err!!!', err);
    });
}

function onPanTo() {
  console.log('Panning the Map');
  mapService.panTo(35.6895, 139.6917);
}

function onSearch() {
  const searchValue = document.querySelector('.search-input').value;
  console.log(searchValue);
  const prmSearch = mapService.getSearchLoc(searchValue);
  prmSearch.then(locService.addNewLoc).then(mapService.goToLoc);
  //   getSearchLoc(searchValue);
  //   getAllLoc().then(renderTable);
}

function onCopyLoc() {
  const currLocPrm = locService.getCurrLoc();
  currLocPrm.then(createCLipLink);
  console.log('here');
}

function createCLipLink(loc) {
  if (!loc) {
    console.log('no data');
    return;
  }
  const urlWithLoc = `https://shaniaharon.github.io/Travel-Tip/?lat=${loc.lat}&lng=${loc.lng}`;
  const elLink = document.querySelector('.clip-link');
  elLink.href = urlWithLoc;
  elLink.innerHTML = 'your clip link';
}

function onOpenPage() {
  const loc = getLocFromUrl();
  console.log(loc);
  if (!loc) return;
  console.log(loc);
  mapService.goToLoc(loc);
}

// function getParameterByName(name, url = window.location.href) {
//   name = name.replace(/[\[\]]/g, '\\$&');
//   var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
//     results = regex.exec(url);
//   console.log(results);
//   console.log(url);
//   if (!results) return null;
//   if (!results[2]) return '';
//   return decodeURIComponent(results[2].replace(/\+/g, ' '));
// }

function getLocFromUrl(url = window.location.href) {
  console.log(url);
  const idxOflat = url.indexOf('lat');
  const idxOflng = url.indexOf('lng');
  //search for a function that give the url parm, url obj
  if (idxOflat < 0 || idxOflng < 0) return null;
  const idxOfAnd = url.indexOf('&');
  const lat = url.substring(idxOflat + 4, idxOfAnd);
  const lng = url.substring(idxOflng + 4);
  const loc = {
    lat,
    lng,
  };
  return loc;
}

function renderTable(res) {
  // {id, name, lat, lng, weather, createdAt, updatedAt}
}
