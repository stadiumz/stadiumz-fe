<script setup>
const messages = ref([])

const question = ref('')

const { token } = useAuth()
// get id from params
const route = useRoute()
const id = route.params.id
const loading = ref(false)
const topics = ref([])
const selectedTopic = ref(0)
const answers = ref([])

const {
  data: topic,
  pending,
  error,
} = await useFetch(() => `http://localhost:8000/api/subtopic/${id}`, {
  headers: {
    Authorization: token,
  },
})
topics.value = topic.value.data

const qnaGenerate = (index) => {
  // push to messages
  messages.value.push({
    message: question.value,
    isMe: true,
  })
  var _question = question.value
  question.value = ''
  useFetch(
    () => `http://localhost:3472/api/generate/chat/${topics.value[index].id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        question: _question,
      }),
    }
  )
    .then((res) => {
      console.log(res)

      messages.value.push({
        message: res.data.value.data,
        isMe: false,
      })
      question.value = ''
    })
    .catch((err) => {
      console.log(err)
    })
}

const generateDetail = (index) => {
  loading.value = true
  useFetch(
    () => `http://localhost:3472/api/generate/detail/${topics.value[index].id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }
  )
    .then((res) => {
      // reload page
      loading.value = false
      topics.value[selectedTopic.value].youtube_link =
        res.data.value.data.youtube_link
      topics.value[selectedTopic.value].youtube_transcript =
        res.data.value.data.youtube_transcript
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
}

const changeTopic = (index) => {
  selectedTopic.value = index
  messages.value = []
}

const getIdVideo = (url) => {
  if (!url) return
  const urlParams = new URLSearchParams(new URL(url).search)
  return urlParams.get('v')
}

const generateQuiz = (index) => {
  loading.value = true
  useFetch(
    () => `http://localhost:3472/api/generate/quiz/${topics.value[index].id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }
  )
    .then((res) => {
      // reload page
      loading.value = false
      topics.value[selectedTopic.value].quiz =
        res.data.value.data
      answers.value = []
      topics.value[selectedTopic.value].options =
        res.data.value.data.options
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
}

const answerQuiz = (index) => {
  useFetch(
    () => `http://localhost:8000/api/quiz/answer/${topics.value[index].id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      // body is array of answer
      body: JSON.stringify({
        answers: answers.value,
      }),
    }
  )
    .then((res) => {
      if (res.status.value === 'success') {
        alert('Congratulation, you have finished the quiz')
        topics.value[selectedTopic.value].is_done = 1
        selectedTopic.value = selectedTopic.value + 1
        topics.value[selectedTopic.value].is_locked = 0
        // close modal
        quiz.close()
      } else {
        alert('Sorry, you have failed the quiz')
      }
    })
    .catch((err) => {
      alert('Sorry, you have failed the quiz')
    })
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
            </div>
          </div>
        </div>
        <div class="flex items-center" onclick="quiz.showModal()">
          <div class="btn btn-sm btn-primary" v-if="topics[selectedTopic].is_done == 0 && topics[selectedTopic].youtube_link && topics[selectedTopic].youtube_transcript">
            Take a #{{ selectedTopic + 1 }} Quiz
          </div>
        </div>
        <dialog id="quiz" class="modal">
          <div class="modal-box">
            <h3 class="text-lg font-bold">
              Quiz {{ topics[selectedTopic].subtopic }}
            </h3>
            <!-- make quiz interface  -->
            <div>
              <div
                class="flex flex-col mt-5"
                v-if="topics[selectedTopic].quiz.length > 0"
                v-for="(item, index) in topics[selectedTopic].quiz"
                :key="index"
              >
                <div class="flex flex-row justify-between">
                  <div class="flex flex-col">
                    <span class="text-sm text-gray-500"
                      >Question {{ index + 1 }}</span
                    >
                    <span class="text-lg font-bold">
                      {{ item.question }}
                    </span>
                  </div>
                </div>
                <div
                  class="grid w-full grid-cols-2 gap-3 mt-5"
                  v-if="item.options && item.options.length > 0"
                >
                  <div
                    v-for="(item_ans, index_ans) in item.options"
                    :key="index"
                  >
                    <input
                      class="hidden"
                      :id="'radio_' + index_ans + '_' + index"
                      type="radio"
                      :value="item_ans"
                      :name="answer + '_' + index"
                      v-model="answers[index]"
                    />
                    <label
                      class="flex flex-col p-4 border-2 border-gray-400 cursor-pointer"
                      :for="'radio_' + index_ans + '_' + index"
                    >
                      <span class="text-xs font-semibold">{{ item_ans }}</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="flex flex-col mt-10" v-else>
                <!-- button make quiz -->
                <div class="flex flex-col items-center justify-center h-full">
                  <!-- btn generate youtube -->
                  <button @click="generateQuiz(selectedTopic)" class="mb-5 btn btn-brand" :class="loading ? 'btn-disabled' : ''">
                    <svg
                      v-if="!loading"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-10 h-10 text-gray-500"
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
                    <span v-if="loading" class="flex items-center justify-center">
                      <span class="mr-3 loading loading-spinner"></span>
                      Generate Quiz
                    </span>
                    <span v-else>Generate Quiz</span>
                  </button>
                  <span class="font-bold text-gray-500">No quiz available</span>
                  <span class="text-xs text-center text-gray-400">
                    This topic doesn't have any quiz yet.
                  </span>
                </div>
              </div>
            </div>
            <div class="modal-action">
              <button
                v-if="topics[selectedTopic].quiz.length > 0"
                class="btn btn-primary"
                @click="answerQuiz(selectedTopic)"
              >
                Submit
              </button>
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <!-- 3 col -->
      <div class="flex flex-row justify-between mt-5">
        <div class="flex flex-col w-3/12 p-5 h-[630px] overflow-scroll">
          <div class="flex flex-col gap-3">
            <div
              v-for="(item, index) in topics"
              :key="index"
              class="items-center justify-start text-left btn"
              :class="{
                'bg-brand text-white': index === selectedTopic,
                'text-gray-500': index !== selectedTopic,
                'btn-disabled': item.is_locked === 1,
                'bg-green-500 text-white': item.is_done === 1,
              }"
              @click="changeTopic(index)"
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
        <div
          class="flex flex-col w-6/12 p-5"
          v-if="topics[selectedTopic].youtube_link"
        >
          <!-- this is where video youtube placed -->
          <iframe
            width="100%"
            height="415"
            :src="`https://www.youtube.com/embed/${getIdVideo(
              topics[selectedTopic].youtube_link
            )}`"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <div class="flex flex-col w-6/12 p-5" v-else>
          <!-- this is where video youtube placed -->
          <div class="flex flex-col items-center justify-center h-full">
            <!-- btn generate youtube -->
            <button
              @click="generateDetail(selectedTopic)"
              class="mb-5 btn btn-brand"
              :class="loading ? 'loading' : ''"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-10 h-10 text-gray-500"
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
              <span v-if="loading">
                <span class="mr-3 loading loading-spinner"></span>
                Generate video
              </span>
              <span v-else>Generate video</span>
            </button>
            <span class="font-bold text-gray-500">No video available</span>
            <span class="text-xs text-center text-gray-400">
              This topic doesn't have any video yet.
            </span>
          </div>
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
              <form
                @submit.prevent="qnaGenerate(selectedTopic)"
                class="w-full join"
              >
                <input
                  type="text"
                  placeholder="Write a message"
                  class="w-full input input-bordered join-item"
                  v-model="question"
                />
                <button type="submit" class="btn join-item btn-primary">
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input:checked + label {
  @apply bg-brand text-white;
}
</style>
