import { useMemo, useRef } from 'react'

import { useAppSelector } from 'redux-tk/store'
import {
  TaskBarButton,
  NotificationArea,
  TaskBarButtonStart,
  Separator,
} from 'components'

import './styles.scss'

const COLUMN_GAP = 4
const WIDTH_BASE = 160

export const TaskBar = () => {
  const { taskBarButtonsStack } = useAppSelector(state => state)
  const taskBarRef = useRef<HTMLDivElement | null>(null)

  const buttonWidthMemo = useMemo<number>(() => {
    if (!taskBarRef.current) return 0
    if (WIDTH_BASE * taskBarButtonsStack.length < taskBarRef.current.clientWidth) return WIDTH_BASE

    const fixColumnGap = (taskBarButtonsStack.length - 1) * COLUMN_GAP
      , widthContainer = taskBarRef.current.clientWidth - fixColumnGap
      , finalWidth = widthContainer / taskBarButtonsStack.length

    return finalWidth
  }, [taskBarButtonsStack])

  return (
    <div className="w98-taskbar" style={{ zIndex: taskBarButtonsStack.length + 1 }}>
      <div className="w98-taskbar__container">
        <TaskBarButtonStart />

        <Separator className='w98-taskbar__separator' aligment='vertical' />

        <div className="w98-taskbar__group" ref={taskBarRef}>
          {taskBarButtonsStack.map((obj, index) => (
            <TaskBarButton
              key={index}
              data={obj}
              width={buttonWidthMemo} />
          ))}
        </div>

        <Separator className='w98-taskbar__separator' aligment='vertical' />

        <div className="w98-taskbar__info">
          <NotificationArea />
        </div>
      </div>
    </div>
  )
}
