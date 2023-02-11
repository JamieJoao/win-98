import { IFile, IHardDisk } from 'models/types'
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

export const getFileFromPath = (path: string, storage: any) => {
  const pathParts = splitPath(path)

  const recursiveSearch = (file: IHardDisk | IFile) => {
    console.log(file)
  }

  recursiveSearch(storage)
}
