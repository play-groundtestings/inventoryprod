<script>
import { supabase } from '../supabase'
import { useRoute } from 'vue-router'


export default {
  name: 'editView',
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
      polishInfo: [],
      itemName: [],
      date: [],
      skuNo: [],
      joNo: [],
      itemType: [],
      itemColor: [],
      itemMaterial: [],
      quantity: [],
      actual: [],
      totalActual: [],
      replacement: [],
      totalReplacement: [],
      retail: [],
      totalRetail: [],
      tag: [],
      totalTag: [],
      availability: [],
      buyName: [],
      buyDate: [],
      buyPrice: [],
      totalCraftP: [],
      totalCraftRep: [],
      totalCraftSp: [],
      totalLaborActual: [],
      totalLaborMu: [],
      totalLaborSp: [],
      preparedBy: [],
      encodedBy: [],
      editData: [],
      goldName: [],
      goldHrs: [],
      goldActualRate: [],
      goldActualCost: [],
      goldMu: [],
      goldSp: [],
      stoneName: [],
      stoneHrs: [],
      stoneActualRate: [],
      stoneActualCost: [],
      stoneMu: [],
      stoneSp: [],
      polishName: [],
      polishHrs: [],
      polishActualRate: [],
      polishActualCost: [],
      polishMu: [],
      polishSp: [],
      editcraftcour: [],
      editcraftcurrt: [],
      editcraftrt: [],
      editcraftwt: [],
      editcraftsupinvdac: [],
      editcraftdescription: [],
      editcraftmatl: [],
      editcraftpcost: [],
      editcraftrepcost: [],
      editcraftsp: [],
      editcraftnoofpcs: [],
      editcraftunitcost: [],
      editcraftmu: [],
      editcraftid: []
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

      for(var i=0; i<this.craftingInfo.length; i++){
        this.editcraftnoofpcs[i] = this.craftingInfo[i].noOfPcs
        this.editcraftid[i] = this.craftingInfo[i].id
        this.editcraftmatl[i] = this.craftingInfo[i].material
        this.editcraftdescription[i] = this.craftingInfo[i].description
        this.editcraftsupinvdac[i] = this.craftingInfo[i].supInvDaCo
        this.editcraftwt[i] = this.craftingInfo[i].wt
        this.editcraftunitcost[i] = this.craftingInfo[i].unitcost
        this.editcraftrt[i] = this.craftingInfo[i].rt
        this.editcraftpcost[i] = this.craftingInfo[i].pCost
        this.editcraftcurrt[i] = this.craftingInfo[i].curRt
        this.editcraftrepcost[i] = this.craftingInfo[i].repCost
        this.editcraftmu[i] = this.craftingInfo[i].mu
        this.editcraftcour[i] = this.craftingInfo[i].cour
        this.editcraftsp[i] = this.craftingInfo[i].sp
      }

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
      this.itemName = this.cardInfo[0].itemName
      this.date = this.cardInfo[0].date
      this.skuNo = this.cardInfo[0].skuNo
      this.joNo = this.cardInfo[0].joNo
      this.itemType = this.cardInfo[0].itemType
      this.itemColor = this.cardInfo[0].itemColor
      this.itemMaterial = this.cardInfo[0].itemMaterial
      this.quantity = this.cardInfo[0].quantity
      this.actual = this.cardInfo[0].actual
      this.totalActual = this.cardInfo[0].totalActual
      this.replacement = this.cardInfo[0].replacement
      this.totalReplacement = this.cardInfo[0].totalReplacement
      this.retail = this.cardInfo[0].retail
      this.totalRetail = this.cardInfo[0].totalRetail
      this.tag = this.cardInfo[0].tag
      this.totalTag = this.cardInfo[0].totalTag
      this.availability = this.cardInfo[0].availability
      this.buyName = this.cardInfo[0].buyName
      this.buyDate = this.cardInfo[0].buyDate
      this.buyPrice = this.cardInfo[0].buyPrice
      this.totalCraftP = this.cardInfo[0].totalCraftP
      this.totalCraftRep = this.cardInfo[0].totalCraftRep
      this.totalCraftSp = this.cardInfo[0].totalCraftSp
      this.totalLaborActual = this.cardInfo[0].totalLaborActual
      this.totalLaborMu = this.cardInfo[0].totalLaborMu
      this.totalLaborSp = this.cardInfo[0].totalLaborSp
      this.preparedBy = this.cardInfo[0].preparedBy
      this.encodedBy = this.cardInfo[0].encodedBy
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

    },
    async goldShow() {
      let filterString = this.route.params.invenId

      const { data, error } = await supabase
        .from('labor')
        .select('*')
        .eq("inventorylink", filterString)
        .eq('occupation','goldsmith')
      
      this.goldInfo = data
      this.goldName = this.goldInfo[0].name
      this.goldHrs = this.goldInfo[0].hrs
      this.goldActualRate = this.goldInfo[0].actualRate
      this.goldActualCost = this.goldInfo[0].actualCost
      this.goldMu = this.goldInfo[0].mu
      this.goldSp = this.goldInfo[0].sp
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
      this.stoneName = this.stoneInfo[0].name
      this.stoneHrs = this.stoneInfo[0].hrs
      this.stoneActualRate = this.stoneInfo[0].actualRate
      this.stoneActualCost = this.stoneInfo[0].actualCost
      this.stoneMu = this.stoneInfo[0].mu
      this.stoneSp = this.stoneInfo[0].sp
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

      this.polishName = this.polishInfo[0].name
      this.polishHrs = this.polishInfo[0].hrs
      this.polishActualRate = this.polishInfo[0].actualRate
      this.polishActualCost = this.polishInfo[0].actualCost
      this.polishMu = this.polishInfo[0].mu
      this.polishSp = this.polishInfo[0].sp

      this.loadedData = true
    },
    async editNow(){
      let filterString = this.route.params.invenId

      const { data, error } = await supabase
      .from('inventory')
      .update({
        itemName: this.itemName,
        skuNo: this.skuNo,
        date: this.date,
        joNo: this.joNo,
        itemType: this.itemType,
        itemColor: this.itemColor,
        itemMaterial: this.itemMaterial,
        quantity: this.quantity,
        actual: this.actual,
        totalActual: this.totalActual,
        replacement: this.replacement,
        totalReplacement: this.totalReplacement,
        retail: this.retail,
        totalRetail: this.totalRetail,
        tag: this.tag,
        totalTag: this.totalTag,
        availability:this.availability,
        buyName: this.buyName,
        buyDate: this.buyDate,
        buyPrice: this.buyPrice,
        totalCraftP: this.totalCraftP,
        totalCraftRep: this.totalCraftRep,
        totalCraftSp: this.totalCraftSp,
        totalLaborActual: this.totalLaborActual,
        totalLaborMu: this.totalLaborMu,
        totalLaborSp: this.totalLaborSp,
        preparedBy: this.preparedBy,
        encodedBy: this.encodedBy
      })
      .eq('inventorylink', filterString)


      const { golddatas, golderrors } = await supabase
        .from('labor')
        .update({
          name: this.goldName,
          hrs: this.goldHrs,
          actualRate: this.goldActualRate,
          actualCost: this.goldActualCost,
          mu: this.goldMu,
          sp: this.goldSp
        })
        .eq("inventorylink", filterString)
        .eq('occupation','goldsmith')

        const { stonedatas, stoneerrors } = await supabase
        .from('labor')
        .update({
          name: this.stoneName,
          hrs: this.stoneHrs,
          actualRate: this.stoneActualRate,
          actualCost: this.stoneActualCost,
          mu: this.stoneMu,
          sp: this.stoneSp
        })
        .eq("inventorylink", filterString)
        .eq('occupation','stonesetter')

        const { polishdatas, polisherrors } = await supabase
        .from('labor')
        .update({
          name: this.polishName,
          hrs: this.polishHrs,
          actualRate: this.polishActualRate,
          actualCost: this.polishActualCost,
          mu: this.polishMu,
          sp: this.polishSp
        })
        .eq("inventorylink", filterString)
        .eq('occupation','polisher')


        for(var i=0; i<this.craftingInfo.length; i++){
          const { craftingdata, craftingerror } = await supabase.from('crafting').update({ 
            noOfPcs: this.editcraftnoofpcs[i],
            material: this.editcraftmatl[i],
            description: this.editcraftdescription[i],
            supInvDaCo: this.editcraftsupinvdac[i],
            wt: this.editcraftwt[i],
            unitcost: this.editcraftunitcost[i],
            rt: this.editcraftrt[i],
            pCost: this.editcraftpcost[i],
            curRt: this.editcraftcurrt[i],
            repCost: this.editcraftrepcost[i],
            mu: this.editcraftmu[i],
            cour: this.editcraftcour[i],
            sp: this.editcraftsp[i],
            }).eq("inventorylink", filterString).eq("id", this.editcraftid[i])
        }


      alert("Inventory Card Edited.")
      this.$router.push('/inventory/' + filterString)
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
          <div class="col-auto">
            <img :src="cardInfo[0].imgSrc">
          </div>
          <div class="col-auto">
            <div id="itemDetailsPortion">
              <h4>ITEM DETAILS</h4>
              <p><strong>ITEM: </strong> <input v-model="itemName"></p>
              <p><strong>DATE: </strong> <input v-model="date"></p>
              <p><strong>SKU NO: </strong> <input v-model="skuNo"></p>
              <p><strong>JO #: </strong> <input v-model="joNo"></p>
              <p><strong>TYPE: </strong> <input v-model="itemType"></p>
              <p><strong>COLOR: </strong> <input v-model="itemColor"></p>
              <p><strong>MATERIAL: </strong><input v-model="itemMaterial"></p>
            </div>
          </div>
          <div class="col-auto">
            <h4>ITEM PRICING</h4>
            <p><strong>QUANTITY: </strong><input v-model="quantity"></p>
            <p>ACTUAL: <input v-model="actual"></p>
            <p><strong>TOTAL ACTUAL: <input v-model="totalActual"></strong></p>
            <p>REPLACEMENT: <input v-model="replacement"></p>
            <p><strong>TOTAL REPLACEMENT: <input v-model="totalReplacement"></strong></p>
            <p>RETAIL: <input v-model="retail"></p>
            <p><strong>TOTAL RETAIL: <input v-model="totalRetail"></strong></p>
            <p>TAG: <input v-model="tag"></p>
            <p><strong>TOTAL TAG: <input v-model="totalTag"></strong></p>
          </div>
          <div class="col-auto" id="availabilityFormatting">
            <h4> SALES HISTORY  </h4>
            <p><strong>AVAILABILITY: </strong> <input v-model="availability"></p>
              <p><strong>SOLD TO: </strong> <input v-model="buyName"></p>
              <p><strong>DATE: </strong> <input v-model="buyDate"></p>
              <p><strong>PRICE: </strong> <input v-model="buyPrice"></p>

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
                    <tr v-for="(crafting, key, index) in craftingInfo">
                      <td> <input v-model="editcraftnoofpcs[key]"> </td>
                      <td> <input v-model="editcraftmatl[key]"></td> 
                      <td> <input v-model="editcraftdescription[key]"></td>
                      <td> <input v-model="editcraftsupinvdac[key]"></td>
                      <td> <input v-model="editcraftwt[key]"></td>
                      <td> <input v-model="editcraftunitcost[key]"></td>
                      <td> <input v-model="editcraftrt[key]"></td>
                      <td> <input v-model="editcraftpcost[key]"></td>
                      <td> <input v-model="editcraftcurrt[key]"></td>
                      <td> <input v-model="editcraftrepcost[key]"></td>
                      <td> <input v-model="editcraftmu[key]"></td>
                      <td> <input v-model="editcraftcour[key]"></td>
                      <td> <input v-model="editcraftsp[key]"></td> 
                    </tr>
                    <tr id="lastCraftRow">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td id="totalPCraft"><strong>TOTAL P COST: <input v-model="totalCraftP"> </strong></td>
                      <td></td>
                      <td id="totalRepCraft"><strong>TOTAL REP COST: <input v-model="totalCraftRep"></strong></td>
                      <td></td>
                      <td></td>
                      <td id="totalSpCraft"><strong>FINAL SP: <input v-model="totalCraftSp"></strong></td>
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
                      <td><input v-model="goldName"></td>
                      <td><input v-model="goldHrs"></td>
                      <td><input v-model="goldActualRate"></td>
                      <td><input v-model="goldActualCost"></td>
                      <td><input v-model="goldMu"></td>
                      <td><input v-model="goldSp"></td>
                    </tr>
                    <tr>
                      <th scope="row">Stone Setter</th>
                      <td><input v-model="stoneName"></td>
                      <td><input v-model="stoneHrs"></td>
                      <td><input v-model="stoneActualRate"></td>
                      <td><input v-model="stoneActualCost"></td>
                      <td><input v-model="stoneMu"></td>
                      <td><input v-model="stoneSp"></td>
                    </tr>
                    <tr>
                      <th scope="row">Polisher</th>
                      <td><input v-model="polishName"></td>
                      <td><input v-model="polishHrs"></td>
                      <td><input v-model="polishActualRate"></td>
                      <td><input v-model="polishActualCost"></td>
                      <td><input v-model="polishMu"></td>
                      <td><input v-model="polishSp"></td>
                    </tr>
                    <tr id="lastLaborRow">
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td id="totalLaborCost"><strong>TOTAL LABOR COST: <input v-model="totalLaborActual"> </strong></td>
                    <td id="totalLaborMu"><strong>MU: <input v-model="totalLaborMu"> </strong></td>
                    <td id="totalLaborSp"><strong>FINAL SP: <input v-model="totalLaborSp"> </strong></td>
                    </tr>
                  </tbody>
              </table>
        </div>
      </div>
      <div class="col-3" id="encodingDetails">
         <p id="preparedPadding"><strong>PREPARED BY: </strong> <input v-model="preparedBy"> </p>
            <p><strong>ENCODED BY: </strong> <input v-model="encodedBy"> </p>
            <button id="editButton" @click="editNow()"> Submit </button>
        </div>

    

      </div>
      <div v-if="loadedData===false"> Data is Loading </div>
    </div>

  </main>
</template>

<style scoped>
p{
  margin-bottom: 2%;
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

#maintab{
  margin-top: 2%;
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