<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="inventory">
    <h2>Ekwipunek:</h2>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }} - {{ item.price }} Coins</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.inventory {
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 20px;
}
.inventory ul {
  list-style-type: none;
  padding: 0;
}
.inventory li {
  padding: 8px;
  margin: 5px;
  background-color: #f9f9f9;
}
</style>
