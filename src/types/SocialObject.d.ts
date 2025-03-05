import { SocialTypeModel } from './SocialType'

export type SocialObjectModel = {
  type: SocialTypeModel | null
  iconHref?: string
  linkHref: string | null
  linkTemplate?: string
}
