<template>
  <div class="list-view">
    <div class="tree-header flex p-4 text-sm">
      <div style="width: 300px">Name</div>
      <div style="width: 150px">Due date</div>
      <div style="width: 100px">Assignee</div>
      <div style="width: 100px">Status</div>
      <div style="width: 100px">Type</div>
    </div>
    <v-tree
      id="tree-main"
      ref="tree"
      style="max-height: 600px; overflow-y: auto;"
      :canDeleteRoot="false"
      :data="treeData"
      :draggable="true"
      :tpl="tpl"
      :halfcheck="true"
      :multiple="false"
    />
  </div>
</template>

<script>
import { VTree, VSelectTree } from "vue-tree-halower";

export default {
  data() {
    return {
      treeData: []
    };
  },
  methods: {
    tpl(...args) {
      let { 0: node, 2: parent, 3: index } = args;
      let titleClass = node.selected
        ? "node-title node-selected"
        : "node-title";
      if (node.searched) titleClass += " node-searched";
      return (
        <span>
          <span class={titleClass} domPropsInnerHTML={node.title}></span>
        </span>
      );
    },
    getData(o) {
      var i;
      for (var k in o) {
        i = o[k];

        if(i) {
          if(i.name) {
            i['title'] = `<div style="display: inline-block">
              <div style="display: flex;">
                <div style="width: 300px; display: flex; align-items: center;"><span>${i.name}</span></div>
                <div style="width: 150px; display: flex; align-items: center; text-align: center;"><span>${i.start_date}</span></div>
                <div style="width: 100px; display: flex; align-items: center; text-align: center;">
                  <div class="con-vs-tooltip">
                      <div class="con-vs-avatar null">
                        <div class="con-img vs-avatar--con-img">
                          <img src="/img/avatar-s-11.51a23c07.png" alt>
                        </div>
                      </div>
                  </div>
                </div>
                <div style="width: 100px; display: flex; align-items: center; text-align: center;"><span>
                  ${i.status == undefined ? '<span style="color: red;">Empty</span>' 
                  : i.status == "Completed" ? `<span class="text-success">${i.status}</span>` 
                  : i.status == 'In Progress' ? '<span class="text-warning">'+i.status+'</span>' 
                  : '<span class="text-muted">'+i.status+'</span>'}</span></div>
                
                <div style="width: 100px; display: flex; align-items: center; text-align: center;"><span>${i.type}</span></div>
              </div>
            </div>`
          }
        }

        if (typeof i === "object" && k != 'assignees') {
          this.getData(i);
        }
      }
    },
    fetchTreeData() {
      let project = this.$route.query.project || 1;
      this.treeData = [];
      this.$http.get("/p/" + project).then(x => {
        let f = x.data.children;
        this.getData(f, 0);
        this.treeData = f;
      });
      console.log(this.treeData);
    }
  },
  beforeMount() {
    this.fetchTreeData();
  },
  components: {
    VTree,
    VSelectTree
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/extraComponents/tree.scss";
.list-view {
  background: #fff;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
}
.tree-header {
  border-bottom: 1px solid black;
  margin: auto 30px;
  font-weight: 600;
}
</style>