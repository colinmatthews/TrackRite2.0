<template>
  <div id="reports-page">
    <h1 id="title">Reports</h1>

    <div id="header-page">
      <transition-group name="fade" mode="out-in">
        <span key="0" v-if="search.visible">{{ search.title }}</span>
        <span key="1"></span>
      </transition-group>
      <i id="search-icon" class="material-icons">search</i>
       <vue-simple-suggest id="suggest"
          placeholder="Search for projects..."
          @select="onSearchSelect"
          v-model="search.title"
          mode="select"
          :max-suggestions="3"
          :list="search.list"
          display-attribute="name"
          :filter-by-query="true">
       </vue-simple-suggest>
    </div>

    <div id="body-page">
      <ag-grid-table :pivot="pivot" id="ag-table"></ag-grid-table>
    </div>

    <div id="footer">
      <h3>Pivot</h3>
      <vs-switch style="margin-top: auto;" v-model="pivot"></vs-switch>
    </div>
  </div>
</template>



<script>
import VueSimpleSuggest from 'vue-simple-suggest';
import AgGridTable from '@/custom/admin/ui-elements/ag-grid-table/AgGridTable.vue';

export default {
  data: () => ({
    pivot: false,
    search: {
      title: null,
      list: null,
      visible: false,
    },
    table: {
      rows: [],
      columns: [],
    }
  }),
  created() {
    this.fetchProjectsList();
    this.table.columns = [
      {headerName: 'Make', field: 'make'},
      {headerName: 'Model', field: 'model'},
      {headerName: 'Price', field: 'price'}
    ];

    this.table.rows = [
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000}
    ];
          
  },
  watch: {
    "search.title": function(o,n) {
      this.search.visible = false;
      setTimeout(() => this.search.visible = true,200)
    }
  },
  methods: {
    fetchProjectsList() {
      this.$http.get('/p').then(res => this.search.list = res.data.projects);
    },
    onSearchSelect(item) {
      if(item)
        this.search.title = item.name; 
    },
  },
  components: {
    VueSimpleSuggest, AgGridTable
  }
}
</script>



<style lang="scss">
@import "@/assets/scss/vuesax/extraComponents/autocomplete.scss";
#ag-table {
  margin-top: 20px;
}

#footer {
  display: flex;
}
#footer > * {
  margin: 15px 5px;
}

#title {
  font-family: "Segoe UI", sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: #707070;
}

#suggest {
  width: 50rem;
  box-shadow: 0px 0px 3px 0px gray;
}

#search-icon {
  position: absolute;
  right: 12px;
  z-index: 1;
  top: 7px;
}

#header-page {
  position: relative;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}

#header-page > span {
  color: black;
  font-size: 24px;
}

</style>