export const ReplaceUnderscoreWithSpace = (str) => {
  if (!str) return 'Pas de Zone de déplacement'
  return str.replace(/_/g, ' ')
}

export const treatement = {
  minitre: 3,
  directeur_cabinet: 2,
  conseiller_administratif: 1,
}

export const formatDate = (date) => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
export const numberOfDays = (firstDate, secondDate) => {
  const oneDay = 24 * 60 * 60 * 1000
  firstDate = new Date(firstDate)
  secondDate = new Date(secondDate)
  const differenceofDate = (firstDate - secondDate) / oneDay

  if (firstDate > secondDate) {
    return 'votre Date de début est  supérieure à la date de fin '
  }
  if (differenceofDate === 0) {
    return 1
  }

  return Math.round(Math.abs(differenceofDate))
}

export const capitalize = (str) => {
  str = str.replace('_', ' ')
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const createInitialByNameAndLastName = (name, lastName) => {
  return name.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
}

export const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 4)
}

export const validations = (data, _errors) => {
  if (!data.type) {
    return false
  }
  if (!data.participants) {
    return false
  }
  if (data.type === 'group' && !data.mission_manager) {
    return false
  }
  if (!data.destination) {
    return false
  }
  if (!data.zone) {
    return false
  }

  if (!data.subjet) {
    return false
  }
  if (!data.organization) {
    return false
  }
  if (!data.transport) {
    return false
  }
  if (!data.support) {
    return false
  }
  return true
}

export const translateInFrenchType = (type) => {
  if (type === 'individual') {
    return 'individuel'
  } else return 'Collectif'
}

export const trimUnderscore = (str) => {
  return str.replace('_', ' ').toLowerCase()
}

export const numberInMoneyFormat = (number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'CDF',
  }).format(number)
}

export const views = {
  'Conseiller administratif': [],
  'Sous gestionnaire de compte': ['deux'],
  'Coordonnateur de la cellule financière': ['trois'],
  'Conseiller financier': ['trois'],
  'Directeur du cabinet': ['quatre'],
  ministre: ['cinq'],
  comptable: [],
}

export const levels = {
  'Conseiller administratif': 'un',
  'Sous gestionnaire de compte': 'deux',
  'Coordonnateur de la cellule financière': 'trois',
  'Conseiller financier': 'trois',
  'Directeur du cabinet': 'quatre',
  ministre: 'cinq',
  comptable: 'six',
}
export const rejectedLevels = {
  'Conseiller administratif': 'un',
  'Sous gestionnaire de compte': 'deux',
  'Coordonnateur de la cellule financière': 'sept',
  'Conseiller financier': 'sept',
  'Directeur du cabinet': 'huit',
  ministre: 'neuf',
}
export const nextLevel = (level) => {
  if (level === 'un') {
    return 'deux'
  } else if (level === 'deux') {
    return 'trois'
  } else if (level === 'trois') {
    return 'quatre'
  } else if (level === 'quatre') {
    return 'cinq'
  } else if (level === 'cinq') {
    return 'six'
  } else if (level === 'six') {
    return 'onze'
  }
}
export const convertNumberToLetter = (number) => {
  const numbers = {
    0: 'Zero',
    1: 'Un',
    2: 'Deux',
    3: 'Trois',
    4: 'Quatre',
    5: 'Cinq',
    6: 'Six',
    7: 'Sept',
    8: 'Huit',
    9: 'Neuf',
    10: 'Dix',
    11: 'Onze',
    12: 'Douze',
    13: 'Treize',
    14: 'Quatorze',
    15: 'Quinze',
    16: 'Seize',
    17: 'Dix-sept',
    18: 'Dix-huit',
    19: 'Dix-neuf',
    20: 'Vingt',
    21: 'Vingt et un',
    22: 'Vingt-deux',
    23: 'Vingt-trois',
    24: 'Vingt-quatre',
    25: 'Vingt-cinq',
    26: 'Vingt-six',
    27: 'Vingt-sept',
    28: 'Vingt-huit',
    29: 'Vingt-neuf',
    30: 'Trente',
  }
  return numbers[number]
}

export const formatMissionDate = (date) => {
  if (date === 'undefined') return 'Pas de date'
  else if (date === '1970-01-01') return 'OPEN'
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const validateStatus = (state, item) => {
  if (item) {
    if (item.level.title === 'six' || item.level.title === 'onze') {
      return 'Validé'
    } else if (
      item.level.title === 'sept' ||
      item.level.title === 'huit' ||
      item.level.title === 'neuf'
    ) {
      return 'Rejeté'
    } else {
      switch (state) {
        case 'pending':
          return 'En cours'
        case 'validated':
          return 'Validé'
        case 'rejected':
          return 'Rejeté'
        case 'canceled':
          return 'Annulé'
        default:
          return 'En cours'
      }
    }
  } else {
    switch (state) {
      case 'pending':
        return 'En cours'
      case 'validated':
        return 'Validé'
      case 'rejected':
        return 'Rejeté'
      case 'canceled':
        return 'Annulé'
      default:
        return 'En cours'
    }
  }
}

export const getMissionsBylevel = (missions, traitement) => {
  if (missions) {
    const sglevels = ['un', 'deux']
    const cflevels = ['trois', 'sept']
    const drlevels = ['quatre', 'huit', 'dix']
    const mnlevels = ['cinq', 'neuf', 'dix', 'onze']
    if (traitement === 'SG') {
      return missions.filter((mission) => {
        return sglevels.includes(mission.level.title)
      })
    }
    if (traitement === 'CF') {
      return missions.filter((mission) => {
        return cflevels.includes(mission.level.title)
      })
    }
    if (traitement === 'DR') {
      return missions.filter((mission) => {
        return drlevels.includes(mission.level.title)
      })
    }
    if (traitement === 'MN') {
      return missions.filter((mission) => {
        return mnlevels.includes(mission.level.title)
      })
    }
  } else {
    return []
  }
}
export const getMissionsByRole = (missions, traitement) => {
  if (missions) {
    const sglevels = ['un', 'deux', 'sept', 'huit', 'neuf', 'dix']
    const cflevels = ['trois', 'sept', 'huit', 'neuf', 'dix']
    const drlevels = ['quatre', 'sept', 'huit', 'neuf', 'dix']
    const mnlevels = ['cinq', 'sept', 'huit', 'neuf', 'dix']
    if (traitement === 'SG') {
      return missions.filter((mission) => {
        return sglevels.includes(mission.level.title)
      })
    }
    if (traitement === 'CF') {
      return missions.filter((mission) => {
        return cflevels.includes(mission.level.title)
      })
    }
    if (traitement === 'DR') {
      return missions.filter((mission) => {
        return drlevels.includes(mission.level.title)
      })
    }
    if (traitement === 'MN') {
      return missions.filter((mission) => {
        return mnlevels.includes(mission.level.title)
      })
    }
  } else {
    return []
  }
}
