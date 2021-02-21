<template>
    <v-toolbar light app color="rgba(0,0,0,0.4)" height="60%">
      <v-flex xs4>
        <v-btn dark to="/" icon class="mx-2"> <v-icon large>mdi-home-outline</v-icon></v-btn>
        <v-btn dark to="/catalog" icon class="mx-2"> <v-icon large>mdi-library-movie</v-icon></v-btn>
        <!--<v-btn dark to="/timeView" icon class="mx-2"  > <v-icon large>mdi-timeline-text</v-icon></v-btn>-->
      </v-flex>
      <v-flex xs4>
        <v-flex xs8>
          <v-text-field
            dark
              label="Filtrar por nombre"
              v-model="value"
              @keyup.enter.native.stop="$store.dispatch('callSetLimits', {from: 0,to: 180});$store.dispatch('callSetTextFilter',value);"
              append-icon="cancel"
              @click:append="$store.dispatch('callSetLimits', {from: 0,to: 180});$store.dispatch('callSetTextFilter','');value=''"
              class="mt-2"
          ></v-text-field>
        </v-flex>
      </v-flex>

      <v-flex xs2>

      <v-layout row shrink>

        <BottomSheet :label="'Géneros'" :color="'rgba(155,155,155,0.9)'" :items="'genres'"/>
        <BottomSheet :label="'Letra'" :color="'rgba(155,155,155,0.9)'" :items="'letter'"/>
        <!--<BottomSheet :label="'Plataformas'" :color="'rgba(155,155,155,0.3)'" :items="'platforms'"/>
        <BottomSheet :label="'Sistema Operativo'" :color="'rgba(155,155,155,0.6)'" :items="'os'"/>-->
        <!-- <BottomSheet :label="'Desarrollador'" :color="'cyan'" :items="filters.publishers"/> -->
     </v-layout>
      </v-flex>
    </v-toolbar>
</template>
<script>
import BottomSheet from "../components/BottomSheet"
export default {
    props:{
        filters:Object
    },
    components:{
        BottomSheet
    },
    data (){
        return{
          value:''
        }
    },
    computed:{
      
    }
}
</script>

