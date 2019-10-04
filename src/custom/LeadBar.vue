<template>
  <div id="item">
    <div id="tip">
      <span class="sign" v-if="up">+</span>
      <span class="sign" v-else>-</span>
      <span>{{ progress }}%</span>
      <i id="icon" v-if="up" class="material-icons success">arrow_upward</i>
      <i id="icon" v-else class="material-icons danger">arrow_downward</i>
    </div>

    <h5>{{ name }}</h5>
    <div id="data">
      <h4>{{ percent }}%</h4>
      <vs-progress :percent="percent" color="primary"></vs-progress>
    </div>
  </div>
</template>

<script>
export default {
  props: ['percent', 'name', 'progress'],
  data: () => ({
    up: false,
  }),
  created() {
    this.up = this.progress == 0? Math.random() > 0.5? true : false : this.percent > 0? true : false;
  }
}
</script>

<style scoped>
.sign {
  margin-right: 3px;
}
#item {
  margin-top: 0.5rem;
  position: relative;
}
#tip {
  vertical-align: middle;
  position: absolute;
  right: 0;
}

.success {
  color: #2AC97A;
}

.danger {
  color: #F2135D;
}

#icon {
  vertical-align: text-bottom;
  margin-top: 4px;
  font-size: 18px;
}

#data {
  padding: 5px;
}
</style>