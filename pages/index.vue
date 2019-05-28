 
<template>
  <!-- <img src="~assets/img/main.jpg"></img> -->
  <v-layout row justify-end v-resize="onResize" shrink>
    <v-toolbar  absolute color="rgba(0,0,0,0.4)" height="60%">
      <v-flex xs4>
      <v-btn class="mx-2" dark  :disabled="!$store.state.games" to="/" icon> <v-icon large>mdi-home-outline</v-icon></v-btn>
      <v-btn class="mx-2" dark  :disabled="!$store.state.games" to="/catalog" icon> <v-icon large>mdi-xbox-controller</v-icon></v-btn>
      <v-btn class="mx-2" dark  :disabled="!$store.state.games" to="/timeView" icon> <v-icon large>mdi-timeline-text</v-icon></v-btn>
      </v-flex>
    </v-toolbar>
    
    <v-img
      
      :height="height"
      :src="image"
      :gradient="$store.state.games?'':'rgba(0,0,0,0.5),rgba(0,0,0,0.5)'"
    ></v-img>
    <v-footer  app dark>
      <span>&copy; {{ new Date().getFullYear() }}</span>

    </v-footer>
  </v-layout>
</template>

<script>
export default {
  layout: "main",
  mounted() {
    this.onResize();
    // console.log(require('../static/db/filters.json'))
    
  },
  created() {
    if (!this.$store.state.games) {
      this.$store.dispatch("fetchGames");
    }
    if (!this.$store.state.filters) {
      this.$store.dispatch("fetchFilters");
    }
  },
  methods: {
    onResize: function() {
      this.height = window.innerHeight;
    }
  },
  data() {
    return {
      height: 0,
      image: require('../static/internals/main.jpg')
    };
  }
};
</script>
