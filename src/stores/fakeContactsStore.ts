// stores/contactsStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFakeContactsStore = defineStore("fakeContactData", () => {
  const contacts = ref([
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Emily Johnson", email: "emily.johnson@example.com" },
  ]);

  const notes = ref([
    { id: 1, contactId: 1, content: "Follow up next week" },
    { id: 2, contactId: 1, content: "Discuss project details" },
    { id: 3, contactId: 2, content: "Send proposal" },
    { id: 4, contactId: 2, content: "Schedule a meeting" },
    { id: 5, contactId: 3, content: "Call for feedback" },
    { id: 6, contactId: 3, content: "Review contract" },
  ]);

  let contactIdCounter = 4; // Assuming 3 contacts are preloaded
  let noteIdCounter = 7; // Assuming 6 notes are preloaded

  // Fake delay function
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // CONTACT CRUD OPERATIONS

  // Action to get all contacts
  const getAllContacts = async () => {
    await delay(500);
    return contacts.value;
  };

  // Action to get a contact by ID
  const getContactById = async (id) => {
    await delay(500);
    const contact = contacts.value.find((c) => c.id == id);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  };

  // Action to add a new contact
  const addContact = async (newContact: { name: string; email: string }) => {
    await delay(500);
    const id = contactIdCounter++;
    contacts.value.push({ id, ...newContact });
    return contacts.value;
  };

  // Action to update an existing contact
  const updateContact = async (id: number, updatedContact: { name?: string; email?: string }) => {
    await delay(500);
    const contact = contacts.value.find((c) => c.id == id);
    if (!contact) {
      throw new Error("Contact not found");
    }
    Object.assign(contact, updatedContact);
    return contact;
  };

  // Action to delete a contact
  const deleteContact = async (id: number) => {
    await delay(500);
    const index = contacts.value.findIndex((c) => c.id == id);
    if (index === -1) {
      throw new Error("Contact not found");
    }
    contacts.value.splice(index, 1);
    // Also delete associated notes
    notes.value = notes.value.filter((note) => note.contactId !== id);
    return contacts.value;
  };

  // NOTE CRUD OPERATIONS

  // Action to get all notes for a contact
  const getNotesByContactId = async (contactId: number) => {
    await delay(500);
    return notes.value.filter(note => note.contactId == contactId);
  };

  // Action to get a note by its ID
  const getNoteById = async (noteId: number) => {
    await delay(500);
    const note = notes.value.find((n) => n.id == noteId);
    if (!note) {
      throw new Error("Note not found");
    }
    return note;
  };

  // Action to add a new note to a specific contact
  const addNote = async (contactId: number, noteContent: string) => {
    console.log("Adding note", contactId, noteContent);
    await delay(500);
    const newNote = { id: noteIdCounter++, contactId, content: noteContent };
    notes.value.push(newNote);
    return newNote;
  };

  // Action to update a note for a specific contact
  const updateNote = async (noteId: number, updatedContent: string) => {
    await delay(500);
    const note = notes.value.find((n) => n.id == noteId);
    if (!note) {
      throw new Error("Note not found");
    }
    note.content = updatedContent;
    return note;
  };

  // Action to delete a note by its ID
  const deleteNote = async (noteId: number) => {
    await delay(500);
    const index = notes.value.findIndex((n) => n.id == noteId);
    if (index === -1) {
      throw new Error("Note not found");
    }
    notes.value.splice(index, 1);
    return notes.value;
  };

  return {
    contacts,
    notes,
    getAllContacts,
    getContactById,
    addContact,
    updateContact,
    deleteContact,
    getNotesByContactId,
    getNoteById,
    addNote,
    updateNote,
    deleteNote,
  };
});
