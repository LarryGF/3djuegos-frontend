<template>
    <v-flex xs3 >
      <v-layout column my-2 mx-2>
        <v-img
          :src="game.image"
          :max-height="0.3*height"
          :max-width="0.25*width"
          lazy-src="images/dissidia-012-prologus.jpg"
          gradient="transparent,transparent,black"
        >
        <v-layout column fill-height justify-end>
            <h3 class="ml-3">{{game.name}}</h3 >
        </v-layout>
        
        
        </v-img>
      </v-layout>
    </v-flex>
</template>

<script>
export default {
    props:{
        game:Object,
        height:Number,
        width:Number
    }
    
}
</script>
