<script>
import {supabase} from '../supabase'


export default {
  name: 'searchView',
  data() {
    return {
      searchList: [],
        loadedData: false
 
    }
  },
  computed: {
  },
  methods: {
  },
  components: {

  },
  async mounted() {

   let { data: inventory, error } = await supabase.from('inventory').select('*')
   this.searchList = inventory
   this.loadedData = true

  }
}


</script>


<template>
    <h1>Search</h1>
    <h2><form>
      <input type="text" name="searchParam" id="searchParam">
      <button type="submit">Search</button>
    </form></h2>

    <div class="Inventory">
      <p v-if="loadedData===true"> 
        <div class="container row">
          <div class="card col-auto" v-for="card in searchList">
            <div class="card-body">
              <h5 class="card-title"> {{card.itemType}}</h5>
              <p class="card-text"> {{card.skuNo}} </p>
              <a :href="`/inventory/${card.id}`" class="btn btn-primary">Go</a>
            </div>
          </div>
        </div>
      </p>
      <div v-if="loadedData===false"> Data is Loading </div>
    </div>

</template>

<style scoped>
.card{
  border-color:black;
  margin-right: 2%;
  border-radius: 0%;
  margin-bottom: 1.5%;
}

.card a{
  color: black;
  background-color: white;
  border-radius: 0%;
  border-color: black;
}

</style>