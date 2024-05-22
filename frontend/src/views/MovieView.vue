<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        let route = useRoute();
        const movie = ref({});
        const newReview = ref({ name: '', score: '', review: ''});

        onMounted(async () => {
            try {
                const response = await fetch(`http://localhost:3000/movies/${route.params.id}`);
                const data = await response.json();
                movie.value = data;
            } catch (error) {
                console.error(error);
            }
        });

        const submitReview = async () => {
            try {
                const response = await fetch(`http://localhost:3000/reviews`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        movie: Number(route.params.id),
                        name: newReview.value.name,
                        score: Number(newReview.value.score),
                        review: newReview.value.review
                    })
                });
                if (response.ok) {
                    const addedReview = await response.json();
                    movie.value.reviews.push(addedReview);
                    newReview.value = { name: '', score: '', review: '' }; // Reset the form
                }
            } catch (error) {
                console.error(error);
            }
        };

        return {
            movie,
            newReview,
            submitReview
        };
    }
}
</script>

<template>
    <main class="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8" v-if="movie.Director">
        <section class="flex flex-col items-center sm:flex-row mb-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-800">{{ movie.name }}</h1>
                <div class="text-lg font-semibold text-gray-600">Directed by {{ movie.Director.name }}</div>
            </div>
        </section>
        <section>
            <h2 class="text-xl font-semibold text-gray-800">Reviews</h2>
            <div class="mt-4 mb-6">
                <input v-model="newReview.name" placeholder="Your name" class="p-2 border rounded-lg mr-2">
                <input v-model="newReview.score" type="number" min="1" max="5" placeholder="Rating (1-5)" class="p-2 border rounded-lg mr-2">
                <input v-model="newReview.review" placeholder="Your review" class="p-2 border rounded-lg">
                <button @click="submitReview" class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Submit Review</button>
            </div>
            <ul>
                <li v-for="review in movie.reviews" :key="review.id" class="mt-4 border-b border-gray-300 pb-4">
                    <div class="flex items-center space-x-4">
                        <img class="w-16 h-16 rounded-full shadow-sm"
                            :src="'https://i.pravatar.cc/300/?u=' + review.name" alt="">
                        <div>
                            <div class="font-medium text-gray-900">{{ review.name }}</div>
                            <div class="text-yellow-500">{{ review.score }}/5</div>
                            <div class="text-gray-600">{{ review.review }}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </main>
</template>
