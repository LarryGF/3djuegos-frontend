
<template>
  
  <v-layout v-if="showGames">
    
    <ToolBar :filters="filters"/>
    <TimeLine :showGames="showGames" @dialog="openDialog"/>
      <Dialog :dialog="dialog" :game="activeGame?activeGame:{}" @close="dialog=false" />
   

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
import BottomSheet from "../components/BottomSheet";
import ToolBar from "../components/ToolBar";
import { setTimeout } from 'timers';
import Dialog from "../components/Dialog"
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
      upper: 100,
      savedPositionCover:0,
      savedPositionTime:0,
      changing:false,
      dialog:false,
      activeGame:null
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
    BottomSheet,
    ToolBar,
    TimeLine,
    Dialog
  },
  created() {
      console.log('created')
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
    openDialog: function(index){
      this.activeGame = this.showGames[index]
      this.dialog = true
      console.log(this.dialog)
    },
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
          this.upper = this.upper + 50;
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


