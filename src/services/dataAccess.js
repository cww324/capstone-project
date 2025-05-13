// Put all of your fun fetch calls inside of here:

const API = 'http://localhost:8088';

export const getAllLodgings = () => {
  return fetch(`${API}/lodgings`).then((res) => res.json());
};

export const getAllMatches = () => {
  return fetch(`${API}/matches`).then((res) => res.json());
};

export const getAllTrips = () => {
  return fetch(`${API}/trips?_expand=match`).then((res) => res.json());
};
// For posting created Trips to the Database
export const postTrip = (tripObj) => {
  return fetch(`${API}/trips`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripObj),
  }).then((res) => res.json());
};
