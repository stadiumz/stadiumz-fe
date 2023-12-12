<script setup>
import { ref, onMounted } from 'vue'
const packages = ref([])
const isLoading = ref(false)
const { token } = useAuth()

const getPackage = async () => {
  await useFetch(() => 'http://localhost:8000/api/credit-packages', {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      if (res.status.value == 'success') {
        packages.value = res.data.value.credit_packages
      } else {
        alert(res.error.value.cause.response._data.message)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const rupiah = (angka) => {
  var reverse = angka.toString().split('').reverse().join(''),
    ribuan = reverse.match(/\d{1,3}/g)
  ribuan = ribuan.join('.').split('').reverse().join('')
  return 'Rp. ' + ribuan
}

const topUp = async (id) => {
  isLoading.value = true
  await useFetch(() => 'http://localhost:8000/api/transaction/create-payment', {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      credit_package_id: id,
    }),
  })
    .then((res) => {
      if (res.status.value == 'success') {
        isLoading.value = false
        // redirect to payment page
        window.location.href = res.data.value.data.invoice_url
      } else {
        alert(res.error.value.cause.response._data.message)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

getPackage()
</script>

<template>
  <div class="p-5 m-5 bg-white card">
    <!-- 3 package to top up -->
    <div class="flex justify-center">
      <div
        class="flex flex-col items-center justify-center p-5"
        v-for="(item, index) in packages"
        :key="index"
      >
        <div class="flex flex-col items-center justify-center">
          <span class="text-2xl font-bold">{{ item.name }}</span>
          <span class="text-2xl font-bold">{{ rupiah(item.price) }}</span>
        </div>
        <div class="flex flex-col items-center justify-center mt-5">
          <button
            v-if="!isLoading"
            class="btn btn-primary"
            @click="topUp(item.id)"
          >
            Top Up
          </button>
          <div v-else="isLoading" class="flex items-center">
            <span class="mr-3 loading loading-spinner"></span>
            <span> Loading </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
