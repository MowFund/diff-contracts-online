<template>
  <Header class="fs-container">
    <span>Diff Contracts Online - by MowFund</span>
    <a class="github-link fc-container" href="https://github.com/MowFund/diff-contracts-online">
      <Icon type="github" :style="{ fontSize: '24px' }" />
    </a>
  </Header>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import { Layout, Icon } from 'ant-design-vue'

const { Header } = Layout

@Component({
  components: {
    Header,
    Icon,
  },
})
export default class Head extends Vue {}
</script>

<style lang="less">
.ant-layout-header {
  border-bottom: 1px solid #f1f1f1;
}
</style>

<style lang="less" scoped>
.github-link {
  color: rgba(0, 0, 0, 0.65);
  text-decoration: none;
}
</style>
