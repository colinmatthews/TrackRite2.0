<template>
  <div id="marketplace">
    <h1 id="title">Marketplace</h1>
    <shop></shop>
  </div>
</template>

<script>
import Shop from '@/custom/admin/apps/eCommerce/ECommerceShop.vue';

export default {
  data: () => ({

  }),
  mounted() {

  },
  components: { Shop }  
}
</script>

<style lang="scss">
#title {
  font-family: "Segoe UI", sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: #707070;
}

</style>