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

function computeGoldSmith() {
    if (this.goldRate) {
        this.goldCost = this.goldHrs * this.goldRate;
    }
}

function computeStoneSmith() {
    if (this.stoneRate) {
        this.stoneCost = this.stoneHrs * this.stoneRate;
    }
}

function computePolishSmith() {
    if (this.polishRate) {
        this.polishCost = this.polishHrs * this.polishRate;
    }
}


function computeLaborCost() {
    
    if (this.goldCost && this.polishCost && this.stoneCost) {
        var totals = 0;
        totals = parseInt(this.goldCost) + parseInt(this.polishCost) + parseInt(this.stoneCost);
        this.laborCost = totals;
        return totals;
    } else {
        return "";
    }
}

function computeFinalLaborSP() {
    if (totalMu) {
        return this.laborCost * this.totalMu;
    } else {
        return "";
    }
}

function computermode() {
    return text.value * 3;
}

function computeTotals(value) {
    return value * quantity.value;
}

function computeCraftingMats(value) {
    return this.craftnoofpcs[value] * this.craftunitcost[value];
}

function computeCraftCost(value) {
    var arrayOfNumbers = value.map(Number);
    var completed = arrayOfNumbers.reduce((partialSum, a) => partialSum + a, 0);
    return completed;
}


function computePCost(value) {
    if (!this.craftmu[value]) {
        this.craftpcost[value] = this.craftnoofpcs[value] * this.craftunitcost[value];
    }
    if (this.craftmu[value]) {
        this.craftsp[value] = this.craftnoofpcs[value] * this.craftunitcost[value] * this.craftmu[value];
    }
}

function consoleLogger() {
    console.log("actual: " + actual.value + " replacement: " + replacement.value);
}

const addRow = () => {
    tableRows.value.push([
        {
            noOfPcs: "",
            matl: "",
            description: "",
            supInvDaCo: "",
            wt: "",
            unitCost: "",
            rt: "",
            totalP: "",
            curRt: "",
            totalRep: "",
            mu: "",
            cour: "",
            sp: "",
            remBut: ""
        }
    ]);
}

const removeRow = (index) => {
    tableRows.value.splice(index, 1);
}



defineProps({
    msg: {
        type: String,
        required: true
    }
})




</script>
    
