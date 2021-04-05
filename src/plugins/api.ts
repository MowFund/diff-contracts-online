import { Plugin } from '@nuxt/types'
import { NuxtApiInstance, ApiContractInfo } from '@/types/api'
import { sleep } from '@/utils'
import { networktoEndpoints } from '@/utils/prober'

const apiPlugin: Plugin = (ctx, inject) => {
  const api: NuxtApiInstance = {
    getSourceCode: async (contracts) => {
      let firstInfos: ApiContractInfo[] = []
      let secondInfos: ApiContractInfo[] = []

      const { first, second } = contracts
      const { address: firstAddress, network: firstNetwork } = first
      const { address: secondAddress, network: secondNetwork } = second

      const { apiURL: firstApi } = networktoEndpoints[firstNetwork]
      firstInfos = await ctx.$axios.get(firstApi, {
        params: {
          module: 'contract',
          action: 'getsourcecode',
          address: firstAddress,
        },
      })

      // bypass empty api key limit
      await sleep(1000 * 5)

      const { apiURL: secondApi } = networktoEndpoints[secondNetwork]
      secondInfos = await ctx.$axios.get(secondApi, {
        params: {
          module: 'contract',
          action: 'getsourcecode',
          address: secondAddress,
        },
      })

      return { firstInfos, secondInfos }
    },
  }

  ctx.$api = api
  inject('api', api)
}

export default apiPlugin
