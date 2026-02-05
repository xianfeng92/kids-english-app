import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- 图标组件 (SVG Paths, 零依赖) ---
const Icon = ({ path, size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} height={size} viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    {path}
  </svg>
);

const Icons = {
  Play: <polygon points="5 3 19 12 5 21 5 3" />,
  Speaker: <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></>,
  RotateCcw: <><path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></>,
  Check: <polyline points="20 6 9 17 4 12" />,
  X: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  Trash: <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
  Star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  Box: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></>,
  Home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
  Sparkles: <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />,
  Close: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  Award: <><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></>,
  Settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  Brain: <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />,
  ToggleLeft: <><rect width="20" height="12" x="2" y="6" rx="6" ry="6" /><circle cx="8" cy="12" r="2" /></>,
  ToggleRight: <><rect width="20" height="12" x="2" y="6" rx="6" ry="6" /><circle cx="16" cy="12" r="2" /></>,
  Image: <><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>
};

// --- 配置常量 ---
const MASTER_INTERVALS = [0, 1, 3, 7, 14, 30]; 
const SHORT_RETRY_MINUTES = 10;
const MAX_TODAY_ATTEMPTS = 3;
const DAILY_TARGET = 8;
const FEEDBACK_DURATION = 1200; // ms

// --- 文案池 ---
const MESSAGES = {
  easy: ["You’re great!", "Nice job!", "Awesome!", "High five! ✋", "You did it!", "Super star! ⭐", "Great! You know '{text}'!"],
  hard: ["Good try! Let’s try again.", "Almost! You’re getting closer.", "No worries — practice makes progress.", "That was a brave try!", "Let’s listen once more 👂", "We can do it together!"],
  streak2: "Two in a row! 🎉",
  streak3: "Amazing streak! 🔥",
  streak5: "Legendary! 👑",
  comeback: ["Look! You improved! 💪", "Great comeback!"],
  dailyLimit: "We’ll try again tomorrow. You worked hard today! 🌙"
};

// --- 贴纸库 (模拟) ---
const STICKER_POOL = ['🦁', '🚀', '🌈', '🦄', '🦖', '🍭', '🎨', '⚽', '🎸', '🍦', '🐼', '🤖'];

// --- 模拟数据 ---
const ITEMS_DB = [
  { id: 'w1', type: 'word', text: 'Apple', zh: '苹果', topic: 'fruits', image: '🍎' },
  { id: 'w2', type: 'word', text: 'Banana', zh: '香蕉', topic: 'fruits', image: '🍌' },
  { id: 'w3', type: 'word', text: 'Cat', zh: '猫', topic: 'animals', image: '🐱' },
  { id: 'w4', type: 'word', text: 'Dog', zh: '狗', topic: 'animals', image: '🐶' },
  { id: 's1', type: 'sentence', text: 'Hello world', zh: '你好世界', topic: 'greetings', image: '👋' },
  { id: 'w5', type: 'word', text: 'Red', zh: '红色', topic: 'colors', image: '🔴' },
  { id: 'w6', type: 'word', text: 'Blue', zh: '蓝色', topic: 'colors', image: '🔵' },
  { id: 'w7', type: 'word', text: 'Green', zh: '绿色', topic: 'colors', image: '🟢' },
  { id: 'w8', type: 'word', text: 'Mom', zh: '妈妈', topic: 'family', image: '👩' },
  { id: 'w9', type: 'word', text: 'Dad', zh: '爸爸', topic: 'family', image: '👨' },
  { id: 'w10', type: 'word', text: 'Book', zh: '书', topic: 'school', image: '📚' },
  { id: 'w11', type: 'word', text: 'Pen', zh: '钢笔', topic: 'school', image: '🖊️' },
  { id: 'w12', type: 'word', text: 'Sun', zh: '太阳', topic: 'nature', image: '☀️' },
  { id: 'w13', type: 'word', text: 'Moon', zh: '月亮', topic: 'nature', image: '🌙' },
  { id: 'w14', type: 'word', text: 'Water', zh: '水', topic: 'nature', image: '💧' },
  { id: 's2', type: 'sentence', text: 'Good morning', zh: '早上好', topic: 'greetings', image: '🌅' },
  { id: 'w15', type: 'word', text: 'Bird', zh: '鸟', topic: 'animals', image: '🐦' },
  { id: 'w16', type: 'word', text: 'Fish', zh: '鱼', topic: 'animals', image: '🐟' },
  { id: 'w17', type: 'word', text: 'Car', zh: '汽车', topic: 'transport', image: '🚗' },
  { id: 'w18', type: 'word', text: 'Bus', zh: '公交车', topic: 'transport', image: '🚌' },
];

