import { DiskModel, FileModel, FolderModel, IFile } from 'types/interfaces'
import { TCoords } from 'types'

export const getKeys = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[]
}

export const getPositionsElement = (element: HTMLElement | null): { left: number, top: number, width: number, height: number } => {
  if (!element) return { left: 0, top: 0, width: 0, height: 0 }

  const { clientWidth, clientHeight, offsetLeft, offsetTop } = element
  return {
    left: offsetLeft,
    top: offsetTop,
    width: clientWidth,
    height: clientHeight,
  }
}

export const removeStyles = (stylesList: (keyof TCoords)[], customElement?: HTMLElement | null) => {
  if (!customElement) return

  stylesList
    .forEach(key => {
      customElement.style[key] = ''
    })
}

const splitPath = (path: string): string[] => {
  return path.split(/\\/g)
}

export const isFolder = (possibleFolder: FileModel | FolderModel): possibleFolder is FolderModel => {
  return 'files' in (possibleFolder as FolderModel)
}

export const getFromPath = (path: string, storageDisk: DiskModel[]): (FileModel | FolderModel | undefined) => {
  try {
    if (path === '') return undefined

    const [diskName, ...fileNames] = splitPath(path)
    const diskFinded = storageDisk.find(obj => obj.name === diskName)

    if (diskFinded) {
      const diskFiles = diskFinded.files
      let searchedFile: FolderModel | FileModel | undefined = undefined
        , lastFiles: (FolderModel | FileModel)[] = diskFiles

      fileNames
        .forEach((fileName, index) => {
          const fileFound = lastFiles.find(obj => {
            const auxName = isFolder(obj)
              ? obj.name
              : `${obj.name}.${obj.extension}`
            return auxName === fileName
          })

          if (!fileFound) return undefined
          if (isFolder(fileFound)) lastFiles = fileFound.files
          if (index === fileNames.length - 1) searchedFile = fileFound
        })

      return searchedFile
    }

  } catch (error) {
    console.warn(`NO SE PUDO OBTENER EL ARCHIVO ${path}`)
  }
}
