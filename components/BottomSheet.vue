<template>
  <v-bottom-sheet inset lazy>
    <v-btn slot="activator" :color="color" dark round>{{label}}</v-btn>
    <v-layout row wrap justify-space-between>
      <v-card tile color="rgba(0,0,0,0.5">
        <v-chip
          :light="item"
          v-for="(item,key) in values"
          :key="Math.random()"
          :selected="item"
          @click="select(key,item)"
        >
          <v-avatar>
            <v-icon :color="item?'red':'green'">{{item?'cancel':'check_circle'}}</v-icon>
          </v-avatar>
          {{key}}
        </v-chip>
      </v-card>
    </v-layout>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: {
    label: String,
    color: String,
    items: String
  },
  data() {
    return {
      selected: []
    };
  },
  methods: {
    select: function(key,item) {
      this.$store.dispatch('callSetFilters',{filter:this.items,value:!item,key:key})
      // this.selected[this.selected.indexOf(item)].selected = !this.selected[indexOf(item)].selected
      // item.selected = !item.selected;
      // if (item.selected && this.selected.indexOf(item) === -1) {
      //   this.selected.push(item);
      // } else if (!item.selected && this.selected.indexOf(item) !== -1) {
      //   this.selected.splice(this.selected.indexOf(item), 1);
      // }
    }
  },
  watch: {},
  mounted() {
    // this.selected = this.values.map(item => item);
  },
  computed:{
    values(){
      return this.$store.getters.getFilters[this.items]
    }
  }
};
</script>
