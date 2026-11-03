// Κείμενα στατικών σελίδων (Ποιοι είμαστε, Επικοινωνία, Υπεύθυνο παιχνίδι, Δήλωση affiliate, Όροι, Απόρρητο, Cookies).
// Συμπλήρωμα του i18n.js: όλα τα κείμενα σελίδων ζουν ΜΟΝΟ εδώ. Όλα «προς έλεγχο» από ντόπιους.
// Μορφή σώματος: "## τίτλος", "- λίστα", κενή γραμμή = νέα παράγραφος, **έντονα**, [κείμενο](link).
// ΠΡΟΣΟΧΗ: μην γράφεις «18+» μέσα σε πρόταση· σε σελίδες 21+ αλλάζει αυτόματα σε «21+».
// Όροι/Απόρρητο/Cookies: προς το παρόν EN + EL. Οι άλλες γλώσσες δείχνουν στα αγγλικά.

export const OP = { name: "Christos Menelaou", city: "Paphos, Cyprus", hello: "hello@betizzi.com", partners: "marketing@betizzi.com", privacy: "privacy@betizzi.com", updated: "2026-11-01" };

export const PG_ORDER = ["about", "contact", "responsible", "affiliate", "terms", "privacy", "cookies"];
export const PG_FULL = ["terms", "privacy", "cookies"]; // μόνο EN + EL

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
betizzi is operated by the sole proprietorship of ${OP.name}, ${OP.city}. Contact: [${OP.hello}](mailto:${OP.hello}).

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
Το betizzi λειτουργεί από την ατομική επιχείρηση ${OP.name}, Πάφος, Κύπρος. Επικοινωνία: [${OP.hello}](mailto:${OP.hello}).

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
betizzi lo gestiona ${OP.name} como empresario individual, en Pafos (Chipre). Contacto: [${OP.hello}](mailto:${OP.hello}).

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
O betizzi é operado pela empresa individual de ${OP.name}, Pafos, Chipre. Contato: [${OP.hello}](mailto:${OP.hello}).

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
betizzi est exploité par l'entreprise individuelle de ${OP.name}, Paphos, Chypre. Contact : [${OP.hello}](mailto:${OP.hello}).

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
betizzi wird vom Einzelunternehmen ${OP.name}, Paphos, Zypern, betrieben. Kontakt: [${OP.hello}](mailto:${OP.hello}).

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
betizzi este operat de întreprinderea individuală ${OP.name}, Paphos, Cipru. Contact: [${OP.hello}](mailto:${OP.hello}).

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
betizzi vodi preduzetnik ${OP.name}, Pafos, Kipar. Kontakt: [${OP.hello}](mailto:${OP.hello}).

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
betizzi се управлява от едноличния търговец ${OP.name}, Пафос, Кипър. Контакт: [${OP.hello}](mailto:${OP.hello}).

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
Sole proprietorship of ${OP.name}, ${OP.city}.

We are not a bookmaker: we cannot help with bets, accounts or payments at a bookmaker. Please contact the bookmaker directly.`,
      el: `## Ερωτήσεις και σχόλια
[${OP.hello}](mailto:${OP.hello}) — συνήθως απαντάμε μέσα σε 2 εργάσιμες.

## Συνεργασίες, χορηγοί και affiliates
[${OP.partners}](mailto:${OP.partners})

## Προσωπικά δεδομένα
[${OP.privacy}](mailto:${OP.privacy})

## Ποιος λειτουργεί το site
Ατομική επιχείρηση ${OP.name}, Πάφος, Κύπρος.

Δεν είμαστε bookmaker: δεν μπορούμε να βοηθήσουμε με στοιχήματα, λογαριασμούς ή πληρωμές σε bookmaker. Επικοινώνησε απευθείας μαζί του.`,
      es: `## Preguntas y comentarios
[${OP.hello}](mailto:${OP.hello}) — solemos responder en 2 días laborables.

