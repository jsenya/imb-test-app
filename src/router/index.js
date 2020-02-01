import Vue from "vue";
import VueRouter from "vue-router";
import Characters from "../views/Characters.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "characters",
    component: Characters
  },
  {
    path: "/characterdetails/:name",
    name: "characterdetails",
    component: () =>
      import(
        /* webpackChunkName: "characters" */ "../views/CharacterDetails.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
