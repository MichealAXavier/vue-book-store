 <template>
  <div class="container">
    <div class="head">Book Store
      <div class="header">
        <label>Selected Book:</label>
        <input type="text" v-model="selectedBookTitle" readonly class="custom-input">
      </div>
      <div class="header">
        <label>Search:</label>
        <input type="text" v-model="searchQuery" placeholder="Search by title" class="search-input">
      </div>
    </div>
    <hr>

    <!-- Combined book selection and display section -->
    <div>
      <div class="row">
        <div v-if="filteredBooks.length === 0" class="no-books">
          No books found
        </div>
        <div v-else class="card" v-for="(book, index) in filteredBooks" :key="index" @click="selectBook(book)"
          :class="{ 'selected': selectedBookId == book.id }">
          <div :class="{ 'selected-card': selectedBookId == book.id }">
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
  </div>
</template>

<script>
import { computed, ref } from 'vue'; // Import ref
import { useRoute, useRouter } from 'vue-router';
import { useBooks } from '../mixins/bookData';
import { useSelectedBookStore } from '../store/bookStore'; // Import the Pinia store

export default {
  props: {
    id: String 
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const { books } = useBooks();
    const selectedBookStore = useSelectedBookStore(); // Use the Pinia store

    // Compute selected book ID from the Pinia store
    const selectedBookId = computed(() => {
      return selectedBookStore.id;
    });

    // Compute selected book title from the Pinia store
    const selectedBookTitle = computed(() => {
      return selectedBookStore.title;
    });

    // Search Query for filtering books by title
    const searchQuery = ref(''); // Define searchQuery using ref

    // Filter books based on the search query
    const filteredBooks = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return books.value.filter(book => book.title.toLowerCase().includes(query));
    });

    // Handle selection of a book
    const selectBook = (book) => {
      selectedBookStore.setSelectedBook(book);
      router.replace({ path: `/${book.id}` });
    };

    // Handle initial selection based on the route parameter
    if (props.id) {
      const initialBookId = parseInt(props.id);
      if (!isNaN(initialBookId)) {
        const selectedBook = books.value.find(book => book.id === initialBookId);
        if (selectedBook) {
          selectedBookStore.setSelectedBook(selectedBook);
        }
      }
    }

    return {
      selectedBookId,
      selectedBookTitle,
      searchQuery,
      filteredBooks,
      selectBook,
    };
  },
};

</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Ensure even spacing between cards */
}

.card {
  width: calc(33.33% - 20px); /* Set width to 33.33% minus margin to accommodate 3 cards per row */
  margin-bottom: 20px; /* Adjust margin between cards */
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid transparent; /* Add transparent border to all cards */
}

.card:hover {
  cursor: pointer; /* Show pointer cursor on hover */
}

.card-img-top,
.card-img-bottom {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.card-body {
  padding: 1rem;
}

.selected {
   border-color: blue;
}

.custom-input {
  width: 200px;
  height: 50px;
  font-weight: bold; /* Make the text bold */
  font-size: 16px; /* Increase the font size */
}

.search-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 50%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.no-books {
  margin-top: 20px;
  text-align: center;
  width: 100%;
  color: red;
}
</style>
