# Φτιάχνει τις εικόνες κοινοποίησης (og) 1200x630, μία ανά γλώσσα: public/og/{lang}.png
# και το favicon (public/favicon.ico). Τρέχει με: python3 tools/og.py (από τον φάκελο web)
from PIL import Image, ImageDraw, ImageFont
BG, LIME, WHITE, MUTED = "#0c0f0d", "#b6f23a", "#ffffff", "#9aa59e"
F = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FO = "/usr/share/fonts/truetype/dejavu/DejaVuSans-BoldOblique.ttf"
FR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
TAG = {
  "en": "Ready-made football parlays and tips, every day",
  "el": "Έτοιμα παρολί και tips ποδοσφαίρου, κάθε μέρα",
  "es": "Combinadas y pronósticos de fútbol, cada día",
  "pt": "Múltiplas e dicas de futebol, todos os dias",
  "fr": "Combinés et pronos foot, chaque jour",
  "de": "Fertige Fußball-Kombiwetten und Tipps, jeden Tag",
  "ro": "Bilete și ponturi de fotbal, în fiecare zi",
  "sr": "Gotovi fudbalski tiketi i tipovi, svaki dan",
  "bg": "Готови футболни фишове и прогнози, всеки ден",
}
icon = Image.open("public/icons/icon-512.png").convert("RGB")
for lang, tag in TAG.items():
    im = Image.new("RGB", (1200, 630), BG); d = ImageDraw.Draw(im)
    im.paste(icon.resize((220, 220)), (80, 150))
    big, bigo = ImageFont.truetype(F, 130), ImageFont.truetype(FO, 130)
    x, y = 340, 160
    d.text((x, y), "bet", font=big, fill=WHITE); x += d.textlength("bet", font=big)
    d.text((x, y), "izzi", font=bigo, fill=LIME)
    size = 40
    while ImageFont.truetype(FR, size).getlength(tag) > 780 and size > 26: size -= 2
    d.text((345, 330), tag, font=ImageFont.truetype(FR, size), fill=WHITE)
    d.rectangle((0, 610, 1200, 630), fill=LIME)
    d.text((80, 520), "betizzi.com", font=ImageFont.truetype(F, 34), fill=MUTED)
    im.save(f"public/og/{lang}.png", optimize=True)
icon.save("public/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
icon.resize((32, 32), Image.LANCZOS).save("public/icons/favicon-32.png", optimize=True)
print("ok")
