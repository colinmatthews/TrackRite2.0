<template>
  <div id="marketplace">
    <h1 id="title">Marketplace</h1>
    
    <vs-row vs-w="12" style="margin-top: 40px" justify-content="center">
      <vs-col vs-w="3" id="left">
        <div id="card-left" style="margin-top: 50px">
          <h6 class="suggest-title font-bold mb-3">Suggested pages</h6>
          <div id="suggestions" class="mt-5">
            <suggested-page
              v-for="(page,i) in suggestedPages"
              :key="i"
              :title="page.title"
              :image="page.image"
            ></suggested-page>
          </div>
        </div>
      </vs-col>
      <vs-col vs-w="9" id="right">
          <span class="font-semibold">{{ filtered.length }} results found in {{ searchTime }} ms</span>
          <vs-input
            @input="search"
            id="search"
            style="width: 96%"
            icon-pack="feather"
            icon="icon-search"
            placeholder="Search"
            v-model="filter"
            class="vs-inputx large mt-3"
          ></vs-input>
        <div id="products">
          <vs-row vs-w="12" class="pr-6">
            <vs-col vs-w="12" class="p-0" v-for="(product,i) in filtered.slice(currentPage * maxDisplay, maxDisplay)" :key="i">
              <transition-group name="list" tag="p">
                <Product
                  @favorite-selected="setFavorite($event)"
                  :key="i"
                  :id="product.id"
                  :title="product.title"
                  :image="product.image_url"
                  :by="product.by"
                  :description="product.desc"
                  :favorites="9"
                ></Product>
              </transition-group>
            </vs-col>
          </vs-row>
        </div>
        <vs-pagination class="mt-3" v-if="filtered.length/maxDisplay > 1" :total="filtered.length/maxDisplay" v-model="currentPage"></vs-pagination>

      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import SuggestedPage from "@/custom/Suggest.vue";
import Product from "@/custom/Product.vue";

export default {
  data: () => ({
    filter: '',
    filtered: [],
    currentPage: 0,
    maxDisplay: 10,
    searchTime: 0,
    suggestedPages: [
      { image: null, title: "Accreditation 2020 Standards" },
      { image: null, title: "IPAC" },
      { image: null, title: "Item #3" },
      { image: null, title: "Project with very long title just for a test" }
    ],
    products: []
  }),
  methods: {
    search() {
      let start = performance.now();
      if(this.filter == '') {
        this.filtered = this.products;
        return;
      }
      this.filtered = this.products.filter(x => x.title.toLowerCase().startsWith(this.filter.toLowerCase()));
      this.searchTime = (performance.now() - start).toFixed(0);
    },
    setFavorite(data) {
      console.log(data);
    },
    updateData() {
      this.$http.get('/m').then(x => {
        this.products = x.data.marketplace_options;
        this.filtered = x.data.marketplace_options;
      });
    }
  }, 
  created() {
    this.updateData();
  },  
  components: {
    SuggestedPage, Product
  }
};
</script>

<style lang="scss">
#title {
  font-family: "Segoe UI", sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: #707070;
}

#left {
  padding-left: 0px;
}

.suggest-title {
  font-size: 16px;
}

#card-left {
  border-radius: 8px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  padding: 1.5rem;
}

#products {
  overflow-y: auto;
  height: 600px;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>