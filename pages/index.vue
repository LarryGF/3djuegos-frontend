
<template>
  <v-layout row wrap v-if="games">
   <!-- <v-card flat> -->
    <v-container fluid>
      <v-layout row child-flex wrap>
        <div>
          <v-toolbar light>
            <v-btn icon class="hidden-xs-only">
              <v-icon>arrow_back</v-icon>
            </v-btn>

            <v-toolbar-title>Title</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon class="hidden-xs-only">
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>
        </div>

        <div >
          <v-toolbar>
            <v-toolbar-title>Title</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>reply</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
        </div>
      </v-layout>
    </v-container>
  <!-- </v-card> -->
    <!-- {{games[0]}} -->
    <v-flex xs3 v-for="game in showGames" :key="game.name">
      <v-layout column my-2 mx-2 >
        <v-img
          :src="game.image"
          :max-height="0.35*height"
          :max-width ="0.25*width"
          lazy-src="images/dissidia-012-prologus.jpg"
        >
        
        {{game.name}}
        </v-img>
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
      width:0,
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
    this.width = window.innerWidth;
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


