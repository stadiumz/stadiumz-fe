<script setup>
const loading = ref(false)
const activeTab = ref('score')
const scores = ref([])
const { token } = useAuth()
const file = ref(null)
const position = ref('')
const description = ref('')
const showAdvice = ref('')
const selectedReview = ref('')

const generateResume = async () => {
  let formData = new FormData()
  formData.append('resume', file.value)
  formData.append('position', position.value)
  formData.append('description', description.value)
  loading.value = true
  await useFetch(() => 'http://localhost:3472/api/generate/resume', {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: formData,
  })
    .then((res) => {
      console.log(res)
      scores.value = res.data.value.data
      loading.value = false
    })
    .catch((err) => {
      console.log(err)
    })
}

const snakeToCamel = (s) =>
  s.replace(/(_\w)/g, (k) => k[1].toUpperCase())

</script>

<template>
  <div class="mt-5">
    <div>
      <h1 class="text-2xl font-bold">Review a Resume</h1>
      <span> Get a review from AI and improve your resume! </span>
    </div>
    <div class="flex p-10 mt-5 bg-base-100 card">
      <div class="flex flex-col gap-5">
        <div class="w-full form-control">
          <label> Resume </label>
          <input
            type="file"
            v-on:change="file = $event.target.files[0]"
            class="w-full file-input file-input-primary input-bordered"
          />
        </div>
        <div class="w-full form-control">
          <label>Position</label>
          <input
            type="text"
            v-model="position"
            placeholder="Software Engineer"
            class="w-full input input-primary input-bordered"
          />
        </div>
        <div class="w-full form-control">
          <label>Job Description</label>
          <textarea
            placeholder="Job Description"
            v-model="description"
            class="w-full textarea textarea-bordered textarea-primary"
          ></textarea>
        </div>

        <div class="flex justify-end">
          <button
            class="btn btn-primary"
            :class="loading ? 'loading' : ''"
            @click="generateResume"
          >
            <span v-if="loading">Loading...</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5Zm9-3a.75.75 0 0 1 .728.568l.258 1.036a2.63 2.63 0 0 0 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258a2.63 2.63 0 0 0-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395a1.5 1.5 0 0 0-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395a1.5 1.5 0 0 0 .948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                clip-rule="evenodd"
              />
            </svg>
            <span> Review </span>
          </button>
        </div>
      </div>
      <div class="flex gap-4 p-5 overflow-scroll">
        <div class="flex flex-col w-1/2 gap-5">
          <div
            class="flex flex-row items-center justify-between w-full p-3 cursor-pointer card"
            :class="selectedReview === item.name ? 'outline' : ''"
            @click="selectedReview = item.name; showAdvice = item.advice"
            v-for="(item, index) in scores"
            :key="index"
          >
            <h2>{{ snakeToCamel(item.name) }}</h2>
            <div class="flex flex-col text-center">
              <span>Score</span>
              <span class="text-2xl" :class="item.percentage >= 50 ? 'text-green-400' : 'text-red-400'">
                {{ item.percentage }} %
              </span>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-1/2 gap-5">
          <h2 class="font-bold">{{ selectedReview }}</h2>
          <p>
            {{ showAdvice }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
