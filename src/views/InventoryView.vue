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

      this.imgInfo = this.cardInfo[0].imgSrc.split('/').pop()

      const { storagedata, storageerror } = await supabase
      .storage
      .from('images')
      .remove(this.imgInfo)

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
    <h1>Single Page View</h1>
    <div>
      <h2> Welcome agent {{route.params.inventoryId}} </h2>
    </div>

    <div class="Inventory">
      <div v-if="loadedData===true">
        <div class="row">
          <div>
            <div style="background-color: greenyellow"> {{cardInfo}} </div>
           <div style="background-color: aliceblue"> {{craftingInfo}} </div>
            <div style="background-color: plum"> {{laborInfo}} </div>
            <div style="background-color: royalblue"> {{cardInfo[0].imgSrc}} </div>
            <img :src="cardInfo[0].imgSrc">
            <button @click="deleteEverything()"> Delete </button>
          </div>
        </div>
      </div>
      <div v-if="loadedData===false"> Data is Loading </div>
    </div>

  </main>
</template>
