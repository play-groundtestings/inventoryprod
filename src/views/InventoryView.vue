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
      imgInfo: "",
      goldInfo: [],
      stoneInfo: [],
      polishInfo: []
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

      if(this.cardInfo[0].imgSrc!=null){
      this.imgInfo = this.cardInfo[0].imgSrc.split('/').pop()

      const { storagedata, storageerror } = await supabase
      .storage
      .from('images')
      .remove(this.imgInfo)

      }
      alert("Inventory Card Deleted.")
      this.$router.push('/')

    },
    async goldShow() {
      let filterString = this.route.params.invenId

      const { data, error } = await supabase
        .from('labor')
        .select('*')
        .eq("inventorylink", filterString)
        .eq('occupation','goldsmith')
      
      this.goldInfo = data
      this.loadedData = true
    },
    async stoneShow() {
      let filterString = this.route.params.invenId

      const { data, error } = await supabase
        .from('labor')
        .select('*')
        .eq("inventorylink", filterString)
        .eq('occupation','stonesetter')
      
      this.stoneInfo = data
      this.loadedData = true
    },
    async polishShow() {
      let filterString = this.route.params.invenId

      const { data, error } = await supabase
        .from('labor')
        .select('*')
        .eq("inventorylink", filterString)
        .eq('occupation','polisher')
      
      this.polishInfo = data
      this.loadedData = true
    },
    
    



  },
  components: {

  },
  mounted() {

    this.craftingShow()
    this.laborShow()
    this.cardShow()
    this.goldShow()
    this.stoneShow()
    this.polishShow()


  }
}

</script>


