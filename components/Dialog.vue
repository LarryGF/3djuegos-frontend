<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      @keydown.esc="$emit('close')"

    >
      <v-card color="rgba(0,0,0,0.9)">
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
                    <v-container>
                <v-img :src="game.image"></v-img>
                </v-container>
                  </v-flex>
                </v-container>
              </v-flex>
              <v-flex xs8>
                <v-container text-xs-start justify-center>
                  <v-flex xs12>
                    <v-container class="mb-0 pb-0">
                      <v-card >
                        <blockquote class="blockquote px-3">{{game.description}}</blockquote>
                      </v-card>
                    </v-container>
                  </v-flex>
                  <v-layout row justify-start shrink>
                    <v-flex xs12>
                      <!--<v-container>
                        <v-card class="text-xs-left">
                          <blockquote class="blockquote font-weight-medium">Fecha de publicación: </blockquote>
                          <blockquote class="blockquote">{{game.datePublished}}</blockquote>
                          <blockquote class="blockquote font-weight-medium">Plataformas:</blockquote>
                          <blockquote class="blockquote " v-for="platform in game.gamePlatform">
                            <v-icon v-html="icon(platform)">
                            </v-icon>{{platform}}
                          </blockquote>
                          <blockquote  class="blockquote font-weight-medium">Rating:</blockquote>
                          <blockquote v-if="dialog" class="blockquote"> {{game.aggregateRating.ratingCount ?game.aggregateRating.ratingValue:'?'}}</blockquote>
                          <blockquote class="blockquote font-weight-medium">Desarrollador:</blockquote>
                          <blockquote v-for="publisher in game.publisher" class="text-truncate blockquote">   <v-icon small class="mb-1">mdi-circle</v-icon> {{publisher}}</blockquote>

                        </v-card>
                      </v-container>-->
                      <v-container>
                        <v-card class="text-xs-left">
                          <blockquote class="blockquote font-weight-medium">Tipo:&nbsp;&nbsp;{{game.type}}</blockquote>
                          <blockquote class="blockquote font-weight-medium">Géneros:</blockquote>
                          <v-layout row wrap>
                            <blockquote class="blockquote" v-for="genre in game.genre" :key="genre"><v-icon>mdi-meteor</v-icon>{{genre}}</blockquote>
                          </v-layout>
                        </v-card>

                      </v-container>
                    </v-flex>
                    <!--<v-flex xs6>
                      <v-container>
                        <v-card v-if="dialog && game.details_pc">
                          <blockquote class="blockquote font-weight-medium">REQUERIMIENTOS</blockquote>
                          <blockquote class="blockquote text-xs-left">
                          <blockquote class="heading font-weight-medium">Mínimos</blockquote>
                          <blockquote class="subheading font-weight-medium">Sistema Operativo: {{game.details_pc.min.os}}</blockquote>
                          <blockquote class="subheading font-weight-medium">Microprocesador: {{game.details_pc.min.micro}}</blockquote>
                          <blockquote class="subheading font-weight-medium">RAM: {{game.details_pc.min.ram}}</blockquote>
                          <blockquote class="subheading font-weight-medium">Tarjeta Gráfica: {{game.details_pc.min.tarjeta_grafica}}</blockquote>
                          <blockquote class="subheading font-weight-medium">DirectX: {{game.details_pc.min.directX}}</blockquote>
                          <blockquote class="subheading font-weight-medium">Tamaño: {{game.details_pc.min.size}}</blockquote>
                          <br>
                          <blockquote class="heading font-weight-medium">Recomendados</blockquote>
                          <blockquote class="subheading font-weight-medium">Sistema Operativo: {{game.details_pc.max.os}}</blockquote>
                          <blockquote class="subheading font-weight-medium">Microprocesador: {{game.details_pc.max.micro}}</blockquote>
                          <blockquote class="subheading font-weight-medium">RAM: {{game.details_pc.max.ram}}</blockquote>
                          <blockquote class="subheading font-weight-medium">Tarjeta Gráfica: {{game.details_pc.max.tarjeta_grafica}}</blockquote>
                          <blockquote class="subheading font-weight-medium">DirectX: {{game.details_pc.max.directX}}</blockquote>
                          <blockquote class="subheading font-weight-medium">Tamaño: {{game.details_pc.max.size}}</blockquote>
                          

                            
                            </blockquote>
                        </v-card>
                        <v-card v-else-if="dialog && game.gamePlatform == 'PC'">
                          <blockquote class="blockquote font-weight-medium">No contamos con los requisitos para este juego.</blockquote>                          
                        </v-card>
                        <v-card v-else>
                          <blockquote class="blockquote font-weight-medium">Los juegos de consola no tienen requerimientos.</blockquote>                          
                        </v-card>
                      </v-container>
                    </v-flex>-->
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
    handleKeys: function(event) {
      console.log(this.$listeners);
      if (event.key == 'Escape'){
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