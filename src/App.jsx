import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

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
  Brain: <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></>,
  ToggleLeft: <><rect width="20" height="12" x="2" y="6" rx="6" ry="6" /><circle cx="8" cy="12" r="2" /></>,
  ToggleRight: <><rect width="20" height="12" x="2" y="6" rx="6" ry="6" /><circle cx="16" cy="12" r="2" /></>,
  Image: <><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>,
  ChevronDown: <polyline points="6 9 12 15 18 9" />,
  ChevronUp: <polyline points="18 15 12 9 6 15" />
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
// 本地音频文件路径配置（单词 -> 文件路径的映射）
// 开发环境: /kids-english-app/audio/xxx.mp3
// 生产环境: /audio/xxx.mp3 (如果部署到根目录)
const isDev = import.meta.env.DEV;
const AUDIO_FILES = {
  'Apple': isDev ? '/kids-english-app/audio/apple.mp3' : '/audio/apple.mp3',
  'Banana': isDev ? '/kids-english-app/audio/banana.mp3' : '/audio/banana.mp3',
  'Cat': isDev ? '/kids-english-app/audio/cat.mp3' : '/audio/cat.mp3',
  'Dog': isDev ? '/kids-english-app/audio/dog.mp3' : '/audio/dog.mp3',
  'Red': isDev ? '/kids-english-app/audio/red.mp3' : '/audio/red.mp3',
  'Blue': isDev ? '/kids-english-app/audio/blue.mp3' : '/audio/blue.mp3',
  'Green': isDev ? '/kids-english-app/audio/green.mp3' : '/audio/green.mp3',
  'Mom': isDev ? '/kids-english-app/audio/mom.mp3' : '/audio/mom.mp3',
  'Dad': isDev ? '/kids-english-app/audio/dad.mp3' : '/audio/dad.mp3',
  'Book': isDev ? '/kids-english-app/audio/book.mp3' : '/audio/book.mp3',
  'Pen': isDev ? '/kids-english-app/audio/pen.mp3' : '/audio/pen.mp3',
  'Sun': isDev ? '/kids-english-app/audio/sun.mp3' : '/audio/sun.mp3',
  'Moon': isDev ? '/kids-english-app/audio/moon.mp3' : '/audio/moon.mp3',
  'Water': isDev ? '/kids-english-app/audio/water.mp3' : '/audio/water.mp3',
  'Bird': isDev ? '/kids-english-app/audio/bird.mp3' : '/audio/bird.mp3',
  'Fish': isDev ? '/kids-english-app/audio/fish.mp3' : '/audio/fish.mp3',
  'Car': isDev ? '/kids-english-app/audio/car.mp3' : '/audio/car.mp3',
  'Bus': isDev ? '/kids-english-app/audio/bus.mp3' : '/audio/bus.mp3',
  'Hello world': isDev ? '/kids-english-app/audio/hello_world.mp3' : '/audio/hello_world.mp3',
  'Good morning': isDev ? '/kids-english-app/audio/good_morning.mp3' : '/audio/good_morning.mp3',
};

const useSpeech = (voiceOn = true) => {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    loadVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // 停止当前播放
  const stopCurrentPlayback = useCallback(() => {
    // 停止音频
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    // 停止语音合成
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // 使用 Web Speech API (回退方案)
  const speakWithWebAPI = useCallback((text) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return Promise.reject('Speech synthesis not supported');
    }

    console.log(`[WebSpeech] Using Web Speech API (fallback) for: "${text}"`);
    return new Promise((resolve, reject) => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      // 设置为英式英语 (优先匹配 en-GB)
      utterance.lang = 'en-GB';
      const gbVoice = voices.find(v => v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('British'));
      if (gbVoice) {
        utterance.voice = gbVoice;
        console.log(`[WebSpeech] Using voice: ${gbVoice.name}`);
      }

      utterance.rate = 0.9;
      utterance.pitch = 1.1;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        console.log(`[WebSpeech] Finished speaking: "${text}"`);
        setSpeaking(false);
        resolve();
      };
      utterance.onerror = (e) => {
        setSpeaking(false);
        console.warn('[WebSpeech] Speech synthesis error:', e);
        reject(e);
      };

      window.speechSynthesis.speak(utterance);
    });
  }, [voices]);

  // 使用本地音频文件 (优先方案)
  const speakWithAudioFile = useCallback((text) => {
    return new Promise((resolve, reject) => {
      const audioPath = AUDIO_FILES[text];
      if (!audioPath) {
        console.log(`[Audio] No mapped file for: "${text}"`);
        return reject('No audio file for this text');
      }

      console.log(`[Audio] Using local audio file: "${audioPath}" for "${text}"`);
      const audio = new Audio(audioPath);
      audioRef.current = audio;

      audio.onplay = () => setSpeaking(true);
      audio.onended = () => {
        console.log(`[Audio] Finished playing: "${text}"`);
        setSpeaking(false);
        audioRef.current = null;
        resolve();
      };
      audio.onerror = (e) => {
        console.warn(`[Audio] Error loading ${audioPath}:`, e);
        setSpeaking(false);
        audioRef.current = null;
        reject(e);
      };

      audio.play().catch((err) => {
        console.warn(`[Audio] Play error:`, err);
        setSpeaking(false);
        audioRef.current = null;
        reject(err);
      });
    });
  }, []);

  // 主说话函数：优先本地音频，回退到 Web Speech API
  const speak = useCallback(async (text) => {
    if (!voiceOn) return;
    stopCurrentPlayback();

    // 先尝试本地音频文件
    try {
      await speakWithAudioFile(text);
    } catch (audioError) {
      console.log('Using Web Speech API as fallback');
      // 本地音频失败，回退到 Web Speech API
      try {
        await speakWithWebAPI(text);
      } catch (speechError) {
        console.warn('Both audio and speech failed');
      }
    }
  }, [voiceOn, stopCurrentPlayback, speakWithAudioFile, speakWithWebAPI]);

  // 用 useCallback 稳定 stop 函数引用
  const stop = useCallback(() => {
    stopCurrentPlayback();
    setSpeaking(false);
  }, [stopCurrentPlayback]);

  return { speak, stop, speaking };
};

// --- Sub Components ---

