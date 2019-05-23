<template>
  <v-bottom-sheet inset>
    <v-btn slot="activator" :color="color" dark round>{{label}}</v-btn>
    <v-layout row wrap justify-space-between>
      <v-card tile color="rgba(0,0,0,0.5">
        <v-chip
          :light="item.selected"
          v-for="item in items"
          :key="Math.random()"
          :selected="item.selected"
          @click="select(item)"
        >
          <v-avatar>
            <v-icon :color="item.selected?'red':'green'">{{item.selected?'cancel':'check_circle'}}</v-icon>
          </v-avatar>
          {{item.name}}
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
    items: Array
  },
  data() {
    return {
      selected: []
    };
  },
  methods: {
    select: function(item) {
      console.log("item");
      item.selected = !item.selected;
      if (item.selected && this.selected.indexOf(item) === -1) {
        this.selected.push(item);
      } else if (!item.selected && this.selected.indexOf(item) !== -1) {
        this.selected.splice(this.selected.indexOf(item), 1);
      }
    }
  },
  watch: {},
  mounted() {
    this.selected = this.items.map(item => (item.selected ? item : null));
  }
};
</script>
