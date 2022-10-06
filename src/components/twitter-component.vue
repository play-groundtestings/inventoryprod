<script setup>


import { ref } from "vue";

const text = ref('');
const count = ref(0);
const actual = ref('');
const replacement = ref('');
const retail = ref('');
const tag = ref('');
const quantity = ref('');
const craftpcost = ref([]);
const craftrepcost = ref([]);
const craftsp = ref([]);
const craftnoofpcs = ref([]);
const craftunitcost = ref([]);
const craftmu = ref([]);
const tableRows = ref([]);
const goldHrs = ref('');
const goldRate = ref('');
const stoneHrs = ref('');
const stoneRate = ref('');
const polishHrs = ref('');
const polishRate = ref('');
const polishCost = ref('');
const goldCost = ref('');
const stoneCost = ref('');
const laborCost = ref('');
const totalMu = ref('');

defineProps({
  msg: {
    type: String,
    required: true
  }
})

function computeLaborCost() {

  if (this.goldCost && this.polishCost && this.stoneCost) {
    var totals = 0;
    totals = parseInt(this.goldCost) + parseInt(this.polishCost) + parseInt(this.stoneCost);
    this.laborCost = totals;
    console.log("hi there")
    return totals;
  } else {
    return 0;
  }
}

</script>

<template>
  <div class="greetings">
    <div class="row padTop" id="lastRowPad">
      <div class="col" id="laborTable">
        <table class="table-bordered">
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
              <th scope="row">Goldsmithz</th>
              <td><input type="text" v-model.number="goldName" id="goldName" name="goldName" class="form-control">
              </td>
              <td><input type="text" v-model.number="goldHrs" id="goldHrs" name="goldHrs" class="form-control"></td>
              <td><input type="text" v-model.number="goldRate" @input="computeGoldSmith()" id="goldRate" name="goldRate"
                  class="form-control"></td>
              <td><input type="text" v-model="goldCost" id="goldCost" name="goldCost" class="form-control"></td>
              <td><input type="text" v-model.number="goldMu" id="goldMu" name="goldMu" class="form-control"></td>
              <td><input type="text" v-model.number="goldSp" id="goldSp" name="goldSp" class="form-control"></td>
            </tr>

            <tr>
              <th scope="row">Stone Setter</th>
              <td><input type="text" v-model.number="stoneName" id="stoneName" name="stoneName" class="form-control">
              </td>
              <td><input type="text" v-model.number="stoneHrs" id="stoneHrs" name="stoneHrs" class="form-control">
              </td>
              <td><input type="text" v-model.number="stoneRate" id="stoneRate" @input="computeStoneSmith()"
                  name="stoneRate" class="form-control"></td>
              <td><input type="text" v-model="stoneCost" id="stoneCost" name="stoneCost" class="form-control"></td>
              <td><input type="text" v-model.number="stoneMu" id="stoneMu" name="stoneMu" class="form-control"></td>
              <td><input type="text" v-model.number="stoneSp" id="stoneSp" name="stoneSp" class="form-control"></td>
            </tr>
            <tr>
              <th scope="row">Polisher</th>
              <td><input type="text" v-model.number="polishName" id="polishName" name="polishName" class="form-control">
              </td>
              <td><input type="text" v-model.number="polishHrs" id="polishHrs" name="polishHrs" class="form-control">
              </td>
              <td><input type="text" v-model.number="polishRate" @input="computePolishSmith()" id="polishRate"
                  name="polishRate" class="form-control"></td>
              <td><input type="text" v-model="polishCost" id="polishCost" name="polishCost" class="form-control"></td>
              <td><input type="text" v-model.number="polishMu" id="polishMu" name="polishMu" class="form-control">
              </td>
              <td><input type="text" v-model.number="polishSp" id="polishSp" name="polishSp" class="form-control">
              </td>
            </tr>
            <tr id="lastLaborRow">
              <th scope="row"></th>
              <td></td>
              <td></td>
              <td></td>
              <td id="totalLaborCost"><strong>TOTAL LABOR COST: {{ parseInt(this.goldCost) + parseInt(this.polishCost) + parseInt(this.stoneCost) }} </strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
.greetings .green {
  color: black;
}
</style>