const Mascot = ({ speaking, className = "", mood = "happy" }) => {
  const [blinking, setBlinking] = useState(false);
  const [waving, setWaving] = useState(false);
  const [confetti, setConfetti] = useState([]);

  // 撒彩带效果
  useEffect(() => {
    if (mood === "celebrating") {
      // 生成彩带
      const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA'];
      const newConfetti = [];
      for (let i = 0; i < 12; i++) {
        newConfetti.push({
          id: i,
          x: 100,
          y: 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5,
          angle: Math.random() * 360
        });
      }
      setConfetti(newConfetti);

      // 2秒后清除彩带
      const timer = setTimeout(() => setConfetti([]), 2000);
      return () => clearTimeout(timer);
    }
  }, [mood]);

  useEffect(() => {
    const blinkLoop = setInterval(() => {
      if (!speaking && Math.random() > 0.7) {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 200);
      }
    }, 3000);

    // 招手动画循环
    const waveLoop = setInterval(() => {
      if (mood === "welcoming" && !speaking) {
        setWaving(true);
        setTimeout(() => setWaving(false), 1000);
      }
    }, 4000);

    return () => {
      clearInterval(blinkLoop);
      clearInterval(waveLoop);
    };
  }, [speaking, mood]);

  // 根据情绪调整表情
  const getMouthPath = () => {
    if (speaking) return null; // 说话时用动画嘴巴
    switch(mood) {
      case "excited": return "M-8 3 Q 0 12 8 3"; // 大笑
      case "welcoming": return "M-6 4 Q 0 10 6 4"; // 微笑
      case "thinking": return "M-4 6 Q 0 4 4 6"; // 思考状
      case "celebrating": return "M-10 2 Q 0 14 10 2"; // 超大笑脸
      default: return "M-6 2 Q 0 8 6 2"; // 普通微笑
    }
  };

  const getEyeStyle = () => {
    if (mood === "excited" || mood === "celebrating") {
      // 兴奋/庆祝时眼睛更大
      return { rx: 14, ry: 16 };
    }
    return { rx: 10, ry: 12 };
  };

  const eyeStyle = getEyeStyle();

  return (
    <div className={`relative ${className}`}>
      {/* 云朵精灵 Cloud Sprite */}
      <div className={`w-full h-full ${speaking ? 'animate-[bounce_1s_infinite]' : 'animate-[float_3s_ease-in-out_infinite]'} ${mood === "celebrating" ? 'animate-[bounce_0_3s_infinite]' : ''}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          <defs>
            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
            <linearGradient id="cheekGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FECACA" />
              <stop offset="100%" stopColor="#FCA5A5" />
            </linearGradient>
            <filter id="cloudShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0EA5E9" floodOpacity="0.2"/>
            </filter>
          </defs>

          {/* 彩带效果 - 庆祝时撒出 */}
          {mood === "celebrating" && confetti.map((c) => (
            <g key={c.id}>
              <rect
                x={c.x}
                y={c.y}
                width="8"
                height="4"
                fill={c.color}
                rx="2"
                transform={`rotate(${c.angle} ${c.x} ${c.y})`}
              >
                <animate
                  attributeName="x"
                  values={`${c.x};${c.x + (Math.random() - 0.5) * 80};${c.x + (Math.random() - 0.5) * 120}`}
                  dur="1.5s"
                  begin={c.delay + 's'}
                  fill="freeze"
                />
                <animate
                  attributeName="y"
                  values={`${c.y};${c.y - 40 - Math.random() * 30};${c.y + 60 + Math.random() * 40}`}
                  dur="1.5s"
                  begin={c.delay + 's'}
                  fill="freeze"
                />
                <animate
                  attributeName="opacity"
                  values="1;1;0"
                  dur="1.5s"
                  begin={c.delay + 's'}
                  fill="freeze"
                />
              </rect>
            </g>
          ))}

          {/* 云朵身体 - 由多个圆形组成 */}
          <g filter="url(#cloudShadow)">
            {/* 主云朵 */}
            <ellipse cx="100" cy="110" rx="70" ry="35" fill="url(#cloudGrad)" />
            <circle cx="50" cy="100" r="30" fill="url(#cloudGrad)" />
            <circle cx="150" cy="100" r="30" fill="url(#cloudGrad)" />
            <circle cx="75" cy="80" r="35" fill="url(#cloudGrad)" />
            <circle cx="125" cy="80" r="35" fill="url(#cloudGrad)" />
            <circle cx="100" cy="70" r="30" fill="url(#cloudGrad)" />

            {/* 小云朵装饰 - 像小翅膀 */}
            <ellipse cx="35" cy="120" rx="15" ry="10" fill="#DBEAFE" opacity="0.8" />
            <ellipse cx="165" cy="120" rx="15" ry="10" fill="#DBEAFE" opacity="0.8" />
          </g>

          {/* 眼睛 - 根据情绪变化 */}
          <g transform="translate(0, 5)">
            {blinking ? (
              <>
                <line x1="75" y1="95" x2="90" y2="95" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
                <line x1="110" y1="95" x2="125" y2="95" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* 左眼 */}
                <ellipse cx="82" cy="95" rx={eyeStyle.rx} ry={eyeStyle.ry} fill="#FFFFFF" stroke="#374151" strokeWidth="2"/>
                <circle cx="82" cy="97" r="5" fill="#1F2937">
                  <animate attributeName="cy" values="97;95;97" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="84" cy="93" r="2" fill="#FFFFFF" opacity="0.8"/>

                {/* 右眼 */}
                <ellipse cx="118" cy="95" rx={eyeStyle.rx} ry={eyeStyle.ry} fill="#FFFFFF" stroke="#374151" strokeWidth="2"/>
                <circle cx="118" cy="97" r="5" fill="#1F2937">
                  <animate attributeName="cy" values="97;95;97" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="120" cy="93" r="2" fill="#FFFFFF" opacity="0.8"/>
              </>
            )}
          </g>

          {/* 腮红 - 兴奋/庆祝时更红 */}
          <ellipse cx="60" cy="108" rx={mood === "excited" || mood === "celebrating" ? 14 : 10} ry={mood === "excited" || mood === "celebrating" ? 8 : 6} fill="url(#cheekGrad)" opacity={mood === "excited" || mood === "celebrating" ? 0.9 : 0.6} />
          <ellipse cx="140" cy="108" rx={mood === "excited" || mood === "celebrating" ? 14 : 10} ry={mood === "excited" || mood === "celebrating" ? 8 : 6} fill="url(#cheekGrad)" opacity={mood === "excited" || mood === "celebrating" ? 0.9 : 0.6} />

          {/* 嘴巴 - 根据情绪变化 */}
          <g transform="translate(100, 115)">
            {speaking ? (
              // 说话时的嘴巴动画 - 用 scale 做更明显的张合
              <g>
                {/* 嘴巴主体 - 椭圆形，用 scale 做张开闭合动画 */}
                <ellipse cx="0" cy="0" rx="8" ry="3" fill="#374151">
                  <animate attributeName="ry" values="2;8;2" dur="0.12s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
                  <animate attributeName="ry" values="2;8;2" dur="0.12s" repeatCount="indefinite" begin="0.06s" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
                </ellipse>
                {/* 小舌头 */}
                <ellipse cx="0" cy="1" rx="4" ry="2" fill="#F87171" opacity="0.7">
                  <animate attributeName="cy" values="0;4;0" dur="0.12s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
                  <animate attributeName="ry" values="1.5;3;1.5" dur="0.12s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
                </ellipse>
                {/* 上嘴唇阴影 */}
                <path d="M-8 -2 Q0 -5 8 -2" fill="none" stroke="#374151" strokeWidth="1.5" opacity="0.5">
                  <animate attributeName="d" values="M-8 -2 Q0 -4 8 -2;M-8 -2 Q0 -8 8 -2;M-8 -2 Q0 -4 8 -2" dur="0.12s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
                </path>
              </g>
            ) : (
              <path d={getMouthPath()} fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
            )}
          </g>

          {/* 招手小云朵 */}
          {waving && mood === "welcoming" && (
            <g>
              <ellipse cx="30" cy="100" rx="8" ry="5" fill="#DBEAFE" opacity="0.6">
                <animate attributeName="cx" values="30;25;30" dur="0.5s" repeatCount="3" />
                <animateTransform attributeName="transform" type="rotate" values="-10 30 100;10 30 100;-10 30 100" dur="0.5s" repeatCount="3" />
              </ellipse>
              <ellipse cx="25" cy="90" rx="6" ry="4" fill="#DBEAFE" opacity="0.4">
                <animate attributeName="cx" values="25;20;25" dur="0.5s" repeatCount="3" begin="0.1s"/>
              </ellipse>
            </g>
          )}

          {/* 说话时的声波 */}
          {speaking && (
            <g opacity="0.4">
              <circle cx="100" cy="50" r="5" fill="#60A5FA">
                <animate attributeName="r" values="5;15;5" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="70" cy="60" r="4" fill="#60A5FA">
                <animate attributeName="r" values="4;12;4" dur="1.2s" repeatCount="indefinite" begin="0.3s"/>
                <animate attributeName="opacity" values="0.4;0;0.4" dur="1.2s" repeatCount="indefinite" begin="0.3s"/>
              </circle>
              <circle cx="130" cy="60" r="4" fill="#60A5FA">
                <animate attributeName="r" values="4;12;4" dur="1.1s" repeatCount="indefinite" begin="0.5s"/>
                <animate attributeName="opacity" values="0.4;0;0.4" dur="1.1s" repeatCount="indefinite" begin="0.5s"/>
              </circle>
            </g>
          )}
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
      <div className={`relative bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full mx-6 text-center transform transition-all animate-in zoom-in-95 duration-300 border-4 ${isEasy ? 'border-green-100' : 'border-orange-100'}`}>
        {/* DUDU 在反馈时出现 */}
        <div className="flex justify-center mb-2">
          <Mascot speaking={false} mood={isEasy ? "excited" : "welcoming"} className="w-20 h-20" />
        </div>
        <div className="text-4xl mb-2">{isEasy ? (deltaStars > 1 ? '🌟' : '🎉') : '💪'}</div>
        <h3 className={`text-xl font-black mb-2 ${isEasy ? 'text-green-600' : 'text-orange-500'}`}>{message}</h3>
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
  const [showOralDefense, setShowOralDefense] = useState(false);
  const [oralQuestion, setOralQuestion] = useState("");
  const [oralPhase, setOralPhase] = useState('question');
  const [showMetaInfo, setShowMetaInfo] = useState(false);
  // DUDU 情绪状态
  const [duduMood, setDuduMood] = useState("happy");
  const [isListening, setIsListening] = useState(false);
  const { speak, speaking, stop } = useSpeech(settings.voiceOn);

  useEffect(() => {
      console.log('useEffect 触发, item 变化', { itemId: item?.id });
      setShowAi(false);
      setAiContent("");
      setAiLoading(false);
      setShowOralDefense(false);
      setOralQuestion("");
      setOralPhase('question');
      setDuduMood("happy");
      setIsListening(false);
      stop();
  }, [item, stop]);

  // 口头答辩 - 闪电提问
  const handleOralDefense = async () => {
    console.log('闪电提问被点击', { item, showOralDefense });
    setShowOralDefense(true);
    setOralPhase('question');
    // 根据不同主题生成相关问题
    const questions = {
      fruits: `What color is a ${item.text}?`,
      animals: `What sound does a ${item.text} make?`,
      colors: `Can you find something ${item.text} around you?`,
      family: `Is ${item.text} in your family?`,
      greetings: `When do you say "${item.text}"?`,
      school: `Do you have a ${item.text} in your bag?`,
      nature: `Can you see ${item.text} outside today?`,
      transport: `Does a ${item.text} fly or drive on the road?`,
      clothes: `Do you wear ${item.text} on your hands or feet?`,
      toys: `Is a ${item.text} soft or hard?`,
      numbers: `How many ${item.text}? Show me with your fingers!`,
      phrases: `Say "${item.text}" to me!`
    };
    const defaultQuestion = `Can you use "${item.text}" in a sentence?`;
    const question = questions[item.topic] || defaultQuestion;
    console.log('问题:', question);
    setOralQuestion(question);
    // 稍后播报问题
    setTimeout(() => {
      speak(question);
    }, 500);
  };

  const handleOralAnswer = (knowsIt) => {
    setOralPhase('answer');
    if (knowsIt) {
      speak(`Great job! You really know ${item.text}!`);
    } else {
      speak(`No worries! Let's learn more about ${item.text}. You can try again later!`);
    }
    setTimeout(() => {
      setShowOralDefense(false);
      setOralPhase('question');
    }, 3000);
  };

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
    setIsListening(true);
    setDuduMood("happy"); // 说话时 DUDU 开心
    speak(item.text);
    // 说话结束后恢复
    setTimeout(() => {
      setIsListening(false);
    }, 1500);
  };

  // 监听 speaking 状态，让 DUDU 的嘴巴动起来
  const duduSpeaking = speaking || isListening;

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
                  <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                    <Icon path={Icons.Brain} size={12} /> 小提示：AI 可能会犯错，记得和爸爸妈妈确认哦！
                  </p>
               </div>
            </div>
         </div>
      )}

      {/* 口头答辩 - 闪电提问 */}
      {showOralDefense && (
         <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => {
            console.log('背景被点击，关闭弹窗');
            setShowOralDefense(false);
         }}>
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-purple-200 relative" onClick={e => {
               console.log('弹窗内部被点击，阻止关闭');
               e.stopPropagation();
            }}>
               {/* 关闭按钮 */}
               <button onClick={() => {
                  console.log('关闭按钮被点击');
                  setShowOralDefense(false);
               }} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all">
                  <Icon path={Icons.Close} size={20} />
               </button>
               <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center">
                  <Icon path={Icons.Brain} size={24} />
               </div>
               <div className="mt-6 text-center">
                  <h3 className="font-bold text-xl text-purple-600 mb-2">⚡ 闪电提问</h3>
                  <p className="text-sm text-gray-500 mb-4">证明你真的懂了！</p>

                  {oralPhase === 'question' && (
                     <>
                        <div className="bg-purple-50 p-4 rounded-2xl mb-6">
                           <p className="text-lg font-medium text-gray-700">{oralQuestion}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                           <button
                             onClick={() => handleOralAnswer(true)}
                             className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold active:scale-95 transition-all flex flex-col items-center gap-1"
                           >
                             <Icon path={Icons.Check} size={24} />
                             <span>我知道！</span>
                           </button>
                           <button
                             onClick={() => handleOralAnswer(false)}
                             className="bg-amber-100 hover:bg-amber-200 text-amber-600 py-3 rounded-xl font-bold active:scale-95 transition-all flex flex-col items-center gap-1"
                           >
                             <Icon path={Icons.RotateCcw} size={24} />
                             <span>再听一次</span>
                           </button>
                        </div>
                     </>
                  )}

                  {oralPhase === 'answer' && (
                     <div className="py-4">
                        <div className="text-6xl mb-4 animate-bounce">🎯</div>
                        <p className="text-gray-600">继续加油！</p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      )}

      {/* 顶部进度条 + 奖励预览 */}
      <div className="px-6 py-4 bg-white flex items-center gap-4 shadow-sm z-10 w-full">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600"><Icon path={Icons.Home} /></button>
        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden max-w-3xl mx-auto">
          <div className="h-full bg-green-400 transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }} />
        </div>
        {/* 奖励预览 - 小宝箱暗示终点有礼物 */}
        <div className="relative flex items-center gap-2">
          {/* 进度数字 */}
          <span className="text-xs font-bold text-gray-500">{Math.round(progressPercent)}%</span>
          {/* 小宝箱图标 */}
          <div className="relative">
            <span className={`text-2xl ${progressPercent >= 100 ? 'animate-bounce' : 'opacity-60'}`}>
              {progressPercent >= 100 ? '🎁' : '📦'}
            </span>
            {/* 完成时的闪光 */}
            {progressPercent >= 100 && (
              <>
                <div className="absolute inset-0 bg-amber-400/30 rounded-full animate-ping"></div>
                <span className="absolute -top-1 -right-1 text-sm animate-bounce">✨</span>
              </>
            )}
            {/* 未完成时的锁 */}
            {progressPercent < 100 && (
              <span className="absolute -top-0.5 -right-0.5 text-xs">🔒</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center items-center w-full relative">
        <div className="z-10 -mb-8 transform hover:scale-105 transition-transform duration-300">
           {/* DUDU 根据状态变化表情 */}
           <Mascot speaking={duduSpeaking} mood={duduMood} />
        </div>

        <div className="w-full max-w-md md:max-w-2xl bg-white rounded-[2rem] shadow-xl p-8 pt-12 flex flex-col items-center justify-center gap-6 min-h-[400px] md:min-h-[500px] relative border border-gray-100 transition-all duration-300">
           {/* 掌握度指示器 - 可点击查看详情 */}
           <button
             onClick={() => setShowMetaInfo(!showMetaInfo)}
             className="absolute top-6 right-6 flex items-center gap-1 text-xs font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1.5 rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all cursor-pointer"
           >
             <span>Lv.{progress.mastery}</span>
             <Icon path={showMetaInfo ? Icons.ChevronUp : Icons.ChevronDown} size={14} />
           </button>

           {/* 元认知信息面板 */}
           {showMetaInfo && (
             <div className="absolute top-16 right-6 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl border border-blue-100 w-56 animate-in fade-in slide-in-from-top-2">
                <h4 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-1">
                  <Icon path={Icons.Brain} size={14} /> 学习大脑
                </h4>
                <div className="space-y-2 text-xs">
                   <div className="flex justify-between">
                     <span className="text-gray-500">掌握等级</span>
                     <span className="font-bold text-blue-600">{progress.mastery}/5</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-500">连续答对</span>
                     <span className="font-bold text-green-600">{progress.streak} 次</span>
                   </div>
                   <div className="border-t pt-2 mt-2">
                     <span className="text-gray-500">
                       {progress.mastery === 0 && "🌱 新单词，加油！"}
                       {progress.mastery === 1 && "📝 开始熟悉了"}
                       {progress.mastery === 2 && "👍 逐渐掌握中"}
                       {progress.mastery === 3 && "💪 记得很牢了"}
                       {progress.mastery >= 4 && "🏆 已完全掌握！"}
                     </span>
                   </div>
                </div>
             </div>
           )}

           <span className="bg-blue-50 text-blue-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{item.topic}</span>
           <div className="text-[6rem] md:text-[8rem] leading-none animate-bounce-slow filter drop-shadow-lg transition-all duration-300">{item.image}</div>

           <div className="text-center space-y-4 w-full">
             <div className="flex items-center justify-center gap-3">
               <h1 className="text-4xl md:text-5xl font-black text-gray-800 transition-all duration-300">{item.text}</h1>
             </div>

             <div className="flex justify-center gap-3 mt-2">
                <button
                  onClick={handleListen}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-full font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Icon path={Icons.Speaker} className={duduSpeaking ? "animate-pulse" : ""} />
                  {duduSpeaking ? "听..." : "Listen"}
                </button>
                <button
                  onClick={(e) => {
                    console.log('闪电按钮被点击!', e);
                    e.preventDefault();
                    e.stopPropagation();
                    handleOralDefense();
                  }}
                  className="bg-purple-100 text-purple-600 p-3 rounded-full hover:bg-purple-200 active:scale-95 transition-all shadow-sm"
                  title="闪电提问 - 证明你真的懂了"
                >
                  <Icon path={Icons.Brain} size={24} />
                </button>
                <button onClick={handleAskAi} className="bg-yellow-100 text-yellow-600 p-3 rounded-full hover:bg-yellow-200 active:scale-95 transition-all shadow-sm" title="魔法百科 - AI 帮你扩展知识">
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
                setDuduMood("thinking"); // DUDU 变成思考表情
                setTimeout(() => setDuduMood("happy"), 1500);
                onResult(item.id, 'hard');
             }}
             className="flex flex-col items-center justify-center bg-amber-50 hover:bg-amber-100 text-amber-600 py-4 md:py-6 rounded-2xl border-2 border-amber-200 active:scale-95 transition-all"
           >
             <Icon path={Icons.RotateCcw} size={32} />
             <span className="font-bold mt-1">再听一次</span>
           </button>

           <button
             onClick={() => {
                setDuduMood("celebrating"); // DUDU 撒彩带庆祝！
                setTimeout(() => setDuduMood("happy"), 2000);
                onResult(item.id, 'easy');
             }}
             className="flex flex-col items-center justify-center bg-green-500 hover:bg-green-600 text-white py-4 md:py-6 rounded-2xl shadow-lg shadow-green-200 active:scale-95 transition-all"
           >
             <Icon path={Icons.Check} size={32} />
             <span className="font-bold mt-1">我会了！</span>
           </button>
        </div>
      </div>
    </div>
  );
};

