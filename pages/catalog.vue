
<template>
  <v-layout row wrap v-if="showGames&&type" v-resize="onResize">
    <v-btn fab absolute right large @click="change" fixed>
      <v-icon light v-html="type?'mdi-timeline-text':'mdi-timeline-text-outline'"></v-icon>
    </v-btn>
    <!-- <v-card flat> -->
    <ToolBar :filters="filters"/>

    <!-- </v-card> -->
    <!-- {{games[0]}} -->
    <Cover v-for="game in showGames" :key="game.name" :game="game" :height="height" :width="width"/>
  </v-layout>
  <v-layout v-else-if="showGames&&!type">
    <v-btn fab absolute right large @click="change" fixed>
      <v-icon light v-html="type?'mdi-timeline-text':'mdi-timeline-text-outline'"></v-icon>
    </v-btn>
    <ToolBar :filters="filters"/>
    <TimeLine :showGames="showGames"/>
  </v-layout>

  <v-layout v-else column fill-height justify-center>
    <v-layout row shrink justify-center>
      <v-progress-circular size="80" indeterminate color="primary"></v-progress-circular>
    </v-layout>
  </v-layout>
</template>

<script>
import goTo from 'vuetify/lib/components/Vuetify/goTo'
import TimeLine from "../components/TimeLine";
import Cover from "../components/Cover";
import BottomSheet from "../components/BottomSheet";
import ToolBar from "../components/ToolBar";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      type: true,
      // value: "",
      height: 0,
      width: 0,
      backedGames: [],
      count: 0,
      lower: 0,
      upper: 200,
      savedPositionCover:0,
      savedPositionTime:0,
      changing:false
    };
  },
  computed: {
    showGames() {
      return this.$store.getters.getGamesToShow;
    },
    filters() {
      return this.$store.getters.getFilters;
    }
  },

  watch: {},
  components: {
    Cover,
    BottomSheet,
    ToolBar,
    TimeLine
  },
  created() {
    console.log("created");
    if (!this.$store.getters.gamesAvailable) {
      this.$store.dispatch("fetchGames");
    }
    if (!this.$store.state.filters) {
      this.$store.dispatch("fetchFilters");
    }
    this.$store.dispatch("callSetLimits", { from: this.lower, to: this.upper });
  },
  mounted() {
    // this.fetch()
   this.onResize()
    this.scroll();
    // this.getFilters()
  },
  methods: {
    onResize: function (){
       this.height = window.innerHeight;
    this.width = window.innerWidth;
    },
    change: function(){
      this.changing = true
      if (this.type){
        this.savedPositionCover = window.pageYOffset
        this.type = !this.type
        this.$vuetify.goTo(this.savedPositionTime)

      } else{
        this.savedPositionTime = window.pageYOffset
        this.type = !this.type
        this.$vuetify.goTo(this.savedPositionCover)
      }
    setTimeout(()=>{this.changing = false},1000)
     
    },
   
    scroll: function() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow && this.backedGames.length === 0 && !this.changing) {
          // for (var i = 0; i < 48; i++) {
          //   this.count++;
          //   this.showGames.push(this.games[this.count]);
          // }
          this.upper = this.upper + 100;
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


