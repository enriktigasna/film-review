<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const reviews = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch('http://localhost:3000/reviews');
        const data = await response.json();
        reviews.value = data;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      reviews
    };
  }
}
</script>

<template>
  <main>
    <div class="max-w-7xl p-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items justify-center gap-3">
        <div class="max-w-full rounded overflow-hidden border-gray-400 border p-4 shadow-sm" v-for="review in reviews">
            <div class="text-lg font-semibold text-blue-700">{{ review.Movie.name }}</div>
            <div class="text-sm text-gray-600">{{ review.score }}/5 Stars</div>
            <div class="text-md text-gray-800 font-semibold">{{ review.name }}</div>
            <div class="text-gray-900">{{ review.review }}</div>
        </div>
      </div>
    </div>
  </main>
</template>
