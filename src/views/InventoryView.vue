<script>
import { supabase } from '../supabase'
import { useRoute } from 'vue-router'


export default {
  name: 'inventoryView',
  data() {
    return {
      inventoryId: "",
      loadedData: false,
      route: useRoute(),
      cardInfo: [],
      craftingInfo: [],
      laborInfo: []
    }
  },
  computed: {
  },
  methods: {
  },
  components: {

  },
  async mounted() {
   var id = this.route.params.inventoryId
   let { data: card, error } = await supabase.from('inventory').select('*').eq('id', id)
   let { data: crafting, errorcraft } = await supabase.from('crafting').select('*').eq('inventoryId', id)
   let { data: labor, errorlabor } = await supabase.from('labor').select('*').eq('inventoryId', id)
   this.cardInfo = card
   this.craftingInfo = crafting
   this.laborInfo = labor

   this.loadedData = true
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
              <div style="background-color: greenyellow"> {{cardInfo}}</div>
              <div style="background-color: aliceblue"> {{craftingInfo}} </div>
              <div style="background-color: plum"> {{laborInfo}} </div>
            </div>
        </div>
      </div>
      <div v-if="loadedData===false"> Data is Loading </div>
    </div>

  </main>
</template>
