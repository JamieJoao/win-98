export interface IButton {

}

export interface IProgram {
  uid: number
  iconUrl: string
  name: string
  template: string
}

export interface IWindow {
  uid: number
  program: IProgram
  size: 'fullscreen' | 'regular'
  lastCoords: { left: number, top: number }
  minimized: boolean
}

export interface ITaskBarButton {
  uid: number
  window: IWindow
}
