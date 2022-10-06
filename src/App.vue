<script>
import TwitterComponent from './components/twitter-component.vue';
//import CraftingComponent from './components/crafting-component.vue';
import { RouterLink, RouterView } from "vue-router";
//import BadComponent from './components/bad-component.vue';

export default {
  name: 'crafting-component',
  data() {
    return {
      followers: 0,
      user: {
        id: 1,
        username: '_twitterhandle',
        firstname: 'twitter',
        price: 100
      },
      myInput: "",
      myInt: 0,
      laborCost: 0,
      goldCost: 0,
      polishCost: 0,
      stoneCost: 0
    }
  },
  computed: {
    doubledPrice() {
      return this.user.price * 2
    },
    totalActual() {
      return parseInt(this.tester) * 2
    },
    computedInt() {
      return parseInt(this.myInt) * 3
    },
    computeLaborCost() {
      if (this.goldCost && this.polishCost && this.stoneCost) {
        var totals = 0;
        totals = parseInt(this.goldCost) + parseInt(this.polishCost) + parseInt(this.stoneCost);
        this.laborCost = totals;
        return totals;
      } else {
        return 0;
      }
    }

  },
  methods: {
    followUser() {
      this.followers++
    }
  },
  components: {
    TwitterComponent,
  },
  mounted() {
    this.followUser()
  }
}

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-1">
        <header>
          <nav class="navbar-nav" id="inventoryNavBar">
            <RouterLink to="/inventory">Inventory</RouterLink>
            <RouterLink to="/">Add Card</RouterLink>
            <RouterLink to="/about">About</RouterLink>
          </nav>
        </header>
      </div>
      <div class="col-11">
        <main>
          <table class="table-bordered">
            <thead>
              <tr>
                <th class="text-center" colspan="7">LABOR</th>
              </tr>
              <tr>

                <th scope="col">ACTUAL COST</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Goldsmithz</th>
                <td><input type="text" v-model="goldCost" id="goldCost" name="goldCost" class="form-control"></td>
              </tr>

              <tr>
                <th scope="row">Stone Setter</th>
                
                <td><input type="text" v-model="stoneCost" id="stoneCost" name="stoneCost" class="form-control"></td>
              </tr>
              <tr>
                <th scope="row">Polisher</th>
                
                <td><input type="text" v-model="polishCost" id="polishCost" name="polishCost" class="form-control"></td>
              </tr>
              <tr id="lastLaborRow">
                <th scope="row"></th>
                <td id="totalLaborCost"><strong>TOTAL LABOR COST: {{ parseInt(this.goldCost) + parseInt(this.polishCost)
                + parseInt(this.stoneCost) }} </strong></td>
              </tr>
            </tbody>
          </table>


          <!--
            <TwitterComponent msg="Inventory Card Form" />
            <CraftingComponent msg="hi" TRY PUTTING LOGIC HERE. INstead of twitter component
            <BadComponent msg="Teexz" />
            />-->
          <router-view></router-view>

        </main>
      </div>
    </div>
  </div>
</template>

<style>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}



.logo {
  margin: 0 2rem 0 0;
}


#inventoryNavBar a {
  color: black;
  text-decoration: none;
}

#inventoryNavBar>a {
  font-weight: bold;
}
</style>
