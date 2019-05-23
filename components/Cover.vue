<template>
  <v-flex xs3>
    <v-layout column my-2 px-2 fill-height>
      <v-img
        :src="game.image"
        :max-height="0.3*height"
        :max-width="0.2*width"
        lazy-src="images/dissidia-012-prologus.jpg"
        gradient="transparent,transparent,black"
      >
        <v-layout column fill-height justify-end>
          <v-spacer></v-spacer>
          <v-layout row shrink>
            <span class="ml-2 mt-3">{{game.name}}</span>
            <v-spacer></v-spacer>
            <v-avatar style="position:relative" color="rgba(70,70,70,0.8)" >
              <span>{{game.aggregateRating.ratingValue== "\u00a0" ? '-': game.aggregateRating.ratingValue  }}</span>
            </v-avatar>
          </v-layout>
        </v-layout>
      </v-img>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  props: {
    game: Object,
    height: Number,
    width: Number
  }
};
</script>
