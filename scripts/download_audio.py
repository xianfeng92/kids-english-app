#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Audio File Download Script for DUDU English Learning App - 250+ words

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

# Word list - matches ITEMS_DB in App.jsx (250+ items)
WORDS = [
    # Fruits (16)
    ('Apple', 'apple.mp3'),
    ('Banana', 'banana.mp3'),
    ('Orange', 'orange.mp3'),
    ('Grape', 'grape.mp3'),
    ('Strawberry', 'strawberry.mp3'),
    ('Peach', 'peach.mp3'),
    ('Pear', 'pear.mp3'),
    ('Watermelon', 'watermelon.mp3'),
    ('Cherry', 'cherry.mp3'),
    ('Lemon', 'lemon.mp3'),
    ('Mango', 'mango.mp3'),
    ('Kiwi', 'kiwi.mp3'),
    ('Pineapple', 'pineapple.mp3'),
    ('Coconut', 'coconut.mp3'),
    ('Papaya', 'papaya.mp3'),
    ('Avocado', 'avocado.mp3'),

    # Vegetables (14)
    ('Tomato', 'tomato.mp3'),
    ('Potato', 'potato.mp3'),
    ('Carrot', 'carrot.mp3'),
    ('Onion', 'onion.mp3'),
    ('Corn', 'corn.mp3'),
    ('Broccoli', 'broccoli.mp3'),
    ('Cucumber', 'cucumber.mp3'),
    ('Pepper', 'pepper.mp3'),
    ('Eggplant', 'eggplant.mp3'),
    ('Cabbage', 'cabbage.mp3'),
    ('Lettuce', 'lettuce.mp3'),
    ('Spinach', 'spinach.mp3'),
    ('Pumpkin', 'pumpkin.mp3'),
    ('Mushroom', 'mushroom.mp3'),

    # Animals (28)
    ('Cat', 'cat.mp3'),
    ('Dog', 'dog.mp3'),
    ('Bird', 'bird.mp3'),
    ('Fish', 'fish.mp3'),
    ('Rabbit', 'rabbit.mp3'),
    ('Duck', 'duck.mp3'),
    ('Chicken', 'chicken.mp3'),
    ('Cow', 'cow.mp3'),
    ('Pig', 'pig.mp3'),
    ('Horse', 'horse.mp3'),
    ('Elephant', 'elephant.mp3'),
    ('Lion', 'lion.mp3'),
    ('Tiger', 'tiger.mp3'),
    ('Monkey', 'monkey.mp3'),
    ('Sheep', 'sheep.mp3'),
    ('Goat', 'goat.mp3'),
    ('Mouse', 'mouse.mp3'),
    ('Panda', 'panda.mp3'),
    ('Bear', 'bear.mp3'),
    ('Fox', 'fox.mp3'),
    ('Wolf', 'wolf.mp3'),
    ('Deer', 'deer.mp3'),
    ('Zebra', 'zebra.mp3'),
    ('Giraffe', 'giraffe.mp3'),
    ('Penguin', 'penguin.mp3'),
    ('Octopus', 'octopus.mp3'),
    ('Butterfly', 'butterfly.mp3'),
    ('Bee', 'bee.mp3'),
    ('Ant', 'ant.mp3'),
    ('Snake', 'snake.mp3'),
    ('Frog', 'frog.mp3'),

    # Colors (12)
    ('Red', 'red.mp3'),
    ('Blue', 'blue.mp3'),
    ('Green', 'green.mp3'),
    ('Yellow', 'yellow.mp3'),
    ('White', 'white.mp3'),
    ('Black', 'black.mp3'),
    ('Pink', 'pink.mp3'),
    ('Purple', 'purple.mp3'),
    ('Orange', 'orange_color.mp3'),
    ('Brown', 'brown.mp3'),
    ('Gray', 'gray.mp3'),
    ('Gold', 'gold.mp3'),
    ('Silver', 'silver.mp3'),

    # Family (9)
    ('Mom', 'mom.mp3'),
    ('Dad', 'dad.mp3'),
    ('Baby', 'baby.mp3'),
    ('Boy', 'boy.mp3'),
    ('Girl', 'girl.mp3'),
    ('Sister', 'sister.mp3'),
    ('Brother', 'brother.mp3'),
    ('Grandma', 'grandma.mp3'),
    ('Grandpa', 'grandpa.mp3'),

    # School (16)
    ('Book', 'book.mp3'),
    ('Pen', 'pen.mp3'),
    ('Pencil', 'pencil.mp3'),
    ('Bag', 'bag.mp3'),
    ('Teacher', 'teacher.mp3'),
    ('School', 'school.mp3'),
    ('Desk', 'desk.mp3'),
    ('Chair', 'chair.mp3'),
    ('Paper', 'paper.mp3'),
    ('Eraser', 'eraser.mp3'),
    ('Ruler', 'ruler.mp3'),
    ('Glue', 'glue.mp3'),
    ('Scissors', 'scissors.mp3'),
    ('Backpack', 'backpack.mp3'),
    ('Crayon', 'crayon.mp3'),
    ('Paint', 'paint.mp3'),

    # Nature (17)
    ('Sun', 'sun.mp3'),
    ('Moon', 'moon.mp3'),
    ('Water', 'water.mp3'),
    ('Star', 'star.mp3'),
    ('Cloud', 'cloud.mp3'),
    ('Rain', 'rain.mp3'),
    ('Snow', 'snow.mp3'),
    ('Tree', 'tree.mp3'),
    ('Flower', 'flower.mp3'),
    ('Grass', 'grass.mp3'),
    ('Wind', 'wind.mp3'),
    ('Thunder', 'thunder.mp3'),
    ('Lightning', 'lightning.mp3'),
    ('Forest', 'forest.mp3'),
    ('River', 'river.mp3'),
    ('Ocean', 'ocean.mp3'),
    ('Rainbow', 'rainbow.mp3'),
    ('Beach', 'beach.mp3'),
    ('Sand', 'sand.mp3'),
    ('Rock', 'rock.mp3'),
    ('Fire', 'fire.mp3'),

    # Transport (16)
    ('Car', 'car.mp3'),
    ('Bus', 'bus.mp3'),
    ('Train', 'train.mp3'),
    ('Plane', 'plane.mp3'),
    ('Boat', 'boat.mp3'),
    ('Bike', 'bike.mp3'),
    ('Rocket', 'rocket.mp3'),
    ('Motorcycle', 'motorcycle.mp3'),
    ('Truck', 'truck.mp3'),
    ('Taxi', 'taxi.mp3'),
    ('Subway', 'subway.mp3'),
    ('Ship', 'ship.mp3'),
    ('Sailboat', 'sailboat.mp3'),
    ('Ambulance', 'ambulance.mp3'),
    ('Police car', 'police_car.mp3'),
    ('Fire truck', 'fire_truck.mp3'),

    # Food (19)
    ('Bread', 'bread.mp3'),
    ('Milk', 'milk.mp3'),
    ('Egg', 'egg.mp3'),
    ('Cake', 'cake.mp3'),
    ('Ice cream', 'ice_cream.mp3'),
    ('Cookie', 'cookie.mp3'),
    ('Pizza', 'pizza.mp3'),
    ('Rice', 'rice.mp3'),
    ('Noodles', 'noodles.mp3'),
    ('Cheese', 'cheese.mp3'),
    ('Hamburger', 'hamburger.mp3'),
    ('Hot dog', 'hot_dog.mp3'),
    ('Candy', 'candy.mp3'),
    ('Chocolate', 'chocolate.mp3'),
    ('Juice', 'juice.mp3'),
    ('Sandwich', 'sandwich.mp3'),
    ('Soup', 'soup.mp3'),
    ('Salad', 'salad.mp3'),
    ('Yogurt', 'yogurt.mp3'),

    # Body (15)
    ('Head', 'head.mp3'),
    ('Face', 'face.mp3'),
    ('Eye', 'eye.mp3'),
    ('Ear', 'ear.mp3'),
    ('Nose', 'nose.mp3'),
    ('Mouth', 'mouth.mp3'),
    ('Tooth', 'tooth.mp3'),
    ('Tongue', 'tongue.mp3'),
    ('Hair', 'hair.mp3'),
    ('Hand', 'hand.mp3'),
    ('Arm', 'arm.mp3'),
    ('Finger', 'finger.mp3'),
    ('Leg', 'leg.mp3'),
    ('Foot', 'foot.mp3'),
    ('Knee', 'knee.mp3'),
    ('Shoulder', 'shoulder.mp3'),

    # Numbers (15)
    ('One', 'one.mp3'),
    ('Two', 'two.mp3'),
    ('Three', 'three.mp3'),
    ('Four', 'four.mp3'),
    ('Five', 'five.mp3'),
    ('Six', 'six.mp3'),
    ('Seven', 'seven.mp3'),
    ('Eight', 'eight.mp3'),
    ('Nine', 'nine.mp3'),
    ('Ten', 'ten.mp3'),
    ('Twenty', 'twenty.mp3'),
    ('Thirty', 'thirty.mp3'),
    ('Forty', 'forty.mp3'),
    ('Fifty', 'fifty.mp3'),
    ('Hundred', 'hundred.mp3'),

    # Clothes (12)
    ('Hat', 'hat.mp3'),
    ('Cap', 'cap.mp3'),
    ('Shirt', 'shirt.mp3'),
    ('T-shirt', 't_shirt.mp3'),
    ('Shoes', 'shoes.mp3'),
    ('Dress', 'dress.mp3'),
    ('Pants', 'pants.mp3'),
    ('Jeans', 'jeans.mp3'),
    ('Skirt', 'skirt.mp3'),
    ('Coat', 'coat.mp3'),
    ('Jacket', 'jacket.mp3'),
    ('Sweater', 'sweater.mp3'),
    ('Socks', 'socks.mp3'),
    ('Gloves', 'gloves.mp3'),
    ('Scarf', 'scarf.mp3'),
    ('Belt', 'belt.mp3'),

    # Toys (8)
    ('Ball', 'ball.mp3'),
    ('Doll', 'doll.mp3'),
    ('Kite', 'kite.mp3'),
    ('Balloon', 'balloon.mp3'),
    ('Toy', 'toy.mp3'),
    ('Puzzle', 'puzzle.mp3'),
    ('Game', 'game.mp3'),
    ('Drum', 'drum.mp3'),
    ('Trumpet', 'trumpet.mp3'),
    ('Guitar', 'guitar.mp3'),
    ('Piano', 'piano.mp3'),

    # House (8)
    ('House', 'house.mp3'),
    ('Room', 'room.mp3'),
    ('Bed', 'bed.mp3'),
    ('Window', 'window.mp3'),
    ('Door', 'door.mp3'),
    ('Kitchen', 'kitchen.mp3'),
    ('Bathroom', 'bathroom.mp3'),
    ('Garden', 'garden.mp3'),

    # Shapes (8)
    ('Circle', 'circle.mp3'),
    ('Square', 'square.mp3'),
    ('Triangle', 'triangle.mp3'),
    ('Rectangle', 'rectangle.mp3'),
    ('Star', 'star_shape.mp3'),
    ('Heart', 'heart.mp3'),
    ('Diamond', 'diamond.mp3'),
    ('Oval', 'oval.mp3'),

    # Directions (8)
    ('Up', 'up.mp3'),
    ('Down', 'down.mp3'),
    ('Left', 'left.mp3'),
    ('Right', 'right.mp3'),
    ('Front', 'front.mp3'),
    ('Back', 'back.mp3'),
    ('Inside', 'inside.mp3'),
    ('Outside', 'outside.mp3'),

    # Feelings (8)
    ('Happy', 'happy.mp3'),
    ('Sad', 'sad.mp3'),
    ('Angry', 'angry.mp3'),
    ('Tired', 'tired.mp3'),
    ('Scared', 'scared.mp3'),
    ('Surprised', 'surprised.mp3'),
    ('Excited', 'excited.mp3'),
    ('Sick', 'sick.mp3'),

    # Greetings & Phrases (45)
    ('Hello world', 'hello_world.mp3'),
    ('Good morning', 'good_morning.mp3'),
    ('Good night', 'good_night.mp3'),
    ('Thank you', 'thank_you.mp3'),
    ('Please', 'please.mp3'),
    ('Sorry', 'sorry.mp3'),
    ('I love you', 'i_love_you.mp3'),
    ('How are you', 'how_are_you.mp3'),
    ('Nice to meet you', 'nice_to_meet_you.mp3'),
    ('See you', 'see_you.mp3'),
    ('Have a nice day', 'have_a_nice_day.mp3'),
    ('My name is', 'my_name_is.mp3'),
    ('I am hungry', 'i_am_hungry.mp3'),
    ('I am thirsty', 'i_am_thirsty.mp3'),
    ('Let is go', 'lets_go.mp3'),
    ('See you later', 'see_you_later.mp3'),
    ('Good job', 'good_job.mp3'),
    ('What is your name', 'what_is_your_name.mp3'),
    ('How old are you', 'how_old_are_you.mp3'),
    ('Where are you from', 'where_are_you_from.mp3'),
    ('What do you like', 'what_do_you_like.mp3'),
    ('Let us play', 'let_us_play.mp3'),
    ('I do not understand', 'i_do_not_understand.mp3'),
    ('Can you help me', 'can_you_help_me.mp3'),
    ('You are welcome', 'you_are_welcome.mp3'),
    ('No problem', 'no_problem.mp3'),
    ('I do not know', 'i_do_not_know.mp3'),
    ('I like it', 'i_like_it.mp3'),
    ('I want this', 'i_want_this.mp3'),
    ('Look at this', 'look_at_this.mp3'),
    ('Come here', 'come_here.mp3'),
    ('Go away', 'go_away.mp3'),
    ('Stop', 'stop.mp3'),
    ('Wait', 'wait.mp3'),
    ('Go', 'go.mp3'),
    ('Run', 'run.mp3'),
    ('Jump', 'jump.mp3'),
    ('Dance', 'dance.mp3'),
    ('Sing a song', 'sing_a_song.mp3'),
    ('Draw a picture', 'draw_a_picture.mp3'),
]

# Output directory
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio')

# Make sure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

print("=" * 50)
print("DUDU English - Audio Download Script (250+ words)")
print("=" * 50)
print(f"\nOutput directory: {OUTPUT_DIR}")
print(f"Total files: {len(WORDS)}")
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
skip_count = 0

for i, (word, filename) in enumerate(WORDS, 1):
    filepath = os.path.join(OUTPUT_DIR, filename)

    # Check if file already exists
    if os.path.exists(filepath):
        print(f"[{i}/{len(WORDS)}] SKIP {word} (already exists)")
        skip_count += 1
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
        time.sleep(0.3)

    except Exception as e:
        print(f"            FAILED - {e}")
        fail_count += 1

# Print result
print("\n" + "=" * 50)
print(f"Download complete!")
print(f"  Success: {success_count} files")
print(f"  Skipped: {skip_count} files (already existed)")
print(f"  Failed: {fail_count} files")
print(f"  Total: {len(WORDS)} files")
print(f"  Directory: {OUTPUT_DIR}")
print("=" * 50)

if fail_count > 0:
    print("\nTip: You can re-run this script later for failed files")

input("\nPress Enter to exit...")
