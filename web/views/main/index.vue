<template>
  <div>
    <div>54666666666</div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {};
  },
  
  async mounted() {
    console.log(111)
    let res = await this.$post('/sys/cmd', 'ipconfig');
    console.log(res)
  },
};
</script>
