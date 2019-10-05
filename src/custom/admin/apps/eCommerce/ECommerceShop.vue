<!-- =========================================================================================
    File Name: ECommerceShop.vue
    Description: eCommerce Shop Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div>
        <ais-instant-search
            :search-client="searchClient"
            index-name="instant_search" id="algolia-instant-search-demo">

            <!-- AIS CONFIG -->
            <ais-configure :hits-per-page.camel="9" />

            <div class="algolia-header mb-4">
                <div class="flex md:items-end items-center justify-between flex-wrap">
                    <!-- TOGGLE SIDEBAR BUTTON -->
                    <feather-icon
                        class="inline-flex lg:hidden cursor-pointer mr-4"
                        icon="MenuIcon"
                        @click.stop="toggleFilterSidebar" />

                    <p class="lg:inline-flex hidden font-semibold algolia-filters-label"></p>

                    <div class="flex justify-between items-end flex-grow">
                        <!-- Stats -->
                        <ais-stats>
                            <p slot-scope="{ hitsPerPage, nbPages, nbHits, page, processingTimeMS }" class="font-semibold md:block hidden">
                                {{ nbHits }} results found in {{ processingTimeMS }}ms
                            </p>
                        </ais-stats>

                        <div class="flex flex-wrap">

                            <!-- SORTING -->
                            <ais-sort-by :items="[
                                { value: 'instant_search', label: 'Featured' },
                            ]">
                                <vs-select
                                    :value="currentRefinement"
                                    slot-scope="{ items, currentRefinement, refine }"
                                    @input="(val) => refine(val)"
                                    class="mr-4 vs-input-shadow-drop vs-select-no-border d-theme-input-dark-bg w-48">
                                    <vs-select-item v-for="item in items" :key="item.value" :value="item.value" :text="item.label" />
                                </vs-select>
                            </ais-sort-by>

                            <!-- ITEM VIEW - GRID/LIST -->
                            <div>
                                <feather-icon
                                    icon="GridIcon"
                                    @click="currentItemView='item-grid-view'"
                                    class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer"
                                    :svgClasses="{'text-primary stroke-current': currentItemView == 'item-grid-view'}" />
                                <feather-icon
                                    icon="ListIcon"
                                    @click="currentItemView='item-list-view'"
                                    class="p-2 ml-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer hidden sm:inline-flex"
                                    :svgClasses="{'text-primary stroke-current': currentItemView == 'item-list-view'}" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="algolia-content-container" class="relative clearfix">
                <vs-sidebar
                    class="items-no-padding vs-sidebar-rounded background-absolute"
                    parent="#algolia-content-container"
                    :click-not-close="clickNotClose"
                    :hidden-background="clickNotClose"
                    v-model="isFilterSidebarActive">

                    <div class="p-6 filter-container">
                       <p class="lg:inline-flex hidden font-semibold algolia-filters-label">Suggested pages</p>
                    </div>
                </vs-sidebar>

                <!-- RIGHT COL -->
                <div :class="{'sidebar-spacer-with-margin': clickNotClose}">

                    <!-- SEARCH BAR -->
                    <ais-search-box>
                        <div slot-scope="{ currentRefinement, isSearchStalled, refine }">
                            <div class="relative mb-8">

                                <!-- SEARCH INPUT -->
                                <vs-input class="w-full vs-input-shadow-drop vs-input-no-border d-theme-input-dark-bg" placeholder="Search here" v-model="currentRefinement" @input="refine($event)" @keyup.esc="refine('')" size="large" />

                                <!-- SEARCH LOADING -->
                                <span :hidden="!isSearchStalled">Loading...</span>

                                <!-- SEARCH ICON -->
                                <div slot="submit-icon" class="absolute top-0 right-0 py-4 px-6" v-show="!currentRefinement">
                                    <feather-icon icon="SearchIcon" svgClasses="h-6 w-6" />
                                </div>

                                <!-- CLEAR INPUT ICON -->
                                <div slot="reset-icon" class="absolute top-0 right-0 py-4 px-6" v-show="currentRefinement">
                                    <feather-icon icon="XIcon" svgClasses="h-6 w-6 cursor-pointer" @click="refine('')" />
                                </div>
                            </div>
                        </div>
                    </ais-search-box>

                    <!-- SEARCH RESULT -->
                    <ais-hits>
                        <div slot-scope="{ items }">

                            <!-- GRID VIEW -->
                            <template v-if="currentItemView == 'item-grid-view'">
                                <div class="items-grid-view vx-row match-height">
                                    <div class="vx-col lg:w-1/3 sm:w-1/2 w-full" v-for="item in items" :key="item.objectID">

                                        <!-- <item-grid-view :item="item">

                                          
                                            <template slot="action-buttons">
                                                <div class="flex flex-wrap">

                                     
                                                    <div
                                                        class="item-view-primary-action-btn p-3 flex flex-grow items-center justify-center cursor-pointer"
                                                        @click="toggleItemInWishList(item)">
                                                        <feather-icon icon="HeartIcon" :svgClasses="[{'text-danger fill-current' : isInWishList(item.objectID)}, 'h-4 w-4']" />

                                                        <span class="text-sm font-semibold ml-2">WISHLIST</span>
                                                    </div>

                                                  
                                                    <div
                                                        class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                                                        @click="cartButtonClicked(item)">
                                                        <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />

                                                        <span class="text-sm font-semibold ml-2" v-if="isInCart(item.objectID)">VIEW IN CART</span>
                                                        <span class="text-sm font-semibold ml-2" v-else>ADD TO CART</span>
                                                    </div>
                                                </div>
                                            </template>
                                        </item-grid-view> -->

                                    </div>
                                </div>
                            </template>

                            <!-- LIST VIEW -->
                            <template v-else>
                                <div class="items-list-view" v-for="item in items" :key="item.id">

                                    <item-list-view :item="item">

                                        <!-- SLOT: ACTION BUTTONS -->
                                        <template slot="action-buttons">
                                            <div
                                                class="item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3"
                                                @click="toggleItemInWishList(item)">
                                                <feather-icon icon="HeartIcon" :svgClasses="[{'text-danger fill-current' : isInWishList(item.objectID)}, 'h-4 w-4']" />
                                                <span class="text-sm font-semibold ml-2">Favorite</span>
                                            </div>
                                            <div
                                                class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
                                                @click="cartButtonClicked(item)">
                                                <span class="text-sm font-semibold ml-2">Donwload now</span>
                                            </div>
                                        </template>
                                    </item-list-view>

                                </div>
                            </template>
                        </div>
                    </ais-hits>

                    <!-- PAGINATION -->
                    <ais-pagination v-if="currentItemView != 'item-grid-view'">
                        <div slot-scope="{
                                currentRefinement,
                                nbPages,
                                pages,
                                isFirstPage,
                                isLastPage,
                                refine,
                            }"
                        >

                        <vs-pagination

                            :total="nbPages"
                            :max="7"
                            :value="currentRefinement + 1"
                            @input="(val) => { refine(val - 1) }" />
                        </div>
                    </ais-pagination>
                </div>
            </div>
        </ais-instant-search>
    </div>
