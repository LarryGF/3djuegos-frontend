<template>
  <v-flex xs3>
    <v-layout column my-2 px-2 fill-height>
      <v-hover>

      <v-img
        slot-scope="{ hover }"
        :src="'images/'+game.image"
        :max-height="0.3*height"
        :max-width="0.2*width"
        gradient="transparent,transparent,black"
        :lazy-src="lazy"
      >
        <v-expand-transition>
          <div
           @click.stop="$emit('dialog',index)"
            v-if="hover"
            class="d-flex transition-fast-in-fast-out  v-card--reveal  white--text"
            style="height: 100%; background-color:rgba(0,0,0,0.7)"
          >
            <v-layout column  justify-end text-xs-center>

              <v-spacer></v-spacer>

              <v-layout justify-center>
                {{game.type}}
              </v-layout>

              <v-spacer></v-spacer>

              <v-layout row justify-center >
                <v-flex xs12>
                  <v-btn class="mb-5" color="primary" @click.stop="$emit('dialog',index)" round>Detalles</v-btn>
                </v-flex>

              </v-layout>
            </v-layout>
          </div>
        </v-expand-transition>
        <v-layout column fill-height justify-end>
          <!-- <v-spacer></v-spacer> -->
          <v-layout row shrink>
            <v-flex xs10 class="pt-2" >

            <span class="ml-2">{{game.name}}</span>
            </v-flex>
            <v-flex xs2>

            <!--<v-avatar  color="rgba(70,70,70,0.8)" >
              <span>{{game.aggregateRating.ratingValue== "\u00a0" ? '-': game.aggregateRating.ratingValue  }}</span>
            </v-avatar>-->
            </v-flex>
          </v-layout>
        </v-layout>
        <v-layout
          slot="placeholder"
          fill-height
          align-center
          justify-center
          ma-0
        >
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-layout>
      </v-img>
      </v-hover>
    </v-layout>
  </v-flex>
</template>

<style scoped>
div >>> .v-image__image--cover {
  background-size: 100% 100%;
}
</style>

<script>
import Dialog from "../components/Dialog"
export default {
  props: {
    game: Object,
    height: Number,
    width: Number,
    index: Number
  },
  data(){
    return{
      dialog:false,
      activeGame:null,
      lazy:require('../assets/img/lazy.jpg')
      // path : '../static/images/0rbitalis.jpg',
      // image: require(this.path)
      
    }
  },
  components:{
  },
  computed:{
    image(){
      // console.log(require(path.join('..','/static/images',this.game.image)))
    }
  },
  methods:{
    
    icon:function(platform){
      switch (platform){
        case 'XBOX':
        return 'mdi-xbox';
        case 'PC':
        return 'mdi-windows';
        case 'PSP':
        return 'mdi-gamepad-variant';
        case 'Android':
        return 'mdi-android';
        case 'Nintendo Switch':
        return 'mdi-nintendo-switch';
        case 'DS':
        return 'mdi-gamepad';
        case 'iOS':
        return 'mdi-apple-ios';
        case 'PS1':
        return 'mdi-playstation';
        case 'PS2':
        return 'mdi-playstation';
        case 'PS3':
        return 'mdi-playstation';
        case 'PS4':
        return 'mdi-playstation';
        case 'PS5':
        return 'mdi-playstation';
        case '3DS':
        return 'mdi-gamepad';
        case 'Xbox 360':
        return 'mdi-xbox';
        case 'Wii':
        return 'mdi-wii';
        case 'NES':
        return 'mdi-gamepad-circle';
        case 'Vita':
        return 'mdi-gamepad-variant';
        case 'Web':
        return 'mdi-web';
        case 'Xbox One':
        return 'mdi-xbox';
        case 'Wii U':
        return 'mdi-wiiu';
        case 'GB':
        return 'mdi-gamepad';
        case 'N64':
        return 'mdi-gamepad-round';
        case 'GBA':
        return 'mdi-gamepad';
        case 'XBOX':
        return 'mdi-xbox';
        case 'Mac':
        return 'mdi-apple-keyboard-command';
        case 'GBC':
        return 'mdi-gamepad';
        case 'SNES':
        return 'mdi-gamepad';
        case 'GC':
        return 'mdi-gamepad';
        case 'Linux':
        return 'mdi-linux';
        case 'Móvil':
        return 'mdi-cellphone-android';
        case 'Xbox Scarlett':
        return 'mdi-xbox';
        
        return 'mdi-gamepad'
        
      }
    }
  }
};
</script>
