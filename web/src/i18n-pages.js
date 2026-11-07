// Κείμενα στατικών σελίδων (Ποιοι είμαστε, Επικοινωνία, Υπεύθυνο παιχνίδι, Δήλωση affiliate, Όροι, Απόρρητο, Cookies).
// Συμπλήρωμα του i18n.js: όλα τα κείμενα σελίδων ζουν ΜΟΝΟ εδώ. Όλα «προς έλεγχο» από ντόπιους.
// Μορφή σώματος: "## τίτλος", "- λίστα", κενή γραμμή = νέα παράγραφος, **έντονα**, [κείμενο](link).
// ΠΡΟΣΟΧΗ: μην γράφεις «18+» μέσα σε πρόταση· σε σελίδες 21+ αλλάζει αυτόματα σε «21+».

export const OP = { name: "Christos Menelaou", city: "Paphos, Cyprus", addr: "Annis Komninis 2, 8010 Paphos, Cyprus", legal: "admin@betizzi.com", hello: "hello@betizzi.com", partners: "marketing@betizzi.com", privacy: "privacy@betizzi.com", updated: "2026-11-03" };

// 07/11: + «Πώς δουλεύουμε» (how) και Impressum/Νομικά στοιχεία (impressum, ΠΑΝΤΑ τελευταίο στο footer). Όροι/Απόρρητο/Cookies σε όλες τις γλώσσες.
export const PG_ORDER = ["about", "how", "contact", "responsible", "affiliate", "partners", "terms", "privacy", "cookies", "impressum"];

