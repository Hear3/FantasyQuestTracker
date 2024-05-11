<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  props: {
    item: Object
  }
}
</script>

<template>
  <div class="quest-item">
    <h3>{{ item.quest_name }}</h3>
    <p>Description: {{ item.desc }}</p>
    <p>Difficulty: {{ item.difficulty }}</p>
    <p>XP: {{ item.reward_xp }}</p>
    <p>Gold: {{ item.reward_gold }}</p>
    <p>Time to complete: {{ item.time_to_comlete }}</p>
  </div>
</template>
<style>
.quest-item {
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
</style>
