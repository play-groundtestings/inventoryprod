<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  name: 'App',
  data() {
    return {
    
    }
  },
  computed: {
  },
  methods: {
  },
  components: {

  },
  mounted() {
  
  }
}

</script>

<template>
    <div class="col-3">
      <header>
        <nav class="navbar-nav" id="inventoryNavBar">
          <RouterLink to="/">Inventory</RouterLink>
          <RouterLink to="/addcard">Add Card</RouterLink>
          <RouterLink to="/search">Search</RouterLink>
        </nav>
      </header>
    </div>
    <div class="col">
      <hr>
      <router-view></router-view>
    </div>

</template>

<style>
header {
  line-height: 1.5;
}
</style>
