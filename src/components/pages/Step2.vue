<template>
  <div>
    
    <div class="container text-primary">
      <div class="h4 text-center p-2">Shopping Cart</div>
      <div class="d-flex justify-content-around p-5 text-primary  font-weight-bold ">
         <div>1.確認購買商品</div>
       <div >2.填寫運送資訊</div>
       <div>3.購物完成</div>
      </div>
        <table class="table text-primary">
          <thead>
            <th width="50"></th>
            <th colspan="2">商品資訊</th> 
            <th width="60" class="text-center">數量</th>
            <th width="75" class="d-md-table-cell d-none">單價</th>
             <th width="75" class="d-md-table-cell d-none">折扣價</th>
            <th width="90" >小計</th>
            <th width="90">下次買</th>
          </thead>
          <tbody>
            <tr >
             <tr v-for="item in CartData.carts" :key="item.id">
              <td width="42" class="align-middle">
              
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
               
              </td>
              <td class="align-middle  text-right">
                <div class>{{item.qty}}</div>
              </td>
              <td class="align-middle text-right  d-md-table-cell d-none">
                <span class >{{item.product.origin_price|currency}}</span>
              </td>
               <td class="align-middle text-right">
                <span class="text-muted">{{item.product.price|currency}}</span>
              </td> 
              <td class="align-middle text-right">
                <span class>{{item.product.price * item.qty |currency}}</span>
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
        <div class="row">
      <div class="input-group col-md-6">
  
     
  </div>
  
  <div class="col-md-3 ml-md-auto text-primary">
      <div class="row justify-content-center">
   
    <div class=" ">還差{{1000-CartData.final_total}}就能達到免運門檻唷</div>
   </div>
    <div class="row justify-content-center p-2">
   <div class=" col-4 ">折扣價</div>
    <div class=" col-4">{{CartData.final_total|currency}}</div> 
    </div>

    <div class="row justify-content-center p-2">
   <div class=" col-4   " >運費</div>
    <div class=" col-4" >$80</div>
   </div>
    <div class="row justify-content-center p-2">
   <div class=" col-4 " >總計</div>
    <div class=" col-4"  v-if="CartData.final_total">{{CartData.final_total+80|currency}}</div>
   </div>
   
 </div>
</div>
 </div>
<hr>
  <div class=" container">
    <span class="col-md-3 ">訂購人資訊</span>
      <form class="col-md-6" @submit.prevent="createOrder">
       
        <div class="form-group row py-2">
          <label  class="col-sm-3 col-form-label" for="useremail">電子信箱</label>
          <input type="email" class="form-control col-sm-7" name="email" id="useremail"
           :class="{'is-invalid': errors.has('email')}"
           v-model="form.user.email"
           v-validate="'required|email'"
           placeholder="請輸入 Email">
          <span class="text-primary" v-if="errors.has('email')" >
           {{errors.fist('email')}}
          </span>
        </div>

        <div class="form-group row">
          <label  class="col-sm-3 col-form-label" for="username">姓名</label>
          <input type="text" class="form-control col-sm-7" name="name" id="username"
           :class="{'is-invalid': errors.has('name')}"
         v-model="form.user.name"
         v-validate="'required'"
          placeholder="輸入姓名">
          <span class="text-primary col-md-4 offset-md-3 " v-if="errors.has('name')">姓名必須輸入</span>
        </div>

   
        <div class="form-group row">
          <label  class="col-sm-3 col-form-label" for="usertel">手機號碼</label>
          <input type="tel" class="form-control col-sm-7" id="usertel"
           :class="{'is-invalid': errors.has('tel')}"
          v-model="form.user.tel"
          v-validate="'required'"
           placeholder="請輸入電話">
            <span class="text-primary" v-if="errors.has('tel')">電話必須輸入</span>
        </div>

        <div class="form-group row">
          <label  class="col-sm-3 col-form-label" for="useraddress">地址</label>
          <input type="address" class="form-control col-sm-7" name="address"
           :class="{'is-invalid': errors.has('address')}"
            v-model="form.user.address"
            v-validate="'required'"
            id="useraddress" 
            placeholder="請輸入地址">
          <span class="text-primary col-md-7" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>
        <div class="d-flex justify-content-center">
        <button class="btn btn-primary text-white mt-4 col-md-3  " @click.prevent="createOrder">
            <i class="fas fa-spinner fa-spin" v-if="status.isLoading"></i>下一步
          </button>
        </div> 
      </form>
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
    form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
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
        //vm.$bus.$emit("reGetCart"); //由於商品添加、刪除時購物車資料會變動，所以利用event bus觸發重新取得購物車資料
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

    createOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
        this.$validator.validate().then((result) => {
        if(result){
          this.$http.post(url,{data:order}).then((response) => {
          console.log("訂單建立",response);
          if(response.data.success){
            vm.$router.push(`/customercheckout/${response.data.orderId}`);
          }
          vm.status.isLoading=false;
        });
        }else{
          console.log("欄位不完整");
        }
      });


    
    },
},
created(){
  this.getCartData();
}
};

</script>

