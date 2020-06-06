
      
      <!-- <div class="row portfolio-item-warp">
        <div class="card border-0 col-md-4 mb-4" v-for="item in products" :key="item.id">
          <div class="portfolio-hover" style="height: 350px; background-size: cover; background-position: center center;background-repeat:no-repeat;"
           @click.prevent="moreInfo(item.id)"
          :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body ">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title portfolio-name">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="portfolio-price d-flex justify-content-lg-end align-items-end">
            
              <del class="h6" v-if="item.price">NT. {{ item.origin_price }} </del>
              <div class="h6" v-if="item.price">NT.{{ item.price }} </div>
            </div>
          </div>
          <div class=" d-flex"> -->
//             <!-- <a href="#"
//                 class="products-card-link text-decoration-none"
//                 @click.prevent="moreInfo(item.id)"> -->
//                 <!-- <div class="products-card-overlay d-flex">
//                   <div class="btn btn-outline-secondary btn-sm m-auto"
//                   v-if="status.loadingItem === item.id"
//                   >更多細節</div>
//                 </div> -->
//               <!-- </a> -->
//             <!-- <button type="button" class="btn btn-outline-danger  ml-auto" @click="addtoCart(item.id)">
//               <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
//               ADD TO CART
//             </button> -->
<!-- //           </div>
//         </div>
//       </div>
  
//   </div>
// </template> -->


<template>
    <div>
     
        <div class="">
            <!-- work list -->
            <div class="portfolio-item-warp ">
                <div class="row">
                    <div class="col-12 col-md-6 p-3 " v-for="item in products" :key="item.id">
                        <div class="portfolio-hover"  @click.prevent="moreInfo(item.id)">
                            <div class="portfolio-hover-content content-between">
                                <div>
                                    <div class="portfolio-name">
                                       <a>{{ item.title }}
                                        </a>
                                    </div>
                                    <div class="portfolio-subname">
                                        <a>{{ item.description }}</a>
                                    </div>
                                    <div class="portfolio-price">
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
      // productsData: [],
  
    // //   products: {},
       status: {
         loadingItem:'',
      },
    //   isLoading: true,
     
    //   category: '全部商品',
  
    //   products: [],
    //   pagination: [],
    //   isLoading: false,
    //   categoryList: []
   
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