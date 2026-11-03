// Σύντομη ανάλυση αγώνα (απόφαση Owner 03/11): 2–4 προτάσεις από τα ΔΙΚΑ ΜΑΣ νούμερα, χωρίς AI.
// Φόρμα (τελευταίοι 5), τελευταίο αποτέλεσμα, σημασία αγώνα (φάση κυπέλλου / βαθμολογία), και γιατί το tip μας.
// Δεν λέει ποτέ κάτι που δεν ξέρουμε (απουσίες, ειδήσεις). Όλα τα κείμενα «προς έλεγχο» από ντόπιους.
// Ποτέ λέξεις «σίγουρο / κλειδωμένο / εγγυημένο / fixed».

// Πληθυντικός: [ενικός, πληθυντικός] ή ειδικοί κανόνες (σερβικά, ρουμανικά).
const PL = {
  sr: (n, f) => (n % 10 === 1 && n % 100 !== 11 ? f[0] : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? f[1] : f[2]),
  def: (n, f) => (n === 1 ? f[0] : f[1]),
};
const pl = (lang, n, f) => (PL[lang] || PL.def)(n, f);

// Κείμενα ανά γλώσσα. {T} ομάδα, {S} σκορ, {N} αγώνες, {G} γκολ, {P}/{Q} βαθμοί, {SEL} επιλογή, {O} απόδοση.
const A = {
  en: {
    evGG: "both teams scoring",
    evNG: "at least one team failing to score",
    evO: "{L}+ goals",
    evU: "a low-scoring game (under {L})",
    evW: "a {T} win",
    evX: "a draw",
    evDC: "{T} avoiding defeat",
    concl: ["The numbers point to {EV} ({PC}%), so our pick is {SEL} at {O}.", "Everything here points to {EV} ({PC}% by our numbers): {SEL} at {O}.", "We see a {PC}% chance of {EV}, so we go with {SEL} at {O}."],
    w: ["win", "wins"], d: ["draw", "draws"], l: ["loss", "losses"], and: "and",
    form: ["{T} has {WDL} in its last {N} games", "{T} comes in with {WDL} from its last {N}"],
    lastW: "and won {S} last time out.", lastD: "and drew {S} last time out.", lastL: "and lost {S} last time out.",
    ko: "A knockout tie: there is no second chance.", grp: "A group-stage match, so every point counts for qualification.",
    top: "A top-of-the-table game: {H} is {R1} and {A} is {R2} in the standings.", tbl: "In the standings {H} is {R1} and {A} is {R2}.",
    pos: (n) => `${n}${n % 10 === 1 && n % 100 !== 11 ? "st" : n % 10 === 2 && n % 100 !== 12 ? "nd" : n % 10 === 3 && n % 100 !== 13 ? "rd" : "th"}`,
    over: "Their recent games average {G} goals.",
    under: "Their recent games are low on goals ({G} per match on average).",
    gg: "{H} scored in {X} of its last 5 and {A} in {Y}.",
    ng: "{H} kept a clean sheet or failed to score in {X} of its last 5 and {A} in {Y}.",
    side: "{T} is in better form ({P} points to {Q} in the last 5).",
    draw: "The two sides are close in form ({P} and {Q} points in the last 5).",
    gen: "Our pick is {SEL} at {O}.", vip: "We have a VIP tip on this match.", none: "No tip from us here: we did not find a clear pick.",
  },
  el: {
    evGG: "γκολ και από τις δύο ομάδες",
    evNG: "τουλάχιστον μία ομάδα χωρίς γκολ",
    evO: "{L}+ γκολ",
    evU: "λίγα γκολ (κάτω από {L})",
    evW: "νίκη της {T}",
    evX: "ισοπαλία",
    evDC: "όχι ήττα της {T}",
    concl: ["Τα δεδομένα δείχνουν μεγάλη πιθανότητα για {EV} ({PC}%), γι' αυτό προτείνουμε {SEL} στο {O}.", "Τα νούμερα δείχνουν προς {EV} ({PC}%): η πρότασή μας είναι {SEL} στο {O}.", "Βλέπουμε {PC}% πιθανότητα για {EV}, γι' αυτό πάμε {SEL} στο {O}."],
    w: ["νίκη", "νίκες"], d: ["ισοπαλία", "ισοπαλίες"], l: ["ήττα", "ήττες"], and: "και",
    form: ["Η {T} έχει {WDL} στους τελευταίους {N} αγώνες", "Η {T} έρχεται με {WDL} στα τελευταία {N}"],
    lastW: "και κέρδισε {S} στο τελευταίο της.", lastD: "και έφερε ισοπαλία {S} στο τελευταίο της.", lastL: "και έχασε {S} στο τελευταίο της.",
    ko: "Νοκ-άουτ αγώνας: δεν υπάρχει δεύτερη ευκαιρία.", grp: "Αγώνας φάσης ομίλων, κάθε βαθμός μετράει για την πρόκριση.",
    top: "Αγώνας κορυφής: η {H} είναι {R1} και η {A} {R2} στη βαθμολογία.", tbl: "Στη βαθμολογία η {H} είναι {R1} και η {A} {R2}.",
    pos: (n) => `${n}η`,
    over: "Στα τελευταία τους παιχνίδια μπαίνουν κατά μέσο όρο {G} γκολ.",
    under: "Τα τελευταία τους παιχνίδια έχουν λίγα γκολ ({G} κατά μέσο όρο).",
    gg: "Η {H} σκόραρε σε {X} από τους 5 τελευταίους και η {A} σε {Y}.",
    ng: "Η {H} κράτησε το μηδέν ή δεν σκόραρε σε {X} από τους 5 τελευταίους και η {A} σε {Y}.",
    side: "Η {T} είναι σε καλύτερη φόρμα ({P} βαθμοί έναντι {Q} στους 5 τελευταίους).",
    draw: "Οι δύο ομάδες είναι κοντά σε φόρμα ({P} και {Q} βαθμοί στους 5 τελευταίους).",
    gen: "Προτείνουμε {SEL} στο {O}.", vip: "Σε αυτόν τον αγώνα έχουμε VIP tip.", none: "Εδώ δεν βάζουμε tip: δεν βρήκαμε καθαρή επιλογή.",
  },
  es: {
    evGG: "goles de los dos equipos",
    evNG: "al menos un equipo sin marcar",
    evO: "{L} o más goles",
    evU: "un partido con pocos goles (menos de {L})",
    evW: "una victoria de {T}",
    evX: "un empate",
    evDC: "que {T} no pierda",
    concl: ["Los datos apuntan a {EV} ({PC}%), por eso elegimos {SEL} a {O}.", "Todo apunta a {EV} ({PC}% según nuestros números): {SEL} a {O}.", "Vemos un {PC}% de probabilidad de {EV}, por eso vamos con {SEL} a {O}."],
    w: ["victoria", "victorias"], d: ["empate", "empates"], l: ["derrota", "derrotas"], and: "y",
    form: ["{T} suma {WDL} en sus últimos {N} partidos", "{T} llega con {WDL} en sus últimos {N}"],
    lastW: "y ganó {S} en su último partido.", lastD: "y empató {S} en su último partido.", lastL: "y perdió {S} en su último partido.",
    ko: "Partido de eliminatoria: no hay segunda oportunidad.", grp: "Partido de fase de grupos: cada punto cuenta para clasificarse.",
    top: "Partido en lo alto de la tabla: {H} es {R1} y {A} {R2}.", tbl: "En la clasificación {H} es {R1} y {A} {R2}.",
    pos: (n) => `${n}º`,
    over: "Sus últimos partidos promedian {G} goles.",
    under: "Sus últimos partidos tienen pocos goles ({G} de media).",
    gg: "{H} marcó en {X} de sus últimos 5 y {A} en {Y}.",
    ng: "{H} dejó la portería a cero o no marcó en {X} de sus últimos 5 y {A} en {Y}.",
    side: "{T} llega en mejor forma ({P} puntos frente a {Q} en los últimos 5).",
    draw: "Los dos equipos están parejos ({P} y {Q} puntos en los últimos 5).",
    gen: "Elegimos {SEL} a {O}.", vip: "En este partido tenemos un tip VIP.", none: "Aquí no damos tip: no vimos una opción clara.",
  },
  pt: {
    evGG: "gols dos dois times",
    evNG: "pelo menos um time sem marcar",
    evO: "{L} ou mais gols",
    evU: "um jogo com poucos gols (menos de {L})",
    evW: "uma vitória do {T}",
    evX: "um empate",
    evDC: "o {T} sem perder",
    concl: ["Os dados apontam para {EV} ({PC}%), por isso nossa escolha é {SEL} a {O}.", "Tudo aponta para {EV} ({PC}% pelos nossos números): {SEL} a {O}.", "Vemos {PC}% de chance de {EV}, por isso vamos de {SEL} a {O}."],
    w: ["vitória", "vitórias"], d: ["empate", "empates"], l: ["derrota", "derrotas"], and: "e",
    form: ["{T} tem {WDL} nos últimos {N} jogos", "{T} chega com {WDL} nos últimos {N}"],
    lastW: "e venceu por {S} no último jogo.", lastD: "e empatou em {S} no último jogo.", lastL: "e perdeu por {S} no último jogo.",
    ko: "Jogo eliminatório: não há segunda chance.", grp: "Jogo da fase de grupos: cada ponto conta para a classificação.",
    top: "Jogo do topo da tabela: {H} é {R1} e {A} é {R2}.", tbl: "Na classificação, {H} é {R1} e {A} é {R2}.",
    pos: (n) => `${n}º`,
    over: "Os últimos jogos deles têm média de {G} gols.",
    under: "Os últimos jogos deles têm poucos gols ({G} por jogo em média).",
    gg: "{H} marcou em {X} dos últimos 5 e {A} em {Y}.",
    ng: "{H} não sofreu gol ou não marcou em {X} dos últimos 5 e {A} em {Y}.",
    side: "{T} está em melhor fase ({P} pontos contra {Q} nos últimos 5).",
    draw: "Os dois times estão parecidos ({P} e {Q} pontos nos últimos 5).",
    gen: "Nossa escolha é {SEL} a {O}.", vip: "Neste jogo temos um tip VIP.", none: "Aqui não damos tip: não vimos uma escolha clara.",
  },
  fr: {
    evGG: "des buts des deux côtés",
    evNG: "au moins une équipe muette",
    evO: "{L} buts ou plus",
    evU: "un match fermé (moins de {L} buts)",
    evW: "une victoire de {T}",
    evX: "un nul",
    evDC: "{T} invaincu",
    concl: ["Les chiffres annoncent {EV} ({PC} %), notre choix est donc {SEL} à {O}.", "Tout indique {EV} ({PC} % selon nos chiffres) : {SEL} à {O}.", "Nous voyons {PC} % de chances pour {EV}, d'où notre choix : {SEL} à {O}."],
    w: ["victoire", "victoires"], d: ["nul", "nuls"], l: ["défaite", "défaites"], and: "et",
    form: ["{T} compte {WDL} sur ses {N} derniers matchs", "{T} arrive avec {WDL} sur ses {N} derniers"],
    lastW: "et a gagné {S} lors de son dernier match.", lastD: "et a fait {S} lors de son dernier match.", lastL: "et a perdu {S} lors de son dernier match.",
    ko: "Match à élimination directe : pas de seconde chance.", grp: "Match de phase de groupes : chaque point compte pour la qualification.",
    top: "Choc du haut de tableau : {H} est {R1} et {A} {R2}.", tbl: "Au classement, {H} est {R1} et {A} {R2}.",
    pos: (n) => (n === 1 ? "1er" : `${n}e`),
    over: "Leurs derniers matchs comptent en moyenne {G} buts.",
    under: "Leurs derniers matchs ont peu de buts ({G} en moyenne).",
    gg: "{H} a marqué lors de {X} de ses 5 derniers matchs et {A} lors de {Y}.",
    ng: "{H} n'a pas encaissé ou n'a pas marqué lors de {X} de ses 5 derniers matchs et {A} lors de {Y}.",
    side: "{T} est en meilleure forme ({P} points contre {Q} sur les 5 derniers).",
    draw: "Les deux équipes sont proches ({P} et {Q} points sur les 5 derniers).",
    gen: "Notre choix : {SEL} à {O}.", vip: "Nous avons un tip VIP sur ce match.", none: "Pas de tip ici : nous n'avons pas trouvé de choix clair.",
  },
  de: {
    evGG: "Tore auf beiden Seiten",
    evNG: "mindestens ein Team ohne Tor",
    evO: "{L} oder mehr Tore",
    evU: "ein torarmes Spiel (unter {L})",
    evW: "einen Sieg von {T}",
    evX: "ein Remis",
    evDC: "{T} ohne Niederlage",
    concl: ["Die Zahlen sprechen für {EV} ({PC} %), deshalb wählen wir {SEL} zu {O}.", "Alles spricht für {EV} ({PC} % nach unseren Zahlen): {SEL} zu {O}.", "Wir sehen {PC} % Chance auf {EV}, deshalb wählen wir {SEL} zu {O}."],
    w: ["Sieg", "Siege"], d: ["Remis", "Remis"], l: ["Niederlage", "Niederlagen"], and: "und",
    form: ["{T} holte {WDL} aus den letzten {N} Spielen", "{T} steht bei {WDL} aus den letzten {N}"],
    lastW: "und gewann zuletzt {S}.", lastD: "und spielte zuletzt {S}.", lastL: "und verlor zuletzt {S}.",
    ko: "K.-o.-Spiel: Es gibt keine zweite Chance.", grp: "Spiel der Gruppenphase: Jeder Punkt zählt für das Weiterkommen.",
    top: "Spitzenspiel: {H} ist {R1}, {A} {R2} der Tabelle.", tbl: "In der Tabelle ist {H} {R1} und {A} {R2}.",
    pos: (n) => `${n}.`,
    over: "In ihren letzten Spielen fielen im Schnitt {G} Tore.",
    under: "Ihre letzten Spiele hatten wenige Tore ({G} im Schnitt).",
    gg: "{H} traf in {X} der letzten 5 Spiele und {A} in {Y}.",
    ng: "{H} blieb in {X} der letzten 5 Spiele ohne Gegentor oder ohne eigenes Tor, {A} in {Y}.",
    side: "{T} ist besser in Form ({P} zu {Q} Punkten aus den letzten 5).",
    draw: "Beide Teams sind ähnlich in Form ({P} und {Q} Punkte aus den letzten 5).",
    gen: "Wir wählen {SEL} zu {O}.", vip: "Für dieses Spiel haben wir einen VIP-Tipp.", none: "Hier kein Tipp von uns: Wir haben keine klare Wahl gefunden.",
  },
  ro: {
    evGG: "goluri de ambele părți",
    evNG: "cel puțin o echipă fără gol",
    evO: "{L}+ goluri",
    evU: "un meci cu puține goluri (sub {L})",
    evW: "o victorie a echipei {T}",
    evX: "un egal",
    evDC: "{T} fără înfrângere",
    concl: ["Datele arată o șansă mare pentru {EV} ({PC}%), așa că alegem {SEL} la {O}.", "Totul indică {EV} ({PC}% după cifrele noastre): {SEL} la {O}.", "Vedem {PC}% șanse pentru {EV}, așa că mergem pe {SEL} la {O}."],
    w: ["victorie", "victorii"], d: ["egal", "egaluri"], l: ["înfrângere", "înfrângeri"], and: "și",
    form: ["{T} are {WDL} în ultimele {N} meciuri", "{T} vine cu {WDL} în ultimele {N}"],
    lastW: "și a câștigat cu {S} ultimul meci.", lastD: "și a remizat {S} ultimul meci.", lastL: "și a pierdut cu {S} ultimul meci.",
    ko: "Meci eliminatoriu: nu există a doua șansă.", grp: "Meci din faza grupelor: fiecare punct contează pentru calificare.",
    top: "Meci de pe primele locuri: {H} este pe locul {R1}, iar {A} pe locul {R2}.", tbl: "În clasament, {H} este pe locul {R1}, iar {A} pe locul {R2}.",
    pos: (n) => `${n}`,
    over: "Ultimele lor meciuri au în medie {G} goluri.",
    under: "Ultimele lor meciuri au puține goluri ({G} în medie).",
    gg: "{H} a marcat în {X} din ultimele 5 meciuri, iar {A} în {Y}.",
    ng: "{H} nu a primit gol sau nu a marcat în {X} din ultimele 5 meciuri, iar {A} în {Y}.",
    side: "{T} este într-o formă mai bună ({P} puncte față de {Q} în ultimele 5).",
    draw: "Cele două echipe sunt apropiate ca formă ({P} și {Q} puncte în ultimele 5).",
    gen: "Alegem {SEL} la {O}.", vip: "La acest meci avem un pont VIP.", none: "Aici nu dăm pont: nu am găsit o alegere clară.",
  },
  sr: {
    evGG: "golove obe ekipe",
    evNG: "bar jednu ekipu bez gola",
    evO: "{L}+ golova",
    evU: "utakmicu sa malo golova (manje od {L})",
    evW: "pobedu ekipe {T}",
    evX: "nerešen ishod",
    evDC: "izostanak poraza ekipe {T}",
    concl: ["Podaci ukazuju na {EV} ({PC}%), zato biramo {SEL} po kvoti {O}.", "Sve ukazuje na {EV} ({PC}% po našim brojkama): {SEL} po kvoti {O}.", "Vidimo {PC}% šanse za {EV}, zato biramo {SEL} po kvoti {O}."],
    w: ["pobedu", "pobede", "pobeda"], d: ["nerešen rezultat", "nerešena rezultata", "nerešenih rezultata"], l: ["poraz", "poraza", "poraza"], and: "i",
    form: ["{T} ima {WDL} u poslednjih {N} utakmica,", "Učinak ekipe {T} u poslednjih {N}: {WDL},"],
    lastW: "uz pobedu {S} u poslednjoj utakmici.", lastD: "uz nerešen rezultat {S} u poslednjoj utakmici.", lastL: "uz poraz {S} u poslednjoj utakmici.",
    ko: "Utakmica nokaut faze: nema druge šanse.", grp: "Utakmica grupne faze: svaki bod je važan za prolaz dalje.",
    top: "Utakmica sa vrha tabele: {H} je {R1}, a {A} {R2}.", tbl: "Na tabeli je {H} {R1}, a {A} {R2}.",
    pos: (n) => `${n}.`,
    over: "Njihove poslednje utakmice imaju u proseku {G} golova.",
    under: "Njihove poslednje utakmice imaju malo golova ({G} u proseku).",
    gg: "{H}: gol u {X} od poslednjih 5 utakmica, {A}: u {Y}.",
    ng: "{H}: bez primljenog ili datog gola u {X} od poslednjih 5, {A}: u {Y}.",
    side: "{T} je u boljoj formi ({P} bodova naspram {Q} u poslednjih 5).",
    draw: "Dve ekipe su slične forme ({P} i {Q} bodova u poslednjih 5).",
    gen: "Biramo {SEL} po kvoti {O}.", vip: "Za ovu utakmicu imamo VIP tip.", none: "Ovde nemamo tip: nismo našli jasan izbor.",
  },
  bg: {
    evGG: "голове и за двата отбора",
    evNG: "поне един отбор без гол",
    evO: "{L}+ гола",
    evU: "мач с малко голове (под {L})",
    evW: "победа на {T}",
    evX: "равенство",
    evDC: "{T} без загуба",
    concl: ["Данните сочат {EV} ({PC}%), затова избираме {SEL} при {O}.", "Всичко сочи към {EV} ({PC}% по нашите данни): {SEL} при {O}.", "Виждаме {PC}% шанс за {EV}, затова избираме {SEL} при {O}."],
    w: ["победа", "победи"], d: ["равенство", "равенства"], l: ["загуба", "загуби"], and: "и",
    form: ["{T} има {WDL} в последните {N} мача", "{T} идва с {WDL} в последните {N}"],
    lastW: "и спечели с {S} последния си мач.", lastD: "и завърши {S} последния си мач.", lastL: "и загуби с {S} последния си мач.",
    ko: "Мач на директни елиминации: няма втори шанс.", grp: "Мач от груповата фаза: всяка точка е важна за класирането.",
    top: "Мач на върха: {H} е {R1}, а {A} е {R2} в класирането.", tbl: "В класирането {H} е {R1}, а {A} е {R2}.",
    pos: (n) => `${n}-и`,
    over: "В последните им мачове падат средно по {G} гола.",
    under: "Последните им мачове са с малко голове ({G} средно).",
    gg: "{H} вкара в {X} от последните 5 мача, а {A} в {Y}.",
    ng: "{H} не допусна или не вкара гол в {X} от последните 5 мача, а {A} в {Y}.",
    side: "{T} е в по-добра форма ({P} точки срещу {Q} в последните 5).",
    draw: "Двата отбора са близки по форма ({P} и {Q} точки в последните 5).",
    gen: "Избираме {SEL} при {O}.", vip: "За този мач имаме VIP съвет.", none: "Тук нямаме съвет: не намерихме ясен избор.",
  },
};

