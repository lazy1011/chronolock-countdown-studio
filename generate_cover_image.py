#!/usr/bin/env python3
import math
from PIL import Image, ImageDraw, ImageFont

def create_cover():
    width = 1200
    height = 630
    img = Image.new('RGB', (width, height), color=(3, 7, 18))
    draw = ImageDraw.Draw(img)

    # Draw gradient background
    for y in range(height):
        ratio = y / height
        r = int(3 * (1 - ratio) + 15 * ratio)
        g = int(7 * (1 - ratio) + 23 * ratio)
        b = int(18 * (1 - ratio) + 45 * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Draw glowing orb
    centerX, centerY = 880, 220
    for rad in range(350, 0, -2):
        alpha = int(35 * (1 - rad / 350))
        # Draw soft concentric circles
        draw.ellipse([centerX - rad, centerY - rad, centerX + rad, centerY + rad],
                     fill=(99, 102, 241, alpha) if alpha > 0 else None)

    # Header Badge
    draw.rounded_rectangle([70, 60, 480, 95], radius=10, fill=(30, 27, 75), outline=(99, 102, 241), width=1)
    
    # Try system fonts, fallback to default
    try:
        font_tag = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 14)
        font_title = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 46)
        font_sub = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 22)
        font_card_head = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 18)
        font_digits = ImageFont.truetype("/System/Library/Fonts/Supplemental/Courier New Bold.ttf", 36)
        font_digits_sub = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 11)
        font_ms = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 15)
        font_quote = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Italic.ttf", 16)
    except:
        font_tag = ImageFont.load_default()
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_card_head = ImageFont.load_default()
        font_digits = ImageFont.load_default()
        font_digits_sub = ImageFont.load_default()
        font_ms = ImageFont.load_default()
        font_quote = ImageFont.load_default()

    draw.text((90, 70), "HANDSHAKE AI SKILLS STUDIO × GOOGLE", fill=(165, 180, 252), font=font_tag)

    # Main Project Title
    draw.text((70, 115), "ChronoLock AI Studio", fill=(255, 255, 255), font=font_title)
    
    # Subtitle
    draw.text((70, 175), "Your Deadline, Your Design • Glanceable Countdown Lock Screen", fill=(148, 163, 184), font=font_sub)

    # Feature pills
    pills = ["AI Backward Milestones", "Native Safe Zones", "Instant HD Wallpaper", "Always-On Display"]
    px = 70
    for p in pills:
        pw = len(p) * 9 + 24
        draw.rounded_rectangle([px, 220, px + pw, 256], radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
        draw.text((px + 12, 230), p, fill=(56, 189, 248), font=font_tag)
        px += pw + 12

    # Mockup card (Left: Countdown, Right: Milestones)
    draw.rounded_rectangle([70, 280, 1130, 560], radius=24, fill=(10, 15, 30), outline=(99, 102, 241), width=2)

    # Card Title
    draw.text((105, 305), "TARGET: GOOGLE AI CHALLENGE SPRINT (NOV 23, 2026)", fill=(248, 250, 252), font=font_card_head)
    draw.text((105, 332), "Glanceable Cognitive Lock Screen • Backward Milestone Sequence", fill=(100, 116, 139), font=font_tag)

    # Countdown boxes
    digits = [("01", "DAYS"), ("02", "HOURS"), ("16", "MINS"), ("42", "SECS")]
    bx = 105
    for val, lbl in digits:
        draw.rounded_rectangle([bx, 365, bx + 105, 450], radius=14, fill=(3, 7, 18), outline=(30, 41, 59), width=1)
        draw.text((bx + 28, 380), val, fill=(255, 255, 255) if lbl != "SECS" else (251, 191, 36), font=font_digits)
        draw.text((bx + 35, 426), lbl, fill=(148, 163, 184), font=font_digits_sub)
        bx += 120

    # Milestone list on right side
    milestones = [
        ("✓ M1: Ideation & Deep Rule Audit", "COMPLETED", (52, 211, 153)),
        ("✓ M2: Core Dynamic Countdown Engine", "COMPLETED", (52, 211, 153)),
        ("► M3: Backward Milestone Flightdeck", "ACTIVE FOCUS", (129, 140, 248)),
        ("○ M4: Wallpaper Engine & Device Tests", "UPCOMING", (148, 163, 184)),
        ("○ M5: Handshake Mission Submission", "FINAL SHIP", (148, 163, 184)),
    ]
    my = 345
    for title, status, col in milestones:
        draw.rounded_rectangle([620, my, 1095, my + 34], radius=8, fill=(15, 23, 42), outline=(col[0]//2, col[1]//2, col[2]//2), width=1)
        draw.text((635, my + 8), title, fill=(241, 245, 249), font=font_ms)
        draw.text((1000, my + 10), status, fill=col, font=font_tag)
        my += 40

    # Bottom Quote Anchor
    draw.text((105, 485), '“Turn every glance into momentum. Ship what matters.”', fill=(199, 210, 254), font=font_quote)

    # Progress Bar
    draw.rounded_rectangle([105, 520, 565, 528], radius=4, fill=(30, 41, 59))
    draw.rounded_rectangle([105, 520, 410, 528], radius=4, fill=(99, 102, 241))
    draw.text((475, 508), "60% COMPLETE", fill=(99, 102, 241), font=font_tag)

    img.save('/Users/pratikmohanty/handshake/cover_image.png', 'PNG')
    print("Cover image saved to /Users/pratikmohanty/handshake/cover_image.png")

if __name__ == '__main__':
    create_cover()
