<template>
  <v-layout row justify-center >
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      @keydown.esc="$emit('close')"
    >
      <v-card color="rgba(0,0,0,0.9)" @mousedown.capture="handleKeys">
        <v-toolbar color="rgba(0,0,0,0.9)" fixed>
          <v-spacer></v-spacer>
          <v-toolbar-title class="headline">{{game.name}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click.stop="$emit('close')">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text >
          <v-layout column justify-center>
            <v-layout row shrink justify-center>
              <v-flex xs4>
                <v-container text-xs-start justify-center>
                  <v-flex xs12>
                    <v-container class="mt-2">
                <v-img :src="'images/'+game.image"></v-img>
                </v-container>
                  </v-flex>
                </v-container>
              </v-flex>
              <v-flex xs8>
                <v-container text-xs-start justify-center>
                  <v-flex xs12 v-if="this.game.description">
                    <v-container class="mb-0 pb-0 mt-2">
                      <v-card >
                        <blockquote class="blockquote px-3">{{game.description}}</blockquote>
                      </v-card>
                    </v-container>
                  </v-flex>
                  <v-layout row justify-start shrink>
                    <v-flex xs12>
                      <v-container class="mt-2">
                        <v-card class="text-xs-left">
                          <blockquote class="blockquote font-weight-medium">Tipo:&nbsp;&nbsp;{{game.classification}}</blockquote>
                          <blockquote class="blockquote font-weight-medium">Eposodios:&nbsp;&nbsp;{{game.episodes}}</blockquote>
                          <blockquote class="blockquote font-weight-medium" style="padding-bottom:0">Géneros:</blockquote>
                          <v-layout row wrap>
                            <blockquote class="blockquote" v-for="genre in game.categories" :key="genre"><v-icon>mdi-meteor</v-icon>{{genre}}</blockquote>
                          </v-layout>
                        </v-card>

                      </v-container>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    dialog: Boolean,
    game: Object
  },
  data: () => ({}),
  computed: {},
  methods: {
    preventBack: function(){
      ; 
    },
    handleKeys: function(event) {
     
      if (event.button == 3){
        this.$emit('close')
      }
    },
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