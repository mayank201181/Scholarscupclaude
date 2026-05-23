// Study guide content, debate strategy, tactics, event descriptions.
window.SC_SUBJECTS = [
  { key: 'science',    label: 'Science & Technology', color: '#6c9bd2' },
  { key: 'social',     label: 'Social Studies',       color: '#f4b942' },
  { key: 'art',        label: 'Art & Music',          color: '#c084fc' },
  { key: 'literature', label: 'Literature & Media',   color: '#4ade80' },
  { key: 'special',    label: 'Special Area',         color: '#fb7185' },
  { key: 'history',    label: 'History',              color: '#fbbf24' },
];

window.SC_EVENTS = [
  {
    name: "Scholar's Challenge",
    summary: "120 multiple-choice questions, individually written, covering all six subjects equally (about 20 per subject). You may select more than one answer per question — partial credit applies, but wrong picks subtract.",
    meta: ["Format: Individual", "Time: 60 minutes", "Questions: 120", "Scoring: weighted by confidence picks"],
    notes: [
      "You may pick up to 4 of the 5 options. Picking the correct one gives credit; picking a wrong one subtracts. Pick 4 only when you can confidently eliminate one.",
      "Selecting just one correct answer gives more points per question than splitting picks.",
      "If you have NO idea: leave the question blank. Random selection on every question loses points.",
      "Pace yourself: 30 seconds per question average. Flag tough ones and return to them."
    ]
  },
  {
    name: "Team Debate",
    summary: "Three debate rounds. Two teams of three, two sides (proposition / opposition), three motions across the day from each subject area. Each speaker gets four minutes.",
    meta: ["Format: Team (3 vs 3)", "Time: 4 min per speaker", "Rounds: 3", "Scoring: style, content, strategy"],
    notes: [
      "Sides are assigned. Prep time is short (≈15 minutes per round). Use it to plan structure, not write essays.",
      "Every speaker MUST speak. The judge rotates focus and notes hesitation.",
      "Strong debaters end with a clear takeaway sentence and engage the other side's arguments by name."
    ]
  },
  {
    name: "Collaborative Writing",
    summary: "Your team picks ONE of six prompts (one per subject). Then each team member writes their own essay individually for the next 50 minutes. Quotes from the curriculum win.",
    meta: ["Format: Pick together, write alone", "Time: 60 minutes total", "Word count: ~250-400 words", "Scoring: individual, but you share a prompt"],
    notes: [
      "Spend the first 5 minutes as a team to debate which prompt plays to your strengths.",
      "Pick a prompt from the subject you all know best — not the one that 'sounds most fun'.",
      "Strong essays cite at least 2-3 specific curriculum references (a fact, a name, a date, a work).",
      "Open with a hook, build a single argument, close by tying back to the prompt. Avoid hedging."
    ]
  },
  {
    name: "Scholar's Bowl",
    summary: "A team event held in a darkened room. Multimedia questions on a big screen — image, audio, video clips. Your team has roughly 30 seconds per question to discuss and answer collectively.",
    meta: ["Format: Team", "Time: ~30s per question", "Questions: ≈ 30", "Visual + audio + text"],
    notes: [
      "Designate roles before the round: one note-taker, one consensus-caller, one wildcard for art / music / film.",
      "Don't argue past the timer. Whoever has the strongest pick at 5 seconds gets it down.",
      "Practice eliminating: even one bad option ruled out raises your odds significantly under partial credit."
    ]
  }
];

