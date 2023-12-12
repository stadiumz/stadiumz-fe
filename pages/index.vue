<script setup>
// consume api
const { token } = useAuth()

const posts = ref([])

const {
  data: articles,
  pending,
  error,
} = await useFetch(() => 'http://localhost:8000/api/artikels', {
  headers: {
    Authorization: token,
  },
})
posts.value = articles.value.data
</script>

<template>
  <div class="flex flex-col justify-center px-48 mt-5">

    <CreatePost />

    <div class="w-full mt-5">
      <div
        class="flex flex-col gap-5"
        v-for="(item, index) in posts"
        :key="index"
      >
        <Post :post="item" />
      </div>
    </div>
  </div>
</template>
