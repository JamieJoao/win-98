import './styles.scss'

interface IProps {
  children: JSX.Element
}

export const Screen = (props: IProps) => {
  const { children } = props

  return (
    <div className="w98-screen">
      <div className="w98-screen__content">
        { children }
      </div>
    </div>
  )
}
