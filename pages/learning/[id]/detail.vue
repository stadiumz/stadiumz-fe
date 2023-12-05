<script setup>
const messages = ref([])

const { token } = useAuth()
// get id from params
const route = useRoute()
const id = route.params.id
const topics = ref([])
const selectedTopic = ref(0)

const { data: topic, pending, error } = await useFetch(
  () => `http://localhost:8000/api/subtopic/${id}`,
  {
    headers: {
      Authorization: token,
    },
  }
)
topics.value = topic.value.data

const getIdVideo = (url) => {
  const urlParams = new URLSearchParams(new URL(url).search)
  return urlParams.get('v')
}

// date to human readable
const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' years'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' months'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minutes'
  }
  return Math.floor(seconds) + ' seconds'
}
</script>

<template>
  <div class="mt-5">
    <ButtonBack class="my-3" />
    <div>
      <h1 class="text-2xl font-bold">Learn Topic</h1>
    </div>
    <div class="flex p-5 mt-5 bg-base-100 card">
      <div class="flex justify-between pb-5 border-b-4">
        <div class="flex flex-col w-6/12">
          <div>
            <h1 class="text-2xl">{{ topics[selectedTopic].subtopic }}</h1>
          </div>
          <div class="w-5/12">
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
                <span class="ml-2 text-sm"> {{ topics.length }} Subtopics</span>
              </div>
              <div class="flex flex-row items-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-2 text-sm">{{ timeSince(topics[0].topic.created_at) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <div class="btn btn-sm btn-primary">Take a #{{ selectedTopic + 1 }} Quiz</div>
        </div>
      </div>
      <!-- 3 col -->
      <div class="flex flex-row justify-between mt-5">
        <div class="flex flex-col w-3/12 p-5 h-[630px] overflow-scroll">
          <div class="flex flex-col gap-3">
            <div
              v-for="(item, index) in topics"
              :key="index"
              class="items-center justify-start text-left bg-gray-100 btn"
              :class="item.is_locked === 0 ? 'bg-gray-300' : 'btn-disabled'"
              @click="selectedTopic = index"
            >
              <span v-if="item.is_locked === 0"> #{{ index + 1 }} </span>
              <span v-else>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span class="ml-2 text-xs">{{ item.subtopic }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-6/12 p-5">
          <!-- this is where video youtube placed -->
          <iframe
            width="100%"
            height="415"
            :src="`https://www.youtube.com/embed/${getIdVideo(topics[selectedTopic].youtube_link)}`"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <div class="flex flex-col w-4/12 p-5">
          <!-- this is where chat going to be placed -->
          <div
            class="flex flex-col justify-between flex-1 h-full overflow-scroll p:2 sm:p-6"
          >
            <div
              id="messages"
              class="flex flex-col p-3 space-y-4 overflow-y-auto scrolling-touch scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 h-[500px]"
            >
              <!-- check if zero messages show an icon -->
              <div v-if="messages.length === 0">
                <div class="flex flex-col items-center justify-center">
                  <div class="mb-3 w-52 h-52">
                    <img src="@/chat.svg" alt="empty state" />
                  </div>
                  <span class="font-bold text-gray-500">Im here to help</span>
                  <span class="text-xs text-center text-gray-400">
                    Have a question? I can help you with anything you need.
                  </span>
                </div>
              </div>
              <div
                class="chat-message"
                v-for="(item, index) in messages"
                :key="index"
              >
                <div
                  class="flex items-end"
                  :class="item.isMe ? 'justify-end' : ''"
                >
                  <div
                    class="flex flex-col items-start order-2 max-w-xs mx-2 space-y-2 text-base"
                  >
                    <div>
                      <span
                        class="inline-block px-4 py-2 rounded-lg"
                        :class="
                          item.isMe
                            ? 'rounded-br-none bg-brand text-white'
                            : 'text-gray-600 bg-gray-300 rounded-bl-none'
                        "
                        >{{ item.message }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 pt-4 mb-2 border-t-2 border-gray-200 sm:mb-0">
              <div class="w-full join">
                <input
                  type="text"
                  placeholder="Write a message"
                  class="w-full input input-bordered join-item"
                />
                <button class="btn join-item btn-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94a60.519 60.519 0 0 0 18.445-8.986a.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>

<style></style>
