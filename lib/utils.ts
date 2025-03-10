import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  const day = date.getDate()
  const ordinalSuffix = getOrdinalSuffix(day)

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date)

  const [month, year] = formattedDate.split(' ')

  return `${day}${ordinalSuffix} ${month}, ${year}`
}

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th'
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}
