import NotFoundPageVue from '@/pages/NotFoundPage.vue'

export default {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NotFoundPageVue,
}
