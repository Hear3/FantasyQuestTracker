<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="my-character-view">
    <Character />
    <div class="item-list">
      <br />
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
  margin-top: 5px;
}

.item-list {
  margin-top: 2px;
  display: flex;
  flex-direction: column;
}

button {
  margin-bottom: 3px;
}
</style>
