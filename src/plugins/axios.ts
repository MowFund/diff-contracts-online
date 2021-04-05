import { Plugin } from '@nuxt/types'

export function parseError(error: any) {
  const { response } = error
  let status, message

  if (typeof error === 'string') {
    // api return
    status = 403
    message = error
  } else if (response) {
    // request sent
    status = response.status
    message = response.data.result || response.statusText || error.message
  } else {
    // request did not sent
    status = 504
    message = 'Request timeout'
  }

  return {
    status,
    message,
  }
}

const axiosPlugin: Plugin = ({ $axios }) => {
  $axios.defaults.timeout = 30000
  $axios.defaults.headers.post['Content-Type'] = 'application/json'

  $axios.onResponse((response) => {
    const { data } = response
    const { status, result } = data

    if (status !== '1') {
      return Promise.reject(result)
    } else if (result.length > 0) {
      const { ABI } = result[0]
      if (ABI === 'Contract source code not verified') {
        const { address } = response.config.params
        // eslint-disable-next-line
        return Promise.reject(`${address}: ${ABI}`)
      }
    }

    return Promise.resolve(result)
  })

  $axios.onError((error) => {
    return Promise.reject(parseError(error))
  })
}

export default axiosPlugin
