<template>
  <div id="marketplace">
    <span id="title">Marketplace</span>
    <vs-breadcrumb id="breadcrumb" ref="breadcrumb">
      <li
        v-for="(item,i) in breadcrumb"
        :key="i"
        @click="$router.replace({ query: null })"
        :class="{ 'active': i == breadcrumb.length-1 }"
      >
        {{ item.title }}
        <span v-if="i != breadcrumb.length - 1" class="vs-breadcrum--separator">/</span>
      </li>
    </vs-breadcrumb>
    <vs-row vs-w="12" justify-content="center" class="mt-4">
      <vs-col vs-w="3" id="left">
        <div id="card-left" style="margin-top: 50px">
          <h6 class="suggest-title font-bold mb-3">Suggested pages</h6>
          <div id="suggestions" class="mt-5">
            <suggested-page
              v-for="(page,i) in suggestedPages"
              :key="i"
              :id="page.id"
              :title="page.title"
              :image="page.image_url"
            ></suggested-page>
          </div>
        </div>
      </vs-col>
      <vs-col vs-w="9" id="right">
        <transition name="fade" mode="out-in">
        <div v-if="!selectedPage" key="0">
          <span class="font-semibold ml-4">{{ filtered.length }} results found in {{ searchTime }} ms</span>
          <vs-input
            @input="search"
            id="search"
            style="width: 96%"
            icon-pack="feather"
            icon="icon-search"
            placeholder="Search"
            v-model="filter"
            class="vs-inputx large mt-3 ml-4"
          ></vs-input>
          <div id="products">
            <vs-row vs-w="12" class="pr-6 ml-4">
                <transition-group name="list" tag="div" >
                  <vs-col
                    vs-w="12"
                    class="p-0"
                    v-for="(product,i) in filtered.slice(currentPage * maxDisplay, maxDisplay)"
                    :key="product.id"
                  >
                      <Product
                        @remove="removeFromCart($event)"
                        @add="addToCart($event)"
                        @showInfo="updateBreadcrumb($event)"
                        :id="product.id"
                        :title="product.title"
                        :image="product.image_url"
                        :by="product.by"
                        :description="product.desc"
                        :favorites="9"
                      ></Product>
                  </vs-col>
                </transition-group>
            </vs-row>
              <vs-pagination
                class="mt-3"
                v-if="filtered.length/maxDisplay > 1"
                :total="filtered.length/maxDisplay"
                v-model="currentPage"
              ></vs-pagination>
            </div>
          </div>
          <div v-else class="card" key="1">
            <div class="details-block">
              <h2>{{ selectedPage.title }}</h2>
              <div class="flex">
                <div class="thumbnail">
                  <img
                    class="select-none img-preview"
                    :src="selectedPage.image_url.startsWith('http') ? selectedPage.image_url : require('@/assets/images/pages/eCommerce/bank.png')"
                  />
                </div>
                <div class="info-block">
                  <div class="flex">
                    <span>By <span class="text-primary font-bold">{{ selectedPage.by }}</span></span>
                    <span class="text-black mt-2">{{ selectedPage.desc }}</span>
                  </div>
                </div>
              </div>
              <div class="add-cart-button flex">
                <vs-button type="border" icon-pack="feather" icon="icon-arrow-left" class="mr-2 btn"
                color="danger" @click="$router.replace({ query: {}})"
                >Back</vs-button>
                <vs-button v-if="!cartItems.map(x => x.id).includes(selectedPage.id)" type="border" icon-pack="feather" icon="icon-shopping-cart" class="btn"
                @click="addToCart(selectedPage.id)"
                >Add To Cart</vs-button>
                <vs-button v-else color="danger" icon-pack="feather" icon="icon-shopping-cart" class="btn"
                @click="removeFromCart(selectedPage.id)"
                >Remove from Cart</vs-button>
                
              </div>
            </div>
          </div>
        </transition>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import SuggestedPage from "@/custom/Suggest.vue";
import Product from "@/custom/Product.vue";

export default {
  data: () => ({
    filter: "",
    breadcrumb: [],
    filtered: [],
    currentPage: 0,
    selectedPage: null,
    maxDisplay: 10,
    searchTime: 0,
    suggestedPages: [],
    products: []
  }),
  computed: {
    cartItems() {
      return this.$store.state.user.cartItems;
    },
  },
  methods: {
    addToCart(id) {
      this.$store.dispatch('addItemToCart', this.products.filter(x => x.id == id)[0])
      .then(x => {
      })
    },
    removeFromCart(id) {
      this.$store.dispatch('removeItemFromCart', id)
      .then(x => {
      })
    },
    search() {
      let start = performance.now();
      if (this.filter == "") {
        this.filtered = this.products;
        return;
      }
      this.filtered = this.products.filter(x =>
        x.title.toLowerCase().startsWith(this.filter.toLowerCase())
      );
      this.searchTime = (performance.now() - start).toFixed(0);
    },
    updateBreadcrumb(pageId) {
      if(pageId) {
        this.$router.replace({ query: {'id': pageId }});
        return;
      }

      this.selectedPage = null;
      let id = this.$route.query.id;
      
      this.breadcrumb = [{
        title: "Home", query: `/marketplace` 
      }];

      if(id) {
        let match = this.products[this.products.map(x => x.id).indexOf(id)];
        this.selectedPage = match;
        if(match) {
          this.breadcrumb.push({
            title: match.title, query: `/marketplace/?id=${id}`
          })
        }
      } 
    },
    updateData() {
      this.$http.get("/m").then(x => {
        this.products = x.data;
        this.filtered = x.data;
        let suggestedPages = [...x.data];
        suggestedPages.sort(() => Math.random() - 0.5);
        this.suggestedPages = suggestedPages.slice(0,3)
        console.log(this.suggestedPages)
        this.updateBreadcrumb();
    });
    }
  },
  watch: {
    $route: function(o, n) {
      this.updateBreadcrumb();
    }
  },
  created() {
    this.updateData();
    
  },
  components: {
    SuggestedPage,
    Product
  }
};
</script>

<style lang="scss">

.thumbnail {
 margin-top: 16px;
}



.thumbnail > img {
 border-radius: 10px;
}

.btn {
  width: 220px;
}


.info-block > .flex {
  flex-direction: column;
}

.info-block {
  margin: 16px 16px;
}

.info-block {
  position: relative;
}

.add-cart-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

#title {
  font-family: "Segoe UI", sans-serif;
  font-size: 30px!important;
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
  overflow-x: hidden;
  height: 600px;
}

.card {
  border-radius: 4px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  padding: 1.5rem;
  position: relative;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.img-preview {
	display: block;
	max-width:200px;
	max-height: 200px;
	width: auto;
	height: auto;
}

</style>