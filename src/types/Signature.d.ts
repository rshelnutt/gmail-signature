import { SocialObjectModel } from "./SocialObject"

export type SignatureModel = {
    avatarUrl: string
    name: string
    title: string
    socialLinks: SocialObjectModel[]
    footerPhone: string
    footerLink: string
    footerLinkText: string
    barcodeUrl: string
    borderUrl: string
  }