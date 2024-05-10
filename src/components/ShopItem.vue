<template>
    <div class="shop-item" @click="addItemToInventory">
      <img :src="item.image" alt="" class="item-image"/>
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <p>Cena: {{ item.price }} zł</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      addItemToInventory() {
        this.$emit('add-item', this.item);
      }
    }
  };
  </script>
  
  <style scoped>
  .shop-item {
    cursor: pointer;
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px;
    transition: transform 0.2s;
    text-align: center;
  }
  .shop-item:hover {
    transform: translateY(-10px);
  }
  .item-image {
    max-height: 100px;
    margin-bottom: 10px;
  }
  </style>
  