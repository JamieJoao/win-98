import './styles.scss'

interface IProps {
  url: string
  onDoubleClick?: () => void
}

export const Icon = (props: IProps) => {
  const { url, onDoubleClick } = props

  return (
    <div className="w98-icon" onDoubleClick={onDoubleClick}>
      <img src={url} />

      <span>Mi PC</span>
    </div>
  )
}
