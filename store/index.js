export const state = () => ({
    counter: 0,
    games:null
  })
  
  export const mutations = {
    increment (state) {
      state.counter++
      },
      setGames(state, gamesList) {
        state.games = gamesList
    }
      
  } 

  export const actions = {
      async fetchGames({ commit }) {
          console.log('init')
        var result = (await this.$axios.get("/db/db.json")).data
        commit('setGames', result)
    }
  }
  