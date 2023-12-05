<script setup>
import Editor from '@tinymce/tinymce-vue'

const title = ref('')
const content = ref('')

const errors = ref([])
const { token } = useAuth()

const createPost = async () => {
  useFetch(() => 'http://localhost:8000/api/artikels', {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: {
      title: title.value,
      content: content.value,
    },
  }).then((data) => {
    navigateTo('/')
  }).catch(err =>{
    console.log(err);
  })
}
</script>

<template>
  <div class="px-48">
    <!-- button back -->
    <ButtonBack class="mt-5" />
    <!-- card form create post. have title, and content using text editor tinymce -->
    <div class="p-5 mt-5 card bg-base-100">
      <div class="flex justify-between">
        <h1 class="text-2xl font-bold">Create Post</h1>
        <!-- information toggle rule of content that will be published -->
        <div class="flex flex-row gap-5">
          <button
            onclick="rule_info.showModal()"
            class="btn btn-square btn-ghost btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </button>
        </div>
        <dialog id="rule_info" class="modal">
          <div class="modal-box">
            <h3 class="text-lg font-bold">Guide to Post</h3>
            <!-- list -->
            <ul class="list-disc list-inside">
              <li>Remember the Human</li>
              <li>Behave like you would in real life</li>
              <li>Look for the original source of content</li>
              <li>Search for duplicates before posting</li>
            </ul>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <!-- titile -->
      <div class="w-full mt-5 form-control">
        <label class="label">
          <span class="label-text">Title</span>
        </label>
        <input
          type="text"
          v-model="title"
          placeholder="What in your mind?"
          class="w-full input input-bordered"
        />
      </div>
      <div class="mt-5">
        <label class="label">
          <span class="label-text">Content</span>
        </label>
        <Editor
          v-model="content"
          api-key="ndfm5iydkexmkrpdjdktc95rbseox7mgb6qne8khk5hnzve4"
          :init="{
            plugins: 'lists link image table code wordcount',
          }"
        />
      </div>
      <!-- button create post -->
      <div class="flex justify-end mt-5">
        <button @click="createPost" class="btn btn-primary btn-outline btn-sm">
          Create Post
        </button>
      </div>
    </div>
  </div>
</template>
<style></style>
