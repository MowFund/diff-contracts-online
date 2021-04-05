<template>
  <Layout>
    <Head />
    <Content>
      <Nuxt />
    </Content>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import { Layout } from 'ant-design-vue'

const { Content } = Layout

@Component({
  components: {
    Layout,
    Content,
  },

  beforeMount() {
    this.$accessor.queryIsMobile()
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="less">
.ant-layout-content {
  min-height: calc(100vh - 64px);
}
</style>
