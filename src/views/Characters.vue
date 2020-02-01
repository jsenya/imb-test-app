<template>
  <div class="ma-8">
    <Character-List />
  </div>
</template>

<script>
import ApiService from "@/services/ApiService";
import CharacterList from "@/components/CharacterList";

export default {
  name: "characters",

  components: {
    CharacterList
  },

  data: () => ({
    api: new ApiService()
  }),

  mounted() {}
};
</script>