// --- 助手函数 ---

const getRandomMessage = (type, item) => {
  const pool = MESSAGES[type] || MESSAGES.easy;
  if (typeof pool === 'string') return pool;
  const rawMsg = pool[Math.floor(Math.random() * pool.length)];
  return rawMsg.replace('{text}', item.text).replace('{word}', item.text);
};

// Removed getApiKey function to fix build error in preview environment
// For local development, uncomment the line below in callGemini and generateImage:
// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const callGemini = async (prompt) => {
  const apiKey = ""; // Set to empty string for preview environment
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "AI 正在思考中...";
  } catch (error) {
    return "网络开小差了，请稍后再试！";
  }
};

const generateImage = async (prompt) => {
  const apiKey = ""; // Set to empty string for preview environment
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: `Cartoon style illustration for children, colorful and cute. Scene includes: ${prompt}` }],
          parameters: { sampleCount: 1 }
        })
      }
    );
    const data = await response.json();
    if (data.predictions && data.predictions[0]) {
      return `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
    }
    throw new Error("No image data");
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};

const calculateNextProgress = (currentProgress, result, now) => {
  const p = currentProgress || {
    mastery: 0, streak: 0, lapses: 0, lastSeenAt: null, dueAt: null, 
    lastResult: null, todayAttempts: 0, lastAttemptDate: null 
  };
  const isSameDay = p.lastAttemptDate && new Date(p.lastAttemptDate).toDateString() === now.toDateString();
  let todayAttempts = isSameDay ? p.todayAttempts + 1 : 1;
  let newMastery = p.mastery;
  let newStreak = p.streak;
  let newLapses = p.lapses;
  let newDueAt = null;

  if (result === 'easy') {
    newStreak += 1;
    if (newStreak >= 2) newMastery = Math.min(5, newMastery + 1);
    const daysToAdd = MASTER_INTERVALS[newMastery];
    const nextDate = new Date(now);
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    newDueAt = nextDate.getTime();
  } else { 
    newStreak = 0;
    newLapses += 1;
    newMastery = Math.max(0, newMastery - 1); 
    if (todayAttempts < MAX_TODAY_ATTEMPTS) {
      newDueAt = now.getTime() + SHORT_RETRY_MINUTES * 60 * 1000;
    } else {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0); 
      newDueAt = tomorrow.getTime();
    }
  }

  return {
    mastery: newMastery, streak: newStreak, lapses: newLapses, lastSeenAt: now.getTime(),
    dueAt: newDueAt, lastResult: result, todayAttempts, lastAttemptDate: now.getTime()
  };
};

// --- Custom Hook: useSpeech ---
const useSpeech = (voiceOn = true) => {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    
    loadVoices();
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = (text) => {
    if (!voiceOn) return;
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // 设置为英式英语 (优先匹配 en-GB)
    utterance.lang = 'en-GB';
    const gbVoice = voices.find(v => v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('British'));
    if (gbVoice) {
      utterance.voice = gbVoice;
    }

    utterance.rate = 0.9;
    utterance.pitch = 1.1; 

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return { speak, stop, speaking };
};

// --- Sub Components ---

const Mascot = ({ speaking, className = "" }) => {
  const [blinking, setBlinking] = useState(false);
  
  useEffect(() => {
    const blinkLoop = setInterval(() => {
      if (!speaking && Math.random() > 0.7) {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 200);
      }
    }, 3000);
    return () => clearInterval(blinkLoop);
  }, [speaking]);

  return (
    <div className={`relative w-32 h-32 ${className}`}>
      {/* 3D-ish Cartoon Robot/Monster */}
      <div className={`w-full h-full animate-[bounce_3s_infinite] ${speaking ? 'animate-[pulse_0.5s_infinite]' : ''}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path d="M100 40 L100 20" stroke="#9CA3AF" strokeWidth="4" />
          <circle cx="100" cy="20" r="6" fill="#EF4444" className={speaking ? "animate-ping" : ""} />
          <rect x="40" y="40" width="120" height="110" rx="40" fill="url(#bodyGrad)" stroke="#2563EB" strokeWidth="4" />
          <rect x="60" y="70" width="80" height="40" rx="15" fill="#1F2937" opacity="0.9" />
          <g transform="translate(0, 5)">
             {blinking ? (
               <>
               <line x1="75" y1="90" x2="85" y2="90" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />
               <line x1="115" y1="90" x2="125" y2="90" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />
               </>
             ) : (
               <>
               <circle cx="80" cy="90" r="6" fill="#34D399" filter="url(#glow)" />
               <circle cx="120" cy="90" r="6" fill="#34D399" filter="url(#glow)" />
               </>
             )}
          </g>
          <g transform="translate(100, 125)">
             {speaking ? (
                <path fill="#FFFFFF" d="M-15 0 Q0 15 15 0 Q0 -5 -15 0 Z">
                   <animate attributeName="d" values="M-15 0 Q0 5 15 0 Q0 -2 -15 0 Z; M-15 0 Q0 20 15 0 Q0 -5 -15 0 Z; M-15 0 Q0 5 15 0 Q0 -2 -15 0 Z" dur="0.2s" repeatCount="indefinite" />
                </path>
             ) : (
                <path d="M-10 0 Q 0 8 10 0" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
             )}
          </g>
          <circle cx="55" cy="110" r="6" fill="#FCA5A5" opacity="0.6" />
          <circle cx="145" cy="110" r="6" fill="#FCA5A5" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
};

