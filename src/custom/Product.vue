<template>
  <div class="product card mt-6">
    <vs-row type="flex" vs-w="12">
      <vs-col vs-w="3" class="p-0 flex items-center justify-center">
        <div class="image">
          <img
            class="grid-view-img p-4 pl-5 select-none"
            width="200px"
            height="200px"
            :src="image.startsWith('http') ? image : 'https://dsmv6m9so2sgl.cloudfront.net/photos/906026/1532845037025_300.jpg'"
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
          <div class="rating bg-primary select-none flex text-white px-2" @click="toggleFavorite">
            <span class="text-md mr-1">{{ favorites }}</span>
            <i class="material-icons text-lg star" :class="{ 'star-active': isFavorite }">{{ isFavorite ? 'star' : 'star_border'}}</i>
          </div>
          <div class="controls p-3 mb-2">
            <div
              ref="downloadButton"
              @click="toggleFavorite"
              class="bg-secondary p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3"
            >
            <i class="material-icons text-lg" :class="{ 'favorite': isFavorite }">
            {{ isFavorite ? 'favorite' : 'favorite_border'}}
            </i>
              <span class="text-md mx-1 text-black">Favorite</span>
              
              
            </div>
            <div 
              @click="download"
              :id="'a'+id"
              class="bg-primary p-3 vs-con-loading__container rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
            >
            Download now</div>
          </div>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  props: ["title", "by", "description", "favorites", "image", "id"],
  data: () => ({
    isFavorite: false,
    isDownloading: false,
  }),
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      this.$emit('favorite-selected', this.$props.id);
    },
    download() {
      if(!this.isDownloading) {
        this.isDownloading = true;
        this.$vs.loading({
          color: 'primary',
          container: `#a${this.$props.id}`,
          scale: 0.4,
        });       
        setTimeout(() => {
          this.$router.push('/projects?action=new-project&step=2');
        }, 3000)
      }

    },
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

.card {
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
}
.product {
  transition: 0.5s;
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