export const PG = {
  about: {
    slug: { en: "about", el: "poioi-eimaste", es: "quienes-somos", pt: "quem-somos", fr: "qui-sommes-nous", de: "ueber-uns", ro: "despre-noi", sr: "o-nama", bg: "za-nas" },
    title: { en: "About betizzi", el: "Ποιοι είμαστε", es: "Quiénes somos", pt: "Quem somos", fr: "Qui sommes-nous", de: "Über betizzi", ro: "Despre betizzi", sr: "O nama", bg: "За нас" },
    desc: {
      en: "betizzi is a free football tips site: model-based tips, a public record of every tip and ready-made parlays every day. Not a bookmaker.",
      el: "Το betizzi είναι δωρεάν site με tips ποδοσφαίρου: tips από μοντέλο, δημόσιο ιστορικό κάθε tip και έτοιμα παρολί κάθε μέρα. Δεν είναι bookmaker.",
      es: "betizzi es una web gratuita de pronósticos de fútbol: tips con modelo, un historial público de cada tip y combinadas listas cada día. No es una casa de apuestas.",
      pt: "O betizzi é um site gratuito de palpites de futebol: palpites por modelo, histórico público de cada palpite e múltiplas prontas todos os dias. Não é uma casa de apostas.",
      fr: "betizzi est un site gratuit de pronostics foot : tips issus d'un modèle, un historique public de chaque tip et des combinés prêts chaque jour. Pas un bookmaker.",
      de: "betizzi ist eine kostenlose Fußball-Tipps-Seite: modellbasierte Tipps, eine öffentliche Bilanz jedes Tipps und fertige Kombis jeden Tag. Kein Buchmacher.",
      ro: "betizzi este un site gratuit de ponturi la fotbal: ponturi din model, istoric public al fiecărui pont și bilete gata făcute în fiecare zi. Nu este casă de pariuri.",
      sr: "betizzi je besplatan sajt sa fudbalskim tipovima: tipovi iz modela, javna istorija svakog tipa i gotovi tiketi svaki dan. Nije kladionica.",
      bg: "betizzi е безплатен сайт с футболни прогнози: прогнози от модел, публична история на всяка прогноза и готови комбинации всеки ден. Не е букмейкър.",
    },
    body: {
      en: `betizzi is a free football tips site for people who bet for fun. We look at the day's matches, filter them, and give a tip only where our model sees a clear signal — not on every game.

## What you get
- Free tips and VIP tips, each with a short reason and the price when we published it.
- A public record of every tip, wins and losses. We never promise a win.
- Odds from several bookmakers, so you can see where the price is best.
- Ready-made parlays every day, your own slip and live scores to follow your games.

## How tips are made
We look at each team's recent form (last 10 games, home and away), the league table and bookmaker prices. A tip appears only when the numbers agree. Every tip is published before kick-off and is never edited afterwards; results (wins and losses) are shown on our [Record](/en/record) page.

## Who runs betizzi
betizzi is run from ${OP.city}. Contact: [${OP.hello}](mailto:${OP.hello}).

## What we are not
We are not a bookmaker and we do not take bets. We may earn a commission from bookmakers — see our [Affiliate disclosure](/en/affiliate-disclosure).`,
      el: `Το betizzi είναι δωρεάν site με tips ποδοσφαίρου για όσους παίζουν για διασκέδαση. Κοιτάμε τους αγώνες της ημέρας, τους φιλτράρουμε και δίνουμε tip μόνο όπου το μοντέλο μας βλέπει καθαρό σήμα — όχι σε κάθε αγώνα.

## Τι βρίσκεις εδώ
- Free και VIP tips, το καθένα με σύντομη αιτιολόγηση και την απόδοση τη στιγμή που το δημοσιεύσαμε.
- Δημόσιο ιστορικό κάθε tip, με νίκες και ήττες. Δεν υποσχόμαστε ποτέ κέρδος.
- Αποδόσεις από πολλούς bookmakers, για να βλέπεις πού είναι καλύτερη η τιμή.
- Έτοιμα παρολί κάθε μέρα, το δικό σου δελτίο και live σκορ για να παρακολουθείς τα παιχνίδια σου.

## Πώς βγαίνουν τα tips
Κοιτάμε τη φόρμα κάθε ομάδας (τελευταία 10 παιχνίδια, εντός και εκτός), τη βαθμολογία και τις αποδόσεις. Tip βγαίνει μόνο όταν τα νούμερα συμφωνούν. Κάθε tip δημοσιεύεται πριν τη σέντρα και δεν αλλάζει ποτέ μετά· τα αποτελέσματα, νίκες και ήττες, φαίνονται στη σελίδα [Record](/el/istoriko-tips).

## Ποιος είναι πίσω από το betizzi
Το betizzi λειτουργεί από την Πάφο της Κύπρου. Επικοινωνία: [${OP.hello}](mailto:${OP.hello}).

## Τι δεν είμαστε
Δεν είμαστε bookmaker και δεν δεχόμαστε στοιχήματα. Μπορεί να παίρνουμε προμήθεια από bookmakers — δες τη [Δήλωση affiliate](/el/dilosi-affiliate).`,
      es: `betizzi es una web gratuita de pronósticos de fútbol para quienes apuestan por diversión. Revisamos los partidos del día, los filtramos y damos un tip solo donde nuestro modelo ve una señal clara, no en todos los partidos.

## Qué encontrarás
- Tips gratis y VIP, cada uno con un breve motivo y la cuota en el momento de publicarlo.
- Un historial público de cada tip, con aciertos y fallos. Nunca prometemos ganar.
- Cuotas de varias casas, para ver dónde está el mejor precio.
- Combinadas listas cada día, tu propio boleto y resultados en directo.

## Cómo hacemos los tips
Miramos la forma reciente de cada equipo (últimos 10 partidos, en casa y fuera), la clasificación y las cuotas. Solo hay tip cuando los números coinciden. Cada tip se publica antes del partido y nunca se modifica; los resultados, aciertos y fallos, están en nuestro [Historial](/es/historial).

## Quién está detrás
betizzi se gestiona desde Pafos (Chipre). Contacto: [${OP.hello}](mailto:${OP.hello}).

## Qué no somos
No somos una casa de apuestas y no aceptamos apuestas. Podemos recibir una comisión de casas de apuestas: consulta nuestra [Aviso sobre afiliados](/es/aviso-afiliados).`,
      pt: `O betizzi é um site gratuito de palpites de futebol para quem aposta por diversão. Olhamos os jogos do dia, filtramos e damos palpite só onde o nosso modelo vê um sinal claro, não em todos os jogos.

## O que você encontra
- Palpites grátis e VIP, cada um com um motivo curto e a odd no momento da publicação.
- Um histórico público de cada palpite, com acertos e erros. Nunca prometemos ganhos.
- Odds de várias casas, para ver onde o preço está melhor.
- Múltiplas prontas todos os dias, seu próprio bilhete e placares ao vivo.

## Como fazemos os palpites
Olhamos a forma recente de cada time (últimos 10 jogos, em casa e fora), a classificação e as odds. Só sai palpite quando os números concordam. Cada palpite é publicado antes do jogo e nunca é alterado; os resultados, acertos e erros, estão no nosso [Histórico](/pt/historico).

## Quem está por trás
O betizzi é gerido a partir de Pafos, Chipre. Contato: [${OP.hello}](mailto:${OP.hello}).

## O que não somos
Não somos casa de apostas e não aceitamos apostas. Podemos receber comissão de casas de apostas: veja a nossa [Divulgação de afiliados](/pt/divulgacao-afiliados).`,
      fr: `betizzi est un site gratuit de pronostics foot pour ceux qui parient pour le plaisir. Nous passons en revue les matchs du jour, nous les filtrons et ne donnons un tip que là où notre modèle voit un signal clair, pas sur chaque match.

## Ce que tu trouves ici
- Des tips gratuits et VIP, chacun avec une courte explication et la cote au moment de la publication.
- Un historique public de chaque tip, gagnés et perdus. Nous ne promettons jamais de gain.
- Les cotes de plusieurs bookmakers, pour voir où la cote est meilleure.
- Des combinés prêts chaque jour, ton propre ticket et des scores en direct pour suivre tes matchs.

## Comment nous faisons les tips
Nous regardons la forme récente de chaque équipe (10 derniers matchs, à domicile et à l'extérieur), le classement et les cotes. Un tip n'apparaît que si les chiffres concordent. Chaque tip est publié avant le coup d'envoi et n'est jamais modifié ; les résultats, gagnés et perdus, figurent dans notre [Historique](/fr/historique).

## Qui est derrière betizzi
betizzi est exploité depuis Paphos, Chypre. Contact : [${OP.hello}](mailto:${OP.hello}).

## Ce que nous ne sommes pas
Nous ne sommes pas un bookmaker et nous ne prenons pas de paris. Nous pouvons toucher une commission de bookmakers : voir [Transparence sur l'affiliation](/fr/affiliation).`,
      de: `betizzi ist eine kostenlose Fußball-Tipps-Seite für alle, die aus Spaß wetten. Wir sehen uns die Spiele des Tages an, filtern sie und geben nur dort einen Tipp, wo unser Modell ein klares Signal sieht – nicht bei jedem Spiel.

## Was du hier findest
- Gratis- und VIP-Tipps, jeweils mit kurzer Begründung und der Quote zum Zeitpunkt der Veröffentlichung.
- Eine öffentliche Bilanz jedes Tipps, mit Treffern und Niederlagen. Wir versprechen nie einen Gewinn.
- Quoten mehrerer Buchmacher, damit du siehst, wo die Quote besser ist.
- Fertige Kombis jeden Tag, dein eigener Wettschein und Live-Ergebnisse.

## Wie die Tipps entstehen
Wir betrachten die aktuelle Form jedes Teams (letzte 10 Spiele, zu Hause und auswärts), die Tabelle und die Quoten. Ein Tipp erscheint nur, wenn die Zahlen übereinstimmen. Jeder Tipp wird vor Anpfiff veröffentlicht und danach nie geändert; die Ergebnisse, Treffer und Niederlagen, stehen in unserer [Bilanz](/de/bilanz).

## Wer hinter betizzi steht
betizzi wird von Paphos, Zypern, aus betrieben. Kontakt: [${OP.hello}](mailto:${OP.hello}).

## Was wir nicht sind
Wir sind kein Buchmacher und nehmen keine Wetten an. Wir können Provisionen von Buchmachern erhalten – siehe unseren [Affiliate-Hinweis](/de/affiliate-hinweis).`,
      ro: `betizzi este un site gratuit de ponturi la fotbal pentru cei care pariază din plăcere. Ne uităm la meciurile zilei, le filtrăm și dăm pont doar acolo unde modelul nostru vede un semnal clar, nu la fiecare meci.

## Ce găsești aici
- Ponturi gratuite și VIP, fiecare cu o scurtă explicație și cota din momentul publicării.
- Un istoric public al fiecărui pont, cu câștiguri și pierderi. Nu promitem niciodată câștig.
- Cote de la mai multe case de pariuri, ca să vezi unde e prețul mai bun.
- Bilete gata făcute în fiecare zi, biletul tău și scoruri live.

## Cum facem ponturile
Ne uităm la forma recentă a fiecărei echipe (ultimele 10 meciuri, acasă și în deplasare), clasament și cote. Un pont apare doar când cifrele se potrivesc. Fiecare pont e publicat înainte de start și nu se modifică niciodată; rezultatele, câștiguri și pierderi, sunt în [Istoricul](/ro/istoric) nostru.

## Cine se află în spatele betizzi
betizzi este administrat din Paphos, Cipru. Contact: [${OP.hello}](mailto:${OP.hello}).

## Ce nu suntem
Nu suntem casă de pariuri și nu acceptăm pariuri. Putem primi comision de la case de pariuri: vezi [Declarația de afiliere](/ro/declaratie-afiliere).`,
      sr: `betizzi je besplatan sajt sa fudbalskim tipovima za one koji se klade iz zabave. Gledamo utakmice dana, filtriramo ih i dajemo tip samo tamo gde naš model vidi jasan signal, ne na svakoj utakmici.

## Šta ovde nalaziš
- Besplatne i VIP tipove, svaki sa kratkim obrazloženjem i kvotom u trenutku objave.
- Javnu istoriju svakog tipa, sa pogocima i promašajima. Nikad ne obećavamo dobitak.
- Kvote više kladionica, da vidiš gde je cena bolja.
- Gotove tikete svaki dan, svoj tiket i rezultate uživo.

## Kako nastaju tipovi
Gledamo skorašnju formu svakog tima (poslednjih 10 utakmica, kod kuće i u gostima), tabelu i kvote. Tip se pojavljuje samo kad se brojke slažu. Svaki tip se objavljuje pre početka i posle se nikad ne menja; rezultati, pogoci i promašaji, su u našoj [Istoriji](/sr/istorija).

## Ko stoji iza betizzi
betizzi se vodi iz Pafosa, Kipar. Kontakt: [${OP.hello}](mailto:${OP.hello}).

## Šta nismo
Nismo kladionica i ne primamo opklade. Možemo dobiti proviziju od kladionica: pogledaj našu [Izjavu o partnerstvu](/sr/izjava-o-partnerstvu).`,
      bg: `betizzi е безплатен сайт с футболни прогнози за хора, които залагат за удоволствие. Преглеждаме мачовете за деня, филтрираме ги и даваме прогноза само там, където моделът ни вижда ясен сигнал, не за всеки мач.

## Какво ще намериш тук
- Безплатни и VIP прогнози, всяка с кратко обяснение и коефициента в момента на публикуване.
- Публична история на всяка прогноза, с печалби и загуби. Никога не обещаваме печалба.
- Коефициенти от няколко букмейкъра, за да видиш къде цената е по-добра.
- Готови комбинации всеки ден, твоят собствен фиш и резултати на живо.

## Как правим прогнозите
Гледаме скорошната форма на всеки отбор (последните 10 мача, у дома и като гост), класирането и коефициентите. Прогноза има само когато числата съвпадат. Всяка прогноза се публикува преди началото и никога не се променя; резултатите, печалби и загуби, са в нашата [История](/bg/istoria).

## Кой стои зад betizzi
betizzi се управлява от Пафос, Кипър. Контакт: [${OP.hello}](mailto:${OP.hello}).

## Какво не сме
Не сме букмейкър и не приемаме залози. Може да получаваме комисионна от букмейкъри: виж нашето [Разкриване на партньорство](/bg/razkrivane-partnyorstva).`,
    },
  },

  contact: {
    slug: { en: "contact", el: "epikoinonia", es: "contacto", pt: "contato", fr: "contact", de: "kontakt", ro: "contact", sr: "kontakt", bg: "kontakti" },
    title: { en: "Contact", el: "Επικοινωνία", es: "Contacto", pt: "Contato", fr: "Contact", de: "Kontakt", ro: "Contact", sr: "Kontakt", bg: "Контакти" },
    desc: { en: "How to contact betizzi.", el: "Πώς επικοινωνείς με το betizzi.", es: "Cómo contactar con betizzi.", pt: "Como falar com o betizzi.", fr: "Comment contacter betizzi.", de: "So erreichst du betizzi.", ro: "Cum contactezi betizzi.", sr: "Kako da kontaktiraš betizzi.", bg: "Как да се свържеш с betizzi." },
    body: {
      en: `## Questions and feedback
[${OP.hello}](mailto:${OP.hello}) — we usually reply within 2 working days.

## Partnerships, sponsors and affiliates
[${OP.partners}](mailto:${OP.partners})

## Personal data
[${OP.privacy}](mailto:${OP.privacy})

## Operator
betizzi, ${OP.city}.

We are not a bookmaker: we cannot help with bets, accounts or payments at a bookmaker. Please contact the bookmaker directly.`,
      el: `## Ερωτήσεις και σχόλια
[${OP.hello}](mailto:${OP.hello}) — συνήθως απαντάμε μέσα σε 2 εργάσιμες.

## Συνεργασίες, χορηγοί και affiliates
[${OP.partners}](mailto:${OP.partners})

## Προσωπικά δεδομένα
[${OP.privacy}](mailto:${OP.privacy})

## Ποιος λειτουργεί το site
betizzi, Πάφος, Κύπρος.

Δεν είμαστε bookmaker: δεν μπορούμε να βοηθήσουμε με στοιχήματα, λογαριασμούς ή πληρωμές σε bookmaker. Επικοινώνησε απευθείας μαζί του.`,
      es: `## Preguntas y comentarios
[${OP.hello}](mailto:${OP.hello}) — solemos responder en 2 días laborables.

## Colaboraciones, patrocinadores y afiliados
[${OP.partners}](mailto:${OP.partners})

## Datos personales
[${OP.privacy}](mailto:${OP.privacy})

## Titular
betizzi, Pafos (Chipre).

No somos una casa de apuestas: no podemos ayudar con apuestas, cuentas o pagos en una casa de apuestas. Contacta directamente con ella.`,
      pt: `## Dúvidas e sugestões
[${OP.hello}](mailto:${OP.hello}) — costumamos responder em até 2 dias úteis.

## Parcerias, patrocinadores e afiliados
[${OP.partners}](mailto:${OP.partners})

## Dados pessoais
[${OP.privacy}](mailto:${OP.privacy})

## Responsável
betizzi, Pafos, Chipre.

Não somos casa de apostas: não podemos ajudar com apostas, contas ou pagamentos numa casa de apostas. Fale diretamente com ela.`,
      fr: `## Questions et remarques
[${OP.hello}](mailto:${OP.hello}) — on répond en général sous 2 jours ouvrés.

## Partenariats, sponsors et affiliés
[${OP.partners}](mailto:${OP.partners})

## Données personnelles
[${OP.privacy}](mailto:${OP.privacy})

## Éditeur
betizzi, Paphos, Chypre.

Nous ne sommes pas un bookmaker : nous ne pouvons pas t'aider pour des paris, comptes ou paiements chez un bookmaker. Contacte-le directement.`,
      de: `## Fragen und Feedback
[${OP.hello}](mailto:${OP.hello}) – wir antworten meist innerhalb von 2 Werktagen.

## Partnerschaften, Sponsoren und Affiliates
[${OP.partners}](mailto:${OP.partners})

## Personenbezogene Daten
[${OP.privacy}](mailto:${OP.privacy})

## Betreiber
betizzi, Paphos, Zypern.

Wir sind kein Buchmacher: Bei Wetten, Konten oder Zahlungen bei einem Buchmacher können wir nicht helfen. Bitte wende dich direkt an ihn.`,
      ro: `## Întrebări și sugestii
[${OP.hello}](mailto:${OP.hello}) — de obicei răspundem în 2 zile lucrătoare.

## Parteneriate, sponsori și afiliați
[${OP.partners}](mailto:${OP.partners})

## Date personale
[${OP.privacy}](mailto:${OP.privacy})

## Operator
betizzi, Paphos, Cipru.

Nu suntem casă de pariuri: nu putem ajuta cu pariuri, conturi sau plăți la o casă de pariuri. Contactează-o direct.`,
      sr: `## Pitanja i komentari
[${OP.hello}](mailto:${OP.hello}) — obično odgovaramo u roku od 2 radna dana.

## Saradnja, sponzori i partneri
[${OP.partners}](mailto:${OP.partners})

## Lični podaci
[${OP.privacy}](mailto:${OP.privacy})

## Operater
betizzi, Pafos, Kipar.

Nismo kladionica: ne možemo da pomognemo oko opklada, naloga ili uplata u kladionici. Obrati se direktno njoj.`,
      bg: `## Въпроси и мнения
[${OP.hello}](mailto:${OP.hello}) — обикновено отговаряме до 2 работни дни.

## Партньорства, спонсори и афилиейти
[${OP.partners}](mailto:${OP.partners})

## Лични данни
[${OP.privacy}](mailto:${OP.privacy})

## Оператор
betizzi, Пафос, Кипър.

Не сме букмейкър: не можем да помогнем със залози, профили или плащания при букмейкър. Свържи се директно с него.`,
    },
  },

  responsible: {
    slug: { en: "responsible-gambling", el: "ypefthyno-paixnidi", es: "juego-responsable", pt: "jogo-responsavel", fr: "jeu-responsable", de: "verantwortungsvolles-spielen", ro: "joc-responsabil", sr: "odgovorno-kladjenje", bg: "otgovorna-igra" },
    title: { en: "Responsible gambling · 18+", el: "Υπεύθυνο παιχνίδι · 18+", es: "Juego responsable · 18+", pt: "Jogo responsável · 18+", fr: "Jeu responsable · 18+", de: "Verantwortungsvolles Spielen · 18+", ro: "Joc responsabil · 18+", sr: "Odgovorno klađenje · 18+", bg: "Отговорна игра · 18+" },
    desc: { en: "Betting is for adults and for fun. Set a limit, never chase losses, and get help if betting stops being fun.", el: "Το στοίχημα είναι για ενήλικες και για διασκέδαση. Βάλε όριο, μην κυνηγάς τις χασούρες και ζήτα βοήθεια αν σταματήσει να είναι διασκέδαση.", es: "Apostar es para adultos y para divertirse. Pon un límite, no persigas pérdidas y pide ayuda si deja de ser divertido.", pt: "Apostar é para adultos e por diversão. Defina um limite, não corra atrás de perdas e peça ajuda se deixar de ser diversão.", fr: "Parier, c'est pour les adultes et pour le plaisir. Fixe-toi une limite, ne cours pas après tes pertes et demande de l'aide si ce n'est plus un plaisir.", de: "Wetten ist für Erwachsene und zum Spaß. Setz dir ein Limit, jag keinen Verlusten hinterher und hol dir Hilfe, wenn es keinen Spaß mehr macht.", ro: "Pariurile sunt pentru adulți și pentru distracție. Pune o limită, nu alerga după pierderi și cere ajutor dacă nu mai e distracție.", sr: "Klađenje je za odrasle i iz zabave. Postavi limit, ne juri gubitke i potraži pomoć ako prestane da bude zabava.", bg: "Залаганията са за възрастни и за забавление. Сложи си лимит, не гони загубите и потърси помощ, ако престане да е забавно." },
    body: {
      en: `betizzi is for adults only: at least 18 years old, or 21 where the law requires it (for example Greece). Tips are opinions based on statistics, not a guarantee. Every extra pick on an parlay lowers its chance of winning.

## Simple rules
- Bet for fun, never to make money or to fix money problems.
- Decide a money and time limit before you start, and stop when you reach it.
- Never chase losses.
- Never bet money you need for rent, bills or food.
- Don't bet when you are upset, tired or have been drinking.
- Use the deposit limits, time-outs and self-exclusion tools your bookmaker offers.

## Signs it may be a problem
Spending more than you planned, hiding betting from people close to you, borrowing to bet, or feeling anxious when you can't bet.

## Where to get help
- [Gambling Therapy](https://www.gamblingtherapy.org) — free, confidential support online, in many languages.
- [Gamblers Anonymous](https://www.gamblersanonymous.org)
- [Find a Helpline](https://findahelpline.com) — free local helplines in your country.
- Greece: [KETHEA](https://www.kethea.gr) · Cyprus: [National Betting Authority](https://nba.gov.cy)

If you think you may be harming yourself or are in danger, call your local emergency number.`,
      el: `Το betizzi είναι μόνο για ενήλικες: τουλάχιστον 21 ετών στην Ελλάδα, όπως ορίζει ο νόμος, και 18 στην Κύπρο και αλλού. Τα tips είναι γνώμη από στατιστικά, όχι εγγύηση. Κάθε επιπλέον επιλογή σε ένα παρολί μειώνει την πιθανότητα να κερδίσει.

## Απλοί κανόνες
- Παίξε για διασκέδαση, ποτέ για να βγάλεις χρήματα ή να λύσεις οικονομικά προβλήματα.
- Αποφάσισε όριο χρημάτων και χρόνου πριν ξεκινήσεις και σταμάτα όταν το φτάσεις.
- Μην κυνηγάς τις χασούρες.
- Μην παίζεις χρήματα που χρειάζεσαι για ενοίκιο, λογαριασμούς ή φαγητό.
- Μην παίζεις όταν είσαι αναστατωμένος, κουρασμένος ή έχεις πιει.
- Χρησιμοποίησε τα όρια κατάθεσης, τα διαλείμματα και τον αυτοαποκλεισμό που δίνει ο bookmaker σου.

## Σημάδια ότι μπορεί να υπάρχει πρόβλημα
Ξοδεύεις περισσότερα απ' όσα σκόπευες, κρύβεις το στοίχημα από δικούς σου ανθρώπους, δανείζεσαι για να παίξεις, ή αγχώνεσαι όταν δεν μπορείς να παίξεις.

## Πού θα βρεις βοήθεια
- Ελλάδα: Γραμμή βοήθειας ΚΕΘΕΑ **210 9237777** · [kethea.gr](https://www.kethea.gr).
- Κύπρος: [safergambling.gov.cy](https://safergambling.gov.cy) (υπεύθυνο παιχνίδι, Εθνική Πλατφόρμα Αυτοαποκλεισμού) · [Εθνική Αρχή Στοιχημάτων](https://nba.gov.cy).
- [Gambling Therapy](https://www.gamblingtherapy.org) — δωρεάν, εμπιστευτική υποστήριξη online.
- [Find a Helpline](https://findahelpline.com) — δωρεάν τοπικές γραμμές βοήθειας στη χώρα σου.

## Παίξε νόμιμα
Στην Ελλάδα παίξε μόνο σε εταιρείες με άδεια της ΕΕΕΠ (Επιτροπή Εποπτείας και Ελέγχου Παιγνίων). Τη λίστα θα τη βρεις στο [hgc.gov.gr](https://www.hgc.gov.gr). Όλες οι νόμιμες εταιρείες δίνουν όρια κατάθεσης και αυτοαποκλεισμό.

Στην Κύπρο παίξε μόνο σε εταιρείες με άδεια της Εθνικής Αρχής Στοιχημάτων (ΕΑΣ)· τη λίστα θα τη βρεις στο [nba.gov.cy](https://nba.gov.cy). Στην Κύπρο το όριο ηλικίας είναι 18 ετών και το online καζίνο δεν επιτρέπεται.

Αν νομίζεις ότι κινδυνεύεις, κάλεσε τον αριθμό έκτακτης ανάγκης της χώρας σου.`,
      es: `betizzi es solo para adultos: al menos 18 años, o 21 donde la ley lo exija (por ejemplo, Grecia). Los tips son opiniones basadas en estadísticas, no una garantía. Cada selección extra en una combinada reduce su probabilidad de ganar.

## Reglas sencillas
- Apuesta por diversión, nunca para ganar dinero ni para resolver problemas económicos.
- Fija un límite de dinero y de tiempo antes de empezar, y para cuando lo alcances.
- No persigas las pérdidas.
- No apuestes dinero que necesites para el alquiler, las facturas o la comida.
- No apuestes si estás alterado, cansado o has bebido.
- Usa los límites de depósito, pausas y autoexclusión de tu casa de apuestas.

## Señales de alerta
Gastar más de lo previsto, ocultar las apuestas a tu entorno, pedir prestado para apostar o sentir ansiedad cuando no puedes apostar.

## Dónde pedir ayuda
- España: [Jugar Bien](https://www.jugarbien.es) (información oficial y autoprohibición).
- [Gambling Therapy](https://www.gamblingtherapy.org) — apoyo gratuito y confidencial en línea.
- [Find a Helpline](https://findahelpline.com) — líneas de ayuda gratuitas en tu país.

Si crees que puedes hacerte daño o estás en peligro, llama al número de emergencias de tu país.`,
      pt: `O betizzi é só para adultos: pelo menos 18 anos, ou 21 onde a lei exigir. Os palpites são opiniões baseadas em estatísticas, não uma garantia. Cada seleção a mais numa múltipla reduz a chance de ganhar.

## Regras simples
- Aposte por diversão, nunca para ganhar dinheiro ou resolver problemas financeiros.
- Defina um limite de dinheiro e de tempo antes de começar e pare quando chegar nele.
- Não corra atrás das perdas.
- Não aposte dinheiro de aluguel, contas ou comida.
- Não aposte quando estiver nervoso, cansado ou depois de beber.
- Use os limites de depósito, pausas e autoexclusão da sua casa de apostas.

## Sinais de alerta
Gastar mais do que planejou, esconder as apostas das pessoas próximas, pegar dinheiro emprestado para apostar ou ficar ansioso quando não pode apostar.

## Onde buscar ajuda
- Brasil: [Jogadores Anônimos](https://www.jogadoresanonimos.com.br).
- [Gambling Therapy](https://www.gamblingtherapy.org) — apoio gratuito e confidencial online.
- [Find a Helpline](https://findahelpline.com) — linhas de ajuda gratuitas no seu país.

Se achar que está em perigo, ligue para o número de emergência do seu país.`,
      fr: `betizzi est réservé aux adultes : au moins 18 ans, ou 21 ans là où la loi l'exige. Les tips sont des avis fondés sur des statistiques, pas une garantie. Chaque sélection en plus dans un combiné réduit ses chances de gagner.

## Règles simples
- Parie pour le plaisir, jamais pour gagner de l'argent ou régler des problèmes financiers.
- Fixe-toi une limite d'argent et de temps avant de commencer, et arrête-toi quand tu l'atteins.
- Ne cours jamais après tes pertes.
- Ne parie jamais l'argent du loyer, des factures ou des courses.
- Ne parie pas si tu es énervé, fatigué ou si tu as bu.
- Utilise les limites de dépôt, les pauses et l'auto-exclusion de ton bookmaker.

## Signaux d'alerte
Dépenser plus que prévu, cacher ses paris à ses proches, emprunter pour parier ou se sentir anxieux quand on ne peut pas parier.

## Où trouver de l'aide
- France : [Joueurs Info Service](https://www.joueurs-info-service.fr).
- [Gambling Therapy](https://www.gamblingtherapy.org) — soutien gratuit et confidentiel en ligne.
- [Find a Helpline](https://findahelpline.com) — lignes d'aide gratuites dans ton pays.

Si tu penses être en danger, appelle le numéro d'urgence de ton pays.`,
      de: `betizzi ist nur für Erwachsene: mindestens 18 Jahre, oder 21, wo das Gesetz es verlangt. Tipps sind Meinungen auf Basis von Statistik, keine Garantie. Jede zusätzliche Auswahl in einer Kombiwette senkt ihre Gewinnchance.

## Einfache Regeln
- Wette zum Spaß, nie um Geld zu verdienen oder Geldprobleme zu lösen.
- Leg vorher ein Geld- und Zeitlimit fest und hör auf, wenn du es erreichst.
- Jag keinen Verlusten hinterher.
- Setz kein Geld ein, das du für Miete, Rechnungen oder Essen brauchst.
- Wette nicht, wenn du aufgewühlt, müde oder angetrunken bist.
- Nutze Einzahlungslimits, Pausen und Selbstsperre bei deinem Buchmacher.

## Warnzeichen
Mehr ausgeben als geplant, Wetten vor Nahestehenden verheimlichen, Geld leihen, um zu wetten, oder Unruhe, wenn du nicht wetten kannst.

## Hier gibt es Hilfe
- Deutschland: [Check dein Spiel (BIÖG)](https://www.check-dein-spiel.de).
- Österreich: [Spielsuchthilfe](https://www.spielsuchthilfe.at).
- [Gambling Therapy](https://www.gamblingtherapy.org) — kostenlose, vertrauliche Online-Hilfe.

Wenn du dir selbst schaden könntest oder in Gefahr bist, ruf den Notruf 112 an.`,
      ro: `betizzi este doar pentru adulți: cel puțin 18 ani, sau 21 acolo unde o cere legea. Ponturile sunt opinii bazate pe statistici, nu o garanție. Fiecare selecție în plus pe un bilet îi scade șansa de câștig.

## Reguli simple
- Pariază pentru distracție, niciodată ca să faci bani sau să rezolvi probleme financiare.
- Stabilește o limită de bani și de timp înainte să începi și oprește-te când ai atins-o.
- Nu alerga după pierderi.
- Nu paria banii de chirie, facturi sau mâncare.
- Nu paria când ești supărat, obosit sau ai băut.
- Folosește limitele de depunere, pauzele și autoexcluderea oferite de casa ta de pariuri.

## Semne de alarmă
Cheltui mai mult decât ți-ai propus, ascunzi pariurile de cei apropiați, te împrumuți ca să pariezi sau devii neliniștit când nu poți paria.

## Unde găsești ajutor
- România: [Joc Responsabil](https://www.jocresponsabil.ro).
- [Gambling Therapy](https://www.gamblingtherapy.org) — sprijin gratuit și confidențial online.
- [Find a Helpline](https://findahelpline.com) — linii de ajutor gratuite în țara ta.

Dacă crezi că ești în pericol, sună la numărul de urgență din țara ta.`,
      sr: `betizzi je samo za punoletne: najmanje 18 godina, ili 21 gde to zakon traži. Tipovi su mišljenja zasnovana na statistici, ne garancija. Svaki dodatni par na tiketu smanjuje šansu da prođe.

## Jednostavna pravila
- Kladi se iz zabave, nikad da bi zaradio ili rešio finansijske probleme.
- Pre početka odredi limit novca i vremena i stani kad ga dostigneš.
- Ne juri gubitke.
- Ne ulaži novac koji ti treba za kiriju, račune ili hranu.
- Ne kladi se kad si uznemiren, umoran ili si pio.
- Koristi limite uplate, pauze i samoisključenje koje nudi tvoja kladionica.

## Znaci upozorenja
Trošiš više nego što si planirao, kriješ klađenje od bliskih ljudi, pozajmljuješ da bi se kladio ili si nervozan kad ne možeš da se kladiš.

## Gde potražiti pomoć
- [Gambling Therapy](https://www.gamblingtherapy.org) — besplatna i poverljiva pomoć onlajn.
- [Gamblers Anonymous](https://www.gamblersanonymous.org)
- [Find a Helpline](https://findahelpline.com) — besplatne linije za pomoć u tvojoj zemlji.

Ako misliš da si u opasnosti, pozovi broj za hitne slučajeve u svojoj zemlji.`,
      bg: `betizzi е само за пълнолетни: поне 18 години или 21, където законът го изисква. Прогнозите са мнение въз основа на статистика, а не гаранция. Всеки допълнителен избор във фиш намалява шанса той да спечели.

## Прости правила
- Залагай за удоволствие, никога за да печелиш пари или да решаваш финансови проблеми.
- Определи лимит за пари и време, преди да започнеш, и спри, когато го достигнеш.
- Не гони загубите.
- Не залагай пари за наем, сметки или храна.
- Не залагай, когато си разстроен, уморен или си пил.
- Използвай лимитите за депозит, паузите и самоизключването при своя букмейкър.

## Тревожни знаци
Харчиш повече от планираното, криеш залозите от близките си, взимаш назаем, за да залагаш, или се тревожиш, когато не можеш да залагаш.

## Къде да потърсиш помощ
- [Gambling Therapy](https://www.gamblingtherapy.org) — безплатна и поверителна помощ онлайн.
- [Gamblers Anonymous](https://www.gamblersanonymous.org)
- [Find a Helpline](https://findahelpline.com) — безплатни линии за помощ в твоята държава.

Ако мислиш, че си в опасност, обади се на номера за спешни случаи в твоята държава.`,
    },
  },

  affiliate: {
    slug: { en: "affiliate-disclosure", el: "dilosi-affiliate", es: "aviso-afiliados", pt: "divulgacao-afiliados", fr: "affiliation", de: "affiliate-hinweis", ro: "declaratie-afiliere", sr: "izjava-o-partnerstvu", bg: "razkrivane-partnyorstva" },
    title: { en: "Affiliate disclosure", el: "Δήλωση affiliate", es: "Aviso sobre afiliados", pt: "Divulgação de afiliados", fr: "Transparence sur l'affiliation", de: "Affiliate-Hinweis", ro: "Declarație de afiliere", sr: "Izjava o partnerstvu", bg: "Разкриване на партньорство" },
    desc: { en: "How betizzi earns money and why it does not change our tips.", el: "Πώς βγάζει χρήματα το betizzi και γιατί αυτό δεν αλλάζει τα tips μας.", es: "Cómo gana dinero betizzi y por qué no cambia nuestros tips.", pt: "Como o betizzi ganha dinheiro e por que isso não muda os nossos palpites.", fr: "Comment betizzi gagne de l'argent et pourquoi cela ne change pas nos tips.", de: "Wie betizzi Geld verdient und warum das unsere Tipps nicht beeinflusst.", ro: "Cum câștigă bani betizzi și de ce asta nu ne schimbă ponturile.", sr: "Kako betizzi zarađuje i zašto to ne menja naše tipove.", bg: "Как betizzi печели пари и защо това не променя прогнозите ни." },
    body: {
      en: `betizzi is free for you. To keep it that way, we may earn a commission when you open an account with a bookmaker through a link or button on our site (an "affiliate link"), or a bookmaker may sponsor the site.

## What this means for you
- It costs you nothing extra.
- Our tips are produced by the same rules for every match, before we look at any partner. A partner cannot buy, change or remove a tip.
- We show prices from several bookmakers, not only from partners, and we tell you when a price is poor.
- Sponsored buttons and cards are marked "Ad".
- We only show bookmaker links where that bookmaker is licensed in your country, and none at all in Italy or Brazil.

Links to bookmakers carry rel="sponsored". Questions: [${OP.partners}](mailto:${OP.partners}).`,
      el: `Το betizzi είναι δωρεάν για σένα. Για να μείνει έτσι, μπορεί να παίρνουμε προμήθεια όταν ανοίγεις λογαριασμό σε bookmaker από link ή κουμπί του site μας (affiliate link), ή ένας bookmaker μπορεί να είναι χορηγός του site.

## Τι σημαίνει αυτό για σένα
- Δεν σου κοστίζει τίποτα παραπάνω.
- Τα tips μας βγαίνουν με τους ίδιους κανόνες για κάθε αγώνα, πριν κοιτάξουμε οποιονδήποτε συνεργάτη. Κανένας συνεργάτης δεν μπορεί να αγοράσει, να αλλάξει ή να σβήσει ένα tip.
- Δείχνουμε αποδόσεις από πολλούς bookmakers, όχι μόνο από συνεργάτες, και σου λέμε πότε μια τιμή είναι κακή.
- Τα κουμπιά και οι κάρτες χορηγών έχουν την ένδειξη «Διαφήμιση».
- Δείχνουμε links bookmaker μόνο όπου ο bookmaker έχει άδεια στη χώρα σου, και καθόλου στην Ιταλία.

Τα links προς bookmakers έχουν rel="sponsored". Ερωτήσεις: [${OP.partners}](mailto:${OP.partners}).`,
      es: `betizzi es gratis para ti. Para que siga así, podemos recibir una comisión cuando abres una cuenta en una casa de apuestas desde un enlace o botón de nuestra web (enlace de afiliado), o una casa puede patrocinar la web.

## Qué significa para ti
- No te cuesta nada más.
- Nuestros tips salen con las mismas reglas para todos los partidos, antes de mirar a ningún socio. Ningún socio puede comprar, cambiar ni quitar un tip.
- Mostramos cuotas de varias casas, no solo de socios, y te avisamos cuando una cuota es mala.
- Los botones y tarjetas patrocinados llevan la etiqueta «Publicidad».
- Solo mostramos enlaces de casas con licencia en tu país, y ninguno en Italia.

Los enlaces a casas de apuestas llevan rel="sponsored". Preguntas: [${OP.partners}](mailto:${OP.partners}).`,
      pt: `O betizzi é grátis para você. Para continuar assim, podemos receber comissão quando você abre conta numa casa de apostas por um link ou botão do nosso site (link de afiliado), ou uma casa pode patrocinar o site.

## O que isso significa para você
- Não custa nada a mais.
- Nossos palpites saem pelas mesmas regras em todos os jogos, antes de olharmos qualquer parceiro. Nenhum parceiro pode comprar, mudar ou remover um palpite.
- Mostramos odds de várias casas, não só de parceiros, e avisamos quando uma odd é ruim.
- Botões e cartões patrocinados têm o selo "Publicidade".
- Só mostramos links de casas licenciadas no seu país, e nenhum na Itália.

Os links para casas de apostas têm rel="sponsored". Dúvidas: [${OP.partners}](mailto:${OP.partners}).`,
      fr: `betizzi est gratuit pour toi. Pour qu'il le reste, nous pouvons toucher une commission quand tu ouvres un compte chez un bookmaker via un lien ou un bouton de notre site (lien d'affiliation), ou un bookmaker peut sponsoriser le site.

## Ce que ça change pour toi
- Ça ne te coûte rien de plus.
- Nos tips sont produits selon les mêmes règles pour chaque match, avant de regarder le moindre partenaire. Aucun partenaire ne peut acheter, modifier ou retirer un tip.
- Nous affichons les cotes de plusieurs bookmakers, pas seulement des partenaires, et on te prévient quand une cote est mauvaise.
- Les boutons et cartes sponsorisés portent la mention « Publicité ».
- Nous n'affichons de liens que vers des bookmakers agréés dans ton pays, et aucun en Italie.

Les liens vers les bookmakers portent rel="sponsored". Questions : [${OP.partners}](mailto:${OP.partners}).`,
      de: `betizzi ist für dich kostenlos. Damit das so bleibt, erhalten wir eventuell eine Provision, wenn du über einen Link oder Button auf unserer Seite ein Konto bei einem Buchmacher eröffnest (Affiliate-Link), oder ein Buchmacher sponsert die Seite.

## Was das für dich bedeutet
- Es kostet dich nichts extra.
- Unsere Tipps entstehen für jedes Spiel nach denselben Regeln, bevor wir auf irgendeinen Partner schauen. Kein Partner kann einen Tipp kaufen, ändern oder entfernen.
- Wir zeigen Quoten mehrerer Buchmacher, nicht nur von Partnern, und sagen dir, wenn eine Quote schlecht ist.
- Gesponserte Buttons und Karten sind als „Werbung“ gekennzeichnet.
- Wir zeigen Links nur zu Buchmachern mit Lizenz in deinem Land, in Italien gar keine.

Links zu Buchmachern tragen rel="sponsored". Fragen: [${OP.partners}](mailto:${OP.partners}).`,
      ro: `betizzi este gratuit pentru tine. Ca să rămână așa, putem primi un comision când îți deschizi cont la o casă de pariuri printr-un link sau buton de pe site (link de afiliere), sau o casă de pariuri poate sponsoriza site-ul.

## Ce înseamnă asta pentru tine
- Nu te costă nimic în plus.
- Ponturile noastre ies după aceleași reguli la fiecare meci, înainte să ne uităm la vreun partener. Niciun partener nu poate cumpăra, schimba sau șterge un pont.
- Arătăm cote de la mai multe case, nu doar de la parteneri, și îți spunem când o cotă e slabă.
- Butoanele și cardurile sponsorizate au eticheta „Publicitate”.
- Arătăm linkuri doar către case licențiate în țara ta și deloc în Italia.

Linkurile către case de pariuri au rel="sponsored". Întrebări: [${OP.partners}](mailto:${OP.partners}).`,
      sr: `betizzi je za tebe besplatan. Da bi tako i ostalo, možemo dobiti proviziju kad otvoriš nalog u kladionici preko linka ili dugmeta na našem sajtu (partnerski link), ili kladionica može biti sponzor sajta.

## Šta to znači za tebe
- Ništa te ne košta dodatno.
- Naši tipovi nastaju po istim pravilima za svaku utakmicu, pre nego što pogledamo bilo kog partnera. Nijedan partner ne može da kupi, promeni ili ukloni tip.
- Prikazujemo kvote više kladionica, ne samo partnera, i kažemo ti kad je kvota loša.
- Sponzorisana dugmad i kartice imaju oznaku „Reklama“.
- Linkove prikazujemo samo za kladionice sa licencom u tvojoj zemlji, a u Italiji nijedan.

Linkovi ka kladionicama imaju rel="sponsored". Pitanja: [${OP.partners}](mailto:${OP.partners}).`,
      bg: `betizzi е безплатен за теб. За да остане така, може да получаваме комисионна, когато си откриеш профил при букмейкър чрез линк или бутон от сайта ни (партньорски линк), или букмейкър може да спонсорира сайта.

## Какво означава това за теб
- Не ти струва нищо повече.
- Прогнозите ни се правят по едни и същи правила за всеки мач, преди да погледнем който и да е партньор. Никой партньор не може да купи, промени или премахне прогноза.
- Показваме коефициенти от няколко букмейкъра, не само от партньори, и ти казваме, когато коефициентът е лош.
- Спонсорираните бутони и карти са с етикет „Реклама“.
- Показваме линкове само към букмейкъри с лиценз в твоята държава и никакви в Италия.

Линковете към букмейкъри са с rel="sponsored". Въпроси: [${OP.partners}](mailto:${OP.partners}).`,
    },
  },

  // Απόφαση Owner 04/11: σελίδα για bookmakers (μόνο αγγλικά). Μόνο πραγματικά νούμερα· κανένα ποσοστό επιτυχίας (link στο Record).
  partners: {
    slug: { en: "partners" },
    title: { en: "Partners · for bookmakers" },
    desc: { en: "Partner with betizzi: per-country placement inside every slip, odds display, exclusivity and main sponsor. Licensed operators only." },
    body: {
      en: `betizzi is a free football tips site with ready-made parlays, made for people who bet for fun. Every tip comes from the same model-based rules and is published before kick-off, with a public record of every win and loss. We go live on **10 November 2026**.

## Where we are
- 9 languages: English, Greek, Spanish, Portuguese, French, German, Romanian, Serbian, Bulgarian.
- First markets: Cyprus, Greece, Romania, Serbia, Bulgaria, Spain, Portugal, France, Germany, and English-speaking Africa.
- The site shows a different partner per country, based on the visitor's country.

## What we offer a partner
- A "Play it at [your brand]" button inside every slip and every ready-made parlay.
- Your prices shown next to our tips.
- **Exclusivity per country:** your brand as the only bookmaker shown in that country.
- Main sponsor: your brand on our parlays and on the images players share.
- A bet-slip deep link, so the player's slip opens at your site already filled in (if you offer one).

## How we work
- We only promote operators licensed in the visitor's country. No bookmaker links in Italy or Brazil.
- Age notices per country (18+, or 21+ where the law asks for it, e.g. Greece), "bet only what you can afford to lose" on every slip, and no "sure win" language.
- For Greece we register with the HGC affiliate registry before any agreement.
- A partner cannot buy, change or remove a tip. Our full results are public: [Record](/en/record).

## Numbers
We launch on 10 November 2026. We will share real traffic and click numbers (from our analytics) on request. We do not publish estimates.

## Contact
Write to [${OP.partners}](mailto:${OP.partners}) with your brand, the countries you are licensed in and the type of deal you have in mind (CPA, RevShare, hybrid or sponsorship).

${OP.name}, founder · ${OP.city}`,
    },
  },
  terms: {
    slug: { en: "terms", el: "oroi-xrisis" },
    title: { en: "Terms of use", el: "Όροι χρήσης" },
    desc: { en: "The terms for using betizzi.", el: "Οι όροι χρήσης του betizzi." },
    body: {
      en: `Effective date: 1 November 2026.

These Terms govern your use of betizzi.com (the "Service"). The Service is operated by the sole proprietorship of ${OP.name}, ${OP.city} ("we", "us"). Contact: [${OP.hello}](mailto:${OP.hello}). By using the Service you agree to these Terms.

## What the Service is
betizzi publishes football match information, statistics, model-based tips and estimated chances, bookmaker prices and tools such as a slip builder, for information and entertainment. Tips and chances are estimates from data and rules that may change. Prices shown belong to third-party bookmakers and may change, differ by country or account, or no longer be available.

betizzi is not a bookmaker or gambling operator. We do not accept or settle bets and we do not hold player funds. Anything you do with a bookmaker is between you and that bookmaker, under its terms and the law where you live.

## Who may use it
The Service is for adults aged 18 or older, or older where the law requires (for example 21 in Greece). Do not use it where this would be unlawful. Only you decide whether to place a bet.

## No promise of winnings
A tip is not a promise that a bet will win. Data, results, kick-off times and prices can be incomplete, late or wrong. Past results do not predict future ones. We do not give personal betting or financial advice. To the extent the law allows, we are not responsible for losses from bets you place.

## Credits and rewards
If we offer credits or rewards (for example for sharing or inviting friends), they have no cash value, cannot be sold or transferred, and may be changed or ended. We may cancel credits obtained through abuse, fake accounts or automation.

## Accounts
If accounts are offered, you must give an email address you control and keep access secure. We may suspend or remove an account for abuse, unlawful use or a serious breach of these Terms. You can ask us to delete your account at any time.

## Acceptable use
Do not copy the Service in bulk, scrape it automatically, interfere with it, or use it to break the law. Do not present our tips as your own paid service.

## Links and advertising
The Service contains links to third-party sites, including bookmakers, some of which may pay us (see the Affiliate disclosure). We are not responsible for third-party sites.

## Intellectual property
The site, the betizzi name and logo, texts and designs belong to us or our licensors. Team names and logos belong to their owners and are used for identification only.

## Changes and law
We may update these Terms; the date above shows the current version. These Terms are governed by the law of the Republic of Cyprus, without limiting any mandatory consumer rights you have where you live.`,
      el: `Ισχύουν από: 1 Νοεμβρίου 2026.

Οι παρόντες Όροι ισχύουν για τη χρήση του betizzi.com (η «Υπηρεσία»). Την Υπηρεσία λειτουργεί η ατομική επιχείρηση ${OP.name}, Πάφος, Κύπρος («εμείς»). Επικοινωνία: [${OP.hello}](mailto:${OP.hello}). Χρησιμοποιώντας την Υπηρεσία, αποδέχεσαι τους Όρους.

## Τι είναι η Υπηρεσία
Το betizzi δημοσιεύει πληροφορίες αγώνων ποδοσφαίρου, στατιστικά, tips από μοντέλο και εκτιμώμενες πιθανότητες, αποδόσεις bookmakers και εργαλεία όπως το φτιάξιμο δελτίου, για ενημέρωση και διασκέδαση. Τα tips και οι πιθανότητες είναι εκτιμήσεις από δεδομένα και κανόνες που μπορεί να αλλάξουν. Οι αποδόσεις ανήκουν σε τρίτους bookmakers και μπορεί να αλλάξουν, να διαφέρουν ανά χώρα ή λογαριασμό ή να μην είναι πια διαθέσιμες.

Το betizzi δεν είναι bookmaker ούτε πάροχος τυχερών παιγνίων. Δεν δεχόμαστε ούτε εκκαθαρίζουμε στοιχήματα και δεν κρατάμε χρήματα παικτών. Ό,τι κάνεις με έναν bookmaker αφορά εσένα και εκείνον, με τους δικούς του όρους και τον νόμο της χώρας σου.

## Ποιος μπορεί να τη χρησιμοποιεί
Η Υπηρεσία είναι για ενήλικες, τουλάχιστον 18 ετών ή μεγαλύτερους όπου το ορίζει ο νόμος (στην Ελλάδα 21). Μην τη χρησιμοποιείς όπου αυτό είναι παράνομο. Μόνο εσύ αποφασίζεις αν θα παίξεις.

## Καμία υπόσχεση κέρδους
Ένα tip δεν είναι υπόσχεση ότι το στοίχημα θα κερδίσει. Τα δεδομένα, τα αποτελέσματα, οι ώρες και οι αποδόσεις μπορεί να είναι ελλιπή, καθυστερημένα ή λάθος. Τα προηγούμενα αποτελέσματα δεν προβλέπουν τα επόμενα. Δεν δίνουμε προσωπικές συμβουλές στοιχήματος ή οικονομικές. Στο μέτρο που επιτρέπει ο νόμος, δεν ευθυνόμαστε για απώλειες από στοιχήματα που παίζεις.

## Credits και ανταμοιβές
Αν δίνουμε credits ή ανταμοιβές (π.χ. για κοινοποίηση ή πρόσκληση φίλων), δεν έχουν χρηματική αξία, δεν πωλούνται ούτε μεταβιβάζονται και μπορεί να αλλάξουν ή να καταργηθούν. Μπορούμε να ακυρώσουμε credits που αποκτήθηκαν με κατάχρηση, ψεύτικους λογαριασμούς ή αυτοματισμούς.

## Λογαριασμοί
Αν υπάρχουν λογαριασμοί, πρέπει να δώσεις email που ελέγχεις και να το κρατάς ασφαλές. Μπορούμε να αναστείλουμε ή να διαγράψουμε λογαριασμό για κατάχρηση, παράνομη χρήση ή σοβαρή παραβίαση των Όρων. Μπορείς να ζητήσεις τη διαγραφή του λογαριασμού σου όποτε θέλεις.

## Σωστή χρήση
Μην αντιγράφεις μαζικά την Υπηρεσία, μην αντλείς αυτόματα δεδομένα από αυτήν (scraping), μην παρεμβαίνεις στη λειτουργία της και μην τη χρησιμοποιείς για παράνομους σκοπούς. Μην παρουσιάζεις τα tips μας ως δική σου πληρωμένη υπηρεσία.

## Links και διαφήμιση
Η Υπηρεσία έχει links σε τρίτα sites, και σε bookmakers, κάποιοι από τους οποίους μπορεί να μας πληρώνουν (δες τη Δήλωση affiliate). Δεν ευθυνόμαστε για τρίτα sites.

## Πνευματική ιδιοκτησία
Το site, το όνομα και το λογότυπο betizzi, τα κείμενα και τα σχέδια ανήκουν σε εμάς ή σε όσους μας έδωσαν άδεια. Τα ονόματα και τα σήματα των ομάδων ανήκουν στους κατόχους τους και χρησιμοποιούνται μόνο για αναγνώριση.

## Αλλαγές και δίκαιο
Μπορεί να ενημερώνουμε τους Όρους· η ημερομηνία στην αρχή δείχνει την ισχύουσα έκδοση. Οι Όροι διέπονται από το δίκαιο της Κυπριακής Δημοκρατίας, χωρίς να περιορίζονται τα υποχρεωτικά δικαιώματα καταναλωτή της χώρας σου.`,
    },
  },

  privacy: {
    slug: { en: "privacy", el: "aporrito" },
    title: { en: "Privacy policy", el: "Πολιτική απορρήτου" },
    desc: { en: "What personal data betizzi uses and why.", el: "Ποια προσωπικά δεδομένα χρησιμοποιεί το betizzi και γιατί." },
    body: {
      en: `Effective date: 3 November 2026.

## Who is responsible
The data controller is the sole proprietorship of ${OP.name}, ${OP.city}, which operates betizzi.com. Privacy requests: [${OP.privacy}](mailto:${OP.privacy}).

## What we use
- **Technical request data** (IP address, browser, time of request, country from our hosting provider). Purpose: deliver the site, show the right age notice for your country, protect against abuse and fix errors. Legal basis: legitimate interests. Kept in short-term logs by our hosting provider (Cloudflare), usually a few days.
- **Visit counts.** We count page views and button taps by page type, language and country, with no cookie and no identifier, so we cannot tell who you are. Purpose: know which parts of the site are used. Legal basis: legitimate interests.
- **Your choices in the site** (your slip, stake, bookmaker, filters, open tab, saved coupons). Stored only in your own browser (local storage); they are not sent to us.
- **Emails you send us.** Purpose: reply to you. Legal basis: legitimate interests. Kept for as long as needed to handle your message.

## If you create a free account
- **What we keep:** your email address, language, country (from your connection), your confirmation that you are of legal age, the date you signed up, your credits history, and your choice about our newsletter.
- **Sign-in:** we email you a 6-digit code. We store only a scrambled (hashed) form of the code, for 10 minutes. When you sign in we set one sign-in cookie (bz_s) for up to 90 days; we keep a scrambled copy of it to recognise your session.
- **Security log:** sign-ins and important account actions, to protect your account and the service.
- **Purpose and legal basis:** to give you the account and its features (VIP tips, credits). Legal basis: our contract with you. Newsletters only if you tick the separate box (consent); you can withdraw it at any time.
- **Emails we send:** only the sign-in code and one welcome email. No advertising from these emails.
- **How long:** for as long as you keep your account. You can ask us to delete it at any time by writing to [${OP.privacy}](mailto:${OP.privacy}).

## Google Analytics (only if you accept)
If you click "Accept" in our cookie banner, we use Google Analytics (Google Ireland Ltd) to see how the site is used: pages viewed, device type, approximate location (country/city) and how you arrived. Legal basis: your consent. Google keeps this data for 14 months. If you click "Reject", no analytics cookies are set; Google receives only basic signals without cookies, which cannot identify you. You can change your choice at any time with "Cookie settings" at the bottom of every page.

We do not use advertising cookies and we do not sell personal data.

## Who processes data for us
Cloudflare, Inc. (hosting, database, security and sending our emails) and, only if you accept analytics cookies, Google Ireland Ltd (Google Analytics). Data may be processed outside the EU under the European Commission's standard contractual clauses or an adequacy decision.

## Your rights
You can ask for access, correction, deletion, restriction or portability of your data, or object to processing, by writing to [${OP.privacy}](mailto:${OP.privacy}). We reply within one month. You can also complain to the Cyprus Commissioner for Personal Data Protection ([dataprotection.gov.cy](https://www.dataprotection.gov.cy)) or the authority where you live.

## Age
betizzi is not for anyone under 18 (21 in Greece). We do not knowingly process data of minors.`,
      el: `Ισχύει από: 3 Νοεμβρίου 2026.

## Ποιος είναι υπεύθυνος
Υπεύθυνος επεξεργασίας είναι η ατομική επιχείρηση ${OP.name}, Πάφος, Κύπρος, που λειτουργεί το betizzi.com. Αιτήματα για τα δεδομένα σου: [${OP.privacy}](mailto:${OP.privacy}).

## Τι χρησιμοποιούμε
- **Τεχνικά στοιχεία επίσκεψης** (διεύθυνση IP, browser, ώρα, χώρα από τον πάροχο φιλοξενίας). Σκοπός: να λειτουργεί το site, να δείχνουμε τη σωστή ηλικία για τη χώρα σου, να προστατεύουμε από κατάχρηση και να διορθώνουμε λάθη. Νομική βάση: έννομο συμφέρον. Μένουν σε προσωρινά αρχεία του παρόχου μας (Cloudflare), συνήθως λίγες μέρες.
- **Μετρήσεις επισκέψεων.** Μετράμε προβολές σελίδων και πατήματα κουμπιών ανά είδος σελίδας, γλώσσα και χώρα, χωρίς cookie και χωρίς αναγνωριστικό, οπότε δεν ξέρουμε ποιος είσαι. Σκοπός: να ξέρουμε ποια σημεία του site χρησιμοποιούνται. Νομική βάση: έννομο συμφέρον.
- **Οι επιλογές σου στο site** (δελτίο, ποντάρισμα, bookmaker, φίλτρα, καρτέλα, αποθηκευμένα κουπόνια). Μένουν μόνο στον δικό σου browser (local storage) και δεν μας στέλνονται.
- **Email που μας στέλνεις.** Σκοπός: να σου απαντήσουμε. Νομική βάση: έννομο συμφέρον. Τα κρατάμε όσο χρειάζεται για το θέμα σου.

## Αν φτιάξεις δωρεάν λογαριασμό
- **Τι κρατάμε:** το email σου, τη γλώσσα, τη χώρα (από τη σύνδεσή σου), την επιβεβαίωση ότι είσαι ενήλικας, την ημερομηνία εγγραφής, το ιστορικό των credits σου και την επιλογή σου για το newsletter.
- **Σύνδεση:** σου στέλνουμε κωδικό 6 ψηφίων στο email. Κρατάμε μόνο κρυπτογραφημένη (hash) μορφή του κωδικού, για 10 λεπτά. Όταν συνδέεσαι, βάζουμε ένα cookie σύνδεσης (bz_s) έως 90 μέρες και κρατάμε κρυπτογραφημένο αντίγραφό του για να αναγνωρίζουμε τη σύνδεση.
- **Αρχείο ασφαλείας:** συνδέσεις και σημαντικές ενέργειες στον λογαριασμό, για την προστασία του λογαριασμού σου και της υπηρεσίας.
- **Σκοπός και νομική βάση:** να σου δώσουμε τον λογαριασμό και ό,τι περιλαμβάνει (VIP tips, credits). Νομική βάση: η σύμβασή μας μαζί σου. Newsletter μόνο αν τσεκάρεις το ξεχωριστό κουτάκι (συγκατάθεση)· μπορείς να την ανακαλέσεις όποτε θέλεις.
- **Email που στέλνουμε:** μόνο τον κωδικό σύνδεσης και ένα email καλωσορίσματος. Καμία διαφήμιση μέσα σε αυτά.
- **Για πόσο:** όσο έχεις λογαριασμό. Μπορείς να ζητήσεις τη διαγραφή του όποτε θέλεις, γράφοντας στο [${OP.privacy}](mailto:${OP.privacy}).

## Google Analytics (μόνο αν συμφωνήσεις)
Αν πατήσεις «Αποδοχή» στο μπάνερ cookies, χρησιμοποιούμε το Google Analytics (Google Ireland Ltd) για να βλέπουμε πώς χρησιμοποιείται το site: σελίδες που είδες, είδος συσκευής, κατά προσέγγιση τοποθεσία (χώρα/πόλη) και από πού ήρθες. Νομική βάση: η συγκατάθεσή σου. Η Google κρατά τα στοιχεία 14 μήνες. Αν πατήσεις «Απόρριψη», δεν μπαίνουν cookies μετρήσεων· η Google παίρνει μόνο βασικά σήματα χωρίς cookies, που δεν σε αναγνωρίζουν. Μπορείς να αλλάξεις την επιλογή σου όποτε θέλεις από τις «Ρυθμίσεις cookies» στο κάτω μέρος κάθε σελίδας.

Δεν χρησιμοποιούμε διαφημιστικά cookies και δεν πουλάμε προσωπικά δεδομένα.

## Ποιος επεξεργάζεται δεδομένα για εμάς
Cloudflare, Inc. (φιλοξενία, βάση δεδομένων, ασφάλεια και αποστολή των email μας) και, μόνο αν δεχτείς τα cookies μετρήσεων, η Google Ireland Ltd (Google Analytics). Τα δεδομένα μπορεί να επεξεργάζονται εκτός ΕΕ, με τις τυποποιημένες συμβατικές ρήτρες της Ευρωπαϊκής Επιτροπής ή απόφαση επάρκειας.

## Τα δικαιώματά σου
Μπορείς να ζητήσεις πρόσβαση, διόρθωση, διαγραφή, περιορισμό ή φορητότητα των δεδομένων σου, ή να αντιταχθείς στην επεξεργασία, γράφοντας στο [${OP.privacy}](mailto:${OP.privacy}). Απαντάμε μέσα σε έναν μήνα. Μπορείς επίσης να κάνεις καταγγελία στον Επίτροπο Προστασίας Δεδομένων Προσωπικού Χαρακτήρα της Κύπρου ([dataprotection.gov.cy](https://www.dataprotection.gov.cy)) ή στην αρχή της χώρας σου (στην Ελλάδα: Αρχή Προστασίας Δεδομένων, [dpa.gr](https://www.dpa.gr)).

## Ηλικία
Το betizzi δεν είναι για άτομα κάτω των 18 (21 στην Ελλάδα). Δεν επεξεργαζόμαστε εν γνώσει μας δεδομένα ανηλίκων.`,
    },
  },

  cookies: {
    slug: { en: "cookies", el: "cookies" },
    title: { en: "Cookie policy", el: "Πολιτική cookies" },
    desc: { en: "What betizzi stores in your browser.", el: "Τι αποθηκεύει το betizzi στον browser σου." },
    body: {
      en: `Effective date: 3 November 2026.

betizzi does not set advertising cookies. Analytics cookies are set only if you click "Accept" in our cookie banner.

## Cookies we set
- **bz_s** — the sign-in cookie. Set only when you sign in to your free account, so you stay signed in. HttpOnly and secure, it lasts up to 90 days and is deleted when you sign out. It is strictly necessary for the account to work, so it does not need your consent.
- **_ga, _ga_WW02BKK8TV** — Google Analytics, only if you accept. They tell visits apart so we can count how the site is used. They last up to 2 years. If you reject, they are not set.

You can change your choice at any time with "Cookie settings" at the bottom of every page.

## What we store in your browser
We also use your browser's own storage to remember choices you make, so the site works the way you left it. This data stays on your device and is not sent to us.
- **ko-slip, ko-stake, ko-smode** — your slip, stake and slip mode.
- **ko-book** — the bookmaker you chose for prices.
- **ko-lfil, ko-tab, ko-vip** — your league filter, open tab and VIP view.
- **ko-builder, ko-bmode, ko-coupons** — builder settings and coupons you saved.
- **ko-y** (only for one visit) — your scroll position.

These are needed for features you use. You can delete them at any time in your browser settings; the site will simply forget your choices (and sign you out).

If we ever add advertising cookies, we will update this page and ask for your consent first.`,
      el: `Ισχύει από: 3 Νοεμβρίου 2026.

Το betizzi δεν βάζει διαφημιστικά cookies. Cookies μετρήσεων μπαίνουν μόνο αν πατήσεις «Αποδοχή» στο μπάνερ cookies.

## Τα cookies που βάζουμε
- **bz_s** — cookie σύνδεσης. Μπαίνει μόνο όταν συνδέεσαι στον δωρεάν λογαριασμό σου, για να μένεις συνδεδεμένος. Είναι HttpOnly και ασφαλές, διαρκεί έως 90 μέρες και σβήνει όταν αποσυνδέεσαι. Είναι απολύτως απαραίτητο για να λειτουργεί ο λογαριασμός, γι' αυτό δεν χρειάζεται συγκατάθεση.
- **_ga, _ga_WW02BKK8TV** — Google Analytics, μόνο αν συμφωνήσεις. Ξεχωρίζουν τις επισκέψεις για να μετράμε πώς χρησιμοποιείται το site. Διαρκούν έως 2 χρόνια. Αν πατήσεις «Απόρριψη», δεν μπαίνουν.

Μπορείς να αλλάξεις την επιλογή σου όποτε θέλεις από τις «Ρυθμίσεις cookies» στο κάτω μέρος κάθε σελίδας.

## Τι κρατάμε στον browser σου
Χρησιμοποιούμε και τον αποθηκευτικό χώρο του browser σου για να θυμάται τις επιλογές σου, ώστε το site να είναι όπως το άφησες. Αυτά μένουν στη συσκευή σου και δεν μας στέλνονται.
- **ko-slip, ko-stake, ko-smode** — το δελτίο σου, το ποντάρισμα και ο τρόπος δελτίου.
- **ko-book** — ο bookmaker που διάλεξες για τις αποδόσεις.
- **ko-lfil, ko-tab, ko-vip** — το φίλτρο λιγκών, η καρτέλα που είχες ανοιχτή και η προβολή VIP.
- **ko-builder, ko-bmode, ko-coupons** — ρυθμίσεις και κουπόνια που αποθήκευσες.
- **ko-y** (μόνο για μία επίσκεψη) — το σημείο της σελίδας όπου ήσουν.

Χρειάζονται για λειτουργίες που χρησιμοποιείς. Μπορείς να τα σβήσεις όποτε θέλεις από τις ρυθμίσεις του browser· το site απλώς θα ξεχάσει τις επιλογές σου (και θα σε αποσυνδέσει).

Αν ποτέ προσθέσουμε διαφημιστικά cookies, θα ενημερώσουμε αυτή τη σελίδα και θα ζητήσουμε πρώτα τη συγκατάθεσή σου.`,
    },
  },
};

