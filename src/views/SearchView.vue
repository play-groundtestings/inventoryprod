<script>
import {supabase} from '../supabase'


export default {
  name: 'searchView',
  data() {
    return {
      searchList: [],
      loadedData: false,
      searchParameter: "",
      sold: "All"
 
    }
  },
  computed: {
  },
  methods: {
    async searchQuery(){

      if(this.sold=="All" && this.searchParameter==""){
        let { data: inventory, error } = await supabase.from('inventory').select('*')
        this.searchList = inventory
        this.loadedData = true
      }else if(this.sold=="All" && this.searchParameter){
        let { data: inventory, error } = await supabase.from('inventory').select('*').textSearch('itemType', this.searchParameter)
        this.searchList = inventory
        this.loadedData = true
      }else if(this.sold =="In-Stock" || this.sold =="Sold"  && this.searchParameter==""){
        let { data: inventory, error } = await supabase.from('inventory').select('*').textSearch('availability', this.sold)
        this.searchList = inventory
        this.loadedData = true
      }else if(this.sold =="In-Stock" || this.sold =="Sold"  && this.searchParameter){
        let { data: inventory, error } = await supabase.from('inventory').select('*').textSearch('availability', this.sold).textSearch('itemType', this.searchParameter)
        this.searchList = inventory
        this.loadedData = true
      }


    }
  },
  components: {
  },
  async mounted() {

  }
}


</script>


<template>
    <h1>Search</h1>

    <form @submit.prevent="searchQuery">
      <div class="row" id="radioForm">
        <div class="col-1">
          <input type="radio" name="availability" id="All" v-model="sold" value="All" checked/>
          ALL
          </div>
          <div class="col-1">
          <input type="radio" name="availability" id="Sold" v-model="sold" value="Sold"/>
          SOLD
          </div>
          <div class="col-2">
          <input type="radio" name="availability" id="Stocked" v-model="sold" value="In-Stock" />
          IN STOCK
          </div>
        </div>
        <div class="row">
        <h2>
        <input type="text" name="searchParameter" v-model="searchParameter" id="searchParameter">
        <button type="submit">Search</button>
        </h2>
      </div>
    </form>

    <div class="Inventory">
      <p v-if="loadedData===true"> 
        <div class="container row">
          <div class="card col-auto" v-for="card in searchList">
            <div class="card-body">
              <h5 class="card-title"> {{card.itemName}}</h5>
              <p class="card-text">SKU-NO: {{card.skuNo}} </p>
              <p class="card-text">Type: {{card.itemType}} </p>
              <p class="card-text">Color: {{card.itemColor}} </p>
              <p class="card-text">Material: {{card.itemMaterial}} </p>
              <p class="card-text">Availability: {{card.availability}} </p>
              <a :href="`/inventory/${card.id}`" class="btn btn-primary">Go</a>
            </div>
          </div>
        </div>
      </p>
      <div v-if="loadedData===false"> Enter a search filter. <em>e.g. earrings, gold, purple</em>  </div>
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