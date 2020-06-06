<template>
<div>
   <loading :active.sync="isLoading"></loading>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">優惠券名稱</th>
          <th scope="col" width="200">優惠券代碼</th>
          <th scope="col" width="110">截止日</th>
          <th scope="col" width="80">折數</th>
          <th scope="col" width="130">是否啟用</th>
          <th scope="col" width="130">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
           <td>{{item.title}}</td>
          <td>{{item.code}}</td>
          <td>{{item.due_date}}</td>
          <td>
            {{item.percent}} </td>
            <td>
            <span v-if="item.is_enabled">已啟用</span>
            <span v-if="!item.is_enabled">未啟用</span>
            </td>
         
          <td>
            <a
              class="btn btn-outline-primary btn-sm"
              href="#"
              @click.prevent="openModal(false,item)"
            >編輯</a>
            <a
              class="btn btn-outline-danger btn-sm"
              href="#"
              @click="openDelCouponModal(item)"
            >刪除</a>
          </td>
        </tr>
      </tbody>
    </table>
   <pagination :pagination="pagination" @gopage="getCoupon"></pagination>
      <!-- <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled':!pagination.has_pre}" >
          <a class="page-link" href="#" aria-label="Previous"  @click.prevent="getCoupon(pagination.current_page - 1)" >
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page === page}">
          <a class="page-link" href="#" @click.prevent="getCoupon(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled':!pagination.has_next}" >
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getCoupon(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav> -->
    
  </div>
 
      <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="couponModalLabel">
              <span v-if="isNew">新增優惠券</span>
              <span v-if="!isNew">編輯優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempCoupon.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="category">折扣百分比</label>
                    <input
                      type="number"
                      class="form-control"
                      id="category"
                      placeholder="請輸入折扣百分比"
                      v-model="tempCoupon.percent"
                    />
                  </div>
                  <div class="form-group col-md-12">
                    <label for="price">折扣碼</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入折扣碼"
                      v-model="tempCoupon.code"
                    />
                  </div>
                  <div class="form-group col-md-12">
                    <label for="origin_price">到期日</label>
                    <input
                      type="date"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入到期日"
                      v-model="tempCoupon.due_date"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCoupon"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
</div>
          
        
</template>

<script>
import $ from 'jquery';
import Pagination from "../Pagination";
export default {
    data(){
      return{
        coupons:[],
        tempCoupon: {},
        isNew: false,
        isLoading:false,
         status: {
       
      },
        pagination:{},
      };
    },
    components:{
      Pagination
    },
    methods:{
      getCoupon(page = 1) {
      let vm = this;
      vm.isLoading = true;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      vm.$http.get(api).then(response => {
        console.log("取得優惠券資料", response);
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
        //this.tempTimestamp = "";
        this.isNew = true;
      } 
     else {
        this.tempCoupon = Object.assign({}, item);
        //this.formatTime(this.tempCoupon.due_date);
        this.isNew = false;
      }
      $("#couponModal").modal("show");
    },
    
     updateCoupon() {
      let vm = this;
      vm.isLoading = true;
     let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`; 
      let httpMethod = 'post';
      if (!vm.isNew) {
       api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      //vm.formatTimestamp(vm.tempCoupon.due_date);
      const coupon = vm.tempCoupon;
      vm.$http[httpMethod](api, { data: coupon }).then(response => {
        if (response.data.success) {
          console.log("updateCoupon:", response);
          vm.isLoading = false;
          $("#couponModal").modal("hide");
          vm.getCoupon(); 
        } else {
          console.log("更新優惠券失敗", response);
          vm.isLoading = false;
          $("#couponModal").modal("hide");
        }
      });
    },
     openDelCouponModal(item){
      this.tempCoupon = item; //將點到的地方傳入tempProduct來作為刪除的預備
      console.log(this.tempCoupon)
      $("#delCouponModal").modal("show");//打開刪除模板
    },
    delCoupon(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      this.$http.delete(api).then(response => {
        //console.log(response.data);
          vm.coupons = response.data.coupons;
        if(response.data.success){
          $("#delCouponModal").modal("hide");
          vm.getCoupon(); 
          console.log('成功刪除');
        }else{
          $("#delCouponModal").modal("hide");
          vm.getCoupon();
          console.log('刪除失敗');
        }
      });
    }, 
    
    },

  created() {
    this.getCoupon();
  },
//  components: {
//     pagination
//   }
};


</script>