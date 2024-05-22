<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const users = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        users.value = data;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      users
    };
  }
}
</script>

<template>
  <main>
    <div class="max-w-7xl p-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items justify-center gap-3">
        <div class="max-w-full rounded overflow-hidden border-gray-400 border p-4 shadow-sm" v-for="user in users">
          <a class="flex" :href="'/users/' + user.name">
            <img :src="'https://i.pravatar.cc/300/' + user.name" alt="" class="max-w-16 rounded-full mr-4">
          <div>
            <div class="text-lg font-semibold text-blue-700">{{ user.name }}</div>
            <div class="text-sm text-gray-600">Average {{ user._avg.score }} stars</div>
            <div class="text-sm text-gray-600">{{ user._count.score }} Reviews</div>
          </div>
        </a>
        </div>
      </div>
    </div>
  </main>
</template>
