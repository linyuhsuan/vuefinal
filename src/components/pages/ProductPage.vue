<template>
<div>
  <div class="container  p-9" style="margin-top:5%;">
    <loading :active.sync="status.isLoading"></loading>
    <div class="row mt-md-4 py-4">
      <!-- 商品圖片-->
      <div class="col-md-7 ">
        <div class="Page-imgSection">
          <div class="Page-img">
     
            <img class="w-100" :src="productData.imageUrl" alt />   
            <div class="py-3" @click.prevent="backpage" >
            <a href="#"  style="text-decoration:none;"><i class="fas fa-arrow-circle-left fa-2x"></i>  Back</a>
            </div>
          </div>
        </div>
      </div>
      <!-- 商品資訊-->
      <div class="col-md-5 text-primary">
        <div class="Page-info py-4">
          <div class="pb-4 border-bottom">
            <!-- <h4 class="text-muted mt-2 mt-sm-0">{{productData.category}}</h4> -->
            <h2>{{productData.title}}</h2>
          </div>

          <div id="accordion" class="py-2 ">
  <div @click="collapseOne">
    <div class="" id="headingOne" >
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" style="text-decoration:none">
         商品描述 <i class="fas fa-plus"></i>
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse " aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        <p class="mt-3">{{productData.description}}</p>
      </div>
    </div>
  </div>
  <div>
    <div class="" id="headingTwo"  @click="collapseTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo"  style="text-decoration:none">
          商品規格 <i class="fas fa-plus"></i>
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
           <div class="form-row justify-content-center mt-4">
              <div class="col-10">
                <table class="table text-primary">
                 <tbody>
               
                    <tr>
                      <th>高度:</th>
                      <td>{{detail.height}} cm</td>
                    </tr>
                    <tr>
                      <th>寬度:</th>
                      <td>{{detail.width}} cm</td>
                    </tr>
                    <tr>
                      <th>深度:</th>
                      <td>{{detail.depth}} cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
      </div>
    </div>
  </div>

</div>
          <div class="Page-info-price px-3 text-right ">
            <del v-if="productData.origin_price">{{productData.origin_price|currency}}</del>
            <div class="text-primary h3 d-inline-block">NT{{productData.price|currency}}</div>
          </div>
          <div class="row mx-0 no-gutters">
            <div class="col-md-4">
              <div class="input-group ">
                <div class="input-group-prepend">
                  <a
                    href="#"
                    class="btn btn-outline-primary"
                    :class="{'disabled':qty ===1}"
                    id="button-addon1"
                    @click.prevent="qty = qty - 1"
                  >−</a>
                </div>
                <input type="number" min="1" class="form-control text-center" v-model.number="qty" />
                <div class="input-group-append">
                  <a
                    href="#"
                    class="btn btn-outline-primary"
                    :class="{'disabled':qty ===99}"
                    id="button-addon2"
                    @click.prevent="qty = qty + 1"
                  >+</a>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <button
                class="btn btn-block btn-primary border ml-lg-2 mt-lg-0 mt-3 rounded-0 text-white"
                @click="addCart(productData.id,qty)"
              >
                <i class="fas fa-spinner fa-spin" v-if="status.isLoading"></i>
                ADD TO CART
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
        
     
    </div>
 
  </div>
       <!--MORE LOOK -->
      <!-- <div class="col-12  text-primary">
        <div class="similar-products-section px-3">
          <div class="similar-products-title">
            <span class="similar-products-title-content ">MORE LOOK</span>
          </div>
          <div class="row py-3 similar-products-content">
            <button class="btn pre" @click.prevent="similarPre" :disabled="transPage == 0">
              <i class="fas fa-angle-left"></i>
            </button>
            <button class="btn next" @click="similarNext" :disabled="transPage  == totalTransPage">
              <i class="fas fa-angle-right"></i>
            </button>
            <div
              class="col-lg-3 col-md-4 col-12 similar-products"
              v-for="item in filterSimilar"
              :key="item.id"
              :style="`left:${translation}%`"
            >
              <div class="products-card text-center border border-white shadow-sm">
                <div class="products-card-imgSection">
                  <a
                    href="#"
                    class="products-card-link text-decoration-none"
                    @click.prevent="toProductPage(item.id)">
                  </a>
                  <div
                    class="bg-cover similar-products-card-img"
                    :style="`background-image:url('${item.imageUrl}')`"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
