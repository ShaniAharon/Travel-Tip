import {storageService} from './storage.service.js';

export const locService = {
  getLocs,
  addNewLoc,
};

const locs = [
  {name: 'Greatplace', lat: 32.047104, lng: 34.832384},
  {name: 'Neveragain', lat: 32.047201, lng: 34.832581},
];

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs);
    }, 2000);
  });
}

function addNewLoc(loc) {
  //add to the locs arr
}

function getAllLoc() {
  return Promise.resolve(locs);
}
