<template>
  <v-app dark>
    <!-- <v-toolbar fixed app >
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar> -->
    <v-content >
      <v-container fill-height>
        <nuxt/>
      </v-container>
    </v-content>
    <!-- <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed>
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer  app>
      <span>&copy; {{ new Date().getFullYear() }}</span>

    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Markov', to: '/markov' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'FileSync'
    }
  }

}
</script>
