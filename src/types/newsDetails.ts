export interface Category {
  name: string
  slug: string
}
export interface NewsDetails {
  id: number
  title: string
  slug: string
  excerpt: string
  published_at: string
  thumbnail_url: string
  video_url: string
  categories: Category[]
}
