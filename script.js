// ==========================================
// 1. BACKGROUND MATRIX RAINFALL MODULE
// ==========================================
const matrixCanvas = document.getElementById('matrix-canvas');
if (matrixCanvas) {
  const mCtx = matrixCanvas.getContext('2d');
  let width = (matrixCanvas.width = window.innerWidth);
  let height = (matrixCanvas.height = window.innerHeight);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789XO";
  const fontSize = 14;
  const columns = width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  window.addEventListener('resize', () => {
    width = matrixCanvas.width = window.innerWidth;
    height = matrixCanvas.height = window.innerHeight;
  });

  function drawMatrix() {
    mCtx.fillStyle = 'rgba(5, 5, 11, 0.05)';
    mCtx.fillRect(0, 0, width, height);

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      mCtx.fillStyle = Math.random() < 0.5 ? '#00f0ff' : '#ff007f';
      mCtx.font = fontSize + 'px monospace';
      mCtx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 33);
}

// ==========================================
// 2. RETRO SYNTHESIZER AUDIO FX ENGINE
// ==========================================
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
  if (!audioCtx) audioCtx = new AudioCtx();
}

function playSound(type) {
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); 
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === 'click') {
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
      gain.gain.setValueAtTime(0.1, now); 
      gain.gain.linearRampToValueAtTime(0, now + 0.08);
      osc.start(now); osc.stop(now + 0.08);
    } else if (type === 'win') {
      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1); 
      osc.frequency.setValueAtTime(783.99, now + 0.2);
      osc.frequency.setValueAtTime(1046.50, now + 0.3); 
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.5); 
      osc.start(now); osc.stop(now + 0.5);
    } else if (type === 'lose') {
      osc.type = 'sawtooth'; 
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.4); 
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.45); 
      osc.start(now); osc.stop(now + 0.45);
    } else if (type === 'draw') {
      osc.type = 'square'; 
      osc.frequency.setValueAtTime(293.66, now);
      osc.frequency.setValueAtTime(293.66, now + 0.15); 
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.3); 
      osc.start(now); osc.stop(now + 0.3);
    } else if (type === 'alarm') {
      osc.type = 'sawtooth'; 
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(350, now + 0.15); 
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.2); 
      osc.start(now); osc.stop(now + 0.2);
    }
  } catch (e) {
    console.error(e);
  }
}

// ==========================================
// 3. GAMEDROP BOOT SPLASH LOADER ENGINE
// ==========================================
const bootScreen = document.getElementById('boot-splash-screen');
const progressFill = document.getElementById('boot-progress-fill');
const percentText = document.getElementById('boot-percentage');

if (bootScreen && progressFill && percentText) {
  let progressValue = 0;
  const bootInterval = setInterval(() => {
    progressValue += Math.floor(Math.random() * 6) + 2; 
    if (progressValue >= 100) {
      progressValue = 100; 
      clearInterval(bootInterval);
      setTimeout(() => { bootScreen.classList.add('hide'); }, 400);
    }
    progressFill.style.width = progressValue + '%';
    percentText.textContent = progressValue + '%';
  }, 40);
}

// ==========================================
// 4. HOOKS & NAVIGATION DOM ELEMENTS
// ==========================================
const homeScreen = document.getElementById('home-screen');
const loadingScreen = document.getElementById('loading-screen');
const gameScreen = document.getElementById('game-screen');
const startBtn = document.getElementById('start-game-btn');
const loadingText = document.getElementById('loading-text');
const backBtn = document.getElementById('back-btn');

const modeAiBtn = document.getElementById('mode-ai');
const modePvpBtn = document.getElementById('mode-pvp');
const diffEasyBtn = document.getElementById('diff-easy');
const diffMedBtn = document.getElementById('diff-medium');
const diffHardBtn = document.getElementById('diff-hard');
const diffGroup = document.getElementById('difficulty-group');

const mSingleBtn = document.getElementById('match-single');
const mBo3Btn = document.getElementById('match-bo3');
const mBo5Btn = document.getElementById('match-bo5');
const tourneyGoalEl = document.getElementById('tournament-goal');

const labelX = document.getElementById('label-x');
const labelO = document.getElementById('label-o');
const nameP1Input = document.getElementById('name-p1');
const nameP2Input = document.getElementById('name-p2');
const trophiesXContainer = document.getElementById('trophies-x');
const trophiesOContainer = document.getElementById('trophies-o');

const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const scoreXEl = document.getElementById('score-x');
const scoreOEl = document.getElementById('score-o');

const timerContainer = document.getElementById('timer-bar-container');
const timerBarFill = document.getElementById('timer-bar-fill');

// ==========================================
// 5. PARAMETERS CONFIGURATION SYSTEM
// ==========================================
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let currentPlayer = 'X'; 
let gameMode = 'ai'; 
let difficulty = 'hard';
let tournamentType = 'single'; 
let winThreshold = 1;
let scores = { X: 0, O: 0 };
let player1Name = "PLAYER 1";
let player2Name = "PLAYER 2";