</div>
</template>



<script>
//外部插件
import $ from "jquery";
export default {
  data() {
    return {
      nextDisabled: false,
      status: {
        isLoading: false,
        uploadCart: false,
      },
      translation: 0, 
      transPage: 0,
      screenWidth: 0,
      products: [],
      productData: {
        imageUrl: ""
      },
      qty: 1, 
      detail: {
        height: "45½",
        width: "366",
        depth: "325",
    
      },

    
    };
  },
  methods: {
      backpage() {
      this.$router.back();
    },
    getProduct() {
      const vm = this;
      const id = vm.$route.params.id;
      console.log(id);
      vm.status.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.$http.get(api).then(response => {
        console.log("取得單筆產品資料：", response);
        vm.productData = response.data.product;
        vm.status.isLoading = false;
      });
    },
    getProductsData() {
      const vm = this;
      vm.status.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.$http.get(api).then(response => {
        console.log("取得全部商品資料：", response);
        vm.products = response.data.products;
        vm.status.isLoading = false;
      });
    },
    addCart(id, qty = 1) {
      const vm = this;
      vm.status.uploadCart = true; 
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      let item = {
        product_id: id,
        qty: qty
      };
      vm.$http.post(api, { data: item }).then(response => {
        console.log("加到購物車內：", response);
        if (response.data.success) {
          vm.status.uploadCart = false; 
          vm.$bus.$emit("message:push", response.data.message, "success"); 
          vm.$bus.$emit("reGetCart"); 
        } else {
          vm.status.uploadCart = false;
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
    collapseOne(){
      $('#collapseOne').collapse('show')
    },
     collapseTwo(){
      $('#collapseTwo').collapse('show')
    },
     similarNext() {
      const vm = this;
      vm.transPage += 1; 
      vm.translation = -100 * vm.transPage;
    },
    similarPre() {
      const vm = this;
      vm.transPage -= 1; 
      vm.translation = -100 * vm.transPage;
    },
 
    toProductPage(id) {
      const vm = this;
      vm.$router.push(`/product/${id}`);
      vm.getProduct();
    },
  },
 
  computed: {
    filterSimilar() {
      const vm = this;
      return vm.products
        .filter(item => {
          return item.id !== vm.$route.params.id;
        })
          .filter(item => {
          return item.category == vm.productData.category;
        });
    },
    
    totalTransPage() {
    
      if (vm.screenWidth < 576) {
        // console.log("<576");
        return Math.floor(vm.filterSimilar.length);
      } else if (vm.screenWidth < 768 && vm.screenWidth >= 576) {
        // console.log(">576");
        return Math.floor(vm.filterSimilar.length / 2);
      } else if (vm.screenWidth < 992 && vm.screenWidth >= 768) {
        // console.log(">768");
        return Math.floor(vm.filterSimilar.length / 3);
      } else {
        // console.log(">992");
        return Math.floor(vm.filterSimilar.length / 4);
      }
    }
  },
  created() {
    const vm = this;
    vm.getProduct();
    vm.getProductsData();
    vm.screenWidth = $(window).width(); 
     window.onresize = () => {
      if (vm.$route.fullPath.indexOf("/product/") !== 0) {
        window.onresize = null; //取消監視
        return; //return 退出函式，否則下面語法一樣會執行一次。
      }
      vm.screenWidth = $(window).width();
      // console.log($(window).width());
    };
  }
};
</script>