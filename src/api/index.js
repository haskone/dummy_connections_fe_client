import axios from "axios";

import { HOST } from "../constants"

const PERSON_URL = `${HOST}/people`;
const CONNECTION_URL = `${HOST}/connections`;

// Persons
export function postPerson(data) {
  return axios.post(PERSON_URL, data)
}

export function getPersons() {
  return axios.get(PERSON_URL)
}

// Connections
export function postConnection(data) {
  return axios.post(CONNECTION_URL, data)
}

export function updateConnectionType(id, data) {
  return axios.put(`${CONNECTION_URL}/`, data)
}

export function getConnections() {
  return axios.get(CONNECTION_URL)
}