window.SC_STUDY = [
  /* ===== SCIENCE & TECHNOLOGY ===== */
  {
    subject: 'science',
    topics: [
      {
        id: 's-cell',
        title: 'Cell Biology Essentials',
        body: "Cells are the basic unit of life. Prokaryotes (bacteria, archaea) lack a nucleus; eukaryotes (plants, animals, fungi, protists) have membrane-bound organelles.",
        bullets: [
          "Mitochondria: ATP via cellular respiration (powerhouse).",
          "Chloroplasts: photosynthesis in plant cells; convert CO₂ + H₂O + light → glucose + O₂.",
          "Ribosomes: protein synthesis from mRNA. Made of rRNA + protein.",
          "Endoplasmic Reticulum: rough (ribosomes attached, makes proteins) and smooth (lipids, detox).",
          "Golgi apparatus: modifies, sorts, packages proteins.",
          "Nucleus holds DNA; nucleolus inside makes ribosomes."
        ],
        kv: [
          ["Cell theory", "All living things are made of cells; cells come from pre-existing cells; cell is unit of structure & function."],
          ["Mitosis vs Meiosis", "Mitosis → 2 identical diploid cells (growth, repair). Meiosis → 4 haploid gametes (reproduction)."]
        ]
      },
      {
        id: 's-genetics',
        title: 'Genetics & Heredity',
        body: "DNA is a double helix of nucleotides (A-T, G-C base pairs) wound around histones into chromosomes. Genes code for proteins via mRNA.",
        bullets: [
          "Mendel's laws: segregation, independent assortment, dominance.",
          "Genotype = genetic makeup; phenotype = observable trait.",
          "Punnett squares predict cross outcomes.",
          "CRISPR-Cas9: targeted gene editing using guide RNA + Cas9 enzyme.",
          "Mutations: substitution, insertion, deletion, frameshift."
        ],
        kv: [
          ["Central dogma", "DNA → RNA → Protein (transcription, then translation)."],
          ["Codon", "3 mRNA bases code for 1 amino acid. 64 codons, 20 amino acids, redundancy."]
        ]
      },
      {
        id: 's-evolution',
        title: 'Evolution',
        body: "Darwin's natural selection: variation, inheritance, differential survival. Drives gradual change in populations over generations.",
        bullets: [
          "Speciation: allopatric (geographic isolation), sympatric (within same area).",
          "Adaptive radiation: rapid diversification (Galápagos finches).",
          "Convergent evolution: unrelated species evolve similar traits (dolphins vs sharks).",
          "Common ancestor evidence: homologous structures, vestigial organs, DNA similarity, embryology, fossils.",
          "Hardy-Weinberg equilibrium: p² + 2pq + q² = 1."
        ]
      },
      {
        id: 's-physics-mech',
        title: 'Physics: Mechanics & Motion',
        body: "Classical mechanics describes motion of macroscopic objects. Built on Newton's three laws.",
        bullets: [
          "1st law: inertia — object stays at rest / in motion unless acted on.",
          "2nd law: F = ma.",
          "3rd law: every action has an equal and opposite reaction.",
          "Momentum p = mv; conserved in collisions.",
          "Kinetic energy KE = ½mv²; potential energy PE = mgh.",
          "Work = force × distance (in direction of force)."
        ]
      },
      {
        id: 's-physics-modern',
        title: 'Modern Physics',
        body: "Quantum mechanics (subatomic, probabilistic) and relativity (high speeds, large masses) replaced classical pictures at extremes.",
        bullets: [
          "Special relativity (1905): time dilation, length contraction, E = mc².",
          "General relativity (1915): gravity as curvature of spacetime.",
          "Quantum: wave-particle duality, Heisenberg uncertainty, superposition.",
          "Standard Model: quarks, leptons, force carriers (photon, gluon, W/Z, Higgs).",
          "Higgs boson: confirmed at CERN 2012, gives particles mass."
        ]
      },
      {
        id: 's-chem',
        title: 'Chemistry Fundamentals',
        body: "Matter is made of atoms organized in the periodic table by atomic number. Bonds form when electrons are shared (covalent), transferred (ionic), or pooled (metallic).",
        bullets: [
          "Periods (rows) = electron shells; groups (columns) = valence electrons.",
          "Mole = 6.022 × 10²³ particles (Avogadro's number).",
          "Acids donate H⁺ (low pH); bases accept H⁺ / donate OH⁻ (high pH).",
          "Redox: oxidation = loses electrons; reduction = gains electrons (OIL RIG).",
          "States of matter: solid, liquid, gas, plasma, Bose-Einstein condensate."
        ]
      },
      {
        id: 's-climate',
        title: 'Climate Science',
        body: "Earth's climate is driven by solar radiation, atmosphere, oceans, ice, biosphere. Greenhouse gases trap heat.",
        bullets: [
          "Key GHGs: CO₂, CH₄ (methane), N₂O, water vapor, fluorinated gases.",
          "Carbon cycle: photosynthesis, respiration, decomposition, combustion, ocean exchange.",
          "Feedback loops: melting ice → less albedo → more warming (positive feedback).",
          "Paris Agreement 2015: limit warming below 2°C, aim for 1.5°C.",
          "IPCC: UN body assessing climate science."
        ]
      },
      {
        id: 's-ai',
        title: 'Artificial Intelligence & Computing',
        body: "AI systems learn patterns from data. Modern AI is dominated by deep learning — neural networks with many layers.",
        bullets: [
          "Machine learning types: supervised, unsupervised, reinforcement.",
          "Neural networks: weighted layers; backpropagation tunes weights.",
          "Transformer architecture (2017): attention mechanism; basis of ChatGPT, Claude.",
          "Turing test: can a machine fool a human in conversation?",
          "Moore's law: transistor count doubles ~ every 2 years (slowing).",
          "Quantum computing: qubits in superposition, entanglement, exponentially scaling state space."
        ]
      },
      {
        id: 's-medicine',
        title: 'Medicine & The Human Body',
        body: "Body systems work together: circulatory, respiratory, digestive, nervous, endocrine, immune, musculoskeletal, integumentary, urinary, reproductive.",
        bullets: [
          "Heart: 4 chambers (R/L atria, R/L ventricles); pumps via SA node electrical signal.",
          "Neurons fire via action potentials; synapses use neurotransmitters (dopamine, serotonin, GABA).",
          "Immune: innate (fast, generic) + adaptive (slow, specific — B cells make antibodies, T cells attack).",
          "mRNA vaccines: deliver instructions for spike protein → immune memory.",
          "Antibiotics: kill bacteria, not viruses. Resistance is a growing global threat."
        ]
      },
      {
        id: 's-space',
        title: 'Astronomy & Space',
        body: "The universe began ~13.8 billion years ago in the Big Bang. It is expanding, with galaxies moving apart.",
        bullets: [
          "Solar System: 8 planets (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune).",
          "Star life cycle: nebula → main sequence → red giant → white dwarf / supernova → neutron star / black hole.",
          "Hubble's law: galaxies recede; v = H₀d. Used to infer expansion.",
          "Dark matter (~27%): invisible mass affecting galaxy rotation. Dark energy (~68%): drives accelerating expansion.",
          "Recent landmarks: James Webb Space Telescope (2021), Artemis program returning humans to Moon."
        ]
      }
    ]
  },

  /* ===== SOCIAL STUDIES ===== */
  {
    subject: 'social',
    topics: [
      {
        id: 'so-gov',
        title: 'Forms of Government',
        body: "Governments range across a spectrum of who holds power and how decisions are made.",
        bullets: [
          "Democracy: power derives from citizens (direct or representative).",
          "Republic: representatives chosen by citizens; rule of law over rule of one.",
          "Monarchy: hereditary ruler (absolute or constitutional).",
          "Authoritarianism: one party / leader holds power; limited civil liberties.",
          "Theocracy: religious leaders rule (Iran combines theocracy and republic).",
          "Federation vs unitary: power divided between national & subnational (federation) vs centralized."
        ]
      },
      {
        id: 'so-econ',
        title: 'Economics Basics',
        body: "Economics is the study of how societies allocate scarce resources.",
        bullets: [
          "Microeconomics: individual & firm decisions, supply & demand, markets.",
          "Macroeconomics: aggregate variables — GDP, inflation, unemployment.",
          "Supply curve slopes up, demand curve slopes down; equilibrium where they cross.",
          "Inflation: general rise in prices; deflation: fall. Hyperinflation (Weimar, Zimbabwe) devastates currency.",
          "Fiscal policy = government spending & taxes; monetary policy = central bank interest rates & money supply.",
          "Trade: comparative advantage (Ricardo) — even less-efficient producers can gain by specializing."
        ]
      },
      {
        id: 'so-globalization',
        title: 'Globalization',
        body: "The integration of economies, cultures, and information across borders, accelerated post-1990 by tech and trade.",
        bullets: [
          "Drivers: containerization, internet, WTO (1995), lower tariffs, multinational corporations.",
          "Pros: cheaper goods, lifted ~1 billion out of poverty, cultural exchange.",
          "Cons: job displacement in developed economies, environmental damage, cultural homogenization, sweatshop labor.",
          "Backlash: Brexit (2016), US-China trade war (2018+), reshoring after COVID."
        ]
      },
      {
        id: 'so-rights',
        title: 'Human Rights',
        body: "Universal Declaration of Human Rights (1948, UN) sets out 30 rights all humans have by virtue of being human.",
        bullets: [
          "Drafted post-WWII; Eleanor Roosevelt chaired the committee.",
          "Civil & political rights: free speech, fair trial, vote.",
          "Economic, social, cultural rights: education, healthcare, work.",
          "International Criminal Court (ICC, 2002): tries war crimes, genocide, crimes against humanity.",
          "Major instruments: ICCPR, ICESCR, Refugee Convention, CEDAW (women), CRC (children)."
        ]
      },
      {
        id: 'so-asia',
        title: 'Southeast Asia in Focus (Thailand & Neighbors)',
        body: "Useful regional context for a regional round held in Thailand.",
        bullets: [
          "ASEAN: 10-member regional bloc (Brunei, Cambodia, Indonesia, Laos, Malaysia, Myanmar, Philippines, Singapore, Thailand, Vietnam). Founded 1967.",
          "Thailand: constitutional monarchy; capital Bangkok; ~70M people; Theravada Buddhism majority; never colonized by Europeans (called itself Siam until 1939).",
          "Greater Mekong Subregion: Thailand, Vietnam, Cambodia, Laos, Myanmar, China's Yunnan & Guangxi.",
          "Cultural heritage: Ayutthaya & Sukhothai (Thai history), Angkor Wat (Cambodia), Borobudur (Indonesia)."
        ]
      },
      {
        id: 'so-philosophy',
        title: 'Political Philosophy',
        body: "Key thinkers shape how we argue about state, freedom, justice.",
        bullets: [
          "Plato: philosopher kings, ideal forms (Republic).",
          "Aristotle: virtue ethics, polity as best practical government.",
          "Hobbes: life is 'solitary, poor, nasty, brutish, short' without a strong sovereign (Leviathan).",
          "Locke: natural rights to life, liberty, property; government by consent.",
          "Rousseau: social contract, 'general will'.",
          "Marx: class conflict drives history; means of production should be collectively owned.",
          "Rawls: justice as fairness; veil of ignorance thought experiment."
        ]
      },
      {
        id: 'so-psych',
        title: 'Psychology Fundamentals',
        body: "Study of mind & behavior. Several schools and important experiments shape it.",
        bullets: [
          "Schools: behaviorism (Skinner, Pavlov), cognitive (Piaget), psychodynamic (Freud), humanistic (Maslow, Rogers).",
          "Maslow's hierarchy: physiological → safety → love/belonging → esteem → self-actualization.",
          "Classical conditioning (Pavlov's dogs) vs operant conditioning (Skinner box, reinforcement).",
          "Cognitive biases: confirmation bias, anchoring, availability heuristic, sunk cost fallacy.",
          "Stanford prison experiment (Zimbardo, 1971) & Milgram obedience experiments — ethics now stricter."
        ]
      },
      {
        id: 'so-soc',
        title: 'Sociology & Culture',
        body: "Studies social structures, group behavior, inequalities, and cultural patterns.",
        bullets: [
          "Durkheim: social facts, anomie (normlessness).",
          "Weber: bureaucracy, Protestant work ethic.",
          "Bourdieu: cultural capital, habitus.",
          "Functionalism vs conflict theory vs symbolic interactionism.",
          "Globalization & identity: hybrid cultures, diaspora communities, glocalization."
        ]
      }
    ]
  },

  /* ===== ART & MUSIC ===== */
  {
    subject: 'art',
    topics: [
      {
        id: 'a-renaissance',
        title: 'Renaissance Art (14th–17th c.)',
        body: "Rebirth of classical Greek & Roman ideas in Italy, then Northern Europe. Naturalism, perspective, humanism.",
        bullets: [
          "Linear perspective: pioneered by Brunelleschi, codified by Alberti.",
          "Da Vinci (1452–1519): Mona Lisa, Last Supper, Vitruvian Man. Polymath.",
          "Michelangelo (1475–1564): David, Pietà, Sistine Chapel ceiling.",
          "Raphael: School of Athens.",
          "Northern: Jan van Eyck (Arnolfini Portrait, oil paint mastery), Dürer (woodcuts).",
          "Sponsored by: Medici (Florence), popes, merchant families."
        ]
      },
      {
        id: 'a-baroque',
        title: 'Baroque & Beyond (17th–18th c.)',
        body: "Drama, motion, contrast (chiaroscuro), grandeur. Counter-Reformation pushed emotional religious art.",
        bullets: [
          "Caravaggio: tenebrism (strong shadow); The Calling of Saint Matthew.",
          "Rembrandt: psychological portraits; The Night Watch.",
          "Vermeer: light, domestic scenes; Girl with a Pearl Earring.",
          "Bernini: sculpture (Ecstasy of Saint Teresa) & St. Peter's Square.",
          "Rococo follows: lighter, ornamental (Fragonard's Swing)."
        ]
      },
      {
        id: 'a-modern',
        title: 'Modern Art (Late 1800s – 1950)',
        body: "Photographic realism freed painters to explore color, emotion, abstraction.",
        bullets: [
          "Impressionism: Monet, Renoir, Degas — light over detail.",
          "Post-Impressionism: Van Gogh (Starry Night), Cézanne, Gauguin.",
          "Cubism: Picasso, Braque — multiple viewpoints.",
          "Surrealism: Dalí (Persistence of Memory), Magritte, Frida Kahlo (self-portraits).",
          "Abstract Expressionism: Jackson Pollock (drip), Rothko (color fields), Willem de Kooning."
        ]
      },
      {
        id: 'a-contemporary',
        title: 'Contemporary & Non-Western',
        body: "Post-1960 art and art beyond the Western canon.",
        bullets: [
          "Pop Art: Warhol (Marilyn, Campbell's Soup), Lichtenstein.",
          "Performance & conceptual: Yoko Ono, Marina Abramović.",
          "Street: Banksy, Basquiat.",
          "Asian masters: Hokusai (The Great Wave), Yayoi Kusama (Infinity Rooms, polka dots).",
          "African modernism: Yinka Shonibare, El Anatsui."
        ]
      },
      {
        id: 'm-classical',
        title: 'Western Classical Music',
        body: "Eras: Medieval, Renaissance, Baroque, Classical, Romantic, Modern.",
        bullets: [
          "Baroque (1600-1750): Bach (Brandenburg Concertos), Handel (Messiah), Vivaldi (Four Seasons).",
          "Classical (1750-1820): Mozart (40+ symphonies, operas), Haydn, early Beethoven.",
          "Romantic (1820-1900): Beethoven later works, Chopin (piano), Wagner (operas), Tchaikovsky (Swan Lake, 1812 Overture).",
          "Modern: Debussy (impressionist), Stravinsky (Rite of Spring caused 1913 riot), Shostakovich.",
          "Sonata form: exposition → development → recapitulation."
        ]
      },
      {
        id: 'm-pop',
        title: 'Popular Music',
        body: "Rise of recorded music shaped a global popular soundscape.",
        bullets: [
          "Jazz (early 20th c.): Louis Armstrong, Duke Ellington, Miles Davis, John Coltrane.",
          "Rock & Roll (1950s): Elvis Presley, Chuck Berry, Little Richard.",
          "1960s: Beatles, Rolling Stones, Bob Dylan; folk revival; counterculture.",
          "Hip-hop (born NYC, 1970s): Grandmaster Flash, then Run-DMC, Tupac, Biggie, Kendrick Lamar.",
          "K-pop (since 1990s, global since 2010s): BTS, BLACKPINK, training-academy idol system.",
          "EDM, streaming era: Spotify (2008), TikTok-driven hits."
        ]
      },
      {
        id: 'a-architecture',
        title: 'Architecture',
        body: "Form follows function, or maybe form follows era's beliefs.",
        bullets: [
          "Classical (Greek, Roman): columns — Doric, Ionic, Corinthian.",
          "Gothic: pointed arches, flying buttresses, stained glass (Notre-Dame, Chartres).",
          "Renaissance: domes (Brunelleschi's Florence Cathedral).",
          "Modernist: Bauhaus, Le Corbusier, Mies van der Rohe ('less is more').",
          "Postmodern: Frank Gehry (Guggenheim Bilbao), Zaha Hadid (curves).",
          "Thai temples (wats): tiered roofs, gold leaf, naga serpents."
        ]
      }
    ]
  },

  /* ===== LITERATURE & MEDIA ===== */
  {
    subject: 'literature',
    topics: [
      {
        id: 'l-canon',
        title: 'World Literary Canon',
        body: "Foundational works often referenced in WSC questions.",
        bullets: [
          "Homer: Iliad (Trojan War wrath of Achilles), Odyssey (return of Odysseus).",
          "Shakespeare (1564–1616): tragedies (Hamlet, Macbeth, King Lear, Othello), comedies (A Midsummer Night's Dream), histories.",
          "Cervantes: Don Quixote (1605) — first modern novel.",
          "Dostoevsky: Crime and Punishment, Brothers Karamazov.",
          "Tolstoy: War and Peace, Anna Karenina.",
          "Austen: Pride and Prejudice, Emma — irony, social class.",
          "Brontë sisters: Jane Eyre (Charlotte), Wuthering Heights (Emily)."
        ]
      },
      {
        id: 'l-modern',
        title: 'Modern & Contemporary Fiction',
        body: "20th and 21st century novels that often appear on curricula.",
        bullets: [
          "Orwell: 1984 (surveillance state, doublethink), Animal Farm (Soviet allegory).",
          "Huxley: Brave New World (technocratic dystopia).",
          "Márquez: One Hundred Years of Solitude — magical realism, Macondo.",
          "Achebe: Things Fall Apart — colonialism in Nigeria.",
          "Atwood: The Handmaid's Tale.",
          "Murakami: Norwegian Wood, Kafka on the Shore — surreal Japan.",
          "Adichie: Half of a Yellow Sun (Biafran War)."
        ]
      },
      {
        id: 'l-asian',
        title: 'Asian Literature Spotlight',
        body: "Essential reading from the region you'll be competing in.",
        bullets: [
          "Murasaki Shikibu: Tale of Genji (~1010) — early novel, Heian Japan.",
          "Lu Xun: A Madman's Diary (1918) — modern Chinese literature father.",
          "Tagore: Gitanjali (Nobel 1913) — Indian poetry.",
          "Pramoedya Ananta Toer: Buru Quartet — Indonesian colonial history.",
          "Han Kang: The Vegetarian (Booker 2016), Nobel Prize for Literature 2024.",
          "Thai literature: Sunthorn Phu (poet, early 1800s); contemporary: Prabda Yoon."
        ]
      },
      {
        id: 'l-poetry',
        title: 'Poetry & Poetic Devices',
        body: "Poetry compresses meaning through sound, structure, image.",
        bullets: [
          "Forms: sonnet (14 lines), haiku (5-7-5), villanelle, ode, elegy, ghazal, free verse.",
          "Devices: metaphor (X is Y), simile (X like Y), personification, alliteration, assonance, enjambment, caesura.",
          "Meter: iambic pentameter (5 da-DUM beats, Shakespeare).",
          "Notable poets: Wordsworth, Whitman, Dickinson, Eliot (The Waste Land), Frost, Plath, Rumi, Pablo Neruda, Maya Angelou."
        ]
      },
      {
        id: 'l-film',
        title: 'Film & TV (Media)',
        body: "Film history, key directors, and visual storytelling.",
        bullets: [
          "Early masters: Charlie Chaplin (silent comedy), Sergei Eisenstein (montage — Battleship Potemkin).",
          "Hitchcock: Psycho, Rear Window, Vertigo — suspense.",
          "Akira Kurosawa: Seven Samurai, Rashomon (multiple-perspective story).",
          "Studio Ghibli: Hayao Miyazaki (Spirited Away, My Neighbor Totoro).",
          "Bong Joon-ho: Parasite (first non-English Best Picture, 2020).",
          "Streaming era: Netflix (2007 streaming launch), prestige TV (Breaking Bad, The Crown, Squid Game)."
        ]
      },
      {
        id: 'l-myth',
        title: 'Mythology & Folklore',
        body: "Myths shape modern storytelling. Joseph Campbell's 'hero's journey' is the common arc.",
        bullets: [
          "Greek/Roman: Zeus/Jupiter, Athena/Minerva, Hades/Pluto. Heroes: Hercules, Theseus, Perseus.",
          "Norse: Odin, Thor, Loki; Ragnarök (end times); World Tree Yggdrasil.",
          "Egyptian: Ra (sun), Anubis (death), Isis & Osiris.",
          "Hindu: Brahma (creator), Vishnu (preserver), Shiva (destroyer). Mahabharata, Ramayana.",
          "Southeast Asian: Ramayana retellings — Thai Ramakien, Indonesian wayang shadow puppetry."
        ]
      },
      {
        id: 'l-media-lit',
        title: 'Media Literacy & Journalism',
        body: "Understanding how information is produced and verified.",
        bullets: [
          "Five Ws: who, what, when, where, why.",
          "Primary vs secondary sources.",
          "Fake news, misinformation (false), disinformation (deliberately false).",
          "Deepfakes & generative AI raising new challenges.",
          "Press freedom (Reporters Without Borders index)."
        ]
      }
    ]
  },

  /* ===== SPECIAL AREA ===== */
  {
    subject: 'special',
    topics: [
      {
        id: 'sp-note',
        title: 'About the Special Area',
        body: "The Special Area changes every season and ties tightly to the curriculum theme. Always read the official WSC curriculum PDF for your season's exact reading list.",
        bullets: [
          "Past themes: 'A World on the Margins' (2024), 'Unexpected Cosmologies' (looking up), 'A World Divided', 'A World Off Course'.",
          "The Special Area typically draws cross-cultural sources — folklore, religion, philosophy, scientific fringe topics, alternate realities.",
          "Strong WSC scholars treat the Special Area as a creativity playground — most novel pop-culture references appear here."
        ]
      },
      {
        id: 'sp-cosmologies',
        title: 'Cosmologies & Worldviews',
        body: "Different cultures construct the cosmos differently. Useful for any theme touching belief systems.",
        bullets: [
          "Aboriginal Australian: Dreamtime — ancestral beings shape land.",
          "Hindu cosmology: cycles of yugas; universes within universes.",
          "Mesoamerican: Maya Long Count calendar; cyclical creation.",
          "Norse: Yggdrasil with nine worlds.",
          "Modern scientific cosmology: Big Bang, expansion, multiverse hypotheses (eternal inflation, many-worlds)."
        ]
      },
      {
        id: 'sp-margins',
        title: 'Margins & Outsiders',
        body: "Recurring WSC theme: who is centered, who is marginalized, and how that shifts.",
        bullets: [
          "Refugees: people forced across borders by conflict / persecution; UNHCR mandate.",
          "Statelessness: Rohingya in Myanmar/Bangladesh.",
          "Digital margins: those without internet access (~ 1/3 of humanity).",
          "Linguistic margins: 40% of world's ~7000 languages are endangered.",
          "Indigenous rights: Sami (Nordic), First Nations (Canada), Maori (NZ), Karen / hill peoples (Thailand)."
        ]
      },
      {
        id: 'sp-paradox',
        title: 'Paradoxes & Strange Ideas',
        body: "Common in Special Area readings.",
        bullets: [
          "Zeno's paradoxes: Achilles & tortoise, dichotomy.",
          "Ship of Theseus: identity over change.",
          "Trolley problem: ethics under tradeoffs (utilitarian vs deontological).",
          "Schrödinger's cat: superposition; alive AND dead until measured.",
          "Fermi paradox: where is everybody?"
        ]
      },
      {
        id: 'sp-future',
        title: 'Futures & Forecasting',
        body: "Tools used to think about uncertain futures.",
        bullets: [
          "Scenario planning: Royal Dutch Shell pioneered in 1970s.",
          "Black swans (Taleb): rare, high-impact events.",
          "Long Now Foundation: 10,000-year clock; thinking past tomorrow.",
          "Sci-fi as forecasting: Le Guin, Ursula K., Asimov's robotics laws, Octavia Butler.",
          "Existential risks: AI alignment, pandemics, climate tipping points, nuclear war."
        ]
      }
    ]
  },

  /* ===== HISTORY ===== */
  {
    subject: 'history',
    topics: [
      {
        id: 'h-ancient',
        title: 'Ancient Civilizations',
        body: "Cradles of civilization formed along great rivers — Tigris/Euphrates, Nile, Indus, Yellow.",
        bullets: [
          "Mesopotamia (~3500 BCE): Sumer, Akkad, Babylon. Cuneiform writing; Code of Hammurabi.",
          "Egypt (~3100 BCE): pyramids (Giza ~2560 BCE), hieroglyphs, Pharaohs (Khufu, Hatshepsut, Tutankhamun, Cleopatra).",
          "Indus Valley (~2600–1900 BCE): Harappa, Mohenjo-Daro; undeciphered script.",
          "Ancient China: Shang (oracle bones), Zhou, Qin (unification 221 BCE under Shi Huangdi, Great Wall, terracotta army).",
          "Greece: city-states (Athens, Sparta); golden age 5th c. BCE (Pericles, Socrates, democracy).",
          "Rome: Republic (509 BCE) → Empire (27 BCE); Pax Romana; fall of Western half 476 CE."
        ]
      },
      {
        id: 'h-medieval',
        title: 'Medieval World (500-1500 CE)',
        body: "Not the 'Dark Ages' globally — many regions flourished.",
        bullets: [
          "Byzantine Empire (eastern Roman): Constantinople, Justinian's Code; fell to Ottomans 1453.",
          "Islamic Golden Age (8th–13th c.): Baghdad House of Wisdom; al-Khwarizmi (algebra), Ibn Sina (medicine).",
          "Tang & Song China: gunpowder, printing, compass, paper money.",
          "Khmer Empire (Cambodia, 9th-15th c.): Angkor Wat (Hindu then Buddhist temple, world's largest religious monument).",
          "Mongol Empire (1206–): Genghis Khan; largest contiguous empire ever.",
          "Mali Empire: Mansa Musa's 1324 hajj (gold caused inflation across Mediterranean)."
        ]
      },
      {
        id: 'h-early-modern',
        title: 'Early Modern (1500-1800)',
        body: "Europe expands, Asia trades, Americas are transformed.",
        bullets: [
          "Renaissance & Reformation: Luther's 95 Theses (1517); Protestant/Catholic schism.",
          "Age of Exploration: Columbus 1492, Vasco da Gama 1498, Magellan 1519-22.",
          "Columbian Exchange: crops, animals, diseases, peoples between Old & New World.",
          "Mughal Empire (India, 1526-1857): Akbar, Shah Jahan (Taj Mahal 1632-53).",
          "Ottoman Empire: Mehmed II takes Constantinople 1453; peak under Süleyman the Magnificent.",
          "Edo Japan (1603-1868): Tokugawa shogunate; sakoku (closed country) policy.",
          "Enlightenment: Locke, Voltaire, Rousseau, Kant — reason, rights, science."
        ]
      },
      {
        id: 'h-revolutions',
        title: 'Age of Revolutions (1750-1850)',
        body: "Political and industrial upheavals reshape the world.",
        bullets: [
          "American Revolution 1775-83: Declaration 1776, Constitution 1787.",
          "French Revolution 1789: Bastille, Terror, Napoleon's rise/fall (Waterloo 1815).",
          "Haitian Revolution 1791-1804: only successful slave revolt to found a nation; Toussaint Louverture.",
          "Latin American independence: Bolívar, San Martín (1810s-1820s).",
          "Industrial Revolution: steam, railways, factories — Britain first, then continental Europe, US, Japan."
        ]
      },
      {
        id: 'h-imperialism',
        title: 'Imperialism & Colonialism (1800-1914)',
        body: "European powers carve up Africa, Asia, Pacific.",
        bullets: [
          "Berlin Conference 1884-85: scramble for Africa; lines drawn without African consent.",
          "British Raj in India (1858-1947); Sepoy Mutiny 1857.",
          "Opium Wars (1839-42, 1856-60): Britain vs Qing China; Hong Kong ceded.",
          "Meiji Restoration 1868: Japan modernizes rapidly, becomes imperial power (Russo-Japanese War 1904-5).",
          "Siam (Thailand) negotiated to remain independent — only Southeast Asian country not colonized."
        ]
      },
      {
        id: 'h-ww1',
        title: 'WWI & Interwar',
        body: "1914-18 broke 19th-century optimism.",
        bullets: [
          "Causes: alliances, militarism, imperialism, nationalism (MAIN); spark = Archduke Franz Ferdinand assassination June 1914.",
          "Trench warfare, gas, tanks, ~17 million dead.",
          "1917: US enters; Russia exits (Bolshevik Revolution).",
          "Treaty of Versailles 1919: heavy German reparations; League of Nations created (US never joined).",
          "1920s: roaring twenties, jazz age; 1929 Wall Street Crash → Great Depression.",
          "1930s: rise of fascism (Mussolini Italy 1922, Hitler Germany 1933), Japanese militarism."
        ]
      },
      {
        id: 'h-ww2',
        title: 'WWII (1939-45)',
        body: "Deadliest war in human history; ~70-85 million dead.",
        bullets: [
          "Sept 1939: Germany invades Poland; Britain, France declare war.",
          "Pearl Harbor Dec 7 1941: US enters.",
          "Holocaust: 6 million Jews + 5 million others systematically murdered.",
          "Pacific War: Battle of Midway 1942 turning point; island-hopping.",
          "D-Day June 6 1944.",
          "Atomic bombs: Hiroshima Aug 6 / Nagasaki Aug 9 1945; Japan surrenders.",
          "UN founded 1945; Nuremberg trials."
        ]
      },
      {
        id: 'h-coldwar',
        title: 'Cold War (1947-91)',
        body: "Superpower rivalry without direct US-Soviet combat.",
        bullets: [
          "Truman Doctrine, Marshall Plan, NATO 1949 vs Warsaw Pact 1955.",
          "Korean War 1950-53; Vietnam War (US 1965-73); Soviet-Afghan War 1979-89.",
          "Cuban Missile Crisis Oct 1962 — closest the world came to nuclear war.",
          "Space race: Sputnik 1957, Gagarin 1961, Apollo 11 moon landing July 1969.",
          "Decolonization sweeps Africa & Asia in 1950s-60s.",
          "1989: Berlin Wall falls; 1991: USSR dissolves into 15 republics."
        ]
      },
      {
        id: 'h-modern',
        title: 'Recent History (1991-Now)',
        body: "Post-Cold War world: hyperpower then multipolar.",
        bullets: [
          "1991 Gulf War; 1994 Rwandan genocide; 1995 Srebrenica.",
          "9/11 attacks 2001; War on Terror (Afghanistan 2001-2021, Iraq 2003-2011).",
          "China's rise: WTO entry 2001; world's 2nd largest economy by 2010.",
          "Arab Spring 2010-12; Syrian civil war.",
          "2020 COVID-19 pandemic — millions dead, global lockdowns, mRNA vaccines.",
          "Russia's invasion of Ukraine Feb 2022.",
          "AI breakthroughs from 2022 (ChatGPT) onward."
        ]
      }
    ]
  }
];

