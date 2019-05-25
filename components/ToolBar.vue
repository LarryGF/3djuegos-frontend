<template>
    <v-toolbar light app color="rgba(255,255,255,0.9)">
      <v-btn to="/" icon> <v-icon>mdi-home-outline</v-icon></v-btn>
      <v-spacer></v-spacer>
      <v-flex xs4>
        <v-text-field
          label="Filtra"
          v-model="value"
          @keyup.enter.native.stop="$emit('filter',value)"
          append-icon="cancel"
          @click:append="$emit('restore')"
          class="mt-2"
        ></v-text-field>
      </v-flex>
     
      <v-spacer></v-spacer>
      <template v-if="filters">
          
      <BottomSheet :label="'Géneros'" :color="'purple'" :items="filters.genres"/>
      <BottomSheet :label="'Sistema Operativo'" :color="'blue'" :items="filters.os"/>
      <BottomSheet :label="'Plataformas'" :color="'primary'" :items="filters.platforms"/>
      <!-- <BottomSheet :label="'Desarrollador'" :color="'cyan'" :items="filters.publishers"/> -->
      </template>
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
    }
}
</script>

