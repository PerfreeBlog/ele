<template>
  <router-view></router-view>
</template>
<script setup>

import {menuListApi} from "../api/system.js";

function initMenu() {
  menuListApi().then(res => {
    console.log(res)
  })
}

initMenu();
</script>
<style scoped>

</style>
