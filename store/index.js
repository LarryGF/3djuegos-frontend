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

        var expres = '';
        var rexpres = RegExp('');
        const applied_letter_filter  = Object.values(state.filters.letter).some((val) => val);

        if(applied_letter_filter) {
          for (var letter_index in state.filters.letter) {
            //console.log(letter_index);
            //console.log(state.filters.letter[letter_index]);
            if(state.filters.letter[letter_index]){
              expres += state.filters['letter_data'][letter_index];
            }
          }
          rexpres = RegExp('['+expres+']');
        }

        const applied_genre_filter  = Object.values(state.filters.genres).some((val) => val);

        if(!applied_genre_filter && !applied_letter_filter){
          return state.games.slice(state.lower, state.upper);
        }

        if(applied_genre_filter && !applied_letter_filter){
          return state.games.filter(game => {
            for (var genre_index in game.genre) {
              if (!state.filters.genres[game.genre[genre_index]]) {
                return false;
              }
            } return true;
          }).slice(state.lower, state.upper);
        }

        if(!applied_genre_filter && applied_letter_filter){
          return state.games.filter(game => {
            return !!game.name[0].match(rexpres);
          }).slice(state.lower, state.upper);
        }

        return state.games.filter(game => {
          return !!game.name[0].match(rexpres);
        }).filter(game => {
          for (var genre_index in game.genre) {
            if (!state.filters.genres[game.genre[genre_index]]) {
              return false;
            }
          } return true;
        }).slice(state.lower, state.upper);

        /*return state.games.slice(state.lower, state.upper).filter(game => {
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
        )*/
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
            dictio[filter][element] = false)
        }
        dictio['letter'] = {}
        dictio['letter_data'] = {}
        for(var filter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'){
          dictio['letter'][filter]=false;
          dictio['letter_data'][filter]=filter+filter.toLowerCase();
        }
        dictio['letter']['0-9'] = false;
        dictio['letter_data']['0-9'] = '0-9';
        dictio['letter']['.'] = false;
        dictio['letter_data']['.'] = '\\W';
        //console.log(dictio)
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