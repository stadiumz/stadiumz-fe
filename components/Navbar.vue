<script setup>
const { token, signOut, data } = useAuth()

const logout = () => {
  alert('Logout')
  signOut()
  window.location.href = '/'
}

// logout()
</script>

<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <a class="text-xl btn btn-ghost">
        <Logo />
        Stadiumz
      </a>
    </div>
    <div class="navbar-center">
      <div class="items-stretch hidden gap-5 text-gray-500 md:flex">
        <NuxtLink to="/" active-class="active" class="font-bold">
          <div class="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                clip-rule="evenodd"
              />
            </svg>
            <span> Home </span>
          </div>
        </NuxtLink>
        <NuxtLink to="/chat" active-class="active" class="font-bold">
          <div class="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor">
                <path
                  d="M4.913 2.658a49.272 49.272 0 0 1 12.674 0c1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211a50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z"
                />
                <path
                  d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94c1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z"
                />
              </g>
            </svg>
            <span> Chat </span>
          </div>
        </NuxtLink>
        <NuxtLink to="/learning" active-class="active" class="font-bold">
          <div class="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor">
                <path
                  d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337a49.949 49.949 0 0 0-9.902 3.912l-.003.002l-.34.18a.75.75 0 0 1-.707 0A50.009 50.009 0 0 0 7.5 12.174v-.224a.36.36 0 0 1 .172-.311a54.614 54.614 0 0 1 4.653-2.52a.75.75 0 0 0-.65-1.352a56.129 56.129 0 0 0-4.78 2.589a1.858 1.858 0 0 0-.859 1.228a49.803 49.803 0 0 0-4.634-1.527a.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z"
                />
                <path
                  d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282a61.14 61.14 0 0 1 .255 4.285a.75.75 0 0 1-.46.71a47.878 47.878 0 0 0-8.105 4.342a.75.75 0 0 1-.832 0a47.877 47.877 0 0 0-8.104-4.342a.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 0 1 6 13.18v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11c.452.213.901.434 1.346.661a6.729 6.729 0 0 0 .551-1.608a1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.668a2.25 2.25 0 0 0 2.12 0Z"
                />
                <path
                  d="M4.462 19.462c.42-.419.753-.89 1-1.394c.453.213.902.434 1.347.661a6.743 6.743 0 0 1-1.286 1.794a.75.75 0 1 1-1.06-1.06Z"
                />
              </g>
            </svg>
            <span> Learning </span>
          </div>
        </NuxtLink>
        <NuxtLink to="/review" active-class="active" class="font-bold">
          <div class="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5Zm9-3a.75.75 0 0 1 .728.568l.258 1.036a2.63 2.63 0 0 0 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258a2.63 2.63 0 0 0-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395a1.5 1.5 0 0 0-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395a1.5 1.5 0 0 0 .948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                clip-rule="evenodd"
              />
            </svg>
            <span> Review </span>
          </div>
        </NuxtLink>
        <NuxtLink
          to="http://localhost:3334"
          active-class="active"
          class="font-bold"
          _target="blank"
        >
          <div class="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157l3.712 3.712l1.157-1.157a2.625 2.625 0 0 0 0-3.712Zm-2.218 5.93l-3.712-3.712l-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
              />
            </svg>
            <span> Sketch </span>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="navbar-end">
      <!-- <ToggleTheme class="mr-3 btn btn-ghost btn-circle" /> -->
      <!-- profile  -->
      <div class="dropdown dropdown-end">
        <div
          tabindex="0"
          role="button"
          class="flex flex-row btn btn-ghost avatar"
        >
          <span class="mr-3 font-bold text-primary">{{ data.name }}</span>
          <div class="w-10 rounded-full">
            <img
              :src="data.profile_photo"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-md dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <nuxt-link to="/profile" class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M10 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm-6.535 6.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1c.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z"
                />
              </svg>
              Profile
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/topup" class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M4.75 3A2.75 2.75 0 0 0 2 5.75v12.5A2.75 2.75 0 0 0 4.75 21h14.5A2.75 2.75 0 0 0 22 18.25V5.75A2.75 2.75 0 0 0 19.25 3H4.75Zm0 1.5h14.5a1.25 1.25 0 0 1 1.25 1.25v1.5H3.5v-1.5A1.25 1.25 0 0 1 4.75 4.5Zm0 3.5h14.5a1.25 1.25 0 0 1 1.25 1.25v8.5a1.25 1.25 0 0 1-1.25 1.25H4.75a1.25 1.25 0 0 1-1.25-1.25v-8.5A1.25 1.25 0 0 1 4.75 8Zm7.75 3.75a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              Topup
            </nuxt-link>
          </li>
          <li @click="logout()">
            <a>
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
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.active {
  /* underline color */
  @apply text-primary;
}
</style>
