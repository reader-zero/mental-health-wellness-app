<template>
  <div class="breathing-page">
    <h1>4-7-8 Breathing Exercise</h1>
    <p class="subtitle">
      Relax your mind and body with this simple technique.<br />
      Inhale for 4 seconds → Hold for 7 seconds → Exhale for 8 seconds
    </p>

    <div class="breathing-circle-container">
      <div class="breathing-circle" :class="currentPhase">
        <div class="timer">{{ timerDisplay }}</div>
        <div class="phase">{{ currentPhaseText }}</div>
      </div>
    </div>

    <div class="controls">
      <button 
        class="btn" 
        :disabled="isRunning" 
        @click="startBreathing"
      >
        Start
      </button>
      
      <button 
        class="btn btn-stop" 
        :disabled="!isRunning" 
        @click="stopBreathing"
      >
        Stop
      </button>

      <button 
        class="btn btn-reset" 
        @click="resetBreathing"
      >
        Reset
      </button>
    </div>

    <div class="instructions">
      <h3>How to do it:</h3>
      <ol>
        <li>Sit or lie down comfortably</li>
        <li>Place your tongue against the roof of your mouth</li>
        <li>Exhale completely through your mouth (making a whoosh sound)</li>
        <li>Follow the circle animation</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const phases = ['inhale', 'hold', 'exhale']
const durations = { inhale: 4, hold: 7, exhale: 8 } // seconds

const currentPhaseIndex = ref(0)
const secondsLeft = ref(durations.inhale)
const isRunning = ref(false)
const intervalId = ref(null)

const currentPhase = computed(() => phases[currentPhaseIndex.value])
const currentPhaseText = computed(() => {
  return currentPhase.value === 'inhale' ? 'Inhale' :
         currentPhase.value === 'hold'   ? 'Hold'   : 'Exhale'
})

const timerDisplay = computed(() => secondsLeft.value.toString().padStart(2, '0'))

function startBreathing() {
  if (isRunning.value) return
  isRunning.value = true
  secondsLeft.value = durations[phases[currentPhaseIndex.value]]
  
  intervalId.value = setInterval(() => {
    secondsLeft.value--
    
    if (secondsLeft.value < 0) {
      currentPhaseIndex.value = (currentPhaseIndex.value + 1) % phases.length
      secondsLeft.value = durations[phases[currentPhaseIndex.value]]
    }
  }, 1000)
}

function stopBreathing() {
  isRunning.value = false
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

function resetBreathing() {
  stopBreathing()
  currentPhaseIndex.value = 0
  secondsLeft.value = durations.inhale
}
</script>

<style scoped>
.breathing-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
  color: #333;
}

h1 {
  color: #4a6bff;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
}

.breathing-circle-container {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
}

.breathing-circle {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.inhale { background: #4caf50; transform: scale(1.15); }
.hold   { background: #ff9800; transform: scale(1.25); }
.exhale { background: #f44336; transform: scale(0.95); }

.timer {
  font-size: 4.5rem;
  margin-bottom: 0.5rem;
}

.phase {
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 2.5rem 0;
}

.btn {
  padding: 0.9rem 2.2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  background: #4a6bff;
  color: white;
  transition: all 0.25s;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(74,107,255,0.3);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-stop { background: #f44336; }
.btn-reset { background: #9e9e9e; }

.instructions {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 600px;
  margin: 2rem auto;
  text-align: left;
}

ol {
  padding-left: 1.5rem;
  line-height: 1.7;
}
</style>