import { CardType, DeliriumState, initialDeliriumState, initialDeckState, DeckState } from './types'

describe('Delirium Types', () => {
  test('CardType includes all 8 MTG card types', () => {
    const expectedTypes: CardType[] = [
      'land',
      'creature',
      'artifact',
      'enchantment',
      'instant',
      'sorcery',
      'planeswalker',
      'battle',
    ]

    // Test that all expected types are valid CardType values
    expectedTypes.forEach(type => {
      expect(type).toBeDefined()
    })
  })

  test('DeliriumState has correct structure', () => {
    const deliriumState: DeliriumState = {
      cardTypesInGraveyard: new Set(['land', 'creature'] as CardType[]),
      isActive: false,
    }

    expect(deliriumState.cardTypesInGraveyard).toBeInstanceOf(Set)
    expect(deliriumState.cardTypesInGraveyard.size).toBe(2)
    expect(deliriumState.isActive).toBe(false)
  })

  test('initialDeliriumState has correct initial values', () => {
    expect(initialDeliriumState.cardTypesInGraveyard).toBeInstanceOf(Set)
    expect(initialDeliriumState.cardTypesInGraveyard.size).toBe(0)
    expect(initialDeliriumState.isActive).toBe(false)
  })

  test('initialDeckState includes delirium state', () => {
    expect(initialDeckState.delirium).toBeDefined()
    expect(initialDeckState.delirium.cardTypesInGraveyard).toBeInstanceOf(Set)
    expect(initialDeckState.delirium.cardTypesInGraveyard.size).toBe(0)
    expect(initialDeckState.delirium.isActive).toBe(false)
  })

  test('DeckState extends CardZones and includes delirium', () => {
    const deckState: DeckState = {
      deck: { total: 99 },
      graveyard: { total: 0, permanents: 0 },
      exile: { total: 0 },
      delirium: {
        cardTypesInGraveyard: new Set(['land'] as CardType[]),
        isActive: false,
      },
    }

    expect(deckState.deck).toBeDefined()
    expect(deckState.graveyard).toBeDefined()
    expect(deckState.exile).toBeDefined()
    expect(deckState.delirium).toBeDefined()
    expect(deckState.delirium.cardTypesInGraveyard.has('land')).toBe(true)
  })
})
