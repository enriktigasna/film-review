<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const movies = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch('http://localhost:3000/movies');
        const data = await response.json();
        movies.value = data;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      movies
    };
  }
}
</script>

<template>
  <main>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items">
        <div v-for="movie in movies">
          {{ movie.title }}
        </div>
      </div>
    </div>
  </main>
</template>
