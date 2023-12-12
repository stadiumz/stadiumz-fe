
<script setup>

const { data } = useAuth()
// router
const toCreate = () => {
  navigateTo('/create')
}
</script>

<template lang="">
  <div class="flex-row items-center w-full gap-10 p-5 card bg-base-100">
    <!-- avatar -->
    <div class="items-center avatar">
      <div class="w-16 rounded-full">
        <img
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        />
      </div>
      <span class="ml-5 font-bold text-brand-700">{{ data.name }}</span>
    </div>

    <!-- input button -->
    <div class="w-full">
      <button
        @click="toCreate()"
        type="text"
        placeholder="Create a Post"
        class="w-full text-left rounded-full text-base-300 input-bordered input"
      >
        Create a Post
      </button>
    </div>
  </div>
</template>
<style lang=""></style>
