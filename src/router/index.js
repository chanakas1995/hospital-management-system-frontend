import Vue from "vue";
import VueRouter from "vue-router";
import PatientsList from "../views/PatientsList.view.vue";
import AdmissionsList from "../views/AdmissionsList.view.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/patients",
    name: "patients",
    component: PatientsList,
  },
  {
    path: "/admissions",
    name: "admissions",
    component: AdmissionsList,
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
