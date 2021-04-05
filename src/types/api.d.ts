export interface ApiContractInfo {
  ABI: string
  CompilerVersion: string
  ConstructorArguments: string
  ContractName: string
  EVMVersion: string
  Implementation: string
  Library: string
  LicenseType: string
  OptimizationUsed: string
  Proxy: string
  Runs: string
  SourceCode: string
  SwarmSource: string
}

export interface ApiResponse {
  status: string
  message: string
  result: string | ApiContractInfo[]
}

interface ContractInfo {
  network: string
  address: string
  infos: ApiContractInfo[]
}

export interface ContractState {
  first: ContractInfo
  second: ContractInfo
}

export interface NuxtApiInstance {
  getSourceCode: (
    contracts: ContractState
  ) => Promise<{ firstInfos: ApiContractInfo[]; secondInfos: ApiContractInfo[] }>
}
