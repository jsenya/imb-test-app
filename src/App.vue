<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      extended
      src="../public/img/bg/sw-4.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Star wars</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="toggleTheme">
        <v-icon v-if="darkTheme">mdi-brightness-7</v-icon>
        <v-icon v-else>mdi-brightness-4</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tabs" fixed-tabs>
          <v-tabs-slider></v-tabs-slider>
          <v-tab to="/" class="primary--text">
            <v-icon>mdi-home</v-icon>
          </v-tab>

          <v-tab to="/characterdetails" class="primary--text">
            <v-icon>mdi-account-box</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    tabs: null
  }),

  computed: {
    darkTheme() {
      return this.$vuetify.theme.dark;
    }
  },

  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
};
</script>
