<template>
  <div>
    
    
    <div class="pl-md-8">
      <div class="container">
        <nav-bar></nav-bar>
      </div>
      <router-view />
    </div>
    <footer class="pl-md-8">
      <footer-content></footer-content>
    </footer>
  </div>
</template>

<script>


import navBar from "../NavBar";
import footerContent from "../FooterContent";
export default {
  components: {
  footerContent,
    navBar,
    
  }
};
</script>