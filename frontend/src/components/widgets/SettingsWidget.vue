<template>
    <div class="settings-container">
        <h1>Allow new users?</h1>
        <label for="newUsersToggleSwitch" class="newUsersToggle-label">
            <input
                type="checkbox"
                id="newUsersToggleSwitch"
                v-model="isCheckedNewUsers"
                @change="newUsersToggleSwitch"
                class="newUsersToggle-input"
            />
        <span :class="{ 'toggle-active': isCheckedNewUsers }">Yes</span>
        <span :class="{ 'toggle-inactive': !isCheckedNewUsers }">No</span>
      </label>
      <h1>Allow users to create widgets?</h1>
      <label for="userWidgetsToggleSwitch" class="userWidgetsToggle-label">
            <input
            type="checkbox"
            id="userWidgetsToggleSwitch"
            v-model="isCheckedUserWidgets"
            @change="userWidgetsToggleSwitch"
            class="userWidgetsToggle-input"
            />
        <span :class="{ 'toggle-active': isCheckedUserWidgets }">Yes</span>
        <span :class="{ 'toggle-inactive': !isCheckedUserWidgets }">No</span>
      </label>
      <h1>Change color theme?</h1>
      <div class="color-theme-palette">
        <button class="color-button" v-for="(color, index) in colorThemes" :key="index" @click="changeColorTheme(color)">
            <div class="color-circle" :style="{ backgroundColor: color }"></div>
        </button>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isCheckedNewUsers: true,
        isCheckedUserWidgets: false,
        colorThemes: ["#FFFFFF", "#373636", "#FEE6A8", "#A8C0FC", "#FEA7C6", "#05B89E", "#A637CD"],
      };
    },
    methods: {
      newUsersToggleSwitch() {
        console.log('Switch newUsersToggled. Current state:', this.isCheckedNewUsers);
      },
      userWidgetsToggleSwitch() {
        console.log('Switch userWidgetsToggled. Current state:', this.isCheckedUserWidgets);
      },
      changeColorTheme(color) {
        console.log('Change color theme to:', color);
      },
    },
  };
  </script>
  
<style>

  .settings-container {
    width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  h1 {
    font-weight:400;
    font-size: 18px;
  }

  .newUsersToggle-label,
  .userWidgetsToggle-label {
    width: 150px;
    height: 30.5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1.5px solid #000000;
    border-radius: 5px;
  }
  
  .newUsersToggle-input,
  .userWidgetsToggle-input {
    display: none;
  }
  
  span {
    flex: 1;
    text-align: center;
    padding: 5.5px;
    transition: background-color 0.3s;
    border-radius: 3px;
  }
  
  .toggle-active {
    background-color: #087B69;
    color: white;
  }
  
  .toggle-inactive {
    background-color: #5b5b5b;
    color: white;
  }

  .color-theme-palette {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .color-button {
    background: none;
    border: none;
    cursor: pointer;
    margin: 0 5px;
  }

  .color-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: #000000 solid 1px;
  }

  .color-button:hover .color-circle {
    border: #ff0000 solid 1px;
  }

</style>
  