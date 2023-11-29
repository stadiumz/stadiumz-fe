<script setup>
const loading = ref(false)
const startLearn = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    navigateTo('/learning/detail')
  }, 1000)
}
</script>

<template>
  <div class="mt-5">
    <div>
      <h1 class="text-2xl font-bold">Let's learn something new!</h1>
      <span> You can learn anything you want here! </span>
    </div>
    <div class="flex items-center justify-center mt-5 p-36 bg-base-100 card">
      <div class="flex w-80 h-80">
        <img src="@/learn.svg" alt="learn" />
      </div>
      <div class="flex flex-col justify-center mt-10 text-center">
        <h1 class="text-2xl font-bold">Start learn the unthinkable</h1>
        <span>What do you want to learn today?</span>
        <!-- input -->
        <div class="flex flex-col mt-5">
          <input
            type="text"
            placeholder="Search for anything"
            class="p-2 border-2 border-gray-300 rounded-md outline-none"
          />
          <button
            @click="startLearn"
            class="mt-2 text-white btn bg-brand"
            :class="loading ? 'btn-disabled' : ''"
          >
            <div v-if="loading" class="flex items-center">
              <span class="mr-3 loading loading-spinner"></span>
              Generate material & quiz
            </div>

            <span v-else>Start Learn</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