// ---------- 07/11/2026 (απόφαση Owner): «Πώς δουλεύουμε» + FAQ και Impressum / Νομικά στοιχεία ----------
// {REC} = σελίδα Record, {CONTACT} = σελίδα Επικοινωνίας (αντικαθίστανται στη σελίδα). Όλα «προς έλεγχο» από ντόπιους.
// Impressum: ΜΟΝΟ στο footer, τελευταίο link (απόφαση Owner 07/11: όχι σε εμφανές σημείο). Η διεύθυνση εμφανίζεται ΜΟΝΟ εδώ.
PG.how = {
  slug: { en: "how-we-work", el: "pos-doulevoume", es: "como-trabajamos", pt: "como-trabalhamos", fr: "comment-ca-marche", de: "so-arbeiten-wir", ro: "cum-lucram", sr: "kako-radimo", bg: "kak-rabotim" },
  title: { en: "How we work", el: "Πώς δουλεύουμε", es: "Cómo trabajamos", pt: "Como trabalhamos", fr: "Comment ça marche", de: "So arbeiten wir", ro: "Cum lucrăm", sr: "Kako radimo", bg: "Как работим" },
  desc: {
    en: "How betizzi picks football tips: recent form of both teams, prices from several bookmakers, ready-made parlays and a public record of every tip. No promise of winnings.",
    el: "Πώς βγάζει tips το betizzi: πρόσφατη φόρμα και των δύο ομάδων, αποδόσεις από πολλούς bookmakers, έτοιμα παρολί και δημόσιο ιστορικό κάθε tip. Χωρίς υποσχέσεις για κέρδη.",
    es: "Cómo elige betizzi sus pronósticos: forma reciente de ambos equipos, cuotas de varias casas, combinadas listas y un historial público de cada tip. Sin promesas de ganancias.",
    pt: "Como o betizzi escolhe os palpites: forma recente das duas equipas, odds de várias casas, múltiplas prontas e um histórico público de cada palpite. Sem promessas de ganhos.",
    fr: "Comment betizzi choisit ses pronos : forme récente des deux équipes, cotes de plusieurs bookmakers, combinés prêts et un historique public de chaque tip. Aucune promesse de gain.",
    de: "Wie betizzi Fußball-Tipps auswählt: aktuelle Form beider Teams, Quoten mehrerer Buchmacher, fertige Kombis und eine öffentliche Bilanz jedes Tipps. Kein Gewinnversprechen.",
    ro: "Cum alege betizzi ponturile: forma recentă a ambelor echipe, cote de la mai multe case, bilete gata făcute și un istoric public al fiecărui pont. Fără promisiuni de câștig.",
    sr: "Kako betizzi bira tipove: skorašnja forma oba tima, kvote više kladionica, gotovi tiketi i javna istorija svakog tipa. Bez obećanja dobitka.",
    bg: "Как betizzi избира прогнозите си: скорошна форма на двата отбора, коефициенти от няколко букмейкъра, готови фишове и публична история на всяка прогноза. Без обещания за печалба.",
  },
  body: {
    en: `betizzi gives free football tips from simple rules based on data. We look at the recent games of both teams and publish a tip only when a clear pattern repeats. Every tip is published before kick-off with its price, is never edited or deleted, and counts in our public record.

## How a tip is chosen
- **Goals (Over/Under, GG/NG):** the pattern must have happened in most of the two teams' recent games — usually 7 or more out of 10.
- **Win (1 or 2):** the team has collected clearly more points than its opponent in recent games. We do not back a team when its opponent is a clear favourite.
- **Draw:** rarely, only when draws keep repeating.
- Injuries, news and market moves are not part of the decision.

## Free and VIP
- Free tips are open to everyone.
- VIP tips are our strongest. They open with a free sign-up (a code by email, no password), and for everyone 10 minutes after kick-off.
- Inside our ready-made parlays, VIP picks are open to everyone.

## The price
- Every tip shows the price when we published it and the lowest price we still recommend.
- We compare prices from several bookmakers and show where the price is best. If the price drops below our limit, the tip stays and we show the new price.

## Ready-made parlays
- Every day: parlays around x3–5, x8–12 and x20–30, and a big parlay of the day (x30–50). They use only our own tips.
- They come out in the morning and new ones are added during the day. A published parlay never changes.
- Big parlays win rarely.

## Public record
Every tip since 2 November 2026 is counted, wins and losses. Nothing is deleted. See the [record]({REC}).

## What we don't do
- We don't promise winnings and never call a tip "sure".
- We are not a bookmaker and we don't accept bets.
- Bet only what you can afford to lose.`,
    el: `Το betizzi δίνει δωρεάν tips ποδοσφαίρου με απλούς κανόνες από δεδομένα. Κοιτάμε τα πρόσφατα παιχνίδια και των δύο ομάδων και βγάζουμε tip μόνο όταν ένα μοτίβο επαναλαμβάνεται καθαρά. Κάθε tip δημοσιεύεται πριν από τη σέντρα με την απόδοσή του, δεν αλλάζει, δεν σβήνεται και μετράει στο δημόσιο ιστορικό μας.

## Πώς βγαίνει ένα tip
- **Γκολ (Over/Under, GG/NG):** το μοτίβο πρέπει να έχει συμβεί στα περισσότερα πρόσφατα παιχνίδια των δύο ομάδων, συνήθως σε 7 ή περισσότερα από τα 10.
- **Νίκη (1 ή 2):** η ομάδα έχει μαζέψει καθαρά περισσότερους βαθμούς από τον αντίπαλο στα τελευταία παιχνίδια. Δεν προτείνουμε ομάδα όταν ο αντίπαλος είναι καθαρό φαβορί.
- **Ισοπαλία:** σπάνια, μόνο όταν οι ισοπαλίες επαναλαμβάνονται.
- Οι απουσίες, τα νέα και οι κινήσεις της αγοράς δεν παίζουν ρόλο στην απόφαση.

## Free και VIP
- Τα Free tips είναι ανοιχτά για όλους.
- Τα VIP είναι τα πιο δυνατά μας. Ανοίγουν με δωρεάν εγγραφή (κωδικός στο email, χωρίς password) και για όλους 10 λεπτά μετά τη σέντρα.
- Μέσα στα έτοιμα παρολί μας, οι VIP επιλογές είναι ανοιχτές για όλους.

## Η απόδοση
- Κάθε tip δείχνει την απόδοση τη στιγμή που δημοσιεύτηκε και τη χαμηλότερη απόδοση που ακόμα προτείνουμε.
- Συγκρίνουμε αποδόσεις από πολλούς bookmakers και δείχνουμε πού είναι η καλύτερη. Αν η απόδοση πέσει κάτω από το όριό μας, το tip μένει και δείχνουμε τη νέα απόδοση.

## Έτοιμα παρολί
- Κάθε μέρα: παρολί γύρω στο x3–5, x8–12 και x20–30, και ένα μεγάλο παρολί της ημέρας (x30–50). Μόνο από τα δικά μας tips.
- Βγαίνουν το πρωί και μέσα στη μέρα προστίθενται νέα. Ένα παρολί που δημοσιεύτηκε δεν αλλάζει.
- Τα μεγάλα παρολί κερδίζουν σπάνια.

## Δημόσιο ιστορικό
Μετράμε κάθε tip από τις 2 Νοεμβρίου 2026, νίκες και ήττες. Δεν σβήνεται τίποτα. Δες το [ιστορικό]({REC}).

## Τι δεν κάνουμε
- Δεν υποσχόμαστε κέρδη και δεν λέμε ποτέ ότι ένα tip είναι «σίγουρο».
- Δεν είμαστε bookmaker και δεν δεχόμαστε στοιχήματα.
- Παίξε μόνο όσα μπορείς να χάσεις.`,
    es: `betizzi ofrece pronósticos de fútbol gratuitos con reglas sencillas basadas en datos. Miramos los partidos recientes de ambos equipos y publicamos un tip solo cuando un patrón se repite con claridad. Cada tip se publica antes del inicio con su cuota, nunca se edita ni se borra y cuenta en nuestro historial público.

## Cómo se elige un tip
- **Goles (Over/Under, GG/NG):** el patrón debe haberse dado en la mayoría de los partidos recientes de ambos equipos, normalmente en 7 o más de 10.
- **Victoria (1 o 2):** el equipo ha sumado claramente más puntos que su rival en los últimos partidos. No apostamos por un equipo cuando su rival es claro favorito.
- **Empate:** pocas veces, solo cuando los empates se repiten.
- Las bajas, las noticias y los movimientos del mercado no forman parte de la decisión.

## Free y VIP
- Los tips Free están abiertos para todos.
- Los VIP son los más fuertes. Se abren con un registro gratuito (un código por email, sin contraseña) y para todos 10 minutos después del inicio.
- Dentro de nuestras combinadas, las selecciones VIP están abiertas para todos.

## La cuota
- Cada tip muestra la cuota cuando lo publicamos y la cuota mínima que aún recomendamos.
- Comparamos cuotas de varias casas y mostramos dónde es mejor. Si la cuota baja de nuestro límite, el tip se mantiene y mostramos la nueva cuota.

## Combinadas listas
- Cada día: combinadas de aprox. x3–5, x8–12 y x20–30, y una combinada mega del día (x30–50). Solo con nuestros tips.
- Salen por la mañana y se añaden nuevas durante el día. Una combinada publicada no cambia.
- Las combinadas grandes ganan pocas veces.

## Historial público
Contamos cada tip desde el 2 de noviembre de 2026, aciertos y fallos. No se borra nada. Mira el [historial]({REC}).

## Lo que no hacemos
- No prometemos ganancias y nunca decimos que un tip es «seguro».
- No somos una casa de apuestas y no aceptamos apuestas.
- Apuesta solo lo que puedas permitirte perder.`,
    pt: `O betizzi dá palpites de futebol gratuitos com regras simples baseadas em dados. Olhamos para os jogos recentes das duas equipas e publicamos um palpite só quando um padrão se repete com clareza. Cada palpite é publicado antes do início com a sua odd, nunca é editado nem apagado e conta no nosso histórico público.

## Como escolhemos um palpite
- **Golos (Over/Under, GG/NG):** o padrão tem de ter acontecido na maioria dos jogos recentes das duas equipas, normalmente em 7 ou mais de 10.
- **Vitória (1 ou 2):** a equipa somou claramente mais pontos do que o adversário nos últimos jogos. Não apostamos numa equipa quando o adversário é claro favorito.
- **Empate:** raramente, só quando os empates se repetem.
- Lesões, notícias e movimentos do mercado não entram na decisão.

## Free e VIP
- Os palpites Free estão abertos a todos.
- Os VIP são os mais fortes. Abrem com um registo gratuito (um código por email, sem palavra-passe) e para todos 10 minutos após o início.
- Dentro das nossas múltiplas prontas, as seleções VIP estão abertas a todos.

## A odd
- Cada palpite mostra a odd quando o publicámos e a odd mínima que ainda recomendamos.
- Comparamos odds de várias casas e mostramos onde é melhor. Se a odd descer abaixo do nosso limite, o palpite mantém-se e mostramos a nova odd.

## Múltiplas prontas
- Todos os dias: múltiplas de cerca de x3–5, x8–12 e x20–30, e uma múltipla grande do dia (x30–50). Só com os nossos palpites.
- Saem de manhã e são acrescentadas novas ao longo do dia. Uma múltipla publicada não muda.
- As múltiplas grandes ganham raramente.

## Histórico público
Contamos cada palpite desde 2 de novembro de 2026, acertos e falhas. Nada é apagado. Vê o [histórico]({REC}).

## O que não fazemos
- Não prometemos ganhos e nunca dizemos que um palpite é «certo».
- Não somos uma casa de apostas e não aceitamos apostas.
- Aposta só o que podes perder.`,
    fr: `betizzi propose des pronostics foot gratuits à partir de règles simples basées sur les données. Nous regardons les matchs récents des deux équipes et publions un tip seulement quand un schéma se répète clairement. Chaque tip est publié avant le coup d'envoi avec sa cote, n'est jamais modifié ni supprimé et compte dans notre historique public.

## Comment un tip est choisi
- **Buts (Over/Under, GG/NG) :** le schéma doit s'être produit dans la plupart des matchs récents des deux équipes, en général 7 fois ou plus sur 10.
- **Victoire (1 ou 2) :** l'équipe a pris nettement plus de points que son adversaire lors des derniers matchs. Nous ne soutenons pas une équipe face à un net favori.
- **Nul :** rarement, seulement quand les nuls se répètent.
- Les blessures, l'actualité et les mouvements du marché n'entrent pas dans la décision.

## Free et VIP
- Les tips Free sont ouverts à tous.
- Les VIP sont nos plus forts. Ils s'ouvrent avec une inscription gratuite (un code par e-mail, sans mot de passe), et pour tous 10 minutes après le coup d'envoi.
- Dans nos combinés prêts, les sélections VIP sont ouvertes à tous.

## La cote
- Chaque tip affiche la cote au moment de la publication et la cote minimale que nous recommandons encore.
- Nous comparons les cotes de plusieurs bookmakers et montrons où elle est la meilleure. Si la cote passe sous notre limite, le tip reste et nous affichons la nouvelle cote.

## Combinés prêts
- Chaque jour : des combinés autour de x3–5, x8–12 et x20–30, et un méga combiné du jour (x30–50). Uniquement avec nos tips.
- Ils sortent le matin et de nouveaux s'ajoutent dans la journée. Un combiné publié ne change pas.
- Les gros combinés gagnent rarement.

## Historique public
Chaque tip depuis le 2 novembre 2026 est compté, gagnés et perdus. Rien n'est supprimé. Voir l'[historique]({REC}).

## Ce que nous ne faisons pas
- Nous ne promettons pas de gains et ne disons jamais qu'un tip est « sûr ».
- Nous ne sommes pas un bookmaker et n'acceptons pas de paris.
- Ne misez que ce que vous pouvez vous permettre de perdre.`,
    de: `betizzi gibt kostenlose Fußball-Tipps nach einfachen, datenbasierten Regeln. Wir schauen uns die letzten Spiele beider Teams an und veröffentlichen einen Tipp nur, wenn sich ein Muster klar wiederholt. Jeder Tipp wird vor Anpfiff mit seiner Quote veröffentlicht, nie geändert oder gelöscht und zählt in unserer öffentlichen Bilanz.

## Wie ein Tipp entsteht
- **Tore (Over/Under, GG/NG):** Das Muster muss in den meisten letzten Spielen beider Teams aufgetreten sein, meist in 7 oder mehr von 10.
- **Sieg (1 oder 2):** Das Team hat in den letzten Spielen deutlich mehr Punkte geholt als der Gegner. Gegen einen klaren Favoriten tippen wir nicht.
- **Unentschieden:** selten, nur wenn sich Remis wiederholen.
- Verletzungen, Nachrichten und Marktbewegungen fließen nicht in die Entscheidung ein.

## Free und VIP
- Free-Tipps sind für alle offen.
- VIP-Tipps sind unsere stärksten. Sie öffnen sich mit einer kostenlosen Anmeldung (Code per E-Mail, ohne Passwort) und für alle 10 Minuten nach Anpfiff.
- In unseren fertigen Kombis sind VIP-Tipps für alle offen.

## Die Quote
- Jeder Tipp zeigt die Quote bei Veröffentlichung und die niedrigste Quote, die wir noch empfehlen.
- Wir vergleichen Quoten mehrerer Buchmacher und zeigen, wo sie am besten ist. Fällt die Quote unter unser Limit, bleibt der Tipp stehen und wir zeigen die neue Quote.

## Fertige Kombis
- Jeden Tag: Kombis um x3–5, x8–12 und x20–30 sowie eine Mega-Kombi des Tages (x30–50). Nur aus unseren eigenen Tipps.
- Sie erscheinen morgens, im Laufe des Tages kommen neue hinzu. Eine veröffentlichte Kombi ändert sich nicht.
- Große Kombis gewinnen selten.

## Öffentliche Bilanz
Jeder Tipp seit dem 2. November 2026 wird gezählt, Gewinne und Verluste. Nichts wird gelöscht. Siehe die [Bilanz]({REC}).

## Was wir nicht tun
- Wir versprechen keine Gewinne und nennen einen Tipp nie „sicher“.
- Wir sind kein Buchmacher und nehmen keine Wetten an.
- Setze nur, was du dir leisten kannst zu verlieren.`,
    ro: `betizzi oferă ponturi gratuite la fotbal, după reguli simple bazate pe date. Ne uităm la meciurile recente ale ambelor echipe și publicăm un pont doar când un tipar se repetă clar. Fiecare pont este publicat înainte de start, cu cota lui, nu este modificat sau șters niciodată și intră în istoricul nostru public.

## Cum alegem un pont
- **Goluri (Over/Under, GG/NG):** tiparul trebuie să fi apărut în majoritatea meciurilor recente ale celor două echipe, de obicei în 7 sau mai multe din 10.
- **Victorie (1 sau 2):** echipa a strâns clar mai multe puncte decât adversara în ultimele meciuri. Nu mergem pe o echipă când adversara e favorită clară.
- **Egal:** rar, doar când egalurile se repetă.
- Absențele, știrile și mișcările pieței nu intră în decizie.

## Free și VIP
- Ponturile Free sunt deschise pentru toți.
- Ponturile VIP sunt cele mai puternice. Se deschid cu o înregistrare gratuită (un cod pe email, fără parolă) și pentru toți la 10 minute după start.
- În biletele noastre gata făcute, selecțiile VIP sunt deschise pentru toți.

## Cota
- Fiecare pont arată cota din momentul publicării și cota minimă pe care încă o recomandăm.
- Comparăm cotele de la mai multe case și arătăm unde e cea mai bună. Dacă cota scade sub limita noastră, pontul rămâne și arătăm noua cotă.

## Bilete gata făcute
- În fiecare zi: bilete de aproximativ x3–5, x8–12 și x20–30, plus biletul mare al zilei (x30–50). Doar din ponturile noastre.
- Apar dimineața și se adaugă altele noi în timpul zilei. Un bilet publicat nu se schimbă.
- Biletele mari câștigă rar.

## Istoric public
Numărăm fiecare pont din 2 noiembrie 2026, câștigate și pierdute. Nu se șterge nimic. Vezi [istoricul]({REC}).

## Ce nu facem
- Nu promitem câștiguri și nu spunem niciodată că un pont e „sigur“.
- Nu suntem casă de pariuri și nu acceptăm pariuri.
- Pariază doar cât îți permiți să pierzi.`,
    sr: `betizzi daje besplatne fudbalske tipove po jednostavnim pravilima zasnovanim na podacima. Gledamo skorašnje utakmice oba tima i objavljujemo tip samo kada se obrazac jasno ponavlja. Svaki tip se objavljuje pre početka sa svojom kvotom, nikada se ne menja niti briše i ulazi u našu javnu istoriju.

## Kako biramo tip
- **Golovi (Over/Under, GG/NG):** obrazac mora da se desio u većini skorašnjih utakmica oba tima, obično u 7 ili više od 10.
- **Pobeda (1 ili 2):** tim je u poslednjim utakmicama osvojio jasno više bodova od protivnika. Ne biramo tim kada je protivnik jasan favorit.
- **Nerešeno:** retko, samo kada se nerešeni ishodi ponavljaju.
- Povrede, vesti i kretanja tržišta nisu deo odluke.

## Free i VIP
- Free tipovi su otvoreni za sve.
- VIP tipovi su naši najjači. Otvaraju se besplatnom registracijom (kod na email, bez lozinke), a za sve 10 minuta posle početka.
- U našim gotovim tiketima VIP izbori su otvoreni za sve.

## Kvota
- Svaki tip prikazuje kvotu u trenutku objave i najnižu kvotu koju još preporučujemo.
- Poredimo kvote više kladionica i pokazujemo gde je najbolja. Ako kvota padne ispod naše granice, tip ostaje i prikazujemo novu kvotu.

## Gotovi tiketi
- Svakog dana: tiketi oko x3–5, x8–12 i x20–30, i veliki tiket dana (x30–50). Samo od naših tipova.
- Izlaze ujutru, a tokom dana se dodaju novi. Objavljeni tiket se ne menja.
- Veliki tiketi retko prolaze.

## Javna istorija
Brojimo svaki tip od 2. novembra 2026, dobitne i gubitne. Ništa se ne briše. Pogledaj [istoriju]({REC}).

## Šta ne radimo
- Ne obećavamo dobitak i nikada ne kažemo da je tip „siguran“.
- Nismo kladionica i ne primamo opklade.
- Kladi se samo onoliko koliko možeš da izgubiš.`,
    bg: `betizzi дава безплатни футболни прогнози по прости правила, базирани на данни. Гледаме последните мачове на двата отбора и публикуваме прогноза само когато даден модел ясно се повтаря. Всяка прогноза се публикува преди началото с коефициента си, никога не се променя или изтрива и влиза в публичната ни история.

## Как избираме прогноза
- **Голове (Over/Under, GG/NG):** моделът трябва да се е случил в повечето от последните мачове на двата отбора, обикновено в 7 или повече от 10.
- **Победа (1 или 2):** отборът е събрал ясно повече точки от съперника в последните мачове. Не залагаме на отбор, когато съперникът е явен фаворит.
- **Равен:** рядко, само когато равенствата се повтарят.
- Контузиите, новините и движенията на пазара не участват в решението.

## Free и VIP
- Free прогнозите са отворени за всички.
- VIP прогнозите са най-силните ни. Отварят се с безплатна регистрация (код по имейл, без парола), а за всички — 10 минути след началото.
- В готовите ни фишове VIP изборите са отворени за всички.

## Коефициентът
- Всяка прогноза показва коефициента в момента на публикуване и най-ниския коефициент, който още препоръчваме.
- Сравняваме коефициенти от няколко букмейкъра и показваме къде е най-добрият. Ако коефициентът падне под нашия праг, прогнозата остава и показваме новия коефициент.

## Готови фишове
- Всеки ден: фишове около x3–5, x8–12 и x20–30, плюс голям фиш на деня (x30–50). Само от нашите прогнози.
- Излизат сутрин и през деня се добавят нови. Публикуваният фиш не се променя.
- Големите фишове печелят рядко.

## Публична история
Броим всяка прогноза от 2 ноември 2026, познати и непознати. Нищо не се изтрива. Виж [историята]({REC}).

## Какво не правим
- Не обещаваме печалби и никога не казваме, че прогноза е „сигурна“.
- Не сме букмейкър и не приемаме залози.
- Залагай само толкова, колкото можеш да си позволиш да загубиш.`,
  },
  faq: {
    en: [["Are betizzi tips free?", "Yes. Free tips are open to everyone. VIP tips only need a free sign-up with your email."], ["Is betizzi a bookmaker?", "No. We publish tips and compare prices. Bets are placed with licensed bookmakers."], ["Do you guarantee wins?", "No. A tip is an estimate from data. All results, including losses, are in our public record."], ["How many tips do you give?", "We aim for a Free tip in at least one in three matches with odds, and a VIP tip in about one in ten. Some days there are fewer."], ["When are tips published?", "During the day, always before kick-off. New tips are added every few hours."]],
    el: [["Είναι δωρεάν τα tips του betizzi;", "Ναι. Τα Free είναι ανοιχτά για όλους. Τα VIP θέλουν μόνο δωρεάν εγγραφή με το email σου."], ["Είναι το betizzi bookmaker;", "Όχι. Δημοσιεύουμε tips και συγκρίνουμε αποδόσεις. Τα στοιχήματα γίνονται σε αδειοδοτημένους bookmakers."], ["Εγγυάστε κέρδη;", "Όχι. Ένα tip είναι εκτίμηση από δεδομένα. Όλα τα αποτελέσματα, και οι ήττες, είναι στο δημόσιο ιστορικό μας."], ["Πόσα tips δίνετε;", "Στόχος είναι Free tip σε τουλάχιστον έναν στους τρεις αγώνες με αποδόσεις και VIP σε περίπου έναν στους δέκα. Κάποιες μέρες είναι λιγότερα."], ["Πότε βγαίνουν τα tips;", "Μέσα στη μέρα, πάντα πριν από τη σέντρα. Νέα tips προστίθενται κάθε λίγες ώρες."]],
    es: [["¿Los tips de betizzi son gratis?", "Sí. Los tips Free están abiertos para todos. Los VIP solo necesitan un registro gratuito con tu email."], ["¿betizzi es una casa de apuestas?", "No. Publicamos tips y comparamos cuotas. Las apuestas se hacen en casas con licencia."], ["¿Garantizáis ganancias?", "No. Un tip es una estimación a partir de datos. Todos los resultados, también los fallos, están en nuestro historial público."], ["¿Cuántos tips dais?", "Buscamos un tip Free en al menos uno de cada tres partidos con cuotas, y un VIP en uno de cada diez aprox. Algunos días hay menos."], ["¿Cuándo se publican los tips?", "Durante el día, siempre antes del inicio. Se añaden tips nuevos cada pocas horas."]],
    pt: [["Os palpites do betizzi são grátis?", "Sim. Os Free estão abertos a todos. Os VIP só precisam de um registo gratuito com o teu email."], ["O betizzi é uma casa de apostas?", "Não. Publicamos palpites e comparamos odds. As apostas são feitas em casas licenciadas."], ["Garantem ganhos?", "Não. Um palpite é uma estimativa a partir de dados. Todos os resultados, incluindo as falhas, estão no nosso histórico público."], ["Quantos palpites dão?", "Procuramos um palpite Free em pelo menos um em cada três jogos com odds, e um VIP em cerca de um em cada dez. Há dias com menos."], ["Quando são publicados os palpites?", "Ao longo do dia, sempre antes do início. São acrescentados novos a cada poucas horas."]],
    fr: [["Les tips betizzi sont-ils gratuits ?", "Oui. Les tips Free sont ouverts à tous. Les VIP demandent seulement une inscription gratuite avec votre e-mail."], ["betizzi est-il un bookmaker ?", "Non. Nous publions des tips et comparons les cotes. Les paris se font chez des bookmakers agréés."], ["Garantissez-vous des gains ?", "Non. Un tip est une estimation à partir de données. Tous les résultats, pertes comprises, sont dans notre historique public."], ["Combien de tips donnez-vous ?", "Nous visons un tip Free dans au moins un match sur trois avec cotes, et un VIP dans environ un sur dix. Certains jours, il y en a moins."], ["Quand les tips sont-ils publiés ?", "Pendant la journée, toujours avant le coup d'envoi. De nouveaux tips s'ajoutent toutes les quelques heures."]],
    de: [["Sind die Tipps von betizzi kostenlos?", "Ja. Free-Tipps sind für alle offen. VIP-Tipps brauchen nur eine kostenlose Anmeldung mit deiner E-Mail."], ["Ist betizzi ein Buchmacher?", "Nein. Wir veröffentlichen Tipps und vergleichen Quoten. Wetten werden bei lizenzierten Buchmachern platziert."], ["Garantiert ihr Gewinne?", "Nein. Ein Tipp ist eine Schätzung aus Daten. Alle Ergebnisse, auch Verluste, stehen in unserer öffentlichen Bilanz."], ["Wie viele Tipps gebt ihr?", "Wir zielen auf einen Free-Tipp in mindestens jedem dritten Spiel mit Quoten und einen VIP-Tipp in etwa jedem zehnten. An manchen Tagen sind es weniger."], ["Wann erscheinen die Tipps?", "Im Laufe des Tages, immer vor Anpfiff. Alle paar Stunden kommen neue hinzu."]],
    ro: [["Ponturile betizzi sunt gratuite?", "Da. Ponturile Free sunt deschise pentru toți. Cele VIP cer doar o înregistrare gratuită cu emailul tău."], ["Este betizzi casă de pariuri?", "Nu. Publicăm ponturi și comparăm cote. Pariurile se fac la case licențiate."], ["Garantați câștiguri?", "Nu. Un pont este o estimare din date. Toate rezultatele, inclusiv cele pierdute, sunt în istoricul nostru public."], ["Câte ponturi dați?", "Ne propunem un pont Free la cel puțin unul din trei meciuri cu cote și un VIP la aproximativ unul din zece. În unele zile sunt mai puține."], ["Când apar ponturile?", "În timpul zilei, mereu înainte de start. Se adaugă ponturi noi la câteva ore."]],
    sr: [["Da li su betizzi tipovi besplatni?", "Da. Free tipovi su otvoreni za sve. Za VIP je potrebna samo besplatna registracija emailom."], ["Da li je betizzi kladionica?", "Ne. Objavljujemo tipove i poredimo kvote. Opklade se uplaćuju kod licenciranih kladionica."], ["Da li garantujete dobitak?", "Ne. Tip je procena iz podataka. Svi rezultati, i gubitni, nalaze se u našoj javnoj istoriji."], ["Koliko tipova dajete?", "Cilj je Free tip na bar svakoj trećoj utakmici sa kvotama i VIP na otprilike svakoj desetoj. Nekih dana ih je manje."], ["Kada izlaze tipovi?", "Tokom dana, uvek pre početka. Novi tipovi se dodaju na svakih nekoliko sati."]],
    bg: [["Безплатни ли са прогнозите на betizzi?", "Да. Free прогнозите са отворени за всички. За VIP е нужна само безплатна регистрация с имейл."], ["betizzi букмейкър ли е?", "Не. Публикуваме прогнози и сравняваме коефициенти. Залозите се правят при лицензирани букмейкъри."], ["Гарантирате ли печалба?", "Не. Прогнозата е оценка от данни. Всички резултати, включително загубите, са в публичната ни история."], ["Колко прогнози давате?", "Целим Free прогноза в поне един от три мача с коефициенти и VIP в около един от десет. В някои дни са по-малко."], ["Кога излизат прогнозите?", "През деня, винаги преди началото. Нови прогнози се добавят на всеки няколко часа."]],
  },
  faqH: { en: "Questions", el: "Ερωτήσεις", es: "Preguntas", pt: "Perguntas", fr: "Questions", de: "Fragen", ro: "Întrebări", sr: "Pitanja", bg: "Въпроси" },
};

