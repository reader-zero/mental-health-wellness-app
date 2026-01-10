<template>
  <nav class="navbar">
    <div class="logo">🧠 Wellness Companion</div>
    <div class="links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/breathing">Breathing</RouterLink>
      <RouterLink to="/wellness">Wellness</RouterLink>
      <RouterLink to="/ai-support">AI Support</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #f0fdf4; /* Light wellness green */
  border-bottom: 1px solid #dcfce7;
}
.links a {
  margin-left: 15px;
  text-decoration: none;
  color: #166534;
  font-weight: bold;
}
.router-link-active {
  color: #22c55e !important; /* Highlights the current page */
}
</style>