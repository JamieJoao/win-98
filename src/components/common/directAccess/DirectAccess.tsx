import { AccessLink } from 'types/interfaces'

import './DirectAccess.styles.scss'
import { useDirectAccess } from './useDirectAccess'

interface IProps {
  file: AccessLink
}

export const DirectAccess = (props: IProps) => {
  const { file } = props
  const { name, icon, position } = file

  const { startRef, coords, handleDoubleClick } = useDirectAccess(file, position)

  return (
    <section
      tabIndex={0}
      className="w98-direct-access"
      onDoubleClick={handleDoubleClick}
      ref={startRef}
      style={coords}>
      <div className='w98-direct-access__icon'>
        <img src={icon} draggable={false} />
      </div>
      <p className='w98-direct-access__name'>{name}</p>
    </section>
  )
}
