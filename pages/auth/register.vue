<script setup>

definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    }
})

const email = ref('')
const password = ref('')

const { signIn } = useAuth()

const register = async () => {
  const { error } = await signIn('credentials', {
    email: email.value,
    password: password.value,
    redirect: false
  })

  if (error) {
    // Do your custom error handling here
    alert('You have made a terrible mistake while entering your credentials')
  } else {
    // No error, continue with the sign in, e.g., by following the returned redirect:
    return navigateTo('/', { external: true })
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-1/3 p-6 bg-white rounded shadow">
      <h2 class="mb-4 text-2xl font-bold">Register</h2>
      <form @submit.prevent="register">
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
          Register
        </button>
      </form>
    </div>
  </div>
</template>
