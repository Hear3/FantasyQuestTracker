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

<script>
import ShopItem from '@/components/ShopItem.vue'
import Inventory from '@/components/Inventory.vue'
import db from '@/main.js'
import { doc, getDoc, collection, getDocs, updateDoc, arrayUnion } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
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
      const auth = getAuth()
      const userEmail = auth.currentUser.email
      const docRef = doc(db, 'users', userEmail)
      const docSnap = await getDoc(docRef)
      let playerItems = docSnap.data()
      console.log(playerItems)
      return playerItems
    },
    async getShopItems() {
      const docsSnap = await getDocs(collection(db, 'items'))
      const playerItems = await this.getPlayerItems()

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
      const auth = getAuth()
      const userEmail = auth.currentUser.email
      const updateRef = doc(db, 'users', userEmail)
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
