import { defineStore } from 'pinia';
import book1Image from '@/assets/1.jpg';
import book2Image from '@/assets/2.jpg';
import book3Image from '@/assets/3.jpg';
import book4Image from '@/assets/4.jpg';
import book5Image from '@/assets/5.jpg';
import book6Image from '@/assets/6.jpg';

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [
      { 
        id: 1, 
        title: "Don Quixote", 
        author: "Miguel de Cervantes Saavedra, Tobias George Smollett", 
        details: "The final and greatest utterance of the human mind.",
        imageUrl: book1Image
      },
      { 
        id: 2, 
        title: "The Hunger Games", 
        author: "Suzanne Collins", 
        details: "Could you survive on your own, in the wild, with everyone fighting against you? Twenty-four are forced to enter. Only the winner survives. ",
        imageUrl: book2Image
      },
      { 
        id: 3, 
        title: "Catching Fire", 
        author: "Suzanne Collins", 
        details: "Against all odds, Katniss Everdeen has won the annual Hunger Games with fellow district tribute Peeta Mellark. But it was a victory won by defiance of the Capitol and their harsh rules.",
        imageUrl: book3Image
      },
      { 
        id: 4, 
        title: "Harry Potter and the Chamber of Secrets", 
        author: "J. K. Rowling", 
        details: "The Dursleys were so mean and hideous that summer that all Harry Potter wanted was to get back to the Hogwarts School of Witchcraft and Wizardry. ",
        imageUrl: book4Image
      },
      { 
        id: 5, 
        title: "The Grey King", 
        author: "Susan Cooper", 
        details: "A strange boy and dog remind Will Stanton that he is an immortal, whose quest is to find the golden harp which will rouse others from a long slumber in the Welsh hills so they may prepare for the ultimate battle of Light versus Dark.",
        imageUrl: book5Image
      },
      { 
        id: 6, 
        title: "A Farewell to Arms", 
        author: "Ernest Hemingway", 
        details: "Hemingway's story of a tragic romance set against the brutality and confusion of World War I cemented his fame as a stylist and as a writer of extraordinary literary power.",
        imageUrl: book6Image
      }
    ],
    selectedBookId: null
  }),
  actions: {
    selectBook(bookId) {
      this.selectedBookId = bookId;
    }
  },
  getters: {
    selectedBook() {
      return this.books.find(book => book.id === this.selectedBookId);
    }
  }
});
