<template>
  <nav class="navbar">
    <div class="logo">Mental Health Companion</div>
    <ul class="nav-links">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/breathing">Breathing</router-link></li>
      <li><router-link to="/wellness">Wellness</router-link></li>
      <li><router-link to="/ai-support">AI Support</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
// No script needed for now
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #4a6bff;
  color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #ffd700;
}
</style>