// store.js
import { writable } from "svelte/store";

export const query = writable({
  name: " ",
  phone: " ",
  email: " ",
});
