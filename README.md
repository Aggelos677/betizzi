# betizzi

Δωρεάν site με tips ποδοσφαίρου, για όσους παίζουν για διασκέδαση. Domain: betizzi.com.

## Τι είναι τι

| Κομμάτι | Πού | Τι κάνει |
|---|---|---|
| **betizzi-web** | Cloudflare Worker, φάκελος `web/` | Η σελίδα. Τώρα: το πρωτότυπο (δεδομένα Κυριακής 1/11, όχι ζωντανά) |

## Πώς ενημερώνεται

1. Αλλαγή στο repo, στον φάκελο `web/`.
2. Το Cloudflare (Workers Builds, root `/web`) το ανεβάζει μόνο του σε ~1 λεπτό.
3. Αν κάτι χαλάσει: Cloudflare → betizzi-web → Deployments → προηγούμενη έκδοση.

## Κανόνες

- Μέχρι να ανέβει κανονικά: `noindex` και robots.txt κλειστό, για να μη βρει η Google το πρωτότυπο.
- Τίποτα από το Pattern90 δεν αλλάζει. Από τις R2 του (`ptrn90`) μόνο ανάγνωση.
- Stats: API-Football. Αποδόσεις: btfodds / OddAlerts (μέσω Pattern90), αργότερα API bookmaker.
- Μυστικά (API keys) μόνο ως Cloudflare Secrets, ποτέ στον κώδικα.

## Ιστορικό

- 01/11/2026: πρώτο ανέβασμα, πρωτότυπο ως στατική σελίδα. Σύνδεση Cloudflare Workers Builds (betizzi-web, root /web).
