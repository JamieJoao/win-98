import { IFileProgram } from 'types/interfaces'

import './styles.scss'

interface IProps {
  data: IFileProgram
  onDoubleClick?: () => void
}

export const DirectAccess = (props: IProps) => {
  const { data, onDoubleClick } = props

  return (
    <div
      className="w98-direct-access"
      onDoubleClick={onDoubleClick}>
      {/* <img src={url} draggable={false} /> */}

      {/* <span>{name}</span> */}
    </div>
  )
}
