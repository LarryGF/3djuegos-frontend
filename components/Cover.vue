<template>
  <v-flex xs3>
    <v-layout column my-2 px-2 fill-height>
      <v-hover>

      <v-img
        slot-scope="{ hover }"
        :src="game.image"
        :max-height="0.3*height"
        :max-width="0.2*width"
        lazy-src="images/dissidia-012-prologus.jpg"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out  v-card--reveal  white--text"
            style="height: 100%; background-color:rgba(0,0,0,0.7)"
          >
            <v-layout column  justify-center>
            <v-layout row shrink justify-center>
              <v-icon>
                mdi-xbox
              </v-icon>
              {{game.name}}
            </v-layout>
            </v-layout>
          </div>
        </v-expand-transition>
        <v-layout column fill-height justify-end>
          <v-spacer></v-spacer>
          <v-layout row shrink>
            <!-- <span class="ml-2 mt-3">{{game.name}}</span> -->
            <v-spacer></v-spacer>
            <v-avatar style="position:relative" color="rgba(70,70,70,0.8)" >
              <span>{{game.aggregateRating.ratingValue== "\u00a0" ? '-': game.aggregateRating.ratingValue  }}</span>
            </v-avatar>
          </v-layout>
        </v-layout>
      </v-img>
      </v-hover>
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
