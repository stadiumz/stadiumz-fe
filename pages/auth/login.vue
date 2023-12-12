<script setup>

definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
    layout: 'blank',
})

const email = ref('')
const password = ref('')

const { signIn } = useAuth()

const login = async () => {
  const { error } = await signIn('credentials', {
    email: email.value,
    password: password.value,
    redirect: false,
  })
  .then(() => {
    navigateTo('/')
  })
  .catch((error) => {
    alert(error.message)
  })
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-1/3 p-6 bg-white rounded shadow">
      <h2 class="mb-4 text-2xl font-bold">Login</h2>
      <form @submit.prevent="login">
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
        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-blue-500 rounded"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
