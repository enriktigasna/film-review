<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        let route = useRoute();
        const user = ref({});
        const newReview = ref({ name: '', score: '', review: ''});

        onMounted(async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${route.params.name}`);
                const data = await response.json();
                user.value = data;
            } catch (error) {
                console.error(error);
            }
        });

        return {
            user,
            newReview,
        };
    }
}
</script>

<template>
    <main class="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8" v-if="user">
        <section class="flex flex-col items-center sm:flex-row mb-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-800">Reviews by {{ $route.params.name }}</h1>
                <!--<div class="text-lg font-semibold text-gray-600">Directed by {{ movie.Director.name }}</div>-->
            </div>
        </section>
        <section>
            <h2 class="text-xl font-semibold text-gray-800">Reviews</h2>
            <ul>
                <li v-for="review in user" :key="review.id" class="mt-4 border-b border-gray-300 pb-4">
                    <div class="flex items-center space-x-4">
                        <img class="w-16 h-16 rounded-full shadow-sm"
                            :src="'https://i.pravatar.cc/300/?u=' + review.name" alt="">
                        <div>
                            <a :href="'/movies/' + review.movie"><div class="font-semibold text-gray-900">{{ review.Movie.name }}</div></a>
                            <div class="text-yellow-500">{{ review.score }}/5</div>
                            <div class="text-gray-600">{{ review.review }}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </main>
</template>
