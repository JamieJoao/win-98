import { useEffect } from 'react'

import { Desktop, Screen } from 'components'

import './System.styles.scss'
import { useSystem } from './hooks/useSystem'

export const System = () => {
  const { } = useSystem()

  return (
    <Screen>
      {/* <Desktop /> */}
    </Screen>
  )
}