</template>

<script>
import {
  AisInstantSearch,
  AisSearchBox,
  AisConfigure,
  AisStats,
  AisHits,
  AisPagination,
  AisClearRefinements,
  AisNumericMenu,
  AisSortBy,
  AisRangeInput,
  AisHierarchicalMenu,
  AisRatingMenu,
  AisRefinementList
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'

export default {
    components: {
        ItemGridView: () => import("./components/ItemGridView.vue"),
        ItemListView: () => import("./components/ItemListView.vue"),
        AisInstantSearch,
        AisSearchBox,
        AisConfigure,
        AisStats,
        AisHits,
        AisPagination,
        AisClearRefinements,
        AisNumericMenu,
        AisSortBy,
        AisRangeInput,
        AisHierarchicalMenu,
        AisRatingMenu,
        AisRefinementList
    },
    data() {
        return {
            searchClient: algoliasearch(
                'latency',
                '6be0576ff61c053d5f9a3225e2a90f76'
            ),
            
            isFilterSidebarActive: true,
            clickNotClose: true,
            windowWidth: window.innerWidth,
            currentItemView: 'item-list-view',
        }
    },
    computed: {
        toValue() {
            return (value, range) =>
                [
                    value.min !== null ? value.min : range.min,
                    value.max !== null ? value.max : range.max,
                ]
        },

        // GRID VIEW
        isInCart() {
            return (itemId) => this.$store.getters['eCommerce/isInCart'](itemId)
        },
        isInWishList() {
            return (itemId) => this.$store.getters['eCommerce/isInWishList'](itemId)
        },
    },
    methods: {
        handleWindowResize(event) {
            this.windowWidth = event.currentTarget.innerWidth
            this.setSidebarWidth()
        },
        setSidebarWidth() {
            if(this.windowWidth < 992) {
                this.isFilterSidebarActive = this.clickNotClose = false
            }else {
                this.isFilterSidebarActive = this.clickNotClose = true
            }
        },
        test(obj) {
          console.log(obj);
        },
        // GRID VIEW - ACTIONS
        toggleFilterSidebar() {
            if(this.clickNotClose) return
            this.isFilterSidebarActive = !this.isFilterSidebarActive
        },
        toggleItemInWishList(item) {
            this.$store.dispatch('eCommerce/toggleItemInWishList', item)
        },
        additemInCart(item) {
            this.$store.dispatch('eCommerce/additemInCart', item)
        },
        cartButtonClicked(item) {
            if(this.isInCart(item.objectID)) this.$router.push('/apps/eCommerce/checkout')
            else this.additemInCart(item)
        }
    },
    created() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.handleWindowResize)
        })
        this.setSidebarWidth()
    },
    beforeDestroy: function() {
        window.removeEventListener('resize', this.handleWindowResize)
    },
}
</script>

<style lang="scss">
.ais-Hits {
  height: 400px!important;
  overflow-y:scroll;

}

#algolia-instant-search-demo {
    .algolia-header {
        .algolia-filters-label {
            width: calc(260px + 2.4rem);
        }
    }

    #algolia-content-container {

        .vs-sidebar {
          position: relative;
          float: left;
        }
    }

    .algolia-search-input-right-aligned-icon {
        padding: 1rem 1.5rem;
    }

    .algolia-price-slider {
        min-width: unset;
    }

    .item-view-primary-action-btn {
        color: #2c2c2c !important;
        background-color: #f6f6f6;
        min-width: 50%;
    }

    .item-view-secondary-action-btn {
        min-width: 50%;
    }
}

.theme-dark {
    #algolia-instant-search-demo {
        #algolia-content-container {
            .vs-sidebar {
                background-color: #10163a;
            }
        }
    }
}

@media (min-width: 992px) {
    .vs-sidebar-rounded {
        .vs-sidebar { border-radius: .5rem; }
        .vs-sidebar--items {border-radius: .5rem; }
    }
}

@media (max-width: 992px) {
    #algolia-content-container {
      .vs-sidebar {
        position: absolute !important;
        float: none !important;
      }
    }
}
</style>
