<template>
  <li class="product card mt-6">
    <vs-row type="flex" vs-w="12">
      <vs-col vs-w="3" class="p-0 flex items-center justify-center">
        <div class="image">
          <img
            class="grid-view-img p-4 pl-5 select-none"
            width="200px"
            height="200px"
            :src="image.startsWith('http') ? image : require('@/assets/images/pages/eCommerce/bank.png')"
          />
        </div>
      </vs-col>
      <vs-col vs-w="6" class="p-0 pt-1">
        <div class="flex info p-3">
          <h6 class="font-semibold">{{ title }}</h6>
          <p class="text-sm mt-1 mb-3">
            By
            <span class="text-primary font-semibold">{{ by }}</span>
          </p>
          <p class="text-sm">{{ description }}</p>
        </div>
      </vs-col>
      <vs-col vs-w="3" class="p-0">
        <div class="dis">

          <div class="controls p-3 mb-2">
            <div
              ref="downloadButton"
              @click="moreInfo"
              class="bg-secondary p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3"
            >
              <span class="text-md mx-1 text-black">More Information</span>
              
              
            </div>
            <transition name="fade" mode="out-in" duration="300">
            <div 
              key="0"
              v-if="!cartItems.map(x => x.id).includes($props.id)"
              @click="addToCart" 
              class="bg-primary p-3 vs-con-loading__container rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
            >
            Add to Cart</div>
            <div v-else
            key="1"
              @click="removeFromCart"
              class="bg-danger p-3 vs-con-loading__container rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
            >
            Remove from Cart</div>
            </transition>
          </div>
        </div>
      </vs-col>
    </vs-row>
  </li>
</template>

<script>
export default {
  props: ["title", "by", "description", "favorites", "image", "id"],
  data: () => ({
    isFavorite: false,
    isDownloading: false,
  }),
  computed: {
    cartItems() {
      return this.$store.state.user.cartItems;
    },
  },
  methods: {
    addToCart() {
      this.$emit('add', this.$props.id);
    },
    removeFromCart() {
      this.$emit('remove', this.$props.id)
    },
    moreInfo() {
      this.$emit('showInfo', this.$props.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  flex-direction: column;
}
.controls {
  flex-direction: column;
  align-self: flex-end;
  width: 100%;
}
img {

	display: block;
	max-width: 200px;
	max-height: 200px;
	width: auto;
	height: auto;
}
.card {
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
}

.product {
  transition: .3s;
  list-style: none;
}

.product:hover {
  transition: .3s;
  transform: translateY(-5px);
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);
}

.dis {
  cursor: pointer;
  position: relative;
  display: flex;
  height: 100%;
}

.rating {
  top: 15px;
  right: 10px;
  position: absolute;
  border-radius: 4px;
  align-items: center;
}

.product:hover {
  transition: 0.5s;
}

.favorite {
  color: rgb(234, 84, 85);
}

.bg-secondary {
  background-color: #F6F6F6;
}
</style>