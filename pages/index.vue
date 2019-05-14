
<template>

<v-layout row>
  <PathCard :light="true" direction="origen" :height="height" :key="0"/>
  <PathCard :light="false" direction="destino" :height="height" :key="1"/>
  
  </v-layout>
</template>

<script>
import PathCard from '../components/PathCard'
export default {
  data () {
    return {
      height: 0
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
  },
  methods: {

  }
}
</script>


