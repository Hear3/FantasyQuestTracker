<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h1>Witamy w sklepie z magicznymi przedmiotami!</h1>
    <div class="shop">
      <ShopItem v-for="item in shopItems" :key="item.id" :item="item" @add-item="handleAddItem" />
    </div>
    <Inventory :items="inventoryItems" />
  </div>
</template>
<script setup>
import ShopItem from '@/components/ShopItem.vue'
import Inventory from '@/components/Inventory.vue'
import db from '@/main.js'
import { doc, getDoc, collection, getDocs, updateDoc, arrayUnion } from 'firebase/firestore'
import { useStore } from 'vuex'
import { ref } from 'vue'
</script>
<script>
export default {
  created() {
    this.getPlayerItems()
    this.getShopItems()
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Shop',
  components: {
    ShopItem,
    Inventory
  },
  data() {
    return {
      shopItems: [],
      inventoryItems: []
    }
  },
  methods: {
    async getPlayerItems() {
      const store = useStore()
      const userEmail = ref(null)
      userEmail.value = store.state.userEmail
      const docSnap = await getDoc(doc(db, 'users', userEmail.value))
      return docSnap.data()
    },
    async getShopItems() {
      const playerItems = await this.getPlayerItems()
      const docsSnap = await getDocs(collection(db, 'items'))
      docsSnap.forEach((doc) => {
        const itemData = doc.data()
        if (!playerItems.items.includes(itemData.id)) {
          this.shopItems.push(itemData)
        } else {
          this.inventoryItems.push(itemData)
        }
      })
    },
    async handleAddItem(item) {
      const store = useStore()
      const userEmail = ref(null)
      userEmail.value = store.state.userEmail
      const updateRef = doc(db, 'users', userEmail.value)
      await updateDoc(updateRef, {
        items: arrayUnion(item.id)
      })
      window.location.reload()
    }
  }
}
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