let turnTimer = null;
let timeLeft = 100; 
const TURN_DURATION = 5000; 
let timerStartTimestamp = 0;

function checkWin(player) {
  // Safe matrix generation sequence string map
  const rawPatterns = "0,1,2|3,4,5|6,7,8|0,3,6|1,4,7|2,5,8|0,4,8|2,4,6";
  const winPatterns = rawPatterns.split('|').map(str => str.split(',').map(Number));
  
  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === player);
  });
}

// ==========================================
// 6. MENU SELECTION TRIGGERS
// ==========================================
if (modeAiBtn) {
  modeAiBtn.addEventListener('click', () => {
    playSound('click'); gameMode = 'ai';
    modeAiBtn.classList.add('active'); modePvpBtn.classList.remove('active');
    if(diffGroup) { diffGroup.style.opacity = '1'; diffGroup.style.pointerEvents = 'auto'; }
    if(nameP2Input) nameP2Input.classList.add('hide');
    if(nameP1Input) nameP1Input.placeholder = "PLAYER NAME";
  });
}

if (modePvpBtn) {
  modePvpBtn.addEventListener('click', () => {
    playSound('click'); gameMode = 'pvp';
    modePvpBtn.classList.add('active'); modeAiBtn.classList.remove('active');
    if(diffGroup) { diffGroup.style.opacity = '0.3'; diffGroup.style.pointerEvents = 'none'; }
    if(nameP2Input) nameP2Input.classList.remove('hide');
    if(nameP1Input) nameP1Input.placeholder = "PLAYER 1 NAME";
  });
}

function setLength(btn, type, threshold) {
  playSound('click'); 
  tournamentType = type; 
  winThreshold = threshold;
  const lengthButtons = [mSingleBtn, mBo3Btn, mBo5Btn];
  lengthButtons.forEach(b => {
    if (b) b.classList.remove('active');
  });
  if (btn) btn.classList.add('active');
}

if (mSingleBtn) mSingleBtn.addEventListener('click', () => setLength(mSingleBtn, 'single', 1));
if (mBo3Btn) mBo3Btn.addEventListener('click', () => setLength(mBo3Btn, 'bo3', 2));
if (mBo5Btn) mBo5Btn.addEventListener('click', () => setLength(mBo5Btn, 'bo5', 3));

function setDiff(btn, diff) {
  playSound('click');
  difficulty = diff;
  const diffButtons = [diffEasyBtn, diffMedBtn, diffHardBtn];
  diffButtons.forEach(b => {
    if (b) b.classList.remove('active');
  });
  if (btn) btn.classList.add('active');
}

if (diffEasyBtn) diffEasyBtn.addEventListener('click', () => setDiff(diffEasyBtn, 'easy'));
if (diffMedBtn) diffMedBtn.addEventListener('click', () => setDiff(diffMedBtn, 'medium'));
if (diffHardBtn) diffHardBtn.addEventListener('click', () => setDiff(diffHardBtn, 'hard'));

