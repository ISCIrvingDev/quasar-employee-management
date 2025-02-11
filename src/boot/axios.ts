import { defineBoot } from '#q-app/wrappers'
import axios, { type AxiosInstance } from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.API_BASE_URL })

console.log('URL del API: ', process.env.API_BASE_URL)

api.interceptors.request.use((config) => {
  // Logica para obtener el token (en lo que se implementa el modulo de login)
  const bearer =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwic3ViIjoxLCJpYXQiOjE3MzkyNjU3OTAsImV4cCI6MTczOTI2NzU5MH0.lzPkrMeSSOvT2-0xy9HbJel02N9mYJyHI6dyRrSxaI8'
  const token = localStorage.getItem('token') || bearer

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
