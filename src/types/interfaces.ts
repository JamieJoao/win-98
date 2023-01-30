export interface IButton {

}

export interface IProgram {
  uid: string
  iconUrl: string
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
