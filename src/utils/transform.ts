import { IProgram } from 'types'
import { isFolder } from './functions'
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

const recursiveIterateFiles = (files: any[], currentPath: string = '', lastFolderName: string = '', notFirstLevel?: boolean): any[] => {
  return (
    files
      .map((obj: any) => {
        const fileIsFolder = isFolder(obj)
          , auxPath = `${currentPath + (currentPath && '\\')}${lastFolderName}`
          , auxObj = { ...obj }

        if (notFirstLevel) {
          auxObj.path = auxPath
        }

        if (fileIsFolder) {
          const auxFiles = recursiveIterateFiles(obj.files, auxPath, obj.name, true)
          auxObj.files = auxFiles
        }

        return auxObj
      })
  )
}

export const parseHardDiskModel = <T>(hardDiskModelDirty: any[]): T[] => {
  return recursiveIterateFiles(hardDiskModelDirty)
}
