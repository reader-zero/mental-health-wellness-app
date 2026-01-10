<template>
  <div class="ai-container">
    <div class="chat-window">
      <div class="chat-header">
        <h3>AI Wellness Buddy</h3>
        <span class="status">● Online</span>
      </div>

      <div class="message-area">
        <div class="message ai">
          Hello! I'm here to listen. How are you feeling today?
        </div>
        <div class="message user">
          I've been feeling a bit stressed lately.
        </div>
      </div>

      <div class="input-area">
        <input type="text" placeholder="Type your message here..." />
        <button>Send</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: #f9fafb;
  min-height: 80vh;
}

.chat-window {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background: #166534;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  font-size: 0.8rem;
  color: #4ade80;
}

.message-area {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 300px;
}

.message {
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 80%;
}

.ai {
  background: #f3f4f6;
  align-self: flex-start;
}

.user {
  background: #dcfce7;
  color: #166534;
  align-self: flex-end;
}

.input-area {
  display: flex;
  padding: 1rem;
  border-top: 1px solid #eee;
  gap: 10px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  background: #166534;
  color: white;
  border: none;
  padding: 0 15px;
  border-radius: 8px;
  cursor: pointer;
}
</style>