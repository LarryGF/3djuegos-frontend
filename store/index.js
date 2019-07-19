export const state = () => ({
  games: null,
  filters: null,
  lower: 0,
  upper: 1,
  text_filter: ''
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
  },
  setTextFilter(state, value) {
    state.text_filter = value
  },
  setSpecificFilter(state, values) {
    state.filters[values.filter][values.key] = values.value
  },


}

export const getters = {
  getGamesToShow(state) {
    if (state.games) {
      // DEBUG: Puse que el filtro tenía que tener más de 4 elementos
      if (state.text_filter) {
        return state.games.filter(game =>
          game.name.toLowerCase().includes(state.text_filter.toLowerCase())
        )
      } else {
        return state.games.slice(state.lower, state.upper).filter(game => {
          for (var genre_index in game.genre) {
            if (!state.filters.genres[game.genre[genre_index]]) {
              return false
            } 
          } return true
        }).filter(game => {
          for (var platform_index in game.gamePlatform) {
            if (!state.filters.platforms[game.gamePlatform[platform_index]]) {
              return false
            } 
          } return true
        }).filter(game => 
          state.filters.os[game.operatingSystem]
        )
      }
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
  },
  getTextFilter(state) {
    if (state.text_filter) {

      return state.text_filter
    } else {
      return ''
    }
  }
}
export const actions = {
  async fetchGames({
    commit
  }) {
    this.$axios.get("/db/db.json").then(
      (response) => {
        let result = response.data
        commit('setGames', result)
      }
    )
    // var result = require('../static/db/db.json')
    commit('setGames', result)

  },
  async fetchFilters({
    commit
  }) {
    // this.$axios.get("/db/filters.json").then(
    //   (response) => {
    //     let result = response.data
    //     var dictio = {}
    //     for (var filter in result) {
    //       dictio[filter] = {}
    //       result[filter].map(element =>
    //         dictio[filter][element] = true)
    //     }
    //     commit('setFilters', dictio)
    //   }
    var result = require('../static/db/filters.json')
    var dictio = {}
        for (var filter in result) {
          dictio[filter] = {}
          result[filter].map(element =>
            dictio[filter][element] = true)
        }
    commit('setFilters',dictio)
    // )

  },
  callSetLimits({
    commit
  }, fromTo) {
    commit('setLimits', fromTo)
  },
  callSetTextFilter({
    commit
  }, value) {

    commit('setTextFilter', value)
  },
  callSetFilters({
    commit
  }, values) {
    commit('setSpecificFilter', values)
  },


}