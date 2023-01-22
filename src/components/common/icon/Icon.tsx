import './styles.scss'

interface IProps {
  url: string
  name: string
  onDoubleClick?: () => void
}

export const Icon = (props: IProps) => {
  const { url, name, onDoubleClick } = props

  return (
    <div className="w98-icon" onDoubleClick={onDoubleClick}>
      <img src={url} draggable={false} />

      <span>{ name }</span>
    </div>
  )
}
