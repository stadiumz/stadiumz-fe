<script setup>
const loading = ref(false)
const topics = ref([])
const { token } = useAuth()

const {
  data: topic,
  pending,
  error,
} = await useFetch(() => 'http://localhost:8000/api/topic', {
  headers: {
    Authorization: token,
  },
})
topics.value = topic.value.data

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
    <div class="flex justify-center h-full p-10 mt-5 bg-base-100 card">
      <div class="flex justify-between">
        <div>
          <h1 class="text-xl font-bold text-base-content">All Topic</h1>
        </div>
        <div>
          <NuxtLink to="/learning/create" class="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Topic
          </NuxtLink>
        </div>
      </div>
      <div class="flex flex-row flex-wrap gap-4 mt-5" v-if="topics.length > 0">
        <NuxtLink
          :to="`/learning/${item.id}/detail`"
          v-for="(item, index) in topics"
          :key="index"
        >
          <div
            class="transition shadow-xl card w-80 bg-base-100 hover:bg-base-200"
          >
            <div class="card-body">
              <h2 class="card-title">{{ item.topic }}</h2>

              <div class="flex justify-between mt-10">
                <div class="flex flex-row items-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555a.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533Zm1.5 16.103A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z"
                    />
                  </svg>
                  <span class="ml-2 text-sm">
                    {{ item.sub_topics_count }} Subtopics</span
                  >
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="flex justify-center mt-5" v-else>
        <span class="font-bold text-base-content">No topic found</span>
      </div>
    </div>
  </div>
</template>
<style></style>
