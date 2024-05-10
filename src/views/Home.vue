<template>
  <div>
    <h1>Witamy w sklepie z magicznymi przedmiotami!</h1>
    <div class="shop">
      <ShopItem
        v-for="item in shopItems"
        :key="item.id"
        :item="item"
        @add-item="handleAddItem"
      />
    </div>
    <Inventory :items="inventoryItems" />
  </div>
</template>

<script>
import ShopItem from '@/components/ShopItem.vue';
import Inventory from '@/components/Inventory.vue';

export default {
  name: 'Home',
  components: {
    ShopItem,
    Inventory
  },
  data() {
    return {
      shopItems: [
        { id: 1, name: 'Siedmio-milowe buty',description: 'Tylko dla najwytralszych biegaczy', price: 150, type: 'magic' },
        { id: 2, name: 'Trzecie oko', description: 'Nagroda za wytrwałą praktyke', price: 200, type: 'rare' },
        { id: 3, name: 'Róg Obfitości', description: 'Zawsze warto być nawodnionym', price: 100, type: 'magic' },
        { id: 4, name: 'Kamienna poduszka', description: 'Tylko mistrzowie są w stanie się na niej wyspać', price: 200, type: 'rare' },
       
      ],
      inventoryItems: []
    };
  },
  methods: {
    handleAddItem(item) {
  // Sprawdza, czy przedmiot już istnieje w ekwipunku na podstawie `name`
  const itemExists = this.inventoryItems.some(existingItem => existingItem.name === item.name);
  if (!itemExists) {
    this.inventoryItems.push(item);
    console.log('Aktualny ekwipunek:', this.inventoryItems);
  } else {
    console.log('Przedmiot już istnieje w ekwipunku:', item.name);
  }
}
  }
};
</script>

<style>
#app {
  text-align: center;
}
.shop {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>