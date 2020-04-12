import Vue from 'vue'
import Vuex from 'vuex'

import {
  postPerson,
  postConnection,
  getPersons,
  getConnections,
  updateConnectionType
} from '../api'

Vue.use(Vuex)

// TODO: should be in some 'utils'
const sortByCreated = (a, b) =>
  (a.created_at > b.created_at) ? 1 :
  (b.created_at > a.created_at ? -1 : 0)

const store = new Vuex.Store({
  state: {
    persons: [],
    connections: []
  },
  mutations: {
    setPersons(state, data) {
      state.persons = data.sort(sortByCreated)
    },
    setConnections(state, data) {
      state.connections = data.sort(sortByCreated)
    },
    addPerson(state, person) {
      state.persons = [
        ...state.persons,
        person
      ].sort(sortByCreated)
    },
    addConnection(state, connection) {
      state.connections = [
        ...state.connections,
        connection
      ].sort(sortByCreated)
    },
    updateConnection(state, data) {
      const { id, connectionType } = data
      state.connections = [
        ...state.connections.filter(i => i.id != id),
        ...{
          ...state.connections.find(i => i.id = id),
          connection_type: connectionType
        }
      ].sort(sortByCreated)
    },
  },
  actions: {
    async loadPersons({ commit }) {
      // TODO: check code
      const response = await getPersons()
      commit("setPersons", response.data)
    },
    async loadConnections({ commit }) {
      // TODO: check code
      const response = await getConnections()
      commit("setConnections", response.data)
    },
    async addPerson({ commit }, data) {
      const response = await postPerson(data)
      commit("addPerson", response.data)
    },
    async addConnection({ commit }, data) {
      const response = await postConnection(data)
      commit("addConnection", response.data)
    },
    async updateConnectionType({ commit }, data) {
      const { id, connectionType } = data
      const response = await updateConnectionType(id, {
        connection_type: connectionType
      })
      commit("addConnection", response.data)
    },
  }
})

export default store
