export interface IButton {

}

export interface IProgram {
  id: number
  iconUrl: string
  name: string
  template: string
  position: number
}

export interface IWindow {
  program: IProgram
  active: boolean
  size: 'maximized' | 'minimized'
}