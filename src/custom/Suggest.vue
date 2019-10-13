<template>
  <div class="suggested-page">
    <div class="d-flex">
			<div class="favorite-image">
				<img width="28px" height="28px" :src="image || 'https://dsmv6m9so2sgl.cloudfront.net/photos/906026/1532845037025_300.jpg'" />
				<span class="text ml-3 mr-3">{{ title }}</span>
			</div>
			<div class="favorite-icon" @click="handleClick">
				<i class="material-icons star" :class="{ 'star-active': isFavorite }">{{ isFavorite ? 'star' : 'star_border'}}</i>
			</div>
		</div>
    
  </div>
</template>

<script> 
export default {
	props: ['title', 'image'],
	data: () => ({
		isFavorite: false,
	}),
	methods: {
		handleClick() {
			// Remove favorite from user favorites
			this.isFavorite = !this.isFavorite;
			console.log('clicked');
		},
		checkFavorite() {
			// Check if item is favorite in user account
			this.isFavorite = Math.random() > 0.5
		}
	},
	created() {
		this.checkFavorite();
	}
};
</script>

<style lang="scss" scoped>
.suggested-page {
	margin-top: 8px;
}

img {
	border-radius: 100%;
}

.star {
	color: #626262;
}

.favorite-image {
	display: flex;
	align-items: center;
	cursor: pointer;
	user-select: none;
}

.favorite-icon {
	cursor: pointer;
	user-select: none;
	display: flex;
}

.d-flex {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.star-active {
	color: #7607F0!important;
}

.text {
  font-family: "Segoe UI", sans-serif;
  font-weight: bold;
	color: #707070;
}

</style>