const IMP = { name: OP.name, addr: OP.addr, mail: OP.legal };
PG.impressum = {
  slug: { en: "legal-notice", el: "nomika-stoixeia", es: "aviso-legal", pt: "aviso-legal", fr: "mentions-legales", de: "impressum", ro: "informatii-legale", sr: "pravne-informacije", bg: "pravna-informacia" },
  title: { en: "Legal notice", el: "Νομικά στοιχεία", es: "Aviso legal", pt: "Aviso legal", fr: "Mentions légales", de: "Impressum", ro: "Informații legale", sr: "Pravne informacije", bg: "Правна информация" },
  desc: {
    en: "Who operates betizzi.com and how to contact us.", el: "Ποιος λειτουργεί το betizzi.com και πώς να επικοινωνήσεις.", es: "Quién gestiona betizzi.com y cómo contactarnos.", pt: "Quem gere o betizzi.com e como nos contactar.",
    fr: "Qui exploite betizzi.com et comment nous contacter.", de: "Anbieterkennzeichnung von betizzi.com.", ro: "Cine operează betizzi.com și cum ne contactezi.", sr: "Ko upravlja sajtom betizzi.com i kako da nas kontaktirate.", bg: "Кой управлява betizzi.com и как да се свържете с нас.",
  },
  body: {
    en: `## Operator
- ${IMP.name} (sole proprietorship)
- ${IMP.addr}

## Contact
- Email: [${IMP.mail}](mailto:${IMP.mail})
- Contact page: [contact]({CONTACT})

## Responsible for content
- ${IMP.name}, address as above

## Note
betizzi is not a bookmaker and does not accept bets. We are not willing or obliged to take part in dispute resolution proceedings before a consumer arbitration board.`,
    el: `## Ποιος λειτουργεί το site
- ${IMP.name} (ατομική επιχείρηση)
- ${IMP.addr}

## Επικοινωνία
- Email: [${IMP.mail}](mailto:${IMP.mail})
- Σελίδα επικοινωνίας: [επικοινωνία]({CONTACT})

## Υπεύθυνος περιεχομένου
- ${IMP.name}, στην παραπάνω διεύθυνση

## Σημείωση
Το betizzi δεν είναι bookmaker και δεν δέχεται στοιχήματα. Δεν συμμετέχουμε σε διαδικασίες εξωδικαστικής επίλυσης διαφορών καταναλωτών.`,
    es: `## Responsable
- ${IMP.name} (empresario individual)
- ${IMP.addr}

## Contacto
- Email: [${IMP.mail}](mailto:${IMP.mail})
- Página de contacto: [contacto]({CONTACT})

## Responsable del contenido
- ${IMP.name}, en la dirección indicada

## Nota
betizzi no es una casa de apuestas y no acepta apuestas. No participamos en procedimientos de resolución de conflictos ante una entidad de arbitraje de consumo.`,
    pt: `## Responsável
- ${IMP.name} (empresário em nome individual)
- ${IMP.addr}

## Contacto
- Email: [${IMP.mail}](mailto:${IMP.mail})
- Página de contacto: [contacto]({CONTACT})

## Responsável pelo conteúdo
- ${IMP.name}, na morada acima

## Nota
O betizzi não é uma casa de apostas e não aceita apostas. Não participamos em procedimentos de resolução alternativa de litígios de consumo.`,
    fr: `## Éditeur
- ${IMP.name} (entreprise individuelle)
- ${IMP.addr}

## Contact
- E-mail : [${IMP.mail}](mailto:${IMP.mail})
- Page de contact : [contact]({CONTACT})

## Directeur de la publication
- ${IMP.name}, adresse ci-dessus

## Hébergement
- Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis

## Note
betizzi n'est pas un bookmaker et n'accepte pas de paris. Nous ne participons pas à des procédures de règlement des litiges devant un organisme de médiation de la consommation.`,
    de: `## Angaben gemäß § 5 DDG
- ${IMP.name} (Einzelunternehmer)
- Annis Komninis 2, 8010 Paphos, Zypern

## Kontakt
- E-Mail: [${IMP.mail}](mailto:${IMP.mail})
- Kontaktseite: [Kontakt]({CONTACT})

## Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
- ${IMP.name}, Anschrift wie oben

## Hinweis
betizzi ist kein Buchmacher und nimmt keine Wetten an.

## Verbraucherstreitbeilegung
Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.`,
    ro: `## Operator
- ${IMP.name} (întreprindere individuală)
- ${IMP.addr}

## Contact
- Email: [${IMP.mail}](mailto:${IMP.mail})
- Pagina de contact: [contact]({CONTACT})

## Responsabil pentru conținut
- ${IMP.name}, la adresa de mai sus

## Notă
betizzi nu este casă de pariuri și nu acceptă pariuri. Nu participăm la proceduri de soluționare alternativă a litigiilor cu consumatorii.`,
    sr: `## Operater
- ${IMP.name} (preduzetnik)
- ${IMP.addr}

## Kontakt
- Email: [${IMP.mail}](mailto:${IMP.mail})
- Stranica za kontakt: [kontakt]({CONTACT})

## Odgovoran za sadržaj
- ${IMP.name}, na adresi iznad

## Napomena
betizzi nije kladionica i ne prima opklade. Ne učestvujemo u postupcima vansudskog rešavanja potrošačkih sporova.`,
    bg: `## Оператор
- ${IMP.name} (едноличен търговец)
- ${IMP.addr}

## Контакт
- Имейл: [${IMP.mail}](mailto:${IMP.mail})
- Страница за контакт: [контакт]({CONTACT})

## Отговорен за съдържанието
- ${IMP.name}, на адреса по-горе

## Бележка
betizzi не е букмейкър и не приема залози. Не участваме в процедури за извънсъдебно решаване на потребителски спорове.`,
  },
};

// ---------- 07/11/2026 (απόφαση Owner): Όροι / Απόρρητο / Cookies σε ES, PT, FR, DE, RO, SR, BG ----------
// Μεταφράσεις του αγγλικού κειμένου. Όλα «προς έλεγχο» από ντόπιους (και νομικό έλεγχο).
Object.assign(PG.terms.slug, { es: "terminos", pt: "termos", fr: "conditions", de: "nutzungsbedingungen", ro: "termeni", sr: "uslovi", bg: "usloviya" });
Object.assign(PG.terms.title, { es: "Términos de uso", pt: "Termos de utilização", fr: "Conditions d'utilisation", de: "Nutzungsbedingungen", ro: "Termeni de utilizare", sr: "Uslovi korišćenja", bg: "Условия за ползване" });
Object.assign(PG.terms.desc, { es: "Los términos para usar betizzi.", pt: "Os termos de utilização do betizzi.", fr: "Les conditions d'utilisation de betizzi.", de: "Die Bedingungen für die Nutzung von betizzi.", ro: "Termenii de utilizare betizzi.", sr: "Uslovi korišćenja sajta betizzi.", bg: "Условията за ползване на betizzi." });
Object.assign(PG.privacy.slug, { es: "privacidad", pt: "privacidade", fr: "confidentialite", de: "datenschutz", ro: "confidentialitate", sr: "privatnost", bg: "poveritelnost" });
Object.assign(PG.privacy.title, { es: "Política de privacidad", pt: "Política de privacidade", fr: "Politique de confidentialité", de: "Datenschutzerklärung", ro: "Politica de confidențialitate", sr: "Politika privatnosti", bg: "Политика за поверителност" });
Object.assign(PG.privacy.desc, { es: "Qué datos personales usa betizzi y por qué.", pt: "Que dados pessoais o betizzi usa e porquê.", fr: "Quelles données personnelles betizzi utilise et pourquoi.", de: "Welche personenbezogenen Daten betizzi verwendet und warum.", ro: "Ce date personale folosește betizzi și de ce.", sr: "Koje lične podatke betizzi koristi i zašto.", bg: "Какви лични данни използва betizzi и защо." });
Object.assign(PG.cookies.slug, { es: "cookies", pt: "cookies", fr: "cookies", de: "cookies", ro: "cookies", sr: "kolacici", bg: "biskvitki" });
Object.assign(PG.cookies.title, { es: "Política de cookies", pt: "Política de cookies", fr: "Politique de cookies", de: "Cookie-Richtlinie", ro: "Politica de cookie-uri", sr: "Politika kolačića", bg: "Политика за бисквитките" });
Object.assign(PG.cookies.desc, { es: "Qué guarda betizzi en tu navegador.", pt: "O que o betizzi guarda no teu navegador.", fr: "Ce que betizzi enregistre dans votre navigateur.", de: "Was betizzi in deinem Browser speichert.", ro: "Ce salvează betizzi în browserul tău.", sr: "Šta betizzi čuva u tvom pregledaču.", bg: "Какво съхранява betizzi в браузъра ти." });

