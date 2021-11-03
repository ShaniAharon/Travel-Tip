import {storageService} from './storage.service.js';

export const locService = {
  getLocs,
  addNewLoc,
  getCurrLoc,
};

let gId = 1;
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
    id: gId++,
    name: loc.name,
    lat: loc.lat,
    lng: loc.lng,
    weather: '',
    createdAt: Date.now,
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