window.SC_DEBATE = [
  {
    h: "Format: Three Rounds, Three Subjects",
    body: "Each round draws motions from one or two subject areas. You'll get 15 minutes to prepare with your team after the motion is announced. Then six 4-minute speeches alternate: Prop 1, Opp 1, Prop 2, Opp 2, Prop 3, Opp 3."
  },
  {
    h: "The Three Roles",
    table: [
      ["Speaker 1 (Opener)", "Frame the debate. Define key terms. State 2-3 arguments your team will defend. Set the burden of proof for the other side."],
      ["Speaker 2 (Engager)", "Rebuild and rebut. Attack the opener of the other side argument by argument. Extend at least one new point of your own."],
      ["Speaker 3 (Closer)", "No new arguments. Summarize the clash. Tell the judge why your side wins on each contested issue. Leave a memorable closing line."]
    ]
  },
  {
    h: "Structuring an Argument: AREL",
    body: "Each argument should follow this micro-structure.",
    list: [
      "<b>A</b>ssertion — one sentence claim.",
      "<b>R</b>easoning — why it's true, the logical chain.",
      "<b>E</b>vidence — example, statistic, case study, curriculum reference.",
      "<b>L</b>ink — back to the motion: 'so therefore the proposition / opposition wins.'"
    ]
  },
  {
    h: "Sample Practice Motions",
    list: [
      "This House would let AI write the next great novel.",
      "This House regrets the rise of social media influencers.",
      "This House believes Southeast Asia should pursue a single common currency.",
      "This House would prioritize space exploration over deep-sea exploration.",
      "This House, as Thailand, would abolish the lèse-majesté law.",
      "This House would make voting mandatory for everyone over 16.",
      "This House would rather live in a world without secrets.",
      "This House believes hip-hop has done more for global culture than rock and roll.",
      "This House would teach philosophy before science in primary schools.",
      "This House believes the Renaissance was overrated."
    ],
    fmt: "motions"
  },
  {
    h: "Refutation Phrases (Memorize These)",
    list: [
      "'My opponent claims X, but this misunderstands the resolution because…'",
      "'Even if we grant their premise, the conclusion does not follow because…'",
      "'They have given us a story, not a reason. The evidence shows…'",
      "'Their best argument was Y, and let me address it directly…'",
      "'On balance — weighing both sides — our case stands because…'"
    ]
  },
  {
    h: "Common Mistakes to Avoid",
    list: [
      "Speaking too fast — judges score what they can write down.",
      "Reading verbatim from notes — eye contact and tone matter.",
      "Spending 3 minutes on your first argument and 30 seconds on the rest.",
      "Ignoring the other team's strongest point.",
      "Not having a clear thesis sentence at the start of each speech.",
      "Personal attacks ('he doesn't know what he's talking about') — attack arguments, not people."
    ]
  },
  {
    h: "Prep-Time Checklist (15 minutes)",
    list: [
      "0-2 min: Brainstorm BOTH sides quickly to find the strongest opposition points.",
      "2-7 min: Pick your 3 main arguments. Write a one-line assertion for each.",
      "7-11 min: Sketch evidence/examples for each argument.",
      "11-13 min: Divide arguments across the three speakers.",
      "13-15 min: Write each speaker's opening line and closing line."
    ]
  },
  {
    h: "Showcase Debate (Top Performers Only)",
    body: "The top scoring debaters get invited to the Showcase Debate at the closing ceremony. It's a prestige event, not for scoring, but enormous fun. Treat regular rounds as practice for it."
  }
];

