import { isFolder } from './functions'

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
