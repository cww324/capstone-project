// Put all of your fun fetch calls inside of here:

const API = "http://localhost:8088"

export const getAllLodgings = () => {
    return fetch(`${API}/lodgings`)
        .then(res => res.json())
    }

export const getAllMatches = () => {
    return fetch(`${API}/matches`)
        .then(res => res.json())
    }