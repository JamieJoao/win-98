import { useState } from 'react'

import { AccessLink, CommonStyles } from 'types'
import { useDragDrop, useFileExplorer } from 'hooks'
import { isFolder } from 'utils'
import { useAppDispatch } from 'redux-tk/store'
import { createWindow } from 'redux-tk/slice'

export const useDirectAccess = (file: AccessLink, position: CommonStyles) => {
  const dispatch = useAppDispatch()
  const [coords, setCoords] = useState<CommonStyles>(position)
  const { startRef } = useDragDrop({
    endOnScreen: true,
    onDragging(left, top, startLeft, startTop) {
      setCoords({ left: left - startLeft, top: top - startTop })
    },
  })
  const { searchFile } = useFileExplorer()

  const handleDoubleClick = () => {
    if (isFolder(file)) {

    }
    else {
      const { extension, data } = file
      if (extension === 'lnk') {
        const fileFounded = searchFile(data)
        if (fileFounded) {
          dispatch(createWindow(fileFounded))
        }
      }
    }
  }

  return {
    coords,
    startRef,
    handleDoubleClick,
  }
}