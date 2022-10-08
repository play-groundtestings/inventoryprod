<script>
import axios from 'axios'
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

   let { data: inventory, error } = await supabase.from('crafting').select('*')
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
        <div class="row">
          <div class="col-2" v-for="card in inventoryList">
            <div>{{ card }}</div> 
          </div>
        </div>
      </div>

      <div v-if="loadedData===false"> Data is Loading </div>
         
        <!--<a :href="`/inventory/${randomId}`">Link to single view page</a>-->
    </div>
</template>

