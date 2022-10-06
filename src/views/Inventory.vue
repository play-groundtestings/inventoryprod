<script setup>

let randomId = Math.round(Math.random(100)*100)

</script>


<template>

    <div class="Inventory">
        List all inventory items
        <a :href="`/inventory/${randomId}`">Link to single view page</a>
    </div>

</template>

