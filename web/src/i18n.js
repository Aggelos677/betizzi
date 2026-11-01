// Κείμενα ανά γλώσσα. Όροι στοιχήματος (Tip, VIP, Over/Under, GG/NG, 1X2) μένουν όπως τους λέει ο κόσμος.
export const LANGS = ["en", "el", "es", "pt", "fr", "de", "ro", "sr", "bg"];
export const HREFLANG = { en: "en", el: "el", es: "es", pt: "pt", fr: "fr", de: "de", ro: "ro", sr: "sr-Latn", bg: "bg" };
export const TZ = {
  en: "Europe/London", el: "Europe/Athens", es: "Europe/Madrid", pt: "America/Sao_Paulo", fr: "Europe/Paris",
  de: "Europe/Berlin", ro: "Europe/Bucharest", sr: "Europe/Belgrade", bg: "Europe/Sofia",
};
export const LOCALE = { en: "en-GB", el: "el-GR", es: "es-ES", pt: "pt-BR", fr: "fr-FR", de: "de-DE", ro: "ro-RO", sr: "sr-Latn-RS", bg: "bg-BG" };

export const T = {
  en: {
    name: "English", title: "Football predictions today", desc: "Free football tips for today with statistics, real win chances and odds. Free and VIP tips, likely score, slip builder. 18+.",
    answer: (d, n, t, v) => `On ${d} betizzi lists ${n} football matches with ${t} free tips and ${v} VIP tips, chosen from team form over the last 10 games and bookmaker odds.`,
    matches: "Matches", tips: "Our tips", vipLock: "VIP tip — sign up free to see it", noTip: "",
    ko: "Kick-off", live: "LIVE", ft: "FT", rg: "18+ · Play for fun, set a limit. Tips are not a guarantee.", why: "Why", chance: "chance",
    how: "How it works", howText: "We check each team's last 10 games and the bookmaker price. A tip appears only when both point the same way — about 1 in 4 matches.",
  },
  el: {
    name: "Ελληνικά", title: "Προγνωστικά ποδοσφαίρου σήμερα", desc: "Δωρεάν προγνωστικά ποδοσφαίρου για σήμερα με στατιστικά, πραγματική πιθανότητα και αποδόσεις. Free και VIP tips, πιθανό σκορ, δελτίο. 18+.",
    answer: (d, n, t, v) => `Στις ${d} το betizzi έχει ${n} αγώνες ποδοσφαίρου με ${t} δωρεάν tips και ${v} VIP tips, από τη φόρμα των ομάδων στα τελευταία 10 παιχνίδια και τις αποδόσεις.`,
    matches: "Αγώνες", tips: "Τα tips μας", vipLock: "VIP tip — δες το με δωρεάν εγγραφή", noTip: "",
    ko: "Ώρα", live: "LIVE", ft: "Τελ.", rg: "18+ · Παίξε για διασκέδαση, με όριο. Τα tips δεν είναι εγγύηση.", why: "Γιατί", chance: "πιθανότητα",
    how: "Πώς δουλεύει", howText: "Κοιτάμε τα τελευταία 10 παιχνίδια κάθε ομάδας και την απόδοση. Tip βγαίνει μόνο όταν συμφωνούν — περίπου σε 1 στους 4 αγώνες.",
  },
  es: {
    name: "Español", title: "Pronósticos de fútbol hoy", desc: "Pronósticos de fútbol gratis para hoy con estadísticas, probabilidad real y cuotas. Tips Free y VIP, marcador probable, creador de apuestas. 18+.",
    answer: (d, n, t, v) => `El ${d} betizzi recoge ${n} partidos de fútbol con ${t} tips gratis y ${v} tips VIP, elegidos por la forma de los equipos en los últimos 10 partidos y las cuotas.`,
    matches: "Partidos", tips: "Nuestros tips", vipLock: "Tip VIP — regístrate gratis para verlo", noTip: "",
    ko: "Hora", live: "EN VIVO", ft: "Final", rg: "18+ · Juega por diversión y con límite. Los tips no son una garantía.", why: "Por qué", chance: "probabilidad",
    how: "Cómo funciona", howText: "Miramos los últimos 10 partidos de cada equipo y la cuota. Solo damos tip cuando ambos coinciden: en 1 de cada 4 partidos aprox.",
  },
  pt: {
    name: "Português", title: "Palpites de futebol hoje", desc: "Palpites de futebol grátis para hoje com estatísticas, chance real e odds. Tips Free e VIP, placar provável, montador de bilhete. 18+.",
    answer: (d, n, t, v) => `Em ${d} o betizzi traz ${n} jogos de futebol com ${t} tips grátis e ${v} tips VIP, escolhidos pela forma dos times nos últimos 10 jogos e pelas odds.`,
    matches: "Jogos", tips: "Nossos tips", vipLock: "Tip VIP — cadastre-se grátis para ver", noTip: "",
    ko: "Horário", live: "AO VIVO", ft: "Fim", rg: "18+ · Jogue por diversão e com limite. Tips não são garantia.", why: "Por quê", chance: "chance",
    how: "Como funciona", howText: "Olhamos os últimos 10 jogos de cada time e a odd. Só damos tip quando os dois concordam — cerca de 1 em cada 4 jogos.",
  },
  fr: {
    name: "Français", title: "Pronostics foot aujourd'hui", desc: "Pronostics foot gratuits du jour avec statistiques, vraie probabilité et cotes. Tips Free et VIP, score probable, créateur de ticket. 18+.",
    answer: (d, n, t, v) => `Le ${d}, betizzi présente ${n} matchs de foot avec ${t} tips gratuits et ${v} tips VIP, choisis selon la forme des équipes sur les 10 derniers matchs et les cotes.`,
    matches: "Matchs", tips: "Nos tips", vipLock: "Tip VIP — inscris-toi gratuitement pour le voir", noTip: "",
    ko: "Heure", live: "EN DIRECT", ft: "Fin", rg: "18+ · Joue pour le plaisir, avec une limite. Les tips ne sont pas une garantie.", why: "Pourquoi", chance: "probabilité",
    how: "Comment ça marche", howText: "On regarde les 10 derniers matchs de chaque équipe et la cote. Un tip n'apparaît que si les deux vont dans le même sens — environ 1 match sur 4.",
  },
  de: {
    name: "Deutsch", title: "Fußball Tipps heute", desc: "Kostenlose Fußball Tipps für heute mit Statistiken, echter Chance und Quoten. Free- und VIP-Tipps, wahrscheinliches Ergebnis, Wettschein-Baukasten. 18+.",
    answer: (d, n, t, v) => `Am ${d} zeigt betizzi ${n} Fußballspiele mit ${t} kostenlosen Tipps und ${v} VIP-Tipps, ausgewählt nach der Form der Teams in den letzten 10 Spielen und den Quoten.`,
    matches: "Spiele", tips: "Unsere Tipps", vipLock: "VIP-Tipp — kostenlos registrieren und ansehen", noTip: "",
    ko: "Anstoß", live: "LIVE", ft: "Ende", rg: "18+ · Spiel zum Spaß und mit Limit. Tipps sind keine Garantie.", why: "Warum", chance: "Chance",
    how: "So funktioniert's", howText: "Wir prüfen die letzten 10 Spiele jedes Teams und die Quote. Ein Tipp kommt nur, wenn beides übereinstimmt — bei etwa 1 von 4 Spielen.",
  },
  ro: {
    name: "Română", title: "Ponturi fotbal azi", desc: "Ponturi fotbal gratuite pentru azi, cu statistici, șansă reală și cote. Ponturi Free și VIP, scor probabil, constructor de bilet. 18+.",
    answer: (d, n, t, v) => `Pe ${d}, betizzi are ${n} meciuri de fotbal cu ${t} ponturi gratuite și ${v} ponturi VIP, alese după forma echipelor în ultimele 10 meciuri și după cote.`,
    matches: "Meciuri", tips: "Ponturile noastre", vipLock: "Pont VIP — înregistrează-te gratuit ca să-l vezi", noTip: "",
    ko: "Ora", live: "LIVE", ft: "Final", rg: "18+ · Joacă pentru distracție, cu limită. Ponturile nu sunt o garanție.", why: "De ce", chance: "șansă",
    how: "Cum funcționează", howText: "Verificăm ultimele 10 meciuri ale fiecărei echipe și cota. Dăm pont doar când ambele arată la fel — cam la 1 din 4 meciuri.",
  },
  sr: {
    name: "Srpski", title: "Fudbalske prognoze danas", desc: "Besplatne fudbalske prognoze za danas sa statistikom, stvarnom šansom i kvotama. Free i VIP tipovi, verovatan rezultat, pravljenje tiketa. 18+.",
    answer: (d, n, t, v) => `Dana ${d} betizzi ima ${n} fudbalskih utakmica sa ${t} besplatnih tipova i ${v} VIP tipova, izabranih prema formi timova u poslednjih 10 utakmica i kvotama.`,
    matches: "Utakmice", tips: "Naši tipovi", vipLock: "VIP tip — besplatna registracija da ga vidiš", noTip: "",
    ko: "Vreme", live: "UŽIVO", ft: "Kraj", rg: "18+ · Igraj iz zabave, sa limitom. Tipovi nisu garancija.", why: "Zašto", chance: "šansa",
    how: "Kako radi", howText: "Gledamo poslednjih 10 utakmica svakog tima i kvotu. Tip dajemo samo kad se oboje slažu — otprilike na 1 od 4 utakmice.",
  },
  bg: {
    name: "Български", title: "Футболни прогнози днес", desc: "Безплатни футболни прогнози за днес със статистика, реален шанс и коефициенти. Free и VIP прогнози, вероятен резултат, фиш. 18+.",
    answer: (d, n, t, v) => `На ${d} betizzi има ${n} футболни мача с ${t} безплатни и ${v} VIP прогнози, избрани по формата на отборите в последните 10 мача и коефициентите.`,
    matches: "Мачове", tips: "Нашите прогнози", vipLock: "VIP прогноза — безплатна регистрация, за да я видиш", noTip: "",
    ko: "Час", live: "НА ЖИВО", ft: "Край", rg: "18+ · Играй за забавление и с лимит. Прогнозите не са гаранция.", why: "Защо", chance: "шанс",
    how: "Как работи", howText: "Гледаме последните 10 мача на всеки отбор и коефициента. Прогноза има само когато двете съвпадат — около 1 на 4 мача.",
  },
};

// Πώς γράφεται κάθε επιλογή (όροι στοιχήματος, ίδιοι παντού).
export const SEL = { "1": "1", X: "X", "2": "2", "1X": "1X", X2: "X2", "12": "12", O15: "Over 1.5", O25: "Over 2.5", U25: "Under 2.5", O35: "Over 3.5", U35: "Under 3.5", GG: "GG", NG: "NG" };
