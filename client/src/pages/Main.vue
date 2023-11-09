<script lang="ts">

import DishesList from "../components/DishesList.vue";
import PageLayout from "../components/PageLayout.vue";
export default {
  name:"Main",
  components:{PageLayout, DishesList}
}
</script>

<template>
  <PageLayout>
    <DishesList/>
  </PageLayout>
</template>

<style scoped lang="scss">
.main-page{
  padding: 80px 5px 20px;
}
</style>