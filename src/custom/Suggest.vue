<template>
  <div class="suggested-page">
    <div class="d-flex">
			<div class="favorite-image" @click="$router.push('/marketplace/?id=' + $props.id)">
				<img :src="image || require('@/assets/images/pages/eCommerce/bank.png')" />
				<span class="text ml-3 mr-3">{{ title }}</span>
			</div>
			
		</div>
    
  </div>
</template>

<script> 
export default {
	props: ['title', 'image', 'id'],
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

.text {
	transition: .3s;
}

.text:hover {
	transition: .3s;
	color: #7367F0!important;
}

img {
	border-radius: 100%;
	display: block;
	max-width:32px;
	max-height: 32px;
	width: auto;
	height: auto;
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