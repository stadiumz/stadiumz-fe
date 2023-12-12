<script setup>
const { token } = useAuth()
// Sample reactive data for active chat
const activeChat = ref(null)
const userList = ref([
  {
    id: 1,
    name: 'John Doe',
    image: 'path/to/image1.jpg',
    lastMessage: 'Hey there!',
    lastMessageTime: '25 minutes',
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'path/to/image2.jpg',
    lastMessage: 'See you soon!',
    lastMessageTime: '1 hour',
  },
  // Add more users
])

// get list of users from API
await useFetch(() => 'http://localhost:8000/api/chat/users', {
  method: 'GET',
  headers: {
    Authorization: token,
  },
})
  .then((res) => {
    if (res.status.value == 'success') {
      userList.value = res.data.value.data
    } else {
      alert(res.error.value.cause.response._data.message)
    }
  })
  .catch((err) => {
    console.log(err)
  })

const newMessage = ref('')

// Function to handle sending a message
const sendMessage = () => {
  if (newMessage.value.trim()) {
    activeChat.value.messages.push({
      id: activeChat.value.messages.length + 1,
      sender: 'You', // Replace with actual user logic
      content: newMessage.value,
    })
    newMessage.value = '' // Reset input after sending
  }
}

const selectUser = async (user) => {
  activeChat.value = {
    userName: user.name,
    userImage: user.profile_photo,
    messages: [
      // Load or fetch messages for the selected user
    ],
  }
  await useFetch(() => `http://localhost:8000/api/chat/${user.id}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      user_id: user.id,
    }),
  })
    .then((res) => {
      if (res.status.value == 'success') {
        activeChat.value = {
          ...activeChat.value,
          messages: res.data.value.data.chats,
        }
      } else {
        console.log(res.error.value.cause.response)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  // Optionally, fetch user's chat messages here
}
</script>

<template>
  <div class="container mx-auto mt-5 bg-slate-50">
    <div class="min-w-full border rounded lg:grid lg:grid-cols-3">
      <div class="border-r border-gray-300 lg:col-span-1">
        <ul class="overflow-auto h-[32rem]">
          <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
          <li v-for="user in userList" :key="user.id" @click="selectUser(user)">
            <a
              class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
            >
              <img
                class="object-cover w-10 h-10 rounded-full"
                :src="'/' + user.profile_photo"
                :alt="user.name"
              />
              <div class="w-full pb-2">
                <div class="flex justify-between">
                  <span class="block ml-2 font-semibold text-gray-600">{{
                    user.name
                  }}</span>
                  <span class="block ml-2 text-sm text-gray-600">{{
                    user.lastMessageTime
                  }}</span>
                </div>
                <span class="block ml-2 text-sm text-gray-600">{{
                  user.lastMessage
                }}</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="hidden lg:col-span-2 lg:block" v-if="activeChat">
        <div class="w-full">
          <div class="relative flex items-center p-3 border-b border-gray-300">
            <!-- Dynamic User Info -->
            <img
              class="object-cover w-10 h-10 rounded-full"
              :src="'/' + activeChat.userImage"
              :alt="activeChat.userName"
            />
            <span class="block ml-2 font-bold text-gray-600">{{
              activeChat.userName
            }}</span>
            <span
              class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"
            ></span>
          </div>
          <div class="relative w-full p-6 overflow-y-auto h-[40rem]">
            <ul class="space-y-2">
              <li
                v-for="message in activeChat.messages"
                :key="message.id"
                class="flex"
                :class="{
                  'justify-end': message.sender === 'You',
                  'justify-start': message.sender !== 'You',
                }"
              >
                <div
                  class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow"
                  :class="{ 'bg-gray-100': message.sender === 'You' }"
                >
                  <span class="block">{{ message.content }}</span>
                </div>
              </li>
            </ul>
          </div>

          <div
            class="flex items-center justify-between w-full p-3 border-t border-gray-300"
          >
            <input
              type="text"
              v-model="newMessage"
              placeholder="Message"
              class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
              name="message"
            />
            <button @click="sendMessage" type="submit">
              <svg
                class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
