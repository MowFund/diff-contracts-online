<template>
  <div class="index container">
    <FormModel ref="form" layout="vertical" :model="contracts" :rules="rules">
      <Row :gutter="16">
        <Col :span="isMobile ? 24 : 12">
          <FormModelItem label="First Contract" prop="first">
            <Input v-model="contracts.first.address" placeholder="Input contract address" :disabled="loading">
              <Select slot="addonBefore" v-model="contracts.first.network" style="min-width: 130px" :disabled="loading">
                <SelectOption v-for="(urls, key) in networktoEndpoints" :key="key" :value="key">
                  {{ key }}
                </SelectOption>
              </Select>
            </Input>
          </FormModelItem>
        </Col>
        <Col :span="isMobile ? 24 : 12">
          <FormModelItem label="Second Contract" prop="second">
            <Input v-model="contracts.second.address" placeholder="Input contract address" :disabled="loading">
              <Select
                slot="addonBefore"
                v-model="contracts.second.network"
                style="min-width: 130px"
                :disabled="loading"
              >
                <SelectOption v-for="(urls, key) in networktoEndpoints" :key="key" :value="key">
                  {{ key }}
                </SelectOption>
              </Select>
            </Input>
          </FormModelItem>
        </Col>
        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
        <div class="actions">
          <Button
            type="primary"
            :loading="loading"
            :disabled="!contracts.first.address || !contracts.second.address"
            @click="diff"
          >
            Diff Contracts
          </Button>
        </div>
      </Row>
    </FormModel>
    <div v-if="contracts.first.infos.length > 0 || contracts.second.infos.length > 0">
      <template v-for="index in Math.max(contracts.first.infos.length, contracts.second.infos.length)">
        {{
          void ((i = index - 1),
          (first = safeGet(contracts.first.infos, i)),
          (second = safeGet(contracts.second.infos, i)))
        }}
        <CodeDiff
          :key="index"
          :old-string="first.SourceCode"
          :new-string="second.SourceCode"
          :output-format="settings.outputFormat"
          :draw-file-list="settings.drawFileList"
          :file-name="`${first.ContractName} <-> ${second.ContractName}`"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import { FormModel, Row, Col, Input, Select, Button } from 'ant-design-vue'
// @ts-ignore
import CodeDiff from 'vue-code-diff'

import { isAddress } from 'web3-utils'
import { get as safeGet } from 'lodash-es'

import { ContractState } from '@/types/api'

import { networktoEndpoints } from '@/utils/prober'

const FormModelItem = FormModel.Item
const SelectOption = Select.Option

@Component({
  components: {
    FormModel,
    FormModelItem,
    Row,
    Col,
    Input,
    Select,
    SelectOption,
    Button,
    CodeDiff,
  },

  async asyncData({ app, query, $api }) {
    const { fn, fa, sn, sa } = query

    if (
      fn &&
      typeof fn === 'string' &&
      fa &&
      typeof fa === 'string' &&
      sn &&
      typeof sn === 'string' &&
      sa &&
      typeof sa === 'string'
    ) {
      if (fn in networktoEndpoints && sn in networktoEndpoints && isAddress(fa) && isAddress(sa)) {
        const contracts: ContractState = {
          first: { network: fn, address: fa, infos: [] },
          second: { network: sn, address: sa, infos: [] },
        }
        try {
          const { firstInfos, secondInfos } = await $api.getSourceCode(contracts)
          contracts.first.infos = firstInfos
          contracts.second.infos = secondInfos
          return { contracts }
        } catch (error) {
          const { message } = error
          return { errorMsg: message }
        }
      }
    }

    app.router?.push({ path: '/' })
  },
})
export default class Index extends Vue {
  loading = false
  errorMsg = ''

  networktoEndpoints = networktoEndpoints

  contracts: ContractState = {
    first: { network: 'ETH', address: '', infos: [] },
    second: { network: 'ETH', address: '', infos: [] },
  }

  rules = {
    first: [{ validator: this.validateAddress, trigger: 'change' }],
    second: [{ validator: this.validateAddress, trigger: 'change' }],
  }

  settings = {
    outputFormat: 'side-by-side',
    drawFileList: true,
  }

  get isMobile() {
    return this.$accessor.isMobile
  }

  safeGet = safeGet

  validateAddress(_rule: object, { address }: { address: string }, callback: Function) {
    if (address) {
      if (isAddress(address)) {
        callback()
      } else {
        callback(new Error('Address invalid'))
      }
    } else {
      callback()
    }
  }

  async diff() {
    this.loading = true
    this.errorMsg = ''

    this.contracts.first.infos = []
    this.contracts.second.infos = []

    // @ts-ignore
    const valid = await this.$refs.form.validate()
    if (valid) {
      try {
        const { firstInfos, secondInfos } = await this.$api.getSourceCode(this.contracts)
        this.contracts.first.infos = firstInfos
        this.contracts.second.infos = secondInfos

        const { first, second } = this.contracts
        const { network: fn, address: fa } = first
        const { network: sn, address: sa } = second

        this.$router.push({ path: '/', query: { fn, fa, sn, sa } })
      } catch (error) {
        const { message } = error
        this.errorMsg = message
        this.loading = false
        return false
      }
    }

    this.loading = false
    return false
  }
}
</script>

<style lang="less" scoped>
.error-msg {
  color: #f5222d;
}

.actions {
  margin-bottom: 24px;
}
</style>
