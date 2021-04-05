import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'

import enquireJs from 'enquire.js'

function enquireScreen(call: Function) {
  const handler = {
    match() {
      call && call(true)
    },
    unmatch() {
      call && call(false)
    },
  }

  enquireJs.register('only screen and (max-width: 922.99px)', handler)
}

export const state = () => ({
  isMobile: false,
  apikeys: {},
})

export type RootState = ReturnType<typeof state>

export const getters = {}

export const mutations = mutationTree(state, {
  setIsMobile(state, isMobile: boolean) {
    state.isMobile = isMobile
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    queryIsMobile({ commit }) {
      enquireScreen((isMobile: boolean) => commit('setIsMobile', isMobile))
    },
  }
)

export const accessorType = getAccessorType({
  actions,
  getters,
  mutations,
  state,
  modules: {},
})
