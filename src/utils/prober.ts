export interface EtherscanURLs {
  apiURL: string
  browserURL: string
}

type NetworkMap = {
  [key: string]: EtherscanURLs
}

export const networktoEndpoints: NetworkMap = {
  ETH: {
    apiURL: 'https://api.etherscan.io/api',
    browserURL: 'https://etherscan.io',
  },
  ROPSTEN: {
    apiURL: 'https://api-ropsten.etherscan.io/api',
    browserURL: 'https://ropsten.etherscan.io',
  },
  RINKEBY: {
    apiURL: 'https://api-rinkeby.etherscan.io/api',
    browserURL: 'https://rinkeby.etherscan.io',
  },
  GOERLI: {
    apiURL: 'https://api-goerli.etherscan.io/api',
    browserURL: 'https://goerli.etherscan.io',
  },
  KOVAN: {
    apiURL: 'https://api-kovan.etherscan.io/api',
    browserURL: 'https://kovan.etherscan.io',
  },
  BSC: {
    apiURL: 'https://api.bscscan.com/api',
    browserURL: 'https://bscscan.com',
  },
  BSC_TESTNET: {
    apiURL: 'https://api-testnet.bscscan.com/api',
    browserURL: 'https://testnet.bscscan.com',
  },
  HECO: {
    apiURL: 'https://api.hecoinfo.com/api',
    browserURL: 'https://hecoinfo.com',
  },
  HECO_TESTNET: {
    apiURL: 'https://api-testnet.hecoinfo.com/api',
    browserURL: 'https://testnet.hecoinfo.com',
  },
}

export function getEtherscanEndpoints(networkName: string): EtherscanURLs {
  const endpoints = networktoEndpoints[networkName]

  if (endpoints === undefined) {
    throw new Error(`Endpoint could not be found for ${networkName}`)
  }

  return endpoints
}
