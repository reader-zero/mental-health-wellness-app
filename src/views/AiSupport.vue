<<script setup>
import { ref } from 'vue'
import { getAiMessage } from '../services/aiService'

// 1. Reactive variables to hold data
const userMood = ref("") // What the user types
const aiResponse = ref("Hi there. Take a deep breath. How are you feeling in this moment?")
const isLoading = ref(false)

// 2. The function to handle the click
const handleSend = async () => {
  if (!userMood.value) return // Don't send empty messages

  isLoading.value = true
  
  // Call the service we created in Activity 4
  const message = await getAiMessage("Give a supportive message for: " + userMood.value)
  
  aiResponse.value = message
  userMood.value = "" // Clear the input box
  isLoading.value = false
}
</script>

<template>
  <div class="wellness-bg">
    <div class="glass-card">
      <div class="chat-header">
        <div class="bot-info">
          <div class="avatar">🌿</div>
          <div>
            <h3>Constellation Kim</h3>
            <p class="status">Always here for you</p>
          </div>
        </div>
      </div>

      <div class="chat-body">
        <div class="date-chip">Today</div>
        
        <div class="msg bot">
          <p v-if="isLoading">Thinking...</p>
          <p v-else>{{ aiResponse }}</p>
        </div>
      </div>

      <div class="chat-footer">
        <input 
          v-model="userMood" 
          type="text" 
          placeholder="Share your thoughts..." 
          @keyup.enter="handleSend"
        />
        <button class="send-btn" @click="handleSend" :disabled="isLoading">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Gradient Background representing a sunset/calm sky */
.wellness-bg {
  min-height: 90vh;
  background: linear-gradient(135deg, #f3f4f1 0%, #e0e7ff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* Glassmorphism Card */
.glass-card {
  width: 100%;
  max-width: 450px;
  height: 600px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 25px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.bot-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar {
  font-size: 24px;
  background: white;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

h3 { margin: 0; font-weight: 600; color: #2d3436; }
.status { margin: 0; font-size: 12px; color: #00b894; }

.chat-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.date-chip {
  text-align: center;
  font-size: 11px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.msg {
  padding: 12px 18px;
  border-radius: 20px;
  font-size: 14px;
  line-height: 1.5;
  max-width: 85%;
}

.bot {
  background: white;
  color: #444;
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}

.user {
  background: #2d3436;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}

.chat-footer {
  padding: 20px;
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  background: rgba(255,255,255,0.8);
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  outline: none;
  transition: 0.3s;
}

input:focus { background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

.send-btn {
  background: #2d3436;
  color: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.send-btn:hover { transform: scale(1.05); }
</style>