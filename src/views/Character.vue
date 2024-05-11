<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="my-character-view">
    <h1>Character Inventory</h1>
    <Character />
    <div class="item-list">
      <div v-for="(item, key) in items" :key="key">
        <button @click="toggleItem(key)">{{ item.visible ? 'Remove' : 'Equip' }} {{ key }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Character from '@/components/Character.vue'

const store = useStore()
const items = computed(() => store.state.items)

function toggleItem(itemKey) {
  store.dispatch('toggleItem', itemKey)
}

onMounted(() => {
  store.dispatch('loadItems')
})
</script>

<style scoped>
.my-character-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.item-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
</style>
