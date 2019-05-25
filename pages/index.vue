 
<template>
    <!-- <img src="~assets/img/main.jpg"></img> -->
    <v-layout row justify-end v-resize="onResize">
        <v-toolbar v-if="$store.state.games" absolute color="rgba(0,0,0,0.4)" height="60%"></v-toolbar>
        <v-img
        :max-height="height"
        src="/internals/main.jpg"
        :gradient="$store.state.games?'rgba(0,0,0,0.5),rgba(0,0,0,0.5)':''"
        >
        
     <v-btn color="rgba(0,0,0,0.1)" to="catalog" :disabled="!$store.state.games">Seguir</v-btn>
        </v-img>

     
    </v-layout>
</template>

<script>
export default {
    layout:'main',
    mounted(){
        this.onResize()
    },
    created(){
        if (!this.$store.state.games){

            this.$store.dispatch('fetchGames')
        }
        if (!this.$store.state.filters){
            this.$store.dispatch('fetchFilters')

        }
    },
    methods:{
        onResize: function(){
            this.height=window.innerHeight
        }
    },
    data(){
        return {
            height:0
        }
    }
}
</script>
