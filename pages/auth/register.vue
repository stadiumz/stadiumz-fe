<script setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
  layout: 'blank',
})

const errors = ref({})
const username = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const gender = ref('L')
const step = ref(1)

const genderOptions = [
  { label: 'Male', value: 'L' },
  { label: 'Female', value: 'P' },
]

const generateUsername = () => {
  var prefix =[
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Purple",
    "Pink",
    "Black",
    "White",
    "Grey",
    "Brown",
    "Cyan",
    "Magenta",
    "Lime",
  ]

  var suffix = [
    "Wolf",
    "Tiger",
    "Lion",
    "Cat",
    "Dog",
    "Snake",
    "Rabbit",
    "Horse",
    "Cow",
    "Pig",
    "Sheep",
    "Chicken",
    "Duck",
    "Goat",
    "Fish",
    "Shark",
    "Eagle",
    "Falcon",
    "Owl",
    "Parrot",
    "Dove",
    "Penguin",
    "Dolphin",
    "Whale",
    "Monkey",
    "Gorilla",
    "Elephant",
    "Bear",
    "Panda",
    "Koala",
    "Kangaroo",
    "Crocodile",
    "Alligator",
    "Turtle",
    "Frog",
    "Lizard",
    "Spider",
    "Scorpion",
    "Crab",
    "Octopus",
    "Squid",
    "Snail",
    "Butterfly",
    "Bee",
    "Ant",
    "Worm",
    "Caterpillar",
    "Ladybug",
    "Beetle",
    "Dragonfly",
    "Mosquito",
    "Fly",
    "Grasshopper",
    "Centipede",
    "Bat",
    "Rat",
    "Mouse",
    "Hamster",
    "Guinea Pig",
    "Rabbit",
    "Hedgehog",
    "Squirrel",
    "Fox",
    "Wolf",
    "Tiger",
    "Lion",
    "Cat",
    "Dog",
    "Snake",
    "Rabbit",
    "Horse",
    "Cow",
    "Pig",
    "Sheep",
    "Chicken",
    "Duck",
    "Goat",
    "Fish",
    "Shark",
    "Eagle",
    "Falcon",
    "Owl",
    "Parrot",
    "Dove",
    "Penguin",
    "Dolphin",
    "Whale",
    "Monkey",
    "Gorilla",
    "Elephant",
    "Bear",
    "Panda",
    "Koala",
    "Kangaroo",
    "Crocodile",
    "Alligator",
    "Turtle",
    "Frog",
    "Lizard",
    "Spider",
    "Scorpion",
    "Crab"
  ]

  var randomPrefix = prefix[Math.floor(Math.random() * prefix.length)]
  var randomSuffix = suffix[Math.floor(Math.random() * suffix.length)]
  username.value = randomPrefix + randomSuffix
}

const register = async () => {
  await useFetch(() => 'http://localhost:8000/api/register', {
    method: 'POST',
    body: JSON.stringify({
      name: username.value,
      email: email.value,
      password: password.value,
      confirm_password: password_confirmation.value,
      jenis_kelamin: gender.value,
    }),
  })
    .then((res) => {
      if (res.status.value == 'success') {
        alert('Register success')
        navigateTo('/auth/login')
      } else {
        errors.value = res.error.value.cause.response._data.data
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="toast toast-top toast-center">
    <div class="alert alert-error" v-if="errors" v-for="(item, index) in errors" :key="index">
      <span>{{ item[0] }}</span>
    </div>
  </div>
  
  <div class="flex items-center justify-center h-screen">
    <div class="w-1/2 p-6 bg-white rounded shadow">
      <h2 class="mb-4 text-2xl font-bold">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="username" class="block mb-2">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="w-full p-2 border rounded"
            required
          />
          <!-- button to generate username -->
          <div>
            <span @click="generateUsername" class="mt-3 cursor-pointer text-primary">
              Generate Username
            </span>
          </div>
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password_confirmation" class="block mb-2"
            >Password Confirmation</label
          >
          <input
            type="password"
            id="password_confirmation"
            v-model="password_confirmation"
            class="w-full p-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="gender" class="block mb-2">Gender</label>
          <select
            id="gender"
            v-model="gender"
            class="w-full p-2 border rounded"
            required
          >
            <option
              v-for="option in genderOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <button type="submit" class="w-full btn btn-primary">Register</button>
      </form>
      <div>
        <p class="mt-4">
          Already have an account?
          <nuxt-link to="/auth/login" class="font-bold text-brand"
            >Login</nuxt-link
          >
        </p>
      </div>
    </div>
  </div>
</template>
