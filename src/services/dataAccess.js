// Put all of your fun fetch calls inside of here:

const API = 'http://localhost:8088';

export const updateParticipantApproval = (participantId, approved) => {
  return fetch(`http://localhost:8088/participants/${participantId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ approved }),
  }).then((res) => res.json());
};

export const getAllLodgings = () => {
  return fetch(`${API}/lodgings`).then((res) => res.json());
};

export const getAllMatches = () => {
  return fetch(`${API}/matches`).then((res) => res.json());
};

export const getAllTrips = () => {
  return fetch(`${API}/trips?_expand=match&_expand=user`).then((res) =>
    res.json()
  );
};
export const getAllParticipants = () => {
  return fetch(`${API}/participants?_expand=user`).then((res) => res.json());
};

// For posting created Trips to the Database

export const addNewTrip = (tripObj) => {
  return fetch(`${API}/trips`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripObj),
  }).then((res) => res.json());
};

export const requestToJoinTrip = (tripId, userId) => {
  return fetch(`${API}/participants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tripId,
      userId,
      approved: false,
    }),
  }).then((res) => res.json());
};
