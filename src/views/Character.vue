<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="my-character-view">
    <h1>Character Inventory</h1>
    <div class="character-container">
      <img src="@/assets/characters/model.png" alt="Character Model" class="character-model" />
      <img
        v-if="items.shield.visible"
        src="@/assets/items/shield.png"
        alt="Pants"
        class="item shield"
      />
      <img
        v-if="items.sword.visible"
        src="@/assets/items/sword.png"
        alt="Sword"
        class="item sword"
      />
      <img
        v-if="items.helmet.visible"
        src="@/assets/items/helmet.png"
        alt="Helmet"
        class="item helmet"
      />
    </div>
    <div class="item-list">
      <div v-for="(item, key) in items" :key="key">
        <button @click="toggleItem(key)">{{ item.visible ? 'Remove' : 'Equip' }} {{ key }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const items = reactive({
  shield: { visible: false },
  sword: { visible: false },
  helmet: { visible: false }
})

function toggleItem(itemKey) {
  items[itemKey].visible = !items[itemKey].visible
}
</script>

<style scoped>
.my-character-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.character-container {
  position: relative;
  width: 300px; /* Adjust based on actual size */
  height: 500px; /* Adjust based on actual size */
}

.character-model,
.item {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.item.shield {
  position: absolute;
  top: 45%;
  left: 10%;
  scale: 50%;
  transform: translate(-50%, -50%);
}

.item.sword {
  position: absolute;
  top: 18%;
  left: 56%;
  scale: 50%;
  transform: translate(-50%, 0);
}

.item.helmet {
  position: absolute;
  top: 1%;
  left: 23%;
  scale: 45%;
  transform: translate(-50%, 0);
}

.icon {
  width: 50px;
  height: auto;
}

.item-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
</style>
