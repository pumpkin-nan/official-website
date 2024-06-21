<script setup>
import {ref}  from 'vue'
import HeadMenu from './views/headMenu.vue'
import Footer from './views/footer.vue'

</script>

<template>
  <!-- <div class="wrapper"> -->
    <HeadMenu></HeadMenu>
    <router-view></router-view>
    <Footer></Footer>
  <!-- </div> -->
</template>

<!-- <style scoped>
.wrapper{
  max-width: 760px;
  width: 100%;
  height: 100%;
  background: pink;
}
</style> -->
