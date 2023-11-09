<script lang="ts">
  export default {
    name:"PageLayout"
  }
</script>

<template>
  <div class="page-layout">
    <slot/>
  </div>
</template>

<style scoped lang="scss">
  .page-layout{
    padding: 80px 5px 20px;
  }
</style>