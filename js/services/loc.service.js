import {storageService} from './storage.service.js';

export const locService = {
  getLocs,
  addNewLoc,
  getCurrLoc,
  convertToTime,
  deleteLocFromStorage,
  addWeatherToLoc,
};

// let gId = 1;
const KEY = 'locs';

// {name: 'Neveragain', lat: 32.047201, lng: 34.832581},
// {id, name, lat, lng, weather, createdAt, updatedAt},
//   {name: 'Greatplace', lat: 32.047104, lng: 34.832384},
const locs = storageService.loadFromStorage(KEY) || [];

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs);
    }, 2000);
  });
}

function addNewLoc(loc) {
  //add to the locs arr
  const newLoc = {
    id: storageService.loadFromStorage(KEY) ? locs[locs.length - 1].id + 1 : 1,
    name: loc.name,
    lat: loc.lat,
    lng: loc.lng,
    weather: '',
    createdAt: Date.now(),
    updatedAt: '',
  };
  locs.push(newLoc);
  console.log(locs);
  storageService.saveToStorage(KEY, locs);
  return newLoc;
}

function getCurrLoc() {
  return new Promise((resolve, reject) => {
    if (!locs.length) reject(null);
    resolve(locs[locs.length - 1]);
  });
}

// function getAllLoc() {
//   return Promise.resolve(locs);
// }

function deleteLocFromStorage(id) {
  for (var i = 0; i < locs.length; i++) {
    if (id === locs[i].id) {
      locs.splice(i, 1);
      storageService.saveToStorage(KEY, locs);
      return;
    }
  }
}

function convertToTime(time) {
  var date = new Date(parseInt(time));
  return date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function addWeatherToLoc(weather) {
  locs[locs.length - 1].weather = weather;
}
