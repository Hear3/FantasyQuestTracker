<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <br>
    <h1>Buy Items form the Merchant</h1>
    <br>
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
</script>
<script>
let userEmail = ''
export default {
  created() {
    this.getUserData()
    const userdata = this.getUserData()
    userdata.then((email) => {
      userEmail = email
    })
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
    async getUserData() {
      const store = useStore()
      const docSnap = await getDoc(doc(db, 'users', store.state.userEmail))
      const data = docSnap.data()
      return data.email
    },
    async getPlayerItems() {
      const docSnap = await getDoc(doc(db, 'users', userEmail))
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
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  color: #5B92E5;
  margin-bottom: 20px;
}

.shop {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  padding: 20px;
}

.shop-item {
  background-color: #ffffff;
  border: 2px solid #ddd;
  border-radius: 8px;
  width: 200px;
  padding: 15px;
  margin: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
}

.shop-item .item-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 8px;
}

.shop-item .item-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
}

.shop-item .item-description {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  margin-bottom: 12px;
  height: 40px;
  overflow: hidden;
}

.shop-item .item-price {
  font-size: 16px;
  color: #28A745;
  font-weight: bold;
}

.shop-item .item-button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  text-transform: uppercase;
  width: 100%;
  margin-top: 10px;
}

.shop-item .item-button:hover {
  background-color: #0056b3;
}

.inventory {
  background-color: #ffffff;
  border: 2px solid #e7e7e7;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  width: calc(100% - 40px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inventory-item {
  background-color: #f9f9f9;
  border-bottom: 2px solid #f0f0f0;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
}

.inventory-item-name {
  font-size: 16px;
  color: #333;
}

.inventory-item-count {
  font-size: 16px;
  color: #007BFF;
  font-weight: bold;
}
</style>
