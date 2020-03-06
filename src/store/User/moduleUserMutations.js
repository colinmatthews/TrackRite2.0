export default {
    UPDATE_FAVORITE_PROJECTS: (state, value) => state.favorites.projects = value,
    UPDATE_FAVORITE_PAGES: (state, value) => state.favorites.pages = value,
    UPDATE_CART: (state, value) => state.cartItems = value,
}