<template>
<v-layout class="mx-2" column  align-center >

     {{text}}
    <v-card  height="100%" width="100%" :light="light"
    
    >

      <v-card-title>
    
  <v-btn fab  color="pink">
    <v-icon color="white" @click.stop="goBack">arrow_back</v-icon>
  </v-btn>
        <v-spacer></v-spacer>
        <h2 class="mb-4 mx-2">Origen:</h2>
        <v-flex xs7>
        <v-text-field outline
        v-model="Route"
        append-icon="send"
        :label="'Copie la ruta ' +direction"
        @click:append="progressivePath=[Route], getRoute()"
        @keyup.enter.native.stop="progressivePath=[Route] ,getRoute()"
        >
        
        </v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-container class="scroll-y pt-0" :style="'max-height:'+height+'px'" >

      <v-card-text  >
       <v-treeview
          hoverable
          :active.sync="active"
          :items="origin"
          :open.sync="open"
          activatable
          active-class="primary--text"
          transition
        >
          <v-icon
            v-if="item.children"
            slot="prepend"
            slot-scope="{ item, active }"
            :color="active ? 'primary' : ''"
          >folder</v-icon>
           <v-icon
            v-else
            slot="prepend"
            slot-scope="{ item, active }"
            :color="active ? 'primary' : ''"
          >assignment</v-icon>
        </v-treeview>
      </v-card-text>
      </v-container>
    </v-card>
  </v-layout>

</template>

<script>
export default {
  name: 'PathCard',
  props: {
    light: Boolean,
    direction: String,
    height: Number
  },
  data () {
    return {
      text:'',
      open: [],
      progressivePath: [],
      Route: '',
      active: [],
      origin: [

      ]
    }
  },
  methods: {
    intoFolder: async function (item) {
      // eslint-disable-next-line no-undef,no-return-assign
      // eel.into_folder(String(item), this.Route)((result) => { this.origin = result['items']; this.Route = result['route']; this.progressivePath.push(this.Route) })
      var result = await this.$axios.post('http://localhost:8000/into_folder/',
      {
        item:String(item),
        route:this.Route
      }
      )
      this.origin = result.data.items
      this.Route = result.data.route
      this.progressivePath.push(this.Route)
    },
    getRoute: async function () {
    //   this.progressivePath.push(this.Route)
      
      this.origin = (await this.$axios.post('http://localhost:8000/get_route/',{
        name:this.Route
      })).data
    },
    goBack: async function () {
      console.log('back')
      if (this.progressivePath.length > 1) {
        this.progressivePath.pop()
        this.Route = this.progressivePath[this.progressivePath.length - 1]
        this.getRoute()
        this.$forceUpdate()
      }
    }
  },
  watch: {
    active: function () {
      if (this.active.length !== 0) {
        this.intoFolder(this.active[0])
      }
    }
  }
}
</script>
