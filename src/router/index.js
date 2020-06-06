import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '@/components/HelloWorld';
import Login from '@/components/pages/login';
import Dashboard from '@/components/pages/dashboard';
import DashBoardProducts from "@/components/Pages/DashBoardProducts";
import DashBoardOrders from "@/components/Pages/DashBoardOrders";
import Product from "@/components/pages/product";
import ProductPage from "@/components/pages/ProductPage";
import Cart from "@/components/pages/Cart";
import Step2 from "@/components/pages/Step2";
import CustomerCheckout from "@/components/Pages/CustomerCheckout";
import Coupon from "@/components/pages/Coupon";
import Loading from 'vue-loading-overlay';
import Index from "@/components/Pages/Index";
import Home from "@/components/Pages/Home";
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(VueRouter)

Vue.component('Loading',Loading);
export default new VueRouter({
    routes:[
        {   
            path:'*',
            redirect:'/home',
        },
      
        {
            path: "/",
            redirect: "/home",
            name: "index",
            component: Index,
            children: [
              {
                path: "home",
                name: "Home",
                component: Home
              },
              {
                path: "product",
                name: "Product",
                component: Product
              },
              // {
              //   path: "product/:category",
              //   name: "FilterProduct",
              //   component: Product
              // },
              {
                path: "product/:id",
                name: "Product",
                component: ProductPage
              },
              {
                path: "cart",
                name: "Cart",
                component: Cart,
              },
              {
                path:"/cart/step2",
                name:Step2,
                component:Step2
              },
              {
                path: "Customercheckout/:orderId",
                name: "CustomerCheckout",
                component: CustomerCheckout
              },
              
            ]
          },
      
        // {
        //     name:'dashboard',
        //     path:'/admin',
        //     component:Dashboard,
           
        //     children:[
        //         {
        //             path:'products',
        //             name:'Products',
        //             component:Products, 
        //             meta: { requiresAuth: true },
        //         }
        //     ]
        // },
        {
            name:'login',
            path:'/login',
            component: Login,   
        },
        {
          name: "管理頁面",
          path: "/admin",
          component: Dashboard,
          children: [
            {
              name: "產品頁面",
              path: "products",
              component: DashBoardProducts,
              meta: { requiresAuth: true }
            },
            {
              name: "優惠券",
              path: "coupon",
              component:Coupon,
              meta: { requiresAuth: true }
            },
            {
              name: "訂單頁面",
              path: "order",
              component: DashBoardOrders,
              meta: { requiresAuth: true }
            },
          ]
        }
    ]
})