<script>
import { supabase } from '../supabase'


export default {
  name: 'searchView',
  data() {
    return {
      searchList: [],
      loadedData: false,
      searchParameter: "",
      availability: "All",
      identifier: null,
      typeSearch: "",
      colorSearch: "",
      materialSearch: ""
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
      var chosenParameter = this.searchParameter
      var filterByAvailability = this.availability


      let query = supabase.from('inventory').select('*')

      if(filterByAvailability !== 'All'){
        query = query.eq('availability', filterByAvailability)
      }

      if(this.identifier === 'Property'){

        if(this.typeSearch){ query = query.eq('itemType', this.typeSearch)}
        if(this.colorSearch){ query = query.eq('itemColor', this.colorSearch)}
        if(this.materialSearch){ query = query.eq('itemMaterial', this.materialSearch)}
      

        
      } else if (this.identifier ==='skuNo' || this.identifier === "joNo"){
        query = query.eq(this.identifier, chosenParameter)
      } else {

      }
  
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
  <h1>Search {{availability}}</h1>

  <form @submit.prevent="conditionalSearch" autocomplete="off">
    <div class="row" id="radioForm">
      <div class="col-1">
        <input type="radio" name="All" id="All" v-model="availability" value="All" checked />
        ALL
      </div>
      <div class="col-1">
        <input type="radio" name="Sold" id="Sold" v-model="availability" value="Sold" />
        SOLD
      </div>
      <div class="col-1">
        <input type="radio" name="Stocked" id="Stocked" v-model="availability" value="In-Stock" />
        IN STOCK
      </div>
      <div class="col-1">
        <input type="radio" name="skuNo" id="skuNo" v-model="identifier" value="skuNo" />
        SKU NO
      </div>
      <div class="col-1">
        <input type="radio" name="joNo" id="joNo" v-model="identifier" value="joNo" />
        JO NO
      </div>
    </div>
    <div class="row" id="propertyForm">
      <div class="col-2">
        <input type="radio" name="Property" id="Property" v-model="identifier" value="Property" />
        BY PROPERTY
      </div>
    </div>

    <div v-if="identifier==='Property'">
      <div class="row" id="propertyPicker">
        <div class="col-auto">
          TYPE
          <input type="text" name="typeSearch" id="typeSearch" v-model="typeSearch">
        </div>
        <div class="col-auto">
          MATERIAL
          <input type="text" name="materialSearch" id="materialSearch" v-model="materialSearch">
        </div>
        <div class="col-auto">
          COLOR
          <input type="text" name="colorSearch" id="colorSearch" v-model="colorSearch">
        </div>
      </div>

    </div>
    

    <div class="row" id="jumboSearch">
      <h2>
        <span v-if="identifier!=='Property'">
        <input type="text" name="searchParameter" v-model="searchParameter" id="searchParameter">
        </span>
        <button type="submit">Search</button>
      </h2>
    </div>
  </form>

  <div class="Inventory">
    <p v-if="loadedData===true">
    <div class="container row">
      <div class="card col-auto"  v-for="card in searchList">

        <div class="row no-gutters">
          <div v-if="card.imgSrc!=' '" class="col-md-4">
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

#radioForm{
  padding: 0;
  font-weight: bold;

}

#propertyForm{
  font-weight: bold;
}

#propertyPicker{
  font-weight:bold;
  margin-top: 1%;
  margin-bottom: 1%;
}

#jumboSearch{
  margin-top: 1%;
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