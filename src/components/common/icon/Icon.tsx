import './styles.scss'

interface IProps {
  url: string
  onClick?: () => void
}

export const Icon = (props: IProps) => {
  const { url, onClick } = props

  return (
    <div className="w98-icon" onClick={onClick}>
      <img src={url} />

      <span>My Computer</span>
    </div>
  )
}
