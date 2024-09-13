import { createRouter, createWebHistory } from "vue-router";
import ContactList from "@/components/ContactList.vue";
import ContactPage from "@/components/ContactPage.vue";
import ContactDetails from "@/components/ContactDetails.vue";
import ContactEdit from "@/components/ContactEdit.vue";
import ContactAdd from "@/components/ContactAdd.vue";

const routes= [
  {
    path: "/",
    redirect: "/contacts",
  },
  {
    path: "/contacts",
    name: "contact-list",
    component: ContactList,
    children: [
      {
        path: "contact",
        children: [
          {
            path: ":contactId",
            component: ContactPage,
            children: [
              {
                path: "",
                name: "contact-details",
                component: ContactDetails,
              },
              {
                path: "edit",
                name: "contact-edit",
                component: ContactEdit,
              },
            ],
          },
          {
            path: "add",
            component: ContactAdd,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
