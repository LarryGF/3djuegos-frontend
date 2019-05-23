
<template>
  <v-layout row wrap v-if="games">
    <!-- {{games[0]}} -->
    <v-flex xs4 v-for="game in showGames" :key="game.name">
      <v-layout column>
        {{game.name}}
        <v-img
          :src="game.image"
          contain
          :max-height="0.3*height"
          lazy-src="images/dissidia-012-prologus.jpg"
        ></v-img>
      </v-layout>
    </v-flex>
  </v-layout>
  <div v-else>loren</div>
</template>

<script>
import PathCard from "../components/PathCard";
export default {
  data() {
    return {
      height: 0,
      games: null,
      showGames: [],
      count: 0
    };
  },

  watch: {},
  components: {
    PathCard
  },
  mounted() {
    // this.fetch()
    this.height = window.innerHeight;
    this.getInitialData();
    this.scroll()
  },
  methods: {
    getInitialData: async function() {
      this.games = (await this.$axios.get("/db/db.json")).data;
      for (this.count; this.count < 21; this.count++) {
        this.showGames.push(this.games[this.count]);
      }

      // console.log(this.$router)
    },
    scroll: function() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight ;

        if (bottomOfWindow){
          for (var i=0;i<9;i++){
            this.count++
            this.showGames.push(this.games[this.count])
          }
        }
      }
    }
  }
};
</script>


