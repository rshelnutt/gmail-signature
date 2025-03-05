import SocialIconBA from '@/assets/email-icon-ba.png'
import SocialIconDribbble from '@/assets/email-icon-dribbble.png'
import SocialIconGH from '@/assets/email-icon-gh.png'
import SocialIconLI from '@/assets/email-icon-li.png'
import SocialIconX from '@/assets/email-icon-x.png'

export const socialMap = new Map([
  ['black-airplane', {
    id: 'black-airplane',
    name: 'Black Airplane',
    icon: SocialIconBA,
    linkTemplate: 'https://blackairplane.com'
  }],
  ['github', {
    id: 'github',
    name: 'GitHub',
    icon: SocialIconGH,
    linkTemplate: 'https://github.com/{username}'
  }],
  ['linkedin', {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: SocialIconLI,
    linkTemplate: 'https://www.linkedin.com/in/{username}'
  }],
  ['x', {
    id: 'x',
    name: 'X',
    icon: SocialIconX,
    linkTemplate: 'https://x.com/{username}'
  }],
  ['dribbble', {
    id: 'dribbble',
    name: 'Dribbble',
    icon: SocialIconDribbble,
    linkTemplate: 'https://dribbble.com/{username}'
  }],
])

const useSocial = (name: string) => {
  if (!name || !socialMap.get(name)) return null
  return socialMap.get(name)
}

export default useSocial