// ==========================================
// 7. TRANSITIONS & APPLICATION FLOW
// ==========================================
if (startBtn) {
  startBtn.addEventListener('click', () => {
    playSound('click');
    player1Name = nameP1Input?.value.trim() || "PLAYER 1";
    player2Name = gameMode === 'ai' ? "AI SYSTEM" : (nameP2Input?.value.trim() || "PLAYER 2");

    if (homeScreen) homeScreen.classList.add('hide');
    if (loadingScreen) loadingScreen.classList.remove('hide');

    const quotes = ["INITIALIZING QUANTUM GRID...", "BUILDING NEON MATRIX...", "STABILIZING CORE CHANNELS..."];
    let qIdx = 0;
    const txtInterval = setInterval(() => {
      if (loadingText) loadingText.textContent = quotes[++qIdx % quotes.length];
    }, 800);

    setTimeout(() => {
      clearInterval(txtInterval);
      if (loadingScreen) loadingScreen.classList.add('hide');
if (gameScreen) gameScreen.classList.remove('hide');
initTournament();
}, 2400);
});
}
if (backBtn) {
backBtn.addEventListener('click', () => {
playSound('click');
clearInterval(turnTimer);
if (gameScreen) gameScreen.classList.add('hide');
if (homeScreen) homeScreen.classList.remove('hide');
});
}
// ==========================================
// 8. COMBAT ENGINE & LOGIC INTERFACES
// ==========================================
function initTournament() {
scores.X = 0; scores.O = 0;
if (scoreXEl) scoreXEl.textContent = "0";
if (scoreOEl) scoreOEl.textContent = "0";
if (labelX) labelX.textContent = player1Name + " (X)";
if (labelO) labelO.textContent = player2Name + " (O)";
if (tourneyGoalEl) tourneyGoalEl.textContent = "FIRST TO " + winThreshold + " " + (winThreshold === 1 ? 'WIN' : 'WINS');
updateTrophyContainers();
resetMatch();
}
function resetMatch() {
board = ['', '', '', '', '', '', '', '', ''];
isGameActive = true;
currentPlayer = 'X';
if (statusEl) statusEl.textContent = player1Name + "'S TURN";
cells.forEach(cell => {
cell.textContent = '';
cell.style.color = '#fff';
cell.style.textShadow = 'none';
});
startTurnTimer();
}
function startTurnTimer() {
clearInterval(turnTimer);
timeLeft = 100;
timerStartTimestamp = Date.now();
turnTimer = setInterval(() => {
const elapsed = Date.now() - timerStartTimestamp;
timeLeft = Math.max(0, 100 - (elapsed / TURN_DURATION) * 100);
if (timerBarFill) timerBarFill.style.width = timeLeft + '%';
if (timeLeft <= 0) {
clearInterval(turnTimer);
playSound('alarm');
currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
if (statusEl) statusEl.textContent = (currentPlayer === 'X' ? player1Name : player2Name) + "'S TURN (TIMED OUT!)";
if (gameMode === 'ai' && currentPlayer === 'O') {
setTimeout(makeAiMove, 600);
} else {
startTurnTimer();
}
}
}, 33);
}
cells.forEach(cell => {
cell.addEventListener('click', (e) => {
if (!isGameActive || (gameMode === 'ai' && currentPlayer === 'O')) return;
const idx = parseInt(e.target.getAttribute('data-index'));
if (board[idx] !== '') return;
makeMove(idx);
});
});
function makeMove(idx) {
board[idx] = currentPlayer;
const cell = cells[idx];
cell.textContent = currentPlayer;
if (currentPlayer === 'X') {
cell.style.color = '#00f0ff';
cell.style.textShadow = '0 0 10px #00f0ff';
} else {
cell.style.color = '#ff007f';
cell.style.textShadow = '0 0 10px #ff007f';
}
playSound('click');
if (checkWin(currentPlayer)) {
clearInterval(turnTimer);
isGameActive = false;
scores[currentPlayer]++;
if (scoreXEl) scoreXEl.textContent = scores.X;
if (scoreOEl) scoreOEl.textContent = scores.O;
updateTrophyContainers();
if (scores[currentPlayer] >= winThreshold) {
if (statusEl) statusEl.textContent = (currentPlayer === 'X' ? player1Name : player2Name) + " WINS THE TOURNAMENT!";
playSound('win');
} else {
if (statusEl) statusEl.textContent = (currentPlayer === 'X' ? player1Name : player2Name) + " WINS THE MATCH!";
playSound('win');
}
return;
}
if (!board.includes('')) {
clearInterval(turnTimer);
isGameActive = false;
if (statusEl) statusEl.textContent = "IT'S A DRAW!";
playSound('draw');
return;
}
currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
if (statusEl) statusEl.textContent = (currentPlayer === 'X' ? player1Name : player2Name) + "'S TURN";
if (gameMode === 'ai' && currentPlayer === 'O') {
setTimeout(makeAiMove, 600);
} else {
startTurnTimer();
}
}
// ==========================================
// 9. AI LOGIC SELECTION MECHANISMS
// ==========================================
function makeAiMove() {
if (!isGameActive) return;
let moveIdx;
if (difficulty === 'easy') {
moveIdx = getRandomMove();
} else if (difficulty === 'medium') {
moveIdx = Math.random() < 0.5 ? getBestMove() : getRandomMove();
} else {
moveIdx = getBestMove();
}
if (moveIdx !== undefined && moveIdx !== null) {
makeMove(moveIdx);
}
}
function getRandomMove() {
let available = [];
for (let i = 0; i < 9; i++) {
if (board[i] === '') available.push(i);
}
return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : null;
}
function getBestMove() {
for (let i = 0; i < 9; i++) {
if (board[i] === '') {
board[i] = 'O';
if (checkWin('O')) { board[i] = ''; return i; }
board[i] = '';
}
}
for (let i = 0; i < 9; i++) {
if (board[i] === '') {
board[i] = 'X';
if (checkWin('X')) { board[i] = ''; return i; }
board[i] = '';
}
}
if (board[4] === '') return 4;
const cornerIndexes = "0,2,6,8".split(',').map(Number);
const availableCorners = [];
for (let i = 0; i < cornerIndexes.length; i++) {
if (board[cornerIndexes[i]] === '') {
availableCorners.push(cornerIndexes[i]);
}
}
if (availableCorners.length > 0) {
return availableCorners[Math.floor(Math.random() * availableCorners.length)];
}
return getRandomMove();
}
function updateTrophyContainers() {
if (trophiesXContainer) {
trophiesXContainer.innerHTML = '';
for (let i = 0; i < scores.X; i++) trophiesXContainer.innerHTML += '🏆 ';
}
if (trophiesOContainer) {
trophiesOContainer.innerHTML = '';
for (let i = 0; i < scores.O; i++) trophiesOContainer.innerHTML += '🏆 ';
}
}
if (resetBtn) resetBtn.addEventListener('click', () => { playSound('click'); resetMatch(); });
if (matrixCanvas) {
window.addEventListener('resize', () => {
matrixCanvas.width = window.innerWidth; matrixCanvas.height = window.innerHeight;
});
}