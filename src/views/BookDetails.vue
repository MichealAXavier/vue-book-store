<template>
  <div class="container">
    <div class="header">Book Details</div>
    <hr>
    <div class="book-details">
      <div class="selected-book">
        <label>Selected Book:</label>
        <input type="text" v-model="selectedBookName" readonly class="custom-input">
      </div>
      <div class="book-info">
        <div class="card">
          <img :src="book.imageUrl" class="card-img-top" alt="Book Image">
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text"><strong>Author:</strong> {{ book.author }}</p>
            <p class="card-text"><strong>Summary:</strong> {{ book.details }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const selectedBookName = ref('');
    
    onMounted(() => {
      // Fetch book details based on the route params (book ID)
      // For demonstration purposes, let's assume book data is fetched from an API
      const bookId = route.params.id;
      const book = fetchBookById(bookId); // Implement this function to fetch book data
      selectedBookName.value = book.title;
    });

    onUnmounted(() => {
      selectedBookName.value = ''; // Clear the selected book name when component unmounts
    });

    const selectedBookId = computed(() => route.params.id);

    return {
      selectedBookName,
      selectedBookId
    };
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.selected-book {
  margin-bottom: 20px;
}

.custom-input {
  width: 300px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
}

.book-info {
  display: flex;
  justify-content: center;
}

.card {
  width: 400px;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.card-img-top {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-text {
  font-size: 18px;
  margin-bottom: 5px;
}

</style>