const FeedbackOverlay = ({ feedback }) => {
  if (!feedback) return null;
  const { type, message, deltaStars } = feedback;
  const isEasy = type === 'easy';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] animate-in fade-in duration-200"></div>
      <div className={`relative bg-white rounded-3xl p-8 shadow-2xl max-w-xs w-full mx-6 text-center transform transition-all animate-in zoom-in-95 duration-300 border-4 ${isEasy ? 'border-green-100' : 'border-orange-100'}`}>
        <div className="text-6xl mb-4 animate-bounce">{isEasy ? (deltaStars > 1 ? '🌟' : '🎉') : '🛡️'}</div>
        <h3 className={`text-2xl font-black mb-2 ${isEasy ? 'text-green-600' : 'text-orange-500'}`}>{message}</h3>
        {deltaStars > 0 && (
          <div className="mt-2 inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold text-sm animate-pulse">
            <span>+{deltaStars}</span> <Icon path={Icons.Star} size={16} className="fill-current"/>
          </div>
        )}
      </div>
    </div>
  );
};

const LessonView = ({ item, progress, progressPercent, onResult, onBack, feedback, settings }) => {
  const [showAi, setShowAi] = useState(false);
  const [aiContent, setAiContent] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const { speak, speaking, stop } = useSpeech(settings.voiceOn);

  useEffect(() => {
      setShowAi(false);
      setAiContent("");
      setAiLoading(false);
      stop(); 
  }, [item]);

  const handleAskAi = async () => {
    setShowAi(true);
    if (aiContent) return;
    setAiLoading(true);
    // Updated prompt: Explicitly forbid Pinyin
    const prompt = `You are a fun English teacher for kids. Tell me a fun fact about the word "${item.text}" (in the context of ${item.topic}) and make a very simple, funny sentence using it. Keep the language simple for a 6-year-old. Provide the response in this format: "Did you know? [Fun Fact in Chinese]. \n\n✨ [English Sentence] \n( [Chinese Translation] )". Do not use Pinyin.`;
    const result = await callGemini(prompt);
    setAiContent(result);
    setAiLoading(false);
  };

  const handleListen = () => {
    // 纯净播报，不加 listen
    speak(item.text);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full font-sans relative">
      <FeedbackOverlay feedback={feedback} />
      
      {showAi && (
         <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowAi(false)}>
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-yellow-200 relative" onClick={e => e.stopPropagation()}>
               <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white p-3 rounded-full shadow-lg"><Icon path={Icons.Sparkles} size={32} /></div>
               <button onClick={() => setShowAi(false)} className="absolute top-2 right-2 text-gray-300 p-2"><Icon path={Icons.Close} /></button>
               <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                     <h3 className="font-bold text-xl text-yellow-500">魔法百科</h3>
                     {!aiLoading && aiContent && (
                       <button onClick={(e) => {e.stopPropagation(); speak(aiContent);}} className="bg-yellow-100 text-yellow-600 p-2 rounded-full hover:bg-yellow-200 active:scale-95 transition-all"><Icon path={Icons.Speaker} size={20} /></button>
                     )}
                  </div>
                  {aiLoading ? (
                      <div className="flex flex-col items-center gap-3 py-8"><div className="w-8 h-8 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div><p className="text-gray-400 text-sm">正在施展魔法...</p></div>
                  ) : (
                      <div className="text-left bg-yellow-50 p-4 rounded-2xl text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">{aiContent}</div>
                  )}
               </div>
            </div>
         </div>
      )}

      <div className="px-6 py-4 bg-white flex items-center gap-4 shadow-sm z-10 w-full">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600"><Icon path={Icons.Home} /></button>
        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden max-w-3xl mx-auto"><div className="h-full bg-green-400 transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }} /></div>
        <div className="w-6"></div> 
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center items-center w-full relative">
        <div className="z-10 -mb-8 transform hover:scale-105 transition-transform duration-300">
           <Mascot speaking={speaking} />
        </div>

        <div className="w-full max-w-md md:max-w-2xl bg-white rounded-[2rem] shadow-xl p-8 pt-12 flex flex-col items-center justify-center gap-6 min-h-[400px] md:min-h-[500px] relative border border-gray-100 transition-all duration-300">
           <div className="absolute top-6 right-6 flex items-center gap-1 text-xs font-bold text-gray-300 bg-gray-50 px-2 py-1 rounded-full"><span>Lv.{progress.mastery}</span></div>
           <span className="bg-blue-50 text-blue-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{item.topic}</span>
           <div className="text-[6rem] md:text-[8rem] leading-none animate-bounce-slow filter drop-shadow-lg transition-all duration-300">{item.image}</div>
           
           <div className="text-center space-y-4 w-full">
             <div className="flex items-center justify-center gap-3">
               <h1 className="text-4xl md:text-5xl font-black text-gray-800 transition-all duration-300">{item.text}</h1>
             </div>
             
             <div className="flex justify-center gap-4 mt-2">
                <button 
                  onClick={handleListen} 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Icon path={Icons.Speaker} className="animate-pulse" />
                  Listen
                </button>
                <button onClick={handleAskAi} className="bg-yellow-100 text-yellow-600 p-3 rounded-full hover:bg-yellow-200 active:scale-95 transition-all shadow-sm">
                  <Icon path={Icons.Sparkles} size={24} />
                </button>
             </div>
             <p className="text-2xl md:text-3xl text-gray-500 font-medium transition-all duration-300">{item.zh}</p>
           </div>
        </div>
      </div>

      <div className="w-full bg-white p-6 pb-8 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex justify-center">
        <div className="w-full max-w-md md:max-w-2xl grid grid-cols-2 gap-4">
           <button 
             onClick={() => {
                onResult(item.id, 'hard');
                speak(`Good try! Let’s listen again: ${item.text}`);
             }} 
             className="flex flex-col items-center justify-center bg-orange-50 hover:bg-orange-100 text-orange-600 py-4 md:py-6 rounded-2xl border-2 border-orange-100 active:scale-95 transition-all"
           >
             <Icon path={Icons.X} size={32} />
             <span className="font-bold mt-1">我不太会</span>
           </button>
           
           <button 
             onClick={() => {
                onResult(item.id, 'easy');
                speak(`Nice job! You said ${item.text}!`);
             }} 
             className="flex flex-col items-center justify-center bg-green-500 hover:bg-green-600 text-white py-4 md:py-6 rounded-2xl shadow-lg shadow-green-200 active:scale-95 transition-all"
           >
             <Icon path={Icons.Check} size={32} />
             <span className="font-bold mt-1">我会了</span>
           </button>
        </div>
      </div>
    </div>
  );
};

