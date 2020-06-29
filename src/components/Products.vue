<template>
    <div>
     
        <div class="">
            <!-- work list -->
            <div class="product-item-warp ">
                <div class="row">
                    <div class="col-12 col-md-6 p-3 " v-for="item in products" :key="item.id">
                        <div class="product-hover"  @click.prevent="moreInfo(item.id)">
                            <div class="product-hover-content content-between">
                                <div>
                                    <div class="product-name">
                                       <a>{{ item.title }}
                                        </a>
                                    </div>
                                    <div class="product-subname">
                                        <a>{{ item.description }}</a>
                                    </div>
                                    <div class="product-price">
                                        <span class="light">{{ item.price | currency }}</span>
                                    </div>
                                </div>
                                <!-- <button type="button" class="btn portfolio-add-to-cart" @click="addtoCart(item.id)"></button> -->
                            </div>
                            <img :src="`${ item.imageUrl }`" class="img-fluid" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
props: ['products'],
 data() {
    return {
    
       status: {
         loadingItem:'',
      },
   
   
    };
  },
methods:{
      addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {    
        product_id: id,
        qty,
      };
      this.$http.post(url, { data: cart  }).then((response) => {
        console.log("已加入購物車",response);
        vm.status.loadingItem = '';
      });
    },
     moreInfo(id) {
      this.$router.push(`/product/${id}`);
      $(window).scrollTop(0);
    },
}
}
</script>

<style>

</style>