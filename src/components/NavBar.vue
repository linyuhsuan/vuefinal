<template>
  <div>
    
      <nav class="navbar navbar-expand-lg navbar-light bg-light ">
      
  <button class="navbar-toggler" type="button" data-toggle="collapse"   @click="navbarTogglerDemo03" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>  
   <router-link class="blog-header-logo text-dark col-3" to="/home">La'quisine</router-link>
  <div class="col-5 justify-content-end d-flex">
    <!-- signout -->
    
    <a class="nav-link " href="#"  data-toggle="modal" data-target="#exampleModal" ><i class="far fa-user"></i></a>
  
    <!-- shopping cart -->
    <a href="#" class="nav-link cart-dropdown " @click=" dropdownToggle">  
        <i class="fas fa-shopping-bag fa-1x " ></i>
        <span class="badge badge-primary rounded-circle " v-if="ProductData.carts">{{ProductData.carts.length}}</span>
      </a>
    <div class="cart-dropdown-menu px-3" >  
        <h6 class="text-primary">已選擇商品</h6>
        <div class="scroll"> 
          <div class="text-center text-primary py-6" v-if="ProductData.carts.length < 1">購物車沒有產品喔！！</div>
          <table class="table table-sm">
            <tbody>
              <tr v-for="item in ProductData.carts" :key="item.id">
                <td class="align-middle">
                  <button
                    type="button"
                   
                    class="btn btn-outline-primary btn-sm border-0"
                    @click="removeCartItem(item.id)"
                  >
                    <i class="far fa-trash-alt" v-if="currentProductId !== item.id"></i>
                    <i class="fas fa-spinner fa-spin" v-if="currentProductId === item.id"></i>
                  </button>
                </td>
                <td class="align-middle">
                  <div
                    class="bg-cover"
                    
                    :style="`background-image:url('${item.product.imageUrl}');width:35px;height:35px;`"
                  ></div>
                </td>
                <td class="align-middle">
                  <div class="text-muted">
                    <div class="cart-title text-primary">{{item.product.title}}</div>
                    <div class="cart-unit text-primary">{{item.qty}}/{{item.product.unit}}</div>
                  </div>
                </td>
                <td class="align-middle text-right">
                  <span class="text-primary cart-price">NT.{{item.product.price|currency}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <button class="btn btn-outline-primary btn-block  mt-3" @click="toCart">CHECK OUT</button>
      <!-- </div> -->
    </div>
  </div>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul class="navbar-nav mr-auto  col-6  mt-2 mt-lg-0">
    
      <li class="nav-item">
      <router-link  class="p-3 text-muted nav-link" to="/product">All Item</router-link>
      </li>
      <li class="nav-item">
      <router-link class="p-3 text-muted nav-link"  to="/product">Question</router-link>
      </li>
    </ul>
    <!-- search -->
    <form class="form-inline my-2 my-lg-0" >
       <div class="input-group-append">
      <input
          class="form-control input-search "
          type="text"
          placeholder="請輸入商品"
          v-model="search"
          @input.prevent="openList(true)"/>

      <button
          class="bg-primary d-flex justify-content-center align-items-center btn btn-outline-primary">
          <i class="fa fa-search text-white search-btn "></i>
      </button>
        </div>
        <div
            class="header-dropdown-search-menu dropdown-search-menu col-md-4">
            <table class="table mb-0">
              <thead>
                <th colspan="2" class="py-2">
                  <span class="text-primary">搜尋結果</span>
                </th>
              </thead>
              <tbody>
                <tr v-for="item in searchResult" :key="item.id">
                  <th scope="row">
                    <a
                      href="#"
                      class="dropdown-search-menu-link"
                      @click.prevent="moreInfo(item.id)"
                      >{{ item.title }}</a>
                  </th>
                  <td class="text-primary text-right">
                    {{ item.price | currency }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="searchResult.length === 0">
                  <td colspan="2"><span class="text-primary">無此產品</span></td>
                </tr>
              </tfoot>
            </table>
          </div>
    </form>
    
  </div>
  
</nav>
  </div>
 
</template>

<script>   
import $ from "jquery";
export default {
data(){
  return {
    ProductData:{
      carts:[]
    },
    status: {
        isLoading: false,
       
      },
    searchResult: [],
    search: '',
    currentProductId: "",
     category: '全部',
      pageProduct: [],
      products: [],
      categoryList: []
  };
},



methods:{
    signout() {
      let vm = this;
      let url = `${process.env.APIPATH}/logout`;
      vm.$http.post(url).then(response => {
        if (response.data.success) {
          vm.$router.push("/home");
        } else {
          console.log("登出訊息:", response.data);
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
   getCartData() {
      const vm = this;
      vm.status.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(api).then(response => {
        console.log("取得購物車資料：", response);
        vm.ProductData = response.data.data;
        //vm.status.isLoading = false;
         
      });
    },

    removeCartItem(id) {
      const vm = this;
      vm.currentProductId = id;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.$http.delete(api).then(response => {
        console.log("刪除購物車資料：", response);
        //vm.$bus.$emit("reGetCart"); //由於商品添加、刪除時購物車資料會變動，所以利用event bus觸發重新取得購物車資料
        vm.getCartData();
      });
    },
    
    dropdownToggle() {
      $(".cart-dropdown-menu").toggleClass("show");
      $("body").toggleClass("of-hidden");
      $(".cart-overlay").toggleClass("show");
    },
   navbarTogglerDemo03(){
       $('#navbarTogglerDemo03').collapse('show');
   },
    toCart() {
      this.dropdownToggle();
      this.$router.push("/Cart");
    },
    searchProducts() {
      const vm= this;
      vm.searchResult = vm.products.filter(item => item.title.match(vm.search));
    },
      getProductAll () {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        console.log("產品頁面取得資料：", response);
        if (response.data.success) {
          vm.categoryList = response.data.products.map((item) => item.category)
            .filter((item, index, arr) => {
              return arr.indexOf(item) === index
            })
          vm.categoryList.unshift('全部')
          vm.products = Object.assign([], response.data.products)
          vm.isLoading = false
        }
      })
    },
     openList(isSearch = false) {
    
      if (isSearch) {
        if (this.search === '') {
          $('.dropdown-search-menu').hide();
          return;
        }
        $('.dropdown-search-menu').show();
        this.searchProducts();
      } else {
        $('.dropdown-cart-menu').toggle();
        
        setTimeout(() => {
          $('.dropdown-cart-menu').hide();
        }, 5000);
      }
    },
        moreInfo(id) {
      this.$router.push(`/product/${id}`);
      $(window).scrollTop(0);
    },
},
 created() {
    const vm = this;
    vm.getCartData();
    vm.$bus.$on("reGetCart", () => {
      vm.getCartData();
    });
  this.getProductAll();
  
  }
}
</script>
