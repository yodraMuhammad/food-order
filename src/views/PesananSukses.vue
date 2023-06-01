<template>
  <div class="pesanan-sukses">
    <NavbarItem :updateKeranjang="keranjangs" />
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col text-center">
          <img src="../assets/images/menunggu.png" width="300" />
          <h2><strong>Sukses!!</strong></h2>
          <h4>
            Pesanan Anda Segera Diproses <br />
            Mohon Ditunggu
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarItem from "@/components/NavbarItem.vue";
import axios from "axios";

export default {
  name: "PesananSukses",
  components: {
    NavbarItem,
  },
  data() {
    return {
      keranjangs: [],
    };
  },
  methods: {
    setKeranjang(data) {
      this.keranjangs = data;
    },
  },
  mounted() {
    axios
      .get("https://kedu3h.sse.codesandbox.io/keranjangs")
      .then((response) => this.setKeranjang(response.data))
      .catch(function (error) {
        console.log("Gagal :", error);
      });
  },
};
</script>