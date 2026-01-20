<template>
  <Navbar />
  <router-view />
  <!-- Optional: add Footer later if you want -->
  <!-- <Footer /> -->
</template>

<script setup>
import Navbar from './components/Navbar.vue'
// import Footer from './components/Footer.vue' // Uncomment if you create Footer.vue later
</script>

<style>
/* Optional global styles (you can add more here if needed) */
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
}
</style>