import { createRouter, createWebHistory } from "vue-router";
import ContactList from "@/components/ContactList.vue";
import ContactFeed from "@/components/ContactFeed.vue";
import ContactDetails from "@/components/ContactDetails.vue";
import ContactEdit from "@/components/ContactEdit.vue";
import NoteAdd from "@/components/NoteAdd.vue";
import NoteList from "@/components/NoteList.vue";
import NoteDetails from "@/components/NoteDetailsSamePanel.vue";
import NoteEdit from "@/components/NoteEdit.vue";
import GridTest from "@/components/GridTest.vue";
import NoteDetailsPaneled from "@/components/NoteDetailsNewPanel.vue";
import NoteDetailsSamePanel from "@/components/NoteDetailsSamePanel.vue";
import NoteDetailsNewPanel from "@/components/NoteDetailsNewPanel.vue";

const routes= [
  {
    path: "/",
    redirect: "/contacts",
  },
  {
    path: "/grid",
    component: GridTest,
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
            path: "",
            component: ContactDetails,
            meta: {
              hidePanel: true,
            }
          },

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
                  component: NoteDetailsNewPanel,
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
