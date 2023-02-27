import { DirectAccess, Program, FakeWindow, TaskBar } from 'components'
import { useDesktop } from './hooks/useDesktop'

import './Desktop.styles.scss'

export const Desktop = () => {
  const {
    desktopLinks
    , windowsList
    , handleMouseDown } = useDesktop()

  if (!desktopLinks) {
    return <h1 style={{ color: '#fff' }}>Error</h1>
  }

  return (
    <div className="w98-desktop" onMouseDown={handleMouseDown}>
      <div className="w98-desktop__links-group">
        {desktopLinks.map((obj, index) => (
          <DirectAccess
            key={index}
            file={obj} />
        ))}
      </div>

      <div className="w98-desktop__windows">
        {windowsList.map(obj => <Program {...obj} />)}
      </div>

      <FakeWindow />

      <TaskBar />
    </div>
  )
}
