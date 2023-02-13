import { Desktop, Screen } from 'components'
import { useSystem } from './hooks/useSystem'

import './System.styles.scss'

export const System = () => {
  useSystem()

  return (
    <Screen>
      <Desktop />
    </Screen>
  )
}