const ParentView = ({ progressMap, onBack, settings, setSettings, onResetData }) => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [quickTip, setQuickTip] = useState(""); // 快速分析提示

  // 家长锁状态
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState("");
  const [resetError, setResetError] = useState("");

  // 学情分析 - 更详细的分级
  const analysis = useMemo(() => {
    const notStarted = [];      // 未学习
    const learning = [];         // 学习中 (Lv 1-2)
    const familiar = [];         // 熟悉 (Lv 3)
    const mastered = [];         // 已掌握 (Lv 4-5)
    const struggling = [];       // 困难点 (lapses > 0 且 mastery < 3)

    Object.keys(progressMap).forEach(id => {
      const p = progressMap[id];
      const item = ITEMS_DB.find(i => i.id === id);
      if (!item) return;

      if (p.mastery === 0 && !p.dueAt) {
        notStarted.push({ ...item, progress: p });
      } else if (p.mastery <= 2) {
        learning.push({ ...item, progress: p });
        if (p.lapses > 0) {
          struggling.push({ ...item, progress: p });
        }
      } else if (p.mastery === 3) {
        familiar.push({ ...item, progress: p });
      } else if (p.mastery >= 4) {
        mastered.push({ ...item, progress: p });
      }
    });

    // 按主题分组困难词
    const strugglingByTopic = {};
    struggling.forEach(item => {
      if (!strugglingByTopic[item.topic]) {
        strugglingByTopic[item.topic] = [];
      }
      strugglingByTopic[item.topic].push(item);
    });

    return {
      notStarted: notStarted.length,
      learning: learning.length,
      familiar: familiar.length,
      mastered: mastered.length,
      struggling,
      strugglingByTopic,
      total: ITEMS_DB.length
    };
  }, [progressMap]);

  // 生成快速学情提示
  const generateQuickTip = async () => {
    if (quickTip) return;

    const strugglingWords = analysis.struggling.slice(0, 4).map(w => `${w.text}(${w.zh})`).join('、');
    const topics = Object.keys(analysis.strugglingByTopic).join('、');

    let prompt = `作为儿童英语教育专家，请分析孩子的学情：

已掌握单词：${analysis.mastered} 个
学习中单词：${analysis.learning} 个
困难单词（还没记住的）：${strugglingWords || "无，太棒了！"}
相关主题：${topics || "综合"}

请用温暖鼓励的语气，给家长写一句话（30字以内）的观察和建议。
格式："宝贝在【XX方面】还在巩固中，建议【具体活动建议】"`;

    if (!strugglingWords) {
      prompt = `孩子已经掌握了 ${analysis.mastered} 个英语单词，学习非常棒！请给家长写一句鼓励的话（30字以内），并建议一个可以拓展的游戏活动。`;
    }

    setLoading(true);
    const result = await callGemini(prompt);
    setQuickTip(result);
    setLoading(false);
  };

  const handleGenAdvice = async () => {
    if (advice) return;
    setLoading(true);

    const strugglingWords = analysis.struggling.slice(0, 5).map(w => `${w.text}(${w.zh})`).join('、');
    const masteredTopics = [...new Set(ITEMS_DB.filter(item => {
      const p = progressMap[item.id];
      return p && p.mastery >= 4;
    }).map(item => item.topic))].join('、');

    const prompt = `作为儿童英语教育专家，请详细分析孩子的学情并给家长建议：

【学习数据】
- 总词汇量：${analysis.total} 个
- 已掌握：${analysis.mastered} 个 (${Math.round(analysis.mastered / analysis.total * 100)}%)
- 学习中：${analysis.learning} 个
- 困难单词：${strugglingWords || "无"}
- 擅长主题：${masteredTopics || "暂无"}

请用温暖专业的语气回复，包含以下内容：
1. 【进度总结】肯定孩子的努力，用简单易懂的话描述当前水平
2. 【困难分析】分析困难单词的特点（如：某类发音、某主题）
3. 【家庭活动】2个有趣的线下游戏建议，针对困难点
4. 【鼓励话语】一句给家长的温暖鼓励

请用中文回复，排版清晰，每部分用表情符号开头。`;

    const result = await callGemini(prompt);
    setAdvice(result);
    setLoading(false);
  };

  // 生成新的数学题
  const generateMathProblem = () => {
    const num1 = Math.floor(Math.random() * 9) + 2; // 2-10
    const num2 = Math.floor(Math.random() * 9) + 2; // 2-10
    setMathProblem({ num1, num2, answer: num1 * num2 });
    setUserAnswer("");
    setResetError("");
  };

  // 开始重置流程
  const startResetFlow = () => {
    generateMathProblem();
    setShowResetConfirm(true);
  };

  // 验证答案并执行重置
  const confirmReset = () => {
    const answer = parseInt(userAnswer, 10);
    if (isNaN(answer)) {
      setResetError("请输入数字");
      return;
    }
    if (answer === mathProblem.answer) {
      onResetData();
    } else {
      setResetError("答案不对，请再试一次");
      generateMathProblem(); // 生成新题目
    }
  };

  // 组件加载时自动生成快速提示
  useEffect(() => {
    generateQuickTip();
  }, []);

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center p-6 w-full font-sans text-gray-800 pb-20">
      {/* 家长锁确认弹窗 */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full text-center animate-in zoom-in-95 duration-300">
            <div className="text-5xl mb-4">🔐</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">家长验证</h3>
            <p className="text-gray-500 text-sm mb-6">为了防止误触，请回答下面的问题：</p>

            <div className="bg-amber-50 rounded-2xl p-6 mb-4 border-2 border-amber-200">
              <p className="text-3xl font-black text-amber-600 mb-2">
                {mathProblem.num1} × {mathProblem.num2} = ?
              </p>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && confirmReset()}
                placeholder="输入答案"
                className="w-full text-center text-2xl font-bold py-3 px-4 rounded-xl border-2 border-amber-300 focus:border-amber-500 focus:outline-none"
                autoFocus
              />
            </div>

            {resetError && (
              <p className="text-red-500 text-sm mb-4 flex items-center justify-center gap-1">
                <Icon path={Icons.X} size={16} /> {resetError}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-bold transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirmReset}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold shadow-lg transition-colors"
              >
                确认重置
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md md:max-w-xl flex flex-col gap-5">
         <header className="w-full flex justify-between items-center">
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

         {/* AI 快速分析卡片 */}
         <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-5 rounded-3xl shadow-lg text-white">
           <div className="flex items-start gap-3">
             <div className="text-3xl">🎯</div>
             <div className="flex-1">
               <h3 className="font-bold mb-1">AI 学情观察</h3>
               {loading && !quickTip ? (
                 <div className="flex items-center gap-2 text-sm">
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                   AI 正在分析...
                 </div>
               ) : (
                 <p className="text-sm leading-relaxed opacity-95">{quickTip || "暂无数据"}</p>
               )}
             </div>
           </div>
         </div>

         {/* 学情分级 - 可视化进度条 */}
         <div className="bg-white p-5 rounded-3xl shadow-lg border-b-4 border-blue-100">
            <h2 className="font-bold text-gray-500 uppercase text-xs tracking-wider mb-4">学习进度分级</h2>

            <div className="space-y-3">
              {/* 已掌握 */}
              <div className="flex items-center gap-3">
                <div className="w-24 text-xs font-medium text-gray-600">已掌握</div>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${(analysis.mastered / analysis.total) * 100}%` }}
                  >
                    <span className="text-xs text-white font-bold">{analysis.mastered}</span>
                  </div>
                </div>
              </div>

              {/* 熟悉 */}
              <div className="flex items-center gap-3">
                <div className="w-24 text-xs font-medium text-gray-600">熟悉中</div>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${(analysis.familiar / analysis.total) * 100}%` }}
                  >
                    <span className="text-xs text-white font-bold">{analysis.familiar}</span>
                  </div>
                </div>
              </div>

              {/* 学习中 */}
              <div className="flex items-center gap-3">
                <div className="w-24 text-xs font-medium text-gray-600">学习中</div>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${(analysis.learning / analysis.total) * 100}%` }}
                  >
                    <span className="text-xs text-white font-bold">{analysis.learning}</span>
                  </div>
                </div>
              </div>

              {/* 未开始 */}
              <div className="flex items-center gap-3">
                <div className="w-24 text-xs font-medium text-gray-600">未开始</div>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gray-300 to-gray-400 transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${(analysis.notStarted / analysis.total) * 100}%` }}
                  >
                    <span className="text-xs text-white font-bold">{analysis.notStarted}</span>
                  </div>
                </div>
              </div>
            </div>
         </div>

         {/* 困难点详情 */}
         {analysis.struggling.length > 0 && (
           <div className="bg-white p-5 rounded-3xl shadow-lg border-b-4 border-orange-100">
             <h2 className="font-bold text-gray-500 uppercase text-xs tracking-wider mb-3">
               📝 需要巩固的单词
             </h2>

             {/* 按主题分组显示 */}
             {Object.entries(analysis.strugglingByTopic).map(([topic, words]) => (
               <div key={topic} className="mb-3 last:mb-0">
                 <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                   <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">{topic}</span>
                   <span>{words.length} 个</span>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {words.map(word => (
                     <div key={word.id} className="bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200">
                       <span className="font-medium text-gray-700">{word.text}</span>
                       <span className="text-gray-400 text-sm ml-1">{word.zh}</span>
                     </div>
                   ))}
                 </div>
               </div>
             ))}
           </div>
         )}

         {/* 应用设置 */}
         <div className="bg-white p-5 rounded-3xl shadow-lg border-b-4 border-blue-100">
            <h2 className="font-bold text-gray-500 uppercase text-xs tracking-wider mb-4">应用设置</h2>
            <div className="flex items-center justify-between mb-4">
               <span className="font-medium text-gray-700">语音导师 (AI Mascot)</span>
               <button onClick={() => setSettings(s => ({...s, voiceOn: !s.voiceOn}))} className={`transition-colors ${settings.voiceOn ? 'text-green-500' : 'text-gray-300'}`}><Icon path={settings.voiceOn ? Icons.ToggleRight : Icons.ToggleLeft} size={40} className="fill-current"/></button>
            </div>
            <div className="border-t pt-4">
               <button
                 onClick={startResetFlow}
                 className="w-full bg-red-50 hover:bg-red-100 text-red-500 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
               >
                 <Icon path={Icons.Trash} size={18} />
                 重置所有数据
               </button>
               <p className="text-xs text-gray-400 mt-2 text-center">清空所有学习进度，此操作不可恢复</p>
            </div>
         </div>

         {/* 详细 AI 建议按钮 */}
         <button
           onClick={handleGenAdvice}
           className="w-full bg-white hover:bg-blue-50 text-blue-600 py-4 rounded-3xl font-bold shadow-lg border-2 border-blue-200 active:scale-95 transition-all flex items-center justify-center gap-2"
         >
           <Icon path={Icons.Sparkles} /> 获取详细 AI 辅导建议
         </button>

         {/* 详细建议弹窗 */}
         {advice && (
           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
             <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl max-h-[80vh] overflow-y-auto animate-in zoom-in-95 duration-300">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                   <Icon path={Icons.Sparkles} className="text-blue-500" />
                   AI 深度分析报告
                 </h3>
                 <button onClick={() => setAdvice("")} className="text-gray-400 hover:text-gray-600 p-1">
                   <Icon path={Icons.Close} size={20} />
                 </button>
               </div>
               <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                 {advice}
               </div>
             </div>
           </div>
         )}
       </div>
    </div>
  );
};