<template>
    <div class="greetings">
        <form id="masterForm" @submit.prevent="consoleLogger">
            <div class="row padTop" id="firstRegion">
                <div class="col-auto">
                    <label for="skuNo" class="col-form-label">SKU NO.</label>
                </div>
                <div class="col ">
                    <input type="text" id="skuNo" name="skuNo" class="form-control">
                </div>
                <div class="col-auto">
                    <label for="date" class="col-form-label">DATE</label>
                </div>
                <div class="col">
                    <input type="date" id="date" name="date" class="form-control">
                </div>
                <div class="col-auto">
                    <label for="joNo" class="col-form-label">JO #</label>
                </div>
                <div class="col">
                    <input type="text" id="joNo" name="joNo" class="form-control">
                </div>
                <div class="col-auto">
                    <label for="itemType" class="col-form-label">TYPE</label>
                </div>
                <div class="col">
                    <input type="text" id="itemType" name="itemType" class="form-control">
                </div>
                <div class="col-auto">
                    <label for="itemColor" class="col-form-label">COLOR</label>
                </div>
                <div class="col">
                    <input type="text" id="itemColor" name="itemColor" class="form-control">
                </div>
                <div class="col-auto">
                    <label for="itemMaterial" class="col-form-label">MATERIAL</label>
                </div>
                <div class="col">
                    <input type="text" id="itemMaterial" name="itemMaterial" class="form-control">
                </div>

                <div class="col-auto">
                    <label for="quantity" class="col-form-label">QUANTITY</label>
                </div>
                <div class="col">
                    <input type="text" id="quantity" v-model.number="quantity" name="quantity" class="form-control">
                </div>

                <div class="row padTop" id="secondRegion">
                    <div class="col-auto">
                        <label for="actual" class="col-form-label">ACTUAL</label>
                    </div>
                    <div class="col">
                        <input type="text" v-model.number="actual" id="actual" name="actual" class="form-control">
                    </div>
                    <div class="col-auto">
                        <label for="replacement" class="col-form-label">REPLACEMENT</label>
                    </div>
                    <div class="col">
                        <input type="replacement" v-model.number="replacement" id="replacement" name="replacement"
                            class="form-control">
                    </div>
                    <div class="col-auto">
                        <label for="retail" class="col-form-label">RETAIL</label>
                    </div>
                    <div class="col">
                        <input type="text" id="retail" v-model.number="retail" name="retail" class="form-control">
                    </div>
                    <div class="col-auto">
                        <label for="tag" class="col-form-label">TAG</label>
                    </div>
                    <div class="col">
                        <input type="text" id="tag" v-model.number="tag" name="tag" class="form-control">
                    </div>
                </div>

                <div class="row padTop" id="thirdRegion">
                    <div class="col-auto">
                        <label for="totalActual" class="col-form-label">TOTAL ACTUAL</label>
                    </div>
                    <div class="col">
                        <input type="text" :value=computeTotals(actual) id="totalActual" name="totalActual"
                            class="form-control">
                    </div>
                    <div class="col-auto">
                        <label for="totalReplacement" class="col-form-label">TOTAL REPLACEMENT</label>
                    </div>
                    <div class="col">
                        <input type="totalReplacement" :value=computeTotals(replacement) id="totalReplacement"
                            name="totalReplacement" class="form-control">
                    </div>
                    <div class="col-auto">
                        <label for="totalRetail" class="col-form-label">TOTAL RETAIL</label>
                    </div>
                    <div class="col">
                        <input type="text" id="totalRetail" :value=computeTotals(retail) name="totalRetail"
                            class="form-control">
                    </div>
                    <div class="col-auto">
                        <label for="totalTag" class="col-form-label">TOTAL TAG</label>
                    </div>
                    <div class="col">
                        <input type="text" id="totalTag" :value=computeTotals(tag) name="totalTag" class="form-control">
                    </div>
                </div>
            </div>

            <div class="row padTop" id="autoTable">
                <table class="table-bordered" id="maintab">
                    <thead id="craftingMatStyle">
                        <tr>
                            <th class="text-center" colspan="14">CRAFTING MATERIALS</th>
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
                            <th scope="col"><submit id="craftMatButton"
                                    v-on:click.stop.prevent="addRow">+</submit></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(tableRows, index) in tableRows" :key="index">
                            <td> <input type="text" class="form-control" :id="`noOfPcs-${index}`"
                                    v-model.number="craftnoofpcs[index]" :name="`noOfPcs-${index}`"></td>
                            <td> <input type="text" class="form-control" :id="`matl-${index}`" :name="`matl-${index}`">
                            </td>
                            <td> <input type="text" class="form-control" :id="`description-${index}`"
                                    :name="`description-${index}`">
                            </td>
                            <td> <input type="text" class="form-control" :id="`supInvDaCo-${index}`"
                                    :name="`supInvDaCo-${index}`">
                            </td>
                            <td> <input type="text" class="form-control" :id="`wt-${index}`" :name="`wt-${index}`"></td>
                            <td> <input type="text" class="form-control" :id="`unitCost-${index}`"
                                    @input="computePCost(index)" v-model.number="craftunitcost[index]"
                                    :name="`unitCost-${index}`"></td>
                            <td> <input type="text" class="form-control" :id="`rt-${index}`" :name="`rt-${index}`"></td>
                            <td> <input type="text" class="form-control" :ref="`totalP-${index}`"
                                    :id="`totalP-${index}`" v-model="craftpcost[index]" :data=computeCraftingMats(index)
                                    :name="`totalP-${index}`"></td>
                            <td> <input type="text" class="form-control" :id="`curRt-${index}`"
                                    :name="`curRt-${index}`"></td>
                            <td> <input type="text" class="form-control" :id="`totalRep-${index}`"
                                    v-model="craftrepcost[index]" :name="`totalRep-${index}`"></td>
                            <td> <input type="text" class="form-control" :id="`mu-${index}`"
                                    @input="computePCost(index)" :name="`mu-${index}`" v-model.number="craftmu[index]">
                            </td>
                            <td> <input type="text" class="form-control" :id="`cour-${index}`" :name="`cour-${index}`">
                            </td>
                            <td> <input type="text" class="form-control" :id="`sp-${index}`" v-model="craftsp[index]"
                                    :name="`sp-${index}`"></td>
                            <td>
                            <th> <a class="removeStyling" :id="`remButt-${index}`" :name="`remButt-${index}`"
                                    @click="removeRow(index)"> x </a> </th>
                            </td>
                        </tr>
                        <tr v-if="tableRows.length > 0" id="lastCraftRow">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td id="totalPCraft"><strong>TOTAL P COST: {{computeCraftCost(craftpcost)}} </strong></td>
                            <td></td>
                            <td id="totalRepCraft"><strong>TOTAL REP COST: {{computeCraftCost(craftrepcost)}}</strong>
                            </td>
                            <td></td>
                            <td></td>
                            <td id="totalSpCraft"><strong>FINAL SP: {{computeCraftCost(craftsp)}}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

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
                                <td><input type="text" v-model.number="goldName" id="goldName" name="goldName"
                                        class="form-control">
                                </td>
                                <td><input type="text" v-model.number="goldHrs" id="goldHrs" name="goldHrs"
                                        class="form-control"></td>
                                <td><input type="text" v-model.number="goldRate" @input="computeGoldSmith()"
                                        id="goldRate" name="goldRate" class="form-control"></td>
                                <td><input type="text" v-model="goldCost" id="goldCost" name="goldCost"
                                        class="form-control"></td>
                                <td><input type="text" v-model.number="goldMu" id="goldMu" name="goldMu"
                                        class="form-control"></td>
                                <td><input type="text" v-model.number="goldSp" id="goldSp" name="goldSp"
                                        class="form-control"></td>
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
                <td><input type="text" v-model.number="polishName" id="polishName" name="polishName"
                    class="form-control"></td>
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
                <td id="totalLaborCost"><strong>TOTAL LABOR COST: {{computeLaborCost()}}  </strong></td>
                </tr>
            </tbody>
                    </table>
                </div>
            </div>
            <hr>
            
           
        </form>
    </div>
</template>
    
<style scoped>
.greetings .green {
    color: blueviolet;
}

#secondRegion,
#autoTable {
    margin-top: 10px;
    margin-bottom: 10px;
}

#lastCraftRow {
    border-color: white;
}

#lastLaborRow {
    border-color: white;
}

#lastRowPad {
    margin-top: 10px;
}

.table-bordered #lastCraftRow #totalSpCraft {
    border: 2px #505050 solid;
    font-size: small
}

.table-bordered #lastCraftRow #totalRepCraft {
    border: 2px #505050 solid;
    font-size: small
}

.table-bordered #lastCraftRow #totalPCraft {
    border: 2px #505050 solid;
    font-size: small
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

label {
    font-weight: bold;
    padding: 0px;
}

#craftMatButton {
    cursor: pointer;
    font-size: 200%;
}

.removeStyling {
    cursor: pointer;
    font-size: 160%;
    text-decoration: none;
    color: black;
    padding-left: 2.5px;
}

#lastRegion {
    padding-top: 5%;
}
</style>
    