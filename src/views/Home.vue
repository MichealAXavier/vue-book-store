<template>
  <div class="container">
    <div class="header">Book Store
      <div class="selected-book">
        <label>Selected Book:</label>
        <input type="text" v-model="selectedBookName" readonly class="custom-input" @click.stop>
      </div>
    </div>
    <hr>
    <div class="row">
      <div
        class="flex-parent" 
        v-for="(book, index) in books"
        :key="index"
        @click="selectBook(book.id)"
        :class="{ 'selected': selectedIndex === index }"
      >
        <div class="card" :class="{ 'selected-card': selectedIndex === index }">
          <img :src="book.imageUrl" class="card-img-top" alt="Book Image">
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text"><strong>Author:</strong> {{ book.author }}</p>
            <p class="card-text"><strong>Summary:</strong>{{ book.details }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBookStore } from '../store/bookStore';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
setup() {
  const bookStore = useBookStore();
  const router = useRouter();

  const selectedBookId = computed(() => bookStore.selectedBookId);
  const selectedBookName = ref('');
  const selectedIndex = ref(-1);

  const selectBook = (bookId) => {
    bookStore.selectBook(bookId);
    if (bookId) {
      router.push({ query: { id: bookId } }); // Update URL with book ID
    } else {
      router.push({ query: {} }); // Clear the URL parameters if no book is selected
    }
  };

  // Initialize selected book ID, name, and index from localStorage on component mount
  onMounted(() => {
    const idFromUrl = router.currentRoute.value.query.id;
    if (idFromUrl) {
      selectBook(idFromUrl);
    } else {
      const savedBookId = localStorage.getItem('selectedBookId');
      if (savedBookId) {
        selectBook(savedBookId);
      }
    }

    // Initialize selected book name from localStorage
    const savedBookName = localStorage.getItem('selectedBookName');
    if (savedBookName) {
      selectedBookName.value = savedBookName;
    }

    // Initialize selected index from localStorage
    const savedSelectedIndex = localStorage.getItem('selectedIndex');
    if (savedSelectedIndex !== null) {
      selectedIndex.value = parseInt(savedSelectedIndex);
    }
  });

  // Watch for changes in selected book ID from URL query parameter
  watch(() => router.currentRoute.value.query.id, (newId) => {
    selectBook(newId);
  });

  // Watch for changes in selected book ID and update selected book name and index accordingly
  watch(selectedBookId, (newId) => {
    if (newId !== null) {
      const selectedBook = bookStore.books.find(book => book.id === newId);
      if (selectedBook) {
        selectedBookName.value = selectedBook.title;
        localStorage.setItem('selectedBookName', selectedBook.title);
        const index = bookStore.books.findIndex(book => book.id === newId);
        selectedIndex.value = index !== -1 ? index : -1;
        localStorage.setItem('selectedIndex', selectedIndex.value.toString());
      }
    } 
  }, { immediate: true });

  return {
    books: bookStore.books,
    selectedBookName,
    selectedIndex,
    selectBook,
  };
},
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
  border: 4px solid #ff9800; /* Add border for highlighting */
}

.custom-input {
  width: 200px;
  height: 50px;
  font-weight: bold; /* Make the text bold */
  font-size: 16px; /* Increase the font size */
}
</style>
