<template>
    <div>
      <h1>This is the history of your journey</h1>
  
      <h2> Your Story:</h2>
      <ul>
        <li v-for="(quest, index) in quests" :key="index">
          {{ quest.name }} - {{ quest.date }}
        </li>
      </ul>
  
      <div class="footer">
        Footer content
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'QuestHistory',
    data() {
      return {

        quests: [
          { name: 'Sample Quest 1', date: '2024-01-01' },
          { name: 'Sample Quest 2', date: '2024-01-02' },
          { name: 'Sample Quest 3', date: '2024-01-03' }
        ]
      };
    }
  }
  </script>
  
  <style scoped>

h1 {
  color: #5b92e5;
  text-align: center;
  margin-bottom: 16px;
}
  .footer {
    width: 100%;
    background-color: rgb(132, 134, 134);
    padding: 2px;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    background-color: #f3f3f3;
    margin: 8px 0;
    padding: 8px;
    border-radius: 4px;
  }

  
  </style>
  