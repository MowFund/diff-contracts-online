import { NuxtApiInstance } from './api'

import { accessorType } from '@/store'

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $api: NuxtApiInstance
    $accessor: typeof accessorType
  }

  interface NuxtAppOptions {}

  interface Configuration {}
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: NuxtApiInstance
    $accessor: typeof accessorType
  }
}

// vuex
declare module 'vuex/types/index' {
  // eslint-disable-next-line
  interface Store<S> {
    $accessor: typeof accessorType
  }
}
