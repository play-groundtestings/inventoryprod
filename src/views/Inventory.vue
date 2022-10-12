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
      <div class="card col-auto"  v-for="card in inventoryList">

        <div class="row no-gutters d-flex align-items-center justify-content-center">
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

p {
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

</style>