import { useDesktop } from './hooks/useDesktop'

import './Desktop.styles.scss'

const PATH = 'Cx\\Windows\\Desktop'

export const Desktop = () => {
  console.log(localStorage.getItem('hard-disk'))

  return (
    <div className="w98-desktop">
      
    </div>
  )
}
