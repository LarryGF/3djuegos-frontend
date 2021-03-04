import { dbPath, filterPath } from './path';

export const state = () => ({
  games: null,
  filters: null,
  lower: 0,
  upper: 1,
  text_filter: '',
  lengthOfNewLimits: 0,
});

export const mutations = {
  setGames(state, gamesList) {
    state.games = gamesList;
  },
  setFilters(state, filtersList) {
    state.filters = filtersList;
  },
  setLimits(state, fromTo) {
    state.lower = fromTo.from;
    state.upper = fromTo.to;
  },
  setTextFilter(state, value) {
    state.text_filter = value;
  },
  setSpecificFilter(state, values) {
    state.filters[values.filter][values.key] = values.value;
  },
  setlengthOfNewLimits(state, value) {
    state.lengthOfNewLimits = value;
  },
};

function getGamesToShowFunc(state, lowerTest = null, upperTest = null) {
  let lower = state.lower;
  let upper = state.upper;
  if (!!lowerTest) {
    lower = lowerTest;
  }
  if (!!upperTest) {
    upper = upperTest;
  }
  if (state.games) {
    // DEBUG: Puse que el filtro tenía que tener más de 4 elementos
    if (state.text_filter) {
      return state.games.filter((game) =>
        game.name.toLowerCase().includes(state.text_filter.toLowerCase())
      );
    } else {
      var expres = '';
      var rexpres = RegExp('');
      const applied_letter_filter = Object.values(state.filters.letter).some(
        (val) => val
      );

      if (applied_letter_filter) {
        // construye expresion regular con los filtros de letras aplicados
        for (var letter_index in state.filters.letter) {
          if (state.filters.letter[letter_index]) {
            expres += state.filters['letter_data'][letter_index];
          }
        }
        rexpres = RegExp('[' + expres + ']');
      }

      // construye un conjunto con los filtros de generos activos
      const applied_genre_filter_val = new Set(
        Object.keys(state.filters.genres).filter(
          (val) => state.filters.genres[val]
        )
      );

      const applied_genre_filter = applied_genre_filter_val.size !== 0;

      if (!applied_genre_filter && !applied_letter_filter) {
        return state.games.slice(lower, upper);
      }

      if (applied_genre_filter && !applied_letter_filter) {
        return state.games
          .filter((game) => {
            const gameGenre = Array.from(game.genre).filter((val) =>
              applied_genre_filter_val.has(val)
            );
            if (gameGenre.length === 0) {
              return false;
            }
            return true;
          })
          .slice(lower, upper);
      }

      if (!applied_genre_filter && applied_letter_filter) {
        return state.games
          .filter((game) => {
            return !!game.name[0].match(rexpres);
          })
          .slice(lower, upper);
      }

      return state.games
        .filter((game) => {
          return !!game.name[0].match(rexpres);
        })
        .filter((game) => {
          const gameGenre = Array.from(game.genre).filter((val) =>
            applied_genre_filter_val.has(val)
          );
          if (gameGenre.length === 0) {
            return false;
          }
          return true;
        })
        .slice(lower, upper);
    }
  } else {
    return null;
  }
  // return state.games.splice()
}

export const getters = {
  getGamesToShow(state) {
    return getGamesToShowFunc(state);
  },
  getFilters(state) {
    if (state.filters) {
      return state.filters;
    } else {
      return null;
    }
  },
  gamesAvailable(state) {
    if (state.games) {
      return true;
    } else {
      return false;
    }
  },
  filtersAvailable(state) {
    if (state.filters) {
      return true;
    } else {
      return false;
    }
  },
  getTextFilter(state) {
    if (state.text_filter) {
      return state.text_filter;
    } else {
      return '';
    }
  },
  getLower(state) {
    return state.lower;
  },
  getUpper(state) {
    return state.upper;
  },
  getlengthOfNewLimits(state) {
    return state.lengthOfNewLimits;
  },
};
export const actions = {
  async fetchGames({ commit }) {
    this.$axios
      .get(
        `http://${window.location.href.split('//')[1].split('/')[0]}${dbPath}`
      )
      .then((response) => {
        const result = response.data;
        commit('setGames', result);
      });
    // var result = require('../static/db/db.json')
    //commit('setGames', result);
  },
  async fetchFilters({ commit }) {
    this.$axios
      .get(
        `http://${
          window.location.href.split('//')[1].split('/')[0]
        }${filterPath}`
      )
      .then((response) => {
        //   let result = response.data
        //   var dictio = {}
        //   for (var filter in result) {
        //     dictio[filter] = {}
        //     result[filter].map(element =>
        //       dictio[filter][element] = true)
        //   }
        //   commit('setFilters', dictio)
        // });
        //var result = require('../static/db/filters.json');
        const result = response.data;
        var dictio = {};
        for (var filter in result) {
          dictio[filter] = {};
          result[filter].map((element) => (dictio[filter][element] = false));
        }
        dictio['letter'] = {};
        dictio['letter_data'] = {};
        for (var filter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
          dictio['letter'][filter] = false;
          dictio['letter_data'][filter] = filter + filter.toLowerCase();
        }
        dictio['letter']['0-9'] = false;
        dictio['letter_data']['0-9'] = '0-9';
        dictio['letter']['.'] = false;
        dictio['letter_data']['.'] = '\\W';
        //console.log(dictio)
        commit('setFilters', dictio);
      });
  },
  callSetLimits({ commit }, fromTo) {
    commit('setLimits', fromTo);
  },
  callSetTextFilter({ commit }, value) {
    commit('setTextFilter', value);
  },
  callSetFilters({ commit }, values) {
    commit('setSpecificFilter', values);
  },
  testLimits({ commit, state }, fromTo) {
    const results = getGamesToShowFunc(state, fromTo.from, fromTo.to);
    commit('setlengthOfNewLimits', results.length);
  },
};
