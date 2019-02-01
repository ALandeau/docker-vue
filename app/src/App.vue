<template>
  <div>
  <Activity></Activity>
  </div>
</template>

<script>
  import Activity from "./components/Activity";
  export default {
    components: {Activity},
    created(){
      this.$store.dispatch('initStore');
    }
  }

</script>