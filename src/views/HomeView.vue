<template>
  <div class="home">
    <NavbarItem />
    <div class="container">
      <HeroItem />
      <div class="row mt-4">
        <div class="col">
          <h2>Best <strong>Food</strong></h2>
        </div>
        <div class="col">
          <router-link to="/foods" class="btn btn-success float-right"
            ><b-icon-eye></b-icon-eye> Lihat Semua</router-link
          >
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-4 mt-4" v-for="product in products" :key="product.id">
          <CardProduct :product="product" />
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
// @ is an alias to /src
import NavbarItem from "@/components/NavbarItem.vue";
import HeroItem from "@/components/HeroItem.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    NavbarItem,
    HeroItem,
    CardProduct,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    setProduct(data) {
      this.products = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/best-products")
      .then((response) => this.setProduct(response.data))
      .catch(function (error) {
        console.log('Gagal :',error);
      })
  },
};
</script>
