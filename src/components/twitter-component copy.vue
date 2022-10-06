<script>

export default {
  name: "twitterComponent",
  data() {
    return {
      name: 'John',
    };
  },
  methods: {

  },
  mounted() {

  },
};

</script>

<template>
<div class="greetings"> {{name}}</div>
</template>

<style>
.greetings .green {
  color: black;
}
</style>
