<template>
    <v-timeline>
      <v-timeline-item v-for="(game,index) in showGames" :key="game.name" color="red lighten-2" >
          <v-avatar slot="icon" small>
              <!--<span>{{game.aggregateRating.ratingValue== "\u00a0" ? '-': game.aggregateRating.ratingValue  }}</span>-->
      </v-avatar>
        <span slot="opposite">{{game.datePublished}}</span>
        <v-card class="elevation-2" @click="$emit('dialog',index)">
          <v-card-title class="headline"><v-icon v-for="platform in game.gamePlatform" :key="platform" v-html="icon(platform)">
              </v-icon> {{game.name}}</v-card-title>
          <v-card-text>{{game.description.length >500?game.description.slice(0,500)+'...':game.description}}</v-card-text>
        </v-card>
      </v-timeline-item>
      <!-- <Dialog :dialog="dialog" :game="activeGame?activeGame:{}" @close="dialog=false" /> -->

    </v-timeline>
</template>
<script>
// import Dialog from "../components/Dialog"

export default {
    props:{
        showGames:Array
    },
    data(){
        return{
            dialog:false,
      activeGame:null,
        }
    },
    components:{
        // Dialog
    },
    created(){
    },
    methods:{
        openDialog: function(item){
      this.activeGame = item
      this.dialog = true
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
}
</script>
