<template>
  <div id="list-view-table">
    <ag-grid-vue id="grid"
     :columnDefs="columnDefs" :rowData="rowData" :gridOptions="gridOptions">
    </ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue} from "ag-grid-vue";

export default {
  data() {
    return {
      columnDefs: null,
      rowData: null,
      gridOptions: {
        treeData: true,
        animateRows: true,
        getDataPath: function(data) {
          return data.orgHierarchy;
        },
      }
    }
  },
  beforeMount() {
    this.columnDefs = [
        { headerName: 'Make', field: 'make'},
        { headerName: 'Model', field: 'model'},
        { headerName: 'Price', field: 'price'}
    ];

    this.rowData = [
      {orgHierarchy: ['Erica Rogers'], jobTitle: "CEO", employmentType: "Permanent"},
      {orgHierarchy: ['Erica Rogers', 'Malcolm Barrett'], jobTitle: "Exec. Vice President", employmentType: "Permanent"},

      {orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker'], jobTitle: "Director of Operations", employmentType: "Permanent"},
      {orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker', 'Brittany Hanson'], jobTitle: "Fleet Coordinator", employmentType: "Permanent"},
      {orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker', 'Brittany Hanson', 'Leah Flowers'], jobTitle: "Parts Technician", employmentType: "Contract"},
      {orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker', 'Brittany Hanson', 'Tammy Sutton'], jobTitle: "Service Technician", employmentType: "Contract"},
      {orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker', 'Derek Paul'], jobTitle: "Inventory Control", employmentType: "Permanent"},

      {orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland'], jobTitle: "VP Sales", employmentType: "Permanent"},
      {orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Morris Hanson'], jobTitle: "Sales Manager", employmentType: "Permanent"},
      {orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Todd Tyler'], jobTitle: "Sales Executive", employmentType: "Contract"},
      {orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Bennie Wise'], jobTitle: "Sales Executive", employmentType: "Contract"},
      {orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland', 'Joel Cooper'], jobTitle: "Sales Executive", employmentType: "Permanent"}
    ];
  },
  components: {
    AgGridVue, 
  }
}
</script>

<style>
#grid {
  display: none;
  height: 500px;
  width: 700px;
}

.ag-header-cell-text {
  font-weight: bold;
  font-size: .85rem;
}

/* .ag-header-viewport {
  background-color: white;
}

.ag-header {
  height: 52px!Important;
} */
</style>