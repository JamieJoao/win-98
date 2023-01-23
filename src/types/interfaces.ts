export interface IButton {

}

export interface IProgram {
  uid: number
  iconUrl: string
  name: string
  template: string
  position: number
}

export interface IWindow {
  uid: number
  program: IProgram
  size: 'fullscreen' | 'regular'
  lastCoords?: { left: number, top: number }
  minimized: boolean
}