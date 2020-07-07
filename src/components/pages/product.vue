<template>
  <div>

  
  <div class="container ">
   <div class="">
        <div class="">
     
      <div class=" row col-md-12 text-primary justify-content-center text-center   " style="margin-top:20%;">
        <a class="col-2"
        v-for="item in categoryList" :key="item"  @click.prevent="category = item"
         :class="{'active': category == item}"  >
          {{item}} 
          
          </a>
      </div>
    </div>
		
   </div>
    
    <div class="" >
   
        <div class="" >
        <div class="" v-if="category == '全部'" >
          <products :products="pageProduct"></products>
         
          <pagination :pagination="pagination" @goPage="getPageProduct"></pagination>
        </div>
        <div class="  " v-else>
          <products :products="products.filter(item => item.category == category)"></products>
        
        </div>
      </div>
    
    </div>
  </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Products from '../Products';
import Pagination from '../Pagination'; 
export default {
  components:{
    Products,
    Pagination
  },
  data() {
    return {
   
      category: '全部',
      pageProduct: [],
      products: [],
      pagination: [],
      isLoading: false,
      categoryList: []
    };
  },
  methods: {
  
       getProductAll () {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      // 取得產品分類
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
    getPageProduct (page = 1) {
      const vm = this
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      vm.isLoading = true
      // 取得每頁產品分類
      vm.$http.get(api).then((response) => {
        console.log("取得pagination資料：", response);
        if (response.data.success) {
          vm.pageProduct = Object.assign([], response.data.products);
          vm.pagination = Object.assign([], response.data.pagination);
          vm.isLoading = false;
        }
      })
    },
   
  },
  created() {
 
      this.getProductAll();
    this.getPageProduct();
  },
  
 
};
</script>