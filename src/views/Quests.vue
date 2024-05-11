<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Hej</h1>
  <div>
    <h1>Add Quest</h1>
    <form @submit.prevent="addQuest">
      <label for="quest-name">Quest Name:</label>
      <input type="text" id="quest-name" v-model="quest_name" />

      <label for="difficulty">Difficulty:</label>
      <select id="difficulty" v-model="difficulty">
        <option value="easy">Easy</option>
        <option value="normal">Normal</option>
        <option value="hard">Hard</option>
        <option value="legendary">Legendary</option>
      </select>

      <label for="reward-exp">Reward (Experience Points):</label>
      <input type="number" id="reward-exp" v-model="reward_xp" />

      <label for="reward-gold">Reward (Gold Coins):</label>
      <input type="number" id="reward-gold" v-model="reward_gold" />

      <label for="time-to-complete">Time to Complete:</label>
      <input type="text" id="time-to-complete" v-model="time_to_complete" />

      <label for="description">Description:</label>
      <textarea id="description" v-model="description"></textarea>

      <button id="sendButton" type="submit">Add Quest</button>
    </form>
  </div>
</template>
<script></script>