<template>
  <main>
    

    <div class="Inventory">
      <div v-if="loadedData===true">
        <h1> {{cardInfo[0].itemName}}</h1>
        <div class="row">
          <div class="col-auto" v-if="cardInfo[0].imgSrc!=null">
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
            <p>ACTUAL: {{cardInfo[0].actual.toLocaleString()}}</p>
            <p><strong>TOTAL ACTUAL: {{cardInfo[0].totalActual.toLocaleString()}}</strong></p>
            <p>REPLACEMENT: {{cardInfo[0].replacement.toLocaleString()}}</p>
            <p><strong>TOTAL REPLACEMENT: {{cardInfo[0].totalReplacement.toLocaleString()}}</strong></p>
            <p>RETAIL: {{cardInfo[0].retail.toLocaleString()}}</p>
            <p><strong>TOTAL RETAIL: {{cardInfo[0].totalRetail.toLocaleString()}}</strong></p>
            <p>TAG: {{cardInfo[0].tag.toLocaleString()}}</p>
            <p><strong>TOTAL TAG: {{cardInfo[0].totalTag.toLocaleString()}}</strong></p>
          </div>

          <div class="col-auto">
            <h4> ITEM STATUS  </h4>
            <p><strong>RESERVED: </strong> <span v-if="cardInfo[0].reserved==='true'"> &#10003; </span> <span v-if="cardInfo[0].reserved==='false'"> &#10007; </span></p>
            <p><strong>REMADE: </strong> <span v-if="cardInfo[0].remade==='true'"> &#10003; </span> <span v-if="cardInfo[0].remade==='false'"> &#10007; </span></p>
            <p><strong>BORROWED: </strong> <span v-if="cardInfo[0].borrowed==='true'"> &#10003; </span> <span v-if="cardInfo[0].borrowed==='false'"> &#10007; </span></p>
            <p><strong>CONSIGNED: </strong> <span v-if="cardInfo[0].consigned==='true'"> &#10003; </span> <span v-if="cardInfo[0].consigned==='false'"> &#10007; </span></p>
          </div>

          <div class="col-auto" id="availabilityFormatting">
            <h4> SALES HISTORY  </h4>
            <p><strong>AVAILABILITY: </strong> {{cardInfo[0].availability}}</p>
            <div v-if="cardInfo[0].availability==='Sold'">
              <p><strong>SOLD TO: </strong> {{cardInfo[0].buyName}}</p>
              <p><strong>DATE: </strong> {{cardInfo[0].buyDate}}</p>
              <p><strong>PRICE: </strong> {{cardInfo[0].buyPrice.toLocaleString()}}</p>
           </div>
          </div>



          <div class="col-auto d-flex">

         </div>
        </div>
        

        <div class="container row">
          
          <table class="col table-bordered" id="maintab">
                  <thead id="craftingMatStyle">
                    <tr>
                      <th class="text-center" colspan="13">CRAFTING MATERIALS</th>
                    </tr>
                    <tr>
                      <th scope="col">NO. OF PCS</th>
                      <th scope="col">MAT'L</th>
                      <th scope="col">DESCRIPTION</th>
                      <th scope="col">SUPPLIER/INV.#/DATE/CODE</th>
                      <th scope="col">WT.</th>
                      <th scope="col">UNIT COST</th>
                      <th scope="col">$ RT</th>
                      <th scope="col">TOTAL P COST (per item)</th>
                      <th scope="col">CUR. $ RT</th>
                      <th scope="col">TOTAL REP. COST (per item)</th>
                      <th scope="col">M.U.</th>
                      <th scope="col">COUR</th>
                      <th scope="col">S.P.</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="crafting in craftingInfo">
                      <td> {{crafting.noOfPcs}} </td>
                      <td> {{crafting.material}}</td>
                      <td> {{crafting.description}}</td>
                      <td> {{crafting.supInvDaCo}}</td>
                      <td> {{crafting.wt}}</td>
                      <td> {{crafting.unitcost.toLocaleString()}}</td>
                      <td> {{crafting.rt}}</td>
                      <td> {{crafting.pCost.toLocaleString()}}</td>
                      <td> {{crafting.curRt}}</td>
                      <td> {{crafting.repCost.toLocaleString()}}</td>
                      <td> {{crafting.mu}}</td>
                      <td> {{crafting.cour}}</td>
                      <td> {{crafting.sp.toLocaleString()}}</td>
                    </tr>
                    <tr id="lastCraftRow">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td id="totalPCraft"><strong>TOTAL P COST: {{cardInfo[0].totalCraftP.toLocaleString()}} </strong></td>
                      <td></td>
                      <td id="totalRepCraft"><strong>TOTAL REP COST: {{cardInfo[0].totalCraftRep.toLocaleString()}}</strong></td>
                      <td></td>
                      <td></td>
                      <td id="totalSpCraft"><strong>FINAL SP: {{cardInfo[0].totalCraftSp.toLocaleString()}}</strong></td>
                    </tr>
                  </tbody>
                </table>



        </div>

        <div class="row d-flex justify-content-between" id="laborSection">
          <div class="col-6">
            <table class="table-bordered" id="laborTable">
                  <thead>
                    <tr>
                      <th class="text-center" colspan="7">LABOR</th>
                    </tr>
                    <tr>
                      <th scope="col"> </th>
                      <th scope="col">NAME</th>
                      <th scope="col">HRS</th>
                      <th scope="col">ACTUAL RATE</th>
                      <th scope="col">ACTUAL COST</th>
                      <th scope="col">M.U.</th>
                      <th scope="col">SP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Goldsmith</th>
                      <td>{{goldInfo[0].name}}</td>
                      <td>{{goldInfo[0].hrs}}</td>
                      <td>{{goldInfo[0].actualRate}}</td>
                      <td>{{goldInfo[0].actualCost}}</td>
                      <td>{{goldInfo[0].mu}}</td>
                      <td>{{goldInfo[0].sp}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Stone Setter</th>
                      <td>{{stoneInfo[0].name}}</td>
                      <td>{{stoneInfo[0].hrs}}</td>
                      <td>{{stoneInfo[0].actualRate}}</td>
                      <td>{{stoneInfo[0].actualCost}}</td>
                      <td>{{stoneInfo[0].mu}}</td>
                      <td>{{stoneInfo[0].sp}}</td>
                    </tr>
                    <tr>
                      <th scope="row">Polisher</th>
                      <td>{{polishInfo[0].name}}</td>
                      <td>{{polishInfo[0].hrs}}</td>
                      <td>{{polishInfo[0].actualRate}}</td>
                      <td>{{polishInfo[0].actualCost}}</td>
                      <td>{{polishInfo[0].mu}}</td>
                      <td>{{polishInfo[0].sp}}</td>
                    </tr>
                    <tr id="lastLaborRow">
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td id="totalLaborCost"><strong>TOTAL LABOR COST: {{cardInfo[0].totalLaborActual.toLocaleString()}} </strong></td>
                    <td id="totalLaborMu"><strong>MU: {{cardInfo[0].totalLaborMu.toLocaleString()}} </strong></td>
                    <td id="totalLaborSp"><strong>FINAL SP: {{cardInfo[0].totalLaborSp.toLocaleString()}} </strong></td>
                    </tr>
                  </tbody>
              </table>
        </div>
        <div class="col-3" id="encodingDetails">
         <p id="preparedPadding"><strong>PREPARED BY: </strong> {{cardInfo[0].preparedBy}} </p>
            <p><strong>ENCODED BY: </strong> {{cardInfo[0].encodedBy}} </p>
            <button id="editButton"> <a :href="`/inventory/${cardInfo[0].id}/edit`">EDIT</a> </button>
            <button id="deleteButton" @click="deleteEverything()"> <strong></strong> DELETE </button>
        </div>
      </div>


    

      </div>
      <div v-if="loadedData===false"> Data is Loading </div>
    </div>

  </main>
</template>

<style scoped>
p{
  margin-bottom: 0px;
}

#laborSection{
  padding-top:1%;
}

#preparedPadding{
  padding-right: 2%
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
  font-size: 80%;
  padding-top: 5%;
}

#editButton{
  margin-top: 4%;
  margin-right: 10%;
  font-size:100%;
  font-weight:bold;
}

#deleteButton{
  font-size:100%;
  font-weight:bold;
}


#editButton:hover{
  background-color:#808080;
}

#laborTable #totalLaborCost {
  border: 2px #505050 solid;
  font-size: small
}

#laborTable #totalLaborMu {
  border: 2px #505050 solid;
  font-size: small
}

#laborTable #totalLaborSp {
  border: 2px #505050 solid;
  font-size: small
}

a{color:black;
text-decoration:none;}

a:hover{color:black;}

#deleteButton:hover{background-color: #808080;}



</style>