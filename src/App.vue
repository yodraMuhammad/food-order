<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view/>
    <FooterItem/>
  </div>
</template>

<script>

import FooterItem from "@/components/FooterItem.vue";


export default{
  components: {
    FooterItem
  }
}
</script>

<style>
</style>
