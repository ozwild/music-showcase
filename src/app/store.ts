import { createPinia } from 'pinia'
import { RegisterAppProvider } from './types'

const pinia = createPinia()

export const register: RegisterAppProvider = (app) => {
  app.use(pinia)
}
