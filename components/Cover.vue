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
        gradient="transparent,transparent,black"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out  v-card--reveal  white--text"
            style="height: 100%; background-color:rgba(0,0,0,0.7)"
          >
            <v-layout column  justify-end text-xs-center>
              <v-spacer></v-spacer>
            <v-layout row shrink justify-center>
              <v-flex xs4>

              ({{game.gamePlatform == 'Nintendo Switch'? 'Switch':game.gamePlatform}})
              </v-flex>
              <v-flex xs2>
              <v-icon v-html="icon(game)">
              </v-icon>
              </v-flex>
              <v-flex xs4>
                {space slot}
              </v-flex>

            </v-layout>
              <v-spacer></v-spacer>

            <v-layout row shrink justify-center>
              <v-flex xs4>
                <v-btn class="mb-5"color="primary" @click.stop="openDialog(game)" round>Detalles</v-btn>
              </v-flex>

            </v-layout>
            </v-layout>
          </div>
        </v-expand-transition>
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
      </v-hover>
      <Dialog :dialog="dialog" :game="activeGame?activeGame:{}" @close="dialog=false" />
    </v-layout>
  </v-flex>
</template>

<script>
import Dialog from "../components/Dialog"
export default {
  props: {
    game: Object,
    height: Number,
    width: Number,
  },
  data(){
    return{
      dialog:false,
      activeGame:null,
    }
  },
  components:{
    Dialog
  },
  methods:{
    openDialog: function(item){
      this.activeGame = item
      this.dialog = true
    },
    icon:function(item){
      switch (item.gamePlatform){
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
