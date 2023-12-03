<template>
  <router-view :key="$route.fullPath"/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
#app {
    box-sizing: border-box;
    margin: 0;
    background-color: white;
    font-family: 'Inter', sans-serif;
}
</style>
