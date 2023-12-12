<script setup>
import { onMounted } from 'vue'
const { token, data } = useAuth()

// config props
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

var isLiked = ref(false)

onMounted(() => {
  // check if user already like this post
  isLiked.value = props.post.reactions.map(
    (reaction) => reaction.user_id === data.value.id
  )[0]
})

// datetime to human readable
const toHumanReadable = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(date).toLocaleDateString('id-ID', options)
}

const likePost = async (id) => {
  useFetch(() => 'http://localhost:8000/api/reactions', {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: {
      article_id: id,
    },
  })
    .then((data) => {
      // toggle isLiked
      isLiked.value = !isLiked.value
      props.post.reactions_count = data.data.value.data.length
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="p-5 my-5 card bg-base-100">
    <div class="flex flex-row items-center">
      <div class="avatar">
        <div class="w-16 rounded-full">
          <img :src="post.user.profile_photo" />
        </div>
      </div>
      <div class="flex flex-col ml-5">
        <span class="font-bold text-primary">{{ post.user.name }}</span>
        <span class="text-sm text-base-content">{{
          toHumanReadable(post.created_at)
        }}</span>
      </div>
    </div>
    <!-- title -->
    <div class="mt-5">
      <h1 class="text-2xl font-bold">{{ post.title }}</h1>
    </div>
    <div class="mt-5" v-html="post.content"></div>
    <div class="mt-5">
      <div class="flex flex-row gap-5">
        <button
          @click="likePost(post.id)"
          class="flex flex-row items-center gap-2 btn-sm btn btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            :class="isLiked ? 'text-brand' : ''"
          >
            <path
              fill="currentColor"
              d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.375a7.47 7.47 0 0 1 1.602-4.634c.151-.192.373-.309.6-.397c.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V3a.75.75 0 0 1 .75-.75a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218c-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715c.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23a4.53 4.53 0 0 1-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777Zm-5.162-7.773a11.969 11.969 0 0 0-.831 4.398a12 12 0 0 0 .52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666c.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z"
            />
          </svg>
          <span class="text-base-content">{{ post.reactions_count }}</span>
        </button>
        <nuxt-link
          :to="`/article/${post.id}`"
          class="flex flex-row items-center gap-2 btn-sm btn btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902c1.168.188 2.352.327 3.55.414c.28.02.521.18.642.413l1.713 3.293a.75.75 0 0 0 1.33 0l1.713-3.293a.783.783 0 0 1 .642-.413a41.102 41.102 0 0 0 3.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0 0 10 2ZM6.75 6a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Zm0 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-base-content">{{ post.comments_count }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<style></style>
