<template>
<div>
    <Navbar></Navbar>
    <Alert></Alert>
    <div>
        
    <Sidebar></Sidebar>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
     <router-view></router-view>
    </main>
  </div>
</div>
</template>

<script>
import Sidebar from "../DashboardSidebar";


import Alert from "./AlertMessage";
export default {
  components: {
    Sidebar,
    Alert
  }
};
</script>