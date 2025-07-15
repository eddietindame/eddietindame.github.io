export interface CardZone {
  total: number
  permanents?: number
}

export interface DeckState {
  deck: CardZone
  graveyard: CardZone
  exile: CardZone
}

export const initialDeckState: DeckState = {
  deck: { total: 99 },
  graveyard: { total: 0, permanents: 0 },
  exile: { total: 0 },
}
