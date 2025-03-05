import SocialIconBA from '@/assets/email-icon-ba.png?url'
import SocialIconDribbble from '@/assets/email-icon-dribbble.png?url'
import SocialIconGH from '@/assets/email-icon-gh.png?url'
import SocialIconLI from '@/assets/email-icon-li.png?url'
import SocialIconX from '@/assets/email-icon-x.png?url'

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