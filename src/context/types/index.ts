import { IWindow } from 'types'

export enum ERootStateLabels {
  activeWindow = 'activeWindow',
  windows = 'windows',
} 

export interface IRootState {
  [ERootStateLabels.activeWindow]: IWindow | null,
  [ERootStateLabels.windows]: IWindow[]
}

export type TRootAction = 
  | { key: 'activeWindow', payload: IWindow }
  | { key: 'windows', payload: IWindow[] }
