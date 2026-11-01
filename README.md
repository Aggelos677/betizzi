# betizzi

Δωρεάν site με tips ποδοσφαίρου, για όσους παίζουν για διασκέδαση. Domain: betizzi.com.

## Τι είναι τι

| Κομμάτι | Πού | Τι κάνει |
|---|---|---|
| **betizzi-web** | Cloudflare Worker, φάκελος `web/` | Η σελίδα. Τώρα: το πρωτότυπο (δεδομένα Κυριακής 1/11, όχι ζωντανά) |
| **betizzi-engine** | Cloudflare Worker, φάκελος `engine/` | Μηχανή δεδομένων: αγώνες, φόρμα, live (API-Football), αποδόσεις (adapter), tips. Cron κάθε λεπτό |
| **betizzi-db** | Cloudflare D1 | leagues, teams, fixtures, results, odds, tips, runs |

## Πώς ενημερώνεται

1. Αλλαγή στο repo, στον φάκελο `web/`.
2. Το Cloudflare (Workers Builds, root `/web`) το ανεβάζει μόνο του σε ~1 λεπτό.
3. Αν κάτι χαλάσει: Cloudflare → betizzi-web → Deployments → προηγούμενη έκδοση.

## Μηχανή (betizzi-engine)

- `/status`: τι έχει η βάση και οι τελευταίες εκτελέσεις.
- `/api/day?date=ΗΜΕΡΑ`: αγώνες και tips της μέρας (για τη σελίδα).
- `/run?job=seed|fixtures|form|odds|live|tips&t=ADMIN_TOKEN`: χειροκίνητη εκτέλεση.
- Χρονοδιάγραμμα (UTC): live κάθε 1′ (11–22) ή 2′, φόρμα 40 ομάδες/3′, αγώνες 03:05, αποδόσεις κάθε 6 ώρες (:20), tips 03:50 και κάθε 3 ώρες (:40).
- Λίγκες: `engine/data/leagues.json` (515). Κανόνες tips: `engine/src/tips.js` (RULES).
- Κλήσεις API-Football/μέρα: εκτίμηση ~3.500 (Pro: 7.500).

## Κανόνες

- Μέχρι να ανέβει κανονικά: `noindex` και robots.txt κλειστό, για να μη βρει η Google το πρωτότυπο.
- Τίποτα από το Pattern90 δεν αλλάζει. Από τις R2 του (`ptrn90`) μόνο ανάγνωση.
- Stats: API-Football. Αποδόσεις: btfodds / OddAlerts (μέσω Pattern90), αργότερα API bookmaker.
- Μυστικά (API keys) μόνο ως Cloudflare Secrets, ποτέ στον κώδικα.

## Ιστορικό

- 01/11/2026: betizzi-engine v1 (adapters API-Football για stats και προσωρινά για αποδόσεις, tips με τους νέους κανόνες). Τοπικό τεστ: 754 αγώνες, 5.561 τιμές, 91 tips με φόρμα για 400 ομάδες.
- 01/11/2026: πρώτο ανέβασμα, πρωτότυπο ως στατική σελίδα. Σύνδεση Cloudflare Workers Builds (betizzi-web, root /web).

- 01/11/2026: Tips αμετάβλητα (status/withdrawn_at/model_version/hash στη D1), VIP κρυμμένα στο δημόσιο /api/day μέχρι τη σέντρα, αποφάσεις SEO/GEO στο CLAUDE.md.
- 01/11/2026: Νέος κανόνας: δεδομένα μόνο από modix-bt-v2. Cron του betizzi-engine σε παύση. Επόμενο: σελίδα με mock δεδομένα στη μορφή του modix-bt-v2.
- 01/11/2026: Απόφαση Owner: το engine ξαναξεκινά με API-Football σε αργό ρυθμό (live/5΄, form/6΄, odds 2x/μέρα) μέχρι το modix-bt-v2.
- 01/11/2026: Αποδόσεις σε κομμάτια (8 σελίδες/τρέξιμο, πίνακας odds_cursor), γιατί όλες μαζί ξεπερνούσαν τον χρόνο ενός αιτήματος.
- 01/11/2026: Form (60 ομάδες) και αποδόσεις κάθε λεπτό, κατόπιν απόφασης Owner.
- 01/11/2026: betizzi-web: σελίδες SSR /{lang}/ (9 γλώσσες) με τους σημερινούς αγώνες και tips από το engine (service binding). Adapter: web/src/data.js. Πρωτότυπο στο /prototype.html.
- 01/11/2026: Κανόνας: αγώνας με VIP δεν παίρνει Free tip. Form: πρώτα ομάδες αγώνων με αποδόσεις.
- 01/11/2026: Σελίδα αγώνα /{lang}/{home}-vs-{away}-{λέξη}-{ημ/νία}-{id} (tips, μοντέλο, πιθανό σκορ, φόρμα, αποδόσεις, schema). Engine: /api/match. ΣΗΜ.: η εμφάνιση πρέπει να έρθει από το πρωτότυπο (λογότυπο, καρτέλες, μπάρες φόρμας, My slip).
- 01/11/2026: Η αρχική /{lang}/ είναι πλέον η εφαρμογή του πρωτοτύπου (design, καρτέλες, builder, εφέ) με πραγματικά δεδομένα από το engine· το SSR κείμενο (H1, απάντηση, λίστα) μπαίνει μέσα για Google/AI. Demo κουμπιά μόνο με ?demo. Επόμενο: μετάφραση UI της εφαρμογής, live polling για εφέ γκολ.
- 01/11/2026: Πιθανό σκορ: «τρελό» σκορ μόνο αν και η φόρμα (μ.ό. γκολ στα τελευταία 5 ≥3) το στηρίζει· ισοπαλία ως 2-2.
- 01/11/2026: Live: engine ζωντανά σκορ κάθε λεπτό, κλείσιμο αγώνων που τελείωσαν (fixtures?ids), αυτόματο κλείσιμο tips (FT). Σελίδα: /live.json κάθε 30΄΄ → μικρό εφέ σε κάθε γκολ, μεγάλο όταν κλείνει tip, «Called it» όταν βρίσκουμε σκορ. VIP κρυφό εξ ορισμού.
- 01/11/2026: Email: Cloudflare Email Routing για betizzi.com → bettipsters79@gmail.com (admin, hello, social, marketing, privacy). Αποστολή από Gmail «Send mail as» (smtp.gmail.com) ως admin/hello/marketing. SPF: include:_spf.mx.cloudflare.net include:_spf.google.com. Αυτόματα email site (εγγραφή VIP): αργότερα, ξεχωριστός λογαριασμός Brevo ή Cloudflare Email Sending.
- 01/11/2026: Μετάφραση εφαρμογής: 151 κείμενα × 8 γλώσσες στο web/src/i18n.js (UI). Μεταφραστής στον browser (web/src/translator.js) με MutationObserver. Ημερομηνία στη γλώσσα της σελίδας. Ελληνικά κεφαλαία χωρίς τόνους. Εκκρεμεί: ονόματα χωρών/λιγκών.
- 01/11/2026: Κουπόνια ημέρας (engine/src/coupons.js, /api/coupons, cron 06:50 UTC) στην καρτέλα «Τα tips μας». Ομάδες Β/reserves/νέων/γυναικών εκτός tips και κουπονιών (NOT_FIRST_TEAM).
