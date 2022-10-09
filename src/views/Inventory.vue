<script>
import {supabase} from '../supabase'


export default {
  name: 'inventoryList',
  data() {
    return {
      inventoryList: [],
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
   console.log(supabase)
   console.log(inventory)
   this.inventoryList = inventory
   this.loadedData = true

  }
}


</script>


<template>
    <h1>Inventory List</h1>
    <h2><form>
      <input type="text" name="searchParam" id="searchParam">
      <button type="submit">Search</button>
    </form></h2>

    <div class="Inventory">
      <div v-if="loadedData===true"> 
        <div class="container row">
          <div class="card col-3" v-for="card in inventoryList">
            <div class="card-body">
              <h5 class="card-title"> {{card.itemType}}</h5>
              <p class="card-text"> {{card.skuNo}} </p>
              <a :href="`/inventory/${card.id}`" class="btn btn-primary">Go</a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loadedData===false"> Data is Loading </div>
    </div>

</template>

<style scoped>
.card{
  border-color:black;
  margin-right: 2%;
  border-radius: 0%;
}

.card a{
  color: black;
  background-color: white;
  border-radius: 0%;
  border-color: black;
}

</style>