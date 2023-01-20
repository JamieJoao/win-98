export interface IPropsButton {
  label?: string
  iconUrl?: string
  bold?: boolean
  disabled?: boolean
  children?: JSX.Element
  className?: string
  classNameContent?: string

  onClick?: () => void
}
