import { TCoords } from 'types'

/**
 * MODELS
 */
export interface DiskModel {
  name: string
  totalCapacity: number
  remainingCapacity: number
  files: (FileModel | FolderModel)[]
}

interface FileBase {
  name: string
  size: number
  createdAt: string
  path: string
}

interface Folder {
  files: (FileModel | FolderModel)[]
}

/**
 * FILE:            DATA IS HIS INFORMATION
 * DIRECT ACCESS:   DATA IS HIS DESTINATION PATH
 * PROGRAM:         DATA IS HIS ICON
 */
interface File {
  extension: string
  data: string
}

export type FolderModel = FileBase & Folder
export type FileModel = FileBase & File

/** END MODELS */

export interface IDirectAccess {
  name: string
  programLink?: IFileProgram
  file?: IFile
}

export interface IFileProgram {
  programUID: string
  path: string
}

export interface IFile {
  name: string

  createdAt?: string
  size?: number
  totalCapacity?: number
  remainingCapacity?: number
  extension?: string
  readOnly?: boolean
  data?: any
  files?: (IFile | IFileProgram)[]
  template?: string
}

export interface IProgram {
  uid: string
  iconUrl: string
  miniIconUrl?: string
  name: string
  template: string
}

export interface IWindow {
  uid: string
  program: IProgram
  size: 'fullscreen' | 'regular'
  lastCoords: TCoords
  minimized: boolean
}

export interface ITaskBarButton {
  uid: string
  window: IWindow
}

export interface IContextMenuItem {
  id: number
  name?: string
  underlineLetter?: string
  subitems?: IContextMenuItem[]
  separator?: boolean
  showed?: boolean
  action?: () => void
}

export type TCoordinates = 'north' | 'south' | 'west' | 'east' | 'north-west' | 'north-east' | 'south-west' | 'south-east'
