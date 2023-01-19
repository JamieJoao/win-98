import './styles.scss'

interface Props {
  children: JSX.Element
}

export const Text = ({ children }: Props) => {
  return (
    <span className="w98-text">
      { children }
    </span>
  )
}
