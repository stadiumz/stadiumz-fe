<template>
  <NuxtLayout>
    <Navbar />
    <div class="px-10">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: 'Stadiumz',
  description:
    'Stadiumz is a personal website for me to share my thoughts and experiences.',
  image: 'https://stadiumz.vercel.app/images/og.png',
  url: 'https://stadiumz.vercel.app',
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<style>
:root{
    @apply bg-base-200;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  /* transtition fade in from to left */
  opacity: 0;
  transform: translateX(-10px);
  filter: blur(2px);
}
</style>
