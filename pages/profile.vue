<script setup>

const { token, data } = useAuth()
const name = ref(data.value.name)

const updateProfile = async () => {
    await useFetch(() => 'http://localhost:8000/api/update-profile', {
        method: 'POST',
        headers: {
            Authorization: token,
        },
        body: JSON.stringify({
            name: name.value,
        }),
    })
        .then((res) => {
            if (res.status.value == 'success') {
                alert('Profile updated')
                window.location.href = '/profile'
            } else {
                alert(res.error.value.cause.response._data.message)
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

</script>

<template>
    <div class="flex items-center justify-center mt-10 text-center bg-gray-100">
        <div class="p-6 bg-white rounded-lg shadow-lg w-96">
            <img :src="data.profile_photo" alt="Profile Image" class="w-32 h-32 mx-auto mb-4 rounded-full">
            <h2 class="text-2xl font-bold text-gray-800">{{ data.name }}</h2>
            <p class="text-gray-600">{{ data.email }}</p>
            <p class="text-gray-600">Credit: {{ data.credit }}</p>
            <div class="mt-4">
                <h3 class="text-lg font-bold text-gray-800">Edit Profile</h3>
                <form @submit.prevent="updateProfile">
                    <label for="username" class="block font-bold text-gray-700">Username</label>
                    <input type="text" id="username" v-model="name" class="px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    
                    <div>
                        <button type="submit" class="mt-5 btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<style>
/* Add your custom styles here */
</style>
