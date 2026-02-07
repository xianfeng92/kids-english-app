#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Audio File Download Script for DUDU English Learning App

Usage:
1. Make sure VPN is enabled and can access Google services
2. Install dependencies: pip install requests gtts
3. Run script: python download_audio.py
4. Audio files will be saved to ../public/audio/ directory
"""

import os
import sys
import requests
from gtts import gTTS
import time

# Set UTF-8 encoding for Windows console
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Word list
WORDS = [
    ('Apple', 'apple.mp3'),
    ('Banana', 'banana.mp3'),
    ('Cat', 'cat.mp3'),
    ('Dog', 'dog.mp3'),
    ('Red', 'red.mp3'),
    ('Blue', 'blue.mp3'),
    ('Green', 'green.mp3'),
    ('Mom', 'mom.mp3'),
    ('Dad', 'dad.mp3'),
    ('Book', 'book.mp3'),
    ('Pen', 'pen.mp3'),
    ('Sun', 'sun.mp3'),
    ('Moon', 'moon.mp3'),
    ('Water', 'water.mp3'),
    ('Bird', 'bird.mp3'),
    ('Fish', 'fish.mp3'),
    ('Car', 'car.mp3'),
    ('Bus', 'bus.mp3'),
    ('Hello world', 'hello_world.mp3'),
    ('Good morning', 'good_morning.mp3'),
]

# Output directory
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio')

# Make sure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

print("=" * 50)
print("DUDU English - Audio Download Script")
print("=" * 50)
print(f"\nOutput directory: {OUTPUT_DIR}")
print("\nPlease make sure VPN is enabled and can access Google services\n")

# Test network connection
print("Testing network connection...")
try:
    response = requests.get('https://www.google.com', timeout=10)
    print("OK - Google connection is working!\n")
except requests.exceptions.RequestException:
    print("ERROR - Cannot connect to Google, please check VPN")
    input("Press Enter to exit...")
    sys.exit(1)

# Download audio files
success_count = 0
fail_count = 0

for i, (word, filename) in enumerate(WORDS, 1):
    filepath = os.path.join(OUTPUT_DIR, filename)

    # Check if file already exists
    if os.path.exists(filepath):
        print(f"[{i}/{len(WORDS)}] SKIP {word} (already exists)")
        success_count += 1
        continue

    try:
        print(f"[{i}/{len(WORDS)}] Downloading {word} -> {filename}")

        # Use gTTS to generate audio
        tts = gTTS(text=word, lang='en', slow=False)
        tts.save(filepath)

        print(f"            OK - Done")
        success_count += 1

        # Delay to avoid too fast requests
        time.sleep(0.5)

    except Exception as e:
        print(f"            FAILED - {e}")
        fail_count += 1

# Print result
print("\n" + "=" * 50)
print(f"Download complete!")
print(f"  Success: {success_count} files")
print(f"  Failed: {fail_count} files")
print(f"  Directory: {OUTPUT_DIR}")
print("=" * 50)

if fail_count > 0:
    print("\nTip: You can re-run this script later for failed files")

input("\nPress Enter to exit...")
