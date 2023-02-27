export type Icons = 'back' | 'forward' | 'up' | 'cut' | 'copy' | 'paste' | 'undo' | 'delete' | 'properties' | 'views'

export type ActionItem = {
  name: string | 'separator'
  iconKey?: Icons
  action?: () => void
}
export type ControlItem = {
  name: string
  hotKey?: string
  action?: () => void
}
