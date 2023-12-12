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
      isLoading.value = false
      if (res.status.value == 'success') {
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
        <div class="card w-80 bg-base-100 min-h-[460px] shadow-md">
          <div class="card-body">
            <div class="badge badge-primary">{{ item.credit }} Credits</div>
            <h2 class="text-3xl card-title">{{ rupiah(item.price) }}</h2>
            <span
              >Get <strong>{{ item.credit }} credits</strong> for:</span
            >
            <ul class="list-disc list-outside">
              <li>
                <strong>{{ item.credit }}x review resume</strong> with AI ✨
              </li>
              <li>Or, {{ item.credit }}x generative learning ✨</li>
            </ul>
            <div
              class="absolute justify-end mt-3 card-actions bottom-8 left-8 right-8"
            >
              <button
                v-if="!isLoading"
                @click="topUp(item.id)"
                class="lemonsqueezy-button btn btn-block btn-primary"
              >
                Purchase
              </button>
              <button
                v-else
                class="lemonsqueezy-button btn btn-block btn-disabled btn-primary"
              >
                <svg
                  class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Processing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
