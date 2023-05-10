<template>
    <div>
        <NavbarItem/>
        <h2>Food Daftar Makanan</h2>
    </div>
</template>
  
<script>
import NavbarItem from '@/components/NavbarItem.vue'
// @ is an alias to /src
export default {
    name: 'FoodsView',
    components: {
      NavbarItem
    }
  }
</script>
  