const ParentView = ({ progressMap, onBack, settings, setSettings }) => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const stats = useMemo(() => {
    let weakWords = [];
    let masteredCount = 0;
    Object.keys(progressMap).forEach(id => {
       const p = progressMap[id];
       if (p.mastery >= 4) masteredCount++;
       if (p.mastery < 3 && p.lapses > 0) {
         const item = ITEMS_DB.find(i => i.id === id);
         if (item) weakWords.push(item.text);
       }
    });
    return { weakWords, masteredCount };
  }, [progressMap]);

  const handleGenAdvice = async () => {
    if (advice) return;
    setLoading(true);
    const weakList = stats.weakWords.length > 0 ? stats.weakWords.slice(0, 5).join(', ') : "None (Great job!)";
    const prompt = `Analyze the following child's English learning progress.
    - Weak Words (struggling with): ${weakList}
    - Total Mastered Words: ${stats.masteredCount}
    
    Please act as a professional and encouraging educational consultant. Provide a short report for the parent in Chinese.
    1. Briefly summarize the progress (keep it positive).
    2. Suggest 2 specific, fun, screen-free home activities to practice the weak words (or general English if none).
    3. End with a short, inspiring quote about learning.
    Keep the tone warm and helpful.`;
    const result = await callGemini(prompt);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-6 w-full font-sans text-gray-800">
      <div className="w-full max-w-md md:max-w-xl flex flex-col gap-6">
         <header className="w-full flex justify-between items-center mb-2">
           <div className="flex items-center gap-2">
             <div className="bg-blue-500 text-white p-2 rounded-lg shadow-md">
               <Icon path={Icons.Brain} />
             </div>
             <h1 className="text-xl font-black text-gray-700">家长 AI 智囊团</h1>
           </div>
           <button
             onClick={onBack}
             className="text-gray-400 p-2 bg-white rounded-lg shadow-sm hover:text-blue-500 transition-colors"
           >
             <Icon path={Icons.Home} size={20} />
           </button>
         </header>
         <div className="bg-white p-6 rounded-3xl shadow-lg text-center border-b-4 border-blue-100">
            <h2 className="font-bold text-gray-500 uppercase text-xs tracking-wider mb-4">应用设置</h2>
            <div className="flex items-center justify-between">
               <span className="font-medium text-gray-700">语音导师 (AI Mascot)</span>
               <button onClick={() => setSettings(s => ({...s, voiceOn: !s.voiceOn}))} className={`transition-colors ${settings.voiceOn ? 'text-green-500' : 'text-gray-300'}`}><Icon path={settings.voiceOn ? Icons.ToggleRight : Icons.ToggleLeft} size={40} className="fill-current"/></button>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl shadow-lg text-center border-b-4 border-blue-100">
            <h2 className="font-bold text-gray-500 uppercase text-xs tracking-wider mb-4">当前学情快照</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="bg-green-50 p-4 rounded-2xl text-center"><div className="text-3xl font-black text-green-500">{stats.masteredCount}</div><div className="text-xs text-green-700 font-bold">已掌握单词</div></div>
               <div className="bg-orange-50 p-4 rounded-2xl text-center"><div className="text-3xl font-black text-orange-500">{stats.weakWords.length}</div><div className="text-xs text-orange-700 font-bold">需关注难点</div></div>
            </div>
            {!advice && !loading && (
               <button onClick={handleGenAdvice} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"><Icon path={Icons.Sparkles} /> 生成 AI 辅导建议</button>
            )}
            {loading && (
               <div className="py-8 text-center flex flex-col items-center gap-3 text-blue-500"><div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div><span className="text-sm font-medium">AI 正在分析学习数据...</span></div>
            )}
            {advice && (
               <div className="bg-slate-50 p-5 rounded-2xl text-slate-700 text-sm leading-relaxed whitespace-pre-wrap border border-slate-100 animate-in fade-in slide-in-from-bottom-4 text-left">
                  <div className="font-bold text-blue-600 mb-2 flex items-center gap-2"><Icon path={Icons.Sparkles} size={16}/> 专属建议：</div>{advice}
               </div>
            )}
         </div>
       </div>
    </div>
  );
};

