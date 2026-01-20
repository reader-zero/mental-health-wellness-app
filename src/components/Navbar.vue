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
// No logic needed for now
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #6a1b9a;          /* Deep purple main background */
  color: white;
  box-shadow: 0 4px 12px rgba(106, 27, 154, 0.3); /* Soft purple shadow */
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2.5rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #d1c4e9;               /* Light lavender on hover/active */
}

/* Underline effect on hover */
.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -6px;
  left: 0;
  background-color: #d1c4e9;
  transition: width 0.3s ease;
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 100%;
}
</style>