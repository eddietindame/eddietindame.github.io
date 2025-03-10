/** Map of Roman numeral characters to their integer values */
const romanMap: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
}

const romanNumerals: [string, number][] = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1],
]

/** Converts a Roman numeral string to its integer value */
function romanToNumber(roman: string): number {
  let total = 0
  let prevValue = 0

  // Iterate through the Roman numeral string from right to left
  for (let i = roman.length - 1; i >= 0; i--) {
    const value = romanMap[roman.toUpperCase()[i]]
    // Subtract if the current value is less than the previous one
    if (value < prevValue) {
      total -= value
    } else {
      total += value
    }
    prevValue = value
  }

  return total
}

/** Converts an integer to its Roman numeral representation */
function numberToRoman(num: number): string {
  let result = ''

  // Build the Roman numeral string
  for (const [roman, value] of romanNumerals) {
    while (num >= value) {
      result += roman
      num -= value
    }
  }

  return result.toLowerCase()
}

/** Modifies the Roman numeral in a slug by adding or subtracting 1 */
export function modifyRomanSlug(slug: string, action: 'add' | 'subtract'): string {
  const parts = slug.split('-')
  const lastPart = parts.pop() || ''

  // if string doesn't end in numeral, increment to two
  if (
    !lastPart.match(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i) &&
    action === 'add'
  ) {
    return slug + '-ii'
  }

  // Convert the last part of the slug to a number
  const number = romanToNumber(lastPart)
  if (number === 0) return slug

  // Modify the number based on the action
  const newNumber = action === 'add' ? number + 1 : number - 1
  // Prevent the numeral from going below II
  if (newNumber <= 1) return parts.join('-')

  // Convert the new number back to a Roman numeral and rebuild the slug
  const newRoman = numberToRoman(newNumber)
  return [...parts, newRoman].join('-')
}

export const getBaseSlug = (slug: string) => {
  const parts = slug.split('-')
  const lastPart = parts.pop()
  // if there is no numeral, return original string
  return romanToNumber(lastPart) ? parts.join('-') : [...parts, lastPart].join('-')
}
