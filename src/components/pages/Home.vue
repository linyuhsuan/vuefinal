<template>
  <div>
    
      
     <carousel
        :per-page="1"
        :navigate-to="someLocalProperty"
        :mouse-drag="true"
        :autoplay="true"
        :autoplayTimeout="2500"
        :loop="true"
        :autoplayHoverPause="false"
        :speed="1000"
        paginationPosition="bottom-overlay"
        paginationActiveColor="#ffffff"
        paginationColor="#e0e0e0"
        @page-change="titleAnimate"
      > 

        <slide v-for="(item,index) in slideContent" :key="index">
          <div class="carousel-img" :style="`background-image:url('${item.imgUrl}')`">
            <div class="slide-title d-flex align-items-end">
              <p :id="`title-${index}`" class="pl-md-9 pb-md-9 pl-5 pb-5 mb-0">{{item.title}}</p>
            </div>
          </div>
        </slide>
      </carousel>
  
      
   <div class="container text-primary p-4">
        <div class="row flex-column-reverse flex-md-row ">
          <div class="col-md-5">
            <div class="bg-cover portfolio-hover"  style="background-image:url('https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60');">
              <div class="portfolio-hover-content content-center">
                <div class="portfolio-name">
                  <a class="">木桌</a>
                </div>
                <div class="portfolio-subname">
                  <a href="#">Table Category</a>
                </div>
              </div>
           
            </div>
          </div>
          <div class="col-md-2 px-md-0 order-1 order-md-0">
            <div class="d-flex align-items-center py-5 pl-4">
              <div class="my-5 border border-top-0 border-bottom-0 px-3">
                <p class="mb-0"><small>桌子 ></small></p>
                
                <h3 class="h5">Table</h3>
            
              </div>
            </div>
          </div>
        </div>
        
               <div class="row  d-flex justify-content-end p-2">
                 <div class="col-md-2 px-md-0 order-1 order-md-0">
            <div class="d-flex align-items-center  py-5 pl-4">
              <div class="my-5 border border-top-0 border-bottom-0 px-3">
                <p class="mb-0"><small>椅子 ></small></p>
                <h3 class="h5">Chair</h3>
              </div>
            </div>
          </div>
          <div class="col-md-5 pr-md-0">
            <div class="bg-cover portfolio-hover"  style="background-image:url('https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80')">
              <div class="portfolio-hover-content content-center">
                <div class="portfolio-name">
                  <a class="">皮椅</a>
                </div>
                <div class="portfolio-subname">
                  <a href="#">Chair Category</a>
                </div>
              </div>
         
            </div>
          </div>
          
        </div>

          <div class="row  d-flex justify-content-start p-2">
          <div class="col-md-5 pr-md-0">
            <div class="bg-cover portfolio-hover"  style="background-image:url('https://images.unsplash.com/photo-1502185472670-259cd7f94868?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1191&q=80')">
              <div class="portfolio-hover-content content-center">
                <div class="portfolio-name">
                  <a class="">蠟燭</a>
                </div>
                <div class="portfolio-subname">
                  <a href="#">Decoration Category</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2 px-md-0 order-1 order-md-0">
            <div class="d-flex align-items-center  py-5 pl-4">
              <div class="my-5 border border-top-0 border-bottom-0 px-3">
                <p class="mb-0"><small>裝飾 ></small></p>
                <h3 class="h5">Decoration</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

<div
      class="bg-fixed"
      style="background-image:url('https://images.unsplash.com/photo-1536627792483-9300ee53afdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80');
      height:400px;background-size:cover;background-position-x:cneter;background-position-y: 70%;
      background-attachment: fixed;"
    ></div>
      </div>

   
       
     
 
  
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import $ from "jquery";

export default {
    data() {
    return {
      someLocalProperty: [], 
      slideContent: {
        
        0: {
          imgUrl:
            "https://images.unsplash.com/photo-1586053015795-0e7dc4c44d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          //title: "Ećo Series"
        },
        1: {
          imgUrl:
            "https://images.unsplash.com/photo-1519643381401-22c77e60520e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
          //title: "Ȏlḍ Series"
        },
        2: {
          imgUrl:
            "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          //title: "ḾetälGråy Series"
        },
      }
    };
  },
  methods: {
    
    titleAnimate(a) {
      let total = 3; 
      $(`#title-${a}`).addClass("fadeOut");
      if (a == 0) {
        $(`#title-${total - 1}`).removeClass("fadeOut");
        return;
      }
      $(`#title-${a - 1}`).removeClass("fadeOut");
    }
  },
  components: {
    Carousel,
    Slide,

  },
 
};

</script>