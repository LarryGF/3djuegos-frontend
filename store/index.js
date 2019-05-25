export const state = () => ({
  games: null,
  filters:null,
  lower: 0,
  upper: 1
})

export const mutations = {
  setGames(state, gamesList) {
    state.games = gamesList
  },
  setFilters(state, filtersList) {
    state.filters = filtersList
  },
  setLimits(state, fromTo) {
    state.lower = fromTo.from
    state.upper = fromTo.to
  }

}

export const getters = {
  getGamesToShow(state) {
    if (state.games) {

      return state.games.slice(state.lower, state.upper)
    } else {
      return null
    }
    // return state.games.splice()

  },
  getFilters(state) {
    if (state.filters) {
      return state.filters
    } else {
      return null
    }
  },
  gamesAvailable(state) {
    if (state.games) {
      return true
    } else {
      return false
    }
  },
  filtersAvailable(state) {
    if (state.filters) {
      return true
    } else {
      return false
    }
  }
}
export const actions = {
  async fetchGames({
    commit
  }) {
    var result = (await this.$axios.get("/db/db.json")).data
    commit('setGames', result)
  },
  async fetchFilters({ commit }) {
    var result = (await this.$axios.get("/db/filters.json")).data
    commit('setFilters',result)
    
  },
  callSetLimits({
    commit
  }, fromTo) {
    commit('setLimits', fromTo)
  }
}