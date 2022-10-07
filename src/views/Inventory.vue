<script>
import axios from 'axios'


export default {
  name: 'inventoryList',
  data() {
    return {
        quote: ""
    }
  },
  computed: {
  },
  methods: {
  },
  components: {

  },
  mounted() {
    axios.get('http://localhost:3000/hey')
            .then(response => {
                this.quote = response
             })
  }
}


</script>


<template>
    <h1>Inventory List</h1>
    <div class="Inventory">
        <div v-if="quote"> {{quote.data}} </div>
        <!--<a :href="`/inventory/${randomId}`">Link to single view page</a>-->
    </div>
</template>

