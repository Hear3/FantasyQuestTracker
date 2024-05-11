<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="character-container">
    <img src="@/assets/characters/model.png" alt="Character Model" class="character-model" />
    <img
      v-if="items.shield.visible"
      src="@/assets/items/shield.png"
      alt="Shield"
      class="item shield"
    />
    <img v-if="items.sword.visible" src="@/assets/items/sword.png" alt="Sword" class="item sword" />
    <img
      v-if="items.helmet.visible"
      src="@/assets/items/helmet.png"
      alt="Helmet"
      class="item helmet"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const items = computed(() => store.state.items)
</script>

<style scoped>
.character-container {
  position: relative;
  width: 300px;
  height: 500px;
}

.character-model,
.item {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.item.shield,
.item.sword,
.item.helmet {
  position: absolute;
  scale: 50%;
  transform: translate(-50%, -50%);
}

.item.shield {
  top: 45%;
  left: 10%;
}
.item.sword {
  top: 35%;
  left: 56%;
}
.item.helmet {
  top: 16%;
  left: 25%;
}
</style>
