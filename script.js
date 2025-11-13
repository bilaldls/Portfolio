// Portfolio interactions, localisation, and rendering
(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const SUPPORTED_LANGS = ['fr', 'en'];
  const DEFAULT_LANG = 'fr';
  const STORAGE_KEY = 'portfolio-lang';
  const LANG_LOCALES = { fr: 'fr-FR', en: 'en-US' };

  const TRANSLATIONS = {
    fr: {
      'toggle.label': 'Version anglaise',
      'toggle.aria': 'Changer de langue',
      'nav.brand': 'Accueil',
      'nav.toggle': 'Ouvrir la navigation',
      'nav.toggle.open': 'Ouvrir la navigation',
      'nav.toggle.close': 'Fermer la navigation',
      'nav.home': 'Accueil',
      'nav.experiences': 'Expériences',
      'nav.projects': 'Projets',
      'nav.hobbies': 'Loisirs',
      'nav.contact': 'Contact',
      'nav.cv': 'CV',
      'hero.eyebrow': 'Intelligence artificielle &amp; Data',
      'hero.title': "Explorer à la croisée de l'IA et du spatial.",
      'hero.lede': "Je suis Bilal, futur ingénieur passionné par l’exploration spatiale et l’intelligence artificielle. À travers ce portfolio, je partage mes réalisations, mes expérimentations et les enseignements tirés de mes projets.",
      'hero.cta.projects': 'Voir mes projets',
      'hero.cta.contact': 'Me contacter',
      'hero.profile': 'Étudiant ingénieur • IA/ML',
      'hero.skill1': 'Deep Learning',
      'hero.skill2': 'Modélisation',
      'hero.skill3': 'Data Science',
      'hero.photo': 'Photo de Bilal Delais',
      'exp.hero.image': "Le campus de L'IMT Mines Alès",
      'exp.eyebrow': 'Expériences',
      'exp.title': 'A la croisée du monde professionnel et académique',
      'exp.lede': "Etant en formation d'ingénieur en intelligence artificielle et data à IMT Mines Alès, je suis sur le point de quitter le monde académique pour exploiter mes compétences en entreprise. Voici un aperçu de mon parcours professionnel et académique.",
      'exp.pro.title': 'Expériences professionnelles',
      'exp.pro.subtitle': 'Missions clés, responsabilités et résultats.',
      'exp.springlane.title': 'CTO — SpringLane',
      'exp.springlane.meta': 'SpringLane Juillet 2025 – présent · Paris, France - à distance',
      'exp.springlane.summary': "J'ai rejoint SpringLane en tant que CTO pour diriger le développement technique de leur écosystème innovant. Mon rôle consiste à superviser l'architecture logicielle, la gestion de l'infrastructure, et à encadrer l'équipe de développement.",
      'exp.springlane.point1': 'Conception et pilotage du développement d’un antivol basé sur les technologies RFID/NFC.',
      'exp.springlane.point2': 'Définition de la roadmap produit (hardware + software) et coordination du MVP.',
      'exp.springlane.point3': 'Optimisation de la BOM: réduction du coût unitaire des prototypes.',
      'exp.springlane.point4': 'Développement du firmware et d’une application de test pour la validation.',
      'exp.usam.title': 'Chef de projet — Data Science',
      'exp.usam.meta': 'USAM Nîmes · Janvier 2025 – Avril 2025 · Nîmes, France',
      'exp.usam.summary': 'Pilotage d’un projet de R&D pour l’équipe féminine de handball (Nationale 1).',
      'exp.usam.point1': 'Conception d’un pipeline d’analyse vidéo : détection d’événements , structuration des données et synchronisation.',
      'exp.usam.point2': 'Développement de modèles ML (régression logistique, XGBoost, forêts aléatoires) pour prédire les zones d’impact des tirs (zone de but subdivisée en 9 zones).',
      'exp.usam.point3': 'Évaluation via des métriques avancées (F1-score, Brier score, AUC) et protocoles de validation croisée.',
      'exp.agena.title': 'Stage R&amp;D — Conception Mécanique de Systèmes Propulsifs',
      'exp.agena.meta': 'Agena Space · Août 2024 – Décembre 2024 · Talence, France',
      'exp.agena.summary': 'Contribution au développement de systèmes propulsifs HTP pour nanosatellites : conception et intégration.',
      'exp.agena.point1': 'Conception et modification de modèles 3D de composants et systèmes (SolidWorks).',
      'exp.agena.point2': 'Production de plans techniques détaillés et dossiers d’assemblage.',
      'exp.agena.point3': 'Participation à la fabrication et à l’assemblage de prototypes.',
      'exp.agena.point4': 'Intégration et mise en place de sous-systèmes de propulsion.',
      'exp.edu.title': 'Parcours académique',
      'exp.edu.subtitle': 'Formation et spécialisations.',
      'exp.edu.imt.title': 'École d’ingénieurs — Spécialisation IA &amp; Data',
      'exp.edu.imt.meta': '2022 – 2026 · IMT Mines Alès',
      'exp.edu.imt.summary': 'Parcours Ingénieur avec double compétence systèmes mécatroniques et intelligence artificielle / data. En effet, après avoir réjoint le département mécatronique en 2023, j\'ai rédoublé afin d\'intégrer la spécialisation IA &amp; Data en 2024.',
      'exp.edu.imt.courses-intro': 'Parmi les cours suivis :',
      'exp.edu.imt.course1': 'apprentissage automatique supervisé et non supervisé',
      'exp.edu.imt.course2': 'deep learning (CNN, RNN)',
      'exp.edu.imt.course3': 'apprentissage par renforcement',
      'exp.edu.imt.course4': 'collecte et visualisation de données',
      'exp.edu.imt.course5': 'statistiques et probabilités avancées',
      'exp.edu.imt.course6': 'aide à la décision',
      'exp.edu.imt.course7': 'calcul et analyse numérique',
      'exp.edu.imt.assos-intro': 'J\'ai également participé à plusieurs associations étudiantes :',
      'exp.edu.imt.asso1': "Président du Comité Oenologie (gestion d'évènements, partenariats, budget).",
      'exp.edu.imt.asso2': "Membre de l'équipe de basketball \"Les Gorilles\"",
      'exp.edu.imt.asso3': "Responsable bourse pour l'association de solidarité internationale Tsiky Zanaka",
      'exp.edu.cpge.title': 'Classes préparatoires scientifiques PCSI - PSI',
      'exp.edu.cpge.meta': '2019 – 2022 · Lycée Gustave Eiffel, Bordeaux',
      'exp.edu.cpge.summary': 'Formation intensive en mathématiques, physique et informatique, préparant aux concours des grandes écoles d’ingénieurs.',
      'exp.edu.bac.title': 'Baccalauréat scientifique — Sciences de l’ingénieur',
      'exp.edu.bac.meta': '2018 – 2019 · Lycée Albert Claveille, Périgueux',
      'exp.edu.bac.summary': 'Approche pluridisciplinaire mêlant mathématiques avancées et sciences de l’ingénieur avec réalisation de projets techniques.',
      'projects.eyebrow': 'Sélection de projets',
      'projects.title': 'Mes projets académique et personnels.',
      'projects.lede': "Ceci est le catalogue de mes projets en intelligence artificielle et machine learning, réalisés dans le cadre de ma formation d'ingénieur ou par passion.",
      'projects.card.title': 'Explorateur de projets',
      'projects.card.copy': 'Filtrez par compétences ou recherchez un mot-clé pour en savoir plus.',
      'projects.card.image': 'Aperçu de projets IA et data',
      'projects.card.aria': 'Illustration des projets',
      'projects.library.title': 'Bibliothèque de projets',
      'projects.library.search-label': 'Rechercher un projet',
      'projects.library.search': 'Rechercher un projet...',
      'projects.library.sort': 'Trier par date',
      'projects.library.newest': 'Plus récents',
      'projects.library.oldest': 'Plus anciens',
      'projects.library.all': 'Tous',
      'projects.library.empty': 'Aucun projet ne correspond à votre recherche.',
      'hobbies.eyebrow': 'Au-delà de l’IA',
      'hobbies.title': 'Cultiver la curiosité et <span class="accent-underline">l’équilibre</span> au quotidien.',
      'hobbies.lede': "Sport collectif, balades à moto, tournoi d'échecs… Ces activités nourrissent ma créativité et renforcent l’esprit d’équipe que j’apporte à mes projets.",
      'hobbies.section.title': 'Loisirs &amp; passions',
      'hobbies.section.subtitle': 'Ce qui me motive en dehors du clavier.',
      'hobbies.hero.image': 'Moment de loisir à moto',
      'hobbies.basket.title': 'Basketball &amp; esprit d’équipe',
      'hobbies.basket.meta': 'Club universitaire · Ailier fort',
      'hobbies.basket.summary': "Le basketball m’apprend la stratégie, la réactivité et la communication en temps réel. Sur le terrain, chaque décision prise en une fraction de seconde influence le collectif : un excellent parallèle avec les projets tech. Joueur depuis le collège, j’ai évolué en équipe universitaire et participé à plusieurs tournois (cf linkedin). Je continue aujourd'hui cette pratique au sein de l'équipe de l'école IMT Mines Alès : les gorilles d'Alès. (cf photo)",
      'hobbies.basket.fig1': 'L\'équipe au "Cartel des Mines" - un tournois inter école d\'ingénieurs',
      'hobbies.basket.fig2': 'L’équipe au Championnats de france universitaire 2024-2025',
      'hobbies.basket.img1': 'Equipe de basketball universitaire',
      'hobbies.basket.img2': 'Championnat de france',
      'hobbies.moto.title': 'Moto et création de contenu',
      'hobbies.moto.meta': 'Voyages et créativité',
      'hobbies.moto.summary': "J'aime me balader à moto et filmer mes aventures. La moto combine pour moi passion, rigueur et créativité : la conduite m'apprend à gérer la prise de risque, la concentration et la réactivité. J'essaye d'accompagner cette pratique avec la création de contenu vidéo autour de mon expérience. Cela me permet de développer mes compétences en montage vidéo et storytelling, utiles pour valoriser un projet ou une idée.",
      'hobbies.moto.fig1': 'Sortie à moto',
      'hobbies.moto.fig2': 'Sortie le soir',
      'hobbies.moto.fig3': 'Photographie de ma moto',
      'hobbies.moto.img1': 'Photo de moi à moto',
      'hobbies.moto.img2': 'Photo coucher de soleil',
      'hobbies.moto.img3': 'Photo de ma moto',
      'hobbies.chess.title': "Joueur d'échecs amateur",
      'hobbies.chess.meta': 'Reflexion, et jeux de société',
      'hobbies.chess.summary': "La pratique des échecs nourrit ma capacité d'analyse et mon esprit stratégique. C'est une école de patience, de logique et de résilience, où l'erreur devient une source d'apprentissage. Ces qualités se traduisent directement dans mon approche des projets techniques, où planification et adaptation sont clés.",
      'hobbies.chess.fig1': "Plateau de jeu en cours de partie",
      'hobbies.chess.fig2': 'Enregistrement d’un podcast de vulgarisation',
      'hobbies.chess.img1': "Partie d'échecs",
      'hobbies.chess.img2': 'Podcast IA',
      'contact.eyebrow': 'Entrons en contact',
      'contact.title': 'Contactez moi ou découvrez mes autres travaux.',
      'contact.lede': "Je suis ouvert aux stages, aux collaborations et aux défis concrets qu'ils soient liés au spatial ou non. Écrivez-moi afin d'en discuter plus en détails.",
      'contact.cta.email': 'Écrivez-moi',
      'contact.cta.linkedin': 'LinkedIn',
      'contact.cta.github': 'GitHub',
      'contact.image': 'Bilal Delais en échange professionnel',
      'footer.note': '© <span id="year"></span> Bilal Delais. Réalisé avec HTML/CSS/JS.',
      'footer.back': 'Retour en haut',
      'exp.usam.meta-short': 'Janvier 2025 – Avril 2025 · Nîmes',
      'exp.usam.summary-long': "Analyse de performance pour une équipe professionnelle de handball : prédiction des zones d’impact au tir et insights pour le staff technique.",
      'exp.usam.detail1': 'Construction d’un dataset vidéo enrichi de variables contextuelles (position, défense, type de tir).',
      'exp.usam.detail2': 'Ensemble de modèles (régression, k-NN, forêts aléatoires, XGBoost) comparés via une grille d’indicateurs.',
      'exp.usam.detail3': 'Restitution via dashboards interactifs et recommandations tactiques pour les coachs.',
      'exp.agena.meta-short': 'Août 2024 – Décembre 2024 · Bordeaux',
      'exp.agena.summary-long': 'Contribution au développement de systèmes propulsifs HTP pour nanosatellites : conception, intégration et tests.',
      'exp.agena.detail1': 'Modélisation 3D (SolidWorks) de supports moteurs et bancs fluidiques.',
      'exp.agena.detail2': 'Assemblage et intégration d’un système fluidique complet pour essais au sol.',
      'exp.agena.detail3': 'Documentation technique et coordination avec l’équipe test pour fiabiliser les protocoles.',
      'exp.edu.imt.summary-short': 'Parcours Ingénieur avec double compétence systèmes mécatroniques et intelligence artificielle / data.',
      'exp.edu.imt.detail1': 'Projet de recherche : segmentation d’images satellite multi-temporelles.',
      'exp.edu.imt.detail2': 'Responsable du laboratoire étudiant data : organisation de workshops et mentoring.',
      'exp.edu.cpge.detail1': 'Projets interdisciplinaires : robotique, systèmes embarqués, physique appliquée.',
      'project.poker.title': "Prédiction de résultats d'une partie de Poker",
      'project.poker.meta': 'Machine learning • Data Science • 2024',
      'project.poker.context.title': 'Contexte',
      'project.poker.context.copy': "Projet de modélisation autour du poker visant à estimer la probabilité de victoire d’un joueur à chaque étape de la partie. Constitution d’un dataset à partir de mains historiques, extraction de features de jeu (position, mises, style), puis entraînement de modèles gradient boosting et réseaux neuronaux pour comparer leurs performances.",
      'project.poker.approach.title': 'Approche &amp; outils',
      'project.poker.approach.item1': 'Python, scikit-learn, XGBoost pour la modélisation',
      'project.poker.approach.item2': 'Analyse exploratoire sous pandas/seaborn',
      'project.poker.approach.item3': 'Prétraitement des données : encodage des variables catégorielles, gestion des valeurs manquantes, normalisation',
      'project.poker.approach.item4': 'Évaluation des modèles via cross-validation, optimisation des hyperparamètres avec recherche en grille',
      'project.handball.title': 'Analyse prédictive des zones de tirs en handball',
      'project.handball.meta': 'Machine learning • Data Science • 2024',
      'project.handball.context.title': 'Contexte',
      'project.handball.context.copy': "Analyse des zones de tirs d’une équipe professionnelle de handball afin d’identifier les schémas offensifs les plus rentables. Construction d’un jeu de données à partir de relevés vidéo, géolocalisation des tirs et modélisation des probabilités de succès selon la position, le type d’action et la pression défensive.",
      'project.handball.approach.title': 'Approche &amp; outils',
      'project.handball.approach.item1': 'Conception d’un pipeline d’analyse vidéo : détection d’événements, structuration des données et synchronisation.',
      'project.handball.approach.item2': 'Développement de modèles de ML (régression logistique, XGBoost, forêts aléatoires) pour prédire les zones d’impact des tirs (zone de but subdivisé en 9 zones).',
      'project.handball.approach.item3': 'Évaluation via des métriques avancées (F1 score, Brier Score, AUC) et des protocoles de validation croisée.',
      'project.links': 'Liens',
      'project.code': 'Code',
      'project.back': 'Retour aux projets'
    },
    en: {
      'toggle.label': 'Version française',
      'toggle.aria': 'Switch language',
      'nav.brand': 'Back to top',
      'nav.toggle': 'Open navigation',
      'nav.toggle.open': 'Open navigation',
      'nav.toggle.close': 'Close navigation',
      'nav.home': 'Home',
      'nav.experiences': 'Experience',
      'nav.projects': 'Projects',
      'nav.hobbies': 'Hobbies',
      'nav.contact': 'Contact',
      'nav.cv': 'Resume',
      'hero.eyebrow': 'Artificial Intelligence &amp; Data',
      'hero.title': 'Exploring where AI meets space.',
      'hero.lede': "I'm Bilal, an engineering student passionate about space exploration and artificial intelligence. This portfolio highlights my projects, experiments, and the lessons learned along the way.",
      'hero.cta.projects': 'View my projects',
      'hero.cta.contact': 'Contact me',
      'hero.profile': 'Engineering student • AI/ML',
      'hero.skill1': 'Deep Learning',
      'hero.skill2': 'Modeling',
      'hero.skill3': 'Data Science',
      'hero.photo': 'Photo of Bilal Delais',
      'exp.hero.image': 'IMT Mines Alès campus',
      'exp.eyebrow': 'Experience',
      'exp.title': 'Where the professional and academic worlds meet',
      'exp.lede': "As an AI and data engineering student at IMT Mines Alès, I'm getting ready to put my skills to work in industry. Here's a snapshot of my professional and academic journey.",
      'exp.pro.title': 'Professional experience',
      'exp.pro.subtitle': 'Key missions, responsibilities, and outcomes.',
      'exp.springlane.title': 'CTO — SpringLane',
      'exp.springlane.meta': 'SpringLane July 2025 – present · Paris, France — remote',
      'exp.springlane.summary': "I joined SpringLane as CTO to lead the technical development of their innovative ecosystem. I oversee software architecture, infrastructure management, and mentor the engineering team.",
      'exp.springlane.point1': 'Designed and piloted the development of an RFID/NFC-based anti-theft solution.',
      'exp.springlane.point2': 'Defined the hardware and software product roadmap and coordinated the MVP.',
      'exp.springlane.point3': 'Optimised the bill of materials, cutting prototype unit costs.',
      'exp.springlane.point4': 'Developed the firmware and a testing application for validation.',
      'exp.usam.title': 'Data Science Project Lead',
      'exp.usam.meta': 'USAM Nîmes · January 2025 – April 2025 · Nîmes, France',
      'exp.usam.summary': 'Led an R&D project for the USAM women’s handball team (French National 1).',
      'exp.usam.point1': 'Built a video analytics pipeline covering event detection, data structuring, and synchronisation.',
      'exp.usam.point2': 'Developed ML models (logistic regression, XGBoost, random forests) to predict shot impact zones (goal divided into 9 areas).',
      'exp.usam.point3': 'Evaluated models using advanced metrics (F1-score, Brier score, AUC) and cross-validation protocols.',
      'exp.agena.title': 'R&D Internship — Propulsion System Design',
      'exp.agena.meta': 'Agena Space · August 2024 – December 2024 · Talence, France',
      'exp.agena.summary': 'Contributed to HTP propulsion systems for nanosatellites, from design to integration.',
      'exp.agena.point1': 'Designed and adapted 3D models for components and assemblies (SolidWorks).',
      'exp.agena.point2': 'Produced detailed technical drawings and assembly files.',
      'exp.agena.point3': 'Helped manufacture and assemble prototypes.',
      'exp.agena.point4': 'Integrated propulsion subsystems and supported on-site installation.',
      'exp.edu.title': 'Academic journey',
      'exp.edu.subtitle': 'Education and specialisations.',
      'exp.edu.imt.title': 'Engineering school — AI &amp; Data major',
      'exp.edu.imt.meta': '2022 – 2026 · IMT Mines Alès',
      'exp.edu.imt.summary': 'Engineering track combining mechatronic systems and AI/data. After joining the mechatronics department in 2023, I repeated a year to specialise in AI &amp; Data in 2024.',
      'exp.edu.imt.courses-intro': 'Selected courses:',
      'exp.edu.imt.course1': 'Supervised and unsupervised machine learning',
      'exp.edu.imt.course2': 'Deep learning (CNN, RNN)',
      'exp.edu.imt.course3': 'Reinforcement learning',
      'exp.edu.imt.course4': 'Data collection and visualisation',
      'exp.edu.imt.course5': 'Advanced statistics and probability',
      'exp.edu.imt.course6': 'Decision support',
      'exp.edu.imt.course7': 'Numerical analysis and computation',
      'exp.edu.imt.assos-intro': 'I also took part in several student associations:',
      'exp.edu.imt.asso1': 'President of the Oenology Committee (events, partnerships, budgeting).',
      'exp.edu.imt.asso2': "Member of the 'Les Gorilles' basketball team.",
      'exp.edu.imt.asso3': 'Scholarship lead for the Tsiky Zanaka international solidarity association.',
      'exp.edu.cpge.title': 'Scientific preparatory classes PCSI - PSI',
      'exp.edu.cpge.meta': '2019 – 2022 · Lycée Gustave Eiffel, Bordeaux',
      'exp.edu.cpge.summary': 'Intensive mathematics, physics, and computer science programme preparing for French engineering school entrance exams.',
      'exp.edu.bac.title': 'Scientific baccalaureate — Engineering sciences',
      'exp.edu.bac.meta': '2018 – 2019 · Lycée Albert Claveille, Périgueux',
      'exp.edu.bac.summary': 'Cross-disciplinary curriculum combining advanced mathematics and engineering sciences with hands-on technical projects.',
      'projects.eyebrow': 'Project highlights',
      'projects.title': 'My academic and personal projects.',
      'projects.lede': 'A catalogue of AI and machine learning projects completed during my engineering studies and personal explorations.',
      'projects.card.title': 'Project explorer',
      'projects.card.copy': 'Filter by skills or search a keyword to dive deeper.',
      'projects.card.image': 'Preview of AI and data projects',
      'projects.card.aria': 'Projects illustration',
      'projects.library.title': 'Project library',
      'projects.library.search-label': 'Search a project',
      'projects.library.search': 'Search a project...',
      'projects.library.sort': 'Sort by date',
      'projects.library.newest': 'Newest',
      'projects.library.oldest': 'Oldest',
      'projects.library.all': 'All',
      'projects.library.empty': 'No project matches your search.',
      'hobbies.eyebrow': 'Beyond AI',
      'hobbies.title': 'Cultivating curiosity and <span class="accent-underline">balance</span> every day.',
      'hobbies.lede': 'Team sports, motorcycle rides, chess tournaments… These activities fuel my creativity and the team spirit I bring to my projects.',
      'hobbies.section.title': 'Hobbies &amp; passions',
      'hobbies.section.subtitle': 'What drives me away from the keyboard.',
      'hobbies.hero.image': 'Moment of leisure on a motorbike',
      'hobbies.basket.title': 'Basketball &amp; team spirit',
      'hobbies.basket.meta': 'University club · Power forward',
      'hobbies.basket.summary': 'Basketball teaches me strategy, responsiveness, and real-time communication. Every split-second decision impacts the team—just like in tech projects. I have played since middle school, competed at university level, and took part in several tournaments. I currently play with the IMT Mines Alès team: the Gorilles d’Alès.',
      'hobbies.basket.fig1': 'Team photo at the “Cartel des Mines” engineering schools tournament',
      'hobbies.basket.fig2': 'Team at the 2024-2025 French university championships',
      'hobbies.basket.img1': 'University basketball team',
      'hobbies.basket.img2': 'French championship',
      'hobbies.moto.title': 'Motorcycling &amp; content creation',
      'hobbies.moto.meta': 'Travel and creativity',
      'hobbies.moto.summary': 'I enjoy riding my motorbike and filming my trips. Riding combines passion, discipline, and creativity: it sharpens risk management, focus, and responsiveness. I complement it with video storytelling to build editing skills that help me showcase projects and ideas.',
      'hobbies.moto.fig1': 'Motorcycle ride',
      'hobbies.moto.fig2': 'Evening ride',
      'hobbies.moto.fig3': 'Photo of my bike',
      'hobbies.moto.img1': 'Photo of me on a motorbike',
      'hobbies.moto.img2': 'Sunset ride',
      'hobbies.moto.img3': 'Motorbike portrait',
      'hobbies.chess.title': 'Amateur chess player',
      'hobbies.chess.meta': 'Critical thinking &amp; board games',
      'hobbies.chess.summary': 'Playing chess sharpens my analytical skills and strategic mindset. It is a lesson in patience, logic, and resilience where mistakes become learning opportunities—just like in engineering projects where planning and adaptation are key.',
      'hobbies.chess.fig1': 'Chessboard mid-game',
      'hobbies.chess.fig2': 'Recording a science outreach podcast',
      'hobbies.chess.img1': 'Chess match',
      'hobbies.chess.img2': 'AI podcast',
      'contact.eyebrow': 'Get in touch',
      'contact.title': 'Reach out or explore more of my work.',
      'contact.lede': 'I am open to internships, collaborations, and hands-on challenges—space-related or not. Drop me a line so we can discuss it in more detail.',
      'contact.cta.email': 'Email me',
      'contact.cta.linkedin': 'LinkedIn',
      'contact.cta.github': 'GitHub',
      'contact.image': 'Bilal Delais on a professional exchange',
      'footer.note': '© <span id="year"></span> Bilal Delais. Built with HTML/CSS/JS.',
      'footer.back': 'Back to top',
      'exp.usam.meta-short': 'January 2025 – April 2025 · Nîmes',
      'exp.usam.summary-long': 'Performance analysis for a professional handball team: predicting shot impact zones and delivering actionable insights to the coaching staff.',
      'exp.usam.detail1': 'Built a video dataset enriched with contextual variables (position, defence, shot type).',
      'exp.usam.detail2': 'Compared multiple models (regression, k-NN, random forests, XGBoost) using a comprehensive indicator grid.',
      'exp.usam.detail3': 'Delivered interactive dashboards and tactical recommendations for the coaches.',
      'exp.agena.meta-short': 'August 2024 – December 2024 · Bordeaux',
      'exp.agena.summary-long': 'Supported the development of HTP propulsion systems for nanosatellites, from design to testing.',
      'exp.agena.detail1': 'Modelled motor mounts and fluidic rigs in SolidWorks.',
      'exp.agena.detail2': 'Assembled and integrated a complete fluidic system for ground testing.',
      'exp.agena.detail3': 'Produced technical documentation and coordinated with the testing team to secure protocols.',
      'exp.edu.imt.summary-short': 'Engineering track combining mechatronic systems and AI/data.',
      'exp.edu.imt.detail1': 'Research project: segmentation of multi-temporal satellite imagery.',
      'exp.edu.imt.detail2': 'Head of the student data lab: organised workshops and mentoring.',
      'exp.edu.cpge.detail1': 'Interdisciplinary projects: robotics, embedded systems, applied physics.',
      'project.poker.title': 'Predicting poker game outcomes',
      'project.poker.meta': 'Machine learning • Data Science • 2024',
      'project.poker.context.title': 'Context',
      'project.poker.context.copy': 'Modelling project estimating a player’s winning probability at each stage of a poker game. Built a dataset from historical hands, engineered gameplay features (position, betting, style), and trained gradient boosting and neural network models to compare performance.',
      'project.poker.approach.title': 'Approach &amp; tools',
      'project.poker.approach.item1': 'Python, scikit-learn, XGBoost for modelling',
      'project.poker.approach.item2': 'Exploratory analysis with pandas/seaborn',
      'project.poker.approach.item3': 'Data preprocessing: categorical encoding, missing value handling, normalization',
      'project.poker.approach.item4': 'Model evaluation via cross-validation, hyperparameter tuning with grid search',
      'project.handball.title': 'Predictive analysis of handball shot zones',
      'project.handball.meta': 'Machine learning • Data Science • 2024',
      'project.handball.context.title': 'Context',
      'project.handball.context.copy': 'Analysed shot zones for a professional handball team to reveal the most effective offensive patterns. Built a video-derived dataset, geolocated shots, and modelled success probabilities based on position, action type, and defensive pressure.',
      'project.handball.approach.title': 'Approach &amp; tools',
      'project.handball.approach.item1': 'Designed a video analysis pipeline: event detection, data structuring, and synchronization.',
      'project.handball.approach.item2': 'Developed ML models (logistic regression, XGBoost, random forests) to predict shot impact zones (goal divided into 9 sub-areas).',
      'project.handball.approach.item3': 'Evaluated performance using advanced metrics (F1 score, Brier score, AUC) and cross-validation protocols.',
      'project.links': 'Links',
      'project.code': 'Code',
      'project.back': 'Back to projects'
    }
  };

  const root = document.documentElement;
  const body = document.body;
  const resumeBase = body.dataset.resumeBase || '';

  const rawProjects = Array.isArray(globalThis.PROJECTS) ? globalThis.PROJECTS : [];
  let currentLang = DEFAULT_LANG;
  let dateFormatter = new Intl.DateTimeFormat(LANG_LOCALES[DEFAULT_LANG], { month: 'short', year: 'numeric' });

  const navToggle = $('.nav-toggle');
  const sideNav = $('#side-nav');
  const langToggleBtn = $('#language-toggle');

  const shapes = $$('.floating.shape');
  const scrollShapes = $$('.scroll-shape');

  const revealElements = $$('.reveal');
  const supportsIntersectionObserver = typeof window.IntersectionObserver === 'function';
  let io = null;

  if (supportsIntersectionObserver) {
    io = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });
  }

  function observeReveal(el) {
    if (!el) return;
    if (io) {
      io.observe(el);
    } else {
      el.classList.add('active');
    }
  }

  revealElements.forEach(observeReveal);

  function localeFor(lang) {
    return LANG_LOCALES[lang] || LANG_LOCALES[DEFAULT_LANG];
  }

  function getDateFormatter(lang) {
    try {
      return new Intl.DateTimeFormat(localeFor(lang), { month: 'short', year: 'numeric' });
    } catch (err) {
      return new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' });
    }
  }

  function t(lang, key) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG] || {};
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    const fallback = TRANSLATIONS[DEFAULT_LANG] || {};
    return fallback[key] || '';
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    if (Number.isNaN(dateObj.getTime())) return dateStr;
    return dateFormatter.format(dateObj);
  }

  function getDateValue(dateStr) {
    if (!dateStr) return 0;
    const value = new Date(dateStr).getTime();
    return Number.isNaN(value) ? 0 : value;
  }

  function updateYear() {
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function applyTranslations(lang) {
    $$('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (key) el.innerHTML = t(lang, key);
    });
    $$('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (key) el.setAttribute('placeholder', t(lang, key));
    });
    $$('[data-i18n-aria-label]').forEach((el) => {
      const key = el.dataset.i18nAriaLabel;
      if (key) el.setAttribute('aria-label', t(lang, key));
    });
    $$('[data-i18n-alt]').forEach((el) => {
      const key = el.dataset.i18nAlt;
      if (key) el.setAttribute('alt', t(lang, key));
    });
  }

  function updateCvLinks(lang) {
    const file = lang === 'en' ? 'resume_english.pdf' : 'resume_french.pdf';
    const href = `${resumeBase}assets/${file}`;
    $$('.cv-link').forEach((link) => link.setAttribute('href', href));
  }

  function setNavOpen(open) {
    body.classList.toggle('nav-open', open);
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.textContent = open ? '✕' : '☰';
      const labelKey = open ? 'nav.toggle.close' : 'nav.toggle.open';
      navToggle.setAttribute('aria-label', t(currentLang, labelKey));
    }
    if (sideNav) {
      sideNav.setAttribute('aria-hidden', String(!open));
      if (typeof sideNav.toggleAttribute === 'function') {
        sideNav.toggleAttribute('inert', !open);
      } else if (!open) {
        sideNav.setAttribute('inert', '');
      } else {
        sideNav.removeAttribute('inert');
      }
    }
  }

  if (navToggle && sideNav) {
    setNavOpen(false);

    navToggle.addEventListener('click', () => {
      setNavOpen(!body.classList.contains('nav-open'));
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) {
        setNavOpen(false);
        navToggle.focus();
      }
    });

    $$('#side-nav .nav a').forEach((link) => {
      link.addEventListener('click', () => setNavOpen(false));
    });

    document.addEventListener('click', (e) => {
      if (!body.classList.contains('nav-open')) return;
      if (sideNav.contains(e.target) || navToggle.contains(e.target)) return;
      setNavOpen(false);
    });
  }

  // Smooth scrolling for internal links
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const target = $(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  window.addEventListener('pointermove', (e) => {
    const x = `${e.clientX}px`;
    const y = `${e.clientY}px`;
    root.style.setProperty('--mx', x);
    root.style.setProperty('--my', y);
    if (shapes.length) parallax(e);
  });

  function parallax(e) {
    if (!shapes.length) return;
    const { innerWidth: w, innerHeight: h } = window;
    const dx = e.clientX / w - 0.5;
    const dy = e.clientY / h - 0.5;
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 10;
      const base = shape.dataset.base ? ` ${shape.dataset.base}` : '';
      shape.style.transform = `translate3d(${(dx * speed).toFixed(2)}px, ${(dy * speed).toFixed(2)}px, 0)${base}`;
    });
  }

  let scrollTicking = false;
  function updateScrollShapes() {
    if (!scrollShapes.length) {
      scrollTicking = false;
      return;
    }
    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;
    const docH = Math.max(document.body.scrollHeight - viewportH, 1);
    const progress = scrollY / docH;

    scrollShapes.forEach((shape, idx) => {
      const dir = idx % 2 === 0 ? 1 : -1;
      const depth = 24 + idx * 14;
      const offsetY = scrollY * (0.04 + idx * 0.008) * dir + depth * (progress - 0.5);
      const offsetX = Math.sin(scrollY / 140 + idx) * (18 + idx * 6) * dir;
      shape.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0)`;
    });

    scrollTicking = false;
  }

  function requestScrollUpdate() {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(updateScrollShapes);
    }
  }

  updateScrollShapes();
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });

  // Magnetic buttons
  $$('.magnetic').forEach((btn) => {
    const strength = 20;
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
      const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  });

  // Projects module
  function initProjects() {
    const grid = $('#projects-grid');
    if (!grid) return null;

    const filtersEl = $('#filters');
    const searchInput = $('#projects-search');
    const sortButtons = $$('.sort-option');
    const ALL_TAG = '__all__';

    const state = {
      activeTag: ALL_TAG,
      searchValue: '',
      sortOrder: 'newest',
      projects: []
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchValue = e.target.value;
        render(currentLang);
      });
    }

    if (sortButtons.length) {
      sortButtons.forEach((btn) => {
        const isActive = btn.classList.contains('active');
        btn.setAttribute('aria-pressed', String(isActive));
        if (isActive && btn.dataset.sort) state.sortOrder = btn.dataset.sort;
        btn.addEventListener('click', () => {
          state.sortOrder = btn.dataset.sort || 'newest';
          sortButtons.forEach((other) => {
            const active = other === btn;
            other.classList.toggle('active', active);
            other.setAttribute('aria-pressed', String(active));
          });
          render(currentLang);
        });
      });
    }

    function getLocalizedProjects(lang) {
      const fallback = TRANSLATIONS[DEFAULT_LANG] || {};
      return rawProjects.map((project) => {
        const translation = project.translations?.[lang] || project.translations?.[DEFAULT_LANG] || {};
        const fallbackTranslation = project.translations?.[DEFAULT_LANG] || {};
        const tagIds = Array.isArray(project.tags) ? project.tags : [];
        const tags = tagIds.map((id) => ({
          id,
          label: translation.tags?.[id] || fallbackTranslation.tags?.[id] || id
        }));
        return {
          id: project.id,
          cover: project.cover,
          date: project.date,
          detail: project.detail,
          links: project.links || {},
          title: translation.title || fallbackTranslation.title || project.title || '',
          description: translation.description || fallbackTranslation.description || project.description || '',
          tags,
          tagIds
        };
      });
    }

    function buildFilters(lang) {
      if (!filtersEl) return;
      filtersEl.innerHTML = '';
      const map = new Map();
      state.projects.forEach((project) => {
        project.tags.forEach((tag) => {
          if (!map.has(tag.id)) map.set(tag.id, tag.label);
        });
      });
      const locale = localeFor(lang);
      const sortedTags = Array.from(map.entries()).sort((a, b) => a[1].localeCompare(b[1], locale));

      const createButton = (tagId, label) => {
        const btn = document.createElement('button');
        btn.className = 'chip' + (state.activeTag === tagId ? ' active' : '');
        btn.dataset.tag = tagId;
        btn.textContent = label;
        btn.addEventListener('click', () => {
          state.activeTag = tagId;
          buildFilters(lang);
          render(lang);
        });
        filtersEl.appendChild(btn);
      };

      createButton(ALL_TAG, t(lang, 'projects.library.all'));
      sortedTags.forEach(([id, label]) => createButton(id, label));
    }

    function projectCard(project) {
      const el = document.createElement('article');
      el.className = 'card project-card reveal';
      if (project.detail) {
        el.classList.add('is-clickable');
        el.setAttribute('role', 'link');
        el.tabIndex = 0;
      }
      const tagsMarkup = project.tags.map((tag) => `<span class="chip">${tag.label}</span>`).join('');
      el.innerHTML = `
        <div class="project-thumb"></div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-meta">
          <div class="tags">${tagsMarkup}</div>
          <div class="links">
            ${project.links?.github ? `<a href="${project.links.github}" target="_blank" aria-label="GitHub">GitHub</a>` : ''}
            ${project.links?.paper ? `<a href="${project.links.paper}" target="_blank" aria-label="Paper">Paper</a>` : ''}
          </div>
        </div>`;

      if (project.cover) {
        const thumbEl = el.querySelector('.project-thumb');
        const safe = String(project.cover).replace(/[^a-zA-Z0-9.\-_/]/g, '');
        thumbEl.innerHTML = `<img src="assets/images/${safe}" alt="${project.title} cover" />`;
      }

      if (project.date) {
        const desc = el.querySelector('.project-desc');
        const timeEl = document.createElement('time');
        timeEl.className = 'project-date';
        timeEl.dateTime = project.date;
        timeEl.textContent = formatDate(project.date);
        desc.insertAdjacentElement('afterend', timeEl);
      }

      const strength = 12;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
      });

      if (project.detail) {
        const go = () => { window.location.href = project.detail; };
        el.addEventListener('click', (event) => {
          if (event.target.closest('.links a')) return;
          go();
        });
        el.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            go();
          }
        });
      }

      observeReveal(el);
      return el;
    }

    function render(lang) {
      grid.innerHTML = '';
      const locale = localeFor(lang);
      const searchTerm = state.searchValue.trim().toLocaleLowerCase(locale);

      const source = state.activeTag === ALL_TAG
        ? state.projects
        : state.projects.filter((project) => project.tagIds.includes(state.activeTag));

      const filtered = searchTerm
        ? source.filter((project) => {
            const haystack = [
              project.title,
              project.description,
              project.tags.map((tag) => tag.label).join(' '),
              project.date,
              project.date ? formatDate(project.date) : ''
            ].join(' ').toLocaleLowerCase(locale);
            return haystack.includes(searchTerm);
          })
        : source;

      const sorted = filtered.slice().sort((a, b) => {
        const diff = state.sortOrder === 'oldest'
          ? getDateValue(a.date) - getDateValue(b.date)
          : getDateValue(b.date) - getDateValue(a.date);
        if (diff !== 0) return diff;
        return a.title.localeCompare(b.title, locale);
      });

      if (!sorted.length) {
        const empty = document.createElement('p');
        empty.className = 'muted empty-state';
        empty.textContent = t(lang, 'projects.library.empty');
        grid.appendChild(empty);
        return;
      }

      sorted.forEach((project) => {
        grid.appendChild(projectCard(project));
      });
    }

    function updateLanguage(lang) {
      dateFormatter = getDateFormatter(lang);
      state.projects = getLocalizedProjects(lang);
      buildFilters(lang);
      render(lang);
    }

    return { updateLanguage, render };
  }

  const projectsModule = initProjects();

  function setLanguage(lang, { persist = true } = {}) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;
    currentLang = lang;
    dateFormatter = getDateFormatter(lang);
    document.documentElement.setAttribute('lang', lang);
    applyTranslations(lang);
    updateYear();
    updateCvLinks(lang);
    projectsModule?.updateLanguage(lang);
    setNavOpen(body.classList.contains('nav-open'));
    if (persist) localStorage.setItem(STORAGE_KEY, lang);
  }

  const storedLang = localStorage.getItem(STORAGE_KEY);
  setLanguage(storedLang && SUPPORTED_LANGS.includes(storedLang) ? storedLang : DEFAULT_LANG, { persist: false });

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      setLanguage(currentLang === 'fr' ? 'en' : 'fr');
    });
  }

  updateYear();

  const cloud = $('#skills-cloud');
  if (cloud) {
    const spans = $$('#skills-cloud span');
    spans.forEach((s, i) => {
      const delay = (i % 5) * 0.6;
      const dir = i % 2 === 0 ? 1 : -1;
      s.animate([
        { transform: 'translateY(0px)' },
        { transform: `translateY(${6 * dir}px)` },
        { transform: 'translateY(0px)' }
      ], { duration: 6000 + i * 120, iterations: Infinity, delay, easing: 'ease-in-out' });
    });
  }
})();
