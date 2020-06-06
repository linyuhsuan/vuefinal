<template>
  <div class="container ">
       <div class="h4 text-center p-2 text-primary">Shopping Cart</div>
    <div class="d-flex justify-content-around p-3 text-primary">
         <router-link class="  font-weight-bold" to="/cart">1.確認購買商品</router-link>
       <div class="  font-weight-bold">2.填寫運送資訊</div>
       <div class=" font-weight-bold">3.購物完成</div>
      </div>
         <form class="col-md-5 offset-md-4 p-2" @submit.prevent="payOrder">
            <table class="table text-primary  " >
              <tbody class=" ">
                <tr>
                  <th class="border-0" width="120">下單日期</th>
                  <td class="border-0">{{order.create_at|FormatTime}}</td>
                </tr>
                <tr>
                  <th>訂單編號</th>
                  <td>{{order.id}}</td>
                </tr>
                <tr>
                  <th>電子信箱</th>
                  <td>{{order.user.email}}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{order.user.name}}</td>
                </tr>
                <tr>
                  <th>手機電話</th>
                  <td>{{order.user.tel}}</td>
                </tr>
                <tr>
                  <th>地址</th>
                  <td>{{order.user.address}}</td>
                </tr>
                <tr>
                  <th>訂單金額</th>
                  <td>{{order.total|currency}}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <span v-if="!order.is_paid">尚未付款</span>
                    <span v-else class="text-primary">付款完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
               <button class="btn btn-outline-primary  btn-block mt-4 justify-content-center" >
            <i class="fas fa-spinner fa-spin"  v-if="order.is_paid == false"></i>確認付款去
          </button>
         
         </form>
    </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
     
      orderId:'',
      order: { 
        user: { 
          email: ""
           } 
        },
      status: {
        isLoading: false,
        is_paid: false //作為是否已付款的條件變數
      }
      
    };
  },
  methods: {
    //取得訂單資料
    getOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.order = response.data.order;
        console.log(response);
        vm.isLoading = false;
      });
    },
    //確定付款功能
    payOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(url).then((response) => {
        console.log("確定付款",response);
        if (response.data.success) {
         // vm.getOrder();
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
    //console.log(this.orderId);
  }
};
</script>