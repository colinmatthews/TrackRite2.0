<template>
    <div id="ecommerce-checkout-demo">

    <span id="title">Checkout</span>

        <form-wizard 
            ref="checkoutWizard"
            color="rgba(var(--vs-primary), 1)"
            :title="null"
            :subtitle="null"
            :hide-buttons="true">

            <!-- tab 1 content -->
            <tab-content title="Cart" icon="feather icon-shopping-cart" class="mb-5">
                
                <transition name="fade" mode="out-in">
                <!-- IF CART HAVE ITEMS -->
                <div class="vx-row" key="0" v-if="cartItems.length">

                    <!-- LEFT COL -->
                    <div class="vx-col lg:w-2/3 w-full relative">
                        <transition-group name="list" tag="div">
                        <div class="items-list-view" v-for="item in cartItems" :key="item.id">
                            <item-list-view :item="item" :key="item.id">

                                <!-- SLOT: ITEM META -->
                                <template slot="item-meta">
                                    <h6 class="item-name font-semibold mb-1">{{ item.title }}</h6>
                                    <p class="text-sm mb-2 cursor-pointer">By <span class="text-primary font-semibold">{{ item.by }}</span></p>

                                    <p v-if="item.discount && item.discount > 0" class="text-success font-medium">
                                      {{ item.discount }}% off
                                    </p>
                                </template>

                                <!-- SLOT: ACTION BUTTONS -->
                                <template slot="action-buttons">

                                    <!-- PRIMARY BUTTON: REMOVE -->
                                    <div class="item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3" @click="removeItemFromCart(item)">
                                        <feather-icon icon="XIcon" svgClasses="h-4 w-4" />
                                        <span class="text-sm font-semibold ml-2">REMOVE</span>
                                    </div>

                                    <!-- SECONDARY BUTTON: MOVE-TO/VIEW-IN WISHLIST -->
                                    <div class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
                                    @click="$router.push('/marketplace/?id=' + item.id)"
                                    >
                                        <span class="text-sm font-semibold ml-2">MORE INFORMATION</span>
                                    </div>
                                </template>
                            </item-list-view>
                        </div>
                        </transition-group>
                    </div>

                    <!-- RIGHT COL -->
                    <div class="vx-col lg:w-1/3 w-full">
                        <vx-card>
                            <p class="text-grey mb-3">Options</p>
                            <div class="flex justify-between">
                                <span class="font-semibold">Coupons</span>
                                <span class="font-medium text-primary cursor-pointer">Apply</span>
                            </div>

                            <vs-divider />

                            <p class="font-semibold mb-3">Price Details</p>
                            <div class="flex justify-between mb-2">
                                <span class="text-grey">Total MRP</span>
                                <span>$598</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-grey">Bag Discount</span>
                                <span class="text-success">-25$</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-grey">Estimated Tax</span>
                                <span>$1.3</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-grey">EMI Eligibility</span>
                                <a href="#" class="text-primary">Details</a>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-grey">Delivery Charges</span>
                                <span class="text-success">Free</span>
                            </div>

                            <vs-divider />

                            <div class="flex justify-between font-semibold mb-3">
                                <span>Total</span>
                                <span>$574.3</span>
                            </div>

                            <vs-button class="w-full" @click="$refs.checkoutWizard.nextTab()">PLACE ORDER</vs-button>
                        </vx-card>
                    </div>
                </div>

                <!-- IF NO ITEMS IN CART -->
             
                  <div key="1" class="flex items-center text-center mt-6" style="flex-direction: column">
                    <h2 class="mb-5">You have no items in your cart.</h2>
                      <vs-button class="font-medium" @click="$router.push('/marketplace')">Browse Marketplace</vs-button>

                  </div>
             
                </transition>

            </tab-content>

            <!-- tab 3 content -->
            <tab-content title="Payment" icon="feather icon-credit-card" class="mb-5">

                <div class="vx-row">

                    <!-- LEFT COL: PAYMENT OPTIONS -->
                    <div class="vx-col lg:w-2/3 w-full">
                        <vx-card title="Payment Options" subtitle="Be sure to click on correct payment option" class="mb-base">

                            <div class="mt-3">
                                <ul>
                                  <!-- OPTION 1 -->
                                  <li>
                                    <!-- CARD DETAILS -->
                                    <div class="flex flex-wrap justify-between items-center">
                                        <vs-radio v-model="paymentMethod" vs-value="debit-card">
                                            <div class="flex items-center">
                                                <img src="@/assets/images/pages/eCommerce/bank.png" alt="bank-logo" height="40" width="50" class="inline-flex">
                                                <span>US Unlocked Debit Card 12XX XXXX XXXX 0000</span>
                                            </div>
                                        </vs-radio>
                                        <span>John Doe</span>
                                        <span>11/2020</span>
                                    </div>

                                    <!-- CVV BLOCK -->
                                    <form data-vv-scope="cvv-form">
                                        <div class="flex items-center flex-wrap">
                                            <span class="mt-4">Enter CVV: </span>
                                            <vs-input
                                                v-validate="'required|digits:3'"
                                                name="cvv"
                                                v-model="cvv"
                                                class="mr-3 ml-2 mt-4" />
                                            <vs-button class="mt-4" @click.prevent="makePayment" :disabled="false">CONTINUE</vs-button>
                                        </div>
                                        <span v-show="errors.has('cvv-form.cvv')" class="text-danger ml-24">{{ errors.first('cvv-form.cvv') }}</span>
                                    </form>
                                  </li>

                                  <vs-divider class="my-6" />

                                  <!-- OPTION 2 -->
                                  <li>
                                    <vs-radio v-model="paymentMethod" vs-value="credit-debit-atmCard">Credit / Debit / ATM Card</vs-radio>
                                  </li>

                                  <!-- OPTION 3 -->
                                  <li class="mt-2">
                                    <vs-radio v-model="paymentMethod" vs-value="netBanking">Net Banking</vs-radio>
                                  </li>

                                  <!-- OPTION 4 -->
                                  <li class="mt-2">
                                    <vs-radio v-model="paymentMethod" vs-value="emi">EMI (Easy Installment)</vs-radio>
                                  </li>

                                  <!-- OPTION 5 -->
                                  <li class="mt-2">
                                    <vs-radio v-model="paymentMethod" vs-value="cashOnDelivery">Cash On Delivery</vs-radio>
                                  </li>
                                </ul>

                                <vs-divider />

                                <!-- GIFT CARD -->
                                <div class="inline-flex items-center cursor-pointer">
                                    <feather-icon icon="PlusSquareIcon" class="mr-2" svgClasses="h-6 w-6" />
                                    <span>Add Gift Card</span>
                                </div>
                            </div>
                        </vx-card>
                    </div>

                    <!-- RIGHT COL: PRICE -->
                    <div class="vx-col lg:w-1/3 w-full">
                        <vx-card title="Price Details">

                            <div class="flex justify-between mb-2">
                                <span>Price 3 Items</span>
                                <span class="font-semibold">$699.30</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span>Delivery Charges</span>
                                <span class="text-success">Free</span>
                            </div>

                            <vs-divider />

                            <div class="flex justify-between">
                                <span>Amount Payable</span>
                                <span class="font-semibold">$699.30</span>
                            </div>
                        </vx-card>
                    </div>
                </div>
            </tab-content>

        </form-wizard>
    </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