const H = `[${OP.hello}](mailto:${OP.hello})`, PV = `[${OP.privacy}](mailto:${OP.privacy})`;

Object.assign(PG.terms.body, {
  es: `Fecha de entrada en vigor: 1 de noviembre de 2026.

Estos Términos regulan el uso de betizzi.com (el «Servicio»). El Servicio lo gestiona el empresario individual ${OP.name}, Pafos, Chipre («nosotros»). Contacto: ${H}. Al usar el Servicio aceptas estos Términos.

## Qué es el Servicio
betizzi publica información de partidos de fútbol, estadísticas, tips basados en un modelo y probabilidades estimadas, cuotas de casas de apuestas y herramientas como un creador de boletos, con fines informativos y de entretenimiento. Los tips y las probabilidades son estimaciones a partir de datos y reglas que pueden cambiar. Las cuotas mostradas pertenecen a casas de apuestas de terceros y pueden cambiar, variar según el país o la cuenta, o dejar de estar disponibles.

betizzi no es una casa de apuestas ni un operador de juego. No aceptamos ni liquidamos apuestas y no guardamos fondos de jugadores. Lo que hagas con una casa de apuestas es entre tú y esa casa, según sus términos y la ley de tu país.

## Quién puede usarlo
El Servicio es para adultos de 18 años o más, o más si la ley lo exige (por ejemplo, 21 en Grecia). No lo uses donde sea ilegal. Solo tú decides si apuestas.

## Sin promesa de ganancias
Un tip no es una promesa de que una apuesta ganará. Los datos, resultados, horarios y cuotas pueden estar incompletos, llegar tarde o ser erróneos. Los resultados pasados no predicen los futuros. No damos asesoramiento personal de apuestas ni financiero. En la medida en que la ley lo permita, no somos responsables de las pérdidas de tus apuestas.

## Créditos y recompensas
Si ofrecemos créditos o recompensas (por ejemplo, por compartir o invitar a amigos), no tienen valor monetario, no se pueden vender ni transferir y pueden cambiar o terminar. Podemos anular créditos obtenidos mediante abuso, cuentas falsas o automatización.

## Cuentas
Si se ofrecen cuentas, debes usar un email que controles y mantener el acceso seguro. Podemos suspender o eliminar una cuenta por abuso, uso ilegal o un incumplimiento grave de estos Términos. Puedes pedirnos que borremos tu cuenta en cualquier momento.

## Uso aceptable
No copies el Servicio de forma masiva, no lo extraigas automáticamente, no interfieras en él ni lo uses para infringir la ley. No presentes nuestros tips como tu propio servicio de pago.

## Enlaces y publicidad
El Servicio contiene enlaces a sitios de terceros, incluidas casas de apuestas, algunas de las cuales pueden pagarnos (ver la Declaración de afiliados). No somos responsables de los sitios de terceros.

## Propiedad intelectual
El sitio, el nombre y el logotipo de betizzi, los textos y los diseños nos pertenecen a nosotros o a nuestros licenciantes. Los nombres y escudos de los equipos pertenecen a sus dueños y se usan solo para identificarlos.

## Cambios y ley aplicable
Podemos actualizar estos Términos; la fecha de arriba indica la versión vigente. Estos Términos se rigen por la ley de la República de Chipre, sin limitar los derechos imperativos de consumidor que tengas donde vives.`,
  pt: `Data de entrada em vigor: 1 de novembro de 2026.

Estes Termos regulam a utilização do betizzi.com (o «Serviço»). O Serviço é gerido pelo empresário em nome individual ${OP.name}, Pafos, Chipre («nós»). Contacto: ${H}. Ao usar o Serviço aceitas estes Termos.

## O que é o Serviço
O betizzi publica informação sobre jogos de futebol, estatísticas, palpites baseados num modelo e probabilidades estimadas, odds de casas de apostas e ferramentas como um criador de boletins, para informação e entretenimento. Os palpites e as probabilidades são estimativas a partir de dados e regras que podem mudar. As odds mostradas pertencem a casas de apostas de terceiros e podem mudar, variar por país ou conta, ou deixar de estar disponíveis.

O betizzi não é uma casa de apostas nem um operador de jogo. Não aceitamos nem liquidamos apostas e não guardamos fundos de jogadores. O que fazes com uma casa de apostas é entre ti e essa casa, segundo os seus termos e a lei do teu país.

## Quem pode usar
O Serviço destina-se a adultos com 18 anos ou mais, ou mais se a lei o exigir (por exemplo, 21 na Grécia). Não o uses onde isso seja ilegal. Só tu decides se apostas.

## Sem promessa de ganhos
Um palpite não é uma promessa de que uma aposta vai ganhar. Dados, resultados, horários e odds podem estar incompletos, atrasados ou errados. Resultados passados não preveem os futuros. Não damos aconselhamento pessoal de apostas nem financeiro. Na medida em que a lei o permita, não somos responsáveis por perdas das tuas apostas.

## Créditos e recompensas
Se oferecermos créditos ou recompensas (por exemplo, por partilhar ou convidar amigos), não têm valor em dinheiro, não podem ser vendidos nem transferidos e podem ser alterados ou terminar. Podemos anular créditos obtidos por abuso, contas falsas ou automatização.

## Contas
Se houver contas, tens de usar um email que controles e manter o acesso seguro. Podemos suspender ou remover uma conta por abuso, uso ilegal ou violação grave destes Termos. Podes pedir-nos para apagar a tua conta a qualquer momento.

## Uso aceitável
Não copies o Serviço em massa, não o extraias automaticamente, não interfiras com ele nem o uses para violar a lei. Não apresentes os nossos palpites como um serviço pago teu.

## Links e publicidade
O Serviço contém links para sites de terceiros, incluindo casas de apostas, algumas das quais nos podem pagar (ver a Declaração de afiliados). Não somos responsáveis por sites de terceiros.

## Propriedade intelectual
O site, o nome e o logótipo betizzi, os textos e os designs pertencem-nos a nós ou aos nossos licenciadores. Os nomes e emblemas das equipas pertencem aos seus donos e são usados apenas para identificação.

## Alterações e lei aplicável
Podemos atualizar estes Termos; a data acima indica a versão em vigor. Estes Termos regem-se pela lei da República de Chipre, sem limitar direitos imperativos de consumidor que tenhas onde vives.`,
  fr: `Date d'entrée en vigueur : 1er novembre 2026.

Les présentes Conditions régissent votre utilisation de betizzi.com (le « Service »). Le Service est exploité par l'entreprise individuelle de ${OP.name}, Paphos, Chypre (« nous »). Contact : ${H}. En utilisant le Service, vous acceptez ces Conditions.

## Ce qu'est le Service
betizzi publie des informations sur les matchs de football, des statistiques, des tips issus d'un modèle et des chances estimées, des cotes de bookmakers et des outils comme un créateur de ticket, à titre d'information et de divertissement. Les tips et les chances sont des estimations à partir de données et de règles susceptibles de changer. Les cotes affichées appartiennent à des bookmakers tiers et peuvent changer, varier selon le pays ou le compte, ou ne plus être disponibles.

betizzi n'est ni un bookmaker ni un opérateur de jeux. Nous n'acceptons ni ne réglons de paris et ne détenons aucun fonds de joueurs. Ce que vous faites avec un bookmaker relève de vous et de ce bookmaker, selon ses conditions et la loi de votre pays.

## Qui peut l'utiliser
Le Service est réservé aux adultes de 18 ans ou plus, ou plus si la loi l'exige (par exemple 21 ans en Grèce). Ne l'utilisez pas là où ce serait illégal. Vous seul décidez de parier ou non.

## Aucune promesse de gain
Un tip n'est pas une promesse qu'un pari sera gagnant. Les données, résultats, horaires et cotes peuvent être incomplets, en retard ou erronés. Les résultats passés ne prédisent pas les résultats futurs. Nous ne donnons pas de conseil personnel en paris ni de conseil financier. Dans la mesure permise par la loi, nous ne sommes pas responsables des pertes liées à vos paris.

## Crédits et récompenses
Si nous proposons des crédits ou des récompenses (par exemple pour un partage ou une invitation), ils n'ont aucune valeur monétaire, ne peuvent être ni vendus ni transférés et peuvent être modifiés ou supprimés. Nous pouvons annuler des crédits obtenus par abus, faux comptes ou automatisation.

## Comptes
Si des comptes sont proposés, vous devez utiliser une adresse e-mail que vous contrôlez et garder l'accès sécurisé. Nous pouvons suspendre ou supprimer un compte en cas d'abus, d'usage illégal ou de manquement grave aux présentes Conditions. Vous pouvez nous demander de supprimer votre compte à tout moment.

## Usage acceptable
Ne copiez pas le Service en masse, ne l'aspirez pas automatiquement, n'en perturbez pas le fonctionnement et ne l'utilisez pas pour enfreindre la loi. Ne présentez pas nos tips comme votre propre service payant.

## Liens et publicité
Le Service contient des liens vers des sites tiers, dont des bookmakers, dont certains peuvent nous rémunérer (voir la Déclaration d'affiliation). Nous ne sommes pas responsables des sites tiers.

## Propriété intellectuelle
Le site, le nom et le logo betizzi, les textes et les designs nous appartiennent ou appartiennent à nos concédants. Les noms et logos des équipes appartiennent à leurs propriétaires et ne servent qu'à les identifier.

## Modifications et droit applicable
Nous pouvons mettre à jour ces Conditions ; la date ci-dessus indique la version en vigueur. Ces Conditions sont régies par le droit de la République de Chypre, sans limiter les droits impératifs dont vous bénéficiez en tant que consommateur là où vous vivez.`,
  de: `Gültig ab: 1. November 2026.

Diese Bedingungen regeln die Nutzung von betizzi.com (der „Dienst“). Der Dienst wird vom Einzelunternehmen ${OP.name}, Paphos, Zypern („wir“) betrieben. Kontakt: ${H}. Mit der Nutzung des Dienstes stimmst du diesen Bedingungen zu.

## Was der Dienst ist
betizzi veröffentlicht Informationen zu Fußballspielen, Statistiken, modellbasierte Tipps und geschätzte Chancen, Quoten von Buchmachern sowie Werkzeuge wie einen Wettschein-Baukasten – zur Information und Unterhaltung. Tipps und Chancen sind Schätzungen aus Daten und Regeln, die sich ändern können. Angezeigte Quoten gehören Drittanbietern und können sich ändern, je nach Land oder Konto abweichen oder nicht mehr verfügbar sein.

betizzi ist kein Buchmacher und kein Glücksspielanbieter. Wir nehmen keine Wetten an, rechnen keine ab und verwahren keine Spielergelder. Was du bei einem Buchmacher tust, betrifft nur dich und diesen Buchmacher, nach dessen Bedingungen und dem Recht deines Wohnorts.

## Wer ihn nutzen darf
Der Dienst richtet sich an Erwachsene ab 18 Jahren oder älter, wo das Gesetz es verlangt (zum Beispiel 21 in Griechenland). Nutze ihn nicht, wo das rechtswidrig wäre. Nur du entscheidest, ob du wettest.

## Kein Gewinnversprechen
Ein Tipp ist kein Versprechen, dass eine Wette gewinnt. Daten, Ergebnisse, Anstoßzeiten und Quoten können unvollständig, verspätet oder falsch sein. Frühere Ergebnisse sagen nichts über künftige aus. Wir geben keine persönliche Wett- oder Finanzberatung. Soweit gesetzlich zulässig, haften wir nicht für Verluste aus deinen Wetten.

## Credits und Belohnungen
Wenn wir Credits oder Belohnungen anbieten (zum Beispiel fürs Teilen oder Einladen), haben sie keinen Geldwert, sind nicht verkäuflich oder übertragbar und können geändert oder eingestellt werden. Durch Missbrauch, Fake-Konten oder Automatisierung erlangte Credits können wir streichen.

## Konten
Wenn Konten angeboten werden, musst du eine E-Mail-Adresse angeben, über die du verfügst, und den Zugang sicher halten. Bei Missbrauch, rechtswidriger Nutzung oder schwerem Verstoß gegen diese Bedingungen können wir ein Konto sperren oder löschen. Du kannst jederzeit die Löschung deines Kontos verlangen.

## Zulässige Nutzung
Kopiere den Dienst nicht massenhaft, lies ihn nicht automatisiert aus, störe ihn nicht und nutze ihn nicht für Rechtsverstöße. Gib unsere Tipps nicht als deinen eigenen kostenpflichtigen Dienst aus.

## Links und Werbung
Der Dienst enthält Links zu Seiten Dritter, auch zu Buchmachern, von denen uns manche bezahlen können (siehe Affiliate-Hinweis). Für Seiten Dritter sind wir nicht verantwortlich.

## Geistiges Eigentum
Die Website, der Name und das Logo betizzi, Texte und Designs gehören uns oder unseren Lizenzgebern. Vereinsnamen und -logos gehören ihren Inhabern und dienen nur der Kennzeichnung.

## Änderungen und Recht
Wir können diese Bedingungen aktualisieren; das Datum oben zeigt die aktuelle Fassung. Es gilt das Recht der Republik Zypern; zwingende Verbraucherrechte deines Wohnsitzlandes bleiben unberührt.`,
  ro: `Data intrării în vigoare: 1 noiembrie 2026.

Acești Termeni reglementează folosirea betizzi.com („Serviciul“). Serviciul este operat de întreprinderea individuală ${OP.name}, Pafos, Cipru („noi“). Contact: ${H}. Folosind Serviciul, accepți acești Termeni.

## Ce este Serviciul
betizzi publică informații despre meciuri de fotbal, statistici, ponturi bazate pe un model și șanse estimate, cote ale caselor de pariuri și instrumente precum un constructor de bilete, în scop informativ și de divertisment. Ponturile și șansele sunt estimări din date și reguli care se pot schimba. Cotele afișate aparțin caselor de pariuri terțe și se pot schimba, pot diferi în funcție de țară sau cont ori pot să nu mai fie disponibile.

betizzi nu este casă de pariuri sau operator de jocuri de noroc. Nu acceptăm și nu decontăm pariuri și nu păstrăm fondurile jucătorilor. Ce faci la o casă de pariuri este între tine și acea casă, conform termenilor ei și legii din țara ta.

## Cine îl poate folosi
Serviciul este pentru adulți de 18 ani sau mai mult, ori mai mult acolo unde legea cere (de exemplu 21 în Grecia). Nu-l folosi acolo unde ar fi ilegal. Doar tu decizi dacă pariezi.

## Fără promisiune de câștig
Un pont nu este o promisiune că un pariu va câștiga. Datele, rezultatele, orele de start și cotele pot fi incomplete, întârziate sau greșite. Rezultatele trecute nu prezic rezultatele viitoare. Nu oferim consultanță personală de pariuri sau financiară. În măsura permisă de lege, nu răspundem pentru pierderile din pariurile tale.

## Credite și recompense
Dacă oferim credite sau recompense (de exemplu pentru distribuire sau invitarea prietenilor), ele nu au valoare în bani, nu pot fi vândute sau transferate și pot fi modificate sau oprite. Putem anula creditele obținute prin abuz, conturi false sau automatizare.

## Conturi
Dacă oferim conturi, trebuie să folosești o adresă de email pe care o controlezi și să păstrezi accesul în siguranță. Putem suspenda sau șterge un cont pentru abuz, folosire ilegală sau încălcarea gravă a acestor Termeni. Ne poți cere oricând să-ți ștergem contul.

## Utilizare acceptabilă
Nu copia Serviciul în masă, nu-l extrage automat, nu interfera cu el și nu-l folosi pentru a încălca legea. Nu prezenta ponturile noastre ca pe propriul tău serviciu plătit.

## Linkuri și publicitate
Serviciul conține linkuri către site-uri terțe, inclusiv case de pariuri, dintre care unele ne pot plăti (vezi Declarația de afiliere). Nu răspundem pentru site-urile terțe.

## Proprietate intelectuală
Site-ul, numele și logoul betizzi, textele și designul ne aparțin nouă sau licențiatorilor noștri. Numele și siglele echipelor aparțin proprietarilor lor și sunt folosite doar pentru identificare.

## Modificări și legea aplicabilă
Putem actualiza acești Termeni; data de mai sus arată versiunea în vigoare. Acești Termeni sunt guvernați de legea Republicii Cipru, fără a limita drepturile obligatorii de consumator pe care le ai acolo unde locuiești.`,
  sr: `Datum stupanja na snagu: 1. novembar 2026.

Ovi Uslovi uređuju korišćenje sajta betizzi.com („Usluga“). Uslugom upravlja preduzetnik ${OP.name}, Pafos, Kipar („mi“). Kontakt: ${H}. Korišćenjem Usluge prihvataš ove Uslove.

## Šta je Usluga
betizzi objavljuje informacije o fudbalskim utakmicama, statistiku, tipove zasnovane na modelu i procenjene šanse, kvote kladionica i alate kao što je pravljenje tiketa, radi informisanja i zabave. Tipovi i šanse su procene iz podataka i pravila koja se mogu menjati. Prikazane kvote pripadaju kladionicama trećih strana i mogu se promeniti, razlikovati po zemlji ili nalogu ili više ne biti dostupne.

betizzi nije kladionica niti priređivač igara na sreću. Ne primamo i ne obračunavamo opklade i ne čuvamo novac igrača. Ono što radiš kod kladionice je između tebe i te kladionice, prema njenim uslovima i zakonu tvoje zemlje.

## Ko može da je koristi
Usluga je za odrasle od 18 godina ili starije, ili više gde zakon to traži (na primer 21 u Grčkoj). Ne koristi je gde bi to bilo nezakonito. Samo ti odlučuješ da li ćeš se kladiti.

## Bez obećanja dobitka
Tip nije obećanje da će opklada proći. Podaci, rezultati, satnice i kvote mogu biti nepotpuni, zakasneli ili pogrešni. Prošli rezultati ne predviđaju buduće. Ne dajemo lične savete za klađenje niti finansijske savete. U meri u kojoj zakon dozvoljava, nismo odgovorni za gubitke od tvojih opklada.

## Krediti i nagrade
Ako nudimo kredite ili nagrade (na primer za deljenje ili pozivanje prijatelja), oni nemaju novčanu vrednost, ne mogu se prodati niti preneti i mogu se promeniti ili ukinuti. Možemo poništiti kredite stečene zloupotrebom, lažnim nalozima ili automatizacijom.

## Nalozi
Ako nudimo naloge, moraš da navedeš email adresu koju kontrolišeš i da čuvaš pristup bezbednim. Možemo suspendovati ili ukloniti nalog zbog zloupotrebe, nezakonitog korišćenja ili ozbiljnog kršenja ovih Uslova. U svakom trenutku možeš tražiti da obrišemo tvoj nalog.

## Prihvatljivo korišćenje
Ne kopiraj Uslugu masovno, ne preuzimaj je automatski, ne ometaj je i ne koristi je za kršenje zakona. Ne predstavljaj naše tipove kao svoju plaćenu uslugu.

## Linkovi i oglašavanje
Usluga sadrži linkove ka sajtovima trećih strana, uključujući kladionice, od kojih nam neke mogu plaćati (vidi Izjavu o affiliate saradnji). Nismo odgovorni za sajtove trećih strana.

## Intelektualna svojina
Sajt, ime i logo betizzi, tekstovi i dizajn pripadaju nama ili našim davaocima licence. Imena i grbovi timova pripadaju njihovim vlasnicima i koriste se samo radi identifikacije.

## Izmene i merodavno pravo
Možemo ažurirati ove Uslove; datum iznad pokazuje važeću verziju. Na ove Uslove primenjuje se pravo Republike Kipar, bez ograničavanja obaveznih potrošačkih prava koja imaš tamo gde živiš.`,
  bg: `В сила от: 1 ноември 2026 г.

Тези Условия уреждат ползването на betizzi.com („Услугата“). Услугата се управлява от едноличния търговец ${OP.name}, Пафос, Кипър („ние“). Контакт: ${H}. Като ползваш Услугата, приемаш тези Условия.

## Какво е Услугата
betizzi публикува информация за футболни мачове, статистика, прогнози на базата на модел и оценени шансове, коефициенти на букмейкъри и инструменти като създаване на фиш, с информационна и развлекателна цел. Прогнозите и шансовете са оценки от данни и правила, които могат да се променят. Показаните коефициенти принадлежат на букмейкъри трети страни и могат да се променят, да се различават според държавата или профила или да не са вече налични.

betizzi не е букмейкър, нито организатор на хазартни игри. Не приемаме и не уреждаме залози и не държим средства на играчи. Това, което правиш при букмейкър, е между теб и него, според неговите условия и закона в твоята страна.

## Кой може да я ползва
Услугата е за пълнолетни на 18 или повече години, или повече, където законът го изисква (например 21 в Гърция). Не я ползвай там, където това би било незаконно. Само ти решаваш дали да залагаш.

## Без обещание за печалба
Прогнозата не е обещание, че залогът ще спечели. Данните, резултатите, часовете и коефициентите може да са непълни, закъснели или грешни. Миналите резултати не предсказват бъдещите. Не даваме лични съвети за залагане или финансови съвети. Доколкото законът позволява, не носим отговорност за загуби от твоите залози.

## Кредити и награди
Ако предлагаме кредити или награди (например за споделяне или покана на приятели), те нямат парична стойност, не могат да се продават или прехвърлят и могат да бъдат променени или прекратени. Можем да анулираме кредити, получени чрез злоупотреба, фалшиви профили или автоматизация.

## Профили
Ако предлагаме профили, трябва да посочиш имейл, който контролираш, и да пазиш достъпа сигурен. Можем да спрем или изтрием профил при злоупотреба, незаконно ползване или сериозно нарушение на тези Условия. Можеш по всяко време да поискаш да изтрием профила ти.

## Допустимо ползване
Не копирай Услугата масово, не я извличай автоматично, не пречи на работата ѝ и не я ползвай за нарушаване на закона. Не представяй нашите прогнози като своя платена услуга.

## Връзки и реклама
Услугата съдържа връзки към сайтове на трети страни, включително букмейкъри, някои от които може да ни плащат (виж Декларацията за афилиейт). Не носим отговорност за сайтове на трети страни.

## Интелектуална собственост
Сайтът, името и логото betizzi, текстовете и дизайнът принадлежат на нас или на нашите лицензодатели. Имената и емблемите на отборите принадлежат на собствениците им и се ползват само за идентификация.

## Промени и приложимо право
Можем да обновяваме тези Условия; датата по-горе показва действащата версия. Условията се уреждат от правото на Република Кипър, без да ограничават задължителните потребителски права, които имаш там, където живееш.`,
});

