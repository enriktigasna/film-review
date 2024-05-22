<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const directors = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch('http://localhost:3000/directors');
        const data = await response.json();
        directors.value = data;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      directors
    };
  }
}
</script>

<template>
  <main>
    <div class="max-w-7xl p-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items justify-center gap-3">
        <div class="max-w-full rounded overflow-hidden border-gray-400 border p-4 shadow-sm flex" v-for="director in directors">
            <img :src="'https://i.pravatar.cc/300/' + director.name" alt="" class="max-w-16 rounded-full mr-4">
          <div>
            <div class="text-lg font-semibold text-blue-700">{{ director.name }}</div>
            <div class="text-sm text-gray-600">Average {{ director.average }} stars</div>
            <div class="text-sm text-gray-600">{{ director.count }} Movies </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
