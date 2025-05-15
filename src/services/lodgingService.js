export const getAllLodgings = () => {
  return fetch('http://localhost:8088/lodgings').then((res) => res.json());
};
