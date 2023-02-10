import { IProgram } from 'types'
import { directsAccessImages } from './imageFiles'

interface IImageDirty {
  uid: string
  imageKey: string
  icon?: string
  name: string
  template: string
  position: number
}

export const transformImageKeys = (imagesDirty: IImageDirty[]): IProgram[] => {
  return imagesDirty
    .map(({ uid, imageKey, name, template, position }) => ({
      uid,
      iconUrl: directsAccessImages[imageKey],
      miniIconUrl: directsAccessImages[`${imageKey}Small`],
      name,
      template,
      position,
    }))
}