<script setup>
const { token, data } = useAuth()
// get id from params
const route = useRoute()
const id = route.params.id
const loading = ref(false)
const articles = ref([])
const comment = ref('')

var isLiked = ref(false)

const {
  data: article,
  pending,
  error,
} = await useFetch(() => `http://localhost:8000/api/artikels/${id}`, {
  headers: {
    Authorization: token,
  },
})
articles.value = article.value.data

// check if user already like this post
if (articles.value.reactions.length > 0) {
  isLiked.value = articles.value.reactions.map((reaction) => reaction.user_id === data.value.id)[0]
}

const toHumanReadable = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(date).toLocaleDateString('id-ID', options)
}

const postComment = (index) => {
  // push to articles comments
  articles.value.comments.push({
    comment: comment.value,
    user: {
      name: data.value.name,
      profile_photo: data.value.profile_photo,
    },
    created_at: new Date(),
  })
  var _comment = comment.value
  comment.value = ''
  useFetch(() => `http://localhost:8000/api/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      article_id: articles.value.id,
      comment: _comment,
    }),
  })
    .then((res) => {
      // comment.value = ''
    })
    .catch((err) => {
      console.log(err)
    })
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
      articles.value.reactions_count = data.data.value.data.length
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="mt-5">
    <ButtonBack class="my-3" />
    <div class="p-5 my-5 card bg-base-100">
      <div class="flex flex-row items-center">
        <div class="avatar">
          <div class="w-16 rounded-full">
            <img
              :src="'/' + articles.user.profile_photo"
            />
          </div>
        </div>
        <div class="flex flex-col ml-5">
          <span class="font-bold text-primary">{{ articles.user.name }}</span>
          <span class="text-sm text-base-content">{{
            toHumanReadable(articles.created_at)
          }}</span>
        </div>
      </div>
      <!-- title -->
      <div class="mt-5">
        <h1 class="text-2xl font-bold">{{ articles.title }}</h1>
      </div>
      <div class="mt-5" v-html="articles.content"></div>
      <div class="mt-5">
        <div class="flex flex-row gap-5">
          <button
            @click="likePost(articles.id)"
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
            <span class="text-base-content">{{
              articles.reactions_count
            }}</span>
          </button>
          <div class="flex flex-row items-center gap-2 btn-sm btn btn-ghost">
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
            <span class="text-base-content">{{ articles.comments_count }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- comment -->
    <div
      v-if="articles.comments.length > 0"
      class="p-5 space-y-3 card bg-base-100"
    >
      <div
        v-for="comment in articles.comments"
        :key="comment.id"
        class="flex items-center gap-10"
      >
        <div class="flex-shrink-0">
          <img
            class="w-10 h-10 rounded-full"
            :src="'/' + comment.user.profile_photo"
            alt="User avatar"
          />
        </div>
        <div>
          <p class="font-semibold">{{ comment.user.name }}</p>
          <p>{{ comment.comment }}</p>
          <p class="text-xs text-gray-500">
            {{ toHumanReadable(comment.created_at) }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="p-5 space-y-3 card bg-base-100">
      <div class="flex items-center gap-10">
        <div>
          <p class="font-semibold">No Comment</p>
        </div>
      </div>
    </div>
    <!-- input comment -->
    <div class="p-5 my-5 space-y-3 card bg-base-100">
      <div class="flex items-center gap-10">
        <div class="flex-shrink-0">
          <img
            class="w-10 h-10 rounded-full"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="User avatar"
          />
        </div>
        <div class="flex-1">
          <form
            class="flex items-center justify-center gap-5"
            @submit.prevent="postComment"
          >
            <input
              v-model="comment"
              type="text"
              class="w-full px-4 py-2 text-base bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Add a comment"
            />
            <!-- button -->
            <div class="flex justify-end">
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>

<style></style>
