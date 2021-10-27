import Vue from "vue";
import VueRouter from "vue-router";
import PatientsList from "../views/PatientsList.view.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/patients",
    name: "patients",
    component: PatientsList,
  },
  {
    path: "/",
    redirect: "/patients",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
