// Κείμενα του email με τον κωδικό σύνδεσης (9 γλώσσες). «Προς έλεγχο» από ντόπιους, όπως όλα τα κείμενα (CLAUDE.md).
// Ζουν εδώ και όχι στο web/src/i18n.js, γιατί το email το στέλνει ο server του engine (η σελίδα δεν ορίζει ποτέ κείμενο email).
export const MAIL = {
  en: { subject: "{code} is your betizzi code", body: "Your sign-in code for betizzi:", foot: "The code is valid for 10 minutes. If you didn't ask for it, ignore this email. 18+ · Play responsibly." },
  el: { subject: "{code} είναι ο κωδικός σου για το betizzi", body: "Ο κωδικός σύνδεσης για το betizzi:", foot: "Ισχύει για 10 λεπτά. Αν δεν τον ζήτησες, αγνόησε αυτό το email. 21+ (Κύπρος 18+) · Παίξε υπεύθυνα." },
  es: { subject: "{code} es tu código de betizzi", body: "Tu código para entrar en betizzi:", foot: "El código vale 10 minutos. Si no lo pediste, ignora este email. +18 · Juega con responsabilidad." },
  pt: { subject: "{code} é o seu código betizzi", body: "Seu código de acesso ao betizzi:", foot: "O código vale por 10 minutos. Se você não pediu, ignore este email. 18+ · Jogue com responsabilidade." },
  fr: { subject: "{code} est ton code betizzi", body: "Ton code de connexion à betizzi :", foot: "Le code est valable 10 minutes. Si tu ne l'as pas demandé, ignore cet email. 18+ · Joue de façon responsable." },
  de: { subject: "{code} ist dein betizzi-Code", body: "Dein Anmeldecode für betizzi:", foot: "Der Code gilt 10 Minuten. Falls du ihn nicht angefordert hast, ignoriere diese E-Mail. 18+ · Spiele verantwortungsvoll." },
  ro: { subject: "{code} este codul tău betizzi", body: "Codul tău de conectare la betizzi:", foot: "Codul este valabil 10 minute. Dacă nu l-ai cerut, ignoră acest email. 18+ · Joacă responsabil." },
  sr: { subject: "{code} je tvoj betizzi kod", body: "Tvoj kod za prijavu na betizzi:", foot: "Kod važi 10 minuta. Ako ga nisi tražio, ignoriši ovaj email. 18+ · Igraj odgovorno." },
  bg: { subject: "{code} е твоят код за betizzi", body: "Твоят код за вход в betizzi:", foot: "Кодът е валиден 10 минути. Ако не си го поискал, игнорирай този имейл. 18+ · Играй отговорно." },
};
