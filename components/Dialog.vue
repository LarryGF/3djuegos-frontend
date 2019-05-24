<template >
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      persistent
      hide-overlay
      transition="dialog-bottom-transition"
      @keyup="handleKeys($event)"
    >
      <v-card color="rgba(0,0,0,0.9)">
        <v-toolbar color="transparent">
          <v-spacer></v-spacer>
          <v-toolbar-title class="headline">{{game.name}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click.stop="$emit('close')">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-layout column justify-center>
            <v-layout row shrink justify-center>
              <v-flex xs4>
                <v-img :src="game.image"></v-img>
              </v-flex>
              <v-flex xs8>
                <v-container text-xs-center justify-center>
                  <v-flex xs12>
                    <v-container>
                      <v-card>
                        <blockquote class="blockquote">{{game.description}}</blockquote>
                      </v-card>
                    </v-container>
                  </v-flex>
                  <v-layout row justify-start shrink>
                    <v-flex xs4>
                      <v-container>
                        <v-card class="text-xs-left">
                          <blockquote class="blockquote">Fecha de publicación: {{game.datePublished}}</blockquote>
                          <blockquote class="blockquote"><v-icon v-html="icon(game)">
              </v-icon> Plataforma: {{game.gamePlatform}}</blockquote>
                          <blockquote class="blockquote">Rating: {{game.aggregateRating?game.aggregateRating.ratingValue:'-'}}</blockquote>
                          <blockquote class="blockquote">Desarrollador:</blockquote>
                          <blockquote v-for="publisher in game.publisher"class="blockquote"><v-icon small class="mb-1">mdi-circle</v-icon> {{publisher}}</blockquote>

                        </v-card>
                      </v-container>
                      <v-container>
                        <v-card class="text-xs-left">
                          <blockquote class="blockquote">Géneros:</blockquote>
                          <blockquote class="blockquote" v-for="genre in game.genre"><v-icon>mdi-meteor</v-icon>{{genre}}</blockquote>
                        </v-card>

                      </v-container>
                    </v-flex>
                    <v-flex xs8>
                      <v-container>
                        <v-card>
                          <blockquote class="blockquote">{{game}}</blockquote>
                        </v-card>
                      </v-container>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-card-text>
        <!-- <v-img
        :src="game.image"
        lazy-src="images/dissidia-012-prologus.jpg"
        gradient="transparent,transparent,black"
        ></v-img>-->
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
    handleKeys: function(event) {
      console.log(event);
    },
    icon:function(item){
      console.log(item)
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