const ItemListView = () => import('@/custom/admin/apps/eCommerce/components/ItemListView.vue')

export default {
    data() {
        return {

            // TAB 2
            fullName: "",
            mobileNum: "",
            pincode: "",
            houseNum: "",
            area: "",
            landmark: "",
            city: "",
            state: "",
            addressType: 1,
            addressTypeOptions: [
                { text: 'Home', value: 1 },
                { text: 'Office', value: 2 },
            ],

            // TAB 3
            paymentMethod: "debit-card",
            cvv: '',
        }
    },
    computed: {
        cartItems() {
            return this.$store.state.user.cartItems.slice().reverse();
        },
        isInWishList() {
            return (itemId) =>{}
        },
    },
    methods: {

        // TAB 1
        removeItemFromCart(item) {
            this.$store.dispatch('removeItemFromCart', item.id)
        },
        // TAB 3
        makePayment() {
            return new Promise(() => {
                this.$validator.validateAll('cvv-form').then(result => {
                    if (result) {
                        // if form have no errors
                        this.$vs.notify({
                            title: 'Success',
                            text: 'Payment received successfully',
                            color: 'success',
                            iconPack: 'feather',
                            icon: 'icon-check'
                        })
                    } else {
                        this.$vs.notify({
                            title: 'Error',
                            text: 'Please enter valid details',
                            color: 'warning',
                            iconPack: 'feather',
                            icon: 'icon-alert-circle'
                        })
                    }
                })
            })
        }
    },
    components: {
        ItemListView,
        FormWizard,
        TabContent
    }
}
</script>

<style lang="scss" scoped>
#ecommerce-checkout-demo {
    .item-view-primary-action-btn {
        color: #2c2c2c !important;
        background-color: #f6f6f6;
    }

    .item-name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2;
    }

.list-enter-active,
.list-leave-active,
.list-move {
  transition: 600ms;
  transition-property: opacity, transform;
}

#title {
  font-family: "Segoe UI", sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #707070;
}

.list-enter {
  opacity: 0;
  transform: scaleY(0.8);
}

.list-enter-to {
  opacity: 1;
  transform: scaleY(1);
}

.list-leave-active {
  display: none;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
    .vue-form-wizard {
        /deep/ .wizard-header {
            padding: 0;
        }

        /deep/ .wizard-tab-content {
            padding-right: 0;
            padding-left: 0;
        }
    }
}
</style>
