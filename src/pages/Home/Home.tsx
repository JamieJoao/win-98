import { useRef, useState, useEffect } from 'react'

import { Screen } from 'components'

import './styles.scss'

export const Home = () => {
  const boxRef = useRef<HTMLDivElement | null>(null)
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.addEventListener('touchstart', handleTouchStart)
      // boxRef.current.addEventListener('mousedown', handleTouchStart)
    }
  }, [])

  const handleTouchStart = () => {
    if (boxRef.current) {
      boxRef.current.addEventListener('touchmove', handleTouchMove)
      // boxRef.current.addEventListener('mousemove', handleTouchMove)
    }
  }

  const handleTouchEnd = () => {

  }

  const handleTouchMove = (e: any) => {
    const t = e.targetTouches[0]
    const rect = e.target.getBoundingClientRect()

    console.log(t.clientX - window.pageXOffset - rect.left)
    // console.log(document.elementsFromPoint(touchLocation.clientX, touchLocation.clientY ))
    setPosition({ x: t.pageX, y: t.pageY })
    // setPosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <Screen>
      <div className="w98-home">
        <div className="box" ref={boxRef}></div>
        <h1>{position.x} - {position.y}</h1>
      </div>
    </Screen>
  )
}
