import { SignatureModel } from './Signature'
import { SocialObjectAssetModel } from './SocialObjectAssetModel'

export type SignatureAssetsModel = Pick<SignatureModel, 'avatarUrl' | 'barcodeUrl'> & {
  socialLinks: SocialObjectAssetModel[]
}
