<template>
  <div class="container">
    <div class="header">Book Store
      <div class="selected-book">
        <label>Selected Book:</label>
        <input type="text" v-model="selectedBookName" readonly>
      </div>
    </div>
    <hr>
    <div class="row">
      <div
        class="flex-parent" 
        v-for="(book, index) in books"
        :key="index"
        @click="selectBook(index)"
        :class="{ 'selected': selectedIndex === index }"
      >
        <div class="card" :class="{ 'selected-card': selectedIndex === index }">
          <img :src="book.imageUrl" class="card-img-top" alt="Book Image">
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text"><strong>Author:</strong> {{ book.author }}</p>
            <p class="card-text">{{ book.details }}</p>
            <a href="#" class="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBookStore } from '../store/bookStore';
import { computed } from 'vue';

export default {
  setup() {
    const bookStore = useBookStore();
    const selectedIndex = bookStore.selectedBookId;

    // Define a computed property for selectedBookName
    const selectedBookName = computed(() => {
      const selectedBook = bookStore.books.find(book => book.id === selectedIndex);
      return selectedBook ? selectedBook.title : '';
    });

    return {
      books: bookStore.books,
      selectedIndex,
      selectedBookName,
      selectBook: bookStore.selectBook
    };
  }
};
</script>
<style scoped>
.flex-parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  margin-bottom: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  width: 500px;
  max-width: 500px;
  margin: 20px;
  padding: 20px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.card-img-top,
.card-img-bottom {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.card-body {
  padding: 1.25rem;
}

.selected-card {
  background-color: rgb(252, 248, 57); /* Set background color of selected card */
}
</style>
