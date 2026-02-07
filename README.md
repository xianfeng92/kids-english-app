<div align="center">

# ☁️ DUDU's Adventure World

### 游戏化儿童英语学习应用 | Gamified English Learning for Kids

[![Live Demo](https://img.shields.io/badge/Demo-Online-brightgreen?logo=github-pages)](https://xianfeng92.github.io/kids-english-app/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[English](#english) | [中文](#中文)

</div>

---

## 中文

## ✨ 项目简介

**DUDU's Adventure World** 是一款专为 3-8 岁儿童设计的英语学习应用。通过游戏化机制、多感官交互和可爱的 IP 形象，让英语学习像探险一样有趣。

- **280+ 词汇量**：涵盖水果、动物、颜色、家庭、学校、自然、交通、食物、身体、数字、服装、玩具等 12+ 主题
- **零依赖架构**：无需后端，纯前端实现
- **离线可用**：本地音频优先，无网络也能学习
- **隐私安全**：所有数据存储在浏览器本地

## 📸 项目截图

### 启动页 | Splash Screen
每次打开应用，DUDU 都会用温暖的 3D 形象欢迎小朋友进入冒险世界。

<!-- 请添加启动页截图到 public/screenshots/splash.png 并取消下方注释 -->
<!-- <img src="/screenshots/splash.png" alt="启动页截图" width="400"> -->

### 首页 | Home Page
探索不同主题，开启英语学习冒险之旅。

<!-- 请添加首页截图到 public/screenshots/home.png 并取消下方注释 -->
<!-- <img src="/screenshots/home.png" alt="首页截图" width="400"> -->

### 学习页 | Learning Page
大图标、发音按钮，多感官互动让学习更有效。

<!-- 请添加学习页截图到 public/screenshots/learning.png 并取消下方注释 -->
<!-- <img src="/screenshots/learning.png" alt="学习页截图" width="400"> -->

### 庆祝时刻 | Celebration
收集星星解锁宝箱，满屏特效带来成就感。

<!-- 请添加庆祝页截图到 public/screenshots/celebration.png 并取消下方注释 -->
<!-- <img src="/screenshots/celebration.png" alt="庆祝截图" width="400"> -->

---

## 核心特色

### 🚀 身份认同 (Identity Anchor)
| 启动页体验 | 每次打开 App 都展示 3D 头像和 "DUDU's Adventure World" 标识 |
|-----------|--------------------------------------------------------|
| 专属归属感 | 强调"这是我的地盘"，让孩子与 DUDU 建立情感连接 |
| 沉浸式入场 | 浮动头像、旋转光环、3D 文字特效营造探险氛围 |

### 🎮 游戏化学习
- **星星收集路径**：可视化的进度展示，每学会一个词就能看到星星亮起
- **神秘宝箱机制**：收集 8 颗星星解锁宝箱，满屏庆祝特效带来强烈成就感
- **随机奖励系统**：完成学习获得贴纸，满星后解锁勋章或 DUDU 限定皮肤

### ☁️ DUDU 云朵精灵 IP
- **情绪同步**：DUDU 会根据学习状态变化表情（开心、思考、庆祝）
- **语音交互**：点击 DUDU 可以听到英语问候和鼓励
- **生动动画**：说话时嘴巴张合、招手打招呼、撒花庆祝

### 🧠 多模态记忆强化
- **视觉+听觉+触觉**：大图标、发音按钮、手势操作多管齐下
- **奖励预览**：学习页顶部始终展示宝箱图标，暗示坚持有回报
- **闪电提问**：证明"真的懂了"的互动问答，增强记忆深度

### 👨‍👩‍👧 家长友好
- **家长锁**：重置数据需要回答数学题，防止孩子误操作
- **AI 学情分析**：详细的学习报告、薄弱词列表、个性化建议
- **完全本地化**：数据存储在浏览器，隐私安全

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装

```bash
# 克隆项目
git clone https://github.com/xianfeng92/kids-english-app.git
cd kids-english-app

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 添加音频（可选）

将真人发音的 mp3 文件放入 `public/audio/` 目录，文件名格式：

```
apple.mp3, banana.mp3, cat.mp3, dog.mp3,
red.mp3, blue.mp3, green.mp3, mom.mp3, dad.mp3,
book.mp3, pen.mp3, sun.mp3, moon.mp3, water.mp3,
bird.mp3, fish.mp3, car.mp3, bus.mp3,
hello_world.mp3, good_morning.mp3
```

> 详细说明请查看 [`public/audio/README.md`](public/audio/README.md)

## 设计理念

### 1. 身份认同设计
- **启动页锚点**：3D 头像 + "DUDU's Adventure World" 建立第一印象
- **个人中心标识**：首页顶部展示 DUDU 形象，强化归属感
- **我的地盘**：每次进入都强调这是专属的冒险世界

### 2. 减少文字依赖
针对不识字的孩子，所有按钮都配有：
- 大图标（播放、宝箱、星星等）
- 视觉反馈（动画、颜色变化）
- 最少的必要文字

### 3. 温暖色彩心理学
- 主色调：橙色、黄色（活力、温暖）
- 错误反馈：使用琥珀色而非红色（减少挫败感）
- "听不懂"按钮：暖色调 + "再听一次"文案

### 4. 即时反馈循环
- 答对：撒花、星星、正向语音
- 答错：温和鼓励、不过度惩罚
- 进度可见：每一步都有视觉确认

### 5. 因果关联强化
- 星星路径 → 苹果 → 宝箱的视觉连接
- 满星时苹果跳动、箭头指向宝箱
- 点击宝箱触发满屏庆祝特效

## 技术栈

| 技术 | 用途 |
|-----|------|
| React 18 | UI 框架 |
| Vite 5 | 构建工具 |
| Tailwind CSS | 样式框架 |
| Web Speech API | 语音合成（回退方案） |
| HTML5 Audio | 本地音频播放（优先） |
| LocalStorage | 数据持久化 |

## 学习算法

应用使用 **间隔重复 (Spaced Repetition)** 算法：

- 根据答题结果调整下次复习时间
- 连续答对会增加掌握等级（Lv.1-5）
- 答错后会缩短复习间隔，加强练习

## AI 功能（可选）

如需使用 AI 功能（魔法百科），在 `.env` 文件中配置：

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

> 警告：请勿提交真实的 API 密钥到仓库

## 数据存储

所有学习数据存储在浏览器本地：

| Key | 说明 |
|-----|------|
| `kids_app_progress` | 学习进度 |
| `kids_app_stars` | 收集的星星 |
| `kids_app_stickers` | 获得的贴纸 |
| `kids_app_settings` | 用户设置 |

> 清除浏览器数据会重置所有进度

## 项目结构

```
kids-english-app/
├── public/
│   └── audio/          # 本地音频文件
├── src/
│   ├── App.jsx         # 主应用（包含所有组件）
│   ├── index.css       # 全局样式和动画
│   └── main.jsx        # 应用入口
├── index.html          # HTML 模板
├── package.json        # 项目配置
└── README.md           # 项目说明
```

## 浏览器支持

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| >= 90  | >= 88   | >= 14  | >= 90 |

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 路线图

- [ ] 多用户支持（兄弟姐妹各自进度）
- [ ] 更多主题词汇（食物、服装、玩具等）
- [ ] 语音识别评测功能
- [ ] 离线 PWA 支持
- [ ] 多语言界面（英文、中文、日文）

## 许可证

本项目采用 [MIT](LICENSE) 许可证。

---

## English

## ✨ Introduction

**DUDU's Adventure World** is an English learning app designed for children aged 3-8. Through gamification, multi-sensory interaction, and an adorable IP mascot, English learning becomes an exciting adventure.

- **280+ Vocabulary Words**: Covering 12+ themes including fruits, animals, colors, family, school, nature, transportation, food, body, numbers, clothes, and toys
- **Zero Backend**: Pure frontend implementation
- **Offline Ready**: Local audio priority, works without internet
- **Privacy First**: All data stored locally in browser

## Key Features

### 🚀 Identity Anchor
| Splash Screen | 3D avatar with "DUDU's Adventure World" branding on every launch |
|---------------|--------------------------------------------------------------|
| Sense of Belonging | "This is my world" - builds emotional connection with DUDU |
| Immersive Entry | Floating avatar, rotating halo, 3D text effects create adventure atmosphere |

### 🎮 Gamified Learning
- **Star Collection Path**: Visual progress tracking, stars light up as you learn
- **Mystery Treasure Box**: Collect 8 stars to unlock, celebration effects bring achievement
- **Random Rewards**: Earn stickers, unlock badges and DUDU skins

### ☁️ DUDU Cloud Sprite Mascot
- **Emotion Sync**: DUDU's expressions change with learning state (happy, thinking, celebrating)
- **Voice Interaction**: Click DUDU to hear English greetings and encouragement
- **Lively Animations**: Mouth moves when speaking, waving hands, confetti celebrations

### 👨‍👩‍👧 Parent Friendly
- **Parent Lock**: Math quiz required to reset data
- **AI Learning Analytics**: Detailed reports, weak areas, personalized suggestions
- **Privacy First**: All data stored locally

## Quick Start

### Requirements

- Node.js >= 16.0.0
- npm >= 7.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/xianfeng92/kids-english-app.git
cd kids-english-app

# Install dependencies
npm install
```

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding Audio (Optional)

Add native pronunciation mp3 files to `public/audio/` directory:

```
apple.mp3, banana.mp3, cat.mp3, dog.mp3,
red.mp3, blue.mp3, green.mp3, mom.mp3, dad.mp3,
book.mp3, pen.mp3, sun.mp3, moon.mp3, water.mp3,
bird.mp3, fish.mp3, car.mp3, bus.mp3,
hello_world.mp3, good_morning.mp3
```

> See [`public/audio/README.md`](public/audio/README.md) for details

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite 5 | Build Tool |
| Tailwind CSS | Styling |
| Web Speech API | Text-to-Speech (fallback) |
| HTML5 Audio | Local Audio Playback (priority) |
| LocalStorage | Data Persistence |

## Learning Algorithm

The app uses a **Spaced Repetition** algorithm:

- Review intervals adjust based on answer results
- Consecutive correct answers increase mastery level (Lv.1-5)
- Wrong answers shorten review intervals for reinforcement

## Browser Support

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| >= 90  | >= 88   | >= 14  | >= 90 |

## Contributing

Issues and Pull Requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT](LICENSE) License.

---

<div align="center">

Made with ☁️ for kids learning English

[Back to Top](#-dudus-adventure-world)

</div>
