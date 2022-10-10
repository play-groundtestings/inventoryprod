<script>
import { supabase } from '../supabase'


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
    async searchQuery() {

      var chosenParameter = this.searchParameter

      if (this.sold == "All" && this.searchParameter == "") {
        let { data: inventory, error } = await supabase.from('inventory').select('*')
        this.searchList = inventory
        this.loadedData = true
      } else if (this.sold == "All" && this.searchParameter) {
        let { data: inventory, error } = await supabase.from('inventory').select('*').textSearch('itemType', this.searchParameter)
        this.searchList = inventory
        this.loadedData = true
      }

      if (this.sold == "In-Stock" && chosenParameter != "") {
        let { data: inventory, error } = await supabase.from('inventory').select('*').textSearch('availability', this.sold).textSearch('itemType', this.searchParameter)
        this.searchList = inventory
        this.loadedData = true
      } else if (this.sold == "In-Stock" && chosenParameter == "") {
        let { data: inventory, error } = await supabase.from('inventory').select('*').textSearch('availability', this.sold)
        this.searchList = inventory
        this.loadedData = true
      }

      if (this.sold == "Sold" && chosenParameter != "") {
        let { data: inventory, error } = await supabase.from('inventory').select('*').textSearch('availability', this.sold).textSearch('itemType', this.searchParameter)
        this.searchList = inventory
        this.loadedData = true
      } else if (this.sold == "Sold" && chosenParameter == "") {
        let { data: inventory, error } = await supabase.from('inventory').select('*').textSearch('availability', this.sold)
        this.searchList = inventory
        this.loadedData = true
      }

      if (this.sold == "skuNo" && chosenParameter != "") {
        let { data: inventory, error } = await supabase.from('inventory').select('*').textSearch('skuNo', this.searchParameter)
        this.searchList = inventory
        this.loadedData = true
      }
      if (this.sold == "joNo" && chosenParameter != "") {
        let { data: inventory, error } = await supabase.from('inventory').select('*').textSearch('joNo', this.searchParameter)
        this.searchList = inventory
        this.loadedData = true
      }

    },

    async conditionalSearch() {
      const filterByName = 'gold'
      const filterPopLow = 'In-Stock'
      //  const filterPopHigh = 10000

      let query = supabase
        .from('inventory')
        .select('*')

      if (filterByName) { query = query.eq('itemColor', filterByName) }
      if (filterPopLow) { query = query.eq('availability', filterPopLow) }
      //  if (filterPopHigh) { query = query.lt('population', filterPopHigh) }

      const { data, error } = await query

      this.searchList = data
      this.loadedData = true
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
        <input type="radio" name="All" id="All" v-model="sold" value="All" checked />
        ALL
      </div>
      <div class="col-1">
        <input type="radio" name="Sold" id="Sold" v-model="sold" value="Sold" />
        SOLD
      </div>
      <div class="col-1">
        <input type="radio" name="Stocked" id="Stocked" v-model="sold" value="In-Stock" />
        IN STOCK
      </div>
      <div class="col-1">
        <input type="radio" name="skuNo" id="skuNo" v-model="sold" value="skuNo" />
        SKU NO
      </div>
      <div class="col-1">
        <input type="radio" name="joNo" id="joNo" v-model="sold" value="joNo" />
        JO NO
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
      <div class="card col-auto"  v-for="card in searchList">

        <div class="row no-gutters">
          <div v-if="card.imgSrc" class="col-md-4">
            <img :src="card.imgSrc" class="card-img" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title"><a :href="`/inventory/${card.id}`" class="btn btn-primary"><strong>{{card.itemName}}</strong></a></h5>
              <p class="card-text"><strong>SKU NO: </strong>{{card.skuNo}}</p>
              <p class="card-text"> <strong>TYPE: </strong>{{card.itemType}}</p>
              <p class="card-text"> <strong>COLOR: </strong>{{card.itemColor}}</p>
              <p class="card-text"> <strong>MATERIAL: </strong> {{card.itemMaterial}}</p>
              <p class="card-text"><small class="text-muted">{{card.availability}}</small></p>

            </div>
          </div>

        </div>
      </div>
    </div>
    </p>
    <div v-if="loadedData===false"> Enter a search filter. <em>e.g. earrings, gold, purple</em> </div>
  </div>

</template>

<style scoped>
.card {
  border-color: black;
  margin-right: 2%;
  border-radius: 0%;
  margin-bottom: 1.5%;
}

.card a {
  color: black;
  background-color: white;
  border-radius: 0%;
  border-color: black;
}

.card p {
  margin-bottom: 1%;
}

.card-body{
  padding-left: 0px;
  padding-right: 0px;
}

img {
  width: 100%;
  height: 100%;
  max-height: 250px;
  border-radius: 0px;
  padding: 5%
}

.col-md-3{
  padding-left: 0px;
}

</style>