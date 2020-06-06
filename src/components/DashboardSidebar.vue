<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
  <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
  <ul class="navbar-nav px-3">
    <li class="nav-item text-nowrap">
      <a class="nav-link" href="#"  @click.prevent="signout">Sign out</a>
    </li>
  </ul>
</nav>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">
              <i class="fas fa-box-open"></i> 產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/order">
              <i class="far fa-list-alt"></i> 訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupon">
              <i class="fas fa-ticket-alt"></i> 優惠券列表
            </router-link>
          </li>
        </ul>
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/customer_order">
              <i class="fas fa-shopping-cart"></i> 模擬訂單
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
methods:{
    signout() {
      let vm = this;
      let url = `${process.env.APIPATH}/logout`;
      vm.$http.post(url).then(response => {
        if (response.data.success) {
          vm.$router.push("/login");
        } else {
          console.log("登出訊息:", response.data);
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    }
}

};
</script>