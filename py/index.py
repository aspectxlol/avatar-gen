import os
import subprocess

# Directory containing the PNG files
DIR = "avatar-gen/avatars"
OUTDIR = "avatar-gen/avatars-svg"

# Get all PNG files in the directory
png_files = [f for f in os.listdir(DIR) if f.endswith('.png')]

animals = []

# Iterate over all PNG files
for png_file in png_files:
    # Remove the file extension
    filename = os.path.splitext(png_file)[0]

    # Convert PNG to PNM
    subprocess.run(
        ["convert", f"{DIR}/{png_file}", f"{DIR}/{filename}.pnm"], check=False)

    # Convert PNM to SVG
    subprocess.run(["potrace", f"{DIR}/{filename}.pnm",
                   "-s", "-o", f"{OUTDIR}/{filename}.svg"], check=False)
    animals.append(filename)

with open("avatar-gen/animals.txt", "w") as f:
    for animal in animals:
        f.write(f"{animal}\n")
    f.close()
