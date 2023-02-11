export interface IProgramLink {
  name: string
  programUID: string
}

export interface IHardDisk {
  name: string
  totalCapacity: number
  remainingCapacity: number
  files: IFile[]
}

export interface IFile {
  name: string
  size: number
  createdAt: string
  
  extension?: string
  data?: any
  files?: (IFile | IProgramLink)[]
}

