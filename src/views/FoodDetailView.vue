<template>
  <!-- <h1>Food Detail {{ $route.params.id }}</h1> -->
  <div>
    <NavbarItem />
    <div class="container mt-4">
      <!-- breadcrumb -->
      <div class="row">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods" class="text-dark">Foods</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Food Detail
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-6">
          <img
            :src="'../assets/images/' + product.gambar"
            class="img-fluid shadow rounded"
          />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ product.nama }}</strong>
          </h2>
          <hr />
          <h4>
            Harga : <strong>Rp. {{ product.harga }}</strong>
          </h4>
          <form action="" class="mt-3" v-on:submit.prevent>
            <div class="form-group">
              <label for="jumlah">Jumlah Pesan</label>
              <input
                type="number"
                id="jumlah"
                class="form-control"
                v-model="pesan.jumlah_pemesanan"
              />
            </div>
            <div class="form-group">
              <label for="keterangan">Keterangan</label>
              <textarea
                v-model="pesan.keterangan"
                type="text"
                id="keterangan"
                class="form-control"
                placeholder="keterangan: Pedas, Nasi Setengah .."
              ></textarea>
            </div>
            <button
              type="submit"
              class="btn btn-success float-right"
              @click="pemesanan"
            >
              <b-icon-cart></b-icon-cart> Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarItem from "@/components/NavbarItem.vue";
import axios from "axios";

export default {
  name: "FoodDetailView",
  components: {
    NavbarItem,
  },
  data() {
    return {
      product: {},
      pesan: {
        jumlah_pemesanan: 1,
      },
    };
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },
    pemesanan() {
      if (this.pesan.jumlah_pemesanan > 0) {
        this.pesan.product = this.product;
        axios
          .post("http://localhost:3000/keranjangs", this.pesan)
          .then(() => {
            this.$router.push({path: "/keranjang"})
            this.$toast.success("Sukses Masuk Keranjang.", {
              type: "success",
              position: "top",
              duration: 2000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.error("Jumlah Pesanan Minimal 1", {
              type: "error",
              position: "top",
              duration: 2000,
              dismissible: true,
            });
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products/" + this.$route.params.id)
      .then((response) => this.setProduct(response.data))
      .catch(function (error) {
        console.log("Gagal :", error);
      });
  },
};
</script>   