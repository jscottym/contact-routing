import { createRouter, createWebHistory } from "vue-router";
import ContactList from "@/components/ContactList.vue";
import ContactFeed from "@/components/ContactFeed.vue";
import ContactDetails from "@/components/ContactDetails.vue";
import ContactEdit from "@/components/ContactEdit.vue";
import NoteAdd from "@/components/NoteAdd.vue";
import NoteList from "@/components/NoteList.vue";
import NoteDetails from "@/components/NoteDetails.vue";
import NoteEdit from "@/components/NoteEdit.vue";

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
        path: ":contactId",
        component: ContactFeed,
        children: [
          {
            path: "details",
            component: ContactDetails,
          },

          {
            path: "edit",
            component: ContactEdit,
          },

          {
            path: "notes",
            component: NoteList,
            children: [
                {
                  path: "add",
                  component: NoteAdd,
                },

                {
                  path: ":noteId",
                  component: NoteDetails,
                  children: [
                    {
                      path: "edit",
                      component: NoteEdit,
                    }
                  ]
                }
            ]
          }
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