## Colaboraciones, patrocinadores y afiliados
[${OP.partners}](mailto:${OP.partners})

## Datos personales
[${OP.privacy}](mailto:${OP.privacy})

## Titular
${OP.name}, empresario individual, Pafos (Chipre).

No somos una casa de apuestas: no podemos ayudar con apuestas, cuentas o pagos en una casa de apuestas. Contacta directamente con ella.`,
      pt: `## Dúvidas e sugestões
[${OP.hello}](mailto:${OP.hello}) — costumamos responder em até 2 dias úteis.

## Parcerias, patrocinadores e afiliados
[${OP.partners}](mailto:${OP.partners})

## Dados pessoais
[${OP.privacy}](mailto:${OP.privacy})

## Responsável
Empresa individual de ${OP.name}, Pafos, Chipre.

Não somos casa de apostas: não podemos ajudar com apostas, contas ou pagamentos numa casa de apostas. Fale diretamente com ela.`,
      fr: `## Questions et remarques
[${OP.hello}](mailto:${OP.hello}) — on répond en général sous 2 jours ouvrés.

## Partenariats, sponsors et affiliés
[${OP.partners}](mailto:${OP.partners})

## Données personnelles
[${OP.privacy}](mailto:${OP.privacy})

## Éditeur
Entreprise individuelle de ${OP.name}, Paphos, Chypre.

Nous ne sommes pas un bookmaker : nous ne pouvons pas t'aider pour des paris, comptes ou paiements chez un bookmaker. Contacte-le directement.`,
      de: `## Fragen und Feedback
[${OP.hello}](mailto:${OP.hello}) – wir antworten meist innerhalb von 2 Werktagen.

## Partnerschaften, Sponsoren und Affiliates
[${OP.partners}](mailto:${OP.partners})

## Personenbezogene Daten
[${OP.privacy}](mailto:${OP.privacy})

## Betreiber
Einzelunternehmen ${OP.name}, Paphos, Zypern.

Wir sind kein Buchmacher: Bei Wetten, Konten oder Zahlungen bei einem Buchmacher können wir nicht helfen. Bitte wende dich direkt an ihn.`,
      ro: `## Întrebări și sugestii
[${OP.hello}](mailto:${OP.hello}) — de obicei răspundem în 2 zile lucrătoare.

## Parteneriate, sponsori și afiliați
[${OP.partners}](mailto:${OP.partners})

## Date personale
[${OP.privacy}](mailto:${OP.privacy})

## Operator
Întreprinderea individuală ${OP.name}, Paphos, Cipru.

Nu suntem casă de pariuri: nu putem ajuta cu pariuri, conturi sau plăți la o casă de pariuri. Contactează-o direct.`,
      sr: `## Pitanja i komentari
[${OP.hello}](mailto:${OP.hello}) — obično odgovaramo u roku od 2 radna dana.

## Saradnja, sponzori i partneri
[${OP.partners}](mailto:${OP.partners})

## Lični podaci
[${OP.privacy}](mailto:${OP.privacy})

## Operater
Preduzetnik ${OP.name}, Pafos, Kipar.

Nismo kladionica: ne možemo da pomognemo oko opklada, naloga ili uplata u kladionici. Obrati se direktno njoj.`,
      bg: `## Въпроси и мнения
[${OP.hello}](mailto:${OP.hello}) — обикновено отговаряме до 2 работни дни.

## Партньорства, спонсори и афилиейти
[${OP.partners}](mailto:${OP.partners})

## Лични данни
[${OP.privacy}](mailto:${OP.privacy})

## Оператор
Едноличен търговец ${OP.name}, Пафос, Кипър.

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
      en: `Effective date: 1 November 2026.

## Who is responsible
The data controller is the sole proprietorship of ${OP.name}, ${OP.city}, which operates betizzi.com. Privacy requests: [${OP.privacy}](mailto:${OP.privacy}).

