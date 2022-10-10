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

   let { data: inventory, error } = await supabase.from('inventory').select('*').order('created_at', {ascending: false})
   console.log(supabase)
   console.log(inventory)
   this.inventoryList = inventory
   this.loadedData = true

  }
}


</script>


<template>
    <h1>Inventory</h1>

    <div class="Inventory">
      <p v-if="loadedData===true"> 
        <div class="container row">
          <div class="card col-auto" v-for="card in inventoryList">
            <div class="card-body">
              <h5 class="card-title"> {{card.itemName}}</h5>
              <p class="card-text"> {{card.skuNo}} </p>
              <p class="card-text"> {{card.itemType}} </p>
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