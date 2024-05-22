<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <a href="/">
              <img class="h-8 w-8" src="https://yt3.googleusercontent.com/weD7WfgxB3sjFX7Yr4RBk3oAYKYLT4yjb9N3yK10VwF1Pmusidh7xqk1tAP23QpW1rur2Gst0s4=s900-c-k-c0x00ffffff-no-rj" alt="Logo">
            </a>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <RouterLink to="/" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</RouterLink>
              <RouterLink to="/reviews" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reviews</RouterLink>
              <RouterLink to="/users" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Users</RouterLink>
              <RouterLink to="/directors" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Directors</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>

</style>
