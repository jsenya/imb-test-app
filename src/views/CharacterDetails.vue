<template>
  <div class="pt-3">
    <v-card max-width="344" class="mx-auto">
      <v-list-item>
        <v-list-item-avatar color="grey">{{ initials }}</v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{
            character_details.name
          }}</v-list-item-title>
          <v-list-item-subtitle
            >born ~ {{ character_details.birth_year }} in
            {{ homeWorld }}</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-icon>
          <v-btn icon @click="toggleFavorite">
            <v-icon :color="isFavorite ? 'red' : 'grey'">mdi-heart</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>

      <v-img src="../../public/img/bg/sw-1.jpg" height="250"></v-img>

      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card class="mx-auto" max-width="400" tile>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Details</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Gender</v-list-item-title>
                <v-list-item-subtitle>{{
                  character_details.gender
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Height</v-list-item-title>
                <v-list-item-subtitle
                  >{{ character_details.height }}(cm)</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Weight</v-list-item-title>
                <v-list-item-subtitle
                  >{{ character_details.mass }}(kg)</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Eyes</v-list-item-title>
                <v-list-item-subtitle>{{
                  character_details.eye_color
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Hair</v-list-item-title>
                <v-list-item-subtitle>{{
                  character_details.hair_color
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Skin</v-list-item-title>
                <v-list-item-subtitle>{{
                  character_details.skin_color
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Films</v-list-item-title>
                <v-list-item-subtitle>{{
                  character_details.films.length
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </div>
      </v-expand-transition>
    </v-card>

    <v-dialog v-model="showDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">The Force is With You</v-card-title>

        <v-card-text>
          You have reached the maximum amount of favorites you can have at the
          moment, sorry. You can remove some though to add {{ character_name }}.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="showDialog = false">
            Dismiss
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ApiService from "@/services/ApiService";

export default {
  name: "character-details",

  data: () => ({
    api: new ApiService(),
    isFavorite: false,
    show: false,
    showDialog: false,
    character_name: "",
    character_details: {
      name: null,
      height: null,
      gender: null,
      mass: null,
      hair_color: null,
      skin_color: null,
      eye_color: null
    },
    homeWorld: ""
  }),

  computed: {
    initials() {
      if (this.character_name) {
        var parts = this.character_name.split(" ");
        return parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : parts[0][0];
      }

      return "";
    }
  },

  methods: {
    getCharacter() {
      this.character_details = null;
      if (this.character_name) {
        this.api
          .getRequest(
            `https://swapi.co/api/people/?search=${this.character_name}`
          )
          .then(data => {
            if (data.results && data.results.length > 0) {
              this.character_details = data.results[0];
              this.getHomeWorld();
              this.isFavorite = this.$store.getters.favorite(
                this.character_details.url
              );
            }
          });
      }
    },
    getHomeWorld() {
      if (this.character_details) {
        this.api.getRequest(this.character_details.homeworld).then(data => {
          if (data) {
            this.homeWorld = data.name;
          }
        });
      }
    },
    toggleFavorite() {
      if (this.$store.getters.canAddFavorite || this.isFavorite) {
        this.isFavorite = !this.isFavorite;
        this.isFavorite
          ? this.$store.commit("addFavorite", this.character_details.url)
          : this.$store.commit("removeFavorite", this.character_details.url);
      } else {
        this.showDialog = true;
      }
    }
  },

  mounted() {
    if ("name" in this.$router.currentRoute.params) {
      this.character_name = this.$router.currentRoute.params.name;
      this.getCharacter();
    } else {
      console.log("select a character");
    }
  }
};
</script>
