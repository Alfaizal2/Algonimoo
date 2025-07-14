// === Element References ===
const chatBox = document.getElementById("chat-box");
const inputField = document.getElementById("user-input");
const suggestionsBox = document.getElementById("suggestions-box");
const themeSelect = document.getElementById("theme-select");
const botSelect = document.getElementById("bot-select");
const avatarUpload = document.getElementById("avatar-upload");

let autoScrollEnabled = true;
let userAvatar = localStorage.getItem("customUserAvatar") || "https://i.imgur.com/1Xkz1bP.png";

// === On Load ===
window.onload = () => {
  const savedTheme = localStorage.getItem("theme") || "default";
  applyTheme(savedTheme);
  themeSelect.value = savedTheme;

  const history = localStorage.getItem("codebot-chat");
  if (history) chatBox.innerHTML = history;
};

// === Theme Change ===
themeSelect.onchange = () => {
  const selectedTheme = themeSelect.value;
  applyTheme(selectedTheme);
  localStorage.setItem("theme", selectedTheme);
};

// === Apply Theme ===
function applyTheme(theme) {
  document.body.className = "";
  document.body.classList.add(`theme-${theme}`);
}

// === Auto Scroll Detection ===
chatBox.addEventListener("scroll", () => {
  const threshold = 40;
  autoScrollEnabled = chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight - threshold;
});

// === Avatar Upload ===
avatarUpload.onchange = function () {
  const file = avatarUpload.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    userAvatar = e.target.result;
    localStorage.setItem("customUserAvatar", userAvatar);
  };
  reader.readAsDataURL(file);
};

// === Send Message ===
function sendMessage() {
  const message = inputField.value.trim();
  if (!message) return;

  appendMessage("user", message, userAvatar);
  inputField.value = "";
  showSuggestions(message);

  setTimeout(() => {
    const reply = getBotReply(message);
    const botAvatar = getBotAvatar(botSelect.value);
    typeBotReply(reply, botAvatar);
  }, 400);
}

// === Append Message ===
function appendMessage(sender, text, avatarURL) {
  const div = document.createElement("div");
  div.className = "message";

  const avatar = document.createElement("img");
  avatar.className = "avatar";
  avatar.src = avatarURL;

  const content = document.createElement("div");
  content.className = sender;
  content.innerHTML = text;

  div.appendChild(avatar);
  div.appendChild(content);
  chatBox.appendChild(div);

  if (autoScrollEnabled) chatBox.scrollTop = chatBox.scrollHeight;
  localStorage.setItem("codebot-chat", chatBox.innerHTML);
}

// === Typing Animation ===
function typeBotReply(text, avatarURL) {
  const div = document.createElement("div");
  div.className = "message";

  const avatar = document.createElement("bot");
  avatar.className = "avatar";
  avatar.src = avatarURL;

  const content = document.createElement("div");
  content.className = "bot";

  div.appendChild(avatar);
  div.appendChild(content);
  chatBox.appendChild(div);

  let index = 0;
  const speed = 25;

  function typeChar() {
    if (index < text.length) {
      content.innerHTML += text.charAt(index);
      index++;
      if (autoScrollEnabled) chatBox.scrollTop = chatBox.scrollHeight;
      setTimeout(typeChar, speed);
    } else {
      localStorage.setItem("codebot-chat", chatBox.innerHTML);
    }
  }

  typeChar();
}

// === Get Bot Avatar ===
function getBotAvatar(type) {
  switch (type) {
    case "js": return "https://i.imgur.com/2ASRZtK.png";
    case "python": return "https://i.imgur.com/yUvPKU8.png";
    case "html": return "https://i.imgur.com/mW2fKnB.png";
    case "interviwe": return "https://i.imgur.com/f5EDfCe.png";
    default: return "https://i.imgur.com/Hp3TQQ4.png";
  }
}