// Φόρμα σε ενιαία μορφή: [{res, gf, ga}], πιο πρόσφατος πρώτος.
// Ημέρα: [["W","2-1",1], ...]· σελίδα αγώνα: [{res, gf, ga}, ...].
function norm(form) {
  return (form || []).map((g) => {
    if (Array.isArray(g)) { const [a, b] = String(g[1] || "").split("-").map(Number); return { res: g[0], gf: a, ga: b }; }
    return { res: g.res, gf: g.gf, ga: g.ga };
  }).filter((g) => g.res && Number.isFinite(g.gf) && Number.isFinite(g.ga));
}
const pts = (f) => f.reduce((a, g) => a + (g.res === "W" ? 3 : g.res === "D" ? 1 : 0), 0);
const fill = (s, o) => s.replace(/\{(\w+)\}/g, (_, k) => (o[k] != null ? o[k] : ""));
const KO = /final|semi|quarter|round of|1\/\d+|play-?off|knockout|\d+(st|nd|rd|th) round|preliminary|qualifying/i;
const GRP = /group|league stage|regular season - \d+ \(?group/i;

export function analysis(lang, x, SEL) {
  const T = A[lang] || A.en, out = [];
  const H = x.home.name, Aw = x.away.name, h = norm(x.home.form).slice(0, 5), a = norm(x.away.form).slice(0, 5);
  const wdl = (f) => {
    const c = { W: 0, D: 0, L: 0 }; f.forEach((g) => c[g.res]++);
    const parts = [["W", "w"], ["D", "d"], ["L", "l"]].filter(([k]) => c[k]).map(([k, n]) => `${c[k]} ${pl(lang, c[k], T[n])}`);
    return parts.length > 1 ? parts.slice(0, -1).join(", ") + ` ${T.and} ` + parts[parts.length - 1] : parts[0] || "";
  };
  const formS = (team, f, i) => {
    if (f.length < 3) return "";
    const last = f[0], k = last.res === "W" ? "lastW" : last.res === "D" ? "lastD" : "lastL";
    return fill(T.form[(x.id + i) % T.form.length], { T: team, WDL: wdl(f), N: f.length }) + " " + fill(T[k], { S: `${last.gf}-${last.ga}` });
  };
  const s1 = formS(H, h, 0), s2 = formS(Aw, a, 1);
  if (s1) out.push(s1); if (s2) out.push(s2);

  // σημασία: φάση κυπέλλου ή βαθμολογία
  const round = String(x.round || "");
  const r1 = x.home.rank, r2 = x.away.rank;
  if (round && KO.test(round) && !/regular season/i.test(round)) out.push(T.ko);
  else if (round && GRP.test(round)) out.push(T.grp);
  else if (r1 && r2) out.push(fill(r1 <= 4 && r2 <= 4 ? T.top : T.tbl, { H, A: Aw, R1: T.pos(r1), R2: T.pos(r2) }));

  // tip: γιατί (με τα ίδια νούμερα)
  const tip = (x.tips || []).find((t) => !t.locked), locked = (x.tips || []).some((t) => t.locked);
  if (tip) {
    const sel = (SEL && SEL[tip.sel]) || tip.sel, O = Number(tip.price).toFixed(2), s = tip.sel;
    const both = h.concat(a), avg = both.length ? (both.reduce((q, g) => q + g.gf + g.ga, 0) / both.length) : null;
    const G = avg == null ? "" : avg.toFixed(1);
    const L = (s.match(/\d(\d)$/) || [])[1] ? `${s.slice(1, 2)}.${s.slice(2)}` : "";
    let st = "", ev = "";
    if (/^O\d/.test(s)) { if (avg != null) st = fill(T.over, { G }); ev = fill(T.evO, { L: Math.ceil(parseFloat(L) || 2.5) }); }
    else if (/^U\d/.test(s)) { if (avg != null) st = fill(T.under, { G }); ev = fill(T.evU, { L }); }
    else if (s === "GG") { if (h.length && a.length) st = fill(T.gg, { H, A: Aw, X: h.filter((g) => g.gf > 0).length, Y: a.filter((g) => g.gf > 0).length }); ev = T.evGG; }
    else if (s === "NG") { if (h.length && a.length) st = fill(T.ng, { H, A: Aw, X: h.filter((g) => g.gf === 0 || g.ga === 0).length, Y: a.filter((g) => g.gf === 0 || g.ga === 0).length }); ev = T.evNG; }
    else if (s === "1" || s === "2") { const me = s === "1" ? h : a, op = s === "1" ? a : h, tm = s === "1" ? H : Aw; if (me.length && op.length && pts(me) > pts(op)) st = fill(T.side, { T: tm, P: pts(me), Q: pts(op) }); ev = fill(T.evW, { T: tm }); }
    else if (s === "1X" || s === "X2") { const tm = s === "1X" ? H : Aw; ev = fill(T.evDC, { T: tm }); }
    else if (s === "X") { if (h.length && a.length) st = fill(T.draw, { P: pts(h), Q: pts(a) }); ev = T.evX; }
    if (st) out.push(st);
    const PC = tip.prob ? Math.round(tip.prob * 100) : null;
    out.push(ev && PC ? fill(T.concl[(x.id >> 1) % T.concl.length], { EV: ev, PC, SEL: sel, O }) : fill(T.gen, { SEL: sel, O }));
  } else if (locked) out.push(T.vip);
  else if (out.length) out.push(T.none);
  return out.length >= 2 ? out.join(" ") : "";
}
