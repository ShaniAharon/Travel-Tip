import {locService} from './loc.service.js';

export const mapService = {
  initMap,
  addMarker,
  panTo,
  getSearchLoc,
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
    console.log('Map!', gMap);
  });
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
  // locService.addNewLoc(locObj);
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = ''; //TODO: Enter your API Key
  var elGoogleApi = document.createElement('script');
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAIoL8dIQWHfUCUNIl2CUZTkPBLo6q3d6I`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject('Google script failed to load');
  });
}
