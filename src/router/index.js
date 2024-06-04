import { createRouter, createWebHistory } from "vue-router";
import mainView from "@/views/mainVeiw.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: mainView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