window.SC_TACTICS = [
  {
    h: "Two-Month Study Plan",
    list: [
      "<b>Week 1-2</b>: Read the official curriculum PDF in full. Highlight every name, date, work. Build a master glossary.",
      "<b>Week 3-4</b>: Drill flashcards daily (20 minutes). Run quizzes at 'Easy' difficulty in this dashboard.",
      "<b>Week 5-6</b>: Move to 'Medium' and 'Hard' quizzes. Hold mock debates with the team weekly.",
      "<b>Week 7</b>: Time yourself on 60-minute, 120-question mock Challenges.",
      "<b>Final week</b>: Review wrong-answer pile. Light flashcards only. Sleep, hydrate, REST."
    ]
  },
  {
    h: "Scholar's Challenge Strategy",
    list: [
      "Read all 5 options before picking. Eliminate the clearly wrong ones first.",
      "Pick 1 confident answer = full credit; pick 2 if torn = partial; pick 3-4 only if you can rule one out.",
      "<b>Never pick 4 of 5 unless you are CERTAIN one is wrong</b> — the math punishes you.",
      "Skip questions you have no clue on. Blank earns 0 but never loses points.",
      "Use full 60 minutes — there's no bonus for finishing early. Review skipped items.",
      "Watch for double-negatives, 'except', 'all of the following are true EXCEPT'."
    ]
  },
  {
    h: "Team Debate Strategy",
    list: [
      "Assign roles by strength: best researcher → Speaker 1, best thinker on feet → Speaker 2, best speaker → Speaker 3.",
      "Prepare a 'common arguments' deck for the team: climate, AI, free speech, etc. — most motions touch them.",
      "Always thank your judges and opponents at start and end. Style points.",
      "Smile. Project. Make eye contact with the judge, not the floor.",
      "If you're losing, focus on the strongest 1-2 issues — don't try to win everything."
    ]
  },
  {
    h: "Collaborative Writing Strategy",
    list: [
      "Read all six prompts together for 90 seconds. Each team member rates them 1-5 silently first.",
      "Pick the prompt with the highest median score — playing to collective strength.",
      "Plan: thesis + 2-3 paragraphs + closing. Don't try a 5-paragraph essay in 50 minutes.",
      "<b>Quote the curriculum.</b> Specific names, works, facts beat vague philosophizing.",
      "Last 5 minutes: stop writing, proofread, fix one weak sentence."
    ]
  },
  {
    h: "Scholar's Bowl Strategy",
    list: [
      "Designate one team member to keep finger near the pencil for every question.",
      "Don't argue past 5 seconds before the timer — pick the strongest guess and lock it.",
      "Even if you've never seen the image/clip, RULE OUT what you can. Partial credit > nothing.",
      "Watch for thematic threads — the same artist/composer/author often returns across questions.",
      "Eat a light snack before this event — it's late in the day and you'll be tired."
    ]
  },
  {
    h: "Thailand-Specific Regional Tips",
    list: [
      "<b>Climate</b>: Bangkok in May-Aug is hot & humid (30-35°C, monsoon). Carry water + light layers; venues are heavily air-conditioned.",
      "<b>Currency</b>: Thai Baht (฿). Get a small amount of cash for snacks/transport; cards widely accepted in hotels/malls.",
      "<b>Etiquette</b>: greet with a 'wai' (palms together, slight bow). Don't touch anyone's head; don't point feet at people or Buddha images.",
      "<b>Lèse-majesté</b>: do NOT make jokes about the Thai king or royal family — it's a serious criminal offense.",
      "<b>Food</b>: pad thai, tom yum, mango sticky rice. Note spice levels; ask for 'mai phet' (not spicy) if needed.",
      "<b>Transport</b>: BTS Skytrain and MRT are clean, fast, English-signed. Grab (rideshare) is reliable.",
      "<b>Power</b>: 220V, plug types A/B/C/F/O — bring a universal adapter.",
      "<b>SIM/Data</b>: AIS, TrueMove, dtac sell tourist SIMs at the airport for ~$10 / week."
    ]
  },
  {
    h: "Day-Before Competition Checklist",
    list: [
      "Sleep 8+ hours. NO last-minute cramming after 8pm.",
      "Eat a normal-sized dinner. Avoid trying new street food the night before.",
      "Pack: WSC ID, pencils (2H, not too dark), eraser, water bottle, light sweater, wristwatch.",
      "Check venue address and arrival time on the official WSC schedule app.",
      "Charge your phone fully; bring a power bank.",
      "Lay out your clothes — WSC has a dress code, usually smart casual."
    ]
  },
  {
    h: "Competition Day Mindset",
    list: [
      "Eat a real breakfast — eggs, fruit, water. Avoid heavy carbs that make you sleepy.",
      "Arrive 30 minutes early. Use bathroom before EVERY event.",
      "Between events: 5 minutes of silent walking, not phone scrolling.",
      "If one event goes badly, mentally close it — the next is independent.",
      "Make friends with other teams. WSC has a culture of warmth — alpacas, dance parties, late-night ice cream."
    ]
  },
  {
    h: "What Winners Do Differently",
    list: [
      "Build daily habits, not weekly cramming sessions.",
      "Read OUTSIDE the official PDF — current news, podcasts, museum visits.",
      "Drill the same question multiple times — recall, not recognition, is the goal.",
      "Practice debate aloud with a phone-camera, then watch it back. Cringe is the price of growth.",
      "Trust your gut on the first read of a multiple-choice question. Second-guessing usually loses points.",
      "Take notes in the curriculum margins. Active reading beats passive."
    ]
  }
];

window.SC_TIPS = [
  "Read the official WSC curriculum PDF in full before week 2 — your single source of truth.",
  "In Scholar's Challenge, picking 1 confident answer beats hedging with 3.",
  "Debate: end every speech with one memorable line. Judges remember the last 10 seconds.",
  "Writing: name a curriculum work in your first paragraph. It signals seriousness immediately.",
  "Bowl: assign a 'caller' on your team to lock the answer at the 5-second mark.",
  "Sleep > extra cramming the night before. Memory consolidates during sleep.",
  "Drink water between every event. Air-conditioned venues dry you out fast.",
  "Practice your 'wai' — Thai greeting. It's noticed and appreciated.",
  "Make friends across teams. Scholar's Cup is half competition, half community.",
  "Bring snacks. Lunch breaks are short and venue food is unpredictable.",
  "Re-read the prompt before writing your last paragraph. Most lost points come from drifting off-topic.",
  "Photograph (or screenshot) every page of the curriculum PDF so you can study offline.",
  "Make a mistake list. Don't review what you already know — review what you don't.",
  "Trust your first instinct on multiple choice. Changing answers usually loses points.",
  "Debate strategy beats debate style. A clear argument with a weak voice beats charm with no point."
];
