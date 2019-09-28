<template>
  <div id="card">
    <div class="mx-auto">
      <img class="mx-auto" :src="image" />
    </div>
    <h2>{{ title }}</h2>
    <small>{{ text }}</small>
  </div>
</template>


<script>
export default {
  props: ['title', 'text', 'image']
}
</script>

<style scoped>
#card {
  margin: 20px;
  padding: 1.5rem;
  background-color: #fff;
  box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
  width: 25%;
  text-align: center;
}

h2 {
  margin-top: 15px;
}
</style>