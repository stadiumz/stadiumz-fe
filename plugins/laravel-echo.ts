import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Pusher:any;
    Echo:any;
  }
}

export default defineNuxtPlugin(() => {
  window.Pusher = Pusher
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'a49662ca58e32fe4ae32',
    cluster: 'ap1',
    forceTLS: true
  })
})