Object.assign(PG.privacy.body, {
  es: `Fecha de entrada en vigor: 3 de noviembre de 2026.

## Quién es el responsable
El responsable del tratamiento es el empresario individual ${OP.name}, Pafos, Chipre, que gestiona betizzi.com. Solicitudes de privacidad: ${PV}.

## Qué usamos
- **Datos técnicos de la solicitud** (dirección IP, navegador, hora, país según nuestro proveedor de alojamiento). Finalidad: mostrar el sitio, mostrar el aviso de edad de tu país, proteger contra abusos y corregir errores. Base legal: interés legítimo. Se guardan en registros breves de nuestro proveedor (Cloudflare), normalmente unos días.
- **Recuento de visitas.** Contamos páginas vistas y toques en botones por tipo de página, idioma y país, sin cookie y sin identificador, así que no sabemos quién eres. Finalidad: saber qué partes del sitio se usan. Base legal: interés legítimo.
- **Tus elecciones en el sitio** (boleto, importe, casa de apuestas, filtros, pestaña abierta, cupones guardados). Se guardan solo en tu navegador (almacenamiento local) y no se nos envían.
- **Emails que nos envías.** Finalidad: responderte. Base legal: interés legítimo. Se guardan el tiempo necesario para tratar tu mensaje.

## Si creas una cuenta gratuita
- **Qué guardamos:** tu email, idioma, país (según tu conexión), tu confirmación de que tienes la edad legal, la fecha de registro, tu historial de créditos y tu elección sobre la newsletter.
- **Acceso:** te enviamos un código de 6 dígitos por email. Guardamos solo una forma cifrada (hash) del código durante 10 minutos. Al entrar ponemos una cookie de sesión (bz_s) durante un máximo de 90 días; guardamos una copia cifrada para reconocer tu sesión.
- **Registro de seguridad:** accesos y acciones importantes de la cuenta, para proteger tu cuenta y el servicio.
- **Finalidad y base legal:** darte la cuenta y sus funciones (tips VIP, créditos). Base legal: nuestro contrato contigo. Newsletter solo si marcas la casilla aparte (consentimiento); puedes retirarlo cuando quieras.
- **Emails que enviamos:** solo el código de acceso y un email de bienvenida. Sin publicidad.
- **Cuánto tiempo:** mientras mantengas la cuenta. Puedes pedir que la borremos en cualquier momento escribiendo a ${PV}.

## Google Analytics (solo si aceptas)
Si pulsas «Aceptar» en el aviso de cookies, usamos Google Analytics (Google Ireland Ltd) para ver cómo se usa el sitio: páginas vistas, tipo de dispositivo, ubicación aproximada (país/ciudad) y cómo llegaste. Base legal: tu consentimiento. Google guarda estos datos 14 meses. Si pulsas «Rechazar», no se ponen cookies de analítica; Google recibe solo señales básicas sin cookies, que no te identifican. Puedes cambiar tu elección en cualquier momento con «Ajustes de cookies» al pie de cada página.

No usamos cookies publicitarias y no vendemos datos personales.

## Quién trata datos por nosotros
Cloudflare, Inc. (alojamiento, base de datos, seguridad y envío de nuestros emails) y, solo si aceptas las cookies de analítica, Google Ireland Ltd (Google Analytics). Los datos pueden tratarse fuera de la UE con cláusulas contractuales tipo de la Comisión Europea o una decisión de adecuación.

## Tus derechos
Puedes pedir acceso, rectificación, supresión, limitación o portabilidad de tus datos, u oponerte al tratamiento, escribiendo a ${PV}. Respondemos en un mes. También puedes reclamar ante el Comisionado de Protección de Datos de Chipre ([dataprotection.gov.cy](https://www.dataprotection.gov.cy)) o la autoridad de tu país.

## Edad
betizzi no es para menores de 18 años (21 en Grecia). No tratamos a sabiendas datos de menores.`,
  pt: `Data de entrada em vigor: 3 de novembro de 2026.

## Quem é o responsável
O responsável pelo tratamento é o empresário em nome individual ${OP.name}, Pafos, Chipre, que gere o betizzi.com. Pedidos de privacidade: ${PV}.

## O que usamos
- **Dados técnicos do pedido** (endereço IP, navegador, hora, país segundo o nosso fornecedor de alojamento). Finalidade: mostrar o site, mostrar o aviso de idade do teu país, proteger contra abusos e corrigir erros. Base legal: interesse legítimo. Guardados em registos curtos do nosso fornecedor (Cloudflare), normalmente alguns dias.
- **Contagem de visitas.** Contamos páginas vistas e toques em botões por tipo de página, idioma e país, sem cookie e sem identificador, por isso não sabemos quem és. Finalidade: saber que partes do site são usadas. Base legal: interesse legítimo.
- **As tuas escolhas no site** (boletim, valor, casa de apostas, filtros, separador aberto, cupões guardados). Guardadas só no teu navegador (armazenamento local); não nos são enviadas.
- **Emails que nos envias.** Finalidade: responder-te. Base legal: interesse legítimo. Guardados o tempo necessário para tratar a tua mensagem.

## Se criares uma conta gratuita
- **O que guardamos:** o teu email, idioma, país (pela tua ligação), a confirmação de que tens a idade legal, a data de registo, o histórico de créditos e a tua escolha sobre a newsletter.
- **Entrada:** enviamos-te um código de 6 dígitos por email. Guardamos só uma forma cifrada (hash) do código durante 10 minutos. Ao entrares, criamos um cookie de sessão (bz_s) por até 90 dias; guardamos uma cópia cifrada para reconhecer a tua sessão.
- **Registo de segurança:** entradas e ações importantes da conta, para proteger a tua conta e o serviço.
- **Finalidade e base legal:** dar-te a conta e as suas funções (palpites VIP, créditos). Base legal: o nosso contrato contigo. Newsletter só se marcares a caixa separada (consentimento); podes retirá-lo a qualquer momento.
- **Emails que enviamos:** só o código de entrada e um email de boas-vindas. Sem publicidade.
- **Durante quanto tempo:** enquanto mantiveres a conta. Podes pedir que a apaguemos a qualquer momento escrevendo para ${PV}.

## Google Analytics (só se aceitares)
Se carregares em «Aceitar» no aviso de cookies, usamos o Google Analytics (Google Ireland Ltd) para ver como o site é usado: páginas vistas, tipo de dispositivo, localização aproximada (país/cidade) e como chegaste. Base legal: o teu consentimento. A Google guarda estes dados 14 meses. Se carregares em «Rejeitar», não são criados cookies de análise; a Google recebe só sinais básicos sem cookies, que não te identificam. Podes mudar a tua escolha a qualquer momento em «Definições de cookies» no fundo de cada página.

Não usamos cookies de publicidade e não vendemos dados pessoais.

## Quem trata dados por nós
Cloudflare, Inc. (alojamento, base de dados, segurança e envio dos nossos emails) e, só se aceitares os cookies de análise, Google Ireland Ltd (Google Analytics). Os dados podem ser tratados fora da UE ao abrigo de cláusulas contratuais-tipo da Comissão Europeia ou de uma decisão de adequação.

## Os teus direitos
Podes pedir acesso, retificação, apagamento, limitação ou portabilidade dos teus dados, ou opor-te ao tratamento, escrevendo para ${PV}. Respondemos no prazo de um mês. Podes também apresentar queixa ao Comissário para a Proteção de Dados de Chipre ([dataprotection.gov.cy](https://www.dataprotection.gov.cy)) ou à autoridade do teu país.

## Idade
O betizzi não se destina a menores de 18 anos (21 na Grécia). Não tratamos conscientemente dados de menores.`,
  fr: `Date d'entrée en vigueur : 3 novembre 2026.

## Responsable du traitement
Le responsable du traitement est l'entreprise individuelle de ${OP.name}, Paphos, Chypre, qui exploite betizzi.com. Demandes relatives à la vie privée : ${PV}.

## Ce que nous utilisons
- **Données techniques de la requête** (adresse IP, navigateur, heure, pays selon notre hébergeur). Finalité : afficher le site, afficher l'avertissement d'âge de votre pays, protéger contre les abus et corriger les erreurs. Base légale : intérêt légitime. Conservées dans des journaux courts de notre hébergeur (Cloudflare), en général quelques jours.
- **Comptage des visites.** Nous comptons les pages vues et les clics par type de page, langue et pays, sans cookie ni identifiant : nous ne savons pas qui vous êtes. Finalité : savoir quelles parties du site sont utilisées. Base légale : intérêt légitime.
- **Vos choix sur le site** (ticket, mise, bookmaker, filtres, onglet ouvert, coupons enregistrés). Enregistrés uniquement dans votre navigateur (stockage local) ; ils ne nous sont pas envoyés.
- **E-mails que vous nous envoyez.** Finalité : vous répondre. Base légale : intérêt légitime. Conservés le temps nécessaire pour traiter votre message.

## Si vous créez un compte gratuit
- **Ce que nous conservons :** votre adresse e-mail, votre langue, votre pays (selon votre connexion), votre confirmation d'avoir l'âge légal, la date d'inscription, l'historique de vos crédits et votre choix concernant la newsletter.
- **Connexion :** nous vous envoyons un code à 6 chiffres par e-mail. Nous ne conservons qu'une forme brouillée (hachée) du code pendant 10 minutes. À la connexion, nous plaçons un cookie de session (bz_s) pour 90 jours maximum ; nous en gardons une copie brouillée pour reconnaître votre session.
- **Journal de sécurité :** connexions et actions importantes sur le compte, pour protéger votre compte et le service.
- **Finalité et base légale :** vous fournir le compte et ses fonctions (tips VIP, crédits). Base légale : notre contrat avec vous. Newsletter uniquement si vous cochez la case séparée (consentement) ; vous pouvez le retirer à tout moment.
- **E-mails que nous envoyons :** uniquement le code de connexion et un e-mail de bienvenue. Aucune publicité.
- **Durée :** tant que vous gardez votre compte. Vous pouvez demander sa suppression à tout moment en écrivant à ${PV}.

## Google Analytics (seulement si vous acceptez)
Si vous cliquez sur « Accepter » dans notre bandeau cookies, nous utilisons Google Analytics (Google Ireland Ltd) pour voir comment le site est utilisé : pages vues, type d'appareil, localisation approximative (pays/ville) et provenance. Base légale : votre consentement. Google conserve ces données 14 mois. Si vous cliquez sur « Refuser », aucun cookie d'analyse n'est déposé ; Google ne reçoit que des signaux de base sans cookies, qui ne permettent pas de vous identifier. Vous pouvez modifier votre choix à tout moment via « Paramètres des cookies » en bas de chaque page.

Nous n'utilisons pas de cookies publicitaires et ne vendons pas de données personnelles.

## Qui traite les données pour nous
Cloudflare, Inc. (hébergement, base de données, sécurité et envoi de nos e-mails) et, uniquement si vous acceptez les cookies d'analyse, Google Ireland Ltd (Google Analytics). Les données peuvent être traitées hors de l'UE sur la base des clauses contractuelles types de la Commission européenne ou d'une décision d'adéquation.

## Vos droits
Vous pouvez demander l'accès, la rectification, l'effacement, la limitation ou la portabilité de vos données, ou vous opposer au traitement, en écrivant à ${PV}. Nous répondons sous un mois. Vous pouvez aussi saisir le Commissaire à la protection des données de Chypre ([dataprotection.gov.cy](https://www.dataprotection.gov.cy)) ou l'autorité de votre pays (en France, la CNIL).

## Âge
betizzi n'est pas destiné aux moins de 18 ans (21 en Grèce). Nous ne traitons pas sciemment de données de mineurs.`,
  de: `Gültig ab: 3. November 2026.

## Verantwortlicher
Verantwortlich ist das Einzelunternehmen ${OP.name}, Paphos, Zypern, das betizzi.com betreibt. Datenschutzanfragen: ${PV}.

## Was wir verwenden
- **Technische Anfragedaten** (IP-Adresse, Browser, Zeitpunkt, Land laut unserem Hosting-Anbieter). Zweck: die Website ausliefern, den Altershinweis für dein Land zeigen, vor Missbrauch schützen und Fehler beheben. Rechtsgrundlage: berechtigtes Interesse. Gespeichert in kurzlebigen Logs unseres Anbieters (Cloudflare), meist einige Tage.
- **Besuchszählung.** Wir zählen Seitenaufrufe und Klicks nach Seitentyp, Sprache und Land, ohne Cookie und ohne Kennung – wir wissen also nicht, wer du bist. Zweck: wissen, welche Teile der Website genutzt werden. Rechtsgrundlage: berechtigtes Interesse.
- **Deine Einstellungen auf der Website** (Wettschein, Einsatz, Buchmacher, Filter, offener Tab, gespeicherte Scheine). Nur in deinem Browser gespeichert (lokaler Speicher); sie werden nicht an uns gesendet.
- **E-Mails an uns.** Zweck: dir antworten. Rechtsgrundlage: berechtigtes Interesse. Gespeichert, solange es für deine Anfrage nötig ist.

## Wenn du ein kostenloses Konto anlegst
- **Was wir speichern:** deine E-Mail-Adresse, Sprache, Land (aus deiner Verbindung), deine Bestätigung der Volljährigkeit, das Anmeldedatum, deinen Credit-Verlauf und deine Wahl zum Newsletter.
- **Anmeldung:** Wir senden dir einen 6-stelligen Code per E-Mail. Wir speichern nur eine verschlüsselte (gehashte) Form des Codes für 10 Minuten. Bei der Anmeldung setzen wir ein Sitzungs-Cookie (bz_s) für bis zu 90 Tage; wir speichern eine verschlüsselte Kopie, um deine Sitzung zu erkennen.
- **Sicherheitsprotokoll:** Anmeldungen und wichtige Kontoaktionen, um dein Konto und den Dienst zu schützen.
- **Zweck und Rechtsgrundlage:** dir das Konto und seine Funktionen bereitstellen (VIP-Tipps, Credits). Rechtsgrundlage: unser Vertrag mit dir. Newsletter nur, wenn du das separate Kästchen ankreuzt (Einwilligung); du kannst sie jederzeit widerrufen.
- **E-Mails, die wir senden:** nur den Anmeldecode und eine Willkommens-E-Mail. Keine Werbung.
- **Wie lange:** solange du dein Konto behältst. Du kannst jederzeit die Löschung verlangen, per E-Mail an ${PV}.

## Google Analytics (nur mit deiner Zustimmung)
Wenn du im Cookie-Banner auf „Akzeptieren“ klickst, nutzen wir Google Analytics (Google Ireland Ltd), um zu sehen, wie die Website genutzt wird: aufgerufene Seiten, Gerätetyp, ungefährer Standort (Land/Stadt) und wie du zu uns gekommen bist. Rechtsgrundlage: deine Einwilligung. Google speichert diese Daten 14 Monate. Wenn du auf „Ablehnen“ klickst, werden keine Analyse-Cookies gesetzt; Google erhält nur einfache Signale ohne Cookies, die dich nicht identifizieren. Du kannst deine Wahl jederzeit über „Cookie-Einstellungen“ unten auf jeder Seite ändern.

Wir verwenden keine Werbe-Cookies und verkaufen keine personenbezogenen Daten.

## Wer Daten für uns verarbeitet
Cloudflare, Inc. (Hosting, Datenbank, Sicherheit und Versand unserer E-Mails) und, nur wenn du Analyse-Cookies akzeptierst, Google Ireland Ltd (Google Analytics). Daten können außerhalb der EU auf Grundlage der Standardvertragsklauseln der Europäischen Kommission oder eines Angemessenheitsbeschlusses verarbeitet werden.

## Deine Rechte
Du kannst Auskunft, Berichtigung, Löschung, Einschränkung oder Übertragbarkeit deiner Daten verlangen oder der Verarbeitung widersprechen, per E-Mail an ${PV}. Wir antworten innerhalb eines Monats. Du kannst dich auch beim zyprischen Datenschutzbeauftragten ([dataprotection.gov.cy](https://www.dataprotection.gov.cy)) oder bei der Aufsichtsbehörde deines Wohnorts beschweren.

## Alter
betizzi ist nicht für Personen unter 18 Jahren (21 in Griechenland). Wir verarbeiten nicht wissentlich Daten von Minderjährigen.`,
  ro: `Data intrării în vigoare: 3 noiembrie 2026.

## Cine este operatorul
Operatorul de date este întreprinderea individuală ${OP.name}, Pafos, Cipru, care administrează betizzi.com. Cereri privind datele: ${PV}.

## Ce folosim
- **Date tehnice ale cererii** (adresa IP, browserul, ora, țara după furnizorul nostru de găzduire). Scop: afișarea site-ului, afișarea avertismentului de vârstă pentru țara ta, protecție împotriva abuzurilor și corectarea erorilor. Temei legal: interes legitim. Păstrate în jurnale de scurtă durată ale furnizorului (Cloudflare), de obicei câteva zile.
- **Numărarea vizitelor.** Numărăm afișările de pagini și apăsările pe butoane după tipul paginii, limbă și țară, fără cookie și fără identificator, deci nu știm cine ești. Scop: să știm ce părți ale site-ului sunt folosite. Temei legal: interes legitim.
- **Alegerile tale pe site** (bilet, miză, casă de pariuri, filtre, fila deschisă, bilete salvate). Salvate doar în browserul tău (stocare locală); nu ne sunt trimise.
- **Emailurile pe care ni le trimiți.** Scop: să-ți răspundem. Temei legal: interes legitim. Păstrate cât e nevoie pentru a rezolva mesajul.

## Dacă îți faci un cont gratuit
- **Ce păstrăm:** adresa de email, limba, țara (după conexiune), confirmarea că ai vârsta legală, data înregistrării, istoricul creditelor și alegerea ta privind newsletterul.
- **Autentificare:** îți trimitem un cod de 6 cifre pe email. Păstrăm doar o formă criptată (hash) a codului timp de 10 minute. La autentificare setăm un cookie de sesiune (bz_s) pentru cel mult 90 de zile; păstrăm o copie criptată ca să-ți recunoaștem sesiunea.
- **Jurnal de securitate:** autentificări și acțiuni importante în cont, pentru protecția contului și a serviciului.
- **Scop și temei legal:** să-ți oferim contul și funcțiile lui (ponturi VIP, credite). Temei legal: contractul nostru cu tine. Newsletter doar dacă bifezi căsuța separată (consimțământ); îl poți retrage oricând.
- **Emailuri pe care le trimitem:** doar codul de autentificare și un email de bun venit. Fără publicitate.
- **Cât timp:** cât timp păstrezi contul. Ne poți cere oricând să-l ștergem, scriind la ${PV}.

## Google Analytics (doar dacă accepți)
Dacă apeși „Accept“ în bannerul de cookie-uri, folosim Google Analytics (Google Ireland Ltd) ca să vedem cum e folosit site-ul: pagini vizitate, tipul dispozitivului, locația aproximativă (țară/oraș) și cum ai ajuns. Temei legal: consimțământul tău. Google păstrează aceste date 14 luni. Dacă apeși „Refuz“, nu se setează cookie-uri de analiză; Google primește doar semnale de bază fără cookie-uri, care nu te identifică. Îți poți schimba oricând alegerea din „Setări cookie-uri“, în josul fiecărei pagini.

Nu folosim cookie-uri de publicitate și nu vindem date personale.

## Cine prelucrează date pentru noi
Cloudflare, Inc. (găzduire, bază de date, securitate și trimiterea emailurilor noastre) și, doar dacă accepți cookie-urile de analiză, Google Ireland Ltd (Google Analytics). Datele pot fi prelucrate în afara UE pe baza clauzelor contractuale standard ale Comisiei Europene sau a unei decizii de adecvare.

## Drepturile tale
Poți cere acces, rectificare, ștergere, restricționare sau portabilitatea datelor ori te poți opune prelucrării, scriind la ${PV}. Răspundem în cel mult o lună. Poți depune și plângere la Comisarul pentru Protecția Datelor din Cipru ([dataprotection.gov.cy](https://www.dataprotection.gov.cy)) sau la autoritatea din țara ta (în România, ANSPDCP).

## Vârsta
betizzi nu este pentru persoane sub 18 ani (21 în Grecia). Nu prelucrăm cu bună știință date ale minorilor.`,
  sr: `Datum stupanja na snagu: 3. novembar 2026.

## Ko je rukovalac
Rukovalac podacima je preduzetnik ${OP.name}, Pafos, Kipar, koji upravlja sajtom betizzi.com. Zahtevi u vezi sa privatnošću: ${PV}.

## Šta koristimo
- **Tehnički podaci zahteva** (IP adresa, pregledač, vreme, zemlja prema našem provajderu hostinga). Svrha: prikaz sajta, prikaz upozorenja o uzrastu za tvoju zemlju, zaštita od zloupotrebe i ispravljanje grešaka. Pravni osnov: legitimni interes. Čuvaju se u kratkotrajnim logovima provajdera (Cloudflare), obično nekoliko dana.
- **Brojanje poseta.** Brojimo prikaze stranica i dodire dugmadi po tipu stranice, jeziku i zemlji, bez kolačića i bez identifikatora, pa ne znamo ko si. Svrha: da znamo koji delovi sajta se koriste. Pravni osnov: legitimni interes.
- **Tvoji izbori na sajtu** (tiket, ulog, kladionica, filteri, otvorena kartica, sačuvani tiketi). Čuvaju se samo u tvom pregledaču (lokalno skladište); ne šalju se nama.
- **Emailovi koje nam pošalješ.** Svrha: da ti odgovorimo. Pravni osnov: legitimni interes. Čuvaju se koliko je potrebno da obradimo poruku.

## Ako napraviš besplatan nalog
- **Šta čuvamo:** tvoju email adresu, jezik, zemlju (prema konekciji), potvrdu da si punoletan, datum registracije, istoriju kredita i tvoj izbor u vezi sa newsletterom.
- **Prijava:** šaljemo ti šestocifreni kod na email. Čuvamo samo šifrovani (heširani) oblik koda 10 minuta. Pri prijavi postavljamo kolačić sesije (bz_s) do 90 dana; čuvamo šifrovanu kopiju da bismo prepoznali sesiju.
- **Bezbednosni zapis:** prijave i važne radnje na nalogu, radi zaštite naloga i usluge.
- **Svrha i pravni osnov:** da ti obezbedimo nalog i njegove funkcije (VIP tipovi, krediti). Pravni osnov: naš ugovor sa tobom. Newsletter samo ako označiš posebno polje (pristanak); možeš ga povući bilo kada.
- **Emailovi koje šaljemo:** samo kod za prijavu i jedan email dobrodošlice. Bez reklama.
- **Koliko dugo:** dok god imaš nalog. Bilo kada možeš tražiti brisanje pisanjem na ${PV}.

## Google Analytics (samo ako prihvatiš)
Ako klikneš „Prihvati“ u obaveštenju o kolačićima, koristimo Google Analytics (Google Ireland Ltd) da vidimo kako se sajt koristi: posećene stranice, vrsta uređaja, približna lokacija (zemlja/grad) i kako si stigao. Pravni osnov: tvoj pristanak. Google čuva ove podatke 14 meseci. Ako klikneš „Odbij“, kolačići za analitiku se ne postavljaju; Google dobija samo osnovne signale bez kolačića, koji te ne identifikuju. Izbor možeš promeniti bilo kada preko „Podešavanja kolačića“ na dnu svake stranice.

Ne koristimo reklamne kolačiće i ne prodajemo lične podatke.

## Ko obrađuje podatke za nas
Cloudflare, Inc. (hosting, baza podataka, bezbednost i slanje naših emailova) i, samo ako prihvatiš kolačiće za analitiku, Google Ireland Ltd (Google Analytics). Podaci se mogu obrađivati van EU na osnovu standardnih ugovornih klauzula Evropske komisije ili odluke o adekvatnosti.

## Tvoja prava
Možeš tražiti pristup, ispravku, brisanje, ograničenje ili prenosivost podataka, ili se usprotiviti obradi, pisanjem na ${PV}. Odgovaramo u roku od mesec dana. Možeš podneti i pritužbu Poverenici za zaštitu podataka Kipra ([dataprotection.gov.cy](https://www.dataprotection.gov.cy)) ili nadležnom organu u tvojoj zemlji.

## Uzrast
betizzi nije za osobe mlađe od 18 godina (21 u Grčkoj). Svesno ne obrađujemo podatke maloletnika.`,
  bg: `В сила от: 3 ноември 2026 г.

## Кой е администраторът
Администратор на данните е едноличният търговец ${OP.name}, Пафос, Кипър, който управлява betizzi.com. Искания за поверителност: ${PV}.

## Какво използваме
- **Технически данни от заявката** (IP адрес, браузър, час, държава според хостинг доставчика ни). Цел: показване на сайта, показване на предупреждението за възраст за твоята държава, защита от злоупотреби и поправка на грешки. Правно основание: законен интерес. Пазят се в краткосрочни логове на доставчика (Cloudflare), обикновено няколко дни.
- **Броене на посещенията.** Броим прегледите на страници и натисканията на бутони по вид страница, език и държава, без бисквитка и без идентификатор, така че не знаем кой си. Цел: да знаем кои части на сайта се ползват. Правно основание: законен интерес.
- **Твоите избори в сайта** (фиш, залог, букмейкър, филтри, отворен раздел, запазени фишове). Пазят се само в браузъра ти (локално хранилище); не се изпращат до нас.
- **Имейли, които ни пишеш.** Цел: да ти отговорим. Правно основание: законен интерес. Пазят се толкова, колкото е нужно за съобщението.

## Ако създадеш безплатен профил
- **Какво пазим:** имейла ти, езика, държавата (според връзката), потвърждението ти, че си пълнолетен, датата на регистрация, историята на кредитите и избора ти за бюлетина.
- **Вход:** изпращаме ти 6-цифрен код по имейл. Пазим само кодирана (хеширана) форма на кода за 10 минути. При вход поставяме бисквитка за сесия (bz_s) за до 90 дни; пазим кодирано копие, за да разпознаваме сесията ти.
- **Дневник за сигурност:** влизания и важни действия в профила, за защита на профила и услугата.
- **Цел и правно основание:** да ти предоставим профила и функциите му (VIP прогнози, кредити). Правно основание: договорът ни с теб. Бюлетин само ако отметнеш отделното поле (съгласие); можеш да го оттеглиш по всяко време.
- **Имейли, които изпращаме:** само кода за вход и един приветствен имейл. Без реклама.
- **Колко дълго:** докато пазиш профила си. Можеш по всяко време да поискаш изтриването му на ${PV}.

## Google Analytics (само ако приемеш)
Ако натиснеш „Приемам“ в банера за бисквитки, използваме Google Analytics (Google Ireland Ltd), за да виждаме как се ползва сайтът: прегледани страници, вид устройство, приблизително местоположение (държава/град) и откъде си дошъл. Правно основание: твоето съгласие. Google пази тези данни 14 месеца. Ако натиснеш „Отказвам“, не се поставят аналитични бисквитки; Google получава само основни сигнали без бисквитки, които не те идентифицират. Можеш да промениш избора си по всяко време от „Настройки за бисквитки“ в долната част на всяка страница.

Не използваме рекламни бисквитки и не продаваме лични данни.

## Кой обработва данни за нас
Cloudflare, Inc. (хостинг, база данни, сигурност и изпращане на имейлите ни) и, само ако приемеш аналитичните бисквитки, Google Ireland Ltd (Google Analytics). Данните може да се обработват извън ЕС въз основа на стандартните договорни клаузи на Европейската комисия или решение за адекватност.

## Твоите права
Можеш да поискаш достъп, поправка, изтриване, ограничаване или преносимост на данните си, или да възразиш срещу обработването, като пишеш на ${PV}. Отговаряме в срок от един месец. Можеш да подадеш и жалба до Комисаря за защита на личните данни на Кипър ([dataprotection.gov.cy](https://www.dataprotection.gov.cy)) или до органа в твоята държава (в България — КЗЛД).

## Възраст
betizzi не е за лица под 18 години (21 в Гърция). Не обработваме съзнателно данни на непълнолетни.`,
});

const CK = (intro, h1, s, ga, change, h2, store, l1, l2, l3, l4, l5, need, ads) => `${intro}

## ${h1}
- **bz_s** — ${s}
- **_ga, _ga_WW02BKK8TV** — ${ga}

${change}

## ${h2}
${store}
- **ko-slip, ko-stake, ko-smode** — ${l1}
- **ko-book** — ${l2}
- **ko-lfil, ko-tab, ko-vip** — ${l3}
- **ko-builder, ko-bmode, ko-coupons** — ${l4}
- **ko-y** — ${l5}

${need}

${ads}`;

