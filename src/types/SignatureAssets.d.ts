import { SignatureModel } from './Signature'

export type SignatureAssetsModel = Pick<SignatureModel, 'avatarUrl' | 'barcodeUrl' | 'borderUrl'> & {
  socialLinks: SocialObjectAssetModel[]
}
