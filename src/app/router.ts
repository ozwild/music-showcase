import { createRouter, createWebHashHistory } from 'vue-router'

import routes from '../routes/'

import { RegisterAppProvider } from './types'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export const register: RegisterAppProvider = (app) => {
  app.use(router)
}
