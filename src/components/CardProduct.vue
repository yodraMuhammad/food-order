<template>
  <div class="card shadow rounded">
    <img :src="'../assets/images/' + product.gambar" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ product.nama }}</h5>
      <p class="card-text">
        Harga : Rp. {{ product.harga }}
      </p>
      <a href="#" class="btn btn-primary"><b-icon-cart-plus></b-icon-cart-plus> Pesan</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["product"],
};
</script>