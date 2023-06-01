<template>
  <div>
    <NavbarItem :updateKeranjang="keranjangs" />
    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-4">
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
                Keranjang
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>Keranjang <strong>Saya</strong></h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Makanan</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(keranjang, index) in keranjangs"
                  :key="keranjang.id"
                >
                  <th>{{ index + 1 }}</th>
                  <td>
                    <img
                      :src="'../assets/images/' + keranjang.product.gambar"
                      class="img-fluid shadow rounded"
                      width="250"
                    />
                  </td>
                  <td>
                    <strong>{{ keranjang.product.nama }}</strong>
                  </td>
                  <td>
                    {{ keranjang.keterangan ? keranjang.keterangan : "-" }}
                  </td>
                  <td>{{ keranjang.jumlah_pemesanan }}</td>
                  <td>Rp. {{ keranjang.product.harga }}</td>
                  <td>
                    Rp.
                    {{ keranjang.product.harga * keranjang.jumlah_pemesanan }}
                  </td>
                  <td class="text-danger">
                    <b-icon-trash
                      @click="hapusKeranjang(keranjang.id)"
                    ></b-icon-trash>
                  </td>
                </tr>
                <tr>
                  <td colspan="6" align="right">
                    <strong>Total Harga :</strong>
                  </td>
                  <td>
                    <strong>Rp. {{ totalHarga }}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Form Cheackout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form action="" class="mt-3" v-on:submit.prevent>
            <div class="form-group">
              <label for="nama">Nama :</label>
              <input
                type="text"
                id="nama"
                class="form-control"
                v-model="pesan.nama"
              />
            </div>
            <div class="form-group">
              <label for="meja">Nomer Meja :</label>
              <input
                type="text"
                id="meja"
                class="form-control"
                v-model="pesan.noMeja"
              />
            </div>
            <button
              type="submit"
              class="btn btn-success float-right"
              @click="checkout"
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
  name: "KeranjangView",
  components: {
    NavbarItem,
  },
  data() {
    return {
      keranjangs: [],
      pesan: {}
    };
  },
  methods: {
    setKeranjang(data) {
      this.keranjangs = data;
    },
    hapusKeranjang(id) {
      axios
        .delete("https://kedu3h.sse.codesandbox.io/keranjangs/" + id)
        .then(() => {
          this.$toast.error("Item Berhasil Dihapus", {
            type: "error",
            position: "top",
            duration: 2000,
            dismissible: true,
          });
          axios
            .get("https://kedu3h.sse.codesandbox.io/keranjangs")
            .then((response) => {
              this.setKeranjang(response.data);
            })
            .catch(function (error) {
              console.log("Gagal :", error);
            });
        })
        .catch(function (error) {
          console.log("Gagal :", error);
        });
    },
    checkout(){
      if(this.pesan.nama && this.pesan.noMeja){
        this.pesan.keranjangs = this.keranjangs;
        axios
          .post("https://kedu3h.sse.codesandbox.io/pesanans", this.pesan)
          .then(() => {

            // Hapus Semua Keranjang
            this.keranjangs.map(function(item){
              return  axios
              .delete("https://kedu3h.sse.codesandbox.io/keranjangs/" + item.id)
              .catch((error) => console.log("Gagal :", error));
            });

            this.$router.push({path: "/pesanan-sukses"})
            this.$toast.success("Sukses Dipesan", {
              type: "success",
              position: "top",
              duration: 2000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err));
        
      }else{
        this.$toast.error("Nama dan Nomer Meja Harus diisi !", {
            type: "error",
            position: "top",
            duration: 2000,
            dismissible: true,
          });
      }
    }

  },
  mounted() {
    axios
      .get("https://kedu3h.sse.codesandbox.io/keranjangs")
      .then((response) => this.setKeranjang(response.data))
      .catch(function (error) {
        console.log("Gagal :", error);
      });
  },
  computed: {
    totalHarga() {
      return this.keranjangs.reduce(function (items, data) {
        return items + data.product.harga * data.jumlah_pemesanan;
      }, 0);
    },
  },
};
</script>