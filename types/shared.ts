export type Project = {
  name: string
  thumbnail: string
  description: string
  tags: string[]
  video?: Video
  href?: string
  credits?: {
    label: string
    value: string
  }[]
}

export type Video = {
  name: string
  sources: string[]
}
