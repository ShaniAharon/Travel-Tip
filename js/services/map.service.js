import {locService} from './loc.service.js';

export const mapService = {
  initMap,
  addMarker,
  panTo,
  getSearchLoc,
  goToLoc,
};

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap');
  return _connectGoogleApi().then(() => {
    console.log('google available');
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: {lat, lng},
      zoom: 15,
    });

    gMap.addListener('click', (mapsMouseEvent) => {
      console.log('enter loc');
      const position = mapsMouseEvent.latLng.toJSON();
      console.log(position.lat);
      const locName = prompt('Enter a name');
      console.log(name);
      const loc = {
        name: locName,
        lat: position.lat,
        lng: position.lng,
      };
      const clickedLoc = locService.addNewLoc(loc);
      console.log(clickedLoc);
      const desLoc = {
        lat: clickedLoc.lat,
        lng: clickedLoc.lng,
      };
      goToLoc(clickedLoc); //not sure if its good to do this way
      addMarker(desLoc);
      // setPlace(position, name);
      // renderList();
    });

    console.log('Map!', gMap);
  });
}

function goToLoc(loc) {
  mapService.panTo(loc.lat, loc.lng);
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  });
  return marker;
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng);
  gMap.panTo(laLatLng);
}

function getSearchLoc(locName) {
  //use the api to get loc lat lang
  const prm = axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${locName}&key=AIzaSyAIoL8dIQWHfUCUNIl2CUZTkPBLo6q3d6I
  `
    )
    .then((res) => {
      console.log('Axios Res:', res);
      const pos = res.data.results[0].geometry.location;
      const loc = {
        name: locName,
        lat: pos.lat,
        lng: pos.lng,
      };
      return loc;
    });
  return prm;
  // locService.addNewLoc(locObj);
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = 'AIzaSyAIoL8dIQWHfUCUNIl2CUZTkPBLo6q3d6I'; //TODO: Enter your API Key
  var elGoogleApi = document.createElement('script');
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject('Google script failed to load');
  });
}
