#!/bin/bash
# Detailed Delhi episode render script
# Creates sequential scenes with descriptions

# Color palette for Delhi history
declare -A COLORS
COLORS[ancient]="#D4AF37"      # Gold - ancient Indraprastha
COLORS[mughal]="#8B4513"      # SaddleBrown - Mughal architecture
COLORS[british]="#2F4F4F"      # DarkSlateGray - British colonial
COLORS[modern]="#4169E1"       # RoyalBlue - Modern Delhi

# Function to create scene
create_scene() {
    local name=$1
    local color=$2
    local duration=$3
    local desc=$4

    echo "Creating scene: $name ($color, ${duration}s)"

    ffmpeg -f lavfi -i color=c=$color:s=1920x1080:d=$duration \
        -c:v libx264 -pix_fmt yuv420p -r 30 -t $duration \
        -y output/scenes/${name}.mp4 2>/dev/null
}

# Create scenes directory
mkdir -p output/scenes

# Scene 1: The Mystery
create_scene "01-mystery" "#000000" 2 "Dilli ka sheher kahan se aaya?"

# Scene 2: Ancient Indraprastha
create_scene "02-indraprastha" "#D4AF37" 2 "Mahabharat ka Indraprastha"

# Scene 3: Tomar Dynasty
create_scene "03-tomar" "#CD853F" 2 "Tomaron ne basaya Dilli"

# Scene 4: Tomar to Ghurids
create_scene "04-ghuris" "#8B4513" 2 "Muhammad Ghori ne jeet li"

# Scene 5: Delhi Sultanate
create_scene "05-sultanate" "#2F4F4F" 2 "5 Sultan, 5 Qila"

# Scene 6: Qutub Minar
create_scene "06-qutub" "#8B4513" 2 "1206 - Qutub Minar banga"

# Scene 7: Mughal Era Begins
create_scene "07-mughal" "#FFD700" 2 "Babur ne aaya 1526"

# Scene 8: Akbar's Golden Age
create_scene "08-akbar" "#FFD700" 2 "Akbar ka reign, Fatehpur Sikri"

# Scene 9: Shahjahanabad
create_scene "09-shahjahanabad" "#CD5C5C" 2 "Shah Jahan ne banaya purana Dilli"

# Scene 10: The Pink City
create_scene "10-pink-city" "#FFB6C1" 2 "Jaipur wajik, lekin Dilli bhi"

# Scene 11: British Raj
create_scene "11-british" "#4682B4" 2 "1857 ke baad, British Dilli"

# Scene 12: Partition & Independence
create_scene "12-partition" "#DC143C" 2 "1947 - Azadi, naya Dilli"

# Scene 13: Modern Capital
create_scene "13-modern" "#32CD32" 2 "Metro, Akshardham, Diplomatic Enclave"

# Scene 14: Future Delhi
create_scene "14-future" "#9370DB" 2 "Smart City, AYUSH bharat"

# Add narration to each scene
for scene in output/scenes/*.mp4; do
    base=$(basename "$scene" .mp4)
    ffmpeg -i "$scene" -i epoch-engine/mix.wav \
        -c:v copy -c:a aac -b:a 128k -shortest \
        -y "${scene%.mp4}-with-audio.mp4" 2>/dev/null
done

echo "All scenes rendered!"