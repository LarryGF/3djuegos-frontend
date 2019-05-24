 
<template>
    <!-- <img src="~assets/img/main.jpg"></img> -->
    <div>

     <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
     <template v-if="$store.state.games">
       {{$store.state.games[0]}}
       </template>
     <nuxt-link to="catalog">catalog</nuxt-link>
    </div>
</template>

<script>
export default {
    created(){
        this.$store.dispatch('fetchGames')
    }
}
</script>
