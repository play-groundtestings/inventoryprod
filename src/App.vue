<script>
import TwitterComponent from './components/twitter-component.vue';
//import CraftingComponent from './components/crafting-component.vue';
import { RouterLink, RouterView } from "vue-router";
//import BadComponent from './components/bad-component.vue';

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
  <div class="container">
    <div class="col-3">
      <header>
        <nav class="navbar-nav" id="inventoryNavBar">
          <RouterLink to="/inventory">Inventory</RouterLink>
          <RouterLink to="/">Add Card</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </header>
    </div>
    <div class="col-11">
      <hr>
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
header {
  line-height: 1.5;
}
</style>
