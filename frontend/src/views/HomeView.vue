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
    <div class="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
      <div class="flex items justify-center gap-2">
        <div class="max-w-64 rounded overflow-hidden border-gray-400 border" v-for="movie in movies">
          <div class="font-bold text-xl m-2">{{ movie.name }}</div>
          <div class="text-gray-700 text-base m-2">{{ movie.Director.name }}</div>
          <img class="w-full" src="https://placehold.co/400x600" alt="">
        </div>
      </div>
    </div>
  </main>
</template>
