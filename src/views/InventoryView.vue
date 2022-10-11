<script>
import { supabase } from '../supabase'
import { useRoute } from 'vue-router'


export default {
  name: 'inventoryView',
  data() {
    return {
      loadedData: false,
      route: useRoute(),
      cardInfo: [],
      craftingInfo: [],
      laborInfo: [],
      imgInfo: ""
    }
  },
  computed: {
  },
  methods: {

    async craftingShow() {
      let filterString = this.route.params.invenId
      const { data, error } = await supabase
        .from('crafting')
        .select('*')
        .eq("inventorylink", filterString)

      this.craftingInfo = data
      this.loadedData = true

    },

    async laborShow() {
      let filterString = this.route.params.invenId

      const { data, error } = await supabase
        .from('labor')
        .select('*')
        .eq("inventorylink", filterString)
      
      this.laborInfo = data
      this.loadedData = true
    },

    async cardShow() {

      let filterString = this.route.params.invenId

      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .eq('inventorylink', filterString)

      this.cardInfo = data
      this.loadedData = true

    },

    async deleteEverything(){

      let filterString = this.route.params.invenId

      const { data, error } = await supabase
      .from('inventory')
      .delete()
      .eq('inventorylink', filterString)

      const { craftingdata, craftingerror } = await supabase
      .from('crafting')
      .delete()
      .eq('inventorylink', filterString)

      const { labordata, laborerror } = await supabase
      .from('labor')
      .delete()
      .eq('inventorylink', filterString)

      if(this.cardInfo[0].imgSrc!=" "){
      this.imgInfo = this.cardInfo[0].imgSrc.split('/').pop()

      const { storagedata, storageerror } = await supabase
      .storage
      .from('images')
      .remove(this.imgInfo)

      }
      alert("Inventory Card Deleted.")
      this.$router.push('/')

    }



  },
  components: {

  },
  mounted() {

    this.craftingShow()
    this.laborShow()
    this.cardShow()


  }
}

</script>


<template>
  <main>
    

    <div class="Inventory">
      <div v-if="loadedData===true">
        <h1> {{cardInfo[0].itemName}}</h1>
        <div class="row">
          <div class="col-auto">
            <img :src="cardInfo[0].imgSrc">
          </div>
          <div class="col-auto">
            <div id="itemDetailsPortion">
              <h4>ITEM DETAILS</h4>
              <p><strong>ITEM: </strong> {{cardInfo[0].itemName}}</p>
              <p><strong>DATE: </strong> {{cardInfo[0].date}}</p>
              <p><strong>SKU NO: </strong> {{cardInfo[0].skuNo}}</p>
              <p><strong>JO #: </strong> {{cardInfo[0].joNo}}</p>
              <p><strong>TYPE: </strong> {{cardInfo[0].itemType}}</p>
              <p><strong>COLOR: </strong> {{cardInfo[0].itemColor}}</p>
              <p><strong>MATERIAL: </strong>{{cardInfo[0].itemMaterial}}</p>
            </div>
          </div>
          <div class="col-auto">
            <h4>ITEM PRICING</h4>
            <p><strong>QUANTITY: </strong>{{cardInfo[0].quantity}}</p>
            <p>ACTUAL: {{cardInfo[0].actual}}</p>
            <p><strong>TOTAL ACTUAL: {{cardInfo[0].totalActual}}</strong></p>
            <p>REPLACEMENT: {{cardInfo[0].replacement}}</p>
            <p><strong>TOTAL REPLACEMENT: {{cardInfo[0].totalReplacement}}</strong></p>
            <p>RETAIL: {{cardInfo[0].retail}}</p>
            <p><strong>TOTAL RETAIL: {{cardInfo[0].totalRetail}}</strong></p>
            <p>TAG: {{cardInfo[0].tag}}</p>
            <p><strong>TOTAL TAG: {{cardInfo[0].totalTag}}</strong></p>
          </div>
          <div class="col-auto">
            <h4>AVAILABILITY</h4>
            <p><strong>STOCK: </strong> {{cardInfo[0].availability}}</p>
            <div v-if="cardInfo[0].availability==='Sold'">
              <p><strong>SOLD TO: </strong> {{cardInfo[0].buyName}}</p>
              <p><strong>DATE: </strong> {{cardInfo[0].buyDate}}</p>
              <p><strong>PRICE: </strong> {{cardInfo[0].buyPrice}}</p>
           </div>
          </div>
          <div class="col-auto" id="encodingDetails">
            <h4>ENCODING DETAILS</h4>
            <p><strong>PREPARED BY: </strong> {{cardInfo[0].preparedBy}}</p>
            <p><strong>ENCODED BY: </strong> {{cardInfo[0].encodedBy}}</p>
          </div>
        </div>
        <hr>
        <div class="container row">
          CRAFTING
        </div>
        <hr>
        <div class="container row">
          LABOR
        </div>
        <hr>
        <button @click="deleteEverything()"> Delete </button>
      </div>
      <div v-if="loadedData===false"> Data is Loading </div>
    </div>

  </main>
</template>

<style scoped>
p{
  margin-bottom: 0px;
}

#itemDetailsPortion{
  padding-bottom:20%;
}

img{
  width:100%;
  height: 100%;
  max-height: 300px;
}

#encodingDetails{
}

</style>