 
<template>
    <!-- <img src="~assets/img/main.jpg"></img> -->
    <div>

     <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
     <!-- {{$store.state.games}} -->
     <nuxt-link to="catalog">catalog</nuxt-link>
    </div>
</template>

<script>
export default {
    mounted(){
        this.$store.dispatch('fetchGames')
    }
}
</script>
