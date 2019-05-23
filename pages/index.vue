
<template>

<v-layout >
  {{games}}
  <PathCard/>
  
  </v-layout>
</template>

<script>
import PathCard from '../components/PathCard';
export default {
  data () {
    return {
      height: 0,
      games: null,
    }
  },
  
  watch: {
  },
  components: {
    PathCard
  },
  mounted () {
    // this.fetch()
    this.height = window.innerHeight * 0.7
    this.getInitialData()
  },
  methods: {
    getInitialData: async function(){
    this.games = (await this.$axios.get('/db/db.json')).data

    // console.log(this.$router)


    }
  }
}
</script>


