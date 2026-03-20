export interface CardZone {
  total: number
  permanents?: number
}

export type CardType =
  | 'land'
  | 'creature'
  | 'artifact'
  | 'enchantment'
  | 'instant'
  | 'sorcery'
  | 'planeswalker'
  | 'battle'

export interface DeliriumState {
  cardTypesInGraveyard: Set<CardType>
  isActive: boolean
}

export interface CardZones {
  deck: CardZone
  graveyard: CardZone
  exile: CardZone
}

export interface DeckState extends CardZones {
  delirium: DeliriumState
}

export const initialDeliriumState: DeliriumState = {
  cardTypesInGraveyard: new Set(),
  isActive: false,
}

export const initialDeckState: DeckState = {
  deck: { total: 99 },
  graveyard: { total: 0, permanents: 0 },
  exile: { total: 0 },
  delirium: initialDeliriumState,
}
