# 音频下载脚本

## 使用方法

### 方式一：使用 Python 脚本（推荐）

1. **安装 Python 依赖**：
   ```bash
   pip install requests gtts
   ```

2. **开启 VPN**（确保能访问 Google）

3. **运行脚本**：
   ```bash
   python scripts/download_audio.py
   ```

4. 音频文件会自动保存到 `public/audio/` 目录

### 方式二：使用 curl 命令（需要 VPN）

在 PowerShell 中运行：
```powershell
# 进入音频目录
cd public/audio

# 下载音频文件
curl -L "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=Apple" -o "apple.mp3"
curl -L "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=Banana" -o "banana.mp3"
curl -L "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=Cat" -o "cat.mp3"
# ... 其他单词
```

### 方式三：手动下载

1. 访问 https://forvo.com/
2. 搜索单词
3. 下载发音文件
4. 保存到 `public/audio/` 目录

## 需要的文件列表

- apple.mp3
- banana.mp3
- cat.mp3
- dog.mp3
- red.mp3
- blue.mp3
- green.mp3
- mom.mp3
- dad.mp3
- book.mp3
- pen.mp3
- sun.mp3
- moon.mp3
- water.mp3
- bird.mp3
- fish.mp3
- car.mp3
- bus.mp3
- hello_world.mp3
- good_morning.mp3

## 注意事项

- 下载音频文件需要能访问 Google 服务（建议使用 VPN）
- 如果没有本地音频，应用会自动回退到浏览器内置的 Web Speech API
- Web Speech API 首次使用时也需要下载语音包
