
<template>
  <v-layout row wrap v-if="showGames">
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
      <nuxt-link to="/">home</nuxt-link>
      <v-spacer></v-spacer>
      <template v-if="filters">

      <BottomSheet :label="'Géneros'" :color="'purple'" :items="filters.genres"/>
      <BottomSheet :label="'Sistema Operativo'" :color="'blue'" :items="filters.os"/>
      <BottomSheet :label="'Plataformas'" :color="'primary'" :items="filters.platforms"/>
      <!-- <BottomSheet :label="'Desarrollador'" :color="'cyan'" :items="filters.publishers"/> -->
      </template>
    </v-toolbar>

    <!-- </v-card> -->
    <!-- {{games[0]}} -->
    <Cover v-for="game in showGames" :key="game.name" :game="game" :height="height" :width="width"/>
  </v-layout>
  <v-layout v-else column fill-height justify-center>
    <v-layout row shrink justify-center>
      <template v-if="$store.state.games"></template>
      <template v-else></template>

      <v-progress-circular size="80" indeterminate color="primary"></v-progress-circular>
    </v-layout>
  </v-layout>
</template>

<script>
import Cover from "../components/Cover";
import BottomSheet from "../components/BottomSheet";
export default {
  data() {
    return {
      value: "",
      height: 0,
      width: 0,
      backedGames: [],
      count: 0,
      lower: 0,
      upper: 24,
      
    };
  },
  computed: {
    gamesAvailable() {
      return this.$store.getters.gamesAvailable;
    },
    showGames() {
      return this.$store.getters.getGamesToShow;
    },
    filters(){
      return this.$store.getters.getFilters;
    }
  },

  watch: {},
  components: {
    Cover,
    BottomSheet
  },
  created() {
    console.log("created");
    if (!this.games) {
      this.$store.dispatch("fetchGames");
    }
    if (!this.$store.state.filters){
      this.$store.dispatch('fetchFilters')
    }
    this.$store.dispatch("callSetLimits", { from: this.lower, to: this.upper });
  },
  mounted() {
    // this.fetch()
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.scroll();
    // this.getFilters()
  },
  methods: {
    // getGames: async function() {
    //   // this.games = (await this.$axios.get("/db/db_min.json")).data;
    //   for (this.count; this.count < 96; this.count++) {
    //     this.showGames.push(this.games[this.count]);
    //   }

    //   // console.log(this.$router)
    // },
    // getFilters: async function() {
    //   this.publishers = (await this.$axios.get("/db/publishers.json")).data;
    //   this.publishers = this.publishers.map(element =>
    //     Object({ name: element, selected: true })
    //   );
    //   this.platforms = (await this.$axios.get("/db/platforms.json")).data;
    //   this.platforms = this.platforms.map(element =>
    //     Object({ name: element, selected: true })
    //   );
    //   this.os = (await this.$axios.get("/db/os.json")).data;
    //   this.os = this.os.map(element =>
    //     Object({ name: element, selected: true })
    //   );
    //   this.genres = (await this.$axios.get("/db/genres.json")).data;
    //   this.genres = this.genres.map(element =>
    //     Object({ name: element, selected: true })
    //   );
    // },
    scroll: function() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow && this.backedGames.length === 0) {
          // for (var i = 0; i < 48; i++) {
          //   this.count++;
          //   this.showGames.push(this.games[this.count]);
          // }
          this.upper = this.upper + 24;
          this.$store.dispatch("callSetLimits", {
            from: this.lower,
            to: this.upper
          });
        }
      };
    },
    filter: function() {
      console.log("filtering");
      if (this.value !== "") {
        this.backedGames = this.backedGames.concat(this.showGames);
        this.showGames = [];
        this.showGames = this.showGames.concat(
          this.games.filter(game =>
            game.name.toLowerCase().includes(this.value.toLowerCase())
          )
        );
        this.$forceUpdate();
        console.log(this.showGames);
      }
    },
    restore: function() {
      this.showGames = this.backedGames;
      this.backedGames = [];
      this.$forceUpdate();
      this.value = "";
    },
    hover: function() {
      this.$forceUpdate();

      console.log("hover");
    }
  }
};
</script>