Object.assign(PG.cookies.body, {
  es: CK(`Fecha de entrada en vigor: 3 de noviembre de 2026.

betizzi no usa cookies publicitarias. Las cookies de analítica solo se ponen si pulsas «Aceptar» en nuestro aviso de cookies.`, "Cookies que usamos",
    "la cookie de sesión. Solo se pone cuando entras en tu cuenta gratuita, para que sigas conectado. Es HttpOnly y segura, dura hasta 90 días y se borra al salir. Es estrictamente necesaria para que funcione la cuenta, así que no requiere tu consentimiento.",
    "Google Analytics, solo si aceptas. Distinguen visitas para que podamos contar cómo se usa el sitio. Duran hasta 2 años. Si rechazas, no se ponen.",
    "Puedes cambiar tu elección en cualquier momento con «Ajustes de cookies» al pie de cada página.", "Lo que guardamos en tu navegador",
    "También usamos el almacenamiento de tu navegador para recordar tus elecciones, para que el sitio funcione como lo dejaste. Estos datos se quedan en tu dispositivo y no se nos envían.",
    "tu boleto, importe y modo de boleto.", "la casa de apuestas que elegiste para las cuotas.", "tu filtro de ligas, la pestaña abierta y la vista VIP.", "ajustes del creador y cupones guardados.", "(solo durante una visita) tu posición de desplazamiento.",
    "Son necesarios para las funciones que usas. Puedes borrarlos cuando quieras en los ajustes de tu navegador; el sitio simplemente olvidará tus elecciones (y cerrará tu sesión).",
    "Si algún día añadimos cookies publicitarias, actualizaremos esta página y te pediremos antes tu consentimiento."),
  pt: CK(`Data de entrada em vigor: 3 de novembro de 2026.

O betizzi não usa cookies de publicidade. Os cookies de análise só são criados se carregares em «Aceitar» no nosso aviso de cookies.`, "Cookies que usamos",
    "o cookie de sessão. Só é criado quando entras na tua conta gratuita, para continuares ligado. É HttpOnly e seguro, dura até 90 dias e é apagado quando sais. É estritamente necessário para a conta funcionar, por isso não precisa do teu consentimento.",
    "Google Analytics, só se aceitares. Distinguem visitas para podermos contar como o site é usado. Duram até 2 anos. Se rejeitares, não são criados.",
    "Podes mudar a tua escolha a qualquer momento em «Definições de cookies» no fundo de cada página.", "O que guardamos no teu navegador",
    "Também usamos o armazenamento do teu navegador para lembrar as tuas escolhas, para o site funcionar como o deixaste. Estes dados ficam no teu dispositivo e não nos são enviados.",
    "o teu boletim, valor e modo do boletim.", "a casa de apostas que escolheste para as odds.", "o teu filtro de ligas, o separador aberto e a vista VIP.", "definições do criador e cupões guardados.", "(só durante uma visita) a tua posição na página.",
    "São necessários para as funções que usas. Podes apagá-los quando quiseres nas definições do navegador; o site simplesmente esquece as tuas escolhas (e termina a tua sessão).",
    "Se algum dia acrescentarmos cookies de publicidade, atualizamos esta página e pedimos primeiro o teu consentimento."),
  fr: CK(`Date d'entrée en vigueur : 3 novembre 2026.

betizzi ne dépose pas de cookies publicitaires. Les cookies d'analyse ne sont déposés que si vous cliquez sur « Accepter » dans notre bandeau cookies.`, "Cookies que nous déposons",
    "le cookie de connexion. Déposé uniquement quand vous vous connectez à votre compte gratuit, pour rester connecté. HttpOnly et sécurisé, il dure 90 jours maximum et est supprimé à la déconnexion. Il est strictement nécessaire au fonctionnement du compte et ne requiert donc pas votre consentement.",
    "Google Analytics, uniquement si vous acceptez. Ils distinguent les visites pour mesurer l'usage du site. Ils durent jusqu'à 2 ans. Si vous refusez, ils ne sont pas déposés.",
    "Vous pouvez modifier votre choix à tout moment via « Paramètres des cookies » en bas de chaque page.", "Ce que nous enregistrons dans votre navigateur",
    "Nous utilisons aussi le stockage de votre navigateur pour retenir vos choix, afin que le site fonctionne comme vous l'avez laissé. Ces données restent sur votre appareil et ne nous sont pas envoyées.",
    "votre ticket, votre mise et le mode du ticket.", "le bookmaker choisi pour les cotes.", "votre filtre de ligues, l'onglet ouvert et la vue VIP.", "réglages du créateur et coupons enregistrés.", "(pendant une seule visite) votre position de défilement.",
    "Ils sont nécessaires aux fonctions que vous utilisez. Vous pouvez les supprimer à tout moment dans les réglages de votre navigateur ; le site oubliera simplement vos choix (et vous déconnectera).",
    "Si nous ajoutons un jour des cookies publicitaires, nous mettrons cette page à jour et vous demanderons d'abord votre consentement."),
  de: CK(`Gültig ab: 3. November 2026.

betizzi setzt keine Werbe-Cookies. Analyse-Cookies werden nur gesetzt, wenn du in unserem Cookie-Banner auf „Akzeptieren“ klickst.`, "Cookies, die wir setzen",
    "das Anmelde-Cookie. Wird nur gesetzt, wenn du dich in dein kostenloses Konto einloggst, damit du angemeldet bleibst. HttpOnly und sicher, gilt bis zu 90 Tage und wird beim Abmelden gelöscht. Es ist für das Konto technisch notwendig und braucht daher keine Einwilligung.",
    "Google Analytics, nur wenn du zustimmst. Sie unterscheiden Besuche, damit wir die Nutzung zählen können. Laufzeit bis zu 2 Jahre. Wenn du ablehnst, werden sie nicht gesetzt.",
    "Du kannst deine Wahl jederzeit über „Cookie-Einstellungen“ unten auf jeder Seite ändern.", "Was wir in deinem Browser speichern",
    "Wir nutzen außerdem den Speicher deines Browsers, um deine Einstellungen zu merken, damit die Website so funktioniert, wie du sie verlassen hast. Diese Daten bleiben auf deinem Gerät und werden nicht an uns gesendet.",
    "dein Wettschein, Einsatz und Schein-Modus.", "der gewählte Buchmacher für die Quoten.", "dein Liga-Filter, der offene Tab und die VIP-Ansicht.", "Einstellungen des Baukastens und gespeicherte Scheine.", "(nur für einen Besuch) deine Scrollposition.",
    "Sie sind für Funktionen nötig, die du nutzt. Du kannst sie jederzeit in den Browser-Einstellungen löschen; die Website vergisst dann einfach deine Einstellungen (und meldet dich ab).",
    "Sollten wir jemals Werbe-Cookies einführen, aktualisieren wir diese Seite und fragen vorher nach deiner Einwilligung."),
  ro: CK(`Data intrării în vigoare: 3 noiembrie 2026.

betizzi nu folosește cookie-uri de publicitate. Cookie-urile de analiză se setează doar dacă apeși „Accept“ în bannerul nostru de cookie-uri.`, "Cookie-uri pe care le setăm",
    "cookie-ul de autentificare. Se setează doar când intri în contul tău gratuit, ca să rămâi conectat. Este HttpOnly și securizat, durează cel mult 90 de zile și se șterge când ieși din cont. Este strict necesar pentru funcționarea contului, deci nu necesită consimțământ.",
    "Google Analytics, doar dacă accepți. Deosebesc vizitele ca să putem număra cum e folosit site-ul. Durează cel mult 2 ani. Dacă refuzi, nu se setează.",
    "Îți poți schimba oricând alegerea din „Setări cookie-uri“, în josul fiecărei pagini.", "Ce salvăm în browserul tău",
    "Folosim și spațiul de stocare al browserului ca să ținem minte alegerile tale, ca site-ul să funcționeze cum l-ai lăsat. Aceste date rămân pe dispozitivul tău și nu ne sunt trimise.",
    "biletul, miza și modul biletului.", "casa de pariuri aleasă pentru cote.", "filtrul de ligi, fila deschisă și vizualizarea VIP.", "setările constructorului și biletele salvate.", "(doar pentru o vizită) poziția de derulare.",
    "Sunt necesare pentru funcțiile pe care le folosești. Le poți șterge oricând din setările browserului; site-ul îți va uita pur și simplu alegerile (și te va deconecta).",
    "Dacă vom adăuga vreodată cookie-uri de publicitate, vom actualiza această pagină și îți vom cere mai întâi consimțământul."),
  sr: CK(`Datum stupanja na snagu: 3. novembar 2026.

betizzi ne postavlja reklamne kolačiće. Kolačići za analitiku se postavljaju samo ako klikneš „Prihvati“ u obaveštenju o kolačićima.`, "Kolačići koje postavljamo",
    "kolačić za prijavu. Postavlja se samo kada se prijaviš na besplatan nalog, da bi ostao prijavljen. HttpOnly i bezbedan, traje do 90 dana i briše se kada se odjaviš. Neophodan je za rad naloga, pa mu nije potreban tvoj pristanak.",
    "Google Analytics, samo ako prihvatiš. Razlikuju posete da bismo brojali kako se sajt koristi. Traju do 2 godine. Ako odbiješ, ne postavljaju se.",
    "Izbor možeš promeniti bilo kada preko „Podešavanja kolačića“ na dnu svake stranice.", "Šta čuvamo u tvom pregledaču",
    "Koristimo i skladište tvog pregledača da zapamtimo tvoje izbore, da bi sajt radio onako kako si ga ostavio. Ovi podaci ostaju na tvom uređaju i ne šalju se nama.",
    "tvoj tiket, ulog i režim tiketa.", "kladionica koju si izabrao za kvote.", "filter liga, otvorena kartica i VIP prikaz.", "podešavanja alata i sačuvani tiketi.", "(samo tokom jedne posete) položaj na stranici.",
    "Potrebni su za funkcije koje koristiš. Možeš ih obrisati bilo kada u podešavanjima pregledača; sajt će jednostavno zaboraviti tvoje izbore (i odjaviti te).",
    "Ako ikada dodamo reklamne kolačiće, ažuriraćemo ovu stranicu i prvo tražiti tvoj pristanak."),
  bg: CK(`В сила от: 3 ноември 2026 г.

betizzi не поставя рекламни бисквитки. Аналитичните бисквитки се поставят само ако натиснеш „Приемам“ в банера ни за бисквитки.`, "Бисквитки, които поставяме",
    "бисквитката за вход. Поставя се само когато влезеш в безплатния си профил, за да останеш влязъл. HttpOnly и защитена, трае до 90 дни и се изтрива при изход. Строго необходима е за работата на профила, затова не изисква съгласие.",
    "Google Analytics, само ако приемеш. Различават посещенията, за да броим как се ползва сайтът. Траят до 2 години. Ако откажеш, не се поставят.",
    "Можеш да промениш избора си по всяко време от „Настройки за бисквитки“ в долната част на всяка страница.", "Какво пазим в браузъра ти",
    "Използваме и хранилището на браузъра ти, за да помним изборите ти, така че сайтът да работи както си го оставил. Тези данни остават на устройството ти и не се изпращат до нас.",
    "фишът, залогът и режимът на фиша.", "букмейкърът, който избра за коефициентите.", "филтърът по лиги, отвореният раздел и VIP изгледът.", "настройките на инструмента и запазените фишове.", "(само за едно посещение) позицията на превъртане.",
    "Нужни са за функциите, които ползваш. Можеш да ги изтриеш по всяко време от настройките на браузъра; сайтът просто ще забрави изборите ти (и ще те изведе от профила).",
    "Ако някога добавим рекламни бисквитки, ще обновим тази страница и първо ще поискаме съгласието ти."),
});


// ---------- «Παρολί σήμερα» (απόφαση Owner 05/11): σταθερό URL ανά γλώσσα, λέξεις από την έρευνα 5/11 (υποθέσεις, χωρίς όγκο) ----------
export const PAR = {
  en: { megaH: "Mega parlay of the day", slug: "accumulator-tips-today", title: "Football accumulator tips today ({d})", h1: "Accumulator tips today", desc: "Ready-made football accumulators for today, built only from betizzi's own tips: x3–5, x8–12, x20–30 and the mega parlay of the day (x30–50). Free. 18+.",
    ans: (d, n, lo, hi) => `On ${d} betizzi has ${n} ready-made football accumulators, with total odds from x${lo} to x${hi}. Every selection comes from our own model-based tips, and a published ticket is never changed.`,
    none: "No accumulators yet today. They are published in the morning (Greek time) and topped up during the day.",
    zone: "Odds", v: { wins: "Wins", goals: "Goals", mix: "Mixed" }, st: { w: "Won", l: "Lost", lv: "In play", o: "Open" }, total: "Total odds", upd: "Updated",
    howH: "How we build them", how: ["Only from our tips: every selection is a betizzi Free or VIP tip, based on each team's last 10 games and the bookmaker price.", "Four odds bands: x3–5, x8–12, x20–30 and the mega parlay of the day (x30–50). Each tip goes into one ticket only (the mega may reuse up to half).", "Nothing is deleted: winning and losing tickets stay in our record."],
    big: "Big accumulators win rarely. Bet only what you can afford to lose.", last: (o, d) => `Our last winning accumulator: x${o} on ${d}.`, app: "Open them in the app →",
    faqH: "Questions", faq: [["What is an accumulator?", "One bet with several selections. The odds multiply, but every selection has to win."],
      ["How are betizzi accumulators made?", "Our engine picks them every morning from that day's tips, in four odds bands, and adds new ones during the day when new tips appear."],
      ["Why do big accumulators win less often?", "Every extra selection is one more way to lose. An x30–50 ticket will lose far more often than an x3–5 ticket."],
      ["Are they free? Do they always win?", "All accumulators are free. No tip or ticket is a guarantee: play for fun and set a limit. 18+."]] },
  el: { megaH: "Μεγάλο παρολί της ημέρας", slug: "paroli-simera", title: "Παρολί σήμερα ({d}) · έτοιμα παρολί ποδοσφαίρου", h1: "Παρολί σήμερα", desc: "Έτοιμα παρολί ποδοσφαίρου για σήμερα, μόνο από τα tips του betizzi: x3–5, x8–12, x20–30 και το μεγάλο παρολί της ημέρας (x30–50). Δωρεάν. 21+.",
    ans: (d, n, lo, hi) => `Στις ${d} το betizzi έχει ${n} έτοιμα παρολί ποδοσφαίρου, με συνολική απόδοση από x${lo} έως x${hi}. Κάθε επιλογή είναι από τα δικά μας tips, και ένα παρολί που δημοσιεύτηκε δεν αλλάζει ποτέ.`,
    none: "Δεν έχουν βγει ακόμα παρολί σήμερα. Βγαίνουν το πρωί (ώρα Ελλάδας) και συμπληρώνονται μέσα στη μέρα.",
    zone: "Απόδοση", v: { wins: "Νίκες", goals: "Γκολ", mix: "Μικτό" }, st: { w: "Κέρδισε", l: "Χάθηκε", lv: "Σε εξέλιξη", o: "Ανοιχτό" }, total: "Συνολική απόδοση", upd: "Ενημέρωση",
    howH: "Πώς τα φτιάχνουμε", how: ["Μόνο από τα tips μας: κάθε επιλογή είναι Free ή VIP tip του betizzi, από τους 10 τελευταίους αγώνες κάθε ομάδας και την απόδοση των bookmakers.", "Τέσσερις ζώνες: x3–5, x8–12, x20–30 και το μεγάλο παρολί της ημέρας (x30–50). Κάθε tip μπαίνει σε ένα μόνο παρολί (το μεγάλο μπορεί να ξαναπάρει έως τα μισά).", "Δεν σβήνεται τίποτα: τα παρολί που κέρδισαν και που χάθηκαν μένουν στο ιστορικό μας."],
    big: "Τα μεγάλα παρολί κερδίζουν σπάνια. Παίξε μόνο όσα αντέχεις να χάσεις.", last: (o, d) => `Το τελευταίο παρολί μας που κέρδισε: x${o}, ${d}.`, app: "Δες τα στην εφαρμογή →",
    faqH: "Ερωτήσεις", faq: [["Τι είναι το παρολί;", "Ένα στοίχημα με πολλές επιλογές μαζί. Οι αποδόσεις πολλαπλασιάζονται, αλλά πρέπει να κερδίσουν όλες οι επιλογές."],
      ["Πώς φτιάχνονται τα παρολί του betizzi;", "Η μηχανή μας τα βγάζει κάθε πρωί από τα tips της ημέρας, σε τέσσερις ζώνες απόδοσης, και προσθέτει νέα μέσα στη μέρα όταν βγαίνουν νέα tips."],
      ["Γιατί τα μεγάλα παρολί κερδίζουν πιο σπάνια;", "Κάθε επιπλέον επιλογή είναι ένας ακόμα τρόπος να χαθεί το παρολί. Ένα x30–50 θα χάνεται πολύ πιο συχνά από ένα x3–5."],
      ["Είναι δωρεάν; Κερδίζουν πάντα;", "Όλα τα παρολί είναι δωρεάν. Κανένα tip και κανένα παρολί δεν είναι εγγύηση: παίξε για διασκέδαση, με όριο. 21+ (Κύπρος 18+)."]] },
  es: { megaH: "Combinada mega del día", slug: "combinadas-hoy", title: "Combinadas hoy ({d}) · apuestas combinadas de fútbol", h1: "Combinadas hoy", desc: "Combinadas de fútbol listas para hoy, hechas solo con los tips de betizzi: x3–5, x8–12, x20–30 y la combinada mega del día (x30–50). Gratis. 18+.",
    ans: (d, n, lo, hi) => `El ${d} betizzi tiene ${n} combinadas de fútbol listas, con cuota total de x${lo} a x${hi}. Cada selección sale de nuestros propios tips, y una combinada publicada no se cambia nunca.`,
    none: "Todavía no hay combinadas hoy. Se publican por la mañana (hora de Grecia) y se completan durante el día.",
    zone: "Cuota", v: { wins: "Victorias", goals: "Goles", mix: "Mixta" }, st: { w: "Ganada", l: "Perdida", lv: "En juego", o: "Abierta" }, total: "Cuota total", upd: "Actualizado",
    howH: "Cómo las hacemos", how: ["Solo con nuestros tips: cada selección es un tip Free o VIP de betizzi, basado en los últimos 10 partidos de cada equipo y la cuota de las casas.", "Cuatro franjas: x3–5, x8–12, x20–30 y la combinada mega del día (x30–50). Cada tip va a una sola combinada (la mega puede repetir hasta la mitad).", "No se borra nada: las combinadas ganadas y perdidas quedan en nuestro historial."],
    big: "Las combinadas grandes ganan pocas veces. Apuesta solo lo que puedas permitirte perder.", last: (o, d) => `Nuestra última combinada ganada: x${o}, ${d}.`, app: "Ábrelas en la app →",
    faqH: "Preguntas", faq: [["¿Qué es una combinada?", "Una sola apuesta con varias selecciones. Las cuotas se multiplican, pero todas las selecciones tienen que acertar."],
      ["¿Cómo se hacen las combinadas de betizzi?", "Nuestro motor las prepara cada mañana con los tips del día, en cuatro franjas de cuota, y añade nuevas durante el día cuando salen nuevos tips."],
      ["¿Por qué las combinadas grandes ganan menos?", "Cada selección extra es una forma más de perder. Una combinada x30–50 perderá mucho más a menudo que una de x3–5."],
      ["¿Son gratis? ¿Ganan siempre?", "Todas las combinadas son gratis. Ningún tip ni combinada es una garantía: juega por diversión y con límite. 18+."]] },
  pt: { megaH: "Múltipla mega do dia", slug: "apostas-multiplas-hoje", title: "Apostas múltiplas hoje ({d}) · múltiplas de futebol prontas", h1: "Apostas múltiplas hoje", desc: "Apostas múltiplas de futebol prontas para hoje, feitas só com os tips do betizzi: x3–5, x8–12, x20–30 e a múltipla mega do dia (x30–50). Grátis. 18+.",
    ans: (d, n, lo, hi) => `Em ${d}, o betizzi tem ${n} apostas múltiplas de futebol prontas, com odd total de x${lo} a x${hi}. Cada seleção vem dos nossos próprios tips, e uma múltipla publicada nunca é alterada.`,
    none: "Ainda não há múltiplas hoje. São publicadas de manhã (hora da Grécia) e completadas ao longo do dia.",
    zone: "Odd", v: { wins: "Vitórias", goals: "Golos", mix: "Mista" }, st: { w: "Ganha", l: "Perdida", lv: "Em jogo", o: "Aberta" }, total: "Odd total", upd: "Atualizado",
    howH: "Como as fazemos", how: ["Só com os nossos tips: cada seleção é um tip Free ou VIP do betizzi, com base nos últimos 10 jogos de cada equipa e na odd das casas de apostas.", "Quatro faixas: x3–5, x8–12, x20–30 e a múltipla mega do dia (x30–50). Cada tip entra numa só múltipla (a mega pode repetir até metade).", "Nada é apagado: as múltiplas ganhas e perdidas ficam no nosso histórico."],
    big: "As múltiplas grandes ganham raramente. Aposta só o que podes perder.", last: (o, d) => `A nossa última múltipla ganha: x${o}, ${d}.`, app: "Abre-as na app →",
    faqH: "Perguntas", faq: [["O que é uma aposta múltipla?", "Uma só aposta com várias seleções. As odds multiplicam-se, mas todas as seleções têm de ganhar."],
      ["Como são feitas as múltiplas do betizzi?", "O nosso motor prepara-as todas as manhãs com os tips do dia, em quatro faixas de odd, e junta novas ao longo do dia quando saem novos tips."],
      ["Porque é que as múltiplas grandes ganham menos?", "Cada seleção a mais é mais uma forma de perder. Uma múltipla x30–50 vai perder muito mais vezes do que uma de x3–5."],
      ["São grátis? Ganham sempre?", "Todas as múltiplas são grátis. Nenhum tip ou múltipla é uma garantia: joga por diversão e com limite. 18+."]] },
  fr: { megaH: "Méga combiné du jour", slug: "combines-du-jour", title: "Combinés foot du jour ({d}) · tickets combinés prêts", h1: "Combinés foot du jour", desc: "Combinés foot prêts pour aujourd'hui, faits uniquement avec les tips de betizzi : x3–5, x8–12, x20–30 et le méga combiné du jour (x30–50). Gratuit. 18+.",
    ans: (d, n, lo, hi) => `Le ${d}, betizzi propose ${n} combinés foot prêts, avec une cote totale de x${lo} à x${hi}. Chaque sélection vient de nos propres tips, et un combiné publié n'est jamais modifié.`,
    none: "Pas encore de combinés aujourd'hui. Ils sont publiés le matin (heure grecque) et complétés pendant la journée.",
    zone: "Cote", v: { wins: "Victoires", goals: "Buts", mix: "Mixte" }, st: { w: "Gagné", l: "Perdu", lv: "En cours", o: "Ouvert" }, total: "Cote totale", upd: "Mis à jour",
    howH: "Comment on les construit", how: ["Uniquement avec nos tips : chaque sélection est un tip Free ou VIP de betizzi, basé sur les 10 derniers matchs de chaque équipe et la cote des bookmakers.", "Quatre tranches : x3–5, x8–12, x20–30 et le méga combiné du jour (x30–50). Chaque tip va dans un seul combiné (le méga peut en reprendre jusqu'à la moitié).", "Rien n'est effacé : les combinés gagnés et perdus restent dans notre historique."],
    big: "Les gros combinés gagnent rarement. Ne mise que ce que tu peux te permettre de perdre.", last: (o, d) => `Notre dernier combiné gagnant : x${o}, ${d}.`, app: "Les ouvrir dans l'app →",
    faqH: "Questions", faq: [["Qu'est-ce qu'un combiné ?", "Un seul pari avec plusieurs sélections. Les cotes se multiplient, mais toutes les sélections doivent gagner."],
      ["Comment sont faits les combinés de betizzi ?", "Notre moteur les prépare chaque matin avec les tips du jour, en quatre tranches de cote, et en ajoute pendant la journée quand de nouveaux tips sortent."],
      ["Pourquoi les gros combinés gagnent-ils moins souvent ?", "Chaque sélection en plus est une façon de plus de perdre. Un combiné x30–50 perdra bien plus souvent qu'un combiné x3–5."],
      ["C'est gratuit ? Ça gagne à tous les coups ?", "Tous les combinés sont gratuits. Aucun tip ni combiné n'est une garantie : joue pour le plaisir et fixe-toi une limite. 18+."]] },
  de: { megaH: "Mega-Kombi des Tages", slug: "kombiwetten-heute", title: "Kombiwetten heute ({d}) · fertige Fußball-Kombitipps", h1: "Kombiwetten heute", desc: "Fertige Fußball-Kombiwetten für heute, nur aus den Tipps von betizzi: x3–5, x8–12, x20–30 und die Mega-Kombi des Tages (x30–50). Kostenlos. 18+.",
    ans: (d, n, lo, hi) => `Am ${d} hat betizzi ${n} fertige Fußball-Kombiwetten mit Gesamtquoten von x${lo} bis x${hi}. Jede Auswahl stammt aus unseren eigenen Tipps, und ein veröffentlichter Schein wird nie geändert.`,
    none: "Heute noch keine Kombiwetten. Sie erscheinen morgens (griechische Zeit) und werden im Lauf des Tages ergänzt.",
    zone: "Quote", v: { wins: "Siege", goals: "Tore", mix: "Gemischt" }, st: { w: "Gewonnen", l: "Verloren", lv: "Läuft", o: "Offen" }, total: "Gesamtquote", upd: "Aktualisiert",
    howH: "So entstehen sie", how: ["Nur aus unseren Tipps: Jede Auswahl ist ein Free- oder VIP-Tipp von betizzi, basierend auf den letzten 10 Spielen jedes Teams und der Buchmacherquote.", "Vier Quotenbereiche: x3–5, x8–12, x20–30 und die Mega-Kombi des Tages (x30–50). Jeder Tipp kommt nur in einen Schein (die Mega-Kombi darf bis zur Hälfte wiederverwenden).", "Nichts wird gelöscht: gewonnene und verlorene Scheine bleiben in unserer Bilanz."],
    big: "Große Kombiwetten gewinnen selten. Setze nur, was du verlieren kannst.", last: (o, d) => `Unsere letzte gewonnene Kombiwette: x${o}, ${d}.`, app: "In der App öffnen →",
    faqH: "Fragen", faq: [["Was ist eine Kombiwette?", "Eine Wette mit mehreren Auswahlen. Die Quoten werden multipliziert, aber jede Auswahl muss gewinnen."],
      ["Wie entstehen die Kombiwetten von betizzi?", "Unsere Engine stellt sie jeden Morgen aus den Tipps des Tages zusammen, in vier Quotenbereichen, und ergänzt neue, wenn neue Tipps erscheinen."],
      ["Warum gewinnen große Kombiwetten seltener?", "Jede zusätzliche Auswahl ist eine weitere Möglichkeit zu verlieren. Ein x30–50-Schein verliert viel öfter als ein x3–5-Schein."],
      ["Ist das kostenlos? Gewinnen sie immer?", "Alle Kombiwetten sind kostenlos. Kein Tipp und kein Schein ist eine Garantie: Spiel zum Spaß und mit Limit. 18+."]] },
  ro: { megaH: "Biletul mare al zilei", slug: "biletul-zilei", title: "Biletul zilei ({d}) · bilete pariuri fotbal azi", h1: "Biletul zilei", desc: "Bilete de fotbal gata făcute pentru azi, doar din ponturile betizzi: cota 3–5, cota 10, cota 20–30 și biletul mare al zilei (cota 30–50). Gratuit. 18+.",
    ans: (d, n, lo, hi) => `Pe ${d}, betizzi are ${n} bilete de fotbal gata făcute, cu cotă totală între ${lo} și ${hi}. Fiecare selecție vine din ponturile noastre, iar un bilet publicat nu se schimbă niciodată.`,
    none: "Încă nu sunt bilete azi. Se publică dimineața (ora Greciei) și se completează în timpul zilei.",
    zone: "Bilet cota", v: { wins: "Victorii", goals: "Goluri", mix: "Mixt" }, st: { w: "Câștigat", l: "Pierdut", lv: "În desfășurare", o: "Deschis" }, total: "Cotă totală", upd: "Actualizat",
    howH: "Cum le facem", how: ["Doar din ponturile noastre: fiecare selecție este un pont Free sau VIP betizzi, din ultimele 10 meciuri ale fiecărei echipe și cota caselor de pariuri.", "Patru niveluri: cota 3–5, cota 8–12 (biletul de cota 10), cota 20–30 și biletul mare al zilei (cota 30–50). Fiecare pont intră pe un singur bilet (biletul mare poate relua până la jumătate).", "Nu se șterge nimic: biletele câștigate și pierdute rămân în istoricul nostru."],
    big: "Biletele mari câștigă rar. Pariază doar cât îți permiți să pierzi.", last: (o, d) => `Ultimul nostru bilet câștigător: cota ${o}, ${d}.`, app: "Deschide-le în aplicație →",
    faqH: "Întrebări", faq: [["Ce este un bilet combinat?", "Un singur pariu cu mai multe selecții. Cotele se înmulțesc, dar toate selecțiile trebuie să iasă."],
      ["Cum se fac biletele betizzi?", "Motorul nostru le alcătuiește în fiecare dimineață din ponturile zilei, pe patru niveluri de cotă, și adaugă altele noi în timpul zilei când apar ponturi noi."],
      ["De ce biletele mari câștigă mai rar?", "Fiecare selecție în plus este încă un mod de a pierde. Un bilet de cota 30–50 va pierde mult mai des decât unul de cota 3–5."],
      ["Sunt gratuite? Câștigă mereu?", "Toate biletele sunt gratuite. Niciun pont și niciun bilet nu este o garanție: joacă pentru distracție și cu o limită. 18+."]] },
  sr: { megaH: "Veliki tiket dana", slug: "tiket-dana", title: "Tiket dana ({d}) · gotovi fudbalski tiketi za danas", h1: "Tiket dana", desc: "Gotovi fudbalski tiketi za danas, samo od betizzi tipova: kvota 3–5, 8–12, 20–30 i veliki tiket dana (kvota 30–50). Besplatno. 18+.",
    ans: (d, n, lo, hi) => `Za ${d} betizzi ima ${n} gotovih fudbalskih tiketa, sa ukupnom kvotom od ${lo} do ${hi}. Svaki izbor je iz naših tipova, a objavljen tiket se nikad ne menja.`,
    none: "Danas još nema tiketa. Objavljuju se ujutru (grčko vreme) i dopunjuju tokom dana.",
    zone: "Kvota", v: { wins: "Pobede", goals: "Golovi", mix: "Mešoviti" }, st: { w: "Dobitan", l: "Izgubljen", lv: "U toku", o: "Otvoren" }, total: "Ukupna kvota", upd: "Ažurirano",
    howH: "Kako ih pravimo", how: ["Samo od naših tipova: svaki izbor je betizzi Free ili VIP tip, na osnovu poslednjih 10 utakmica svakog tima i kvote kladionica.", "Četiri nivoa: kvota 3–5, 8–12, 20–30 i veliki tiket dana (kvota 30–50). Svaki tip ide na samo jedan tiket (veliki tiket može ponoviti do polovine).", "Ništa se ne briše: dobitni i izgubljeni tiketi ostaju u našoj istoriji."],
    big: "Veliki tiketi retko prolaze. Igraj samo koliko možeš da izgubiš.", last: (o, d) => `Naš poslednji dobitni tiket: kvota ${o}, ${d}.`, app: "Otvori ih u aplikaciji →",
    faqH: "Pitanja", faq: [["Šta je tiket sa više parova?", "Jedna opklada sa više izbora. Kvote se množe, ali svi izbori moraju da prođu."],
      ["Kako nastaju betizzi tiketi?", "Naš sistem ih sastavlja svakog jutra od tipova tog dana, u četiri nivoa kvote, i dodaje nove tokom dana kada stignu novi tipovi."],
      ["Zašto veliki tiketi ređe prolaze?", "Svaki dodatni par je još jedan način da se izgubi. Tiket kvote 30–50 gubiće mnogo češće od tiketa 3–5."],
      ["Da li je besplatno? Da li uvek prolaze?", "Svi tiketi su besplatni. Nijedan tip ni tiket nije garancija: igraj iz zabave i sa limitom. 18+."]] },
  bg: { megaH: "Голям фиш на деня", slug: "fish-za-dnes", title: "Фиш за днес ({d}) · готови футболни фишове", h1: "Фиш за днес", desc: "Готови футболни фишове за днес, само от прогнозите на betizzi: коефициент 3–5, 8–12, 20–30 и голям фиш на деня (коефициент 30–50). Безплатно. 18+.",
    ans: (d, n, lo, hi) => `На ${d} betizzi има ${n} готови футболни фиша с общ коефициент от ${lo} до ${hi}. Всеки избор е от нашите прогнози, а публикуван фиш никога не се променя.`,
    none: "Днес още няма фишове. Публикуват се сутрин (гръцко време) и се допълват през деня.",
    zone: "Коефициент", v: { wins: "Победи", goals: "Голове", mix: "Смесен" }, st: { w: "Печеливш", l: "Загубен", lv: "В игра", o: "Отворен" }, total: "Общ коефициент", upd: "Обновено",
    howH: "Как ги правим", how: ["Само от нашите прогнози: всеки избор е Free или VIP прогноза на betizzi, от последните 10 мача на всеки отбор и коефициента на букмейкърите.", "Четири нива: коефициент 3–5, 8–12, 20–30 и голям фиш на деня (коефициент 30–50). Всяка прогноза влиза само в един фиш (големият може да повтори до половината).", "Нищо не се изтрива: печелившите и загубените фишове остават в нашата история."],
    big: "Големите фишове печелят рядко. Залагай само колкото можеш да загубиш.", last: (o, d) => `Последният ни печеливш фиш: коефициент ${o}, ${d}.`, app: "Отвори ги в приложението →",
    faqH: "Въпроси", faq: [["Какво е комбиниран фиш?", "Един залог с няколко избора. Коефициентите се умножават, но всички избори трябва да познаят."],
      ["Как се правят фишовете на betizzi?", "Нашата система ги подготвя всяка сутрин от прогнозите за деня, в четири нива на коефициент, и добавя нови през деня, когато излязат нови прогнози."],
      ["Защо големите фишове печелят по-рядко?", "Всеки допълнителен избор е още един начин да загубиш. Фиш с коефициент 30–50 ще губи много по-често от фиш 3–5."],
      ["Безплатно ли е? Винаги ли печелят?", "Всички фишове са безплатни. Никоя прогноза и никой фиш не са гаранция: играй за забавление и с лимит. 18+."]] },
};

