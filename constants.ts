
import { DiscType, Question, DiscDescriptions } from './types';

export const DISC_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Kāda ir Tava galvenā prioritāte darba dienas sākumā?",
    options: [
      { text: "Uzreiz ķerties pie vissvarīgākā uzdevuma un to pabeigt.", category: DiscType.D },
      { text: "Sasveicināties ar kolēģiem un radīt labu noskaņojumu.", category: DiscType.I },
      { text: "Pārskatīt plānu un turpināt darbu mierīgā gaitā.", category: DiscType.S },
      { text: "Pārbaudīt datus un pārliecināties par informācijas precizitāti.", category: DiscType.C }
    ]
  },
  {
    id: 2,
    text: "Kā Tu reaģē, ja saņem asu kritiku par savu darbu?",
    options: [
      { text: "Aizstāvu savu viedokli un cenšos pierādīt rezultāta vērtību.", category: DiscType.D },
      { text: "Uztveru to emocionāli, bet cenšos saglabāt labas attiecības.", category: DiscType.I },
      { text: "Uzklausu mierīgi un domāju, kā pielāgoties prasībām.", category: DiscType.S },
      { text: "Analizēju kritikas loģiku un meklēju objektīvas kļūdas.", category: DiscType.C }
    ]
  },
  {
    id: 3,
    text: "Kā Tu rīkojies pēkšņas krīzes situācijā?",
    options: [
      { text: "Uzņemos vadību un pieņemu ātrus, izlēmīgus lēmumus.", category: DiscType.D },
      { text: "Mēģinu iedvesmot un nomierināt komandu ar optimismu.", category: DiscType.I },
      { text: "Sagaidu skaidras instrukcijas un palīdzu tās izpildīt.", category: DiscType.S },
      { text: "Pētu iemeslus un izstrādāju detalizētu rīcības plānu.", category: DiscType.C }
    ]
  },
  {
    id: 4,
    text: "Kāds ir Tavs stils sapulcēs?",
    options: [
      { text: "Runāju tieši, koncentrējoties tikai uz gala mērķi.", category: DiscType.D },
      { text: "Bieži izsaku radošas idejas un aizrauju citus.", category: DiscType.I },
      { text: "Uzklausu visus un cenšos atrast kopīgu valodu.", category: DiscType.S },
      { text: "Uzdodu jautājumus par detaļām un procesa loģiku.", category: DiscType.C }
    ]
  },
  {
    id: 5,
    text: "Kas Tevi visvairāk motivē darbā?",
    options: [
      { text: "Izaicinājumi, konkurence un uzvara.", category: DiscType.D },
      { text: "Atzinība, popularitāte un sociālā mijiedarbība.", category: DiscType.I },
      { text: "Drošība, stabilitāte un prognozējama vide.", category: DiscType.S },
      { text: "Kvalitāte, standarti un intelektuāls gandarījums.", category: DiscType.C }
    ]
  },
  {
    id: 6,
    text: "Ja Tev jāvada projekts, kā Tu to dari?",
    options: [
      { text: "Pieprasu rezultātus un kontrolēju termiņus.", category: DiscType.D },
      { text: "Deleģēju un uzticos cilvēku radošumam.", category: DiscType.I },
      { text: "Veidoju atbalstošu gaisotni un palīdzu ikvienam.", category: DiscType.S },
      { text: "Izstrādāju stingru struktūru un dokumentāciju.", category: DiscType.C }
    ]
  },
  {
    id: 7,
    text: "Kā Tu pieņem lēmumu par jaunu darba piedāvājumu?",
    options: [
      { text: "Izvērtēju karjeras izaugsmes un varas iespējas.", category: DiscType.D },
      { text: "Skatos, cik interesants un dinamisks būs kolektīvs.", category: DiscType.I },
      { text: "Pētu uzņēmuma stabilitāti un darba un privātās dzīves līdzsvaru.", category: DiscType.S },
      { text: "Rūpīgi analizēju pienākumus, līgumu un skaitļus.", category: DiscType.C }
    ]
  },
  {
    id: 8,
    text: "Kā Tu rīkojies, ja kolēģis kavē Tavu darba procesu?",
    options: [
      { text: "Saku to tieši un pieprasu tūlītēju rīcību.", category: DiscType.D },
      { text: "Mēģinu viņu jokojot pamudināt strādāt ātrāk.", category: DiscType.I },
      { text: "Piedāvāju savu palīdzību, lai kopā pabeigtu darbu.", category: DiscType.S },
      { text: "Sūtu e-pastu ar precīzām norādēm par kavējuma sekām.", category: DiscType.C }
    ]
  },
  {
    id: 9,
    text: "Kāda ir Tava attieksme pret noteikumiem?",
    options: [
      { text: "Tie ir jāmaina, ja tie traucē sasniegt mērķi.", category: DiscType.D },
      { text: "Es tos ievēroju, ja tie šķiet loģiski un interesanti.", category: DiscType.I },
      { text: "Es tos ievēroju, lai saglabātu mieru un kārtību.", category: DiscType.S },
      { text: "Es tos precīzi ievēroju un pieprasu to arī no citiem.", category: DiscType.C }
    ]
  },
  {
    id: 10,
    text: "Kā Tu risini sarežģītu tehnisku problēmu?",
    options: [
      { text: "Mēģinu dažādus variantus, līdz atrodu to, kas strādā.", category: DiscType.D },
      { text: "Pārrunāju to ar citiem, meklējot radošas idejas.", category: DiscType.I },
      { text: "Meklēju pārbaudītas metodes vai jautāju ekspertam.", category: DiscType.S },
      { text: "Dziļi ienirstu detaļās un analīzē, līdz saprotu cēloni.", category: DiscType.C }
    ]
  },
  {
    id: 11,
    text: "Kā Tu uzvedies ballītē kopā ar kolēģiem?",
    options: [
      { text: "Runāju par biznesu un nākotnes plāniem.", category: DiscType.D },
      { text: "Esmu kompānijas dvēsele un visus izklaidēju.", category: DiscType.I },
      { text: "Sarunājos ar dažiem tuvākajiem kolēģiem.", category: DiscType.S },
      { text: "Vairāk vēroju no malas un analizēju situāciju.", category: DiscType.C }
    ]
  },
  {
    id: 12,
    text: "Kas Tevi visvairāk kaitina darba vietā?",
    options: [
      { text: "Neizlēmība un lēna darba gaita.", category: DiscType.D },
      { text: "Pārlieka nopietnība un sociāla izolācija.", category: DiscType.I },
      { text: "Konflikti un pēkšņas, neplānotas pārmaiņas.", category: DiscType.S },
      { text: "Nolaidība un pavirša attieksme pret faktiem.", category: DiscType.C }
    ]
  },
  {
    id: 13,
    text: "Kā Tu plāno savu laiku?",
    options: [
      { text: "Fokusējos uz lielajiem mērķiem, detaļas atstājot vēlākam.", category: DiscType.D },
      { text: "Plānoju spontāni, atkarībā no noskaņojuma un tikšanās reizēm.", category: DiscType.I },
      { text: "Sekoju ierastajam grafikam un rutīnai.", category: DiscType.S },
      { text: "Izmantoju detalizētu kalendāru un uzdevumu sarakstus.", category: DiscType.C }
    ]
  },
  {
    id: 14,
    text: "Kā Tu pārliecini citus par savu ideju?",
    options: [
      { text: "Izmantoju spēcīgus argumentus un uzsveru ieguvumus.", category: DiscType.D },
      { text: "Lietoju emocijas, stāstus un personīgo harizmu.", category: DiscType.I },
      { text: "Meklēju atbalstu un saskaņoju viedokļus pakāpeniski.", category: DiscType.S },
      { text: "Prezentēju faktus, datus un loģiskus pierādīpis.", category: DiscType.C }
    ]
  },
  {
    id: 15,
    text: "Kā Tu jūties, ja Tev jāstrādā pilnīgā vienatnē?",
    options: [
      { text: "Labi, jo neviens man netraucē sasniegt mērķi.", category: DiscType.D },
      { text: "Nogurstu, jo man pietrūkst enerģijas no citiem.", category: DiscType.I },
      { text: "Mierīgi, ja vien man ir skaidrs uzdevums.", category: DiscType.S },
      { text: "Lieliski, jo varu koncentrēties uz kvalitāti.", category: DiscType.C }
    ]
  },
  {
    id: 16,
    text: "Kā Tu rīkojies, ja klients ir neapmierināts?",
    options: [
      { text: "Piedāvāju ātru risinājumu, lai slēgtu lietu.", category: DiscType.D },
      { text: "Mēģinu viņu apburt un nogludināt situāciju emocionāli.", category: DiscType.I },
      { text: "Pacietīgi uzklausu un apsolu visu nokārtot.", category: DiscType.S },
      { text: "Pētu sūdzības pamatotību un pārbaudu visus faktus.", category: DiscType.C }
    ]
  },
  {
    id: 17,
    text: "Kāda ir Tava stiprā puse darbā ar informāciju?",
    options: [
      { text: "Spēja ātri saprast būtību un rīkoties.", category: DiscType.D },
      { text: "Spēja saskatīt sakarības un jaunas iespējas.", category: DiscType.I },
      { text: "Spēja saglabāt un organizēt informāciju sistēmiski.", category: DiscType.S },
      { text: "Spēja pamanīt vissīkākās kļūdas un neprecizitātes.", category: DiscType.C }
    ]
  },
  {
    id: 18,
    text: "Kā Tu uztver negaidītas pārmaiņas uzņēmumā?",
    options: [
      { text: "Saskatu tās kā iespēju iegūt jaunu ietekmi.", category: DiscType.D },
      { text: "Esmu priecīgs par jaunu dinamiku un piedzīvojumiem.", category: DiscType.I },
      { text: "Sākumā esmu piesardzīgs un uztraucos par stabilitāti.", category: DiscType.S },
      { text: "Analizēju, kā tas ietekmēs procesus un efektivitāti.", category: DiscType.C }
    ]
  },
  {
    id: 19,
    text: "Kas Tevi visvairāk kaitina darba vietā?",
    options: [
      { text: "Neizlēmība un lēna darba gaita.", category: DiscType.D },
      { text: "Pārlieka nopietnība un sociāla izolācija.", category: DiscType.I },
      { text: "Konflikti un pēkšņas, neplānotas pārmaiņas.", category: DiscType.S },
      { text: "Nolaidība un pavirša attieksme pret faktiem.", category: DiscType.C }
    ]
  },
  {
    id: 20,
    text: "Kā Tu reaģē uz lēnu kolēģi?",
    options: [
      { text: "Pārtraucu viņu un daru pats vai pavēlu pasteigties.", category: DiscType.D },
      { text: "Mēģinu viņu uzmundrināt ar stāstiem par panākumiem.", category: DiscType.I },
      { text: "Pacietīgi gaidu un saprotu viņa tempu.", category: DiscType.S },
      { text: "Norādu uz neefektivitāti un piedāvāju labāku metodi.", category: DiscType.C }
    ]
  },
  {
    id: 21,
    text: "Kā Tu gribi, lai kolēģi Tevi uztver?",
    options: [
      { text: "Kā spēcīgu līderi un uzvarētāju.", category: DiscType.D },
      { text: "Kā populāru un interesantu personību.", category: DiscType.I },
      { text: "Kā uzticamu un izpalīdzīgu komandas biedru.", category: DiscType.S },
      { text: "Kā kompetentu un precīzu ekspertu.", category: DiscType.C }
    ]
  },
  {
    id: 22,
    text: "Kā Tu risini konfliktus starp diviem kolēģiem?",
    options: [
      { text: "Pavēlu viņiem beigt un atgriezties pie darba.", category: DiscType.D },
      { text: "Mēģinu viņus sasmīdināt un novērst uzmanību.", category: DiscType.I },
      { text: "Kļūstu par mediatoru un meklēju kompromisu.", category: DiscType.S },
      { text: "Analizēju konflikta sakni un piedāvāju loģisku risinājumu.", category: DiscType.C }
    ]
  },
  {
    id: 23,
    text: "Kā Tu rīkojies, ja Tev pietrūkst informācijas darbam?",
    options: [
      { text: "Pieņemu lēmumu balstoties uz intuīciju un rīkojos.", category: DiscType.D },
      { text: "Zvanu visiem paziņām un prasu padomu.", category: DiscType.I },
      { text: "Gaidu, kamēr informācija kļūs pieejama.", category: DiscType.S },
      { text: "Pārtraucu darbu, līdz atrodu visus vajadzīgos datus.", category: DiscType.C }
    ]
  },
  {
    id: 24,
    text: "Kāds ir Tavs ideālais darba galds?",
    options: [
      { text: "Minimālistisks, kur ir tikai svarīgākais.", category: DiscType.D },
      { text: "Krāsains, ar fotogrāfijām un iedvesmas citātiem.", category: DiscType.I },
      { text: "Mājīgs un ērts, ar visām vajadzīgajām lietām pie rokas.", category: DiscType.S },
      { text: "Perfekti organizēts, kur katrai lietai ir sava vieta.", category: DiscType.C }
    ]
  },
  {
    id: 25,
    text: "Kā Tu rīkojies, ja pieļauj kļūdu?",
    options: [
      { text: "Atzīstu to ātri un eju tālāk pie nākamā uzdevuma.", category: DiscType.D },
      { text: "Mēģinu to pārvērst par joku vai atrast vainu apstākļos.", category: DiscType.I },
      { text: "Ļoti pārdzīvoju un cenšos to mierīgi izlabot.", category: DiscType.S },
      { text: "Dziļi analizēju, kāpēc tas notika un kā to novērst mūžīgi.", category: DiscType.C }
    ]
  },
  {
    id: 26,
    text: "Kas Tevi visvairāk kaitina darba vietā?",
    options: [
      { text: "Neizlēmība un lēna darba gaita.", category: DiscType.D },
      { text: "Pārlieka nopietnība un sociāla izolācija.", category: DiscType.I },
      { text: "Konflikti un pēkšņas, neplānotas pārmaiņas.", category: DiscType.S },
      { text: "Nolaidība un pavirša attieksme pret faktiem.", category: DiscType.C }
    ]
  },
  {
    id: 27,
    text: "Kā Tu deleģē uzdevumus?",
    options: [
      { text: "Norādu rezultātu un pasaku, ka gribu to rīt.", category: DiscType.D },
      { text: "Mēģinu iedvesmot kolēģi uzņemties šo 'lielisko iespēju'.", category: DiscType.I },
      { text: "Piedāvāju atbalstu un saku, ka var jautāt jebko.", category: DiscType.S },
      { text: "Sagatavoju detalizētu instrukciju un kontrolsarakstu.", category: DiscType.C }
    ]
  },
  {
    id: 28,
    text: "Kā Tu rīkojies jaunā komandā?",
    options: [
      { text: "Mēģinu kļūt par neoficiālo līderi.", category: DiscType.D },
      { text: "Mēģinu kļūt par vismīļāko komandas biedru.", category: DiscType.I },
      { text: "Vēroju un cenšos saprast savu lomu.", category: DiscType.S },
      { text: "Pētu komandas struktūru un procesus.", category: DiscType.C }
    ]
  },
  {
    id: 29,
    text: "Kas ir Tavs lielākais bieds darbā?",
    options: [
      { text: "Zaudēt kontroli vai tikt izmantotam.", category: DiscType.D },
      { text: "Tikt ignorētam vai sociāli atstumtam.", category: DiscType.I },
      { text: "Zaudēt drošības sajūtu vai stabilitāti.", category: DiscType.S },
      { text: "Pieļaut neprecizitāti vai tikt kritizētam par kvalitāti.", category: DiscType.C }
    ]
  },
  {
    id: 30,
    text: "Kāds ir Tavs galvenais komunikācijas stils?",
    options: [
      { text: "Tiešs, ass un mērķtiecīgs.", category: DiscType.D },
      { text: "Radošs, iedvesmojošs un krāsains.", category: DiscType.I },
      { text: "Mierīgs, laipns un atbalstošs.", category: DiscType.S },
      { text: "Precīzs, lietišķs un faktoloģisks.", category: DiscType.C }
    ]
  }
];

