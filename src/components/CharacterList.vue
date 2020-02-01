<template>
  <v-card>
    <v-card-title>
      Star Wars Characters
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        v-on:keyup.enter="filter"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      fixed-header
      hide-default-footer
      height="300px"
      :server-items-length="count"
      :loading="isLoading"
      loading-text="Loading... Please wait"
      no-data-text="No characters were found"
      :headers="headers"
      :items="items"
      :search="search"
      class="elevation-5"
      @click:row="rowClicked"
    >
      <template v-slot:item.favorite="{ item }">
        <v-icon medium :color="getColor(item.favorite)" class="linkable"
          >mdi-heart</v-icon
        >
      </template>
      <template slot="footer">
        <v-pagination
          v-model="page"
          :length="pageLength"
          :total-visible="7"
          @next="navigate"
          @previous="navigate"
          @input="navigate"
        ></v-pagination>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ApiService from "@/services/ApiService";

export default {
  name: "character-list",
  data() {
    return {
      api: new ApiService(),
      isLoading: true,
      baseUrl: "https://swapi.co/api/people",
      search: "",
      page: 1,
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Height (cm)", value: "height" },
        { text: "Gender", value: "gender" },
        { text: "Mass (kg)", value: "mass" },
        { text: "Hair Color", value: "hair_color" },
        { text: "Skin Color", value: "skin_color" },
        { text: "Eye Color", value: "eye_color" },
        { text: "Favorite", value: "favorite" }
      ],
      swcharacters: null
    };
  },

  computed: {
    count() {
      if (this.swcharacters) return this.swcharacters.count;
      return 0;
    },
    pageLength() {
      return this.count > 0 ? Math.floor(this.count / 10) : 1;
    },
    items() {
      if (this.swcharacters) {
        var newItem = this.swcharacters.results.map(m => ({
          name: m.name,
          height: m.height,
          gender: m.gender,
          hair_color: m.hair_color,
          skin_color: m.skin_color,
          eye_color: m.eye_color,
          favorite: this.$store.getters.favorite(m.url)
        }));
        return newItem;
      }

      return [];
    }
  },

  methods: {
    getCharacters(url) {
      this.isLoading = true;
      this.api
        .getRequest(url)
        .then(data => {
          this.swcharacters = data;
        })
        .then(() => {
          this.isLoading = false;
        });
    },
    loadAllCharacters() {
      this.getCharacters(this.baseUrl);
    },
    navigate() {
      if (this.swcharacters) {
        this.getCharacters(`https://swapi.co/api/people/?page=${this.page}`);
      }
    },
    filter() {
      this.getCharacters(`https://swapi.co/api/people/?search=${this.search}`);
    },
    getColor(favorite) {
      if (favorite) return "red";
    },
    rowClicked(row) {
      this.$router.push(`/characterdetails/${row.name}`);
    }
  },

  mounted() {
    this.loadAllCharacters();
  }
};
</script>

<style lang="scss" scoped>
.linkable {
  cursor: default;
}
</style>
