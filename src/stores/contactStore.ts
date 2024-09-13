// stores/contactsStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";


export const useContactsStore = defineStore("contacts", () => {
  const contacts = ref([
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Emily Johnson", email: "emily.johnson@example.com" },
  ]);

  // Action to get all contacts
  const getAllContacts = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(contacts.value);
      }, 500);
    });
  };

  const getContactById = async (id: number | string)=> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const contact = contacts.value.find((c) => c.id == id);
        if (contact) {
          resolve(contact);
        } else {
          reject(new Error("Contact not found"));
        }
      }, 500);
    });
  };

  return {
    contacts,
    getAllContacts,
    getContactById,
  };
});
