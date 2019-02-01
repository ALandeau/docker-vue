import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const API_URL = "http://localhost:3000/todos";

export default new Vuex.Store({
  state: {
    activities: []
  },
  mutations: {
    REFRESH_ACTIVITIES(state, activities) {
      Vue.set(state, 'activities', activities)
    }
  },
  actions: {
    addActivity({commit}, {activity}) {axios
        .post(`${API_URL}/save`, activity)
        .then(response => commit('REFRESH_ACTIVITIES', response.data))
    },
    deleteActivity({commit}, {activity }) {
      axios
        .get(`${API_URL}/delete/${activity.id}`)
        .then(response => commit('REFRESH_ACTIVITIES', response.data));

    },
    changeActivityState({commit}, {activity}) {
      activity.completed =  activity.completed == "true" ? "false" : "true"
      axios
        .post(`${API_URL}/update/`, activity)
        .then(response => commit('REFRESH_ACTIVITIES', response.data))
    },
    initStore({commit}) {
      axios
        .get(API_URL)
        .then(response => commit('REFRESH_ACTIVITIES', response.data))
    }
  },
  getters: {
    getActivities(state) {
      return state.activities;
    }
  }
})