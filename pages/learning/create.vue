<script setup>
const loading = ref(false)
const topic = ref('')
const { token } = useAuth()


const startLearn = () => {
  loading.value = true
  
  useFetch(() => 'http://localhost:3472/api/generate/topic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      topic: topic.value,
    }),
  })
  .then((res) => {
    if(res.status.value == 'success'){
      loading.value = false
      navigateTo('/learning/detail')
    }else{
      loading.value = false
      alert(res.error.value.cause.response._data.message)
    }
  })
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
          <form class="flex flex-col mt-5" @submit.prevent="startLearn">
            <input
              type="text"
              placeholder="Search for anything"
              class="p-2 border-2 border-gray-300 rounded-md outline-none"
              v-model="topic"
            />
            <button
              type="submit"
              class="mt-2 text-white btn bg-brand"
              :class="loading ? 'btn-disabled' : ''"
            >
              <div v-if="loading" class="flex items-center">
                <span class="mr-3 loading loading-spinner"></span>
                Generate material & quiz
              </div>

              <span v-else>Start Learn</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