// «Σερί ομάδων» (απόφαση Owner 06/11/2026): σελίδα «για ψαγμένους», link μόνο στο footer και στη λίστα αγώνων (όχι στο μενού).
// Πίνακες στους 10 τελευταίους αγώνες (ελάχιστο 10), Φόρμα στους 5. Μόνο ομάδες των λιγκών μας που παίζουν σήμερα ή αύριο.
// Όροι στοιχήματος (Over/Under, GG) μένουν όπως τους λέει ο κόσμος.
export const STK = {
  en: { slug: "izzistats", look: "👀 Worth a look: the price is high for this run", oldSlug: "team-streaks", link: "🔍 Izzistats · Team streaks", title: "Izzistats · Football team streaks, next 3 days: wins, Over 2.5, Under, GG", h1: "Izzistats",
    desc: "Teams playing in the next 3 days with the strongest runs in their last 10 games: wins, Over 2.5, Under 2.5, both teams to score (GG) and form. Free. 18+.",
    ans: (d, n) => `On ${d}, ${n} teams in our leagues play in the next 3 days. These are the ones with the strongest runs in their last 10 games.`,
    cats: { form: "🔥 In form", home: "🏠 Strong at home", away: "✈️ Win away", goals: "⚽ Lots of goals", gg: "🤝 GG streak", over: "📈 Over 2.5", under: "🧱 Under 2.5" , draws: "⚖️ Draws", bad: "📉 Out of form" },
    sub: { form: "Most wins in the last 10 games", home: "Wins in the last 5 home games, and they play at home next", away: "Wins in the last 5 away games, and they play away next", goals: "Average goals per game (both teams), last 10", gg: "Games in a row where both teams scored", over: "Over 2.5 goals in the last 10", under: "Under 2.5 goals in the last 10" , draws: "Draws in the last 10 games", bad: "Defeats in the last 10 (price: their opponent to win)" },
    u: {"w": "wins", "h": "home wins", "a": "away wins", "g": "goals/game", "gg": "in a row", "d": "draws", "l": "defeats"}, catH: "Categories", nx: "Next", soon: "🚩 Corners: coming soon.",
    col: { team: "Team", c: "Last 10", cf: "Points", next: "Next match", odd: "Odds" }, run: "in a row", none: "No team qualifies right now.",
    note: "Each team's last 10 games in all competitions; a team needs at least 10 to appear. Only teams playing in the next 3 days in the leagues we cover. Odds: best price we have.",
    app: "Open the app →", upd: "Updated" },
  el: { slug: "izzistats", look: "👀 Για ψάξιμο: η τιμή είναι ψηλή για τέτοιο σερί", oldSlug: "seri-omadon", link: "🔍 Izzistats · Σερί ομάδων", title: "Izzistats · Σερί ομάδων, επόμενες 3 μέρες: νίκες, Over 2.5, Under, GG", h1: "Izzistats",
    desc: "Ομάδες που παίζουν τις επόμενες 3 μέρες με τα πιο δυνατά σερί στους 10 τελευταίους αγώνες: νίκες, Over 2.5, Under 2.5, GG και φόρμα. Δωρεάν. 21+.",
    ans: (d, n) => `Στις ${d} παίζουν τις επόμενες 3 μέρες ${n} ομάδες από τις λίγκες μας. Εδώ είναι όσες έχουν τα πιο δυνατά σερί στους 10 τελευταίους αγώνες τους.`,
    cats: { form: "🔥 Σε φόρμα", home: "🏠 Δυνατοί εντός", away: "✈️ Νικούν εκτός", goals: "⚽ Πολλά γκολ", gg: "🤝 Σερί GG", over: "📈 Over 2.5", under: "🧱 Under 2.5" , draws: "⚖️ Ισοπαλίες", bad: "📉 Σε κακή φόρμα" },
    sub: { form: "Οι περισσότερες νίκες στους 10 τελευταίους", home: "Νίκες στους 5 τελευταίους εντός, και παίζουν εντός", away: "Νίκες στους 5 τελευταίους εκτός, και παίζουν εκτός", goals: "Μέσος όρος γκολ ανά αγώνα (και οι δύο ομάδες), στους 10", gg: "Αγώνες στη σειρά που σκόραραν και οι δύο", over: "Over 2.5 στους 10 τελευταίους", under: "Under 2.5 στους 10 τελευταίους" , draws: "Ισοπαλίες στους 10 τελευταίους", bad: "Ήττες στους 10 τελευταίους (τιμή: νίκη του αντιπάλου)" },
    u: {"w": "νίκες", "h": "νίκες εντός", "a": "νίκες εκτός", "g": "γκολ/αγώνα", "gg": "στη σειρά", "d": "ισοπαλίες", "l": "ήττες"}, catH: "Κατηγορίες", nx: "Επόμενος", soon: "🚩 Κόρνερ: έρχονται σύντομα.",
    col: { team: "Ομάδα", c: "Στους 10", cf: "Βαθμοί", next: "Επόμενος αγώνας", odd: "Απόδοση" }, run: "στη σειρά", none: "Καμία ομάδα δεν πληροί τα κριτήρια αυτή τη στιγμή.",
    note: "Οι 10 τελευταίοι αγώνες κάθε ομάδας σε όλες τις διοργανώσεις· χρειάζονται τουλάχιστον 10 για να μπει. Μόνο ομάδες που παίζουν τις επόμενες 3 μέρες στις λίγκες που καλύπτουμε. Απόδοση: η καλύτερη που έχουμε.",
    app: "Άνοιξε την εφαρμογή →", upd: "Ενημέρωση" },
  es: { slug: "izzistats", look: "👀 Para mirar: la cuota es alta para esta racha", oldSlug: "rachas-equipos", link: "🔍 Izzistats · Rachas de equipos", title: "Izzistats · Rachas de equipos hoy: victorias, Over 2.5, Under, ambos marcan", h1: "Izzistats",
    desc: "Equipos que juegan en los próximos 3 días con las mejores rachas en sus últimos 10 partidos: victorias, Over 2.5, Under 2.5, ambos marcan (GG) y forma. Gratis. 18+.",
    ans: (d, n) => `El ${d} juegan en los próximos 3 días ${n} equipos de nuestras ligas. Aquí están los que tienen las mejores rachas en sus últimos 10 partidos.`,
    cats: { form: "🔥 En forma", home: "🏠 Fuertes en casa", away: "✈️ Ganan fuera", goals: "⚽ Muchos goles", gg: "🤝 Racha ambos marcan", over: "📈 Over 2.5", under: "🧱 Under 2.5" , draws: "⚖️ Empates", bad: "📉 Mala racha" },
    sub: { form: "Más victorias en los últimos 10 partidos", home: "Victorias en los últimos 5 en casa, y juegan en casa", away: "Victorias en los últimos 5 fuera, y juegan fuera", goals: "Media de goles por partido (ambos equipos), últimos 10", gg: "Partidos seguidos en los que marcaron ambos", over: "Over 2.5 en los últimos 10", under: "Under 2.5 en los últimos 10" , draws: "Empates en los últimos 10", bad: "Derrotas en los últimos 10 (cuota: gana el rival)" },
    u: {"w": "victorias", "h": "victorias en casa", "a": "victorias fuera", "g": "goles/partido", "gg": "seguidos", "d": "empates", "l": "derrotas"}, catH: "Categorías", nx: "Próximo", soon: "🚩 Córners: muy pronto.",
    col: { team: "Equipo", c: "Últimos 10", cf: "Puntos", next: "Próximo partido", odd: "Cuota" }, run: "seguidos", none: "Ningún equipo cumple los criterios ahora.",
    note: "Últimos 10 partidos de cada equipo en todas las competiciones; hacen falta al menos 10 para aparecer. Solo equipos que juegan en los próximos 3 días en las ligas que cubrimos. Cuota: la mejor que tenemos.",
    app: "Abrir la app →", upd: "Actualizado" },
  pt: { slug: "izzistats", look: "👀 Vale a pena ver: a odd é alta para esta sequência", oldSlug: "sequencias-equipas", link: "🔍 Izzistats · Sequências das equipas", title: "Izzistats · Sequências das equipas hoje: vitórias, Over 2.5, Under, ambas marcam", h1: "Izzistats",
    desc: "Equipas que jogam nos próximos 3 dias com as melhores sequências nos últimos 10 jogos: vitórias, Over 2.5, Under 2.5, ambas marcam (GG) e forma. Grátis. 18+.",
    ans: (d, n) => `A ${d} jogam nos próximos 3 dias ${n} equipas das nossas ligas. Aqui estão as que têm as melhores sequências nos últimos 10 jogos.`,
    cats: { form: "🔥 Em forma", home: "🏠 Fortes em casa", away: "✈️ Ganham fora", goals: "⚽ Muitos golos", gg: "🤝 Série ambas marcam", over: "📈 Over 2.5", under: "🧱 Under 2.5" , draws: "⚖️ Empates", bad: "📉 Má forma" },
    sub: { form: "Mais vitórias nos últimos 10 jogos", home: "Vitórias nos últimos 5 em casa, e jogam em casa", away: "Vitórias nos últimos 5 fora, e jogam fora", goals: "Média de golos por jogo (ambas as equipas), últimos 10", gg: "Jogos seguidos em que ambas marcaram", over: "Over 2.5 nos últimos 10", under: "Under 2.5 nos últimos 10" , draws: "Empates nos últimos 10", bad: "Derrotas nos últimos 10 (odd: vitória do adversário)" },
    u: {"w": "vitórias", "h": "vitórias em casa", "a": "vitórias fora", "g": "golos/jogo", "gg": "seguidos", "d": "empates", "l": "derrotas"}, catH: "Categorias", nx: "Próximo", soon: "🚩 Cantos: em breve.",
    col: { team: "Equipa", c: "Últimos 10", cf: "Pontos", next: "Próximo jogo", odd: "Odd" }, run: "seguidos", none: "Nenhuma equipa cumpre os critérios agora.",
    note: "Últimos 10 jogos de cada equipa em todas as competições; são precisos pelo menos 10 para aparecer. Só equipas que jogam nos próximos 3 dias nas ligas que cobrimos. Odd: a melhor que temos.",
    app: "Abrir a app →", upd: "Atualizado" },
  fr: { slug: "izzistats", look: "👀 À creuser : la cote est élevée pour cette série", oldSlug: "series-equipes", link: "🔍 Izzistats · Séries des équipes", title: "Izzistats · Séries des équipes aujourd'hui : victoires, Over 2.5, Under, les deux marquent", h1: "Izzistats",
    desc: "Les équipes qui jouent dans les 3 prochains jours avec les meilleures séries sur leurs 10 derniers matchs : victoires, Over 2.5, Under 2.5, les deux équipes marquent et forme. Gratuit. 18+.",
    ans: (d, n) => `Le ${d}, ${n} équipes de nos championnats jouent dans les 3 prochains jours. Voici celles qui ont les meilleures séries sur leurs 10 derniers matchs.`,
    cats: { form: "🔥 En forme", home: "🏠 Forts à domicile", away: "✈️ Gagnent à l'extérieur", goals: "⚽ Beaucoup de buts", gg: "🤝 Série les deux marquent", over: "📈 Over 2.5", under: "🧱 Under 2.5" , draws: "⚖️ Nuls", bad: "📉 En méforme" },
    sub: { form: "Le plus de victoires sur les 10 derniers matchs", home: "Victoires sur les 5 derniers à domicile, et ils jouent à domicile", away: "Victoires sur les 5 derniers à l'extérieur, et ils jouent à l'extérieur", goals: "Moyenne de buts par match (les deux équipes), 10 derniers", gg: "Matchs d'affilée où les deux équipes ont marqué", over: "Over 2.5 sur les 10 derniers", under: "Under 2.5 sur les 10 derniers" , draws: "Matchs nuls sur les 10 derniers", bad: "Défaites sur les 10 derniers (cote : victoire de l'adversaire)" },
    u: {"w": "victoires", "h": "victoires à domicile", "a": "victoires à l'extérieur", "g": "buts/match", "gg": "d'affilée", "d": "nuls", "l": "défaites"}, catH: "Catégories", nx: "Prochain", soon: "🚩 Corners : bientôt.",
    col: { team: "Équipe", c: "Sur 10", cf: "Points", next: "Prochain match", odd: "Cote" }, run: "d'affilée", none: "Aucune équipe ne remplit les critères pour l'instant.",
    note: "Les 10 derniers matchs de chaque équipe, toutes compétitions ; il en faut au moins 10 pour apparaître. Seulement les équipes qui jouent dans les 3 prochains jours dans nos championnats. Cote : la meilleure que nous avons.",
    app: "Ouvrir l'appli →", upd: "Mis à jour" },
  de: { slug: "izzistats", look: "👀 Genauer hinsehen: die Quote ist hoch für diese Serie", oldSlug: "serien-teams", link: "🔍 Izzistats · Serien der Teams", title: "Izzistats · Serien der Teams heute: Siege, Over 2.5, Under, beide treffen", h1: "Izzistats",
    desc: "Teams, die in den nächsten 3 Tagen spielen, mit den stärksten Serien in den letzten 10 Spielen: Siege, Over 2.5, Under 2.5, beide treffen und Form. Kostenlos. 18+.",
    ans: (d, n) => `Am ${d} spielen in den nächsten 3 Tagen ${n} Teams aus unseren Ligen. Hier sind die mit den stärksten Serien in ihren letzten 10 Spielen.`,
    cats: { form: "🔥 In Form", home: "🏠 Heimstark", away: "✈️ Siegen auswärts", goals: "⚽ Viele Tore", gg: "🤝 Serie beide treffen", over: "📈 Over 2.5", under: "🧱 Under 2.5" , draws: "⚖️ Unentschieden", bad: "📉 Formtief" },
    sub: { form: "Die meisten Siege in den letzten 10 Spielen", home: "Siege in den letzten 5 Heimspielen, und sie spielen zu Hause", away: "Siege in den letzten 5 Auswärtsspielen, und sie spielen auswärts", goals: "Tore pro Spiel im Schnitt (beide Teams), letzte 10", gg: "Spiele in Folge, in denen beide trafen", over: "Over 2.5 in den letzten 10", under: "Under 2.5 in den letzten 10" , draws: "Unentschieden in den letzten 10", bad: "Niederlagen in den letzten 10 (Quote: Sieg des Gegners)" },
    u: {"w": "Siege", "h": "Heimsiege", "a": "Auswärtssiege", "g": "Tore/Spiel", "gg": "in Folge", "d": "Remis", "l": "Niederlagen"}, catH: "Kategorien", nx: "Nächstes", soon: "🚩 Ecken: bald.",
    col: { team: "Team", c: "Letzte 10", cf: "Punkte", next: "Nächstes Spiel", odd: "Quote" }, run: "in Folge", none: "Im Moment erfüllt kein Team die Kriterien.",
    note: "Die letzten 10 Spiele jedes Teams in allen Wettbewerben; mindestens 10 sind nötig. Nur Teams, die in den nächsten 3 Tagen in unseren Ligen spielen. Quote: die beste, die wir haben.",
    app: "App öffnen →", upd: "Aktualisiert" },
  ro: { slug: "izzistats", look: "👀 De analizat: cota e mare pentru o astfel de serie", oldSlug: "serii-echipe", link: "🔍 Izzistats · Seriile echipelor", title: "Izzistats · Seriile echipelor azi: victorii, Over 2.5, Under, ambele marchează", h1: "Izzistats",
    desc: "Echipele care joacă în următoarele 3 zile cu cele mai bune serii în ultimele 10 meciuri: victorii, Over 2.5, Under 2.5, ambele marchează (GG) și formă. Gratuit. 18+.",
    ans: (d, n) => `Pe ${d}, ${n} echipe din ligile noastre joacă în următoarele 3 zile. Iată cele cu cele mai bune serii în ultimele 10 meciuri.`,
    cats: { form: "🔥 În formă", home: "🏠 Puternice acasă", away: "✈️ Câștigă în deplasare", goals: "⚽ Multe goluri", gg: "🤝 Serie GG", over: "📈 Over 2.5", under: "🧱 Under 2.5" , draws: "⚖️ Egaluri", bad: "📉 Formă slabă" },
    sub: { form: "Cele mai multe victorii în ultimele 10 meciuri", home: "Victorii în ultimele 5 acasă, și joacă acasă", away: "Victorii în ultimele 5 în deplasare, și joacă în deplasare", goals: "Media golurilor pe meci (ambele echipe), ultimele 10", gg: "Meciuri la rând în care au marcat ambele", over: "Over 2.5 în ultimele 10", under: "Under 2.5 în ultimele 10" , draws: "Egaluri în ultimele 10", bad: "Înfrângeri în ultimele 10 (cotă: victoria adversarului)" },
    u: {"w": "victorii", "h": "victorii acasă", "a": "victorii în deplasare", "g": "goluri/meci", "gg": "la rând", "d": "egaluri", "l": "înfrângeri"}, catH: "Categorii", nx: "Următorul", soon: "🚩 Cornere: în curând.",
    col: { team: "Echipă", c: "Din 10", cf: "Puncte", next: "Următorul meci", odd: "Cotă" }, run: "la rând", none: "Nicio echipă nu îndeplinește criteriile acum.",
    note: "Ultimele 10 meciuri ale fiecărei echipe, în toate competițiile; sunt necesare cel puțin 10. Doar echipele care joacă în următoarele 3 zile în ligile pe care le acoperim. Cotă: cea mai bună pe care o avem.",
    app: "Deschide aplicația →", upd: "Actualizat" },
  sr: { slug: "izzistats", look: "👀 Vredi pogledati: kvota je visoka za ovakvu seriju", oldSlug: "serije-timova", link: "🔍 Izzistats · Serije timova", title: "Izzistats · Serije timova danas: pobede, Over 2.5, Under, oba tima daju gol", h1: "Izzistats",
    desc: "Timovi koji igraju u naredna 3 dana sa najjačim serijama u poslednjih 10 utakmica: pobede, Over 2.5, Under 2.5, GG i forma. Besplatno. 18+.",
    ans: (d, n) => `Dana ${d} u naredna 3 dana igra ${n} timova iz naših liga. Ovde su oni sa najjačim serijama u poslednjih 10 utakmica.`,
    cats: { form: "🔥 U formi", home: "🏠 Jaki kod kuće", away: "✈️ Pobeđuju u gostima", goals: "⚽ Mnogo golova", gg: "🤝 Serija GG", over: "📈 Over 2.5", under: "🧱 Under 2.5" , draws: "⚖️ Nerešeno", bad: "📉 Loša forma" },
    sub: { form: "Najviše pobeda u poslednjih 10 utakmica", home: "Pobede u poslednjih 5 kod kuće, i igraju kod kuće", away: "Pobede u poslednjih 5 u gostima, i igraju u gostima", goals: "Prosek golova po utakmici (oba tima), poslednjih 10", gg: "Utakmice zaredom u kojima su oba tima dala gol", over: "Over 2.5 u poslednjih 10", under: "Under 2.5 u poslednjih 10" , draws: "Nerešeni u poslednjih 10", bad: "Porazi u poslednjih 10 (kvota: pobeda protivnika)" },
    u: {"w": "pobeda", "h": "pobeda kod kuće", "a": "pobeda u gostima", "g": "golova/utakmici", "gg": "zaredom", "d": "nerešenih", "l": "poraza"}, catH: "Kategorije", nx: "Sledeća", soon: "🚩 Korneri: uskoro.",
    col: { team: "Tim", c: "Od 10", cf: "Bodovi", next: "Sledeća utakmica", odd: "Kvota" }, run: "zaredom", none: "Nijedan tim trenutno ne ispunjava kriterijume.",
    note: "Poslednjih 10 utakmica svakog tima u svim takmičenjima; potrebno je najmanje 10. Samo timovi koji igraju u naredna 3 dana u ligama koje pratimo. Kvota: najbolja koju imamo.",
    app: "Otvori aplikaciju →", upd: "Ažurirano" },
  bg: { slug: "izzistats", look: "👀 Заслужава внимание: коефициентът е висок за такава серия", oldSlug: "serii-otbori", link: "🔍 Izzistats · Серии на отборите", title: "Izzistats · Серии на отборите днес: победи, Over 2.5, Under, двата отбора бележат", h1: "Izzistats",
    desc: "Отбори, които играят в следващите 3 дни, с най-силните серии в последните 10 мача: победи, Over 2.5, Under 2.5, GG и форма. Безплатно. 18+.",
    ans: (d, n) => `На ${d} в следващите 3 дни играят ${n} отбора от нашите лиги. Тук са тези с най-силните серии в последните им 10 мача.`,
    cats: { form: "🔥 Във форма", home: "🏠 Силни у дома", away: "✈️ Печелят като гост", goals: "⚽ Много голове", gg: "🤝 Серия GG", over: "📈 Over 2.5", under: "🧱 Under 2.5" , draws: "⚖️ Равенства", bad: "📉 Лоша форма" },
    sub: { form: "Най-много победи в последните 10 мача", home: "Победи в последните 5 домакинства, и играят у дома", away: "Победи в последните 5 гостувания, и играят като гост", goals: "Среден брой голове на мач (двата отбора), последните 10", gg: "Поредни мачове, в които и двата отбора вкараха", over: "Over 2.5 в последните 10", under: "Under 2.5 в последните 10" , draws: "Равенства в последните 10", bad: "Загуби в последните 10 (коефициент: победа на съперника)" },
    u: {"w": "победи", "h": "победи у дома", "a": "победи като гост", "g": "гола/мач", "gg": "поредни", "d": "равенства", "l": "загуби"}, catH: "Категории", nx: "Следващ", soon: "🚩 Корнери: скоро.",
    col: { team: "Отбор", c: "От 10", cf: "Точки", next: "Следващ мач", odd: "Коефициент" }, run: "поредни", none: "В момента нито един отбор не отговаря на критериите.",
    note: "Последните 10 мача на всеки отбор във всички турнири; нужни са поне 10. Само отбори, които играят в следващите 3 дни в лигите, които следим. Коефициент: най-добрият, който имаме.",
    app: "Отвори приложението →", upd: "Обновено" },
};
