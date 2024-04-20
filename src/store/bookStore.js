// selectedBookStore.js
import { defineStore } from 'pinia';

export const useSelectedBookStore = defineStore({
  id: 'selectedBook',
  state: () => ({
    id: null,
    title: '',
    author: '',
    details: '',
    imageUrl: ''
  }),
  actions: {
    setSelectedBook(book) {
      this.id = book.id;
      this.title = book.title;
      this.author = book.author;
      this.details = book.details;
      this.imageUrl = book.imageUrl;
    },
    clearSelectedBook() {
      this.id = null;
      this.title = '';
      this.author = '';
      this.details = '';
      this.imageUrl = '';
    }
  }
});