function SummaryView({ sessionQueue, setView, stickers, settings }) {
  const [storyImage, setStoryImage] = useState(null);
  const [storyCaption, setStoryCaption] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { speak } = useSpeech(settings.voiceOn);

  const generateStory = async () => {
    if (storyImage) return;
    setIsGenerating(true);
    const uniqueWords = [...new Set(sessionQueue.map(i => i.text))].join(", ");
    
    // 1. Generate Prompt & Caption
    const captionPrompt = `Create a simple, single-sentence story for a children's picture book using these words: ${uniqueWords}. The sentence should be in English.`;
    const caption = await callGemini(captionPrompt);
    setStoryCaption(caption.replace(/[\*\"]/g, '')); // Clean up

    // 2. Generate Image
    const imagePrompt = `Cute cartoon illustration for children's book, colorful, vector style. Scene description: ${caption}`;
    const image = await generateImage(imagePrompt);
    
    setStoryImage(image);
    setIsGenerating(false);
  };

  return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center p-8 w-full font-sans overflow-y-auto">
         <div className="w-full max-w-md text-center flex flex-col gap-6">
           <div className="mt-8">
             <div className="bg-white p-4 rounded-full shadow-xl mb-6 animate-bounce inline-block">
                <div className="bg-green-100 p-4 rounded-full text-green-600"><Icon path={Icons.Star} size={48} className="fill-current" /></div>
             </div>
             <h1 className="text-3xl font-black text-gray-800 mb-2">任务完成！</h1>
             <p className="text-gray-500">今天的练习非常棒！</p>
           </div>
           
           {/* Sticker Wall */}
           <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-yellow-100">
             <h3 className="font-bold text-yellow-600 mb-4 flex items-center justify-center gap-2"><Icon path={Icons.Award} size={20}/> 我的贴纸墙</h3>
             <div className="flex flex-wrap gap-2 justify-center">
               {stickers.length === 0 ? <p className="text-gray-300 text-sm py-4">继续加油收集贴纸！</p> : stickers.map((s, i) => <span key={i} className="text-3xl animate-in zoom-in">{s}</span>)}
             </div>
           </div>

           {/* AI Story Picture Book */}
           <div className="bg-white p-6 rounded-3xl shadow-md border-2 border-green-100 min-h-[250px] flex flex-col justify-center items-center relative overflow-hidden">
              {!storyImage && !isGenerating && (
                <button onClick={generateStory} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform">
                  <Icon path={Icons.Image} /> 生成绘本小故事
                </button>
              )}
              
              {isGenerating && (
                 <div className="flex flex-col items-center gap-3 text-purple-500">
                    <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
                    <span className="text-sm font-medium">AI 正在绘制插图...</span>
                 </div>
              )}

              {storyImage && (
                 <div className="w-full flex flex-col gap-4 animate-in fade-in duration-700">
                    <div className="relative w-full aspect-square bg-slate-50 rounded-2xl overflow-hidden shadow-inner border border-slate-100">
                       <img src={storyImage} alt="Story Illustration" className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-xl text-left flex items-start gap-3">
                       <p className="text-gray-700 text-lg font-medium flex-1">{storyCaption}</p>
                       <button onClick={() => speak(storyCaption)} className="bg-green-200 text-green-700 p-2 rounded-full hover:bg-green-300 active:scale-95 transition-all flex-shrink-0">
                          <Icon path={Icons.Speaker} size={20} />
                       </button>
                    </div>
                 </div>
              )}
           </div>

           <button onClick={() => setView('home')} className="w-full bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform">返回首页</button>
         </div>
      </div>
  );
}

const ErrorModal = ({ errorMessage, onClose }) => (
  errorMessage ? (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full text-center">
         <div className="text-4xl mb-2">🎉</div>
         <h3 className="text-xl font-bold text-gray-800 mb-2">提示</h3>
         <p className="text-gray-600 mb-6">{errorMessage}</p>
         <button onClick={onClose} className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold">好的</button>
      </div>
    </div>
  ) : null
);

// --- Main App Component ---
export default function App() {
  const [view, setView] = useState('home');
  const [progressMap, setProgressMap] = useState({});
  const [sessionQueue, setSessionQueue] = useState([]); 
  const [currentIdx, setCurrentIdx] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Settings & Gamification State
  const [stars, setStars] = useState(0);
  const [stickers, setStickers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [settings, setSettings] = useState({ voiceOn: true });

  // Load Data
  useEffect(() => {
    try {
      const p = localStorage.getItem('kids_app_progress');
      if (p) setProgressMap(JSON.parse(p));
      const s = localStorage.getItem('kids_app_stars');
      if (s) setStars(parseInt(s, 10));
      const st = localStorage.getItem('kids_app_stickers');
      if (st) setStickers(JSON.parse(st));
      const cfg = localStorage.getItem('kids_app_settings');
      if (cfg) setSettings(JSON.parse(cfg));
    } catch (e) {
      console.error("Failed to load data", e);
    }
  }, []);

  // Save Data Helpers
  const saveProgress = (newMap) => {
    setProgressMap(newMap);
    localStorage.setItem('kids_app_progress', JSON.stringify(newMap));
  };
  
  const saveStars = (newStars) => {
    setStars(newStars);
    localStorage.setItem('kids_app_stars', newStars.toString());
  };

  const saveStickers = (newStickers) => {
    setStickers(newStickers);
    localStorage.setItem('kids_app_stickers', JSON.stringify(newStickers));
  };

  // Save Settings Effect
  useEffect(() => {
    localStorage.setItem('kids_app_settings', JSON.stringify(settings));
  }, [settings]);

  const handleResetData = () => {
    if (window.confirm("确定要清空所有学习进度吗？")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const startSession = (mode = 'daily') => {
    const now = new Date();
    let queue = [];
    const dueItems = [];
    const newItems = [];
    const learningItems = [];

    ITEMS_DB.forEach(item => {
      const p = progressMap[item.id];
      if (!p || (p.mastery === 0 && !p.dueAt)) {
        newItems.push(item);
        return;
      }
      const isDue = p.dueAt && p.dueAt <= now.getTime();
      if (isDue) {
        dueItems.push(item);
      } else if (p.mastery > 0 && p.mastery <= 3) {
        learningItems.push(item);
      }
    });

    dueItems.sort((a, b) => {
      const pa = progressMap[a.id];
      const pb = progressMap[b.id];
      if (pa.dueAt !== pb.dueAt) return pa.dueAt - pb.dueAt;
      return pa.mastery - pb.mastery;
    });

    if (mode === 'daily') {
      const selectedDue = dueItems.slice(0, 5);
      const selectedNew = newItems.slice(0, 3);
      queue = [...selectedDue, ...selectedNew];
      if (queue.length < DAILY_TARGET) {
        learningItems.sort((a, b) => (progressMap[a.id].dueAt || 0) - (progressMap[b.id].dueAt || 0));
        const needed = DAILY_TARGET - queue.length;
        queue = [...queue, ...learningItems.slice(0, needed)];
      }
      if (queue.length < DAILY_TARGET && dueItems.length > 5) {
         const remainingDue = dueItems.slice(5);
         const needed = DAILY_TARGET - queue.length;
         queue = [...queue, ...remainingDue.slice(0, needed)];
      }
      queue.sort(() => Math.random() - 0.5); 
    } else if (mode === 'review_box') {
      queue = dueItems;
    }

    if (queue.length === 0) {
      setErrorMessage("太棒了！目前没有需要复习的内容，快去休息吧！");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    setSessionQueue(queue);
    setCurrentIdx(0);
    setView('lesson');
  };

  // --- Core Interaction Logic ---
  const handleResult = (itemId, result) => {
    if (feedback) return; 
    const now = new Date();
    const item = sessionQueue[currentIdx];
    const currentP = progressMap[itemId];
    const newP = calculateNextProgress(currentP, result, now);
    saveProgress({ ...progressMap, [itemId]: newP });

    let msg = getRandomMessage(result, item);
    let deltaStars = 0;
    if (result === 'easy') {
      deltaStars = 1; 
      if (newP.streak === 2) msg = getRandomMessage('streak2', item);
      if (newP.streak === 3) { msg = getRandomMessage('streak3', item); deltaStars += 2; }
      if (newP.streak === 5) msg = getRandomMessage('streak5', item);
      if ((currentP?.todayAttempts || 0) > 0 && (currentP?.lastResult === 'hard')) { msg = getRandomMessage('comeback', item); }
    } else {
      if (newP.todayAttempts >= MAX_TODAY_ATTEMPTS) { msg = getRandomMessage('dailyLimit', item); }
    }
    if (deltaStars > 0) saveStars(stars + deltaStars);
    setFeedback({ message: msg, type: result, deltaStars });
    setTimeout(() => {
      setFeedback(null);
      advanceQueue(itemId, result, newP);
    }, FEEDBACK_DURATION);
  };

  const advanceQueue = (itemId, result, newP) => {
    let nextQueue = [...sessionQueue];
    if (result === 'hard' && newP.todayAttempts < MAX_TODAY_ATTEMPTS) {
       const currentItem = sessionQueue[currentIdx];
       if (nextQueue[nextQueue.length - 1].id !== itemId) { nextQueue.push(currentItem); }
    }
    if (currentIdx < nextQueue.length - 1) {
      setSessionQueue(nextQueue); 
      setCurrentIdx(prev => prev + 1);
    } else {
      completeSession();
    }
  };

  const completeSession = () => {
    const newSticker = STICKER_POOL[Math.floor(Math.random() * STICKER_POOL.length)];
    saveStickers([...stickers, newSticker]);
    setView('summary');
  };

  const homeStats = useMemo(() => {
    const now = new Date().getTime();
    let dueCount = 0;
    let masteredCount = 0;
    Object.values(progressMap).forEach(p => {
      if (p.dueAt && p.dueAt <= now) dueCount++;
      if (p.mastery >= 4) masteredCount++;
    });
    return { dueCount, masteredCount };
  }, [progressMap]);

  if (view === 'lesson') {
    const item = sessionQueue[currentIdx];
    const progress = progressMap[item.id] || { mastery: 0, streak: 0 };
    const progressPercent = ((currentIdx + 1) / sessionQueue.length) * 100;
    return <LessonView item={item} progress={progress} progressPercent={progressPercent} onResult={handleResult} onBack={() => setView('home')} feedback={feedback} settings={settings} />;
  }

  if (view === 'summary') {
    return <SummaryView sessionQueue={sessionQueue} setView={setView} stickers={stickers} settings={settings} />;
  }

  if (view === 'parent') {
    return <ParentView progressMap={progressMap} onBack={() => setView('home')} settings={settings} setSettings={setSettings} />;
  }

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-6 w-full font-sans text-gray-800 relative">
      <ErrorModal errorMessage={errorMessage} onClose={() => setErrorMessage(null)} />
      <div className="absolute top-6 right-6 flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm font-bold text-yellow-500">
         <span>{stars}</span> <Icon path={Icons.Star} size={18} className="fill-current"/>
      </div>
      <div className="w-full max-w-md md:max-w-xl flex flex-col gap-6">
        <header className="w-full flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 text-white p-2 rounded-lg shadow-md"><Icon path={Icons.Star} /></div>
            <h1 className="text-xl font-black text-gray-700">DUDU 天天英语</h1>
          </div>
          <button onClick={() => setView('parent')} className="text-gray-400 p-2 bg-white rounded-lg shadow-sm hover:text-blue-500 transition-colors"><Icon path={Icons.Settings} size={20}/></button>
        </header>
        <div className="w-full bg-white rounded-3xl p-8 shadow-lg text-center border-b-4 border-blue-100">
          <h2 className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-2">今日目标</h2>
          <div className="flex justify-center items-end gap-2 mb-4">
             <span className="text-6xl font-black text-blue-500">0</span>
             <span className="text-2xl font-bold text-gray-300 mb-2">/ 8</span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden"><div className="w-0 h-full bg-blue-500 rounded-full"></div></div>
          <div className="flex justify-between mt-6 text-sm font-medium">
             <div className="flex flex-col"><span className="text-green-500 font-bold">{homeStats.masteredCount}</span><span className="text-gray-400">已掌握</span></div>
             <div className="flex flex-col"><span className="text-orange-500 font-bold">{homeStats.dueCount}</span><span className="text-gray-400">待复习</span></div>
          </div>
        </div>
        <div className="w-full space-y-4">
          <button onClick={() => startSession('daily')} className="w-full bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-2xl shadow-lg shadow-blue-200 transform active:scale-[0.98] transition-all flex items-center justify-center gap-3"><div className="bg-white/20 p-2 rounded-full"><Icon path={Icons.Play} /></div><span className="text-xl font-bold">开始今日任务</span></button>
          <button onClick={() => startSession('review_box')} className="w-full bg-white hover:bg-gray-50 text-indigo-600 p-6 rounded-2xl shadow-sm border-2 border-indigo-100 transform active:scale-[0.98] transition-all flex items-center justify-center gap-3"><Icon path={Icons.RotateCcw} /><span className="text-lg font-bold">复习盒 ({homeStats.dueCount})</span></button>
        </div>
        <div className="text-center">
          <button onClick={handleResetData} className="text-gray-300 hover:text-red-400 inline-flex items-center gap-1 text-xs px-4 py-2"><Icon path={Icons.Trash} size={14} /> 重置所有数据</button>
        </div>
      </div>
    </div>
  );
}
