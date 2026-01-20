<script setup>
import { ref, nextTick } from 'vue'
import { getAiMessage } from '../services/aiService'
// Import the fallback directly for the "Offline Mode" challenge
import { fallbackMessages } from '../services/fallbackMessages'

// --- State Management ---
const userTypedMessage = ref("")
const isLoading = ref(false)
const chatContainer = ref(null)

// CHALLENGE TASK: Online/Offline Toggle State
const isOnlineMode = ref(true)

// CHALLENGE TASK: Message History List
const messages = ref([
  { 
    id: 1, 
    text: "Hi! I'm Constellation Kim. I can work online with AI or offline with local tips. How are you feeling?", 
    sender: 'bot' 
  }
])

// Auto-scroll logic
const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const handleSendMessage = async () => {
  // CHALLENGE TASK: Validation (Empty check)
  if (!userTypedMessage.value.trim() || isLoading.value) return

  const userText = userTypedMessage.value
  
  // 1. Add User message to history
  messages.value.push({ id: Date.now(), text: userText, sender: 'user' })
  userTypedMessage.value = ""
  isLoading.value = true
  scrollToBottom()

  let response;
  
  // CHALLENGE TASK: Online AI / Offline Mode Switch Logic
  if (isOnlineMode.value) {
    // 🌐 ONLINE MODE: Calls Groq API
    response = await getAiMessage(userText)
  } else {
    // 📴 OFFLINE MODE: Uses local fallbackMessages.js
    await new Promise(res => setTimeout(res, 800)); // Simulates thinking
    response = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
  }

  // 2. Add AI Response to history
  messages.value.push({ id: Date.now() + 1, text: response, sender: 'bot' })
  isLoading.value = false
  scrollToBottom()
}
</script>

<template>
  <div class="wellness-bg">
    <div class="glass-card">
      
      <div class="chat-header">
        <div class="header-top">
          <div class="bot-info">
            <div class="avatar-glow">🌿</div>
            <div>
              <h3>Constellation Kim</h3>
              <p class="status-text">{{ isLoading ? 'Thinking...' : 'Online' }}</p>
            </div>
          </div>
          
          <div class="mode-toggle">
            <span class="mode-label">{{ isOnlineMode ? 'Online AI' : 'Offline' }}</span>
            <label class="switch">
              <input type="checkbox" v-model="isOnlineMode">
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="chat-body" ref="chatContainer">
        <div v-for="msg in messages" :key="msg.id" :class="['msg-container', msg.sender]">
          <div class="bubble">
            <p>{{ msg.text }}</p>
          </div>
        </div>
        
        <div v-if="isLoading" class="msg-container bot">
          <div class="bubble typing">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      <div class="chat-footer">
        <div class="input-pill">
          <input 
            v-model="userTypedMessage" 
            @keyup.enter="handleSendMessage" 
            placeholder="Describe how you feel..." 
          />
          <button @click="handleSendMessage" class="send-btn" :disabled="isLoading">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* AESTHETIC BACKGROUND */
.wellness-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, sans-serif;
}

/* GLASSMORPHISM CARD */
.glass-card {
  width: 100%;
  max-width: 400px;
  height: 650px;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 35px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

/* HEADER STYLING */
.chat-header { padding: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.05); }
.header-top { display: flex; justify-content: space-between; align-items: center; }
.bot-info { display: flex; align-items: center; gap: 12px; }
.avatar-glow { background: white; padding: 10px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); font-size: 20px; }
h3 { margin: 0; font-size: 1rem; color: #2d3436; }
.status-text { font-size: 11px; color: #636e72; margin: 0; }

/* TOGGLE SWITCH CSS */
.mode-toggle { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.mode-label { font-size: 9px; text-transform: uppercase; font-weight: bold; color: #636e72; }
.switch { position: relative; display: inline-block; width: 34px; height: 18px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 34px; }
.slider:before { position: absolute; content: ""; height: 12px; width: 12px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
input:checked + .slider { background-color: #00b894; }
input:checked + .slider:before { transform: translateX(16px); }

/* CHAT AREA & BUBBLES */
.chat-body { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
.msg-container { display: flex; width: 100%; }
.bot { justify-content: flex-start; }
.user { justify-content: flex-end; }
.bubble { padding: 12px 16px; border-radius: 18px; font-size: 14px; max-width: 80%; line-height: 1.4; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
.bot .bubble { background: white; color: #2d3436; border-bottom-left-radius: 4px; }
.user .bubble { background: #2d3436; color: white; border-bottom-right-radius: 4px; }

/* INPUT PILL */
.chat-footer { padding: 20px; }
.input-pill { background: white; display: flex; padding: 6px 6px 6px 15px; border-radius: 25px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
input { flex: 1; border: none; outline: none; font-size: 14px; background: transparent; }
.send-btn { background: #2d3436; color: white; border: none; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
.send-btn:hover { transform: scale(1.05); }

/* TYPING ANIMATION */
.typing span { height: 6px; width: 6px; background: #b2bec3; display: inline-block; border-radius: 50%; margin-right: 3px; animation: bounce 1.3s infinite; }
.typing span:nth-child(2) { animation-delay: 0.15s; }
.typing span:nth-child(3) { animation-delay: 0.3s; }
@keyframes bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-4px); } }
</style>