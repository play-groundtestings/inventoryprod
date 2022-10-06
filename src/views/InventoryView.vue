<script setup>
import { useRoute } from 'vue-router'
import {computed} from 'vue'

const route = useRoute()
const inventoryId = computed(() => route.params.inventoryId)
let randomId = Math.round(Math.random(100)*100)

</script>




<template>
  <main>
    <div class="about">
      <h1> Welcome agent {{inventoryId}} </h1>
      <a :href="`/inventory/${randomId}`">Link to single view page</a>
    </div>
  </main>
</template>