export const DISC_DESCRIPTIONS: DiscDescriptions = {
  [DiscType.D]: {
    description: "Tavs profils norāda uz izteiktu Dominances enerģiju, kas ir vērsta uz rezultātiem un kontroli. Tu esi dabiski tendēts uz lielo mērķu saskatīšanu un nebaidies no riska. Tavā personībā dominē pašpārliecinātība, vēlme pēc neatkarības un tieksme uz uzvaru katrā situācijā. Tev ir tendence uzņemties vadību pat neoficiālās situācijās, jo Tavs prāts pastāvīgi meklē efektivitāti un veidus, kā ātrāk nonākt pie mērķa. Tu augstu vērtē tiešumu un skaidrību, un Tev nepatīk vilcināšanās vai lieka emocionāla kavēšanās pie procesiem.",
    strengths: [
      "Fenomenāla drosme pieņemt lēmumus situācijās, kur citi svārstās vai baidās no atbildības",
      "Spēja saglabāt asu fokusu uz galarezultātu pat tad, ja apkārt valda haoss vai negaidīti šķēršļi",
      "Dabiska autoritāte, kas iedvesmo komandu sekot Tavai vīzijai un neapstāties pie grūtībām",
      "Nepārtraukta tiekšanās pēc izcilības un procesu optimizācijas, lai sasniegtu maksimumu",
      "Spēja ātri mobilizēt resursus un cilvēkus, lai atrisinātu krīzes situācijas"
    ],
    challenges: [
      "Grūtības uzklausīt citu viedokļus, it īpaši, ja tie šķiet lēnāki vai pārlieku detalizēti",
      "Nepietiekama uzmanība pret apkārtējo emocijām, kas var radīt saspīlējumu komandas iekšienē",
      "Tieksme kļūt parāk nepacietīgam un agresīvam, ja procesi neiet tik ātri, kā plānots",
      "Detaļu ignorēšana, kas ilgtermiņā var novest pie tehniskām kļūdām vai administratīviem kavējumiem"
    ],
    careers: ["Stratēģiskā vadība", "Krīžu menedžments", "Uzņēmējdarbība", "Pārdošanas vadība", "Tiesu sistēma"]
  },
  [DiscType.I]: {
    description: "Tavs profils atklāj spēcīgu Ietekmes potenciālu, kura pamatā ir harizma un emocionālā inteliģence. Tu esi cilvēks, kurš barojas no sociālās mijiedarbības un gūst enerģiju no citiem. Tavs komunikācijas stils ir krāsains, iedvesmojošs un bieži vien balstīts uz intuīciju un optimismu. Tu spēj saskatīt iespējas tur, kur citi redz problēmas, un Tavs entuziasms ir lipīgs. Tev ir būtiski justies piederīgam, tikt novērtētam un būt uzmanības centrā, izmantojot savas spējas veidot un uzturēt plašu kontaktu tīklu.",
    strengths: [
      "Izcila spēja pārliecināt un iedvesmot pat skeptiskākos cilvēkus sekot jaunām idejām",
      "Dabiska talanta esamība publiskajā runā un jebkura veida sociālajā prezentācijā",
      "Spēja saskatīt inovatīvus un radošus risinājumus, pateicoties asociatīvajai domāšanai",
      "Pozitīvas darba vides veidošana, kas paaugstina visas komandas kopējo morāli",
      "Lieliska pielāgošanās spēja dažādiem cilvēku tipiem un komunikācijas līmeņiem"
    ],
    challenges: [
      "Grūtības koncentrēties uz monotonu datu apstrādi vai ilgstošu vienatnes darbu",
      "Tieksme dot solījumus, kurus ir grūti izpildīt reālajā laika rāmī",
      "Pārāk liela atkarība no citu atzinības, kas var traucēt pieņemt kritiskus lēmumus",
      "Kārtības un struktūras trūkums darba plānošanā, bieži paļaujoties uz improvizāciju"
    ],
    careers: ["Mārketings un PR", "Koučings un mentorings", "Izklaides industrija", "Sabiedriskās attiecības", "Reklāmas dizains"]
  },
  [DiscType.S]: {
    description: "Tavs profils norāda uz Stabilitātes tipu, kas ir jebkuras stabilas organizācijas pamats. Tu esi uzticams, metodisks un orientēts uz ilgtermiņa attiecībām. Tavā raksturā dominē miers, pacietība un vēlme pēc harmonijas. Tu dod priekšroku pārbaudītām vērtībām un metodēm, nevis nepamatotiem riskiem. Tu esi izcils komandas spēlētājs, kurš vienmēr ir gatavs uzklausīt un palīdzēt, bieži vien upurējot savas intereses kopējā labuma vārdā. Tev ir svarīga drošības sajūta un skaidri spēles noteikumi.",
    strengths: [
      "Izcila spēja uzturēt procesus ilgtermiņā, nodrošinot augstu stabilitātes līmeni",
      "Dabiska empātija un prasme mierīgi risināt konfliktus starp kolēģiem",
      "Augsta lojalitāte uzņēmumam un spēja saglabāt uzticamību pat krīzes brīžos",
      "Pārdomāta un pakāpeniska pieeja darbam, kas izslēdz paviršību un steigas kļūdas",
      "Spēja izcili strādāt komandā un veicināt kopīgu, saskaņotu mērķu sasniegšanu"
    ],
    challenges: [
      "Spēcīga pretestība pēkšņām pārmaiņām vai nepārdomātām inovācijām darba vidē",
      "Grūtības pateikt 'nē' kolēģiem, kas var novest pie pārslodzes un izdegšanas",
      "Tieksme izvairīties no tiešiem konfliktiem, pat ja tas kaitē darba efektivitātei",
      "Ilgstoša lēmumu pieņemšana, meklējot pēc iespējas lielāku drošību un piekrišanu"
    ],
    careers: ["Personāla vadība", "Klientu atbalsts", "Izglītība", "Administrācija", "Sociālais darbs"]
  },
  [DiscType.C]: {
    description: "Tavs profils atbilst Analītikas tipam, kurš tiecas pēc pilnības un loģiskas skaidrības. Tavā darbībā dominē precizitāte, fakti un kvalitātes standarti. Tu esi cilvēks, kurš 'rok dziļi' un neapstājas, kamēr nav izprasts katrs procesa elements. Tavs komunikācijas stils ir lietišķs, atturīgs un vērsts uz informācijas apmaiņu, nevis tukšu runāšanu. Tu augstu vērtē kompetenci un esi gatavs veltīt laiku, lai nodrošinātu, ka rezultāts ir nevainojams un pamatots ar datiem.",
    strengths: [
      "Augstākā līmeņa precizitāte un spēja saskatīt loģikas kļūdas vissīkākajās detaļās",
      "Objektīva un kritiska domāšana, kas ļauj pieņemt pamatotus un izsvērtus lēmumus",
      "Spēja izveidot un uzturēt stingras sistēmas un kvalitātes kontroles mehānismus",
      "Patstāvība un spēja efektīvi strādāt pie sarežģītiem, intelektuāliem uzdevumiem",
      "Dziļa zinātkāre un vēlme kļūt par īstu ekspertu savā jomā"
    ],
    challenges: [
      "Tieksme uz 'analīzes paralīzi' – pārāk ilga datu pētīšana, kas kavē tūlītēju rīcību",
      "Pārmērīgs perfekcionisms, kas rada stresu gan Tev pašam, gan apkārtējiem",
      "Emocionāla distancētība komunikācijā, kas var tikt uztverta kā vēsums vai augstprātība",
      "Grūtības strādāt neorganizētā vidē vai ar kolēģiem, kuri neievēro standartus"
    ],
    careers: ["Finanšu audits", "IT sistēmu arhitektūra", "Inženierzinātne", "Zinātniskā pētniecība", "Kvalitātes kontrole"]
  }
};