// 庆祝视图 - 每日8星任务完成时的满屏特效
function CelebrationView({ collectedStars, onContinue, settings }) {
  const [phase, setPhase] = useState('confetti'); // confetti -> stars -> chest -> reward
  const [chestOpen, setChestOpen] = useState(false);
  const [rewardType, setRewardType] = useState('');
  const canvasRef = useRef(null);
  const { speak } = useSpeech(settings.voiceOn);

  // 奖励类型随机
  const rewardTypes = [
    { type: 'badge', name: '探险家勋章', emoji: '🏅', message: 'You earned the Explorer Badge!' },
    { type: 'badge', name: '勇气勋章', emoji: '🎖️', message: 'You earned the Brave Heart Badge!' },
    { type: 'badge', name: '智慧勋章', emoji: '🎓', message: 'You earned the Wisdom Badge!' },
    { type: 'skin', name: '小红帽 DUDU', emoji: '☁️🎀', message: 'DUDU got a cute red hat!' },
    { type: 'skin', name: '船长 DUDU', emoji: '☁️⚓', message: 'Captain DUDU is ready for adventure!' },
    { type: 'skin', name: '彩虹 DUDU', emoji: '☁️🌈', message: 'Rainbow DUDU is here!' },
  ];

  useEffect(() => {
    // 随机选择奖励
    const reward = rewardTypes[Math.floor(Math.random() * rewardTypes.length)];
    setRewardType(reward);

    // 播放欢呼声
    speak('Amazing! You did it! Congratulations!');

    // 时间轴
    const timeline = [
      { time: 2000, action: () => setPhase('stars') },     // 彩带后星星旋转
      { time: 4000, action: () => setPhase('chest') },     // 星星汇聚成宝箱
      { time: 5500, action: () => {                        // 宝箱打开
        setChestOpen(true);
        setPhase('reward');
        speak(reward.message);
      }},
    ];

    const timers = timeline.map(({ time, action }) =>
      setTimeout(action, time)
    );

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  // 彩带动画
  useEffect(() => {
    if (phase !== 'confetti') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA', '#FFD93D', '#6BCB77'];

    // 创建彩带
    for (let i = 0; i < 150; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5
      });
    }

    // 星星雨
    for (let i = 0; i < 50; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 20 + 15,
        color: '#FFD700',
        speedY: Math.random() * 4 + 3,
        speedX: Math.random() * 1 - 0.5,
        rotation: 0,
        isStar: true
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((c, index) => {
        c.y += c.speedY;
        c.x += c.speedX;
        c.rotation += c.rotationSpeed;

        if (c.y > canvas.height) {
          c.y = -20;
          c.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);

        if (c.isStar) {
          // 画星星
          ctx.font = `${c.size}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('⭐', 0, 0);
        } else {
          // 画彩带
          ctx.fillStyle = c.color;
          ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
        }

        ctx.restore();
      });

      if (phase === 'confetti') {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [phase]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-amber-100 via-yellow-50 to-orange-100 flex flex-col items-center justify-center overflow-hidden">
      {/* 彩带画布 */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* 主要内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* 星星旋转阶段 */}
        {phase === 'stars' && (
          <div className="relative w-64 h-64">
            {/* 8颗星星绕圈旋转 */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center animate-[spin_3s_linear_infinite]"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  transform: `rotate(${i * 45}deg) translateX(80px)`
                }}
              >
                <span className="text-5xl animate-bounce" style={{animationDelay: `${i * 0.1}s`}}>⭐</span>
              </div>
            ))}
            {/* 中心 DUDU */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl animate-pulse">☁️</div>
            </div>
          </div>
        )}

        {/* 宝箱阶段 */}
        {(phase === 'chest' || phase === 'reward') && (
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* 宝箱 */}
              <div className={`text-9xl transition-all duration-1000 ${chestOpen ? 'animate-bounce' : ''}`}>
                {chestOpen ? '🎉' : '🎁'}
              </div>

              {/* 宝箱打开时的金光 */}
              {chestOpen && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-yellow-300/50 rounded-full animate-ping"></div>
                </div>
              )}
            </div>

            {/* 奖励展示 */}
            {phase === 'reward' && (
              <div className="mt-8 animate-in zoom-in duration-500">
                <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl border-4 border-yellow-300 text-center">
                  <div className="text-6xl mb-4">{rewardType.emoji}</div>
                  <h2 className="text-2xl font-black text-gray-800 mb-2">恭喜获得！</h2>
                  <p className="text-lg text-gray-600 mb-4">{rewardType.name}</p>
                  <p className="text-sm text-gray-500 mb-6">已收藏到你的成就墙</p>

                  {/* 勋章卡片样式 */}
                  {rewardType.type === 'badge' && (
                    <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl p-4 border-2 border-yellow-300">
                      <div className="text-5xl mb-2">{rewardType.emoji}</div>
                      <div className="text-xs text-gray-500">今日成就勋章</div>
                    </div>
                  )}

                  {/* DUDU 皮肤卡片样式 */}
                  {rewardType.type === 'skin' && (
                    <div className="bg-gradient-to-br from-blue-100 to-sky-100 rounded-2xl p-4 border-2 border-blue-300">
                      <div className="text-5xl mb-2">{rewardType.emoji}</div>
                      <div className="text-xs text-gray-500">DUDU 新皮肤</div>
                    </div>
                  )}

                  <button
                    onClick={onContinue}
                    className="mt-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                  >
                    太棒了！继续探险 →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 彩带阶段提示 */}
        {phase === 'confetti' && (
          <div className="text-center animate-bounce">
            <h1 className="text-4xl font-black text-amber-600 mb-2">Amazing!</h1>
            <p className="text-xl text-gray-600">你收集了 8 颗星星！</p>
          </div>
        )}
      </div>
    </div>
  );
}

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

  // 首页欢迎语音状态
  const [duduSpeaking, setDuduSpeaking] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);

  // 语音钩子
  const { speak } = useSpeech(settings.voiceOn);

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

  // 首页欢迎语音 - 根据进度生成不同的话
  const playGreeting = () => {
    if (!settings.voiceOn) return;

    const collectedStars = Math.floor(stars / 3);
    let greeting = "";

    if (collectedStars >= 8) {
      greeting = "Wow! You did it! Amazing job today! Let's celebrate!";
    } else if (collectedStars === 0) {
      greeting = `Hey! Let's collect 8 stars to open the treasure box! Are you ready?`;
    } else if (collectedStars === 7) {
      greeting = "Just one more star! You can do it!";
    } else {
      greeting = `Hi! We need ${8 - collectedStars} more stars to open the treasure! Let's go!`;
    }

    setDuduSpeaking(true);
    speak(greeting);
    setTimeout(() => setDuduSpeaking(false), 3000);
  };

  // 首次访问自动播放欢迎语音
  useEffect(() => {
    if (view === 'home' && !hasGreeted && settings.voiceOn) {
      // 延迟一点播放，让页面先渲染
      const timer = setTimeout(() => {
        playGreeting();
        setHasGreeted(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [view]);

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
      if (mode === 'review_box') {
        setErrorMessage("宝箱现在是空的！先去学新东西，之后才能发现宝藏哦~ 🎁");
      } else {
        setErrorMessage("太棒了！今天任务都完成啦！");
      }
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

    // 检查是否完成每日8星任务
    const collectedStars = Math.floor(stars / 3);
    if (collectedStars >= 8) {
      setView('celebration');
    } else {
      setView('summary');
    }
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
    if (!item) {
      setView('home');
      return null;
    }
    const progress = progressMap[item.id] || { mastery: 0, streak: 0 };
    const progressPercent = ((currentIdx + 1) / sessionQueue.length) * 100;
    return <LessonView item={item} progress={progress} progressPercent={progressPercent} onResult={handleResult} onBack={() => setView('home')} feedback={feedback} settings={settings} />;
  }

  if (view === 'summary') {
    return <SummaryView sessionQueue={sessionQueue} setView={setView} stickers={stickers} settings={settings} />;
  }

  if (view === 'celebration') {
    return <CelebrationView collectedStars={Math.floor(stars / 3)} onContinue={() => setView('home')} settings={settings} />;
  }

  if (view === 'parent') {
    return <ParentView progressMap={progressMap} onBack={() => setView('home')} settings={settings} setSettings={setSettings} onResetData={handleResetData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white flex flex-col items-center justify-center p-4 w-full font-sans relative overflow-hidden">
      {/* 背景装饰云朵 - 暖色调 */}
      <svg className="absolute top-10 left-5 w-24 h-16 opacity-15 animate-float" style={{animationDelay: '0s'}} viewBox="0 0 100 60">
        <ellipse cx="50" cy="40" rx="40" ry="15" fill="#FED7AA"/>
        <circle cx="30" cy="35" r="15" fill="#FED7AA"/>
        <circle cx="70" cy="35" r="15" fill="#FED7AA"/>
        <circle cx="50" cy="30" r="18" fill="#FED7AA"/>
      </svg>
      <svg className="absolute top-24 right-8 w-20 h-12 opacity-15 animate-float" style={{animationDelay: '1s'}} viewBox="0 0 100 60">
        <ellipse cx="50" cy="40" rx="40" ry="15" fill="#FDE68A"/>
        <circle cx="30" cy="35" r="15" fill="#FDE68A"/>
        <circle cx="70" cy="35" r="15" fill="#FDE68A"/>
        <circle cx="50" cy="30" r="18" fill="#FDE68A"/>
      </svg>
      <svg className="absolute bottom-40 left-8 w-28 h-18 opacity-15 animate-float" style={{animationDelay: '2s'}} viewBox="0 0 100 60">
        <ellipse cx="50" cy="40" rx="40" ry="15" fill="#FCD34D"/>
        <circle cx="30" cy="35" r="15" fill="#FCD34D"/>
        <circle cx="70" cy="35" r="15" fill="#FCD34D"/>
        <circle cx="50" cy="30" r="18" fill="#FCD34D"/>
      </svg>
      <svg className="absolute bottom-24 right-5 w-20 h-12 opacity-15 animate-float" style={{animationDelay: '1.5s'}} viewBox="0 0 100 60">
        <ellipse cx="50" cy="40" rx="40" ry="15" fill="#FBBF24"/>
        <circle cx="30" cy="35" r="15" fill="#FBBF24"/>
        <circle cx="70" cy="35" r="15" fill="#FBBF24"/>
        <circle cx="50" cy="30" r="18" fill="#FBBF24"/>
      </svg>

      <ErrorModal errorMessage={errorMessage} onClose={() => setErrorMessage(null)} />

      <div className="w-full max-w-md flex flex-col gap-4 relative z-10">
        {/* 头部：超大号 DUDU - 活泼招手 */}
        <header className="flex flex-col items-center gap-3">
          {/* DUDU 主形象 - 放大到48，多重招手动画 */}
          <div className="relative cursor-pointer" onClick={playGreeting}>
            {/* 放大的 DUDU */}
            <Mascot
              speaking={duduSpeaking}
              mood={Math.floor(stars / 3) >= 8 ? "celebrating" : (duduSpeaking ? "excited" : "welcoming")}
              className="w-48 h-48"
            />
            {/* 左手招手动画 */}
            <div className="absolute left-0 top-1/3 -translate-x-4 text-5xl origin-right animate-[wave_1s_ease-in-out_infinite]" style={{ transformOrigin: '100% 50%' }}>👋</div>
            {/* 右手招手动画 */}
            <div className="absolute right-0 top-1/3 translate-x-4 text-5xl origin-left animate-[wave_1s_ease-in-out_infinite]" style={{ animationDelay: '0.5s', transformOrigin: '0% 50%' }}>👋</div>
            {/* 对话气泡 - 更大更醒目 */}
            <div className={`absolute -right-2 -top-4 bg-white rounded-3xl px-5 py-3 shadow-xl border-3 border-blue-300 ${duduSpeaking ? 'animate-pulse' : 'animate-bounce'}`} style={{ animationDuration: '2s' }}>
              <span className="text-base font-medium">
                {Math.floor(stars / 3) >= 8 ? "太棒了！🎉 点宝箱领奖！" :
                 stars === 0 ? "来玩吧！收集星星！✨" :
                 `还差 ${8 - Math.floor(stars / 3)} 颗星星!`}
              </span>
            </div>
            {/* 说话时的声波效果 */}
            {duduSpeaking && (
              <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex gap-1">
                <span className="w-2 h-5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-2 h-7 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            )}
          </div>
          {/* 简化的标题 - 不占用太多空间 */}
          <div className="text-center">
            <h1 className="text-2xl font-black text-gray-700">DUDU 天天英语</h1>
          </div>
        </header>

        {/* 今日目标 - 星星收集路径图 */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-4 shadow-lg border-b-4 border-orange-200">
          {/* 进度路径：星星收集到苹果，苹果指向下方宝箱 */}
          <div className="relative h-20 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-2xl overflow-hidden border-2 border-amber-100 mb-3">
            {/* 路径底纹 */}
            <div className="absolute top-1/2 left-4 right-16 h-3 bg-amber-200/50 -translate-y-1/2 rounded-full"></div>
            <div className="absolute top-1/2 left-4 right-16 h-1 bg-amber-300/70 -translate-y-1/2 rounded-full" style={{ background: 'repeating-linear-gradient(90deg, #fcd34d 0px, #fcd34d 10px, transparent 10px, transparent 20px)' }}></div>

            {/* 8颗星星位置 */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
              {[...Array(8)].map((_, i) => {
                const collected = i < Math.floor(stars / 3);
                const current = i === Math.floor(stars / 3) && stars % 3 !== 0;
                return (
                  <div key={i} className="relative flex flex-col items-center">
                    <div
                      className={`text-xl transition-all duration-500 ${
                        collected ? 'scale-110 drop-shadow-lg' : 'opacity-20 grayscale'
                      } ${current ? 'animate-bounce scale-125' : ''}`}
                    >
                      {collected || current ? '⭐' : '☆'}
                    </div>
                    {collected && i === Math.floor(stars / 3) - 1 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-yellow-300/50 rounded-full animate-ping"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 终点苹果 - 满星时跳动闪烁 */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className={`relative ${Math.floor(stars / 3) >= 8 ? 'animate-bounce' : ''}`} style={{ animationDuration: '0.8s' }}>
                {/* 苹果本体 */}
                <span className={`text-4xl ${Math.floor(stars / 3) >= 8 ? 'drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'opacity-50'}`}>
                  {Math.floor(stars / 3) >= 8 ? '🍎' : '🍏'}
                </span>
                {/* 满星时的闪光 */}
                {Math.floor(stars / 3) >= 8 && (
                  <>
                    <div className="absolute inset-0 bg-red-400/30 rounded-full animate-ping"></div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl animate-bounce">✨</div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-xl animate-bounce" style={{ animationDelay: '0.3s' }}>✨</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 箭头指向下方宝箱 - 满星时显示 */}
          {Math.floor(stars / 3) >= 8 && (
            <div className="flex flex-col items-center mb-3">
              <div className="flex flex-col items-center animate-bounce" style={{ animationDuration: '1s' }}>
                {/* 大箭头 */}
                <svg className="w-8 h-12 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                {/* 小星星点缀 */}
                <div className="flex gap-2">
                  <span className="text-amber-400 text-sm animate-pulse">✨</span>
                  <span className="text-amber-400 text-sm animate-pulse" style={{ animationDelay: '0.2s' }}>✨</span>
                  <span className="text-amber-400 text-sm animate-pulse" style={{ animationDelay: '0.4s' }}>✨</span>
                </div>
              </div>
            </div>
          )}

          {/* 下方神秘宝箱区域 */}
          <div className="relative">
            {/* 宝箱按钮 - 满星时可点击领奖 */}
            <button
              onClick={() => Math.floor(stars / 3) >= 8 && setView('celebration')}
              className={`w-full py-4 rounded-2xl transition-all flex items-center justify-center gap-3 relative overflow-hidden ${
                Math.floor(stars / 3) >= 8
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-lg shadow-amber-300/50 animate-[wiggle_1s_ease-in-out_infinite] cursor-pointer'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200'
              }`}
            >
              {/* 满星时的闪光效果 */}
              {Math.floor(stars / 3) >= 8 && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/0 via-yellow-300/30 to-yellow-300/0 animate-[shimmer_2s_infinite]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-20 h-20 bg-yellow-400/20 rounded-full animate-ping"></div>
                  </div>
                </>
              )}

              {/* 宝箱图标 */}
              <span className={`text-4xl ${Math.floor(stars / 3) >= 8 ? '' : 'grayscale opacity-50'}`}>
                {Math.floor(stars / 3) >= 8 ? '🎁' : '📦'}
              </span>

              {/* 文字 */}
              <span className={`font-bold ${Math.floor(stars / 3) >= 8 ? 'text-white' : 'text-gray-400'}`}>
                {Math.floor(stars / 3) >= 8 ? '神秘宝箱' : '收集8颗星星'}
              </span>

              {/* 满星时的星星环绕 */}
              {Math.floor(stars / 3) >= 8 && (
                <div className="absolute inset-0 animate-[spin_3s_linear_infinite] pointer-events-none">
                  <span className="absolute top-1 left-4 text-sm">⭐</span>
                  <span className="absolute top-1 right-4 text-sm">⭐</span>
                  <span className="absolute bottom-1 left-4 text-sm">⭐</span>
                  <span className="absolute bottom-1 right-4 text-sm">⭐</span>
                </div>
              )}
            </button>

            {/* 未满星时的进度提示 */}
            {Math.floor(stars / 3) < 8 && (
              <div className="text-center mt-2 text-sm text-gray-500 flex items-center justify-center gap-2">
                <span>再收</span>
                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">{8 - Math.floor(stars / 3)}</span>
                <span>颗星星</span>
                <span className="text-lg">⭐</span>
              </div>
            )}
          </div>
        </div>

        {/* 主按钮 - 暖色调激发行动力 */}
        <div className="space-y-3">
          {/* 开始探险按钮 - 大图标为主，文字辅助 */}
          <button
            onClick={() => startSession('daily')}
            className="w-full bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 hover:from-orange-500 hover:via-amber-500 hover:to-yellow-500 text-white p-5 rounded-3xl shadow-xl shadow-orange-300 transform active:scale-[0.97] transition-all flex items-center justify-center gap-4 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/50 to-amber-300/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>

            {/* 左侧大图标区 */}
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
              {/* 播放指示器 - 小三角在角落 */}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Icon path={Icons.Play} size={14} className="fill-orange-500 text-orange-500 ml-0.5" />
              </div>
            </div>

            {/* 右侧文字 */}
            <div className="flex flex-col items-start flex-1">
              <span className="text-xl font-black relative leading-tight">开始探险</span>
              <span className="text-xs opacity-90 font-medium">出发吧! Go!</span>
            </div>

            {/* 箭头指示 */}
            <div className="text-white/80">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>

          {/* 宝箱按钮 - 有待复习时发光摇晃 */}
          <button
            onClick={() => startSession('review_box')}
            className={`w-full relative ${homeStats.dueCount > 0 ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 shadow-lg shadow-amber-200/50' : 'bg-gray-100 text-gray-400'} p-4 rounded-2xl transform active:scale-[0.97] transition-all flex items-center justify-center gap-3 overflow-hidden ${homeStats.dueCount > 0 ? 'animate-[wiggle_1s_ease-in-out_infinite]' : ''}`}
          >
            {/* 宝箱闪光效果 */}
            {homeStats.dueCount > 0 && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/0 via-yellow-300/30 to-yellow-300/0 animate-[shimmer_2s_infinite]"></div>
                <div className="absolute -top-1 -right-1">
                  <div className="relative">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
              </>
            )}

            {/* 左侧大宝箱图标 */}
            <div className="relative">
              <div className={`w-14 h-14 ${homeStats.dueCount > 0 ? 'bg-white/20' : 'bg-white/10'} rounded-xl flex items-center justify-center`}>
                <span className="text-3xl">{homeStats.dueCount > 0 ? '🎁' : '📦'}</span>
              </div>
              {/* 宝藏数量徽章 - 大而明显 */}
              {homeStats.dueCount > 0 && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                  <span className="text-white text-sm font-black">{homeStats.dueCount}</span>
                </div>
              )}
            </div>

            {/* 右侧文字 */}
            <div className="flex flex-col items-start flex-1">
              <span className={`font-bold ${homeStats.dueCount > 0 ? 'text-white' : 'text-gray-400'} leading-tight`}>
                {homeStats.dueCount > 0 ? '神秘宝箱' : '空箱子'}
              </span>
              <span className={`text-xs ${homeStats.dueCount > 0 ? 'text-white/80' : 'text-gray-400'} font-medium`}>
                {homeStats.dueCount > 0 ? '打开找宝藏' : '没有宝藏'}
              </span>
            </div>

            {/* 打开图标 */}
            {homeStats.dueCount > 0 && (
              <div className="text-white/80">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            )}
          </button>
        </div>

        {/* 家长入口 - 小而明显 */}
        <button
          onClick={() => setView('parent')}
          className="self-center text-gray-400 hover:text-gray-600 p-3 rounded-full hover:bg-gray-100 transition-all flex items-center gap-2"
          title="家长专区"
        >
          <Icon path={Icons.Settings} size={18} />
          <span className="text-xs text-gray-400">家长</span>
        </button>
      </div>
    </div>
  );
}