## What we use today
- **Technical request data** (IP address, browser, time of request, country from our hosting provider). Purpose: deliver the site, show the right age notice for your country, protect against abuse and fix errors. Legal basis: legitimate interests. Kept in short-term logs by our hosting provider (Cloudflare), usually a few days.
- **Your choices in the site** (your slip, stake, bookmaker, filters, open tab, VIP view). Stored only in your own browser (local storage); they are never sent to us.
- **Emails you send us.** Purpose: reply to you. Legal basis: legitimate interests. Kept for as long as needed to handle your message.

We do not use advertising cookies, we do not sell personal data, and we do not use analytics at the moment.

## Coming soon: accounts
When we open free sign-up (for VIP tips, credits and Telegram alerts), we will update this policy before collecting any email address, and explain what we keep, why and for how long. Newsletters will only be sent if you tick a separate box.

## Who processes data for us
Cloudflare, Inc. (hosting, security). Data may be processed outside the EU under the European Commission's standard contractual clauses or an adequacy decision.

## Your rights
You can ask for access, correction, deletion, restriction or portability of your data, or object to processing, by writing to [${OP.privacy}](mailto:${OP.privacy}). We reply within one month. You can also complain to the Cyprus Commissioner for Personal Data Protection ([dataprotection.gov.cy](https://www.dataprotection.gov.cy)) or the authority where you live.

## Age
betizzi is not for anyone under 18 (21 in Greece). We do not knowingly process data of minors.`,
      el: `Ισχύει από: 1 Νοεμβρίου 2026.

## Ποιος είναι υπεύθυνος
Υπεύθυνος επεξεργασίας είναι η ατομική επιχείρηση ${OP.name}, Πάφος, Κύπρος, που λειτουργεί το betizzi.com. Αιτήματα για προσωπικά δεδομένα: [${OP.privacy}](mailto:${OP.privacy}).

## Τι χρησιμοποιούμε σήμερα
- **Τεχνικά δεδομένα αιτήματος** (διεύθυνση IP, browser, ώρα, χώρα από τον πάροχο φιλοξενίας). Σκοπός: να λειτουργεί το site, να δείχνουμε το σωστό όριο ηλικίας για τη χώρα σου, προστασία από κατάχρηση και διόρθωση λαθών. Νομική βάση: έννομο συμφέρον. Μένουν σε προσωρινά αρχεία του παρόχου φιλοξενίας (Cloudflare), συνήθως λίγες μέρες.
- **Οι επιλογές σου στο site** (δελτίο, ποντάρισμα, bookmaker, φίλτρα, καρτέλα, προβολή VIP). Αποθηκεύονται μόνο στον δικό σου browser (local storage) και δεν μας στέλνονται ποτέ.
- **Τα email που μας στέλνεις.** Σκοπός: να σου απαντήσουμε. Νομική βάση: έννομο συμφέρον. Τα κρατάμε όσο χρειάζεται για το αίτημά σου.

Δεν χρησιμοποιούμε cookies διαφήμισης, δεν πουλάμε προσωπικά δεδομένα και προς το παρόν δεν χρησιμοποιούμε εργαλεία στατιστικών (analytics).

## Σύντομα: λογαριασμοί
Όταν ανοίξει η δωρεάν εγγραφή (για VIP tips, credits και ειδοποιήσεις στο Telegram), θα ενημερώσουμε αυτή την πολιτική πριν συλλέξουμε οποιοδήποτε email, και θα εξηγήσουμε τι κρατάμε, γιατί και για πόσο. Newsletter θα στέλνουμε μόνο αν τσεκάρεις ξεχωριστό κουτάκι.

## Ποιος επεξεργάζεται δεδομένα για εμάς
Cloudflare, Inc. (φιλοξενία, ασφάλεια). Τα δεδομένα μπορεί να επεξεργάζονται εκτός ΕΕ με τις τυποποιημένες συμβατικές ρήτρες της Ευρωπαϊκής Επιτροπής ή απόφαση επάρκειας.

## Τα δικαιώματά σου
Μπορείς να ζητήσεις πρόσβαση, διόρθωση, διαγραφή, περιορισμό, φορητότητα ή να αντιταχθείς στην επεξεργασία, γράφοντας στο [${OP.privacy}](mailto:${OP.privacy}). Απαντάμε μέσα σε έναν μήνα. Μπορείς επίσης να υποβάλεις παράπονο στον Επίτροπο Προστασίας Δεδομένων Προσωπικού Χαρακτήρα της Κύπρου ([dataprotection.gov.cy](https://www.dataprotection.gov.cy)) ή στην αρχή της χώρας σου (στην Ελλάδα: [ΑΠΔΠΧ](https://www.dpa.gr)).

## Ηλικία
Το betizzi δεν απευθύνεται σε άτομα κάτω των 18 (στην Ελλάδα κάτω των 21). Δεν επεξεργαζόμαστε εν γνώσει μας δεδομένα ανηλίκων.`,
    },
  },

  cookies: {
    slug: { en: "cookies", el: "cookies" },
    title: { en: "Cookie policy", el: "Πολιτική cookies" },
    desc: { en: "What betizzi stores in your browser.", el: "Τι αποθηκεύει το betizzi στον browser σου." },
    body: {
      en: `Effective date: 1 November 2026.

betizzi does not set advertising or analytics cookies. We only use your browser's own storage to remember choices you make, so the site works the way you left it. This data stays on your device and is never sent to us.

## What we store
- **ko-slip, ko-stake, ko-smode** — your slip, stake and slip mode.
- **ko-book** — the bookmaker you chose for prices.
- **ko-lfil, ko-tab, ko-vip** — your league filter, open tab and VIP view.
- **ko-builder, ko-bmode, ko-coupons** — builder settings and coupons you saved.
- **ko-y** (only for one visit) — your scroll position.

These are needed for features you use, so no consent banner is required. You can delete them at any time in your browser settings; the site will simply forget your choices.

If we later add analytics or sign-in cookies, we will update this page and ask for your consent where the law requires it.`,
      el: `Ισχύει από: 1 Νοεμβρίου 2026.

Το betizzi δεν βάζει cookies διαφήμισης ή στατιστικών. Χρησιμοποιούμε μόνο την αποθήκευση του browser σου για να θυμάται τις επιλογές σου, ώστε το site να είναι όπως το άφησες. Τα στοιχεία μένουν στη συσκευή σου και δεν μας στέλνονται ποτέ.

## Τι αποθηκεύουμε
- **ko-slip, ko-stake, ko-smode** — το δελτίο σου, το ποντάρισμα και τον τρόπο του δελτίου.
- **ko-book** — τον bookmaker που διάλεξες για τις αποδόσεις.
- **ko-lfil, ko-tab, ko-vip** — το φίλτρο λιγκών, την ανοιχτή καρτέλα και την προβολή VIP.
- **ko-builder, ko-bmode, ko-coupons** — τις ρυθμίσεις του «Φτιάξε» και τα κουπόνια που αποθήκευσες.
- **ko-y** (μόνο για μία επίσκεψη) — πού είχες κατεβεί στη σελίδα.

Χρειάζονται για λειτουργίες που χρησιμοποιείς, οπότε δεν απαιτείται μπάνερ συγκατάθεσης. Μπορείς να τα σβήσεις όποτε θέλεις από τις ρυθμίσεις του browser σου· το site απλώς θα ξεχάσει τις επιλογές σου.

Αν αργότερα προσθέσουμε στατιστικά ή cookies σύνδεσης, θα ενημερώσουμε τη σελίδα και θα ζητάμε συγκατάθεση όπου το απαιτεί ο νόμος.`,
    },
  },
};
