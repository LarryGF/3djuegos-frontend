
<template>
  <v-layout row wrap v-if="games">
    <!-- <v-card flat> -->
    <v-toolbar light app color="rgba(255,255,255,0.9)">
      
      <v-flex xs4>

      <v-text-field
        label="Filtra"
        v-model="value"
        @keyup.enter.native.stop="filter"
        append-icon="cancel"
        @click:append="restore"
        outline
        class="mt-2"
      ></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <BottomSheet :label="'Géneros'" :color="'purple'" :items="genres"/>
      <BottomSheet :label="'Sistema Operativo'" :color="'blue'" :items="os"/>
      <BottomSheet :label="'Plataformas'" :color="'primary'" :items="platforms"/>
      <BottomSheet :label="'Desarrollador'" :color="'cyan'" :items="publishers"/>
    
      
    </v-toolbar>

    <!-- </v-card> -->
    <!-- {{games[0]}} -->
    <Cover v-for="game in showGames" :key="game.name" :game="game" :height="height" :width="width" 
    />
  </v-layout>
  <div v-else>loren</div>
</template>

<script>
import Cover from "../components/Cover";
import BottomSheet from "../components/BottomSheet"
export default {
  data() {
    return {
      value:'',
      height: 0,
      width: 0,
      games: null,
      showGames: [],
      backedGames: [],
      count: 0,
      genres:[],
      os:[],
      platforms:[],
      publishers:[]
    };
  },
  computed:{
     
  },

  watch: {},
  components: {
    Cover,
    BottomSheet
  },
  mounted() {
    // this.fetch()
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.getGames();
    this.scroll();
    this.getFilters()
  },
  methods: {
    getGames: async function() {
      this.games = (await this.$axios.get("/db/db.json")).data;
      for (this.count; this.count < 24; this.count++) {
        this.showGames.push(this.games[this.count]);
      }

      // console.log(this.$router)
    },
    getFilters: async function (){
      this.publishers = (await this.$axios.get("/db/publishers.json")).data;
      this.publishers = this.publishers.map((element)=>Object({name:element, selected:true}))
      this.platforms = (await this.$axios.get("/db/platforms.json")).data;
      this.platforms = this.platforms.map((element)=>Object({name:element, selected:true}))
      this.os = (await this.$axios.get("/db/os.json")).data;
      this.os = this.os.map((element)=>Object({name:element, selected:true}))
      this.genres = (await this.$axios.get("/db/genres.json")).data;
      this.genres = this.genres.map((element)=>Object({name:element, selected:true}))

    },
    scroll: function() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow && this.backedGames.length === 0) {
          for (var i = 0; i < 12; i++) {
            this.count++;
            this.showGames.push(this.games[this.count]);
          }
        }
      };
    },
    filter: function() {
      console.log("filtering");
      this.backedGames = this.backedGames.concat(this.showGames);
      this.showGames = [];
      for (var game in this.games) {
        if (
          this.games[game].name.toLowerCase().includes(this.value.toLowerCase())
        ) {
          this.showGames.push(this.games[game]);
        }
      }
      console.log(this.backedGames);
    },
    restore: function() {
      this.showGames = this.backedGames;
      this.backedGames = [];
      this.$forceUpdate();
      this.value = "";
    },
    hover: function(){
      console.log('hover')
    }
  }
};
</script>


