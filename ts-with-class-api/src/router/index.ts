import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import About from "../views/AboutView.vue";
import Users from "../views/GithubUsers.vue";
import User from "../views/GithubUser.vue";

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/users",
      name: "users",
      component: Users,
    },
    {
      path: "/users/:username",
      name: "user",
      component: User,
      props: true,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
  ],
});

export default router;
