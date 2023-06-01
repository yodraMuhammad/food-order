<template>
  <div>
    <NavbarItem />
    <div class="container mt-4">
      <div class="row">
        <h2>Daftar <strong>Makanan</strong></h2>
      </div>

      <div class="row mt-3">
        <div class="col">
          <div class="input-group">
            <div class="input-group mb-3">
              <input
                v-model="search"
                type="text"
                class="form-control"
                placeholder="Cari Makanan Kesukaan Anda..."
                aria-label="Cari"
                aria-describedby="basic-addon1"
                @keyup="searchFood"
              />
              <span class="input-group-text" id="basic-addon1"><b-icon-search></b-icon-search></span>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div
          class="col-md-4 mt-4"
          v-for="product in products"
          :key="product.id"
        >
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import NavbarItem from "@/components/NavbarItem.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

// @ is an alias to /src
export default {
  name: "FoodsView",
  components: {
    NavbarItem,
    CardProduct,
  },
  data() {
    return {
      products: [],
      search : ''
    };
  },
  methods: {
    setProduct(data) {
      this.products = data;
    },
    searchFood(){
      axios
      .get("https://kedu3h.sse.codesandbox.io/products?q="+this.search)
      .then((response) => this.setProduct(response.data))
      .catch(function (error) {
        // handle error
        console.log("Gagal :", error);
      });
    }
  },
  mounted() {
    axios
      .get("https://kedu3h.sse.codesandbox.io/products")
      .then((response) => this.setProduct(response.data))
      .catch(function (error) {
        console.log("Gagal :", error);
      });
  },
};
</script>
  