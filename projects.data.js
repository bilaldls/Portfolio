// Source de données des projets affichés sur la page Projets.

window.PROJECTS = [
  {
    id: 'poker',
    cover: 'poker.jpg',
    date: '2024-03-12',
    detail: 'projects/poker.html',
    links: { github: '#', demo: '#' },
    tags: ['ml'],
    translations: {
      fr: {
        title: "Prédiction de résultats d'une partie de Poker",
        description: "Modèle de machine learning évaluant les chances de victoire en fonction de la distribution des cartes et de la dynamique des mises.",
        tags: {
          ml: 'Machine Learning'
        }
      },
      en: {
        title: 'Predicting poker game outcomes',
        description: 'Machine learning model estimating winning odds based on dealt cards and betting dynamics.',
        tags: {
          ml: 'Machine Learning'
        }
      }
    }
  },
  {
    id: 'handball-zones',
    cover: 'handball.jpg',
    date: '2024-05-24',
    detail: 'projects/handball.html',
    links: { github: '#', demo: '#' },
    tags: ['data-collection', 'ml'],
    translations: {
      fr: {
        title: 'Analyse prédictive des zones de tir en handball',
        description: 'Cartographie des zones de tir et modélisation des probabilités de réussite pour optimiser la stratégie défensive d’une équipe pro.',
        tags: {
          'data-collection': 'Collecte de données',
          ml: 'Apprentissage automatique'
        }
      },
      en: {
        title: 'Predictive analysis of handball shot zones',
        description: 'Shot map analytics and probability modelling to optimise the defensive strategy of a professional team.',
        tags: {
          'data-collection': 'Data collection',
          ml: 'Machine Learning'
        }
      }
    }
  }
];