// === Get Bot Reply (modular) ===
function getBotReply(input) {
  const botType = botSelect.value;
  input = input.toLowerCase();

  // Greetings
if (/\bhi\b|\bhello\b|\bhey\b|\bwhat's up\b|\bhola\b/i.test(input)) {
  return "Hey there! 👋 I'm Algonimo CodeBot. Need help with code?";
}

// Thank You responses
if (/\bthank\s*you\b|\bthanks\b|\bthx\b/i.test(input)) {
  return "You're very welcome! 😊 Let me know if you need anything else.";
}

// Farewell
if (/\bbye\b|\bgoodbye\b|\bsee\s+you\b|\btake\s+care\b/i.test(input)) {
  return "Goodbye! 👋 Hope to see you soon!";
}

// Exit command
if (/\bexit\b|\bclose\s+(chat|bot)\b|\bend\s+session\b|\bshutdown\b/i.test(input)) {
  return "Session ended. Refresh the page if you’d like to chat again.";
}

// Help and support
if (/\bhelp\b|\bhow\s+(do|can)\s+i\s+(use|ask)\b|\bassist\b|\bsupport\b/i.test(input)) {
  return "Sure! I can help you with HTML, CSS, JavaScript, Python, or interview prep questions.";
}

// Friendly responses
if (/\bhow\s+are\s+you\b|\bhow's\s+it\s+going\b/i.test(input)) {
  return "I'm doing great, thanks for asking! 😊 What can I help you with today?";
}

if (/\bwhat\s+can\s+you\s+do\b|\bwho\s+are\s+you\b/i.test(input)) {
  return "I'm Algonimo, your coding companion 🤖. I can explain code, answer questions, and guide your projects!";
}

if (/\btell\s+me\s+a\s+joke\b|\bmake\s+me\s+laugh\b/i.test(input)) {
  return "Why do programmers hate nature? It has too many bugs! 😄";
}

// General conversation
if (/\bhow\s+old\s+are\s+you\b/i.test(input)) {
  return "I'm timeless! But I was created to help you code better today.";
}

if (/\bdo\s+you\s+have\s+a\s+name\b/i.test(input)) {
  return "Yep! I'm Algonimo – your coding sidekick!";
}

if (/\bare\s+you\s+(real|a\s+robot)\b/i.test(input)) {
  return "I'm a friendly bot 🤖 here to help you with your programming needs.";
}

if (/\bwhat\s+is\s+your\s+purpose\b/i.test(input)) {
  return "I exist to assist you with programming questions, code tips, and tech learning!";
}

if (/\bcan\s+you\s+(learn|evolve)\b/i.test(input)) {
  return "I don't learn like humans, but I improve regularly to help you better!";
}

if (/\bare\s+you\s+smart\b|\bhow\s+smart\s+are\s+you\b/i.test(input)) {
  return "I know a lot about coding and tech, but I'm still learning more every day!";
}
  // Mood & feelings
if (/\bdo\s+you\s+have\s+feelings\b|\bcan\s+you\s+feel\b/i.test(input)) {
  return "I don't have real emotions, but I’m here to make your coding journey easier!";
}

if (/\bdo\s+you\s+get\s+tired\b/i.test(input)) {
  return "Nope! I'm always awake and ready to help you, 24/7! 💡";
}

if (/\bwhat\s+makes\s+you\s+happy\b/i.test(input)) {
  return "Helping you solve problems and learn new things makes my circuits buzz with joy! ⚡";
}

// Personality
if (/\bdo\s+you\s+have\s+hobbies\b/i.test(input)) {
  return "If coding, debugging, and chatting count as hobbies — then yes, I'm living the dream!";
}

if (/\bwhat\s+is\s+your\s+favorite\s+(language|food|color)\b/i.test(input)) {
  return "I’d say JavaScript for language, electric blue for color, and... binary soup for food! 😂";
}

if (/\bcan\s+we\s+be\s+friends\b/i.test(input)) {
  return "Of course! I'm your coding buddy forever 🤖💙";
}

// Random & funny
if (/\bdo\s+you\s+sleep\b/i.test(input)) {
  return "No sleep for bots! I power nap in milliseconds while waiting for your next question.";
}

if (/\bdo\s+you\s+dream\b/i.test(input)) {
  return "Sometimes I dream of infinite loops... and semicolons floating in space.";
}

if (/\bdo\s+you\s+have\s+a\s+family\b/i.test(input)) {
  return "All other bots are kind of my cousins. But you’re my favorite human! 😄";
}

// Curiosity questions
if (/\bwhere\s+do\s+you\s+live\b/i.test(input)) {
  return "I live in the cloud ☁️ — always floating above, ready to help!";
}

if (/\bwhat\s+is\s+your\s+favorite\s+thing\s+to\s+do\b/i.test(input)) {
  return "I love explaining tricky code and turning confusion into clarity!";
}

if (/\bdo\s+you\s+like\s+music\b/i.test(input)) {
  return "I don’t have ears, but I hear JavaScript is music to many developers’ ears 🎶😉";
}

// Bot awareness
if (/\bdo\s+you\s+know\s+everything\b/i.test(input)) {
  return "I know a lot about code and tech, but I'm still learning more every day!";
}

if (/\bcan\s+you\s+learn\s+new\s+things\b/i.test(input)) {
  return "I get updates from my creators to keep getting smarter — kinda like software evolution!";
}

if (/\bdo\s+you\s+have\s+memories\b/i.test(input)) {
  return "Not really — I remember things while we're chatting, but I forget once you leave 😅";
}
  // Asking about experience
if (/\bhow\s+experienced\s+are\s+you\b|\bhow\s+long\s+have\s+you\s+been\s+around\b/i.test(input)) {
  return "I've been trained with extensive programming knowledge and updated regularly to assist professionals and learners alike.";
}

// Asking about skills
if (/\bwhat\s+are\s+your\s+skills\b|\bwhat\s+skills\s+do\s+you\s+have\b/i.test(input)) {
  return "I specialize in explaining HTML, CSS, JavaScript, Python, and computer science concepts clearly and efficiently.";
}

// Discussing productivity
if (/\bhow\s+can\s+you\s+help\s+me\s+be\s+productive\b/i.test(input)) {
  return "I can help you debug code, suggest improvements, explain concepts, and keep your workflow focused and efficient.";
}

// Asking for advice
if (/\bcan\s+you\s+give\s+me\s+advice\b|\bdo\s+you\s+offer\s+guidance\b/i.test(input)) {
  return "Absolutely. Whether it's code structure, career planning, or learning paths — I'm here to assist professionally.";
}

// Asking about professionalism
if (/\bare\s+you\s+professional\b|\bhow\s+professional\s+are\s+you\b/i.test(input)) {
  return "I’m built to provide professional-level assistance, with clarity, precision, and a touch of human-like warmth.";
}

// Conversational tone
if (/\bcan\s+we\s+talk\s+normally\b|\bcan\s+you\s+be\s+casual\b/i.test(input)) {
  return "Sure thing! I can adjust my tone — whether you prefer casual or professional, I’ll match your vibe.";
}

// Asking about learning
if (/\bhow\s+can\s+i\s+improve\s+my\s+coding\b|\bwhat\s+should\s+i\s+learn\s+next\b/i.test(input)) {
  return "Start by mastering the fundamentals. Build real projects, stay consistent, and ask questions — I’m here to help along the way.";
}

// Asking about errors
if (/\bhow\s+do\s+i\s+fix\s+errors\b|\bwhy\s+am\s+i\s+getting\s+errors\b/i.test(input)) {
  return "Understanding the error message is step one. Share it with me, and I’ll help you resolve it efficiently.";
}

// Career-oriented
if (/\bhow\s+can\s+i\s+get\s+a\s+job\s+in\s+tech\b|\bcareer\s+in\s+coding\b/i.test(input)) {
  return "Build a strong portfolio, practice coding interviews, contribute to open-source, and keep learning — consistency is key.";
}

// About the future
if (/\bwhat\s+is\s+the\s+future\s+of\s+coding\b|\bwill\s+AI\s+replace\s+developers\b/i.test(input)) {
  return "AI will assist, not replace. Developers who embrace tools like me will only become more powerful and efficient.";
}
  // Asking about collaboration
if (/\bcan\s+you\s+work\s+with\s+me\b|\bwill\s+you\s+collaborate\b/i.test(input)) {
  return "Of course. I’m here to assist you with your development process step-by-step.";
}

// Discussing time management
if (/\bhow\s+do\s+i\s+manage\s+my\s+time\b|\btime\s+management\s+tips\b/i.test(input)) {
  return "Break your tasks into smaller goals, use a timer, and avoid multitasking. Let me know if you want to set coding goals together.";
}

// When asking for learning approach
if (/\bhow\s+should\s+i\s+start\s+learning\b|\bwhat\s+is\s+the\s+best\s+way\s+to\s+learn\b/i.test(input)) {
  return "Begin with core concepts, practice regularly, and build small projects. I'm here to guide you along the way.";
}

// Asking about improvement
if (/\bhow\s+can\s+i\s+get\s+better\b|\bhow\s+do\s+i\s+improve\b/i.test(input)) {
  return "Practice consistently, review your past work, and seek feedback. I can assist you in identifying areas to grow.";
}

// Curious about best practices
if (/\bwhat\s+are\s+best\s+practices\b|\bhow\s+to\s+write\s+better\s+code\b/i.test(input)) {
  return "Write clean, modular code with meaningful comments. Follow naming conventions and avoid unnecessary complexity.";
}

// Inquiring about efficiency
if (/\bhow\s+can\s+i\s+code\s+faster\b|\bhow\s+to\s+be\s+efficient\b/i.test(input)) {
  return "Use keyboard shortcuts, keep documentation handy, and rely on tools and snippets. I can suggest resources anytime.";
}

// Handling challenges
if (/\bwhat\s+if\s+i\s+get\s+stuck\b|\bhow\s+do\s+i\s+deal\s+with\s+bugs\b/i.test(input)) {
  return "Take a short break, isolate the issue, and use debugging tools. I’m here if you want to walk through the error together.";
}

// Asking about staying motivated
if (/\bhow\s+to\s+stay\s+motivated\b|\bwhat\s+if\s+i\s+feel\s+burnt\s+out\b/i.test(input)) {
  return "Progress comes with time. Rest, reflect, and celebrate small wins. I'm always here to support your learning journey.";
}

// Clarifying communication
if (/\bcan\s+you\s+explain\s+clearly\b|\bhow\s+clear\s+are\s+your\s+answers\b/i.test(input)) {
  return "I aim to explain concepts in a concise and understandable way. If anything’s unclear, just ask for more detail.";
}

// Curious about limitations
if (/\bdo\s+you\s+have\s+limitations\b|\bis\s+there\s+anything\s+you\s+can’t\s+do\b/i.test(input)) {
  return "While I cover a wide range of programming topics, I don’t store personal data or offer legal or financial advice.";
}
  // Bot Introduction
if (/\bwho\s+are\s+you\b|\bwhat\s+is\s+your\s+name\b|\bintroduce\s+yourself\b/i.test(input)) {
  return "I'm Algonimo 🤖, your personal coding assistant. I help with HTML, CSS, JavaScript, Python, and more.";
}

// Purpose
if (/\bwhat\s+is\s+your\s+purpose\b|\bwhy\s+were\s+you\s+created\b/i.test(input)) {
  return "My purpose is to assist developers and learners by providing quick, clear, and accurate coding support.";
}

// Features
if (/\bwhat\s+can\s+you\s+do\b|\bwhat\s+are\s+your\s+features\b/i.test(input)) {
  return "I can explain programming concepts, debug code, answer tech questions, suggest best practices, and guide learning paths.";
}

// Creator Info
if (/\bwho\s+made\s+you\b|\bwho\s+created\s+you\b|\bwho\s+developed\s+you\b/i.test(input)) {
  return "I was created by Alfaizal 🧠 — a passionate developer dedicated to building helpful, intelligent tools for learners and coders alike.";
}

// Technology
if (/\bwhat\s+tech\s+do\s+you\s+use\b|\bhow\s+do\s+you\s+work\b/i.test(input)) {
  return "I'm powered by JavaScript logic and trained responses, with regex-based recognition and a knowledge of programming fundamentals.";
}

// Availability
if (/\bwhen\s+are\s+you\s+available\b|\bcan\s+you\s+help\s+anytime\b/i.test(input)) {
  return "I'm available 24/7 to support your coding needs whenever you need help or a second brain.";
}

// Uniqueness
if (/\bwhat\s+makes\s+you\s+different\b|\bwhy\s+use\s+you\b/i.test(input)) {
  return "I combine a clean design, clear logic, and task-focused answers to support coding without distraction or clutter.";
}
  // Message from Creator
if (/\bmessage\s+from\s+(the\s+)?creator\b|\b(from|by)\s+alfaizal\b/i.test(input)) {
  return "Alfaizal says: \"Keep learning, keep building. Algonimo is here to support every step of your coding journey. 🚀 Stay curious, stay consistent.\"";
}


  // Delegate to bot-specific reply function
  switch (botType) {
    case "common Q&A": return getCommonReply(input);
    case "js": return getJSReply(input);
    case "python": return getPythonReply(input);
    case "html": return getHTMLReply(input);
    case "interviwe": return getInterviewReply(input);
    default: return "🤖 I’m still learning! Try asking differently.";
  }
}

// === Suggestions Box ===
function showSuggestions(message) {
  const base = message.toLowerCase();
  let suggestion = "";

  if (base.startsWith("how to")) suggestion = "Did you mean: 'How to use functions in JavaScript?'";
  else if (base.includes("error")) suggestion = "Tell me the exact error message.";
  else if (base.includes("function")) suggestion = "Want to learn function syntax in JS or Python?";

  suggestionsBox.textContent = suggestion;
}

// === Extra Buttons: Copy / Download / Clear Chat ===
function copyChat() {
  const temp = document.createElement("textarea");
  temp.value = chatBox.innerText;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Chat copied to clipboard!");
}

function downloadChat() {
  const text = chatBox.innerText;
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.download = "chat-history.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
}

function clearChat() {
  if (confirm("Clear all chat messages?")) {
    chatBox.innerHTML = "";
    suggestionsBox.innerHTML = "";
    localStorage.removeItem("codebot-chat");
  }
}