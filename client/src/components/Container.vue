<script lang="ts">
export default {
  name:"Container"
}
</script>

<template>
<div class="container">
  <slot/>
</div>
</template>

<style scoped lang="scss">
  .container{
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
  }
</style>