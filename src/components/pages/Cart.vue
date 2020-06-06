<template>
  <div>
    
    <div class="container text-primary">
      <div class="h4 text-center p-2">Shopping Cart</div>
      <div class="d-flex justify-content-around p-5 text-primary  font-weight-bold ">
         <div>1.確認購買商品</div>
       <div >2.填寫運送資訊</div>
       <div>3.購物完成</div>
      </div>
        <table class="table ">
          <thead class="text-primary ">
            <th width="50"></th>
            <th colspan="2" >商品資訊</th> 
            <th width="60" class="text-center">數量</th>
            <th width="75" class="d-md-table-cell d-none">單價</th>
             <th width="75" class="d-md-table-cell d-none">折扣價</th>
            <th width="90" >小計</th>
            <th width="90">下次買</th>
          </thead>
          <tbody class="text-primary">
            <tr >
             <tr v-for="(item) in CartData.carts" :key="item.id">
              <td width="42" class="align-middle">
                <!-- <div
                  class="bg-cover"
                  :style="`background-image:url('${item.product.imageUrl}');width: 42%;height:42%;`"
                ></div> -->
              </td>
              <td class="">
                 <div
                  class="bg-cover"
                  :style="`background-image:url('${item.product.imageUrl}');width: 80%;height:180px;background-size:cover; background-repeat:no-repeat;`">
                  </div>
               
              </td>
              <td class="align-middle text-left d-md-table-cell d-none ">
                <span class="text-primary ">{{item.product.title}}</span>
                 <div class="text-primary" v-if="item.coupon">
                  已套用優惠券
                </div>
                <!-- <br>
                <span class="text-success">顏色 : </span>
                <br>
                <span class="text-success">尺寸 : </span> -->
              </td>
              <td class="align-middle  text-right">
                <div>{{item.qty}}</div>
              </td>
              <td class="align-middle text-right ">
                <span>{{item.product.origin_price|currency}}</span>
              </td>
               <td class="align-middle text-right">
                <span class="text-muted" >{{CartData.final_total|currency}}</span>
              </td> 
              <td class="align-middle text-right">
                <span>{{item.product.price * item.qty |currency}}</span>
              </td> 
                <td class="align-middle text-center">
                <button type="button"
                  class="btn btn-outline-primary btn-sm border-0"  @click="removeCartItem(item.id)">
                  <i class="far fa-trash-alt"></i>
               
                </button>
              </td>
            
            </tr>
          </tbody>
        </table>
        <hr>  
        <div class="container">
          <div class="p-1">請輸入折價券代碼</div>
        <div class="row col-md-5">

          <div class="input-group  mb-3 p-2">
  <input type="text" class="form-control" placeholder="優惠券代碼"  @keyup.enter="useCoupon" v-model="Coupon_Code" >
  <div class="input-group-append">
    <button class="btn btn-outline-primary" type="button" @click="addCouponCode">輸入</button>
  </div>
</div>
  <div>
   <small class="ml-auto text-primary p-1 d-block mb-3">
            <span v-if="CartData.final_total >= CartData.total">現在輸入shelly即可享有折扣價喔!</span><br>
            <span>單筆訂單限抵一張折價券。</span>
          </small>
  </div>
     
  </div>
  <hr>
   <div class="col-md-3 ml-md-auto text-primary">
      <div class="row justify-content-center">
   
    <div class="text-right " v-if="CartData.final_total> 1000">已達到免運門檻唷</div>
    <div class="text-right " v-else >還差{{1000-CartData.final_total}}就能達到免運門檻唷</div>
   </div>
    <div class="row justify-content-center p-2">
   <div class=" col-4  text-center">折扣價</div>
    <div class="text-center col-4">{{CartData.final_total|currency}}</div> 
    </div>

    <div class="row justify-content-center p-2">
   <div class=" col-4  text-center " >運費</div>
    <div class="text-center col-4" >$80</div>
   </div>
    <div class="row justify-content-center p-2">
   <div class=" col-4  text-center " >總計</div>
   
     <div class="text-center col-4"  v-if="CartData.final_total">{{CartData.final_total+80|currency}}</div>
   </div>
      <div class="row justify-content-center p-2">
     <router-link type="button" class="btn btn-primary text-white " to="cart/step2" :class="{'disabled':CartData.carts.length<1}">下一步</router-link>
    </div> 
 </div>

 
        </div>
 </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
data(){
    return{
     CartData: {
        carts: {
         
      }
      },
      status: {
         isLoading: false, 
         currentProductId: "" 
         },
      Coupon_Code:"",
    };
},
methods:{
    getCartData() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(api).then(response => {
       console.log("取得要購買商品：", response);
      vm.CartData = response.data.data;
      });
    },
    removeCartItem(id) {
      const vm = this;
      //$(`#NavBarCart-${index}`).attr("disabled", true);
      vm.currentProductId = id;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.$http.delete(api).then(response => {
        console.log("刪除購物車資料：", response);
        vm.$bus.$emit("renewCart"); 
        vm.getCartData();
      });
    },
    addCouponCode(){
      const vm=this;
      vm.status.isLoading=true;
       const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
       const code={
         code: vm.Coupon_Code
       };
       vm.$http.post(api,{data:code}).then(response=>{
         if(response.data.success){
            vm.CartData.final_total = response.data.data.final_total;
            vm.$bus.$emit("message:push", response.data.message, "success");
            vm.status.isLoading = false;
        }else{
            vm.$bus.$emit("message:push", response.data.message, "danger");
             vm.status.isLoading = false; 
        }
      vm.getCartData();
       });
    },
},
created(){
  this.getCartData();
  this.$bus.$on("renewCart", () => {
      this.getCartData();
    });
}
};

</script>

