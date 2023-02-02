export interface IButton {

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
  lastCoords: { left: number, top: number }
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
