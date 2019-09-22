<template>
  <div id="home">
	  <span id="title">Accreditaion Canada 2020 - Mental Health Standards</span>
    <vs-breadcrumb :items="breadcrumb"></vs-breadcrumb>
     <vs-table :data="data">

      <template slot="thead">
        <vs-th>Name</vs-th>
        <vs-th>Due Date</vs-th>
        <vs-th>Assignee</vs-th>
        <vs-th>Status</vs-th>
        <vs-th>Type</vs-th>
        <hr>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="index" v-for="(tr, index) in data" >
          <vs-td :data="data[index].name">
            {{data[index].name}}
          </vs-td>

          <vs-td :data="data[index].start_date">
            {{data[index].start_date }}
          </vs-td>

          <vs-td :data="data[index].assignees.name">
            {{data[index].assignees.name}}
          </vs-td>

          <vs-td :data="data[index].status">
            {{data[index].status}}
          </vs-td>

          <vs-td :data="data[index].type">
            {{data[index].type}}
          </vs-td>

        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    breadcrumb: [
      { title: 'home', url: '/' },
      { title: 'table', active: true }
    ],
    data: null,
  }),
  created() {
    this.$http.get('https://test-json-12412.s3.ca-central-1.amazonaws.com/data.json')
    .then(res => this.data = res.data.rows)
    .catch(e => e);
  }
}
</script>

<style scoped>
#title {
  font-family: 'Segoe UI', sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: #707070;
}
</style>