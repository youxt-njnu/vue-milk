
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
let isScrolled = ref(false)

let handleScroll = () => {
  isScrolled.value = window.scrollY > 5
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div :class="{'common-layout': true, 'scrolled': isScrolled }">
    <v-row class="navbar"
           align="center"
           align-content="center"
           justify="center"
           no-gutters>
      <v-col cols="2"
             class="d-flex h-70 justify-end"><a href="#"
           class="logo"
           :class="isScrolled?'scrolled-logo':'' "></a></v-col>
      <v-col cols="8"
             class="text-center">
        <v-row no-gutters
               align-content="center"
               justify="center">
          <v-col cols="3"
                 class="text-center"
                 lg="2"><router-link class="text-decoration-none text-white font-weight-bold"
                         to="/">主页
            </router-link></v-col>
          <v-col cols="3"
                 class="text-center"
                 lg="2"><router-link class="text-decoration-none text-white font-weight-bold"
                         to="/spatial-distribution">时空现状</router-link></v-col>
          <v-col cols="3"
                 class="text-center"
                 lg="2"><router-link class="text-decoration-none text-white font-weight-bold"
                         to="/dashboard">发展历程</router-link></v-col>
          <v-col cols="3"
                 class="text-center"
                 lg="2"><router-link class="text-decoration-none text-white font-weight-bold"
                         to="/dashboard/about">About</router-link></v-col>
        </v-row>
      </v-col>
      <v-col cols="2"><v-icon icon="menu"
                size="large"></v-icon></v-col>
    </v-row>
  </div>
</template>

<style scoped>
.logo {
  display: block;
  background-image: url(/milk-light.svg);
  opacity: 1;
  transition: opacity ease-in-out 0.2s;
  width: 112.5px;
  height: 55.5px;
  background-size: 112.5px 55.5px;
}
.logo:hover {
  opacity: 0.6;
}

@keyframes slideInFromLeft {
  from {
    clip-path: polygon(0 0, 0% 0, 0% 100%, 0 100%);
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

.common-layout {
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  height: 75px;
  z-index: 1000;
}

.navbar {
  position: fixed;
  width: 60%; /* 确保导航栏覆盖整个屏幕宽度 */
  top: 0;
  left: 20%;
  right: 20%;
  z-index: 1001; /* 高 z-index 保证导航栏在内容之上 */
  height: 78px; /* Adjust the height of the navbar */
  animation: slideInFromLeft 0.5s ease-in forwards;
}
.common-layout:after {
  content: '';
  width: 70%;
  height: 20px;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  background-image: url('../assets/img/linetop-head.png');
  background-position: center left;
  background-repeat: no-repeat;
  background-size: cover;
}

.scrolled {
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.scrolled-logo {
  background-image: url(/milk.svg);
}
</style>


